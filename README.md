# Petaron.ai website

Marketing site for [Petaron.ai](https://petaron.ai), an AI agent that processes freight orders for forwarders, from email to TMS.

Built with Vite, React, TypeScript, Tailwind and shadcn/ui. Deployed on Vercel (`vercel.json` holds the SPA rewrite).

## Develop

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build to dist/
npm run preview    # serve the production build
npm run test       # vitest
npm run lint
```

## Assets

- `npm run build:icons` regenerates `favicon.ico`, the PNG favicons, `apple-touch-icon.png` and the manifest icons in `public/` from `public/petaron_logo.svg`. Run it whenever the logo changes.
- `node scripts/build-hero.mjs` regenerates `hero-bg.webp` / `hero-bg.avif` from `public/hero-bg.png`.

## SEO

Per-page titles, descriptions and JSON-LD live in `src/lib/seo.ts` and are emitted by `src/components/petaron/SEO.tsx`. Site-wide tags (icons, manifest, theme colour) are in `index.html`.
