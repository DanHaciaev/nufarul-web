# Nufărul — public website

Landing site for S.A. „Nufărul” (dry cleaning & laundry, Chișinău). Next.js 16 + Tailwind 4, static output, Romanian (`/ro`) and Russian (`/ru`).

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /ro
npm run build && npm start
```

## Pages

`/ro` and `/ru` each have: home, `/servicii` (overview), `/servicii/<slug>` (7 service pages with their own price tables), `/preturi` (full price list with search), `/despre`, `/contacte` (all reception points), `/regulament` (service regulation).

## Updating prices

```bash
node scripts/import-prices.mjs   # re-reads nufarul.com/{ro,ru}/order-online.html → src/content/prices.json
```

Then rebuild. Which price categories show on which service page is set in `src/content/services.ts`.

## Where things live

- `src/content/ro.ts`, `src/content/ru.ts` — all page copy. `ru.ts` is typed against `ro.ts`, so a missing key fails the build.
- `src/content/site.ts` — reception points, phones, hours, client logos, partner brands, links to the existing order system on nufarul.com.
- `src/app/globals.css` — palette tokens (logo azure, brand blue / navy / sand from the internal order system) and the animation classes.
- `src/components/Motion.tsx` — one IntersectionObserver driving `.reveal`, `.unveil`, `.draw` and counters; respects `prefers-reduced-motion`.
- `public/img/` — photos taken from nufarul.com (slider crops without baked-in text, equipment and laundry photos) and client logos.

Discounts and shareholder documents still link to the old nufarul.com pages.
