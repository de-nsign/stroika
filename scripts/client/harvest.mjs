#!/usr/bin/env node
/**
 * harvest.mjs — scrape a prospective client's website into a structured dossier.
 *
 *   node scripts/client/harvest.mjs https://example.com [--pages 12]
 *
 * Writes .context/clients/<slug>/
 *   brand.json        machine-readable extraction (contacts, socials, logo candidates, colors, pages)
 *   pages/*.txt       readable text of every crawled page (this is what the agent reads to write copy)
 *   raw/*             downloaded logo / og-image candidates
 *
 * Zero dependencies — Node 18+ built-ins only.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

/* ------------------------------------------------------------------ */
/* args                                                                */
/* ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
const rawUrl = argv.find((a) => !a.startsWith('--'));
if (!rawUrl) {
  console.error('usage: node scripts/client/harvest.mjs <url> [--pages N]');
  process.exit(1);
}
const maxPages = Number(argv[argv.indexOf('--pages') + 1]) || 12;

const start = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
const host = start.hostname.replace(/^www\./, '');
const slug = host.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const outDir = join('.context', 'clients', slug);

/* ------------------------------------------------------------------ */
/* html helpers                                                        */
/* ------------------------------------------------------------------ */

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–',
  mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”',
  eacute: 'é', deg: '°', times: '×', middot: '·', bull: '•', copy: '©',
};

function decode(s = '') {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

/** Strip a full HTML document down to readable, line-broken text. */
function toText(html) {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style|noscript|svg|iframe)\b[\s\S]*?<\/\1>/gi, '')
      .replace(/<\/(p|div|section|article|h[1-6]|li|tr|td|blockquote)>/gi, '\n')
      .replace(/<(br|hr)\s*\/?>/gi, '\n')
      .replace(/<li\b[^>]*>/gi, '• ')
      .replace(/<h([1-6])\b[^>]*>/gi, (_, l) => `\n${'#'.repeat(Number(l))} `)
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? '') : null;
}

const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];

function meta(html, key) {
  for (const t of tags(html, 'meta')) {
    const k = (attr(t, 'property') ?? attr(t, 'name') ?? '').toLowerCase();
    if (k === key.toLowerCase()) return attr(t, 'content');
  }
  return null;
}

const abs = (href, base) => {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
};

/* ------------------------------------------------------------------ */
/* extractors                                                          */
/* ------------------------------------------------------------------ */

const SOCIAL_HOSTS = {
  'facebook.com': 'Facebook', 'fb.com': 'Facebook', 'instagram.com': 'Instagram',
  'linkedin.com': 'LinkedIn', 'youtube.com': 'YouTube', 'youtu.be': 'YouTube',
  'twitter.com': 'X', 'x.com': 'X', 'tiktok.com': 'TikTok',
  'wa.me': 'WhatsApp', 'api.whatsapp.com': 'WhatsApp', 't.me': 'Telegram',
  'pinterest.com': 'Pinterest', 'snapchat.com': 'Snapchat',
};

/** Phone numbers: international, generous separators, then sanity-filtered. */
function phones(text, html) {
  const hits = new Set();
  for (const m of html.matchAll(/tel:\s*([+\d][\d\s().\-]{6,})/gi)) hits.add(m[1]);
  for (const m of text.matchAll(/\+\d[\d\s().\-]{7,}\d/g)) hits.add(m[0]);
  return [...hits]
    .map((p) => p.replace(/[^\d+]/g, ''))
    .filter((p) => {
      const d = p.replace(/\D/g, '');
      return d.length >= 8 && d.length <= 15;
    })
    .filter((p, i, a) => a.indexOf(p) === i);
}

function emails(text, html) {
  const hits = new Set();
  for (const m of html.matchAll(/mailto:([^"'?\s>]+@[^"'?\s>]+)/gi)) hits.add(decode(m[1]));
  for (const m of text.matchAll(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g)) hits.add(m[0]);
  return [...hits]
    .map((e) => e.toLowerCase().replace(/[.,;]$/, ''))
    .filter((e) => !/\.(png|jpe?g|webp|svg|gif)$/.test(e))
    .filter((e, i, a) => a.indexOf(e) === i);
}

/** Address lines: heuristic — lines naming a country/emirate/street keyword. */
function addresses(text) {
  const KEY =
    /(P\.?O\.? Box|Street|St\.|Road|Rd\.|Avenue|Ave\.|Industrial|Warehouse|Building|Bldg|Floor|Office|Zone|Area|Emirates|U\.?A\.?E|Dubai|Abu Dhabi|Sharjah|Ajman|Riyadh|Doha|Kuwait|Oman|Qatar)/i;
  return [
    ...new Set(
      text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 14 && l.length < 160 && KEY.test(l) && /[-,]/.test(l))
    ),
  ].slice(0, 8);
}

function socials(html, base) {
  const out = new Map();
  for (const t of tags(html, 'a')) {
    const href = attr(t, 'href');
    if (!href) continue;
    const u = abs(href, base);
    if (!u) continue;
    let h;
    try {
      h = new URL(u).hostname.replace(/^www\./, '');
    } catch {
      continue;
    }
    const platform = SOCIAL_HOSTS[h];
    if (platform && !out.has(platform)) out.set(platform, u);
  }
  return [...out].map(([platform, url]) => ({ platform, url }));
}

/** Google-Maps latitude/longitude, wherever it hides. */
function geo(html) {
  const pats = [
    /!3d(-?\d+\.\d+)[^]*?!2d(-?\d+\.\d+)/, // embed, lat then lng
    /@(-?\d+\.\d+),(-?\d+\.\d+)/, // maps url
    /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /"latitude"\s*:\s*"?(-?\d+\.\d+)"?[^]{0,80}?"longitude"\s*:\s*"?(-?\d+\.\d+)"?/i,
    /\blat(?:itude)?["' :=]+(-?\d+\.\d{3,})[^]{0,60}?\blng|lon(?:gitude)?["' :=]+(-?\d+\.\d{3,})/i,
  ];
  for (const p of pats) {
    const m = html.match(p);
    if (m && m[1] && m[2]) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      if (Math.abs(a) <= 90 && Math.abs(b) <= 180) return { lat: a, lng: b };
    }
  }
  return null;
}

/** Logo candidates, ranked: explicit logo markup > header img > icons > og:image. */
function logoCandidates(html, base) {
  const out = [];
  const push = (url, score, why) => {
    const u = abs(url, base);
    if (!u || out.some((c) => c.url === u)) return;
    out.push({ url: u, score, why });
  };

  for (const t of tags(html, 'link')) {
    const rel = (attr(t, 'rel') ?? '').toLowerCase();
    const href = attr(t, 'href');
    if (!href) continue;
    if (rel.includes('apple-touch-icon')) push(href, 55, 'apple-touch-icon');
    else if (rel.includes('icon')) push(href, 40, 'favicon');
  }

  const header = html.match(/<(header|nav)\b[\s\S]{0,6000}?<\/\1>/i)?.[0] ?? '';
  for (const t of tags(header, 'img')) {
    const src = attr(t, 'src') ?? attr(t, 'data-src') ?? attr(t, 'data-lazy-src');
    if (src) push(src, 80, 'header img');
  }

  for (const t of tags(html, 'img')) {
    const src = attr(t, 'src') ?? attr(t, 'data-src') ?? attr(t, 'data-lazy-src');
    if (!src) continue;
    const hay = `${src} ${attr(t, 'alt') ?? ''} ${attr(t, 'class') ?? ''} ${attr(t, 'id') ?? ''}`.toLowerCase();
    if (/logo|brand|wordmark/.test(hay)) push(src, 100, 'logo keyword');
  }

  const og = meta(html, 'og:image');
  if (og) push(og, 30, 'og:image');

  return out.sort((a, b) => b.score - a.score).slice(0, 10);
}

/** Colour frequency across inline styles + linked stylesheets. */
function colors(sources) {
  const freq = new Map();
  const bump = (hex, n = 1) => freq.set(hex, (freq.get(hex) ?? 0) + n);

  for (const css of sources) {
    for (const m of css.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
      let h = m[1].toLowerCase();
      if (h.length === 3) h = h.split('').map((c) => c + c).join('');
      bump(`#${h}`);
    }
    for (const m of css.matchAll(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/gi)) {
      const hex = [m[1], m[2], m[3]]
        .map((v) => Number(v).toString(16).padStart(2, '0'))
        .join('');
      bump(`#${hex}`);
    }
  }

  const sat = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return { s: 0, l };
    return { s: (max - min) / (l > 0.5 ? 2 - max - min : max + min), l };
  };

  const all = [...freq].map(([hex, count]) => ({ hex, count, ...sat(hex) }));
  return {
    /* brand accents: saturated, mid-lightness, actually used more than once */
    accents: all
      .filter((c) => c.s > 0.45 && c.l > 0.2 && c.l < 0.72 && c.count > 1)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map(({ hex, count }) => ({ hex, count })),
    all: all.sort((a, b) => b.count - a.count).slice(0, 24).map(({ hex, count }) => ({ hex, count })),
  };
}

/* ------------------------------------------------------------------ */
/* crawl                                                               */
/* ------------------------------------------------------------------ */

const SKIP_EXT = /\.(pdf|zip|jpe?g|png|webp|gif|svg|mp4|docx?|xlsx?|css|js)$/i;
const SKIP_PATH = /\/(wp-admin|wp-json|wp-content|feed|tag|author|cart|checkout|my-account)\b/i;

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return { html: await res.text(), url: res.url };
}

async function sitemapUrls(origin) {
  const found = new Set();
  for (const path of ['/sitemap.xml', '/sitemap_index.xml', '/wp-sitemap.xml']) {
    try {
      const { html } = await get(origin + path);
      const nested = [...html.matchAll(/<loc>([^<]+sitemap[^<]*\.xml)<\/loc>/gi)].map((m) => m[1]);
      for (const n of nested.slice(0, 4)) {
        try {
          const sub = await get(n);
          for (const m of sub.html.matchAll(/<loc>([^<]+)<\/loc>/gi)) found.add(m[1]);
        } catch {}
      }
      for (const m of html.matchAll(/<loc>([^<]+)<\/loc>/gi)) found.add(m[1]);
      if (found.size) break;
    } catch {}
  }
  return [...found].filter((u) => !/\.xml$/i.test(u));
}

/* Pages we always want, whether or not the site links to them from the homepage.
   Cheap to probe (a few HEAD-ish GETs) and they carry the contact/company facts. */
const PROBE_PATHS = [
  '/contact', '/contact-us', '/contacts', '/about', '/about-us', '/services',
  '/fleet', '/equipment', '/products', '/portfolio', '/projects', '/gallery',
];

/* Lower rank = crawled first. Slugs are matched with boundaries so a blog post
   like /how-to-choose-a-construction-company doesn't masquerade as the About page. */
function rank(url) {
  const p = new URL(url).pathname.toLowerCase().replace(/\/$/, '');
  const depth = p.split('/').filter(Boolean).length;
  if (p === '' || p === '/') return 0;
  const seg = p.split('/').filter(Boolean).pop() ?? '';
  const isSlug = (re) => re.test(seg);

  /* long, hyphen-heavy slugs are almost always blog posts — push them to the back */
  const bloggy = seg.split('-').length >= 5 || /\/\d{4}\/\d{2}\//.test(p);

  if (!bloggy) {
    if (isSlug(/^(contact|contact-us|contacts|get-in-touch)$/)) return 1;
    if (isSlug(/^(about|about-us|company|who-we-are|our-story)$/)) return 2;
    if (isSlug(/^(services?|solutions?|what-we-do)$/)) return 3;
    if (isSlug(/^(fleet|equipment|products?|machinery|rentals?|price|pricing)$/)) return 4;
    if (isSlug(/^(projects?|portfolio|portfolio-grid|gallery|clients?)$/)) return 5;
    if (/(service|solution|equipment|fleet|product|rental|crane|excavator|loader|truck|lift|ton)/.test(seg))
      return 6 + depth;
  }
  return (bloggy ? 40 : 20) + depth;
}

async function main() {
  await mkdir(join(outDir, 'pages'), { recursive: true });
  await mkdir(join(outDir, 'raw'), { recursive: true });
  await mkdir(join(outDir, 'photos'), { recursive: true });

  console.log(`→ ${start.href}`);
  const home = await get(start.href);
  const origin = new URL(home.url).origin;

  /* candidate urls: sitemap first, nav links as fallback */
  const queue = new Set([home.url]);
  for (const u of await sitemapUrls(origin)) queue.add(u);
  for (const t of tags(home.html, 'a')) {
    const u = abs(attr(t, 'href') ?? '', home.url);
    if (u && new URL(u).hostname.replace(/^www\./, '') === host) queue.add(u.split('#')[0]);
  }

  /* probe the standard paths the homepage may not link to (or links to via JS) */
  const known = new Set([...queue].map((u) => new URL(u).pathname.replace(/\/$/, '')));
  await Promise.all(
    PROBE_PATHS.filter((p) => !known.has(p)).map(async (p) => {
      try {
        const res = await fetch(origin + p, { headers: { 'user-agent': UA }, redirect: 'follow' });
        if (res.ok && new URL(res.url).hostname.replace(/^www\./, '') === host) {
          queue.add(res.url.split('#')[0]);
        }
      } catch {}
    })
  );

  const urls = [...queue]
    .filter((u) => !SKIP_EXT.test(u) && !SKIP_PATH.test(u))
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, maxPages);

  const pages = [];
  const htmls = [home.html];
  for (const url of urls) {
    let html = url === home.url ? home.html : null;
    if (!html) {
      try {
        html = (await get(url)).html;
        htmls.push(html);
      } catch (e) {
        console.log(`  ✗ ${url} — ${e.message}`);
        continue;
      }
    }
    const path = new URL(url).pathname.replace(/\/$/, '') || '/index';
    const name = (path.replace(/^\//, '').replace(/\//g, '-') || 'index') + '.txt';
    const text = toText(html);
    const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
    await writeFile(
      join(outDir, 'pages', name),
      `URL: ${url}\nTITLE: ${title}\nDESCRIPTION: ${meta(html, 'description') ?? ''}\n\n${text}\n`
    );
    pages.push({ url, title, file: `pages/${name}`, chars: text.length });
    console.log(`  ✓ ${path}  (${text.length} chars)`);
  }

  /* stylesheets, for colour extraction */
  const cssSources = htmls.map((h) => [...h.matchAll(/style\s*=\s*"([^"]*)"/gi)].map((m) => m[1]).join(';'));
  const sheets = [
    ...new Set(
      tags(home.html, 'link')
        .filter((t) => (attr(t, 'rel') ?? '').toLowerCase().includes('stylesheet'))
        .map((t) => abs(attr(t, 'href') ?? '', home.url))
        .filter(Boolean)
    ),
  ].slice(0, 6);
  for (const s of sheets) {
    try {
      cssSources.push((await get(s)).html);
    } catch {}
  }
  for (const h of htmls) {
    for (const m of h.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) cssSources.push(m[1]);
  }

  /* download logo candidates */
  const candidates = logoCandidates(home.html, home.url);
  const downloaded = [];
  for (const [i, c] of candidates.entries()) {
    try {
      const res = await fetch(c.url, { headers: { 'user-agent': UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) continue;
      const ext = (extname(new URL(c.url).pathname) || '.png').split('?')[0];
      const file = join(outDir, 'raw', `logo-${String(i).padStart(2, '0')}${ext}`);
      await writeFile(file, buf);
      downloaded.push({ ...c, file, bytes: buf.length, name: basename(c.url) });
      console.log(`  ⬇ ${basename(c.url)} (${(buf.length / 1024).toFixed(0)} kB, ${c.why})`);
    } catch {}
  }

  const joinedHtml = htmls.join('\n');
  const fullText = htmls.map(toText).join('\n');

  /* content photography — the client's own machines/sites, worth far more than
     stock. WordPress serves the same asset at many sizes; keep the largest of
     each family by stripping the -WxH suffix. */
  const photoUrls = new Map();
  for (const h of htmls) {
    for (const t of [...tags(h, 'img'), ...tags(h, 'source')]) {
      const raw =
        attr(t, 'src') ?? attr(t, 'data-src') ?? attr(t, 'data-lazy-src') ?? attr(t, 'srcset')?.split(',').pop()?.trim().split(' ')[0];
      if (!raw) continue;
      const u = abs(raw, home.url);
      if (!u || !/\.(jpe?g|png|webp)(\?|$)/i.test(u)) continue;
      if (downloaded.some((d) => d.url === u)) continue;
      const dims = u.match(/-(\d{2,4})x(\d{2,4})\.(jpe?g|png|webp)/i);
      const family = u.replace(/-\d{2,4}x\d{2,4}(\.\w+)$/i, '$1');
      const px = dims ? Number(dims[1]) * Number(dims[2]) : Infinity;
      const prev = photoUrls.get(family);
      if (!prev || px > prev.px) photoUrls.set(family, { url: u, px });
    }
  }

  const photos = [];
  for (const [i, { url }] of [...photoUrls.values()].slice(0, 40).entries()) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 25_000) continue; // icons, spacers, tiny thumbs
      const ext = (extname(new URL(url).pathname) || '.jpg').split('?')[0];
      const file = join(outDir, 'photos', `photo-${String(i).padStart(2, '0')}${ext}`);
      await writeFile(file, buf);
      photos.push({ url, file, bytes: buf.length, name: basename(url) });
    } catch {}
  }
  console.log(`  ⬇ ${photos.length} content photos`);

  const brand = {
    slug,
    sourceUrl: home.url,
    host,
    scrapedAt: new Date().toISOString(),
    title: decode(home.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? ''),
    description: meta(home.html, 'description') ?? meta(home.html, 'og:description'),
    siteName: meta(home.html, 'og:site_name'),
    themeColor: meta(home.html, 'theme-color'),
    contacts: {
      phones: phones(fullText, joinedHtml),
      emails: emails(fullText, joinedHtml),
      addresses: addresses(fullText),
      geo: geo(joinedHtml),
    },
    socials: socials(joinedHtml, home.url),
    logoCandidates: downloaded,
    photos,
    colors: colors(cssSources),
    pages,
  };

  await writeFile(join(outDir, 'brand.json'), JSON.stringify(brand, null, 2));

  console.log(`\n✔ dossier → ${outDir}/`);
  console.log(`  pages    ${pages.length}`);
  console.log(`  phones   ${brand.contacts.phones.join(', ') || '—'}`);
  console.log(`  emails   ${brand.contacts.emails.join(', ') || '—'}`);
  console.log(`  geo      ${brand.contacts.geo ? `${brand.contacts.geo.lat}, ${brand.contacts.geo.lng}` : '—'}`);
  console.log(`  socials  ${brand.socials.map((s) => s.platform).join(', ') || '—'}`);
  console.log(`  accents  ${brand.colors.accents.map((c) => c.hex).join(' ') || '—'}`);
  console.log(`  logos    ${downloaded.length} candidates in raw/`);
  console.log(`\nnext: node scripts/client/brand.mjs ${slug}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
