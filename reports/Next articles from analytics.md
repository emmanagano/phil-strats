# Next articles from analytics

Plan, template and first draft from the GA4 and Search Console brief (GA4: late Nov 2025 to Nov 22, 2026; Search Console: Nov 16–20, 2026). Written Nov 23, 2026. Revised after the Search Console data was added.

## 1. What the data means for this site

**Search Console changes the order.** Google already shows the less famous guides (Hundred Islands, Batanes, Pagudpud, Bantayan, Malapascua) and two book pages, at an average position of 16. The famous Palawan, Bohol and Intramuros pages get their visits from Bing and AI assistants instead. Moving a page from position 8–15 onto page 1 is the fastest way to get clicks, so the plan starts with the pages Google already shows.

Four points in the brief don't match the site as it is now:

1. **The answer-first format is already live, but only since Nov 17, 2026.** Every guide opens with a verdict, a quick-facts box, month ratings, route tabs, a budget calculator, itineraries and an FAQ. That layout went live five days before the GA4 window ended, so the "people leave within seconds" numbers mostly measure the old prose pages. The rewrites below are about **matching search queries** (titles, descriptions, sections named after what people type), not about adding a quick-facts box.
2. **Intramuros's 1 second per landing looks like bots.** It matches the Singapore and China pattern. Check real-reader engagement (US, PH, CA, UK, AU) before rewriting it.
3. **The /fellows pages are already gone.** `public/_redirects` returns 410 Gone for them and the other old policy pages.
4. **Book page titles are fixed by code.** Every book page is titled "Title by Author", with the summary as its description. Retitling a book page (for example adding "Summary and Themes") needs an optional `seoTitle` / `seoDescription` field in `src/data/books*.ts`, a small code change.

**Where a rule may get in the way.** `CLAUDE.md` says book entries must have "no spoilers past the setup". Student searches ("urbana at feliza full story", "summary") want more than that. Urbana at Feliza is a book of letters on conduct with no plot to spoil, so it's fine. For novels like Desaparesidos, the plan keeps to a spoiler-light guide (author, setting, themes, reading notes) unless you decide to relax the rule.

**One page per place.** Separate "companion" articles on topics a guide already covers (a standalone "Hundred Islands island hopping" page next to the Hundred Islands guide) would compete with the guide in search. Expand and retitle the guide instead. New pages only make sense for trips that join several guides (the Palawan route), which needs a small new article type.

## 2. Next 10 pieces, in priority order

Titles are 60 characters or fewer and descriptions 120–160, with no hardcoded years, matching the build's SEO checks. Current titles are listed for comparison.

### 1. Hundred Islands rewrite (expand existing guide)
- **SEO title:** Hundred Islands Island Hopping Guide: Boats, Fees & Tips
- **Meta description:** How to island hop Hundred Islands in Alaminos, Pangasinan: boat rates, fees, the islands worth stopping at, and buses from Manila.
- **Was:** "Hundred Islands Pangasinan Guide: Island Hopping Near Manila"
- **Queries:** "hundred islands island hopping" (pos 9), "hundred islands alaminos pangasinan" (7.5), "hundred islands" (10.5), "things to do in hundred islands" (13.5), "hundred islands philippines" (25+)
- **Links to:** pagudpud-ilocos-norte, vigan-and-laoag-ilocos, baguio-city-benguet, la-union-san-juan
- **Why:** The page with the most impressions (67), with four queries already at positions 7–14.

### 2. Batanes rewrite (expand existing guide)
- **SEO title:** Batanes Travel Guide: Batan & Sabtang Itinerary and Costs
- **Meta description:** Plan Batanes: flights to Basco, what to see on Batan Island, the faluwa to Sabtang, day-by-day itineraries, costs, and the best months to go.
- **Was:** "Batanes Travel Guide: Stone Houses & Rolling Green Hills"
- **Queries:** "batan island" (pos 7.4), "batanes philippines" (8.5), "batanes" and "batanes island" (25+)
- **Links to:** sabtang-island-batanes (both ways), pagudpud-ilocos-norte
- **Why:** 58 impressions. Add a "Batan Island in a day" section (north and south loops) so "batan island" has a clear answer on the page.

### 3. Urbana at Feliza (expand existing book page)
- **SEO title:** Urbana at Feliza by Modesto de Castro: Summary and Themes
- **Meta description:** Urbana at Feliza explained: who wrote it, how the letters work, the main themes, and why the 1864 Tagalog classic is still taught.
- **Queries:** "urbana at feliza" (pos 9.5) plus "author", "brochure", "cover" and "comic brochure" variants
- **Links to:** the other Spanish-era classics on the shelf (Florante at Laura, Nínay), and `/books?era=classic`
- **Why:** The site's only Google click so far, and 39 impressions. Add sections on the author, how the book is structured, its main themes, and reading notes. Needs the `seoTitle` field.

### 4. Pagudpud rewrite (retitle the coast guide around tourist spots)
- **SEO title:** Pagudpud Tourist Spots: Saud Beach, Blue Lagoon and More
- **Meta description:** Pagudpud's tourist spots in one list, from Saud Beach and Blue Lagoon to the Patapat Viaduct and Bangui windmills, with routes from Laoag and Manila.
- **Was:** "Pagudpud Beach, Ilocos Norte: Saud Beach & Coast Guide"
- **Queries:** "pagudpud packages" (pos 7), "pagudpud ilocos norte" (16.8), "pagudpud tourist spot" and "pagudpud" (25+)
- **Links to:** saud-beach-pagudpud (keep it separate, since it ranks for "saud beach" at 10), vigan-and-laoag-ilocos, batanes-islands
- **Why:** 35 impressions, plus Saud Beach's 9. A numbered "tourist spots" list and a "tours and packages" FAQ match how people search.

### 5. Bantayan Island rewrite (expand existing guide)
- **SEO title:** Bantayan Island Guide: How to Get There, Beaches and Costs
- **Meta description:** How to get to Bantayan Island from Cebu via Hagnaya Port, the best beaches, Virgin Island hopping, costs, and when the sea is calmest.
- **Was:** "Bantayan Island Travel Guide: Sugar-White Beaches of Cebu"
- **Queries:** "bantayan island" (pos 14)
- **Links to:** malapascua-island (both ways), cebu-kawasan-falls-oslob, and Cebu City once it exists
- **Why:** 17 impressions. Most searchers are in the Philippines, so lead with the Cebu City to Hagnaya route and local costs.

### 6. Desaparesidos (expand existing book page, spoiler-light)
- **SEO title:** Desaparesidos by Lualhati Bautista: Setting and Themes
- **Meta description:** A spoiler-light guide to Desaparesidos by Lualhati Bautista: the author, the martial law setting, the main themes, and where to start reading.
- **Queries:** "desaparesidos" (pos 7.8) plus spelling variants ("desaparecidos")
- **Links to:** Bautista's other books on the shelf, and other martial-law novels
- **Why:** 18 impressions. Mention the spelling "desaparecidos" in the text so the variants match.

### 7. Palawan route: Puerto Princesa, El Nido and Coron (new trip planner)
- **SEO title:** Palawan Route: Puerto Princesa, El Nido and Coron
- **Meta description:** How to travel Puerto Princesa, El Nido and Coron in one 7–10 day trip: vans, ferries and flights between them, costs, best months and day-by-day plans.
- **Queries:** "puerto princesa to el nido", "el nido to coron ferry", "palawan itinerary 7 days"
- **Links to:** puerto-princesa-palawan, el-nido-palawan, coron-palawan, port-barton-palawan
- **Why:** The top three GA4 landing pages (117 sessions) are all on this route, and Bing and AI assistants already send readers there. Drafted in the appendix. Needs the new trip-planner type.

### 8. Famous Filipino novels (retitle the Books page)
- **SEO title:** Famous Filipino Novels: Classic and Modern Books to Read
- **Meta description:** Famous Filipino novels and books, from Noli Me Tangere to modern bestsellers, with summaries, authors, and the places in the Philippines they're set.
- **Was:** "Books by Filipino Authors"
- **Queries:** "famous filipino novels", "bob ong books", "author of diary ng panget"
- **Links to:** every book page (the shelf already lists them), plus a short intro naming the best-known titles
- **Why:** Books is the one non-travel section with search demand. Retitling `/books` and adding an intro paragraph is cheaper than a new list page.

### 9. Malapascua rewrite (expand existing guide)
- **SEO title:** Malapascua Guide: Thresher Shark Diving, Ferry and Costs
- **Meta description:** Plan Malapascua in northern Cebu: thresher shark dive times and prices, the ferry from Maya Port, where to stay, and the calmest months to go.
- **Was:** "Malapascua Travel Guide: Thresher Sharks & Quiet Beaches"
- **Queries:** "malapascua island" (25+)
- **Links to:** bantayan-island-cebu, cebu-kawasan-falls-oslob
- **Why:** 15 impressions on a broad query. Lower priority, because it's far from page 1.

### 10. First trip to the Philippines (new trip planner)
- **SEO title:** First Trip to the Philippines: eTravel, Money and Transport
- **Meta description:** Before your first Philippines trip: free eTravel registration, visa-free days, cash and ATMs, SIM cards, and how to get between the islands.
- **Queries:** "etravel philippines", "philippines travel requirements", "philippines sim card tourist"
- **Links to:** every guide's Entry section, and the Palawan route
- **Why:** Foreign first-timers are a big share of GA4 readers, and AI assistants cite direct answers like these. Needs fresh research (SIM and eSIM rules).

**After these:** the Palawan and Bohol guide updates from the first version of this plan (El Nido Tours B and D, Underground River booking steps, a Bohol 2-day plan), and two more trip planners (Cebu, Bohol and Siargao; the North Luzon loop).

## 3. Reusable template: answer-first guide rewrite

Most of the pieces above are rewrites, so the template follows the guide format that's already built. Each section answers in its first sentence, and section names reuse the words people search.

**Frontmatter**
- `title`: [Place] + the top query + 2–3 practical words ("Boats, Fees & Tips"). 60 characters or fewer, no year.
- `description`: 120–160 characters, listing what the page answers, in the searcher's words.
- `card`: one line, 60–70 characters, in the BRAND.md voice.
- `updated`: today's date. `guide.verified`: the current month.

**Guide block (renders in this order)**
1. `verdict`: 2–3 sentences: what it is, who it suits, who should skip it.
2. `quickFacts` (6 items): Get there · Ideal stay · Daily budget · Best months · Must-pay fee · one place-specific fact (boats, permits, cash).
3. `months`: 12 ratings with short notes.
4. `routes`: one tab per starting point. Always include **Manila** (local readers), plus the airport a foreign visitor lands at. Steps, time, cost, and a tip on what cancels in bad weather.
5. `budget`: backpacker, mid-range and comfort, per person per day.
6. `experiences`: the "things to do" or "tourist spots" list. One item per spot, with cost and time.
7. `itineraries`: tabs keyed by days (1, 2, 3…).
8. `stays`, `eats`, `getAround`, `fees`.
9. `essentials`: Money, Entry, Weather, plus 1–2 place-specific notes.
10. `packing`.

**FAQ (4–6 questions).** Copy the wording of real queries ("Things to do in Hundred Islands?", "How much is island hopping?"). Put the direct answer in the first sentence; these also become `FAQPage` JSON-LD.

**Body (the "story behind the guide")**, 300–500 words under H3s: what the place is, the main spots, how a visit works, and nearby trips. End with links to 2–3 guides in the same region.

**Rules:** ≈ on uncertain figures, a source for anything new, no em dashes, the Oxford comma, and BRAND.md's no unsupported superlatives.

(For new multi-stop pages, a trip-planner variant of this template is in the appendix.)

## 4. Draft #1: Hundred Islands rewrite

Written for a first-time foreign visitor, with the Manila routes and peso costs local readers search for. Every figure comes from the current guide (verified Nov 2026); USD at ₱58. It's laid out as the page reads, with the guide field each part fills in brackets.

**Confirm before publishing** (the current guide doesn't have these, and queries ask for them):
- Current boat rates by boat size from the Alaminos tourism office, which would replace the "≈ ₱1,500–2,500" range.
- The names and stops of the set island-hopping tours, if the office publishes fixed routes.
- Whether the environmental fee differs for foreign visitors.
- Current Five Star and Victory Liner fares to Alaminos.

---

**title:** Hundred Islands Island Hopping Guide: Boats, Fees & Tips
**description:** How to island hop Hundred Islands in Alaminos, Pangasinan: boat rates, fees, the islands worth stopping at, and buses from Manila.
**card:** Island hopping among 124 limestone islets, a bus ride from Manila. *(unchanged)*

**[verdict]** Hundred Islands is a national park of 124 small limestone islands in the Lingayen Gulf, about five hours north of Manila by bus. It's an easy, low-cost weekend of island hopping, swimming, kayaking and a zipline over the water. Don't expect long white-sand beaches: the islands are rocky, and weekends are busy.

**[quickFacts]**

| | |
|---|---|
| Get there | Bus from Manila to Alaminos (5–6 hrs, ₱500–700), then a tricycle to Lucap Wharf |
| Ideal stay | 1–2 days |
| Daily budget | ₱1,500–3,500 per person (≈ $26–60) |
| Best months | Dec–May |
| Must-pay fee | ≈ ₱80 environmental fee (day tour) |
| Boats | ≈ ₱1,500–2,500 per boat, split across your group |

### How island hopping works [body]

**Boats leave from Lucap Wharf in Alaminos, and you pay per boat, not per person.** That makes Hundred Islands cheapest in a group. Here's how it works:

1. Go to the tourism office at Lucap Wharf. Register and pay the environmental fee (≈ ₱80 for a day tour, ≈ ₱150–200 if you stay overnight on an island).
2. Choose a boat by size. A small boat costs ≈ ₱1,500–2,000 and larger ones up to ≈ ₱2,500. Four people sharing a ₱2,000 boat pay ₱500 each.
3. Pick a set tour of three or four islands, or hire the boat for the day and choose your own stops.
4. Bring your own food and water. The islands have few or no shops.

Start early. The water is calmest and clearest in the morning, and you'll beat the weekend crowds to the viewpoints.

### Things to do in Hundred Islands [experiences]

1. **Governor's Island viewpoint.** Climb up for a view over the whole park. The zipline starts here. *(Included in tours)*
2. **Zipline to Virgin Island.** A long line between Governor's and Virgin islands. *(≈ ₱300–500, 15 min)*
3. **Quezon Island.** The busiest island, with shelters, toilets and a swimming area, plus snorkeling nearby. *(Included)*
4. **Children's Island.** Calm, shallow water, good for families with small kids. *(Included)*
5. **Marcos Island.** Visitors jump off the rocks into deep water. *(On some tours)*
6. **Pilgrimage Island.** A large statue of Christ the Savior and a hilltop viewpoint. *(On some tours)*
7. **Caves.** Boats often stop at Cuenco Cave and Imelda Cave, carved into the limestone by the sea. *(On tours)*
8. **Kayaking and snorkeling.** Paddle between the islets and snorkel near Quezon Island and the giant clam sanctuary. *(≈ ₱200–400 rental, 1–2 hrs)*
9. **Bolinao side trip.** Patar Beach, Cape Bolinao Lighthouse and the Enchanted Cave, one hour west. *(≈ ₱100–200 in fees, full day)*

### How to get to Hundred Islands [routes]

**From Manila by bus (5–6 hours, ₱500–700, ≈ $9–12).** Five Star and Victory Liner run buses from their terminals in Cubao (Quezon City) and Pasay to Alaminos. Take the first bus of the day so you have a full day on the water. From the Alaminos terminal, a tricycle to Lucap Wharf takes about 10 minutes.

**If you've just landed at Manila's airport (NAIA),** take a taxi or ride-hailing car to the Pasay bus terminals, the nearer of the two. Most visitors arriving on an international flight spend the first night in Manila and catch an early bus the next morning.

**By car (4–5 hours).** Drive north via NLEX, SCTEX and TPLEX to Alaminos. Tolls cost ≈ ₱800–1,000.

### Best time to visit [months]

**December to May.** The weather is dry and the sea is calm. December to February is the coolest stretch, and March and April are the best months for kayaking. Holy Week and weekends are the busiest times, so go on a weekday if you can.

**July to September is the time to avoid.** It's the height of the rainy season, with typhoon risk, and boats are suspended in storms. June and October are mixed.

### What it costs [budget and fees]

| Item | Cost |
|---|---|
| Bus Manila to Alaminos, one way | ₱500–700 |
| Environmental fee (day / overnight) | ≈ ₱80 / ≈ ₱150–200 |
| Boat for the day (split by group) | ≈ ₱1,500–2,500 |
| Zipline | ≈ ₱300–500 |
| Kayak or snorkel rental | ≈ ₱200–400 |
| Room in Lucap, per night | ₱1,000–3,500 |
| Daily budget per person | ₱1,500–3,500 |

Bring cash. There are ATMs in Alaminos town but none on the islands, and boats and fees are paid in cash.

### Itineraries [itineraries]

**Day trip from Manila:** early bus to Alaminos → Governor's, Quezon and Children's islands → zipline → late bus home. It's a long day (about 11 hours on the road), so the 2-day version is more relaxed.

**2 days:**
- **Day 1:** Bus to Alaminos, island hopping and the zipline, seafood dinner at Lucap.
- **Day 2:** Swim in Bolinao's Enchanted Cave, then Patar Beach and Cape Bolinao Lighthouse, and the bus back to Manila.

### Where to stay [stays]
- **Lucap:** guesthouses by the wharf, best for early boats (₱1,000–3,500 a night).
- **Bolinao:** beach resorts an hour away, for more beach time (₱1,500–5,000 a night).
- **On an island:** camping is allowed on designated islands such as Governor's and Quezon, booked ahead through the tourism office.

### Tips [essentials]
- **Go on a weekday.** Weekends and holidays are crowded.
- **Pack supplies:** water, food, sunscreen, a hat and water shoes. The islands are rocky.
- **Check the weather the day before.** Boats are suspended in storms.
- **Register for eTravel before you fly.** Foreign visitors register free at etravel.gov.ph; most passports get 30 days visa-free.
- **Try Pangasinan food on the way:** pigar-pigar (stir-fried beef), grilled Dagupan bangus (milkfish) and puto Calasiao (small rice cakes).

### FAQ [faq]

**What are the things to do in Hundred Islands?**
Island hopping is the main activity. Visit Governor's Island for the viewpoint, ride the zipline to Virgin Island, swim at Quezon and Children's islands, explore the sea caves, and kayak or snorkel between the islets. Add Bolinao's beaches and Enchanted Cave if you stay two days.

**How much is island hopping in Hundred Islands?**
Boats are rented per group at Lucap Wharf for about ₱1,500–2,500 a day, depending on size, plus an environmental fee of about ₱80 per person. A group of four sharing a ₱2,000 boat pays ₱500 each before fees.

**How do I get to Hundred Islands from Manila?**
Take a Five Star or Victory Liner bus from Cubao or Pasay to Alaminos, Pangasinan (5–6 hours, ₱500–700), then a 10-minute tricycle to Lucap Wharf, where the boats leave.

**Where is Hundred Islands?**
In Alaminos City, Pangasinan, on the Lingayen Gulf in northwestern Luzon, about 5–6 hours north of Manila by bus.

**Are there really 100 islands?**
There are 124 at low tide and 123 at high tide. The name is a round number. *(kept)*

**Can I stay overnight on an island?**
Yes. Camping is allowed on designated islands such as Governor's and Quezon. Book ahead through the tourism office and pay the overnight fee of about ₱150–200. *(kept, with the fee added)*

**Is Hundred Islands worth it?**
Yes, if you want an easy, low-cost island trip from Manila. Skip it if you're after long white-sand beaches; the islands are rocky and weekends get busy.

### Links to add
- **From this page:** [Pagudpud](/articles/pagudpud-ilocos-norte) and [Vigan](/articles/vigan-and-laoag-ilocos) (already there), plus [La Union](/articles/la-union-san-juan) and [Baguio](/articles/baguio-city-benguet), both on the way north from Manila.
- **To this page:** add a "Nearby" link from the La Union and Baguio guides.

## Appendix A: Palawan route draft (#7)

All figures below come from the Puerto Princesa, El Nido, Coron and Port Barton guides (verified Nov 2026). USD at ₱58.

---

**title:** Palawan Route: Puerto Princesa, El Nido and Coron
**description:** How to travel Puerto Princesa, El Nido and Coron in one 7–10 day trip: vans, ferries and flights between them, costs, best months and day-by-day plans.
**card:** Underground River, El Nido lagoons, and Coron lakes in one trip.

**Verdict:** This is the classic first trip to Palawan: a river cave, limestone lagoons and wreck-dotted bays, joined by one long van ride and one boat. It suits travelers with at least a week who don't mind a few long travel days. Skip the full loop if you only have four or five days; pick El Nido or Coron and fly in and out.

| Quick facts | |
|---|---|
| Days needed | 7–10 |
| Best months | Dec–May (calm seas for the ferry) |
| Fly in / out | In: Puerto Princesa (PPS). Out: Busuanga (USU) for Coron |
| Total budget | ≈ ₱33,000–76,000 per person for 9 days, including domestic flights (≈ $570–1,310) |
| Book ahead | Underground River permit (2–7 days), El Nido–Coron ferry, Tour A in El Nido |
| Cash | ATMs are unreliable in El Nido and Coron and absent in Sabang. Bring most of your cash from Puerto Princesa. |

### The route at a glance

Fly into Puerto Princesa, travel north by van to El Nido, take the ferry to Coron, and fly home from Busuanga. Going one way means you never backtrack. The route also works in reverse, which is useful if flights into Busuanga are cheaper on your dates.

- **[Puerto Princesa](/articles/puerto-princesa-palawan)** (2 days): the Underground River day trip and an easy city afternoon.
- **[El Nido](/articles/el-nido-palawan)** (3–4 days): island-hopping tours through lagoons and hidden beaches.
- **[Coron](/articles/coron-palawan)** (2–3 days): Kayangan and Barracuda lakes, plus WWII wreck diving.
- Optional: **[Port Barton](/articles/port-barton-palawan)** (2 days), a quiet beach stop between Puerto Princesa and El Nido.

### Getting between the stops

| Leg | How | Time | Cost |
|---|---|---|---|
| Manila, Clark or Cebu to Puerto Princesa | Flight to PPS, then a tricycle to your hotel | About 2 hrs door to door | ₱2,000–6,000 (≈ $34–103) |
| Puerto Princesa to El Nido | Shared van | 5–6 hrs | ₱600–800 (≈ $10–14) |
| El Nido to Coron | Fast ferry | About 4 hrs | ₱2,500–3,000 (≈ $43–52) |
| Coron to Manila or Clark | Van to Busuanga airport (30–40 min), then a 1 hr flight | 2–3 hrs | ₱150–200 van + ₱2,500–7,000 flight |

**Puerto Princesa to El Nido.** Shared vans leave through the day. Take an early one so you reach El Nido before dark. With the Port Barton detour, it's 3–4 hours from Puerto Princesa to Port Barton, then 4–5 hours on to El Nido.

**El Nido to Coron.** The fast ferry is the only scheduled boat. From June to September it drops to about two sailings a week, and rough seas cancel trips, so book early and keep a spare day. El Nido's Lio Airport also has flights to Coron; check fares if the ferry doesn't fit.

**Going home.** Busuanga Airport has flights to Manila and Clark. On a tight budget, an overnight ferry runs from Coron to Manila (about 14 hours, ₱1,500–3,000), but its schedule changes with the weather.

Direct Manila to El Nido flights ended on March 29, 2026. That's why this route starts in Puerto Princesa instead.

### Best time to go

**December to May is the window for the full loop.** Seas are calmer, so boat tours and the El Nido to Coron ferry run reliably. February to April has the clearest water. Christmas week and Holy Week are the busiest and most expensive times, so book rooms and the ferry well ahead.

June to September is the southwest monsoon. July to September is the hardest stretch: island-hopping tours and ferries are often canceled. If you travel then, fly between stops instead of taking the ferry.

### What it costs

Per person, based on 2 days in Puerto Princesa, 4 in El Nido and 3 in Coron:

| Item | Low | High |
|---|---|---|
| Daily spend in Puerto Princesa (2 days at ₱2,500–6,000) | ₱5,000 | ₱12,000 |
| Daily spend in El Nido (4 days at ₱3,000–7,000) | ₱12,000 | ₱28,000 |
| Daily spend in Coron (3 days at ₱2,800–6,500) | ₱8,400 | ₱19,500 |
| Van and ferry between stops | ₱3,100 | ₱3,800 |
| Flights in and out | ₱4,500 | ₱13,000 |
| **Total** | **≈ ₱33,000** | **≈ ₱76,000** |

Daily spend covers your room, food, local transport and tours. Fees to have in cash:
- Underground River entrance for foreigners: ≈ ₱500, plus ≈ ₱40 Sabang environmental fee
- El Nido eco-tourism fee: ₱400, valid 10 days
- El Nido lagoon entries: ≈ ₱200–300 each
- Coron environmental fee: ≈ ₱200, plus lake entries of ≈ ₱200–300 each

Each guide has a budget calculator for backpacker, mid-range and comfort styles.

### Itineraries

**7 days (tight, no Port Barton)**
1. Fly into Puerto Princesa. Afternoon at Baker's Hill and Plaza Cuartel.
2. Underground River day trip (1.5–2 hours each way to Sabang).
3. Early van to El Nido. Sunset at Las Cabanas.
4. Tour A: Big and Small Lagoon by kayak, Secret Lagoon and Shimizu Island.
5. Ferry to Coron. Sunset from Mt. Tapyas.
6. Coron Island tour: Kayangan Lake, Barracuda Lake and Twin Lagoon.
7. Fly out from Busuanga.

There is no buffer day, so a canceled ferry or tour breaks the plan. Use this only between February and April.

**10 days (relaxed, with Port Barton)**
1. Fly into Puerto Princesa.
2. Underground River day trip.
3. Van to Port Barton.
4. Port Barton island hopping.
5. Van to El Nido.
6. Tour A in El Nido.
7. Tour C or a day at Nacpan Beach.
8. Ferry to Coron. Evening at Maquinit Hot Spring.
9. Coron Island tour, or two WWII wreck dives (₱3,500–5,000).
10. Fly out from Busuanga.

For a buffer day, swap Day 7 or Day 9 to a free day, or arrive a day earlier.

### Tips

- **Book the Underground River first.** Permits have daily caps. Book 2–7 days ahead, and longer at Easter and Christmas. Build the rest of the trip around that date.
- **Carry cash.** El Nido's ATMs run dry on weekends and often reject foreign cards, Coron has only a few, and Sabang has none. El Nido alone needs about ₱12,000–15,000 for four days. Island and lagoon fees are cash only.
- **Keep a buffer day before your flight home.** Boats and some flights cancel in rough seas.
- **Pack light.** You'll carry your bag onto vans, tricycles and a ferry. A dry bag and a power bank help on every stop.
- **Expect little signal on the water.** 4G works in the towns, but not on most tour routes.
- **Register for eTravel before you fly.** Most passports get 30 days visa-free. Registration at etravel.gov.ph is free; ignore paid look-alike sites.

### FAQ

**How many days do you need for Puerto Princesa, El Nido and Coron?**
Seven days is the minimum, with no spare time. Nine or ten days lets you add a buffer day for weather, and Port Barton if you like.

**Should I go to El Nido or Coron first?**
Either works. Starting in Puerto Princesa and ending in Coron avoids backtracking, because you fly in to Puerto Princesa and out of Busuanga. Reverse it if flights into Busuanga are cheaper.

**How do I get from El Nido to Coron?**
Take the fast ferry: about 4 hours for ₱2,500–3,000. It runs only about twice a week from June to September and cancels in rough seas, so book ahead. There are also flights from El Nido's Lio Airport.

**How long is the van from Puerto Princesa to El Nido?**
5–6 hours by shared van, for ₱600–800. Leave in the morning to arrive before dark.

**Can I fly directly from Manila to El Nido?**
Not any more. Direct Manila flights ended on March 29, 2026. Fly to Puerto Princesa, or connect through Clark or Cebu to El Nido's Lio Airport.

**What is the best time of year for this route?**
December to May, when seas are calm and the ferry runs reliably. Avoid July to September, when tours and ferries are often canceled.

---

## Appendix B: trip-planner template (for #7 and #10)

Proposed as `src/content/trips/<slug>.md`, rendered at `/trips/<slug>` and linked from each stop's guide ("Part of these routes"). Frontmatter carries the facts, so they render as a quick-facts box and table like the guides; the body holds the prose sections.

```markdown
---
title: "Palawan Route: Puerto Princesa, El Nido and Coron"   # 60 chars or fewer
description: "120–160 chars: who it's for, days, how you move between stops."
card: "One-line blurb, about 60–70 chars, BRAND.md voice."
date: "YYYY-MM-DD"
verified: "Mon YYYY"
stops: ["puerto-princesa-palawan", "el-nido-palawan", "coron-palawan"]   # guide slugs, validated at build
verdict: "Two or three sentences: who this route suits, and who should skip it."
quickFacts:
  - {label: "Days needed", value: "7–10"}
  - {label: "Best months", value: "Dec–May"}
  - {label: "Fly in / out", value: "In: PPS. Out: USU"}
  - {label: "Total budget", value: "≈ ₱… per person"}
  - {label: "Book ahead", value: "…"}
  - {label: "Cash", value: "…"}
legs:
  - {from: "…", to: "…", mode: "…", time: "…", cost: "…", tip: "…"}
faq:
  - {question: "…", answer: "Direct answer in the first sentence."}
---

## The route at a glance
Which direction, why, and a one-line summary per stop with a link to its guide.

## Getting between the stops
One short paragraph per leg, matching the legs table. Say what cancels in bad weather.

## Best time to go
Month ranges for the whole route. Name the weakest leg (usually a ferry).

## What it costs
A table: transport, daily spend per stop, fees. Prefix uncertain figures with ≈.

## Itineraries
"7 days" and "10 days" as day-by-day lists. Mark the buffer day.

## Tips
Five or six practical bullets: cash, booking, signal, luggage, weather.

## FAQ
(Rendered from frontmatter, with FAQPage JSON-LD.)
```

Rules carried over from the guides: answer in the first line of every section, ≈ on uncertain figures, a `verified` month, figures copied from the linked guides (one source of truth), and no em dashes in prose.

## 5. Tracking fixes (for you, in the GA4 and Search Console dashboards)

- **Submit the sitemap** in Search Console: Sitemaps > `https://philippinestrategies.netlify.app/sitemap.xml`. The site already builds it.
- **Link Search Console to GA4:** Admin > Product links > Search Console links.
- **Key events:** mark `form_submit` (newsletter and contact) as key events in Admin > Events.
- **Internal traffic:** Admin > Data streams > Configure tag settings > Define internal traffic (your IP), then turn on the filter under Data filters.
- **Measure the rewrites:** note each rewritten page's position and impressions in Search Console on the day it ships, then compare 4 weeks later. Re-check GA4 engagement in early January, once the Nov 17 layout has about six weeks of data.

