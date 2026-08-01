# Brixsonn M. Romero — Portfolio

Personal portfolio site. Editorial single-page build: five client platforms, eight
personal projects, seven Anthropic certificates, and the nine-step workflow every
one of them went through.

## Stack

React 19 + TypeScript on Vite 8, Tailwind v4 (CSS-first, no config file), Framer
Motion for animation, Lenis for smooth scroll. Fourteen dependencies total, no UI
library, no router, no CMS.

## Commands

```bash
npm install
npm run dev       # vite dev server on :5173
npm run build     # tsc -b && vite build -> dist/
npm run preview   # serve the production build
npm run lint      # oxlint
npm run check-links   # every outbound URL + local asset path still resolves
npm test              # Playwright smoke suite against the production build
```

Run `check-links` after adding a project. Nothing in the build catches a dead
repo URL or a mistyped screenshot path; this does, and exits 1 so CI can gate on
it.

## Where things live

```
src/
  data/           all site content — edit here, not in components
    profile.ts      name, tagline, summary, workflow steps, tech groups
    experience.ts   client platforms
    projects.ts     personal projects
    certifications.ts
  components/     one file per section, in page order
    shared/       Reveal, ShowcaseRail, Lightbox, TiltCard, MagneticButton
  index.css       design tokens + utilities (Tailwind v4 @theme)
  fonts.css       generated — see scripts/fetch-fonts.mjs
public/
  fonts/          self-hosted woff2 subsets
  assets/         screenshots, certificates, portrait, resume
```

Content is plain TypeScript. To add a project, append to `projects` in
`src/data/projects.ts` and drop its screenshots in `public/assets/projects/`.
Counts shown on the page (`13 platforms`, the About stat row) are derived from
array lengths, so they update themselves.

## Design notes

Two typefaces carry the idea: **Instrument Serif** for anything human, **JetBrains
Mono** for anything the machine says. One violet accent, no gradients. The About
section inverts to cream — which is also why the portrait lives there, since
`mix-blend-mode: multiply` maps its white studio backdrop exactly onto the paper.

Dark by default with no theme toggle. `prefers-reduced-motion` is honored in every
animated component.

## Scripts

One-off maintenance, not part of the build:

```bash
node scripts/fetch-fonts.mjs           # pull woff2 subsets, regenerate src/fonts.css
node scripts/generate-brand-assets.mjs # render favicon.png, favicon.svg, og.png
node scripts/optimize-images.mjs       # assets-original/ -> WebP in public/
```

`assets-original/` holds the source PNGs that `optimize-images.mjs` converts. It is
not served.

## Deploying

Static build, no server. Point Vercel at the repo and it picks up `vercel.json`:
framework `vite`, build `npm run build`, output `dist/`. Any static host works —
the config only exists for the cache headers.

Three cache tiers, and the split matters:

- `/assets/*.js|css` and `/fonts/*` are immutable for a year. Vite fingerprints
  bundle filenames and the font files carry the upstream Google hash, so a change
  always changes the URL.
- `/assets/{experience,projects,certs,me}/*` get one day with revalidation.
  Screenshots are **not** fingerprinted, so caching them forever would strand
  anyone who already visited when you replace an image in place.
- `index.html`, the favicons and `og.png` are left on Vercel's defaults on
  purpose. `index.html` must never be immutable — it points at the hashed
  bundles, so a stale copy would load a deleted asset.

Plus `nosniff`, `strict-origin-when-cross-origin`, `SAMEORIGIN`, and a
`Permissions-Policy` denying camera, microphone and geolocation.

## Performance and accessibility

- Project screenshots are gated on viewport entry, not `loading="lazy"` — Chrome's
  heuristic gives up on the 3D-transformed rail cards and fetches everything.
  Three images load at scroll-0.
- Fonts are self-hosted and preloaded: no third-party requests, CLS 0.011.
- All text passes WCAG AA contrast (465 nodes checked).
- Cache-busting on assets is manual via `?v=` query strings. Bump on brand changes.
