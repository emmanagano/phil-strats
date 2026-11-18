// Filipino sports stories: sourced, photo-led news about Filipino athletes. Newest first via getAllSports().
// Client-safe (no fs). Same rules as Showbiz: verified results, titles and events only (no rumors or
// private lives), every story cites sources (two outlets where possible), still-changing figures are
// labeled, and photos are freely licensed (Wikimedia Commons) with a credit.

export const SPORTS_TOPICS = [
  { slug: "asian-games", label: "Asian Games" },
  { slug: "gymnastics", label: "Gymnastics" },
  { slug: "athletics", label: "Athletics" },
  { slug: "tennis", label: "Tennis" },
  { slug: "boxing", label: "Boxing" },
  { slug: "golf", label: "Golf" },
  { slug: "weightlifting", label: "Weightlifting" },
  { slug: "skateboarding", label: "Skateboarding" },
  { slug: "surfing", label: "Surfing" },
] as const;

export type SportsTopic = (typeof SPORTS_TOPICS)[number]["slug"];

export interface SportsStory {
  slug: string;
  date: string; // YYYY-MM-DD
  topic: SportsTopic;
  title: string;
  dek: string;
  body: string[];
  why: string;
  // Pins a story as the big lead on /sports (otherwise the newest leads).
  featured?: boolean;
  image: { src: string; alt: string; caption: string; author: string; license: string; licenseUrl: string; source: string };
  sources: { name: string; url: string }[];
}

const PD = "Public domain";

const STORIES: SportsStory[] = [
  {
    slug: "pedro-taduran-retains-ibf-title",
    date: "2026-11-08",
    topic: "boxing",
    title: "Pedro Taduran keeps his IBF world title in Albuquerque",
    dek: "The minimumweight champion beat unbeaten mandatory challenger Brandon Moreno by unanimous decision.",
    body: [
      "The judges scored the fight 120-108, 115-113 and 115-113 at the Kiva Auditorium in Albuquerque, New Mexico, on Sunday morning Philippine time. It was Moreno's first professional loss.",
      "GMA News counts it as Taduran's fourth straight successful IBF defense. His record is now 21-4-1.",
    ],
    why: "Taduran is one of the Philippines' reigning world boxing champions, and he kept the belt against a mandatory challenger on the road.",
    image: {
      src: "/images/sports/taduran.jpg",
      alt: "Boxers seated behind three red IBF championship belts at a press conference",
      caption: "Pedro Taduran and other fighters at a Manila press conference, October 2025.",
      author: "FilBox101",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Taduran_vs_Balunan_2025_Thrilla_in_countdown_press_conference.jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/sports/boxing/1008709/pedro-taduran-retains-ibf-title-hands-brandon-moreno-first-career-loss/story/" },
      { name: "Philstar", url: "https://www.philstar.com/sports/2026/11/09/2568829/taduran-still-king" },
    ],
  },
  {
    slug: "john-mark-tokong-first-filipino-ct-heat-win",
    date: "2026-11-01",
    topic: "surfing",
    title: "John Mark Tokong wins the first Championship Tour heat for a Filipino",
    dek: "At the first World Surf League Championship Tour event in the Philippines, the Siargao wildcard beat Brazil's Samuel Pupo at Cloud 9.",
    body: [
      "Tokong, known as \"Marama\", won his opening heat 16.60 to 11.00 against Pupo, ranked tenth in the world, to reach the second round of the WSL Philippines Pro.",
      "Fellow wildcard Jayuard Alciso also won his heat, upsetting Olympic champion Kauli Vaast of France.",
    ],
    why: "It was the first Championship Tour event held in the Philippines, and a home surfer won a heat at the sport's top level for the first time.",
    image: {
      src: "/images/sports/tokong.jpg",
      alt: "John Mark Tokong in a blue Philippines jersey making a shaka sign by the water",
      caption: "John Mark Tokong after his heat win at Cloud 9, Siargao, November 1, 2026.",
      author: "Philippine Sports Commission",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:John_Mark_Tokong.jpg",
    },
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/palaro/2026/11/02/2567180/tokong-alciso-crash-ct-party" },
      { name: "Philippine Times", url: "https://philtimes.com.au/filipino-surfers-tokong-alciso-historic-siargao-wins-2026/" },
    ],
  },
  {
    slug: "carlos-yulo-asian-games-double-gold",
    featured: true,
    date: "2026-09-25",
    topic: "gymnastics",
    title: "Carlos Yulo wins floor and vault gold at the Asian Games",
    dek: "The two-time Olympic champion delivered the Philippines' first-ever Asian Games golds in gymnastics in Aichi-Nagoya.",
    body: [
      "Yulo won the floor final on September 24 with 14.666 points, just ahead of Kazakhstan's Milad Karimi, giving the Philippines its first gold of the Games. A day later he added the vault title, averaging 14.599.",
      "The golds filled the one gap in his collection after world titles in 2019 and 2021 and two Olympic golds in Paris. He also reached the parallel bars final, finishing fourth.",
    ],
    why: "Yulo's two golds were half of the Philippines' four at the Games, part of the country's best Asian Games medal haul in 60 years.",
    image: {
      src: "/images/sports/yulo.jpg",
      alt: "Carlos Yulo speaking into a microphone at an event, in a dark shirt against a gold backdrop",
      caption: "Carlos Yulo at an event in Manila.",
      author: "Japanese Embassy in Manila",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Carlos_Yulo_Oct.1.24.jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/sports/othersports/1003557/carlos-yulo-wins-his-first-ever-asian-games-gold-after-ruling-floor-exercise-finals/story/" },
      { name: "Olympics.com", url: "https://www.olympics.com/en/news/asian-games-2026-philippines-gymnastics-star-carlos-yulo-gold-medal" },
      { name: "Inquirer Sports", url: "https://sports.inquirer.net/697826/carlos-yulo-adds-vault-gold-to-floor-title-at-asian-games" },
    ],
  },
  {
    slug: "philippines-best-asian-games-haul-in-60-years",
    date: "2026-10-04",
    topic: "asian-games",
    title: "Philippines posts its best Asian Games haul in 60 years",
    dek: "Team Philippines left Aichi-Nagoya with 29 medals, four of them gold, and finished 17th overall.",
    body: [
      "The final tally was four gold, nine silver and 16 bronze. The four golds matched 2018 and 2023, but the total was the country's best since the 1966 Asian Games in Bangkok, and the nine silvers equaled the national record.",
      "Golds came from Carlos Yulo (floor and vault), EJ Obiena (pole vault) and Jeus Yape in the new virtual taekwondo event. The women's 3x3 basketball team took silver, and the women's soft tennis team won the country's first-ever medal in the sport.",
    ],
    why: "It was the Philippines' strongest Asian Games showing in six decades, and its nine silvers tied the national record.",
    image: {
      src: "/images/sports/villegas.jpg",
      alt: "Boxer Aira Villegas in a red Philippines shirt during an interview",
      caption: "Olympic bronze medalist Aira Villegas carried the Philippine flag at the opening ceremony.",
      author: "Philippine Information Agency (PIA) Leyte",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:PIA_Leyte_-_Aira_Villegas_interview_(cropped).jpg",
    },
    sources: [
      { name: "Manila Times", url: "https://www.manilatimes.net/2026/10/06/sports/ph-posts-best-asiad-haul-in-60-years/2439060" },
      { name: "SunStar", url: "https://www.sunstar.com.ph/amp/story/cebu/phl-hauls-29-total-medals-finishes-17th-overall-in-asiad" },
      { name: "Olympics.com: all Team Philippines medalists", url: "https://www.olympics.com/en/news/asian-games-2026-all-team-philippines-medal-winners-full-list" },
    ],
  },
  {
    slug: "ej-obiena-retains-asian-games-title",
    date: "2026-09-29",
    topic: "athletics",
    title: "EJ Obiena retains his Asian Games pole vault title with a Games record",
    dek: "Obiena cleared 5.91 m in the rain in Nagoya, beating his own Asian Games record, for his 10th win of the season.",
    body: [
      "Defending the title he won in Hangzhou in 2023, Obiena controlled the competition despite wet conditions and finished with a Games-record 5.91 m.",
      "It capped a strong comeback season that included 10 wins and his best clearances since the Paris Olympics.",
    ],
    why: "Obiena, the Asian record holder at 6.00 m, is now a two-time Asian Games champion and the Philippines' biggest star in field events.",
    image: {
      src: "/images/sports/obiena.jpg",
      alt: "EJ Obiena carrying his pole on the runway at the 2026 Athletissima Diamond League meet",
      caption: "EJ Obiena at the Athletissima Diamond League meet in Lausanne, 2026.",
      author: "Quejaytee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:EJ_Obiena_at_the_2026_Wanda_Diamond_League_Athletissima_athletics_competition.jpg",
    },
    sources: [
      { name: "Inquirer Sports", url: "https://sports.inquirer.net/698856/ej-obiena-wins-second-straight-asian-games-pole-vault-gold" },
      { name: "Vogue Philippines", url: "https://vogue.ph/lifestyle/sports/ej-obiena-wins-gold-2026-asian-games/" },
    ],
  },
  {
    slug: "alex-eala-cracks-world-top-15",
    date: "2026-11-09",
    topic: "tennis",
    title: "Alex Eala breaks into the world's top 15",
    dek: "A run to the Hong Kong final lifted Eala to a career-high No. 15 to close a breakthrough 2026 season.",
    body: [
      "Seeded second in Hong Kong, Eala beat Maria Sakkari in a rain-delayed semifinal before falling to Claire Liu in the final. The run moved her into the WTA top 15 for the first time.",
      "She started the year just inside the top 50. Along the way she reached the fourth round at Wimbledon, beating Iga Świątek, and finished the season sixth among players under 23.",
    ],
    why: "It capped a season in which Eala won the first WTA Tour title by a Filipino and established herself among the world's top players.",
    image: {
      src: "/images/sports/eala.jpg",
      alt: "Alex Eala smiling with medals around her neck and a bouquet of flowers",
      caption: "Alex Eala in Manila.",
      author: "Philippine Sports Commission",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Alex_Eala_(cropped).jpg",
    },
    sources: [
      { name: "Manila Times", url: "https://www.manilatimes.net/2026/11/08/sports/alex-eala-to-finish-wta-2026-in-top-15/2464636" },
      { name: "Inquirer USA", url: "https://usa.inquirer.net/215902/alex-eala-finishes-2026-as-worlds-no-6-u23-player" },
    ],
  },
  {
    slug: "alex-eala-wins-washington-first-wta-title",
    date: "2026-08-03",
    topic: "tennis",
    title: "Alex Eala wins the first WTA Tour title for the Philippines",
    dek: "Eala came from a set down to beat top seed Jessica Pegula in the Washington final.",
    body: [
      "In a final pushed into a second day by rain, Eala beat Pegula 4-6, 6-4, 6-0 at the Mubadala DC Open. Earlier in the week she beat defending champion Leylah Fernandez, second seed Elina Svitolina and third seed Naomi Osaka.",
      "It was her first title at WTA Tour level, after earlier wins on the lower-tier WTA 125 and ITF circuits.",
    ],
    why: "She became the first tennis player from the Philippines to win a WTA Tour singles title.",
    image: {
      src: "/images/sports/eala-us-open.jpg",
      alt: "Alex Eala in a black top and white skirt moving to hit a forehand on a hard court",
      caption: "Alex Eala at the 2024 US Open.",
      author: "Hameltion",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Alex_Eala_2024_US_Open_2b.jpg",
    },
    sources: [
      { name: "WTA", url: "https://www.wtatennis.com/news/4553195/eala-completes-pegula-comeback-to-win-washington-first-wta-title-for-the-philippines" },
      { name: "Philippine News Agency", url: "https://www.pna.gov.ph/articles/1280989" },
    ],
  },
  {
    slug: "eumir-marcial-knocks-out-huerta",
    date: "2026-09-19",
    topic: "boxing",
    title: "Eumir Marcial stays unbeaten with a third-round knockout",
    dek: "The Olympic bronze medalist stopped Omar Huerta in San Diego to improve to 8-0 as a professional.",
    body: [
      "Marcial dropped Huerta with a counter right hook in the third round at Pechanga Arena, on the undercard of Isaac Cruz vs. Nestor Bravo.",
      "Because the fight came days before the Asian Games boxing tournament, the national federation decided not to send him to Nagoya.",
    ],
    why: "Marcial is a Tokyo Olympic bronze medalist and world championship silver medalist, now unbeaten in eight professional fights.",
    image: {
      src: "/images/sports/marcial.jpg",
      alt: "Eumir Marcial in a red Philippines jacket holding up a gold medal",
      caption: "Eumir Marcial with a gold medal in Kuala Lumpur.",
      author: "Primo Agatep for the Philippine News Agency",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Eumir_felix_marcial_KL_2017.jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/sports/boxing/1002994/eumir-marcial-returns-with-3rd-round-ko-of-mexican-foe/story/" },
      { name: "ESPN", url: "https://www.espn.com/boxing/story/_/id/49985201/asian-games-2026-eumir-marcial-scores-knockout-pro-fight-keeps-games-bid-alive" },
      { name: "Boxing News", url: "https://boxingnews.com/news/eumir-marcial-vs-omar-ulises-huerta-result-and-reaction/" },
    ],
  },
  {
    slug: "ej-obiena-season-best-in-madrid",
    date: "2026-07-17",
    topic: "athletics",
    title: "EJ Obiena clears 5.85 m in Madrid, his best since Paris",
    dek: "Obiena took silver at Meeting Madrid with a season-best jump, his highest clearance since the 2024 Olympics.",
    body: [
      "Germany's Bo Kanda Lita Baehre won with 5.90 m, while Obiena edged Portugal's Pedro Buaro on count-back at 5.85 m and then tried 5.95 m.",
      "The jump improved on the 5.81 m he cleared in Athens and set him up for wins in Germany and at the Asian Games later in the season.",
    ],
    why: "The Madrid jump was the first sign of the form that carried Obiena to Asian Games gold later in the season.",
    image: {
      src: "/images/sports/obiena-athletissima.jpg",
      alt: "EJ Obiena running down the runway with his pole in front of a crowd",
      caption: "EJ Obiena at the Athletissima Diamond League meet, 2026.",
      author: "Quejaytee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:EJ_Obiena_at_the_2026_Wanda_Diamond_League_Athletissima_athletics_competition._03.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/07/17/obiena-posts-season-best-sees-silver-lining" },
      { name: "Rappler", url: "https://www.rappler.com/sports/pole-vault-ej-obiena-meeting-madrid-july-2026/" },
    ],
  },
  {
    slug: "petecio-villegas-marcial-eye-la28",
    date: "2026-05-28",
    topic: "boxing",
    title: "Petecio, Villegas and Marcial set their sights on LA28",
    dek: "The Philippines' Olympic boxing medalists are aiming for one more shot at the podium at the 2028 Los Angeles Games.",
    body: [
      "Nesthy Petecio, a silver medalist in Tokyo and bronze medalist in Paris, leads a group of veterans the national program is again counting on for Olympic medals, alongside Paris bronze medalist Aira Villegas and Tokyo bronze medalist Eumir Marcial.",
    ],
    why: "Petecio is the first Filipino boxer to win two Olympic medals, and Villegas and Marcial have one each.",
    image: {
      src: "/images/sports/petecio.jpg",
      alt: "Nesthy Petecio in a blue Philippines jacket raising her arm and speaking into a microphone, with her Olympic medal",
      caption: "Nesthy Petecio after the Paris Olympics.",
      author: "Philippine Sports Commission",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Petecio_2024.jpg",
    },
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/sports/2026/05/28/2531173/philippine-boxing-stalwarts-eyed-olympic-medal-hopes-anew" },
      { name: "GMA News: Paris recap", url: "https://gmanetwork.com/news/sports/othersports/916674/recap-philippines-at-the-2024-paris-olympics/story" },
    ],
  },
  {
    slug: "weightlifting-joins-palarong-pambansa",
    date: "2026-05-16",
    topic: "weightlifting",
    title: "Hidilyn Diaz's sport becomes a regular event at the Palarong Pambansa",
    dek: "Weightlifting made its debut as a medal event at the national schools games, with the Olympic champion as tournament director.",
    body: [
      "Diaz led the officials' oath and watched a lifter from her hometown and one of her own students finish first and second in the inaugural event.",
      "Now teaching weightlifting at UP Diliman and coaching young lifters, she said she would focus on growing the sport rather than competing at the Asian Games or the 2028 Olympics.",
    ],
    why: "Diaz won the Philippines' first Olympic gold in 2021, and putting weightlifting in the national schools games was a long-held goal of hers.",
    image: {
      src: "/images/sports/diaz.jpg",
      alt: "Hidilyn Diaz in a blue Philippines shirt holding up her Olympic gold medal",
      caption: "Hidilyn Diaz with her Tokyo Olympic gold medal.",
      author: "PTV News",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Hidilyn_Diaz_with_her_gold_medal_2021_(1-44_screenshot).jpg",
    },
    sources: [
      { name: "Rappler", url: "https://www.rappler.com/sports/palarong-pambansa/hidilyn-diaz-dream-come-true-weightlifting-regular-sport-2026/" },
      { name: "GMA News", url: "https://www.gmanetwork.com/news/sports/othersports/989120/2026-palarong-pambansa-hidilyn-diaz-beams-with-pride-as-kababayan-student-finish-1-2-in-inaugural-weig/story/" },
      { name: "Philstar", url: "https://www.philstar.com/sports/2026/05/28/2531167/hidilyn-prioritizes-weightlifting-promotion-over-asian-games-olympic-bids" },
    ],
  },
  {
    slug: "bianca-pagdanganan-65-lpga-q-series",
    date: "2026-11-06",
    topic: "golf",
    title: "Bianca Pagdanganan fires a 65 to revive her LPGA card bid",
    dek: "Two eagles lifted the Paris Olympian into the top 25 at LPGA Q-Series, where the top finishers earn 2027 tour cards.",
    body: [
      "Pagdanganan opened with a bogey, then made two eagles and four birdies to post a 65 and move into contention in the qualifying event.",
      "She played 2026 without full LPGA status, missing one cut by a single stroke in April and sitting tied for second at the Portland Classic in August.",
    ],
    why: "Pagdanganan finished tied for fourth at the Paris Olympics, the closest a Filipino golfer has come to an Olympic medal.",
    image: {
      src: "/images/sports/pagdanganan.jpg",
      alt: "Bianca Pagdanganan smiling and holding up her Asian Games gold medals",
      caption: "Bianca Pagdanganan with her 2018 Asian Games medals.",
      author: "Avito C. Dalan for the Philippine News Agency",
      license: PD,
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Bianca_Pagdanganan.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/11/06/bianca-fires-65-revives-q-series-bid" },
      { name: "Philstar", url: "https://www.philstar.com/sports/2026/11/06/2568294/pagdanganan-explodes-65-storms-top-25-ardina-stays-hunt-arejola-falters" },
    ],
  },
  {
    slug: "margielyn-didal-push-philippines",
    date: "2026-05-31",
    topic: "skateboarding",
    title: "Margielyn Didal backs a skateboard drive for Filipino kids",
    dek: "The Asian Games champion is helping Push Philippines bring donated boards to young skaters in Cebu and beyond.",
    body: [
      "Push Philippines, a community run by a friend of Didal's in London, collects new and used skateboards abroad and ships them home in balikbayan boxes for kids who can't afford them.",
      "Didal, who learned to skate on Cebu's streets, has also long pushed for a dedicated skatepark in the city.",
    ],
    why: "Didal won the Philippines' first Asian Games skateboarding gold in 2018, and she is using that profile to open the sport to more Filipino kids.",
    image: {
      src: "/images/sports/didal.jpg",
      alt: "Margielyn Didal in a cap and white T-shirt leaning on her skateboard in a park",
      caption: "Margielyn Didal in Cebu.",
      author: "Herbertkikoy",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Hey._it%27s_Margie.jpg",
    },
    sources: [
      { name: "Cebu Daily News", url: "https://cebudailynews.inquirer.net/733119/margielyn-didal-shares-skateboarding-donation-drive-in-cebu-city" },
      { name: "SunStar", url: "https://www.sunstar.com.ph/cebu/sports/didal-skateboarding-knows-no-boundaries" },
    ],
  },
];

export function getAllSports(): SportsStory[] {
  return [...STORIES].sort((a, b) => b.date.localeCompare(a.date));
}

// Stories on the same topic first, then the closest in date. `exclude` skips slugs already linked (the pager).
export function getRelatedSports(story: SportsStory, count = 3, exclude: string[] = []): SportsStory[] {
  const t = Date.parse(story.date);
  return STORIES.filter((s) => s.slug !== story.slug && !exclude.includes(s.slug))
    .sort(
      (a, b) =>
        Number(b.topic === story.topic) - Number(a.topic === story.topic) ||
        Math.abs(Date.parse(a.date) - t) - Math.abs(Date.parse(b.date) - t),
    )
    .slice(0, count);
}

export function getSportsBySlug(slug: string) {
  return STORIES.find((s) => s.slug === slug) ?? null;
}

export function sportsTopicLabel(slug: SportsTopic) {
  return SPORTS_TOPICS.find((t) => t.slug === slug)?.label ?? slug;
}
