# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Phil Strats is a **mock** Philippines travel site. The site's priorities are a cohesive brand, strong visuals, and easy navigation. It is built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4 (`@tailwindcss/typography`), and deployed on Netlify at https://philippinestrategies.netlify.app. The owner no longer has `philippinestrategies.com` or `philstrats.com`.

Sections: **Destinations** (`/articles`, interactive one-stop guides), **News** (`/news`, short sourced briefs on the Philippines this year), **Showbiz** (`/showbiz`, photo-led Filipino pop culture stories), **Books** (`/books`, well-known books by Filipino authors), **Newsletter** and **Contact**. The old Blurbs section was removed; `public/_redirects` sends `/blurbs` to `/articles`.

## Commands

```bash
npm run dev     # dev server (Turbopack) at http://localhost:3000
npm run build   # static export to out/ (next.config.ts sets output: 'export')
npm run lint    # next lint (eslint-config-next)
npm run images  # resize every images-src/<slug>.jpg into public/images (1600w, -800, -og)
```

There is no test suite. `npm run build` is the real check: it type-checks the code and validates every article's frontmatter, including the `guide:` block and its images (see below).

If the dev server keeps serving an old version of a page after edits, stop it, delete `.next/`, and restart.

## Deploying

Netlify is connected to the GitHub repo (`origin`, branch `main`) and builds with `npm run build` (settings live in the Netlify UI). Pushing to `main` deploys. There is no Netlify CLI in this project.

## Architecture

- **Static export:** there are no API routes, no server runtime, and images are `unoptimized` (plain `<img>` tags; the lint rule is turned off). The contact form sends through `@emailjs/browser` (`src/app/contact/ContactForm.tsx`). Newsletter forms post to Buttondown (`ui/NewsletterForm.tsx`).
- **Path alias:** `@/*` maps to `src/*`.
- **Site config:** `src/lib/site.ts` holds `SITE_URL`, the brand name and tagline, socials, and the `NAV` array. The header, footer, sitemap and metadata all read from it, so change the domain or nav links there.
- **Search Console:** verification tags live in `metadata.verification.google` in `layout.tsx` (two codes; keep both).

### Destination guides (articles)

The markdown files in `src/content/<slug>.md` are the only source of destination data.
- `src/data/articles.ts` reads them at build time:
  - `getAllArticles()` returns `ArticleSummary[]`, newest (highest `id`) first, with no body or guide. It also derives card facts from the guide: `place`, `bestMonths` (from months rated `great`), `budgetFrom` (backpacker spend per person per day) and `idealStay`. Client components can use it, for example `articles/ArticleBrowser.tsx`.
  - `getArticleBySlug()` adds the rendered body, `toc`, the `guide` block and `imageCredit`.
- **The `guide:` block** (types in `src/lib/guide.ts`) drives the interactive page in `components/guide/DestinationGuide.tsx`: month picker, route tabs, budget calculator (PHP/USD), filterable things to do with save, itinerary tabs (keys are day counts), stay/eat, fees, essentials, packing checklist, and a "Your plan" summary. Choices persist per guide in `localStorage` (`useStoredState`). All tab panels render in the HTML (inactive ones `hidden`) so search engines see the full guide. The markdown body is now just a short intro, shown as "The story behind the guide". Articles without a `guide:` block fall back to the classic prose layout.
- **Card fields:** every article needs `card:` (a one-line blurb, about 60–70 characters, in the `BRAND.md` voice); `cardTitle:` optionally overrides the card name. `region` is "Province, Region" (e.g. "Batanes, Cagayan Valley"); cards show the part before the comma.
- **Validation:** the build fails if `card` is missing, if `slug` doesn't match the filename, `category`/`islandGroup` isn't in `src/data/taxonomy.ts`, the `guide:` block is incomplete (`validateGuide`: all fields, 12 months, valid ratings, three budget styles, numeric itinerary keys), or `public/images/<slug>.jpg`, `-800.jpg` or `-og.jpg` is missing. Missing images only **warn** in `npm run dev`, so one article saved before its photo doesn't break every page.
- **Adding a guide:** copy `src/data/template.md` into `src/content/`, fill in the frontmatter, and use `src/content/siargao-surfing-capital.md` as the reference for the `guide:` block. Put the original photo in `images-src/<slug>.jpg` and run `npm run images`. The sitemap, listings, and related and prev/next links update on their own.
- **Photos and credits:** use only freely licensed photos (Wikimedia Commons CC0, public domain, CC BY, CC BY-SA). CC BY/BY-SA photos need an `imageCredit` block (`author`, `license`, `licenseUrl`, `source`); it renders as a caption on the hero.
- **Voice and copy:** follow `BRAND.md` (honest, practical, warm, respectful; no unsupported superlatives; Oxford comma; no em dashes in prose; "faluwa" spelling).
- **Facts:** fees, routes and prices change. Prefix uncertain figures with `≈`, keep `guide.verified` current, and include safety-advisory notes for Mindanao destinations (UK FCDO levels differ by province).
- **Client-side safety:** client components may only `import type` from `src/data/articles.ts`, because it uses `fs`. Put shared helpers that run in the browser in `src/lib/` (`format.ts`, `guide.ts`, `categoryTone.ts`, `newsTone.ts`, `showbizTone.ts`).
- **Destinations page:** `/articles` filters with query params (`?category=`, `?region=`, `?q=`), read through `useSearchParams` inside a `<Suspense>` boundary. The home page tiles, the footer, and article tags all link to those URLs.

### News and Showbiz

- `src/data/news.ts` and `src/data/showbiz.ts` are typed, client-safe arrays (no markdown). `getAllNews()` / `getAllShowbiz()` sort newest first; pages are `/news`, `/news/[slug]`, `/showbiz`, `/showbiz/[slug]`, all in the sitemap with `NewsArticle` JSON-LD.
- Every item must cite `sources` (real outlets, checked against at least two where possible). Write counts that were still changing as early figures, and don't predict results of events that haven't happened.
- News briefs: `topic`, `summary`, two short `body` paragraphs, optional `travelNote` (rendered as the yellow "For your trip" block).
- Showbiz stories: verified achievements, releases and events only (no rumors or private lives). Each needs a freely licensed `image` with credit fields; optimized copies live in `public/images/showbiz/`. `featured: true` pins the lead story; the grid is a bento that repeats every 8 cards.

### Books

- `src/data/books.ts` is a typed, client-safe array of well-known books by Filipino and Filipino-heritage authors; pages are `/books` (shelf with era and language filters) and `/books/[slug]` (`Book` JSON-LD), all in the sitemap and `llms.txt`.
- Each book needs an original `summary` and `body` (no copied blurbs, no spoilers past the setup), a sourced `why`, and `sources`. Leave out claims you can't source.
- Covers are typographic (`components/ui/BookCover.tsx`, palette color from `cover`), because modern covers are copyrighted. A freely licensed scan or portrait can go in `image` with credit fields.
- `setIn` links a book to destination guides (the build fails on an unknown slug); guides show up to three as "Read before you go".

### Other content

- `src/data/siteFaq.ts`: the FAQ on the Contact page. Both it and article FAQs render through `components/FAQ.tsx`.

### Styling and components

- **Design tokens:** defined in the `@theme` block in `src/app/globals.css`, including radii (`rounded-control` 4px for buttons/inputs/tabs, `rounded-card` 8px for cards/panels; `rounded-full` only for small tags and icon buttons). Palette ("jeepney", plus `palm` used only for the Nature card dot): `ocean` (deep navy ink and dark bands), `mango` (sun yellow, the signature accent), `coral` (jeepney red, CTAs and second accent), `sand` (warm white surfaces), `lagoon` (links and small UI only, not large blocks), and `muted` (secondary text). Use these instead of the default Tailwind grays. Fonts are Source Serif 4 (`font-display`, which headings use automatically) and Inter (`font-sans`). Their CSS variables are set on `<html>` in `layout.tsx`.
- **Visual rules:** flat color only, no gradients or blurred glows. Text over photos sits on a solid panel, not a tinted overlay. Photos get `.photo-pop` (a slight saturation/contrast boost). Motion is limited to quick (~150ms) color transitions; no scroll fade-ins, zooms or parallax.
- **Color maps:** `categoryTone.ts` (Beaches yellow, Nature white, Heritage red), `newsTone.ts` and `showbizTone.ts` give each topic a solid tag color.
- **Shared UI:** lives in `src/app/components/ui/` (`Button`, `ArticleCard`, `Badge`, `Container`, `SectionHeading` with a `tone="dark"` option, `NewsletterForm`, which needs a unique `id`). `ArticleCard`: photo on top (3:2) with an ideal-stay badge, then a category dot · area label, the name, the one-line `card` blurb, and Best time / From ₱/day.
- **Inner page headers:** `components/PageHero.tsx` is a solid color band (`tone`: `ocean`, `coral`, `mango`) with an oversized headline, optional `stats` row, and either a three-photo collage (`images`) or a custom `aside` (News uses a latest-headlines card).
- **Image heroes:** the home page and guide pages pull the hero under the sticky header (`-mt-18`); `SiteHeader` turns transparent with white text over them until you scroll. Their titles sit in a solid navy panel over a full-color photo.
- **Layout:** `components/Layout.tsx` combines `SiteHeader` (a client component with the mobile drawer), `SiteFooter`, and `BackToTop`. `.prose-brand` styles markdown bodies.
- **Metadata:** `layout.tsx` sets `metadataBase` and the `"%s | Phil Strats"` title template, so each page exports only its own `title` and `description`. Guide pages also emit JSON-LD (`Article`, `BreadcrumbList`, and `FAQPage`).

## Repo notes

- `.netlify/` (including the built `.netlify/static/`) is committed. Rebuilding or deploying with the Netlify CLI updates those files, so they show up in diffs.
- `images-src/` holds the full-size originals behind `public/images`.
- `out/`, `.next/`, and `.env*` are gitignored. `research_notes/` and `reports/` hold research write-ups and are not part of the site.
