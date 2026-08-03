#!/usr/bin/env node
/**
 * brand.mjs — turn a harvested logo candidate into production brand assets.
 *
 *   node scripts/client/brand.mjs <slug> [--pick 2] [--keep-bg] [--tol 28]
 *
 * Picks the best logo candidate, knocks out a flat background, auto-trims the
 * bounding box, and emits:
 *   public/images/brand/logo.png        transparent, height 200 — for light headers
 *   public/images/brand/logo-white.png  white knockout      — for dark headers/footer
 *   public/images/brand/logo-mark.png   square 512, padded  — favicon / og
 * Then samples the logo's own pixels for an accent colour and writes
 * .context/clients/<slug>/brand-assets.json for apply.mjs to consume.
 *
 * Uses sharp, already present via next.
 */

import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith('--'));
if (!slug) {
  console.error('usage: node scripts/client/brand.mjs <slug> [--pick N] [--keep-bg] [--tol N]');
  process.exit(1);
}
const flag = (n, d) => (argv.includes(n) ? Number(argv[argv.indexOf(n) + 1]) : d);
const pick = flag('--pick', null);
const tol = flag('--tol', 28);
const keepBg = argv.includes('--keep-bg');

const clientDir = join('.context', 'clients', slug);
const outDir = join('public', 'images', 'brand');

const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();

function hsl(r, g, b) {
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
  else if (max === G) h = ((B - R) / d + 2) / 6;
  else h = ((R - G) / d + 4) / 6;
  return { h, s, l };
}

/** Shift lightness of a hex colour by ±pct, staying in gamut. */
function shade(hx, pct) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hx.slice(i, i + 2), 16));
  const f = (v) => Math.max(0, Math.min(255, Math.round(pct > 0 ? v + (255 - v) * pct : v * (1 + pct))));
  return hex(f(r), f(g), f(b));
}

/** Flood-fill-free background knockout: any pixel within `tol` of the sampled
 *  corner colour becomes transparent. Works for the flat white/solid backgrounds
 *  that 95% of scraped logos ship with, and is a no-op on already-transparent PNGs. */
function knockout(data, w, h, channels) {
  const px = (x, y) => {
    const i = (y * w + x) * channels;
    return [data[i], data[i + 1], data[i + 2], channels === 4 ? data[i + 3] : 255];
  };
  const corners = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)];
  const opaque = corners.filter((c) => c[3] > 200);
  if (opaque.length < 3) return { data, removed: null }; // already has alpha edges

  /* corners must agree with each other, else it's a photo, not a logo plate */
  const [br, bg, bb] = opaque[0];
  const agree = opaque.every((c) => Math.abs(c[0] - br) < 12 && Math.abs(c[1] - bg) < 12 && Math.abs(c[2] - bb) < 12);
  if (!agree) return { data, removed: null };

  let hits = 0;
  for (let i = 0; i < data.length; i += channels) {
    const d = Math.abs(data[i] - br) + Math.abs(data[i + 1] - bg) + Math.abs(data[i + 2] - bb);
    if (d <= tol * 3) {
      data[i + 3] = 0;
      hits++;
    }
  }
  return { data, removed: hits ? hex(br, bg, bb) : null };
}

/** Is this logo essentially one colour (a flat wordmark) or a full-colour emblem?
 *  A flat wordmark can be knocked out to white for dark headers; a multicolour
 *  emblem cannot — flattening it to a white silhouette destroys the artwork, so
 *  those get placed on a light plate instead. */
function isFlat(data, channels) {
  const hues = new Set();
  let opaque = 0;
  let chroma = 0;
  for (let i = 0; i < data.length; i += channels * 7 /* sample every 7th pixel */) {
    const a = channels === 4 ? data[i + 3] : 255;
    if (a < 200) continue;
    opaque++;
    const { h, s } = hsl(data[i], data[i + 1], data[i + 2]);
    if (s < 0.2) continue; // greys carry no hue information
    chroma++;
    hues.add(Math.round(h * 12) % 12); // 12 hue buckets
  }
  if (!opaque) return true;
  /* mostly greyscale, or all colour sits in one or two neighbouring hues */
  return chroma / opaque < 0.12 || hues.size <= 2;
}

/** Dominant saturated colour among opaque logo pixels. */
function accentFrom(data, w, h, channels) {
  const buckets = new Map();
  for (let i = 0; i < data.length; i += channels) {
    const a = channels === 4 ? data[i + 3] : 255;
    if (a < 200) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const { s, l } = hsl(r, g, b);
    if (s < 0.35 || l < 0.15 || l > 0.85) continue; // skip greys, near-black, near-white
    const key = `${r >> 4}-${g >> 4}-${b >> 4}`;
    const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    e.n++; e.r += r; e.g += g; e.b += b;
    buckets.set(key, e);
  }
  const top = [...buckets.values()].sort((a, b) => b.n - a.n)[0];
  if (!top) return null;
  const total = w * h;
  return {
    hex: hex(Math.round(top.r / top.n), Math.round(top.g / top.n), Math.round(top.b / top.n)),
    coverage: +(top.n / total).toFixed(4),
  };
}

async function main() {
  const brand = JSON.parse(await readFile(join(clientDir, 'brand.json'), 'utf8'));
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(join(clientDir, 'raw'))).filter((f) => /^logo-/.test(f)).sort();
  if (!files.length) throw new Error(`no logo candidates in ${clientDir}/raw — run harvest.mjs first`);

  /* score candidates: harvest's markup score, weighted by real pixel dimensions.
     A 32px favicon loses to a 600px header PNG even if the favicon ranked higher. */
  const scored = [];
  for (const [i, f] of files.entries()) {
    const path = join(clientDir, 'raw', f);
    try {
      const m = await sharp(path).metadata();
      if (!m.width || !m.height) continue;
      const cand = brand.logoCandidates[i] ?? {};
      const area = m.width * m.height;
      const ratio = m.width / m.height;
      scored.push({
        idx: i, f, path, meta: m,
        score:
          (cand.score ?? 20) +
          Math.min(60, Math.sqrt(area) / 8) +
          (ratio > 1.4 && ratio < 8 ? 25 : 0) + // wordmarks are wide
          (m.format === 'svg' ? 50 : 0),
      });
    } catch {}
  }
  scored.sort((a, b) => b.score - a.score);

  console.log('candidates:');
  for (const c of scored) {
    console.log(
      `  [${c.idx}] ${c.f}  ${c.meta.width}×${c.meta.height} ${c.meta.format}  score ${c.score.toFixed(0)}  ${
        brand.logoCandidates[c.idx]?.why ?? ''
      }`
    );
  }

  /* Contact sheet — every candidate on one labelled image.
     Scraped media libraries are full of stale assets from the site's theme demo
     or a previous client, and no heuristic reliably tells those from the real
     logo. So we render all candidates once and let a human/agent eye pick with
     --pick N. This is the step that stops the wrong brand shipping. */
  const TILE = 300;
  const TH = 210;
  const cols = Math.min(4, scored.length);
  const rows = Math.ceil(scored.length / cols);
  const tiles = [];
  for (const [n, c] of scored.entries()) {
    const x = (n % cols) * TILE;
    const y = Math.floor(n / cols) * TH;
    /* half the logos are white-on-transparent, half dark-on-white: show each
       candidate twice, on light and on dark, so neither disappears */
    const img = await sharp(c.path, { density: 300 })
      .resize({ width: TILE - 24, height: 120, fit: 'inside', withoutEnlargement: false })
      .png()
      .toBuffer();
    const m = await sharp(img).metadata();
    tiles.push(
      {
        input: Buffer.from(
          `<svg width="${TILE}" height="${TH}"><rect x="2" y="2" width="${TILE - 4}" height="${TH - 4}" rx="8" fill="#ffffff" stroke="#d4d4d4"/><rect x="${TILE / 2}" y="2" width="${TILE / 2 - 2}" height="${TH - 34}" fill="#1a1a1a"/><text x="10" y="${TH - 12}" font-family="monospace" font-size="13" fill="#171717">[${c.idx}] ${c.meta.width}x${c.meta.height} ${c.meta.format}</text></svg>`
        ),
        left: x,
        top: y,
      },
      { input: img, left: x + Math.round((TILE - (m.width ?? 0)) / 2), top: y + Math.round((TH - 34 - (m.height ?? 0)) / 2) }
    );
  }
  const sheetPath = join(clientDir, 'candidates.png');
  await sharp({
    create: { width: cols * TILE, height: rows * TH, channels: 4, background: { r: 245, g: 245, b: 245, alpha: 1 } },
  })
    .composite(tiles)
    .png()
    .toFile(sheetPath);
  console.log(`\n  contact sheet → ${sheetPath}   (verify before shipping: --pick N to override)`);

  const chosen = pick !== null ? scored.find((c) => c.idx === pick) : scored[0];
  if (!chosen) throw new Error(`candidate ${pick} not found`);
  console.log(`\n→ using [${chosen.idx}] ${chosen.f}`);

  /* SVG passes through untouched — vector beats anything we can do to it */
  if (chosen.meta.format === 'svg') {
    const svg = await readFile(chosen.path);
    await writeFile(join(outDir, 'logo.svg'), svg);
    console.log('  ✓ logo.svg (vector, copied as-is)');
  }

  const base = sharp(chosen.path, { density: 600 }).ensureAlpha();
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });

  const { data: cut, removed } = keepBg
    ? { data, removed: null }
    : knockout(Buffer.from(data), info.width, info.height, info.channels);
  if (removed) console.log(`  · knocked out background ${removed} (tol ${tol})`);
  else console.log('  · no flat background detected — left as-is');

  const cleaned = sharp(cut, { raw: { width: info.width, height: info.height, channels: info.channels } });

  const trimmed = await cleaned
    .clone()
    .trim({ threshold: 1 })
    .png()
    .toBuffer()
    .catch(async () => cleaned.clone().png().toBuffer());

  const tMeta = await sharp(trimmed).metadata();
  console.log(`  · trimmed to ${tMeta.width}×${tMeta.height}`);

  await sharp(trimmed).resize({ height: 200, fit: 'inside', withoutEnlargement: false }).png().toFile(join(outDir, 'logo.png'));
  console.log('  ✓ logo.png (h200, transparent)');

  const wRaw = await sharp(trimmed).resize({ height: 200, fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const flat = isFlat(wRaw.data, wRaw.info.channels);

  if (flat) {
    /* flat wordmark → white knockout: keep alpha, force every visible pixel white */
    for (let i = 0; i < wRaw.data.length; i += wRaw.info.channels) {
      if (wRaw.data[i + 3] > 8) {
        wRaw.data[i] = 255;
        wRaw.data[i + 1] = 255;
        wRaw.data[i + 2] = 255;
      }
    }
    await sharp(wRaw.data, { raw: { width: wRaw.info.width, height: wRaw.info.height, channels: wRaw.info.channels } })
      .png()
      .toFile(join(outDir, 'logo-white.png'));
    console.log('  ✓ logo-white.png (flat mark → white knockout for dark headers)');
  } else {
    /* full-colour emblem → keep the artwork, the template puts it on a light plate */
    await sharp(trimmed).resize({ height: 200, fit: 'inside' }).png().toFile(join(outDir, 'logo-white.png'));
    console.log('  ✓ logo-white.png (colour emblem preserved — renders on a light plate)');
  }

  /* Wide artwork carries the company name already; a square emblem does not, so
     the template pairs it with the SITE.name wordmark instead of standing alone. */
  const aspect = (tMeta.width ?? 1) / (tMeta.height ?? 1);
  const mode = aspect >= 2.2 ? 'image' : 'mark';
  console.log(`  · aspect ${aspect.toFixed(2)} → logo mode "${mode}"${flat ? '' : ', colour emblem'}`);

  await sharp(trimmed)
    .resize({ width: 400, height: 400, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 56, bottom: 56, left: 56, right: 56, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(outDir, 'logo-mark.png'));
  console.log('  ✓ logo-mark.png (512 square, padded)');

  /* accent: logo pixels first, site CSS second, template default last */
  const aRaw = await sharp(trimmed).raw().toBuffer({ resolveWithObject: true });
  const fromLogo = accentFrom(aRaw.data, aRaw.info.width, aRaw.info.height, aRaw.info.channels);
  const fromCss = brand.colors?.accents?.[0]?.hex?.toUpperCase() ?? null;
  const accent = fromLogo?.hex ?? fromCss ?? '#F56300';

  console.log(`\n  accent from logo: ${fromLogo ? `${fromLogo.hex} (${(fromLogo.coverage * 100).toFixed(1)}% of pixels)` : '—'}`);
  console.log(`  accent from css : ${fromCss ?? '—'}`);
  console.log(`  → using ${accent}`);

  const assets = {
    slug,
    source: chosen.f,
    sourceUrl: brand.logoCandidates[chosen.idx]?.url ?? null,
    dimensions: { width: tMeta.width, height: tMeta.height },
    aspect: +aspect.toFixed(2),
    mode,
    flat,
    backgroundRemoved: removed,
    files: {
      logo: '/images/brand/logo.png',
      logoWhite: '/images/brand/logo-white.png',
      mark: '/images/brand/logo-mark.png',
      ...(chosen.meta.format === 'svg' ? { svg: '/images/brand/logo.svg' } : {}),
    },
    accent: {
      base: accent,
      light: shade(accent, 0.28),
      dark: shade(accent, -0.22),
      tint: shade(accent, 0.9),
      fromLogo: fromLogo?.hex ?? null,
      fromCss,
      cssCandidates: brand.colors?.accents?.map((c) => c.hex) ?? [],
    },
  };
  await writeFile(join(clientDir, 'brand-assets.json'), JSON.stringify(assets, null, 2));

  console.log(`\n✔ assets → ${outDir}/  ·  manifest → ${clientDir}/brand-assets.json`);
  console.log(`next: fill ${clientDir}/site.json, then node scripts/client/apply.mjs ${slug}`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
