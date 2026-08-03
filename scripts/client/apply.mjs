#!/usr/bin/env node
/**
 * apply.mjs — stamp a client's identity onto the template.
 *
 *   node scripts/client/apply.mjs <slug> [--dry]
 *
 * Reads .context/clients/<slug>/site.json (authored by the agent) and
 * brand-assets.json (produced by brand.mjs), then rewrites ONLY the
 * deterministic identity layer:
 *
 *   src/lib/constants.ts      SITE {…}  and  CONTACTS […]
 *   src/app/layout.tsx        metadata title/description/openGraph + themeColor
 *   src/app/globals.css       --color-accent* tokens
 *   src/app/contacts/page.tsx embedded Google map
 *
 * Editorial content (HERO, FLEET, SOLUTIONS, SERVICES, MISSION, PILLARS, STATS)
 * is deliberately NOT touched here — it needs judgement, so the agent writes it.
 * Every patch is anchored on an exact existing pattern and fails loudly if the
 * anchor is missing, so a template refactor can never silently no-op.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const slug = argv.find((a) => !a.startsWith('--'));
const dry = argv.includes('--dry');
if (!slug) {
  console.error('usage: node scripts/client/apply.mjs <slug> [--dry]');
  process.exit(1);
}

const clientDir = join('.context', 'clients', slug);
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const edits = [];
function patch(file, label, find, replace) {
  edits.push({ file, label, find, replace });
}

async function run() {
  const site = JSON.parse(await readFile(join(clientDir, 'site.json'), 'utf8'));
  const assets = await readFile(join(clientDir, 'brand-assets.json'), 'utf8')
    .then(JSON.parse)
    .catch(() => null);

  const accent = site.accent ?? assets?.accent ?? null;

  /* ---------------- constants.ts › SITE ---------------- */

  const logo =
    site.logo ?? (assets ? { mode: assets.mode ?? 'image', flat: assets.flat, ...assets.files } : { mode: 'wordmark' });
  const siteBlock = [
    'export const SITE = {',
    `  name: ${q(site.name)},`,
    `  tagline: ${q(site.tagline ?? '')},`,
    `  phone: ${q(site.phone ?? '')},`,
    `  whatsapp: ${q(site.whatsapp ?? site.phone ?? '')},`,
    `  whatsappLink: ${q(site.whatsappLink ?? `https://wa.me/${String(site.whatsapp ?? site.phone ?? '').replace(/\D/g, '')}`)},`,
    `  email: ${q(site.email ?? '')},`,
    `  address: ${q(site.address ?? '')},`,
    `  hours: ${q(site.hours ?? '')},`,
    '  logo: {',
    `    mode: ${q(logo.mode ?? 'image')},`,
    `    flat: ${logo.flat !== false},`,
    ...(logo.logo ? [`    src: ${q(logo.logo)},`] : []),
    ...(logo.logoWhite ? [`    srcDark: ${q(logo.logoWhite)},`] : []),
    ...(logo.svg ? [`    svg: ${q(logo.svg)},`] : []),
    '  },',
    '};',
  ].join('\n');
  patch('src/lib/constants.ts', 'SITE', /export const SITE = \{[\s\S]*?\n\};/, siteBlock);

  /* ---------------- constants.ts › CONTACTS ---------------- */

  if (site.contacts?.length) {
    const card = (c) =>
      [
        '  {',
        `    title: ${q(c.title)},`,
        ...['address', 'phone', 'email', 'whatsapp', 'hours'].filter((k) => c[k]).map((k) => `    ${k}: ${q(c[k])},`),
        ...(c.socials?.length
          ? [
              '    socials: [',
              ...c.socials.map((s) => `      { platform: ${q(s.platform)}, url: ${q(s.url)} },`),
              '    ],',
            ]
          : []),
        '  },',
      ].join('\n');
    const block = ['export const CONTACTS = [', ...site.contacts.map(card), '];'].join('\n');
    patch('src/lib/constants.ts', 'CONTACTS', /export const CONTACTS = \[[\s\S]*?\n\];/, block);
  }

  /* ---------------- layout.tsx › metadata ---------------- */

  if (site.seo) {
    const { title, description, ogTitle, ogDescription } = site.seo;
    const block = [
      'export const metadata: Metadata = {',
      `  title: ${q(title)},`,
      `  description:`,
      `    ${q(description)},`,
      '  openGraph: {',
      `    title: ${q(ogTitle ?? title)},`,
      '    description:',
      `      ${q(ogDescription ?? description)},`,
      "    type: 'website',",
      '  },',
      '};',
    ].join('\n');
    patch('src/app/layout.tsx', 'metadata', /export const metadata: Metadata = \{[\s\S]*?\n\};/, block);
  }

  /* ---------------- globals.css › accent tokens ---------------- */

  if (accent?.base) {
    patch('src/app/globals.css', 'accent tokens', /--color-accent:\s*#[0-9A-Fa-f]{3,8};/, `--color-accent: ${accent.base};`);
    if (accent.light)
      patch('src/app/globals.css', 'accent-light', /--color-accent-light:\s*#[0-9A-Fa-f]{3,8};/, `--color-accent-light: ${accent.light};`);
    if (accent.dark)
      patch('src/app/globals.css', 'accent-dark', /--color-accent-dark:\s*#[0-9A-Fa-f]{3,8};/, `--color-accent-dark: ${accent.dark};`);
    if (accent.tint)
      patch('src/app/globals.css', 'accent-50', /--color-accent-50:\s*#[0-9A-Fa-f]{3,8};/, `--color-accent-50: ${accent.tint};`);
  }

  /* ---------------- contacts/page.tsx › map ---------------- */

  const map = site.map;
  if (map) {
    const query = map.lat && map.lng ? `${map.lat},${map.lng}` : (map.query ?? site.address ?? '');
    /* Google's embed wants a literal comma between lat and lng — %2C renders a
       blank tile. Encode everything else, restore the commas. */
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(query).replace(/%2C/g, ',')}&t=&z=${map.zoom ?? 15}&ie=UTF8&iwloc=&output=embed`;
    patch('src/app/contacts/page.tsx', 'map embed', /src="https:\/\/maps\.google\.com\/maps\?q=[^"]*"/, `src="${src}"`);
    patch('src/app/contacts/page.tsx', 'map title', /title="[^"]*office location"/, `title="${site.name} office location"`);
  }

  /* ---------------- execute ---------------- */

  const byFile = new Map();
  for (const e of edits) {
    if (!byFile.has(e.file)) byFile.set(e.file, await readFile(e.file, 'utf8'));
  }

  let failed = 0;
  for (const e of edits) {
    const src = byFile.get(e.file);
    if (!e.find.test(src)) {
      console.error(`  ✗ ${e.file} › ${e.label} — anchor not found (template changed?)`);
      failed++;
      continue;
    }
    byFile.set(e.file, src.replace(e.find, () => e.replace));
    console.log(`  ✓ ${e.file} › ${e.label}`);
  }

  if (failed) {
    console.error(`\n✗ ${failed} anchor(s) missing — nothing written. Fix the anchors in apply.mjs.`);
    process.exit(1);
  }

  if (dry) {
    console.log('\n(dry run — no files written)');
    return;
  }
  for (const [file, content] of byFile) await writeFile(file, content);

  console.log(`\n✔ ${slug} identity applied to ${byFile.size} files`);
  console.log('next: write the editorial content (HERO / KEY_ASSETS / STATS / MISSION / PILLARS / FLEET / SOLUTIONS / SERVICES), then npm run build');
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
