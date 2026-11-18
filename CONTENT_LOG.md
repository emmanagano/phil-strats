# Content log

Read this before any content change (guides, News, Showbiz, Sports, Books) and update it after. It records what each section holds, when it was last refreshed, what was added, and what to check next, so the site stays fresh without repeating or contradicting itself.

**How to use it**
1. Before adding content, check **Status** (last item date per section) and **Watchlist** (follow-ups due).
2. Research only what is newer than the last item date, and skip anything listed in **Log** or already in the data files.
3. After the change, update **Status**, add a dated **Log** entry, and move resolved Watchlist items into the log.
4. Rules stay in `CLAUDE.md` and `BRAND.md` (sources on every story, two outlets where possible, no rumors or predictions, freely licensed photos). This file is the "what and when", not the "how".

## Status

Last full review: **2026-11-19**

| Section | Data file | Items | Newest item | Last refreshed | Refresh cadence |
|---|---|---|---|---|---|
| Destinations | `src/content/*.md` | 37 guides | 2026-11-18 | 2026-11-19 (Mayon, Siquijor); all `verified: "Nov 2026"` | Re-verify fees/routes every 3 months; next by **Feb 2027** |
| News | `src/data/news.ts` | 27 briefs | 2026-11-18 | 2026-11-19 | Weekly; aim for 2–4 briefs |
| Showbiz | `src/data/showbiz.ts` | 18 stories | 2026-11-18 | 2026-11-19 | Weekly; 1–3 stories |
| Sports | `src/data/sports.ts` | 13 stories | 2026-11-09 | 2026-11-19 | Weekly; 1–3 stories |
| Books | `src/data/books.ts`, `books-more.ts` | 77 books | n/a | 2026-11-19 | Monthly; after major prize announcements |

### Topic mix (to keep sections balanced)

- **News:** weather 8, travel 7, economy 6, politics 4, culture 2. Light on culture; prefer travel-relevant briefs.
- **Showbiz:** music 8, film 3, pageants 2, TV 2, arts 1, stage 1. Music-heavy; look for film, stage and TV.
- **Sports:** boxing 3, athletics 2, tennis 2, Asian Games 1, golf 1, gymnastics 1, skateboarding 1, surfing 1, weightlifting 1. No basketball, volleyball, esports, billiards or chess yet.

## To do

Open items from the 2026-11-19 review (details: `reports/Content refresh November 2026.md`):

- [ ] Sports: Youth Olympics medals (Naomi Cesar 800 m silver, Pi Durden Wangkay 200 m bronze, Dakar, Nov 10–11). Well sourced but no free photo yet; recheck Commons for PSC uploads.
- [ ] Showbiz: QCinema 2026 (*Ella Arcangel* won the Asian Next Wave Grand Jury Prize, Nov 18). No free photo yet.
- [ ] Showbiz: Andrea Brillantes, Best Acting Performance in London for *Laya* (set in Oslob). Needs a second source; *Laya* opens Nov 25.
- [ ] Showbiz: optional line on *Filipiñana* UK/Ireland release (Nov 20, BFI).
- [ ] Destinations: Cebu City guide (Sinulog Grand Parade Jan 17, 2027; Cebu–Nagoya and Cebu–Shanghai from Dec 1). Getting-there notes for Iloilo (Iloilo–Singapore from Dec 2) and Davao (Davao–Bangkok from Dec 2).
- [ ] Siquijor ₱50 fee has a single trade source; confirm with an LGU notice and drop the ≈.
- **Rule from this review:** any story built on a pending date or decision gets a follow-up date in the Watchlist when it is published (the analog TV and Grammy stories went stale this way).

## Watchlist

Follow-ups that can make existing items outdated, or scheduled events worth covering once they happen (never before):

- Mayon Volcano alert level (news brief + `albay-mayon-volcano` guide). Kanlaon is at Level 2.
- VP Sara Duterte impeachment trial: defense expected to rest late Nov / early Dec; verdict.
- El Niño: any nationwide state of calamity.
- Energy emergency and fuel prices; November CPI (early December).
- Miss Universe 2026, **Nov 24** (Bea Millan-Windorski); Miss International, **Nov 25** (Katrina Anne Johnson).
- Esports Nations Cup MLBB, Nov 25–29; Batang Pinoy (Bacolod), Dec 12–18.
- Palanca Awards 2026 results (likely late November).
- Bianca Pagdanganan / Dottie Ardina LPGA Q-Series final (post only after LPGA.com results).
- Asian Academy Creative Awards gala, Dec 3; MMFF Parades of Stars, Dec 12 (Bacolod) and Dec 18 (Metro Manila).
- Analog TV switch-off, Jan 15, 2027; Sinulog Grand Parade, Jan 17, 2027; Dinagyang (dates unconfirmed); Grammys, Feb 7, 2027.
- Unconfirmed, recheck before use: Siargao terminal expansion opening; Antique airport jet service; Baguio environmental fee (proposed for 2027).

## Log

Newest first. One entry per content change: date, section, what was added or changed, and anything left to do.

### 2026-11-19 (content refresh)
- **Fixed:** Showbiz analog TV story (switch-off moved to Jan 15, 2027; replaced wrong sources); News ASEAN brief (closed Nov 18, Singapore chairs 2027); impeachment brief (defense phase, only Article II, no verdict); El Niño brief (Senate Resolution 765); Mayon guide (Alert Level 3 since Oct 30 in quick facts, ATV tip, safety essentials, FAQ); Siquijor fee (≈ ₱50 tourism ecological fee).
- **Added News:** US trade deal "announced, not signed" (Nov 18), fuel rollbacks (Nov 17), Kanlaon ash with Alert Level 2 (Nov 16, linked to the Bacolod guide), 5 million visitor arrivals (Nov 11).
- **Added Showbiz:** SB19 and BINI Grammy nominations (Nov 16); ceremony Feb 7, 2027.
- **Added Sports:** Pedro Taduran keeps IBF title (Nov 8); John Mark Tokong first Filipino CT heat win at Siargao (Nov 1). New topic: Surfing.
- **Added Books:** Glenn Diaz, *Yñiga* (2022; typographic cover, no `setIn`).

### 2026-11-19
- **Sports:** section launched with 11 stories (Asian Games, Eala, Obiena, Marcial, Pagdanganan, Didal and others). Commit `79e96ae`.
- **Home page:** added a "What's happening" block (latest News, Showbiz and Sports) and a Books shelf preview, so new items appear on the home page automatically.
- **Content review:** started a refresh check of all sections (report: `reports/Content refresh November 2026.md`).

### 2026-11-18
- **Books:** 49 more books (76 total), real Open Library covers, search, filters and sort.
- **Destinations:** destination cards redesigned with one-line `card` blurbs; Batanes weather and getting-around sections plus three FAQs; Hundred Islands protected-area wording.
- **News / Showbiz:** last items dated 2026-11-16 (ASEAN Summit) and 2026-11-17 (analog TV switch-off).
