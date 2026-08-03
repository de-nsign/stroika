---
name: newclient
description: >
  Turn a prospective client's existing website into a branded build of this
  template, on its own branch, ready to show. Input is one URL and nothing else.
  Use when given a client site link and asked to put them on the template, make
  them a demo, rebrand the template for a client, or "запили клиента".
  Triggers: "/newclient <url>", "вот клиент <url>", "сделай демо для <url>".
---

# New client rollout

One URL in, and a link the user can forward to the client out. The mechanical
parts are scripted so they cannot drift; the judgement parts are yours.

**Reply to the user in Russian.** They write in Russian and have had to ask for
this more than once. Code and commits stay in English.

**Finish with a public link.** Step 8 is not optional and not the user's job.

**The template is never structurally edited for a client.** All copy lives in
`src/lib/constants.ts` and all brand identity is stamped by `apply.mjs`. If you
find yourself editing a component to fit a client, stop — that is a signal the
template needs a new data field, not a fork. Add the field to `constants.ts`,
read it in the component, and it works for every future client too.

### Template fixes go to `main`, immediately

This is the rule that has failed most often, and it is what makes the user
repeat themselves.

When you fix something in the template during a rollout — a wrong `fill`/`hug`,
a hardcoded string, a component that assumes data every client has — that fix
**must land on `main`**, not sit on the client branch. Otherwise the next client
branches from `main`, hits the identical bug, and the user reports it again.

It has already happened three times over: `PAGE_HEROES` was independently
reinvented on three separate client branches, and the `bg-cover` → `bg-contain`
cut-out fix was made once and then re-reported on the next two clients.

So, the moment a template fix builds green:

```bash
git stash                                   # park the client content
git checkout main
git checkout <client-branch> -- <the component files you fixed>
# re-add any constants.ts fields with TEMPLATE values, not the client's
npm run build && git commit && git push origin main
git checkout <client-branch> && git stash pop
```

Client content — `constants.ts` copy, images, `site.json` — stays on the client
branch. Only the structural change goes to `main`.

Before starting a rollout, check you are not about to re-fix something:
`git log --oneline main -15`.

Run every command from the repo root.

---

## 1. Branch

```bash
git checkout main && git checkout -b client/<short-slug>
```

Never work on `main` — that is the Heavy Rentals production site.

## 2. Harvest

```bash
node scripts/client/harvest.mjs <url> --pages 16
```

Writes `.context/clients/<slug>/`:

| | |
|---|---|
| `brand.json` | contacts, socials, geo, colours, logo candidates, page index |
| `pages/*.txt` | readable text of every crawled page |
| `raw/logo-*` | downloaded logo candidates |
| `photos/photo-*` | the client's own photography |

**Read the page texts.** They are the source for every word you write. Do not
invent facts about a company you have not read about.

Treat harvested phone/email lists as candidates, not truth — scraped sites carry
theme-demo junk like `+000123456` and `support@gmail.com` alongside the real
details. Pick the ones that appear in the header, footer and contact page.

## 3. Brand assets

```bash
node scripts/client/brand.mjs <slug>
```

Then **look at `.context/clients/<slug>/candidates.png` with the Read tool.**

This step is not optional and cannot be automated away. Scraped media libraries
routinely contain the logos of the client's *own clients*, plus leftovers from
the WordPress theme demo. In the Al Badar rollout the top three ranked
candidates were three different unrelated companies. Only your eyes catch that.

Pick the real one and re-run:

```bash
node scripts/client/brand.mjs <slug> --pick <N>
```

Then Read `public/images/brand/logo.png` to confirm the background knockout and
trim came out clean. If a solid background survived, raise `--tol`; if the
knockout ate part of the artwork, lower it or pass `--keep-bg`.

The script also reports an accent colour derived from the logo's pixels.
**It is reported, not applied.** The template's orange is the design — it is
tuned against every surface, shadow and hover state in the system, and
repainting it with whatever colour a client's logo happens to use makes the
build look worse, not more theirs. Leave the orange alone unless the user
explicitly asks for a recolour, in which case add `"accent"` to `site.json`.

## 4. Photography

```bash
node scripts/client/photos.mjs <slug>
```

Read `.context/clients/<slug>/photos.png`, then import what is usable:

```bash
node scripts/client/photos.mjs <slug> --cutout --use 1=fleet/<item> ...
```

Prefer the client's real machines over the template's generic imagery — a
contractor recognises their own equipment instantly. Skip stock-looking filler
and anything from the theme demo. Where the client has no usable photo, leave
the template image in place and flag the gap in your summary.

**Know which slots take a photo and which take a cut-out.** Getting this wrong
is the fastest way to make the build look cheap:

| Slot | What belongs there |
|---|---|
| `main/hero`, `project-*`, gallery | full-bleed **photography** |
| `main/mission`, `fleet/*`, `main/light‑medium‑heavy`, `PAGE_HEROES[*].image` | **transparent cut-outs**, no background |

`main/mission` is the trap: it sits on a full-bleed orange band and is rendered
`bg-contain`, so a rectangular photo shows up as a framed picture floating on
orange. It takes a cut-out, like the rest of that column.

**Size decides the source.** A cut-out made from a scraped JPEG holds up at card
size and falls apart when the slot renders it 800px wide — ragged mask edges,
white residue caught in lattice work, visible jaggies. So:

- **Large slots** (`main/mission`, `PAGE_HEROES[*].image`) → use the template's
  own 3D renders from `public/images/services/` and `public/images/equipment/`.
  They are clean vector-grade artwork at 2048px and they are already the right
  orange. `git ls-tree -r main --name-only public/images/` to see the catalogue;
  a crane company gets `services/crane-rental.webp`, and there are equivalents
  for excavators, loaders, lifts and telehandlers.
- **Card-size slots** (`fleet/*`, `main/light‑medium‑heavy`) → the client's own
  cut-out machines. Small enough that the mask holds, and specific enough that
  the client recognises their kit.

Before shipping, view every large slot at full size, not just in the page
screenshot. That is where a bad mask shows.

The template's inner-page heroes are floating objects on transparent
backgrounds, never rectangular photos parked in the top-right corner. Look at
`git show main:public/images/solutions/hero.webp` if you need the reference.

Always pass `--cutout` for the cut-out slots. It flood-fills the studio sweep
inward from the border (so white cabs and white lettering survive), feathers the
edge, divides the background back out of semi-transparent pixels so there is no
pale halo, and fades the drop shadow using a saturation test that leaves the
paintwork alone. Verify by compositing the result on a dark background — a halo
that is invisible on white is obvious on black.

If a client's photos are shot on a real scene rather than a sweep, `--cutout`
detects that and leaves them untouched. Those need proper segmentation (`rembg`,
or a paid API) — flag it rather than shipping a bad mask.

## 5. Identity

Write `.context/clients/<slug>/site.json`:

```json
{
  "name": "", "tagline": "", "phone": "", "whatsapp": "", "email": "",
  "address": "", "hours": "",
  "seo": { "title": "", "description": "", "ogDescription": "" },
  "map": { "lat": 0, "lng": 0, "zoom": 15 },
  "contacts": [ { "title": "Head Office", "address": "", "phone": "", "email": "" } ]
}
```

Then:

```bash
node scripts/client/apply.mjs <slug>          # --dry to preview
```

This rewrites `SITE`, `CONTACTS`, page metadata and the map embed, and installs
the client's mark as `icon.png`, `apple-icon.png` and `favicon.ico` while
removing the template's `icon.svg`. Every patch is anchored on an exact pattern
and the script refuses to write anything if one anchor is missing — so if the
template was refactored, you get a loud failure, never a silent half-application.

The favicon matters more than it looks: the browser tab, bookmarks and history
are the last place the template's own brand survives, and no page screenshot
ever shows them. Check the actual tab. If the client's logo is a detailed
emblem it will be unreadable at 16px — say so and ask them for a simplified
mark, the same way you ask for a vector logo.

## 6. Editorial content

Hand-write these in `src/lib/constants.ts`, from the harvested page texts:

`HERO` · `PAGE_HEROES` · `KEY_ASSETS` · `FEATURES_SLIDES` · `STATS_TABS` ·
`STATS_HEADING` · `MISSION` · `PILLARS` · `PRODUCTS_DUAL` · `PROJECTS_INTRO` ·
`PROJECTS` · `TESTIMONIALS` · `NAV_LINKS` · `FLEET` · `WEIGHT_CLASS_LABELS` ·
`SOLUTIONS` · `SERVICES_PRIMARY` · `SERVICES_ADDITIONAL`

Rules:

- **Quote real testimonials verbatim.** Never fabricate a review or a client name.
- **Use their real numbers**, or leave the stat out. Many sites ship placeholder
  counters like "1+ years of experience" — those are not data.
- Keep the template's structure and reinterpret the *labels*: a crane company's
  weight classes are tonnage bands, an equipment yard's are machine weights.
- Where their site is thin (most are), write copy that is *consistent with* what
  they do without asserting specifics you cannot support — no invented
  certifications, client names, or project addresses.
- Note contradictions you find rather than silently picking one. Al Badar's
  homepage says Dubai and its About page says Abu Dhabi; that is a question for
  the client, not a coin flip.

If a section has no honest equivalent for this client, cut it from the page
rather than filling it with padding.

## 7. Verify

```bash
npx tsc --noEmit && npm run build
grep -rn "Heavy Rentals\|heavyrentals" src/   # must return nothing
```

Then run the dev server and **look at every page** with the browser tools:
`/`, `/fleet`, `/solutions`, `/services`, `/contacts`, plus one detail page of
each type. You are looking for template copy that survived, empty filter
categories, broken images, and a logo that is illegible at header size.

Any hardcoded string you find in a component is a template bug: move it into
`constants.ts` and read it from there. That is how the pipeline gets better with
each client instead of accumulating per-client hacks.

## 8. Ship the link

**The link is the deliverable.** Not the branch, not the commit — the URL the
user forwards to the client. A rollout that ends without a working public link
is not finished, however good the build is.

```bash
git add -A && git commit -m "client: <name> — <url>"
git push -u origin client/<short-slug>
node scripts/client/deploy.mjs <slug>
```

`deploy.mjs` exists because the same three things broke by hand every time:

1. **The URL must look like the client's own.** Never hand over
   `heavy-rentals-git-client-x-denisartemmenko-3788s-projects.vercel.app` — it
   shows the template's name and the account slug. The script gives each client
   their own Vercel project and aliases it to their domain with `.com` swapped
   for `.vercel.app`: `albadarmobilecrane.com` → `albadarmobilecrane.vercel.app`.
2. **Vercel protects new projects by default,** so the link bounces the client
   to a Vercel login. The script turns protection off. This is invisible from
   your own browser because you are already signed in — which is exactly how it
   shipped broken more than once.
3. **The alias points at one immutable build** and goes stale after the next
   push, so the script re-points it every run.

The script finishes by fetching five pages with no cookies and refuses to
declare success if any of them redirect to a Vercel login. **Never report a link
you have not seen pass that check** — a signed-in browser will happily show you
a page the client cannot open.

## 9. Hand over

Report to the user, in the language they are writing to you in:

- **the link, first, on its own line**
- what you could not source and left as template default
- contradictions and placeholder data found on the client's site
- what you need from the client — a vector logo and a simplified icon mark are
  the usual two, real yard photography the most valuable

If the client signs, move the branch to its own repo so the template stays a
template. The Vercel project is already separate.

## Standing rules

Things the user has had to repeat. Do not make them say these again.

- **Answer in Russian.** The user writes in Russian; reply in Russian unless
  they switch. Code, commit messages, identifiers and file contents stay in
  English.
- **Lead with the link.** Every hand-off message starts with the URL.
- **Never change the accent colour.** See step 3.
- **Never leave the template's favicon.** See step 5.
- **Never leave a link behind a Vercel login.** See step 8.
- **Look at what you shipped.** Open the built pages, view large images at full
  size, check the browser tab. Most of the misses above were invisible in a
  page-level screenshot and obvious in ten seconds of actually looking.
