# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Phil Strats is a **mock** Philippines travel blog. The site's priorities are a cohesive brand, strong visuals, and easy navigation. It is built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4 (`@tailwindcss/typography`), and deployed on Netlify at https://philippinestrategies.netlify.app. The owner no longer has `philippinestrategies.com` or `philstrats.com`.

## Commands

```bash
npm run dev     # dev server (Turbopack) at http://localhost:3000
npm run build   # static export to out/ (next.config.ts sets output: 'export')
npm run lint    # next lint (eslint-config-next)
```

There is no test suite. `npm run build` is the real check: it type-checks the code and validates every article's frontmatter (see below).

## Architecture

- **Static export:** there are no API routes, no server runtime, and images are `unoptimized` (plain `<img>` tags; the lint rule is turned off). The contact form sends through `@emailjs/browser` (`src/app/contact/ContactForm.tsx`). Newsletter forms post to Buttondown (`ui/NewsletterForm.tsx`).
- **Path alias:** `@/*` maps to `src/*`.
- **Site config:** `src/lib/site.ts` holds `SITE_URL`, the brand name and tagline, socials, and the `NAV` array. The header, footer, sitemap and metadata all read from it, so change the domain or nav links there.

### Articles

The markdown files in `src/content/<slug>.md` are the only source of article data.
- `src/data/articles.ts` reads them at build time:
  - `getAllArticles()` returns `ArticleSummary[]`, newest (highest `id`) first, with no body. Client components can use it, for example `articles/ArticleBrowser.tsx`.
  - `getArticleBySlug()` renders the body with unified, remark-gfm and rehype-slug, and collects the `##` headings into `toc` for the table of contents.
- **Validation:** the build fails if a file's `slug` doesn't match its filename, if `category` or `islandGroup` isn't a slug from `src/data/taxonomy.ts`, or if `public/images/<slug>.jpg` is missing.
- **Adding an article:** copy `src/data/template.md` into `src/content/`, fill in the frontmatter, and add the hero image. The sitemap (`src/app/sitemap.ts`), the listings, and related and prev/next links all update on their own.
- **Client-side safety:** client components may only `import type` from `src/data/articles.ts`, because it uses `fs`. Put shared helpers that run in the browser in `src/lib/` (for example `formatDate` in `src/lib/format.ts`).
- **Destinations page:** `/articles` filters with query params (`?category=`, `?region=`, `?q=`), read through `useSearchParams` inside a `<Suspense>` boundary. The home page tiles, the footer, and article tags all link to those URLs.

### Other content

- `src/data/blurbs.json`: external article links with commentary. `blurbs.ts` sorts them newest first and adds `source` (the link's domain).
- `src/data/siteFaq.ts`: the FAQ on the Contact page. Both it and article FAQs render through `components/FAQ.tsx`.

### Styling and components

- **Design tokens:** defined in the `@theme` block in `src/app/globals.css`. Palette: `ocean` (ink and chrome), `lagoon` (actions and links), `sand` (surfaces), `coral` and `mango` (accents), and `muted` (secondary text). Use these instead of the default Tailwind grays. Fonts are Fraunces (`font-display`, which headings use automatically) and Inter (`font-sans`). Their CSS variables are set on `<html>` in `layout.tsx`.
- **Shared UI:** lives in `src/app/components/ui/` (`Button`, `ArticleCard`, `Badge`, `Container`, `SectionHeading`, `NewsletterForm`, which needs a unique `id`). Inner pages start with `components/PageHero.tsx`.
- **Animation:** `.reveal` adds a CSS scroll-driven fade-in, and `.prose-brand` styles the article body. Both respect `prefers-reduced-motion`.
- **Layout:** `components/Layout.tsx` combines `SiteHeader` (a client component with the mobile drawer), `SiteFooter`, and `BackToTop`.
- **Metadata:** `layout.tsx` sets `metadataBase` and the `"%s | Phil Strats"` title template, so each page exports only its own `title` and `description`. Article pages also emit JSON-LD (`Article`, `BreadcrumbList`, and `FAQPage`).

## Repo notes

- `.netlify/` (including the built `.netlify/static/`) is committed. Rebuilding or deploying updates those files, so they show up in diffs.
- `out/`, `.next/`, and `.env*` are gitignored.
