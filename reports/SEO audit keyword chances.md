# SEO audit: where Phil Strats can realistically rank

*17 November 2026. This is a keyword-research audit of https://philippinestrategies.netlify.app. The local source in this repo is treated as the truth; differences from the live site are noted. No project files were edited.*

> **Data note.** No SEO tool (Ahrefs or Semrush) is connected, so there are no search volumes, keyword difficulty scores or ranking positions here. Difficulty is judged by searching 15 candidate queries on the web and looking at who ranks. The search tool is not Google itself, so treat these as good signals of competition, not exact SERPs. For more precise volume and difficulty data, connect an SEO tool like Ahrefs or Semrush via MCP. The audit can then be filled in with real ranking data.

---

## Executive summary

Phil Strats has an unusually strong content model for a new site. Each of its 29 destination guides answers the exact questions that long-tail searchers type: best month, how to get there from a named city, cost per day, fees, and itineraries by length. The H2s already match those queries word for word ("Best time to visit El Nido", "How to get to El Nido", "How much does a El Nido trip cost?"). **Its biggest strength is structured, current, specific logistics** (for example, "direct Manila–El Nido flights ended 29 March 2026" and "₱400 eco fee, 10 days"). Most of the blogs that rank for these queries are 2014–2023 posts with stale prices.

**The single biggest blocker is authority.** The site is on a `netlify.app` subdomain with likely zero backlinks, and it competes with travel blogs that have years of links. The subdomain alone isn't fatal: several SERPs checked include sites on `vercel.app` and `pages.dev` subdomains (for example, `visitbatanes.vercel.app` for "best time to visit Batanes" and `tabiji.pages.dev` for "Boracay vs Siargao"). Those pages win by matching the query exactly. That's the lane open to Phil Strats.

**Top 3 priorities:**
1. **Pre-render every tab's content.** In the new interactive guide, the route, month and itinerary tabs only render the *active* panel. So most "how to get there from Cebu", "3-day itinerary" and month-specific text isn't in the static HTML that Google indexes (details below).
2. **Rewrite the title tags around the query** ("El Nido Budget, Itinerary & Best Time (2026)" rather than "El Nido Palawan Travel Guide: Island Hopping & Top Spots"). Most current titles run to about 70 characters with the suffix, and they lead with brand-style phrases instead of the terms people search.
3. **Build comparison pages and a few backlinks.** "[A] vs [B]" pages and less-saturated destinations (Britania, Lake Sebu, Bantayan, Port Barton, Baler) are where a zero-authority site can get onto page 1. A handful of links (Reddit/forum answers, HARO-style pitches, being a listed source) is what takes it from page 3 to page 1.

**Overall assessment: needs work.** The foundation is strong, but there's one critical indexation issue in the new guide component, and the authority gap is real.

### Live site versus local source

| Area | Live (deployed) | Local source (truth) |
|---|---|---|
| Guide format | Long prose articles (about 470–560 body words) with H2s such as "3-Day El Nido Itinerary" | Interactive `DestinationGuide`, with a markdown body of only 36–91 words ("The story behind the guide") |
| Guides in sitemap | 20 guides plus `/blurbs` | 29 guide files (adds Albay, Baler, Bantayan, Dumaguete, Iloilo, La Union, Port Barton, Britania, Lake Sebu) |
| `/blurbs` | Returns 200 and is in the sitemap | Deleted, with a 301 to `/articles` in `public/_redirects` |
| Images | — | **`port-barton-palawan`, `britania-islands-surigao` and `lake-sebu-south-cotabato` have no `public/images/<slug>.jpg`, `-800.jpg` or `-og.jpg`**, so `npm run build` will fail until they're added (presumably work in progress) |

---

## Keyword opportunity table

Difficulty here comes from who ranked in the web searches (see the competitor section). Volume signals are relative judgements, not measured numbers. "Current ranking" is "not ranking" for all of them: the site has no measurable visibility for these terms, and none of the 15 searches showed it.

| # | Keyword | Est. difficulty | Opportunity | Current ranking | Intent | Recommended content type |
|---|---|---|---|---|---|---|
| 1 | how to get to Britania Islands (from Manila / Butuan) | Easy | **High** | Not ranking | Informational | Existing guide; route tabs must be in the HTML |
| 2 | Lake Sebu travel guide / how to get to Lake Sebu | Easy | **High** | Not ranking | Informational | Existing guide (needs images to build) |
| 3 | Port Barton vs El Nido | Easy–moderate | **High** | Not ranking | Commercial investigation | New comparison page |
| 4 | Bantayan Island budget / itinerary 3 days | Easy–moderate | **High** | Not ranking | Informational | Existing guide plus pre-rendered itinerary tabs |
| 5 | Siquijor budget per day | Easy–moderate | **High** | Not ranking | Informational | Existing guide; add static per-style ₱/USD table |
| 6 | Pagudpud itinerary 2 days | Easy | **High** | Not ranking | Informational | Existing guide (2- and 3-day tabs) |
| 7 | Camiguin itinerary 3 days | Easy–moderate | **High** | Not ranking | Informational | Existing guide (the 3-day tab is the default, so it's already in the HTML) |
| 8 | Siquijor vs Siargao / Camiguin vs Siquijor | Easy–moderate | **High** | Not ranking | Commercial investigation | New comparison page |
| 9 | Malapascua budget / thresher shark dive cost | Easy–moderate | High | Not ranking | Informational | Existing guide plus fee table |
| 10 | how to get to Baler from Manila | Moderate (Rome2rio, 12Go) | High | Not ranking | Informational | Existing guide (the "Manila" route is first, so it's in the HTML) |
| 11 | El Nido environmental fee 2026 | Moderate | High | Not ranking | Informational | Existing fee table; add a dated FAQ |
| 12 | how to get to El Nido from Manila 2026 (no direct flights) | Moderate | High | Not ranking | Informational | Existing guide; fix the stale FAQ (see on-page issues) |
| 13 | Boracay vs Siargao | Moderate | Medium | Not ranking | Commercial | New comparison page |
| 14 | best time to visit Batanes | Moderate | Medium | Not ranking | Informational | Existing guide; render all 12 month notes |
| 15 | Batanes budget / Batanes itinerary 4 days | Moderate | Medium | Not ranking | Informational | Existing guide |
| 16 | Dumaguete to Apo Island / Apo Island day trip cost | Easy–moderate | Medium | Not ranking | Informational | Existing guide |
| 17 | Iloilo Guimaras itinerary | Easy–moderate | Medium | Not ranking | Informational | Existing guide |
| 18 | Albay Mayon itinerary / Legazpi budget | Easy–moderate | Medium | Not ranking | Informational | Existing guide |
| 19 | [destination] travel cost calculator | Easy (few pages target it) | Medium (low volume) | Not ranking | Transactional/tool | Use the calculator as the hook in titles and FAQ |
| 20 | is Siargao worth it | Moderate | Medium | Not ranking | Commercial | "Is Siargao for you?" section; consider an H2 using "worth it" |
| 21 | El Nido vs Coron | Hard (about 15 strong blogs) | Low–medium | Not ranking | Commercial | Comparison page; win on 2026 logistics |
| 22 | El Nido itinerary 3 days | Hard | Low | Not ranking | Informational | Existing guide (3-day tab currently hidden) |
| 23 | Boracay budget per day | Hard (calculators, affiliates) | Low | Not ranking | Informational | Existing guide |
| 24 | where to go in the Philippines in [month] | Moderate–hard | Medium (aggregation) | Not ranking | Informational | New `/when/[month]` pages built from `guide.months` |
| 25 | philippines travel guide / philippines travel | Very hard | Low | Not ranking | Informational | Don't target this |

---

## Critical finding: much of the guide content isn't in the static HTML

`DestinationGuide.tsx` is a `"use client"` component, and Next pre-renders it at build time, so most of its text **is** in the static HTML. These parts are fully present: the verdict, quick facts, best-for tags, the full list of things to do (the default filter is "All"), stays, eats, getting around, the fee table, essentials, the packing list, the FAQ and the FAQPage JSON-LD.

Three widgets render **only the active panel** on the server, so the rest of their content exists only in the JS payload:

| Widget | Code | What ends up in the static HTML | What's missing |
|---|---|---|---|
| Route tabs | `Tabs` → `<div role="tabpanel">{render(active)}</div>`, `active = 0` | Only `routes[0]` (for example, El Nido "Clark or Cebu") | Every other origin: El Nido "Puerto Princesa" and "Coron", Coron's 2nd and 3rd routes, Bantayan's 2nd and 3rd, and so on. This is the "how to get to X from Y" content |
| Month picker | `MonthDetail month={month ?? firstGreat}` | One month's note plus "Best months overall: …" | The other 11 monthly notes (the "X in July" and "rainy season" text) |
| Itinerary tabs | Default `days = itineraryKeys[floor(len/2)]`, renders `ItineraryDays` for one key | One itinerary length | **The 3-day plan isn't in the HTML for any guide whose keys are [3,5] or [3,5,7]**: Albay, Batanes, Boracay, Dumaguete, El Nido, Iloilo, Port Barton, Siargao. Guides with keys [3,4] or [2,4] show 4 days; [1,2] shows 2 |
| Budget calculator | Default style `midrange`, 2 travelers | Midrange bars and one total | Backpacker and comfort per-day numbers ("Siquijor budget backpacker") |

Google does render JavaScript, but it only indexes what the rendered page shows *without clicks*, so hidden tab content that isn't in the DOM is effectively invisible. **Fix:** render every panel in the DOM and hide the inactive ones with `hidden` (or CSS). Do the same for the 12 month notes (for example, a visually compact `<details>` list or a hidden table) and add a small static "per day by style" table (backpacker, midrange and comfort, in ₱ and US$). The interactivity stays the same and the indexable text roughly doubles.

There's also a related regression: the **deployed** prose versions have about 470–560 words of body text, with H2s like "3-Day El Nido Itinerary". Deploying the redesign without this fix would cut the text Google sees for some of the highest-intent queries.

---

## On-page issues

| Page | Issue | Severity | Recommended fix |
|---|---|---|---|
| All guides (`DestinationGuide.tsx`) | Inactive route, month and itinerary panels aren't in the HTML (above) | **Critical** | Render all panels and toggle them with `hidden` |
| All guides | `<title>` is 49–60 characters plus " \| Phil Strats" (14), so 63–74 characters. Many are truncated in the SERP, and titles lead with "Travel Guide: [poetic phrase]" instead of the query terms | High | Pattern: `[Place] Travel Guide 2026: Budget, Itinerary & Best Time` (keep it ≤ 60 characters including the suffix, or drop the suffix on guides via `title: { absolute }`) |
| All guides | The H1 is the same as the title, and there's no year or "budget/itinerary" modifier | Medium | Keep the H1 descriptive. Put the modifiers in the title and in the first sentence of the verdict |
| `el-nido-palawan.md` FAQ | "How do I get to El Nido from Manila?" answers "fly directly to El Nido Airport (Lio) via AirSWIFT". That contradicts the guide's own route tip that direct Manila flights ended in March 2026, and it goes into FAQPage JSON-LD | **High** (accuracy and trust) | Rewrite it: connect via Clark or Cebu, or fly to Puerto Princesa and take a 5–6 hour van |
| `el-nido-palawan.md` FAQ | "Do I need to book island tours in advance" has no question mark | Low | Add "?" |
| All guides | The meta description (125–149 characters) is a generic "Discover/Plan…" line with no number, year or calculator hook | Medium | Include one concrete fact and the tool, for example "₱3,000–7,000/day, 3- & 5-day itineraries, ₱400 eco fee and a trip cost calculator. Checked Nov 2026." |
| All guides | The markdown body is 36–91 words. The only free-form prose is "The story behind the guide" | Medium | Once the tab fix is in, add 150–300 words of first-hand "honest take" prose to each guide (who it's for, a mistake to avoid). This is what separates it from AI itinerary pages such as layla.ai |
| All guides | The H2 "How much does a El Nido trip cost?" uses the wrong article for vowel-initial places (El Nido, Iloilo, Intramuros) | Low | Use "How much does a trip to El Nido cost?" (it also matches the query better) |
| All guides | There's no "[place] budget per day" phrase in an H2 or H3, and the calculator total depends on state | Medium | Add an H3 "Daily budget in [place]" above a static table |
| Article JSON-LD | `about: TouristDestination` uses `article.region` ("Palawan"), not the place | Low | Use `guide.place` and add `geo` coordinates once lat/lng exist |
| Batanes guide | Only one route ("Manila or Clark") | Low | Add a Basco → Sabtang/Itbayat route tab |
| Port Barton, Britania, Lake Sebu | Hero, 800 and OG images are missing, so the build fails | **Critical** (blocks deploy) | Add `public/images/<slug>.jpg`, `-800.jpg` and `-og.jpg` |
| Guides | Internal links are limited to 2 hand-written links in the story body, plus the related, prev/next and tag links (tags go to `?q=` search URLs, not real pages) | Medium | Add a "Compare with" block (`pairsWith`) and region hub pages; link from the FAQ answers ("Is Coron better than El Nido?" → comparison page) |
| `/articles?category=…&region=…` | Filter views are client-side query-param URLs that all canonicalize to `/articles`, so no category or region page can rank | Medium | Static `/region/palawan`, `/region/mindanao` and `/category/beaches-islands` pages with an intro paragraph |
| Image alt | Hero alt text is descriptive and keyword-relevant (Pass). `ArticleCard` and pager thumbnails use `alt=""` (fine, decorative) | — | None |
| URLs | Clean slugs, but some are inconsistent: `siargao-surfing-capital` and `cebu-kawasan-falls-oslob` | Low | Leave them (changing URLs on a new site costs more than it gains). Use the cleaner pattern `[place]-[province]` for new slugs |

---

## Content gap recommendations

| Topic / keyword | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| **Comparison pages**: Port Barton vs El Nido, Siquijor vs Siargao, Camiguin vs Siquijor, Boracay vs Siargao, Coron vs El Nido, Bantayan vs Malapascua, La Union vs Baler | "vs" SERPs are mostly small blogs (Journey Era, Girl on a Zebra, lakwatsero), and sites as weak as `tabiji.pages.dev` and `layla.ai` show up. The data (months, budget styles, routes, fees) already exists in frontmatter, so pages can be generated at build time with side-by-side tables | Static `/compare/[a]-vs-[b]` pages with 200–400 words of hand-written verdict | **High** | Moderate (template), then about 1 hour per pair |
| **Less-saturated destinations**: Britania, Lake Sebu, plus candidates such as Kalanggaman, Calaguas, Sipalay, Apo Reef, Tinuy-an Falls, Gigantes Islands | SERPs for these are dominated by philippinebeaches.org, transitpinas, lakwatsero and the pinay solo backpacker, often with 2019–2022 fares. A dated, structured 2026 guide is a credible page-1 contender | New guide (existing template) | **High** | Moderate per guide |
| **`/when/[month]` pages** ("where to go in the Philippines in July") | Built from `guide.months` across every guide; 12 indexable pages that link into each guide | Static aggregation pages | High | Moderate |
| **"How to get from A to B" legs**: Puerto Princesa → El Nido, Coron → El Nido ferry, Cebu → Bantayan, Cebu → Malapascua, Butuan → Britania, GenSan → Lake Sebu | Searchers type these exact route queries, and Rome2rio and 12Go rank with generic data. Human, dated steps beat them on helpfulness | Either expose every route tab in the HTML (cheapest) or create route pages for the top 6 | High | Quick win (tab fix) / moderate (pages) |
| **Fees hub**: "Philippines environmental fees 2026" (El Nido ₱400, Boracay, Coron, Siargao, Britania ₱20, etc.) | Fee queries are niche, with fresh, conflicting data (the El Nido search showed ₱200 vs ₱400 across sources). A single dated table becomes a natural link target | One page, generated from `guide.fees` | Medium | Quick win–moderate |
| **First-timer / eTravel / ATM hub** | High demand, but harder (big publishers) | Hub page | Medium | Moderate |
| **"Is [place] worth it" sections** | Common PAA (People Also Ask) pattern. The "Is X for you?" verdict already answers it | Add an FAQ entry "Is [place] worth visiting?" to each guide | Medium | Quick win |
| **Freshness** | Every guide says "Checked Nov 2026", which is a differentiator against 2014–2023 blogs. It only helps if it stays true | Quarterly re-check; keep `updated` truthful | Ongoing | — |

---

## Technical SEO checklist

| Check | Status | Details |
|---|---|---|
| Static HTML / crawlability | **Warning** | Static export, so pages are fully pre-rendered. But inactive tab panels aren't in the DOM (see the critical finding) |
| robots.txt | Pass | `Allow: /`, with the sitemap referenced (live confirmed) |
| XML sitemap | Warning | Generated from content, which is correct. The live version is stale (20 guides plus `/blurbs`) until you deploy. Resubmit it in Search Console after deploying |
| Canonical tags | Pass | Guides use `/articles/[slug]` and `/articles` sets its own canonical. Trailing-slash URLs 301 to the non-slash URL (confirmed live) |
| Redirects | Pass (local) | `/blurbs` 301s to `/articles` in `_redirects`. The live site still serves `/blurbs` with a 200 |
| HTTPS | Pass | Netlify TLS |
| Structured data | Pass / note | WebSite, Organization, Article, BreadcrumbList, FAQPage and ItemList. Note that Google restricted FAQ rich results to authoritative government and health sites in 2023, so FAQPage won't produce SERP stars. It's still harmless and helps answer engines |
| Search Console verification | Pass | `verification.google` is set in `layout.tsx` |
| Mobile | Pass (from code) | Viewport set, responsive Tailwind layout, tap targets sized as pills |
| Page speed / CWV | Warning | The hero `<img>` uses `fetchPriority="high"` (good for LCP). But GTM loads with `beforeInteractive` **and** gtag loads separately (double analytics); `animate-hero-zoom` on the LCP image; and the 846-line client component hydrates on every guide. Live HTML is about 120 KB. Run PageSpeed Insights after deploying |
| Images | Warning | `unoptimized` plain `<img>` tags (by design). Hero, 800 and OG variants exist except for the 3 new guides (build blocker) |
| Duplicate content | Pass | Query-param views of `/articles` canonicalize to `/articles` |
| Build | **Fail (local)** | Port Barton, Britania and Lake Sebu are missing images, so validation in `articles.ts` will throw |
| Domain | Warning | `*.netlify.app` subdomain: no inherited authority, a hard-to-earn brand signal, and links are tied to a host you may move off later. Google treats it as its own site, so it's not penalized, just starting at zero |

---

## Competitor comparison

Who ranked across the 15 sample queries:

| Query | Who ranks (sample) | Read |
|---|---|---|
| El Nido vs Coron | bemytravelmuse, theworldtravelguy, journeyera, loveandroad, breathingtravel, lakwatsero, layla.ai, wayph, tour operators | Hard: more than 15 established blogs, no big publisher |
| Siquijor budget per day | championtraveler (calculator), etramping, homejourney, geekyexplorer, milehacker | Easy–moderate: thin, generic or old pages |
| Camiguin itinerary 3 days | layla.ai (many AI pages), taraletsanywhere, gamintraveler, joshuagoesrandom, camiguinguide, Expedia tour | Easy–moderate: lots of AI filler, few strong pages |
| how to get to Britania Islands from Manila | philippinebeaches.org, transitpinas, plus *irrelevant* Rome2rio pages for other islands | **Easy**: the engine couldn't find a good answer |
| El Nido environmental fee 2026 | suroy.ph, elnidoresorts, Palawan Daily News, conflicting ₱200/₱400 | Moderate: a gap for a clean, dated answer |
| best time to visit Batanes | **visitbatanes.vercel.app**, Traveloka, tripbase, traveldojo, Rappler | Moderate, and proof that a free-subdomain site can rank |
| Bantayan Island budget | lakwatsero (2014 data), philippinebeaches, homejourney, milehacker, Notion page | Easy–moderate |
| is Siargao worth it | girlonazebra, alajode, beyondthebay, GMA, journeyera | Moderate |
| how to get to Baler from Manila | philippinebeaches, Rome2rio (many), 12Go | Moderate: aggregators dominate |
| Pagudpud itinerary 2 days | layla.ai, a 2013 Blogspot post, GMA, lakwatsero comment pages | **Easy** |
| Siargao vs Boracay | kubo.com.ph, **tabiji.pages.dev**, Skyscanner, lemon8, Monocle | Moderate, thin content |
| Boracay budget per day 2026 | **travel-budget-bx6.pages.dev**, travelcostcalculator.org, affiliate sites | Hard on volume, but calculator-style pages win |
| Lake Sebu how to get there | lakwatsero, two monkeys, transitpinas, pinay solo backpacker, Trip.com | Easy–moderate |
| Port Barton vs El Nido | girlonazebra, 12Go and Bookaway route pages, the poor traveler (2018) | **Easy–moderate**: few pages actually compare |
| Malapascua budget / thresher cost | pinay solo backpacker, liveaboard.com, `pages.dev` sites, lakwatsero | Easy–moderate |

**Pattern:** Lonely Planet and Klook barely show up on these long-tail queries. They're won by Filipino and expat travel bloggers (lakwatsero, philippinebeaches.org, the pinay solo backpacker, girlonazebra), aggregators (Rome2rio, 12Go) and AI or programmatic pages (layla.ai, `*.pages.dev`). Many winning pages are years out of date.

| Dimension | Phil Strats | Girl on a Zebra (girlonazebra.com) | Lakwatsero (lakwatsero.com) | Winner |
|---|---|---|---|---|
| Keyword count | ~0 ranking | Hundreds of Philippines terms, refreshed "2026" titles | Hundreds; long-tail destination guides since about 2010 | Competitors |
| Content depth | 29 structured guides (fees, routes, budgets, itineraries); about 60 words of prose each | 2,000–4,000-word first-person posts plus "vs" and "worth it" posts | Long guides, big comment threads, often old fares | Tie on depth; Phil Strats wins on structure and freshness |
| Publishing frequency | About 9 new guides this month (in progress) | Regular | Slower, with updates | Competitors |
| Backlink signals | Likely none; netlify.app subdomain | Established blog with many referring domains | Older, strong local authority | Competitors (by far) |
| Technical | Static, fast, full schema, but hidden tab content | WordPress, ad-heavy | WordPress, ad-heavy | Phil Strats (after the tab fix) |
| SERP features | None | PAA appearances on "worth it" / "vs" | Appears for many local "how to get to" queries | Competitors |
| Tools | Budget calculator, month picker, itinerary switcher, packing list | None | None | **Phil Strats** |

---

## Where Phil Strats can realistically rank

The order below combines the SERP weakness observed with how well each guide already covers the query.

1. **Less-saturated destination long-tails**: "how to get to Britania Islands", "Lake Sebu travel guide 2026", "Pagudpud itinerary 2 days", "Port Barton budget", "Bantayan itinerary 3 days". The SERPs are thin or old, and Phil Strats has dated specifics.
2. **Underserved comparisons**: Port Barton vs El Nido, Siquijor vs Siargao, Camiguin vs Siquijor, Bantayan vs Malapascua. Few pages actually compare them.
3. **Budget-per-day for mid-tier islands**: Siquijor, Camiguin, Malapascua, Bantayan, Siargao. Competitors are generic calculators or old posts. Phil Strats has three styles in ₱ and USD, but only once they're in the HTML.
4. **Dated logistics queries**: "El Nido environmental fee 2026", "how to get to El Nido from Manila 2026". The flight change makes older posts wrong, which is a real freshness opening (fix the stale FAQ first).
5. **Mid-difficulty "best time to visit"**: Batanes, Siquijor, Camiguin. These are winnable if all 12 month notes are in the HTML, because month-by-month is what the winners provide.
6. **Not realistic for 6–12 months**: El Nido vs Coron, El Nido/Boracay itinerary 3 days, Boracay budget, "Philippines travel". Keep the pages; don't expect traffic.

---

## Prioritized action plan

### Quick wins (this week)

| Action | Impact | Effort | Dependencies |
|---|---|---|---|
| Render every `Tabs` panel and every itinerary length in the DOM, and toggle visibility with `hidden` instead of conditional rendering. Same for all 12 month notes | **High** | 1–2 hrs | — |
| Add a static "Daily budget" table (3 styles × ₱/US$) under the calculator, with an H3 "Daily budget in [place]" | High | 1 hr | — |
| Fix the El Nido FAQ (AirSWIFT direct flight) and audit the other guides' FAQs against their route data | High | 1 hr | — |
| Rewrite all 29 title tags: ≤ 60 characters total, `[Place] Guide 2026: Budget, Itinerary & Best Time`-style, or use `title.absolute` to drop the suffix | High | 1–2 hrs | — |
| Rewrite meta descriptions with one number, the year and "trip cost calculator" | Medium | 1 hr | — |
| Add the missing images for Port Barton, Britania and Lake Sebu, deploy, then resubmit the sitemap and request indexing of the 9 new guides in Search Console | **Critical** to ship | 1 hr | Images |
| Add an "Is [place] worth visiting?" FAQ to each guide | Medium | 1–2 hrs | — |

### Strategic investments (this quarter)

| Action | Impact | Effort | Dependencies |
|---|---|---|---|
| **Comparison pages** generated from frontmatter (`/compare/port-barton-vs-el-nido`, etc.), each with a hand-written verdict; start with the 6 pairs in the gap table | High | 2–3 days for the template, then about 1 hr per pair | Tab fix (shared components) |
| **Backlinks, modestly**: answer specific questions on r/Philippines and r/travel, TripAdvisor and Facebook groups with the relevant guide where allowed; pitch the fees table or `/when` heatmap to small travel newsletters; get listed as a source on Wikivoyage-style resources. The goal is 10–20 real referring domains | **High** (the blocker) | Ongoing, about 2 hrs/week | Something link-worthy (fees hub, `/when`) |
| **Custom domain** (any short `.com` or `.ph`) with a 301 from netlify.app. Do it **before** building links, because links to `*.netlify.app` lose value if you move later. A custom domain doesn't add authority by itself; it protects future authority | Medium (long-term) | 1–2 hrs plus about $12/yr | Update `SITE_URL` |
| `/when/[month]` aggregation pages and region hub pages (`/region/mindanao`) | Medium–high | 1–2 days | — |
| 4–6 more less-saturated guides (Kalanggaman, Calaguas, Sipalay, Gigantes, Apo Reef, Tinuy-an) | High | Half a day each | Images |
| Add 150–300 words of first-hand prose to each guide, plus author and E-E-A-T signals (an about page, how prices are checked) | Medium | 1–2 hrs per guide | — |
| Trim analytics (GTM `beforeInteractive` **and** a separate gtag) and check CWV in PageSpeed Insights | Low–medium | 1 hr | Deploy |

---

## Sources (web searches, November 2026)

- El Nido vs Coron: [Be My Travel Muse](https://bemytravelmuse.com/coron-vs-el-nido), [The World Travel Guy](https://theworldtravelguy.com/coron-vs-el-nido-which-is-better-all-the-differences-explained/), [Journey Era](https://www.journeyera.com/coron-vs-el-nido/), [Love and Road](https://loveandroad.com/coron-or-el-nido-philippines/), [Lakwatsero](https://lakwatsero.com/spots/paradise-compared-coron-or-el-nido)
- Siquijor budget: [Champion Traveler](https://championtraveler.com/price/cost-of-a-trip-to-siquijor-ph), [eTramping](https://etramping.com/travel-philippine-island-siquijor-less-15-dollars-per-day/), [Homejourney](https://www.homejourney.sg/blog/budget-travel-guide-siquijor-mystic-island-homejourney), [Geeky Explorer](https://www.geekyexplorer.com/siquijor-guide-itinerary-blog/)
- Camiguin itinerary: [Tara Let's Anywhere](https://www.taraletsanywhere.com/camiguin-travel-guide), [Gamintraveler](https://www.gamintraveler.com/2023/11/11/3-days-camiguin-itinerary/), [Camiguin Guide](https://camiguinguide.com/plan-your-trip), [layla.ai](https://layla.ai/itinerary/camiguin-island-paradise-in-3-days/018f63bf-bbec-7d1f-9bfd-24836fbc7dbe)
- Britania: [Philippine Beaches](https://www.philippinebeaches.org/britania-islands-surigao-del-sur-important-tips/), [TransitPinas](https://transitpinas.com/transitpinas-surigao-del-sur-britania-group-of-islands/)
- El Nido fee: [Suroy.ph](https://suroy.ph/el-nido-travel-guide/), [El Nido Resorts policy](https://elnidoresorts.com/?p=5797), [Palawan Daily News](https://palawandailynews.com/environment/govt-intensifies-environmental-monitoring-in-el-nido/)
- Batanes: [visitbatanes.vercel.app](https://visitbatanes.vercel.app/travel-guide/best-time-to-visit-batanes), [Tripbase](https://www.tripbase.com/destinations/batanes-philippines/when-to-visit/), [Traveldojo](https://www.traveldojo.com/batanes-islands/), [Rappler](https://www.rappler.com/life-and-style/travel/how-to-plan-trip-batanes/)
- Bantayan: [Lakwatsero](https://lakwatsero.com/destinations/travel-guide-bantayan-island), [MileHacker](https://www.milehacker.com/travel/philippines/bantayan-island/bantayan-island-itineraries-3-days-1-week-budget-t/), [Homejourney](https://www.homejourney.sg/blog/homejourney-budget-travel-guide-bantayan-island-hidden-paradise-202512211202)
- Siargao worth it: [Girl on a Zebra](https://girlonazebra.com/is-siargao-worth-visiting/), [Beyond the Bay](https://beyondthebay.co/philippines/is-siargao-worth-visiting), [Journey Era](https://www.journeyera.com/siargao-itinerary-expenses/)
- Baler: [Philippine Beaches](https://www.philippinebeaches.org/how-to-get-to-baler-from-manila-clark-and-baguio/), [Rome2rio](https://www.rome2rio.com/s/Manila/Baler), [12Go](https://12go.com/en/travel/manila/baler)
- Pagudpud: [Lakwatsero](https://www.lakwatsero.com/destinations/pagudpud/comment-page-5/), [GMA](https://www.gmanetwork.com/news/lifestyle/travel/962677/48-hours-in-ilocos-your-ultimate-two-day-adventure-itinerary/story), [2013 blog](https://themaquintosh.blogspot.com/2013/03/pagudpud-two-day-itinerary.html)
- Siargao vs Boracay: [Kubo](https://kubo.com.ph/battle-of-the-beaches-2024-boracay-cebu-palawan-or-siargao/), [tabiji.pages.dev](https://tabiji.pages.dev/compare/boracay-vs-siargao), [Girl on a Zebra: Siargao vs Siquijor](https://girlonazebra.com/siargao-vs-siquijor/)
- Boracay budget: [travel-budget-bx6.pages.dev](https://travel-budget-bx6.pages.dev/city/boracay), [Travel Cost Calculator](https://travelcostcalculator.org/backpacker/boracay)
- Lake Sebu: [Lakwatsero](https://www.lakwatsero.com/destinations/travel-guide-lake-sebu/), [TransitPinas](https://transitpinas.com/lake-sebu-south-cotabato-travel-guide-2020/), [Two Monkeys](https://twomonkeystravelgroup.com/lake-sebu-south-cotabato-philippines/)
- Port Barton vs El Nido: [Girl on a Zebra](https://girlonazebra.com/is-port-barton-worth-visiting/), [The Poor Traveler](https://www.thepoortraveler.net/2018/04/port-barton-palawan/), [Bookaway](https://www.bookaway.com/routes/philippines/port-barton-to-el-nido)
- Malapascua: [Pinay Solo Backpacker](https://thepinaysolobackpacker.com/malapascua-island-travel-guide/amp), [Liveaboard](https://www.liveaboard.com/diving/philippines/malapascua?CID=7098), [Lakwatsero](https://www.lakwatsero.com/destinations/malapascua-travel-guide/comment-page-1/)
