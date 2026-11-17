// "Philippines this year": short, sourced news briefs. Newest first via getAllNews().
// Client-safe (no fs). Every brief must cite at least one source; counts that were
// still changing when reported are written as "at least" or attributed to early reports.

export const NEWS_TOPICS = [
  { slug: "travel", label: "Travel & transport" },
  { slug: "weather", label: "Weather & disasters" },
  { slug: "economy", label: "Economy" },
  { slug: "politics", label: "Politics" },
  { slug: "culture", label: "Culture & food" },
] as const;

export type NewsTopic = (typeof NEWS_TOPICS)[number]["slug"];

export interface NewsBrief {
  slug: string;
  date: string; // YYYY-MM-DD
  topic: NewsTopic;
  title: string;
  summary: string;
  body: string[];
  travelNote?: string;
  sources: { name: string; url: string }[];
}

const NEWS: NewsBrief[] = [
  {
    slug: "asean-summit-manila-november",
    date: "2026-11-16",
    topic: "politics",
    title: "Manila hosts the 49th ASEAN Summit",
    summary:
      "Southeast Asian leaders met in Pasay for the second ASEAN summit of the Philippines' 2026 chairmanship, with tight security around the PICC.",
    body: [
      "The 49th ASEAN Summit and related meetings were held in mid-November around the Philippine International Convention Center in Pasay. It follows the first summit of the year in Cebu in May.",
      "Pasay set a security zone around the PICC and Cultural Center complex, and public events such as fun runs and motorcades in several Metro Manila cities were suspended until November 20.",
    ],
    travelNote: "Expect reroutes near Roxas Boulevard and the CCP complex until November 20; leave extra time for NAIA.",
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/11/09/pasay-announces-road-closures-for-49th-asean-summit" },
      { name: "Philstar Life", url: "https://philstarlife.com/news-and-views/886611-asean-traffic-advisories-road-closures" },
    ],
  },
  {
    slug: "el-nino-water-calamity-declarations",
    date: "2026-11-11",
    topic: "weather",
    title: "El Niño dry spell: no nationwide calamity, but 100+ local declarations",
    summary:
      "Malacañang ruled out a nationwide state of calamity for now, as more than 100 areas have declared their own over drought and water shortages.",
    body: [
      "The 2026–2027 El Niño is expected to peak in November and December and could last into the first half of 2027, threatening water levels at Angat Dam, Metro Manila's main supply.",
      "The Office of Civil Defense counted 109 local calamity declarations by mid-October. Puerto Galera declared one over water shortages as early as June.",
    ],
    travelNote: "Island resorts may ration water. Ask your accommodation, and expect greener scenery to look brown in drought-hit areas.",
    sources: [
      { name: "Asia News Network", url: "https://asianews.network/?p=314006" },
      { name: "The Star", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/11/03/el-nino-alert-how-a-strong-event-could-threaten-metro-manilas-water-supply" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/06/21/puerto-galera-under-calamity-state" },
    ],
  },
  {
    slug: "pal-manila-chicago-nonstop",
    date: "2026-11-09",
    topic: "travel",
    title: "Philippine Airlines starts nonstop Manila–Chicago flights",
    summary:
      "PAL's new A350 service to Chicago O'Hare flies three times a week, its eighth destination in the US and its territories.",
    body: [
      "Flights run on Mondays, Wednesdays and Fridays on an Airbus A350-900. PAL last flew to Chicago in the 1980s.",
      "The route was announced in April after US approval, with launch fares from about US$667 return.",
    ],
    travelNote: "Good news for Midwest travelers: no more connecting through the West Coast.",
    sources: [
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/04/16/pal-to-start-manila-chicago-flights-on-nov-9" },
      { name: "One Mile at a Time", url: "https://onemileatatime.com/news/philippine-airlines-chicago-flights/" },
    ],
  },
  {
    slug: "inflation-october-rate-hike",
    date: "2026-11-05",
    topic: "economy",
    title: "Inflation hits 7.8% in October as fuel and fares climb",
    summary:
      "Prices rose at the fastest pace since early 2023, and the central bank raised its key rate to 5.50%, its fourth hike this year.",
    body: [
      "Fuel costs tied to the Middle East conflict and higher transport fares drove the increase, with rice alone adding 1.4 percentage points.",
      "Inflation was 2.4% in February, before the oil shock, and has climbed for most of the year since.",
    ],
    travelNote: "Budget a little extra for transport and food; our guide price ranges are marked with a 'last checked' date.",
    sources: [
      { name: "Rappler", url: "https://www.rappler.com/business/inflation-rate-philippines-october-2026/" },
      { name: "Bloomberg", url: "https://www.bloomberg.com/news/articles/2026-11-05/philippine-october-inflation-accelerates-7-8-close-to-four-year-high" },
    ],
  },
  {
    slug: "mayon-alert-level-3-october",
    date: "2026-10-30",
    topic: "weather",
    title: "Mayon Volcano back at Alert Level 3 after explosive eruption",
    summary:
      "A moderately explosive eruption sent ash about 3 km high, and PHIVOLCS raised Mayon to Alert Level 3 for the third time this year.",
    body: [
      "Residents within the 6 km Permanent Danger Zone were evacuated. PHIVOLCS warned of lava flows, rockfalls and pyroclastic flows on the upper slopes.",
      "Mayon was first raised to Level 3 on January 6 after a slow magmatic eruption at its summit dome.",
    ],
    travelNote: "Legazpi and Cagsawa can still be visited, but ATV tours and treks inside the danger zone are off. Check PHIVOLCS before you go.",
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/topstories/nation/1007704/live-updates-mayon-volcano-eruption-oct-30-2026/story/" },
      { name: "Nature World News", url: "https://www.natureworldnews.com/articles/73728/20261104/mayon-volcano-stays-alert-level-3-lava-flows-new-ash-plumes-follow-its-explosive-eruption.htm" },
    ],
  },
  {
    slug: "michelin-guide-2027-philippines",
    date: "2026-10-29",
    topic: "culture",
    title: "Michelin Guide's 2027 list: 10 starred restaurants in Manila and Cebu",
    summary:
      "Helm keeps the country's only two stars, Flow earns a new star, and 127 places make the second Philippine edition.",
    body: [
      "One-star picks include Gallery by Chele, Toyo Eatery, Hapag, Kasa Palma, Linamnam, Asador Alfonso, Celera, Inato and newcomer Flow.",
      "The guide also named 31 Bib Gourmand spots: good-value places worth a detour.",
    ],
    travelNote: "Bib Gourmand picks are the budget-friendly way to eat your way through Manila and Cebu.",
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/lifestyle/food/1007586/michelin-guide-2027-10-philippine-restaurants-earn-michelin-stars/story/" },
      { name: "Business Traveller", url: "https://www.businesstraveller.com/lifestyle/michelin-guide-manila-2027/" },
    ],
  },
  {
    slug: "maligcong-rice-terraces-cultural-treasure",
    date: "2026-10-19",
    topic: "culture",
    title: "Maligcong Rice Terraces named a National Cultural Treasure",
    summary:
      "The stone-walled terraces near Bontoc, Mountain Province, are now protected for their living Igorot farming traditions.",
    body: [
      "The National Commission for Culture and the Arts cited the terraces' intact cultural landscape and the customs that still keep them farmed.",
      "The status brings government conservation funding and an official heritage marker.",
    ],
    travelNote: "Maligcong is an easy add-on to a Sagada trip: about 30 minutes from Bontoc.",
    sources: [
      { name: "OneNews", url: "https://www.onenews.ph/articles/maligcong-rice-terraces-declared-national-cultural-treasure" },
    ],
  },
  {
    slug: "coron-ferry-fire-june-aster",
    date: "2026-09-09",
    topic: "travel",
    title: "Deadly fire on a passenger ferry off Coron, Palawan",
    summary:
      "The MV June Aster caught fire on its way from Manila with 134 people aboard. Early reports counted five dead and more than 80 missing.",
    body: [
      "The fire broke out about 1.2 nautical miles off Coron in the evening. Around 42 people were rescued in the first hours, and the death toll rose as the search went on.",
      "The cause is under investigation. It was the second major passenger-ship disaster of the year, after a ferry sank off Basilan in January.",
    ],
    travelNote: "On any boat, find the life jackets when you board and choose operators with coast guard clearance.",
    sources: [
      { name: "Inquirer", url: "https://newsinfo.inquirer.net/2302802/passenger-ferry-caught-fire-off-coron-palawan" },
      { name: "The National", url: "https://www.thenationalnews.com/news/asia/2026/09/10/five-dead-and-87-missing-in-philippines-ferry-fire/" },
    ],
  },
  {
    slug: "habagat-floods-august",
    date: "2026-08-20",
    topic: "weather",
    title: "Monsoon rains and four storms flood Luzon in August",
    summary:
      "The southwest monsoon and a string of cyclones led to calamity declarations across several provinces and suspended classes in over 9,000 schools.",
    body: [
      "Between August 10 and September 1, enhanced habagat rains and four tropical cyclones caused flooding and landslides, with at least 44 deaths reported.",
      "PAGASA had warned that more typhoons were expected through the month.",
    ],
    travelNote: "August is peak wet season on Luzon's west side. Keep a buffer day before flights, especially from Baguio, Ilocos or Palawan.",
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/weather/content/998163/pagasa-2-more-typhoons-expected-in-august-2026/story/" },
      { name: "Wikipedia: 2026 in the Philippines", url: "https://en.wikipedia.org/wiki/2026_in_the_Philippines" },
    ],
  },
  {
    slug: "kiyapo-landfall-calayan",
    date: "2026-07-24",
    topic: "weather",
    title: "Storm Kiyapo makes landfall in Calayan, Cagayan",
    summary:
      "Kiyapo (Noul) hit the Babuyan Islands as a tropical storm, then strengthened into a typhoon and left the country the next morning.",
    body: [
      "PAGASA raised Signal No. 3 briefly as the storm crossed the far north. Combined with the monsoon, it brought flooding across many regions; Laoag logged nearly 300 mm of rain in a day.",
      "It came two weeks after Super Typhoon Bavi (Inday), whose rains and landslides killed at least 23 people.",
    ],
    travelNote: "Batanes and the Ilocos coast see most July–October storms. Book flexible fares if you're heading north.",
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/probinsiya/2026/07/25/2544448/kiyapo-makes-landfall-cagayan-exits-par-today" },
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/07/24/ts-kiyapo-makes-landfall-in-cagayan-pagasa" },
    ],
  },
  {
    slug: "super-typhoon-bavi-inday",
    date: "2026-07-11",
    topic: "weather",
    title: "Super Typhoon Bavi's rains leave at least 23 dead",
    summary:
      "Bavi (Inday) stayed offshore but pulled heavy rain over northern and eastern Luzon, triggering floods and landslides.",
    body: [
      "PAGASA tracked Bavi as a super typhoon east of the country in early July. Landslides in Lanao del Sur led to a local state of calamity.",
      "It was the first major storm of the 2026 season to affect the Philippines.",
    ],
    sources: [
      { name: "Rappler", url: "https://www.rappler.com/philippines/weather/super-typhoon-bavi-potential-inday-update-pagasa-forecast-july-6-2026-11am/" },
      { name: "Philstar", url: "https://www.philstar.com/headlines/weather/2026/07/05/2540010/super-typhoon-spotted-far-east-philippines-pagasa" },
    ],
  },
  {
    slug: "sara-duterte-impeachment-trial",
    date: "2026-07-06",
    topic: "politics",
    title: "Senate opens the impeachment trial of Vice President Sara Duterte",
    summary:
      "The House impeached the vice president for a second time on May 11. Conviction needs 16 of 24 senators and would bar her from the 2028 race.",
    body: [
      "The House vote was 257–25. The Supreme Court had earlier ruled the first, 2025 impeachment unconstitutional.",
      "A verdict is not expected before mid-December, and the process could run into 2027.",
    ],
    sources: [
      { name: "Inquirer", url: "https://newsinfo.inquirer.net/2257487/sara-duterte-impeachment-trial-everything-you-need-to-know" },
      { name: "Khaleej Times", url: "https://www.khaleejtimes.com/world/asia/explained-philippine-vp-sara-duterte-impeached-again-whats-next-at-senate-trial" },
    ],
  },
  {
    slug: "upper-middle-income-status",
    date: "2026-07-01",
    topic: "economy",
    title: "World Bank moves the Philippines to upper-middle income",
    summary:
      "Gross national income per person reached US$4,850 in 2025, above the US$4,636 threshold.",
    body: [
      "The Philippines joins Vietnam, Sri Lanka, Jordan and Micronesia in moving up a bracket this year.",
      "Critics note the average figure hides wide inequality and doesn't match how many families feel.",
    ],
    sources: [
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/07/01/philippines-achieves-upper-middle-income-ambition" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/07/02/world-bank-lifts-phl-to-upper-middle-income-country" },
    ],
  },
  {
    slug: "sarangani-earthquake-magnitude-7-8",
    date: "2026-06-08",
    topic: "weather",
    title: "Magnitude 7.8 earthquake strikes off Sarangani",
    summary:
      "One of the country's strongest quakes in decades toppled buildings across southern Mindanao on the first day of the school year.",
    body: [
      "PHIVOLCS placed the epicenter 32 km west of Maasim, Sarangani, on the Cotabato Trench. A small tsunami reached nearby coasts and over 130 aftershocks followed within hours.",
      "Early counts put deaths in the dozens and rose in the following days. Sarangani, South Cotabato, Davao Occidental and General Santos declared states of calamity.",
    ],
    sources: [
      { name: "PHIVOLCS", url: "https://www.phivolcs.dost.gov.ph/primer-on-the-08-june-2026-magnitude-mw-7-8-offshore-sarangani-earthquake/" },
      { name: "UN Geneva", url: "https://www.ungeneva.org/en/news-media/news/2026/06/119418/deadly-quake-strikes-philippines-first-day-school-year" },
    ],
  },
  {
    slug: "palawan-power-outage-may",
    date: "2026-05-22",
    topic: "travel",
    title: "Grid failure blacks out 240 km of Palawan for 13 hours",
    summary:
      "A transmission failure cut power along mainland Palawan, including El Nido, at the height of the energy crunch.",
    body: [
      "Earlier in May, rotating brownouts also hit Luzon as the grid went on red and yellow alerts during the fuel crisis.",
      "Many island resorts run backup generators, but smaller guesthouses often don't.",
    ],
    travelNote: "Pack a power bank and ask whether your stay has a generator, especially in El Nido and Port Barton.",
    sources: [
      { name: "Suroy.ph", url: "https://suroy.ph/el-nido-travel-guide/" },
      { name: "Wikipedia: 2026 Philippine energy crisis", url: "https://en.wikipedia.org/wiki/2026_Philippine_energy_crisis" },
    ],
  },
  {
    slug: "asean-summit-cebu-may",
    date: "2026-05-08",
    topic: "politics",
    title: "Cebu hosts the 48th ASEAN Summit",
    summary:
      "Leaders met at the Mactan Expo in Lapu-Lapu City, with energy security and the Middle East crisis at the top of the agenda.",
    body: [
      "It was the first summit of the Philippines' 2026 ASEAN chairmanship, under the theme \"Navigating Our Future, Together.\"",
      "Cebu earlier hosted the ASEAN Tourism Forum and a foreign ministers' retreat in late January.",
    ],
    sources: [
      { name: "SunStar", url: "https://www.sunstar.com.ph/cebu/marcos-urges-asean-unity-amid-global-uncertainties-at-48th-summit-opening" },
      { name: "The Star", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/05/09/asean-caps-cebu-summit-with-unity-call-amid-global-uncertainty" },
    ],
  },
  {
    slug: "inflation-april-oil-crisis",
    date: "2026-05-05",
    topic: "economy",
    title: "Inflation jumps to 7.2% as the oil crisis deepens",
    summary:
      "April prices rose at the fastest pace in three years, up from 4.1% in March, led by fuel, rice and fish.",
    body: [
      "Transport groups staged several nationwide strikes over fuel prices in March and April, disrupting jeepney service and some classes.",
      "Airlines raised fuel surcharges sharply in April before easing them in May.",
    ],
    sources: [
      { name: "Rappler", url: "https://www.rappler.com/business/inflation-rate-philippines-april-2026/" },
      { name: "BusinessWorld", url: "https://bworldonline.com/top-stories/2026/05/06/747602/philippine-inflation-heats-up-to-3-year-high-in-april/" },
    ],
  },
  {
    slug: "el-nido-manila-direct-flights-end",
    date: "2026-03-29",
    topic: "travel",
    title: "No more direct Manila–El Nido flights",
    summary:
      "Flights from Manila to El Nido's Lio Airport ended on March 29. Travelers now connect via Clark, Cebu, Caticlan, Bohol or Coron.",
    body: [
      "Lio is served from Clark several times a day. A free shuttle runs from NAIA Terminal 3 to Clark for passengers flying within 24 hours.",
      "The cheaper alternative is still a flight to Puerto Princesa plus a 5–6 hour van ride north.",
    ],
    travelNote: "Baggage limits on these small turboprops are strict: about 15 kg checked and 7 kg cabin.",
    sources: [
      { name: "Suroy.ph", url: "https://suroy.ph/el-nido-travel-guide/" },
    ],
  },
  {
    slug: "national-energy-emergency",
    date: "2026-03-24",
    topic: "economy",
    title: "Philippines declares a national energy emergency",
    summary:
      "With the Strait of Hormuz closed by the Iran war, the Philippines became the first country to declare an energy emergency.",
    body: [
      "The country imports nearly all its oil from the Middle East. Diesel passed ₱130 a liter and some gas stations ran dry for lack of deliveries.",
      "Executive Order 110 lets state firms buy fuel directly, and a new law allows fuel excise taxes to be suspended. Some airline routes were suspended.",
    ],
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/headlines/2026/03/25/2516640/state-national-energy-emergency-declared" },
      { name: "Asia Times", url: "https://asiatimes.com/2026/03/philippines-first-nation-to-declare-energy-emergency-amid-iran-war/" },
    ],
  },
  {
    slug: "cebu-bus-rapid-transit-opens",
    date: "2026-03-13",
    topic: "travel",
    title: "Cebu's Bus Rapid Transit finally starts running",
    summary:
      "Partial service opened on dedicated lanes along Osmeña Boulevard, with three stations to start.",
    body: [
      "The first stations are Fuente, Cebu Normal University and Cebu South Bus Terminal. Full operations are targeted for late 2026.",
      "Jeepneys were later allowed on parts of the lanes after complaints about traffic.",
    ],
    travelNote: "Handy for reaching Cebu South Bus Terminal, where buses leave for Moalboal, Oslob and Kawasan.",
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/cebu-news/2026/03/13/2514019/cbrt-starts-partial-operations-today" },
      { name: "SunStar", url: "https://www.sunstar.com.ph/cebu/passenger-confusion-marks-first-day-of-cbrt-operations" },
    ],
  },
  {
    slug: "basilan-ferry-sinking",
    date: "2026-01-26",
    topic: "travel",
    title: "Ferry carrying over 350 people sinks off Basilan",
    summary:
      "The MV Trisha Kerstin 3 sank on its way from Zamboanga City to Jolo. More than 300 people were rescued, but dozens died.",
    body: [
      "The ship reportedly had technical problems before sinking near Baluk-Baluk Island in the early hours. Early reports counted at least 18 dead, and the toll rose as missing passengers were found.",
      "Investigators are looking into the cause. The operator, Aleson Shipping Lines, lost another vessel to fire in the same area in 2023.",
    ],
    sources: [
      { name: "Al Jazeera", url: "https://aljazeera.com/news/2026/1/26/ferry-carrying-over-350-people-sinks-in-philippines-killing-at-least-seven" },
      { name: "SunStar", url: "https://www.sunstar.com.ph/manila/ferry-sinks-off-basilan-15-dead-over-200-rescued" },
    ],
  },
  {
    slug: "philippines-uae-free-trade-deal",
    date: "2026-01-13",
    topic: "economy",
    title: "Philippines signs its first Middle East free trade deal, with the UAE",
    summary:
      "The partnership agreement gives about 95% of Philippine products preferential access to the UAE, home to a large Filipino community.",
    body: [
      "It was signed in Abu Dhabi during President Marcos' visit. Two-way trade reached about US$1.83 billion in 2024.",
      "It's the country's fourth free trade pact, after South Korea, Japan and the EFTA countries.",
    ],
    sources: [
      { name: "Gulf News", url: "https://gulfnews.com/uae/presidents-of-uae-philippines-witness-signing-of-comprehensive-economic-partnership-agreement-1.500406861" },
      { name: "PTV News", url: "https://ptvnews.ph/ph-signs-first-free-trade-deal-in-middle-east-with-uae/" },
    ],
  },
  {
    slug: "mayon-alert-level-3-january",
    date: "2026-01-06",
    topic: "weather",
    title: "Mayon Volcano raised to Alert Level 3 as the year begins",
    summary:
      "PHIVOLCS reported a slow magmatic eruption at Mayon's summit dome, and towns around the volcano evacuated the 6 km danger zone.",
    body: [
      "Repeated collapses of the summit lava dome produced a growing number of rockfalls in the first week of January. A no-fly zone was set around the crater.",
      "Tabaco declared a state of calamity two weeks later. Mayon stayed restless through the year.",
    ],
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/nation/2026/01/06/2499153/mayon-volcano-now-alert-level-3-amid-rising-lava-rockfall-events" },
      { name: "The Star", url: "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/01/06/philippines-raises-alert-level-at-restive-mayon-volcano" },
    ],
  },
];

export function getAllNews(): NewsBrief[] {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string) {
  return NEWS.find((n) => n.slug === slug) ?? null;
}

export function topicLabel(slug: NewsTopic) {
  return NEWS_TOPICS.find((t) => t.slug === slug)?.label ?? slug;
}
