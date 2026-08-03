#!/usr/bin/env node
/**
 * deploy.mjs — ship a client build to a link you can send them, in one command.
 *
 *   node scripts/client/deploy.mjs <slug>
 *
 * Three things went wrong by hand on every single rollout, so all three are
 * automated here rather than written down and forgotten:
 *
 *   1. The URL carried the template's project name and the account slug
 *      (heavy-rentals-git-client-x-denisartemmenko-3788s-projects.vercel.app).
 *      A client must not see that. We give each client their own Vercel project
 *      and alias it to their own domain with .com swapped for .vercel.app.
 *
 *   2. Vercel turns Deployment Protection on for new projects, so the link
 *      bounces the client to a Vercel login. Nobody notices, because the
 *      browser doing the checking is already signed in. We turn it off and
 *      verify with a cookie-less request.
 *
 *   3. The alias points at one immutable deployment, so it silently goes stale
 *      after the next push. We re-point it every run.
 *
 * Reads the CLI's own credentials — no separate token to manage.
 */

import { readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const slug = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!slug) {
  console.error('usage: node scripts/client/deploy.mjs <slug>');
  process.exit(1);
}

const AUTH = join(homedir(), 'Library', 'Application Support', 'com.vercel.cli', 'auth.json');
const clientDir = join('.context', 'clients', slug);

const api = async (token, path, init = {}) => {
  const res = await fetch(`https://api.vercel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  return res.json();
};

/** A link the client reads as their own: their domain, .vercel.app instead of .com */
function vanityHost(site, brand) {
  const source = site?.sourceUrl ?? brand?.sourceUrl ?? '';
  let base = '';
  try {
    base = new URL(source).hostname.replace(/^www\./, '').replace(/\.[a-z.]+$/i, '');
  } catch {
    base = brand?.slug ?? slug;
  }
  return `${base.replace(/[^a-z0-9-]/gi, '').toLowerCase()}.vercel.app`;
}

async function main() {
  const token = JSON.parse(await readFile(AUTH, 'utf8')).token;
  const brand = await readFile(join(clientDir, 'brand.json'), 'utf8').then(JSON.parse).catch(() => null);
  const site = await readFile(join(clientDir, 'site.json'), 'utf8').then(JSON.parse).catch(() => null);

  const project = `client-${slug}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 52);
  const host = vanityHost(site, brand);

  console.log(`project : ${project}`);
  console.log(`link    : https://${host}\n`);

  console.log('→ deploying…');
  const { stdout } = await run('vercel', ['deploy', '--prod', '--yes', '--name', project], {
    maxBuffer: 10 * 1024 * 1024,
  });
  const url = stdout.match(/https:\/\/[a-z0-9-]+\.vercel\.app/gi)?.pop();
  if (!url) throw new Error(`could not parse a deployment URL from:\n${stdout}`);
  console.log(`  ✓ ${url}`);

  /* Protection is on by default for new projects and is the reason a link that
     works for us bounces the client to a login screen. */
  const link = JSON.parse(await readFile(join('.vercel', 'project.json'), 'utf8'));
  const before = await api(token, `/v9/projects/${link.projectId}?teamId=${link.orgId}`);
  if (before.ssoProtection || before.passwordProtection) {
    console.log('→ removing deployment protection…');
    await api(token, `/v9/projects/${link.projectId}?teamId=${link.orgId}`, {
      method: 'PATCH',
      body: JSON.stringify({ ssoProtection: null, passwordProtection: null }),
    });
    console.log('  ✓ public');
  } else {
    console.log('  · already public');
  }

  console.log(`→ pointing ${host} at this build…`);
  await run('vercel', ['alias', 'set', url.replace('https://', ''), host]);
  console.log('  ✓ aliased');

  /* Verify the way the client will see it: no cookies, no Vercel session. */
  console.log('\n→ checking as an anonymous visitor…');
  let ok = true;
  for (const path of ['/', '/fleet', '/solutions', '/services', '/contacts']) {
    const res = await fetch(`https://${host}${path}`, { redirect: 'follow' });
    const gated = /vercel\.com\/(login|sso)/.test(res.url);
    if (!res.ok || gated) ok = false;
    console.log(`  ${!res.ok || gated ? '✗' : '✓'} ${path.padEnd(12)} ${res.status}${gated ? '  → VERCEL LOGIN' : ''}`);
  }

  console.log(
    ok
      ? `\n✔ send this: https://${host}`
      : `\n✗ https://${host} is not publicly reachable — do not send it yet`
  );
  if (!ok) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
