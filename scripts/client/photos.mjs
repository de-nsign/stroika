#!/usr/bin/env node
/**
 * photos.mjs — review and import the client's own photography.
 *
 *   node scripts/client/photos.mjs <slug>                     build contact sheet
 *   node scripts/client/photos.mjs <slug> --use 3=fleet/crane-50t 7=main/hero
 *
 * Scraped sites carry real photos of the client's real machines — always better
 * than generic stock. But they also carry theme-demo junk, so nothing is
 * imported blind: the sheet is reviewed first, then chosen indices are converted
 * to optimised webp at the template's own paths.
 */

import { mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';
import { cutout } from './lib/cutout.mjs';

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith('--'));
if (!slug) {
  console.error('usage: node scripts/client/photos.mjs <slug> [--use 3=fleet/crane-50t ...]');
  process.exit(1);
}

const clientDir = join('.context', 'clients', slug);
const photoDir = join(clientDir, 'photos');

/* Studio shots need their white sweep removed before they sit on the template's
   grey cards — otherwise they read as white rectangles. */
const doCutout = argv.includes('--cutout');
const flag = (n, d) => (argv.includes(n) ? Number(argv[argv.indexOf(n) + 1]) : d);
const tol = flag('--tol', 20);
const feather = flag('--feather', 38);

/* --use pairs: <index>=<path under public/images, no extension> */
const uses = [];
if (argv.includes('--use')) {
  for (const a of argv.slice(argv.indexOf('--use') + 1)) {
    if (a.startsWith('--')) break;
    const [idx, dest] = a.split('=');
    if (dest) uses.push({ idx: Number(idx), dest });
  }
}

async function main() {
  const files = (await readdir(photoDir)).filter((f) => /^photo-/.test(f)).sort();
  if (!files.length) throw new Error(`no photos in ${photoDir} — run harvest.mjs first`);

  const items = [];
  for (const [n, f] of files.entries()) {
    const path = join(photoDir, f);
    try {
      const m = await sharp(path).metadata();
      items.push({ n, f, path, w: m.width ?? 0, h: m.height ?? 0 });
    } catch {}
  }

  if (uses.length) {
    for (const { idx, dest } of uses) {
      const it = items.find((i) => i.n === idx);
      if (!it) {
        console.error(`  ✗ [${idx}] not found`);
        continue;
      }
      const out = join('public', 'images', `${dest}.webp`);
      await mkdir(dirname(out), { recursive: true });

      let pipe = sharp(it.path).resize({
        width: 1600,
        height: 1200,
        fit: 'inside',
        withoutEnlargement: true,
      });

      let note = '';
      if (doCutout) {
        const { data, info } = await pipe.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
        const res = cutout(data, info.width, info.height, { tol, feather });
        note = res.removed
          ? ` · cut out bg rgb(${res.bg.join(',')}), ${((res.cleared / (info.width * info.height)) * 100).toFixed(0)}% cleared`
          : ' · no flat background found, left as-is';
        pipe = sharp(data, {
          raw: { width: info.width, height: info.height, channels: info.channels },
        }).trim({ threshold: 1 });
      }

      /* alpha:true keeps the cut-out transparent; webp still beats png here */
      await pipe.webp({ quality: 86, alphaQuality: 90 }).toFile(out);
      console.log(`  ✓ [${idx}] ${it.f} → ${out}${note}`);
    }
    return;
  }

  const TILE = 260;
  const TH = 200;
  const cols = Math.min(5, items.length);
  const rows = Math.ceil(items.length / cols);
  const tiles = [];
  for (const it of items) {
    const x = (it.n % cols) * TILE;
    const y = Math.floor(it.n / cols) * TH;
    const img = await sharp(it.path).resize({ width: TILE - 12, height: TH - 36, fit: 'cover' }).png().toBuffer();
    tiles.push(
      {
        input: Buffer.from(
          `<svg width="${TILE}" height="${TH}"><rect width="${TILE}" height="${TH}" fill="#fafafa"/><text x="8" y="${TH - 10}" font-family="monospace" font-size="13" fill="#171717">[${it.n}] ${it.w}x${it.h}</text></svg>`
        ),
        left: x,
        top: y,
      },
      { input: img, left: x + 6, top: y + 6 }
    );
  }
  const sheet = join(clientDir, 'photos.png');
  await sharp({
    create: { width: cols * TILE, height: rows * TH, channels: 4, background: { r: 240, g: 240, b: 240, alpha: 1 } },
  })
    .composite(tiles)
    .png()
    .toFile(sheet);

  console.log(`✔ ${items.length} photos → ${sheet}`);
  console.log(`import with: node scripts/client/photos.mjs ${slug} --use 0=main/hero 3=fleet/crane-50t`);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
