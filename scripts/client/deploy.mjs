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

import { readFile, rm } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** No fetch in Node times out by default; a hung host would hang the script forever. */
const get = (url, opts = {}) =>
  fetch(url, { signal: AbortSignal.timeout(20_000), ...opts });

const slug = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!slug) {
  console.error('usage: node scripts/client/deploy.mjs <slug>');
  process.exit(1);
}

const AUTH = join(homedir(), 'Library', 'Application Support', 'com.vercel.cli', 'auth.json');
const clientDir = join('.context', 'clients', slug);

const api = async (token, path, init = {}) => {
  const res = await get(`https://api.vercel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  /* Surface API failures instead of letting an {error:…} body read as "no
     protection configured" — that silently ships a gated link. */
  if (!res.ok || body.error) {
    throw new Error(`Vercel API ${res.status} on ${path}: ${body.error?.message ?? 'unknown error'}`);
  }
  return body;
};

/* Two-part public suffixes we care about; anything else loses one label. */
const TWO_PART_TLD = /\.(co|com|net|org|gov|ac|edu)\.[a-z]{2}$/i;

/** Hostnames the client reads as their own: their domain on .vercel.app.
 *  Returns candidates in preference order — .vercel.app subdomains are globally
 *  unique, so the first choice is often already taken by a stranger. */
function vanityHosts(site, brand) {
  const source = site?.sourceUrl ?? brand?.sourceUrl ?? '';
  let labels = [];
  try {
    const host = new URL(source).hostname.replace(/^www\./, '');
    const drop = TWO_PART_TLD.test(host) ? 2 : 1;
    labels = host.split('.').slice(0, -drop);
  } catch {
    labels = [brand?.slug ?? slug];
  }
  const clean = (s) => s.replace(/[^a-z0-9-]/gi, '').toLowerCase().replace(/^-+|-+$/g, '');

  const joined = clean(labels.join('-'));
  const squashed = clean(labels.join(''));
  return [...new Set([joined, squashed, `${joined}-dubai`, `client-${joined}`])]
    .filter(Boolean)
    .map((h) => `${h}.vercel.app`);
}

/** Public paths to verify: whatever the site actually navigates to. Hardcoding
 *  five paths fails any client whose nav differs. */
async function navPaths() {
  const src = await readFile(join('src', 'lib', 'constants.ts'), 'utf8').catch(() => '');
  const block = src.match(/export const NAV_LINKS = \[([\s\S]*?)\n\];/)?.[1] ?? '';
  const paths = [...block.matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]).filter((p) => p.startsWith('/'));
  return paths.length ? [...new Set(paths)] : ['/'];
}

async function main() {
  const token = JSON.parse(await readFile(AUTH, 'utf8')).token;
  const brand = await readFile(join(clientDir, 'brand.json'), 'utf8').then(JSON.parse).catch(() => null);
  const site = await readFile(join(clientDir, 'site.json'), 'utf8').then(JSON.parse).catch(() => null);

  const project = `client-${slug}`.replace(/[^a-z0-9-]/gi, '-').toLowerCase().slice(0, 52);
  const hosts = vanityHosts(site, brand);

  console.log(`project : ${project}`);
  console.log(`link    : https://${hosts[0]}\n`);

  /* A leftover .vercel/project.json from the previous client silently wins over
     the project name, so the build lands in someone else's project and the
     protection PATCH below is applied to their settings. Always re-link. */
  await rm('.vercel', { recursive: true, force: true });
  console.log(`→ linking project ${project}…`);
  await run('vercel', ['link', '--yes', '--project', project], { maxBuffer: 4 * 1024 * 1024 });

  const link = JSON.parse(await readFile(join('.vercel', 'project.json'), 'utf8'));
  if (link.projectName !== project) {
    throw new Error(`linked to "${link.projectName}", expected "${project}" — refusing to deploy`);
  }
  console.log(`  ✓ ${link.projectName}`);

  console.log('→ deploying…');
  const { stdout } = await run('vercel', ['deploy', '--prod', '--yes'], {
    maxBuffer: 10 * 1024 * 1024,
  });
  const url = stdout.match(/https:\/\/[a-z0-9-]+\.vercel\.app/gi)?.pop();
  if (!url) throw new Error(`could not parse a deployment URL from:\n${stdout}`);
  console.log(`  ✓ ${url}`);

  /* Protection is on by default for new projects and is the reason a link that
     works for us bounces the client to a login screen. */
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

  /* .vercel.app subdomains are globally unique, so the client's own name is
     often already taken by a stranger. Walk the candidates instead of dying
     after a successful build. */
  let host = null;
  for (const candidate of hosts) {
    console.log(`→ pointing ${candidate} at this build…`);
    try {
      await run('vercel', ['alias', 'set', url.replace('https://', ''), candidate]);
      host = candidate;
      console.log('  ✓ aliased');
      break;
    } catch (e) {
      console.log(`  · unavailable (${(e.stderr ?? e.message).trim().split('\n').pop()})`);
    }
  }
  if (!host) throw new Error(`every candidate host is taken: ${hosts.join(', ')}`);

  /* Verify the way the client will see it: no cookies, no Vercel session.
     A fresh alias needs a moment to propagate, so retry before condemning it. */
  console.log('\n→ checking as an anonymous visitor…');
  const paths = await navPaths();
  const failures = [];
  for (const path of paths) {
    let status = 0;
    let gated = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt) await sleep(3000);
      try {
        const res = await get(`https://${host}${path}`, { redirect: 'follow' });
        status = res.status;
        gated = /vercel\.com\/(login|sso)/.test(res.url);
        if (res.ok && !gated) break;
      } catch (e) {
        status = 0;
        gated = false;
        void e;
      }
    }
    const bad = status < 200 || status >= 400 || gated;
    if (bad) failures.push(path);
    console.log(`  ${bad ? '✗' : '✓'} ${path.padEnd(12)} ${status || 'ERR'}${gated ? '  → VERCEL LOGIN' : ''}`);
  }

  console.log(
    failures.length === 0
      ? `\n✔ send this: https://${host}`
      : `\n✗ https://${host} — ${failures.join(', ')} not publicly reachable, do not send it yet`
  );
  if (failures.length) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
