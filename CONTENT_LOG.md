# Content log

Read this before any content change (guides, News, Showbiz, Sports, Books) and update it after. It records what each section holds, when it was last refreshed, what was added, and what to check next, so the site stays fresh without repeating or contradicting itself.

**How to use it**
1. Before adding content, check **Status** (last item date per section) and **Watchlist** (follow-ups due).
2. Research only what is newer than the last item date, and skip anything listed in **Log** or already in the data files.
3. New guides need `coordinates: [lat, lng]` for the map. New books need an `added:` date (YYYY-MM-DD) so they appear on `/activity`; guides need `updated:` bumped when edited. The rest of `/activity` builds itself from item dates.
4. After the change, update **Status**, add a dated **Log** entry, and move resolved Watchlist items into the log.
5. Rules stay in `CLAUDE.md` and `BRAND.md` (sources on every story, two outlets where possible, no rumors or predictions, freely licensed photos). This file is the "what and when", not the "how".

## Status

Last full review: **2026-11-19**

| Section | Data file | Items | Newest item | Last refreshed | Refresh cadence |
|---|---|---|---|---|---|
| Destinations | `src/content/*.md` | 37 guides | 2026-11-18 | 2026-11-23 (Siquijor fee, Iloilo and Davao flights); all `verified: "Nov 2026"` | Re-verify fees/routes every 3 months; next by **Feb 2027** |
| News | `src/data/news.ts` | 29 briefs | 2026-11-22 | 2026-11-19 | Weekly; aim for 2–4 briefs |
| Showbiz | `src/data/showbiz.ts` | 19 stories | 2026-11-18 | 2026-11-19 | Weekly; 1–3 stories |
| Sports | `src/data/sports.ts` | 14 stories | 2026-11-11 | 2026-11-19 | Weekly; 1–3 stories |
| Books | `src/data/books.ts`, `books-more.ts` | 80 books | 2026-11-23 (added) | 2026-11-23 | Monthly; after major prize announcements |

### Topic mix (to keep sections balanced)

- **News:** weather 8, travel 7, economy 6, politics 5, culture 3. Light on culture; prefer travel-relevant briefs.
- **Showbiz:** music 8, film 4, pageants 2, TV 2, arts 1, stage 1. Music-heavy; look for film, stage and TV.
- **Sports:** boxing 3, athletics 3, tennis 2, Asian Games 1, golf 1, gymnastics 1, skateboarding 1, surfing 1, weightlifting 1. No basketball, volleyball, esports, billiards or chess yet.

## To do

Open items from the 2026-11-19 review (details: `reports/Content refresh November 2026.md`):

- [ ] Showbiz: Andrea Brillantes, Best Acting Performance in London for *Laya* (set in Oslob). Needs a second source; *Laya* opens Nov 25.
- [ ] Showbiz: optional line on *Filipiñana* UK/Ireland release (Nov 20, BFI).
- [ ] Destinations: Cebu City guide (Sinulog Grand Parade Jan 17, 2027; Cebu–Nagoya from Dec 1 is solid; Cebu–Shanghai date unconfirmed, schedule sites only). Hero photo candidate: File:Basilica del Santo Niño in Cebu City (02) (2025-04-18).jpg (CC BY 4.0).
- **Rule from this review:** any story built on a pending date or decision gets a follow-up date in the Watchlist when it is published (the analog TV and Grammy stories went stale this way).

## Watchlist

Follow-ups that can make existing items outdated, or scheduled events worth covering once they happen (never before):

- Impeachment defense resting (verdict expected 20–25 days later, per the court spokesperson).
- Higantes Festival, Angono (~Nov 22–23; post afterward); Giant Lantern Festival official 2026 dates.
- Turboprop flights back to NAIA from Clark (only a Pampanga chamber objection so far; wait for DOTr/CAAP).
- Mayon Volcano alert level (news brief + `albay-mayon-volcano` guide). Kanlaon is at Level 2.
- VP Sara Duterte impeachment trial: defense expected to rest late Nov / early Dec; verdict.
- El Niño: any nationwide state of calamity.
- Energy emergency and fuel prices; November CPI (early December).
- Miss Universe 2026, **Nov 24** (Bea Millan-Windorski); Miss International, **Nov 25** (Katrina Anne Johnson).
- Esports Nations Cup MLBB, Nov 25–29; Batang Pinoy (Bacolod), Dec 12–18.
- Palanca Awards 2026 results (2025's were Nov 26–27; check from Nov 26).
- Bianca Pagdanganan / Dottie Ardina LPGA Q-Series final (post only after LPGA.com results).
- Asian Academy Creative Awards gala, Dec 3; MMFF parades: Bacolod Dec 11 or 12 (city government says Dec 11), Metro Manila Dec 18 or 19 (GMA says Dec 19). Confirm with MMFF/MMDA before use.
- Gilas Pilipinas window 5 in Seremban, Malaysia: vs Syria Nov 27, vs Iran Nov 29 (FIBA). First basketball story, results only.
- *Laya* opens Nov 25: run the Andrea Brillantes story that day (photo: File:Andrea Brillantes 2022.jpg, CC BY 3.0, small; grid, not lead).
- Mayon "Alert Level 3 since Oct 30": fits the timeline (Level 3 Jan 6, lowered to 2 Aug 5) but confirm the Oct 30 re-raise with a Phivolcs bulletin.
- Analog TV switch-off, Jan 15, 2027; Sinulog Grand Parade, Jan 17, 2027; Dinagyang (dates unconfirmed); Grammys, Feb 7, 2027.
- Unconfirmed, recheck before use: Siargao terminal expansion opening; Antique airport jet service; Baguio environmental fee (still under council review; no amount or start date).

## Log

Newest first. One entry per content change: date, section, what was added or changed, and anything left to do.

### 2026-11-23 (Pagudpud rewrite)
- **Rewritten:** `pagudpud-ilocos-norte` retitled "Pagudpud Tourist Spots: Saud Beach, Blue Lagoon and More" (Search Console: "pagudpud packages" pos 7, "pagudpud ilocos norte" 16.8, "pagudpud tourist spot" 25+). Added Cape Bojeador Lighthouse and Pansian Beach, an ordered tourist-spots list under Things to do, FAQs on tourist spots and tour packages (prices from the guide's own getAround figures), and tour prices in quick facts. No new outside facts.
- **Fixed:** the Batanes paragraph now says Basco flights leave from Clark (was Manila, Clark or Tuguegarao).
- Note: `saud-beach-pagudpud` title is 61 chars (soft SEO warning, pre-existing); left as is because it ranks for "saud beach".

### 2026-11-23 (Urbana at Feliza)
- **Expanded Books:** `urbana-at-feliza` gets a search title ("Urbana at Feliza by Modesto de Castro: Summary and Themes"; Search Console pos 9.5, the site's only Google click) and five reading-guide sections: the author, how the letters work, what the names mean, main themes, and a link to the free public-domain text on Project Gutenberg (Tagalog Wikipedia; Gutenberg listing).
- **New book fields:** optional `seoTitle`, `seoDescription` and `notes` (documented in CLAUDE.md). Next candidate: Desaparesidos (spoiler-light).

### 2026-11-23 (Batanes rewrite)
- **Rewritten:** `batanes-islands` retitled "Batanes Travel Guide: Batan & Sabtang Itinerary and Costs" (Search Console: "batan island" pos 7.4, "batanes philippines" 8.5). Added Basco Lighthouse, Valugan Boulder Beach and Vayang Rolling Hills; a 4-day itinerary; FAQs "What is there to do on Batan Island?" and "How much is the Batanes tourism fee?".
- **Fixed (Batanes and Sabtang):** flights now leave from Clark; direct Manila–Basco flights ended when PAL moved turboprops out of NAIA (Philstar Aug 2025, Bilyonaryo, Traveloka, Philippine Dives). Removed the FAQ's Tuguegarao route (unconfirmed).
- **Fixed (Batanes and Sabtang):** visitor registration is ₱405 per person online before arrival (₱200 ecotourism + ₱205 visitor ID), since June 15, 2026, Executive Order No. 23 (Radar PH, Travel And Tour World). No portal URL given: sources disagree on the address, so the guide points to the provincial tourism office.
- **Still to confirm:** current PAL Express Clark–Basco frequency (two daily per Traveloka only); Sabtang environmental fee (≈ ₱200–350; sources disagree).

### 2026-11-23 (Hundred Islands rewrite)
- **Rewritten:** `hundred-islands-pangasinan` retitled for search ("Hundred Islands Island Hopping Guide: Boats, Fees & Tips"; Search Console queries at positions 7–14). New quick facts, Marcos and Pilgrimage islands, step-by-step island hopping under Things to do, two query-matching FAQs, foreigner-fee and eTravel notes.
- **Facts:** 2026 boat rates ≈ ₱1,920 / 2,400 / 2,880 full day (5 / 10 / 15 pax), 3-island drop-off from ≈ ₱1,680; day fees ≈ ₱120–130 (₱80 environmental + ₱30 entrance + ₱10–20 coverage), overnight environmental ≈ ₱160; boats 6am–5:30pm; no separate foreigner rate found (LakbayPinas, Mar 2026, citing Ordinance No. 09-2026; Chill and Travel, Nov 2026). Bus fare ≈ ₱600–800 (no official 2026 fare; Five Star Cubao–Dagupan rose to ₱562 in Mar 2026, Manila Bulletin).
- **Still to confirm:** the official Alaminos rate sheet online is from 2016. Replace the ≈ figures if the city publishes Ordinance 09-2026. Track the page's Search Console position from today.

### 2026-11-23 (corrections and books)
- **Fixed:** Siquijor tourism ecological fee is collected on departure: ₱50, ₱40 seniors and students, free for kids 6 and under (Ordinance 2022-006, since Feb 1, 2026; SunStar, PhilstarLife). Dropped the ≈.
- **Updated:** Iloilo "Fly into" adds direct Singapore and Bangkok flights (Cebu Pacific resumed Nov 23; Portcalls, Manila Bulletin, CAPA). Davao adds direct Bangkok flights (from Oct 26; BusinessWorld, PNA). The old "from Dec 2" dates were wrong.
- **Added Books:** *Ermita* (F. Sionil José, setIn Intramuros), *A Portrait of the Artist as Filipino* (Nick Joaquin, setIn Intramuros), *Banana Heart Summer* (Merlinda Bobis). Typographic covers; Open Library covers still need checking by eye.
- **Watchlist fixes:** MMFF parade dates, Gilas venue and dates, Baguio fee status; dropped the "PVL All-Filipino Finals" (that conference ended in April).
- **Added Showbiz:** *Ella Arcangel* wins two QCinema prizes (Nov 18). Photo: Bianca Umali (voice lead), cropped from a public-domain Taguig city government photo (Nov 11, 2026); small (384×480) but sharp.
- **Added News:** Marcos says the US trade deal won't make the US the only supplier (Nov 22; GMA, Daily Tribune, The Star). Follows the Nov 18 trade brief.
- **Added Sports:** Cesar and Wangkay Youth Olympics medals (Nov 10–11). First Sports story with a place photo (Dakar Games billboard) instead of the athletes.
- Research: `reports/Content to post early December 2026.md`.

### 2026-11-23 (guide layout)
- **Moved, text unchanged:** practical body sections now render inside their guide section via `## <section>` markers: Hundred Islands "How island hopping works" (Things to do), Batanes "Getting around Batan" (Things to do) and "Planning around the weather" (Best time), Banaue "Getting the most from your visit" (Itinerary). `updated:` dates not bumped (no new facts).
- **Analytics:** guide controls send a GA4 `guide_interaction` event. Register `guide`, `control` and `value` as event-scoped custom dimensions in GA4 to report on them. Review usage in early January.

### 2026-11-19 (news follow-up)
- **Added News:** Simbang Gabi Dec 16–24 guidelines from the Archdiocese of Manila (Nov 17, culture; linked to the Intramuros guide).
- **Updated News:** ASEAN brief travel note (300+ NAIA domestic flights moved or canceled Nov 13–19); trade brief (Nov 19: Romualdez says terms still being worked out; Philstar only, attributed).
- Research: `reports/Content to post late November 2026.md`. Facts came from search snippets (source sites blocked in the session); re-read the linked articles when possible.

### 2026-11-19 (map)
- **New:** interactive Philippines map on Destinations (`/articles?view=map`): pins for all 37 guides (new `coordinates` field), island groups filter and zoom. Home "Browse by region" links to it.

### 2026-11-19 (activity page)
- **New page:** `/activity` ("What's new") lists the latest additions and updates across all sections, built automatically from item dates. Linked from the footer and the home page.

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
