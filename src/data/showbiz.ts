// Filipino pop culture stories: sourced, editorial, photo-led. Newest first via getAllShowbiz().
// Client-safe (no fs). Photos are freely licensed (Wikimedia Commons) and must carry a credit.
// Rules: verified achievements, releases and events only; no rumors or private lives.

export const SHOWBIZ_TOPICS = [
  { slug: "music", label: "Music" },
  { slug: "tv", label: "TV" },
  { slug: "film", label: "Film" },
  { slug: "stage", label: "Stage" },
  { slug: "pageants", label: "Pageants" },
  { slug: "arts", label: "Arts" },
] as const;

export type ShowbizTopic = (typeof SHOWBIZ_TOPICS)[number]["slug"];

export interface ShowbizStory {
  slug: string;
  date: string; // YYYY-MM-DD
  topic: ShowbizTopic;
  title: string;
  dek: string;
  body: string[];
  why: string;
  // Pins a story as the big lead on /showbiz (otherwise the newest leads).
  featured?: boolean;
  image: { src: string; alt: string; caption: string; author: string; license: string; licenseUrl: string; source: string };
  sources: { name: string; url: string }[];
}

const STORIES: ShowbizStory[] = [
  {
    slug: "carmelle-wins-eurovision-asia",
    featured: true,
    date: "2026-11-14",
    topic: "music",
    title: "Carmelle wins the first-ever Eurovision Song Contest Asia",
    dek: "The 19-year-old took the inaugural title in Bangkok with \"Sobra-Sobra,\" a dance-pop tribute to Filipino women.",
    body: [
      "Carmelle Collado beat ten other acts at the One Bangkok Forum with 211 points from juries and viewers combined. Thailand's Mang x Daou came second and Vietnam's Toc Tien third.",
      "She earned her spot in August, when \"Sobra-Sobra\" won the Philippine selection night in Quezon City against nine other entries.",
    ],
    why: "A Filipino act now holds the very first Eurovision Asia crown, a big platform for OPM beyond the region.",
    image: {
      src: "/images/showbiz/carmelle-eurovision-asia.jpg",
      alt: "Carmelle Collado celebrating on stage after winning Eurovision Song Contest Asia 2026",
      caption: "Carmelle on stage in Bangkok after the win.",
      author: "Quejaytee",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Carmelle_Collado_celebrates_on_stage_after_winning_the_2026_Eurovision_Song_Contest_Asia_for_the_Philippines_06.jpg",
    },
    sources: [
      { name: "EBU", url: "https://www.ebu.ch/news/2026/11/winner-inaugural-eurovision-song-contest-asia-2026-in-bangkok" },
      { name: "South China Morning Post", url: "https://www.scmp.com/news/asia/southeast-asia/article/3374455/philippines-carmelle-storms-victory-eurovision-asia-debut-bangkok" },
      { name: "NBC News", url: "https://www.nbcnews.com/world/asia/eurovision-asia-carmelle-rcna609327" },
    ],
  },
  {
    slug: "bini-kids-choice-awards",
    date: "2026-11-14",
    topic: "music",
    title: "BINI beats Taylor Swift to a Kids' Choice Award",
    dek: "The P-pop girl group won Favorite Global Music Star, the first Filipino act to win the category.",
    body: [
      "Representing Asia, BINI topped a field that included Taylor Swift, Tyla, Zara Larsson, Karol G, Olivia Dean and Tame Impala at Nickelodeon's ceremony in Los Angeles.",
      "The same weekend, the group was also named Most Influential Southeast Asian Artist (Female) at the Jupiter Music Awards.",
    ],
    why: "Fan voting decides the Kids' Choice Awards, so the win shows how far BINI's fan base reaches beyond the Philippines.",
    image: {
      src: "/images/showbiz/bini-kids-choice.jpg",
      alt: "Members of BINI at a Philippine Senate commendation in May 2026",
      caption: "BINI at a Senate commendation in May 2026.",
      author: "Wendell Alinea, Senate of the Philippines",
      license: "Public domain",
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:BINI_at_Senate_commendation_(2).jpg",
    },
    sources: [
      { name: "Philstar", url: "https://www.philstar.com/entertainment/music/2026/11/15/2570300/bini-wins-favorite-global-music-star-kids-choice-awards" },
      { name: "Inquirer", url: "https://entertainment.inquirer.net/690132/bini-earns-historic-win-at-nickelodeon-kids-choice-awards-beating-taylor-swift" },
      { name: "Billboard", url: "https://www.billboard.com/lists/2026-kids-choice-awards-full-winners-list/" },
    ],
  },
  {
    slug: "pinoy-big-brother-collab-3",
    date: "2026-10-24",
    topic: "tv",
    title: "Pinoy Big Brother opens its doors for Collab Edition 3.0",
    dek: "The third GMA and ABS-CBN team-up moves into a new house, this time with regular Filipinos alongside stars.",
    body: [
      "Sixteen housemates entered on launch night, mixing actors such as Winwyn Marquez and Mikee Quintos with content creators and first-timers picked from worldwide auditions.",
      "The show airs on GMA, Kapuso Stream and ABS-CBN's YouTube channel, continuing the rival networks' unlikely partnership that began in 2025.",
    ],
    why: "PBB is still the country's biggest reality-TV conversation; expect housemates to dominate social feeds through the holidays.",
    image: {
      src: "/images/showbiz/pbb-collab-3.jpg",
      alt: "Exterior of the new Pinoy Big Brother house in Quezon City, October 2026",
      caption: "The new Pinoy Big Brother house in Quezon City.",
      author: "Ralff Nestor Nacor",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:New_Pinoy_Big_Brother_House,_Q.C.,_Oct_2026_(1).jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/showbiz/chikaminute/1005439/pinoy-big-brother-collab-3-0-to-launch-on-october-24/story/" },
      { name: "GMA News", url: "https://www.gmanetwork.com/news/showbiz/chikaminute/1007040/winwyn-marques-mikee-quintos-more-kapuso-stars-join-pinoy-big-brother-collab-edition-3-0/story/" },
    ],
  },
  {
    slug: "sb19-bini-grammy-submissions",
    date: "2026-10-14",
    topic: "music",
    title: "SB19 and BINI make a play for the new Grammy Asian pop category",
    dek: "Both groups submitted songs for Best Asian Pop Music Performance, a category that opens the Grammys to K-pop, J-pop and P-pop.",
    body: [
      "SB19 entered \"VISA\" for the new category and \"LAWLESS\" for Best Pop Duo/Group Performance. BINI submitted \"Unang Kilig\" and is also aiming for Best New Artist.",
      "The category drew 116 submissions in its first year. Some critics worry it could keep Asian artists out of the main categories; the Recording Academy says it is going ahead.",
    ],
    why: "A submission isn't a nomination, but a dedicated Asian pop category gives P-pop a real route into the Grammys.",
    image: {
      src: "/images/showbiz/sb19-grammy.jpg",
      alt: "SB19 performing at Playlist Live Festival 2023",
      caption: "SB19 performing in 2023.",
      author: "Aprienne JC",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:SB19_at_Playlist_Live_Festival_2023.jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/lifestyle/content/1005717/sb19-bini-eye-2027-grammy-recognition-with-submitted-entries/story/" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/10/14/bini-eyes-2027-grammys-with-three-submissions" },
      { name: "Complex", url: "https://www.complex.com/music/a/alex-ocho/sb19-bini-grammy-submission-best-asian-pop" },
    ],
  },
  {
    slug: "jericho-rosales-quezon-best-actor",
    date: "2026-09-06",
    topic: "film",
    title: "Jericho Rosales sweeps Best Actor honors for \"Quezon\"",
    dek: "His turn as Manuel L. Quezon won at the Manila International Film Festival in Los Angeles, after wins at the Eddys and the Gawad Urian.",
    body: [
      "Jerrold Tarog's historical drama follows the Commonwealth president. Rosales took Best Actor at the festival's Beverly Hills gala, where Raymond Red's \"Manila's Finest\" won Best Picture.",
      "\"Quezon\" also won Best Picture at the 9th Eddys in July, and Rosales shared the Gawad Urian Best Actor prize with Carlo Aquino in October.",
    ],
    why: "It's the most decorated Filipino performance of the year, and a sign of the appetite for big homegrown history films.",
    image: {
      src: "/images/showbiz/jericho-rosales-quezon.jpg",
      alt: "Jericho Rosales at a screening of Quezon in September 2026",
      caption: "Jericho Rosales in September 2026.",
      author: "Kevin Paul",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Jericho_Rosales_-_Quezon.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/09/08/filipino-cinema-takes-the-spotlight-as-manila-international-film-festival-honors-its-best" },
      { name: "Philstar", url: "https://www.philstar.com/bansa/2026/07/07/2540296/big-night-quezon-jericho-rosales-and-maris-racal-9th-eddys" },
      { name: "Philstar", url: "https://www.philstar.com/nation/2026/10/09/2562003/gawad-urian-2026-full-list-winners" },
    ],
  },
  {
    slug: "lea-salonga-hollywood-walk-of-fame",
    date: "2026-09-04",
    topic: "stage",
    title: "Lea Salonga gets her star on the Hollywood Walk of Fame",
    dek: "The Miss Saigon and Disney icon received the 2,855th star, the first for a Filipina.",
    body: [
      "Her star, in the Live Performance category, sits in front of the Pantages Theatre on Hollywood Boulevard. Ming-Na Wen spoke at the ceremony, with Darren Criss, H.E.R. and Brandy among the guests.",
      "Filipino-heritage honorees such as Bruno Mars and Rob Schneider came before her, but she is the first Filipina.",
    ],
    why: "Thirty-five years after her Tony win, Salonga is still the template for Filipino talent on the world stage.",
    image: {
      src: "/images/showbiz/lea-salonga-walk-of-fame.jpg",
      alt: "Lea Salonga standing with performers after a master class in 2017",
      caption: "Lea Salonga (center, in the black jacket) with students at a 2017 master class.",
      author: "Bradley Griffin",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Lea_Salonga_master_class_(34105894706).jpg",
    },
    sources: [
      { name: "FOX 11 Los Angeles", url: "https://foxla.com/news/lea-salonga-first-filipina-hollywood-walk-of-fame-star" },
      { name: "The Star", url: "https://www.thestar.com.my/lifestyle/entertainment/2026/09/08/lea-salonga-makes-history-with-hollywood-walk-of-fame-star" },
    ],
  },
  {
    slug: "cup-of-joe-multo-japan",
    date: "2026-06-13",
    topic: "music",
    title: "Cup of Joe's \"Multo\" haunts the charts all the way to Tokyo",
    dek: "The band's breakout ballad, 33 weeks at No. 1 at home, picked up a special award at Music Awards Japan.",
    body: [
      "\"Multo\" (Tagalog for \"ghost\") was nominated for Best Song Asia and earned the Philippine Popular Music Special Award at the ceremony in Tokyo.",
      "The song spent 33 weeks at No. 1 on the Billboard Philippines Hot 100, and Billboard Philippines named Cup of Joe its top artist of 2025.",
    ],
    why: "Proof that a Tagalog-language band song can break out regionally without a K-pop-style machine behind it.",
    image: {
      src: "/images/showbiz/cup-of-joe-multo.jpg",
      alt: "Cup of Joe performing at Aurora Music Festival in 2025",
      caption: "Cup of Joe at Aurora Music Festival, 2025.",
      author: "Monkinvideos",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Cup_of_Joe_at_Aurora_Music_Festival_in_2025.jpg",
    },
    sources: [
      { name: "Bandwagon", url: "https://www.bandwagon.asia/articles/after-the-win-with-cup-of-joe-carrying-opm-forward-looking-back-on-multo-and-continuing-to-dream-big" },
      { name: "GMA News", url: "https://www.gmanetwork.com/news/lifestyle/hobbiesandactivities/986035/cup-of-joe-s-multo-is-nominated-for-best-song-asia-in-the-2nd-music-awards-japan/story/" },
      { name: "Wikipedia: Multo (song)", url: "https://en.wikipedia.org/wiki/Multo_(song)" },
    ],
  },
  {
    slug: "bini-billboard-global-force-award",
    date: "2026-04-30",
    topic: "music",
    title: "BINI accepts the Global Force Award at Billboard Women in Music",
    dek: "The group was honored in Hollywood as \"proud Filipinas,\" months after releasing the single \"Unang Kilig.\"",
    body: [
      "Billboard's Global Force Award recognizes artists driving music across borders. BINI accepted it at the Women in Music event in Hollywood.",
      "It kicked off a big year for the group, which later took Artist of the Year at the Filipino Music Awards and a Kids' Choice Award in November.",
    ],
    why: "A Billboard honor in Hollywood puts P-pop on the same stage as global pop acts.",
    image: {
      src: "/images/showbiz/bini-billboard-women.jpg",
      alt: "BINI performing at the Ibalong Festival in 2025",
      caption: "BINI performing at the Ibalong Festival, 2025.",
      author: "Hisham Ismail",
      license: "Public domain",
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Bini_at_Ibalong_Festival_2025_(2).jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/showbiz/chikaminute/985894/bini-accepts-global-force-award-at-billboard-women-in-music-2026-as-proud-filipinas/story/" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/04/29/bini-to-receive-global-force-award-at-billboard-women-in-music" },
    ],
  },
  {
    slug: "filipinana-sundance-jury-award",
    date: "2026-01-30",
    topic: "film",
    title: "\"Filipiñana\" wins a Special Jury Award at Sundance",
    dek: "Rafael Manuel's debut feature took the World Cinema Dramatic prize for Creative Vision.",
    body: [
      "The film expands Manuel's award-winning 2020 short of the same name, set in the world of a Manila golf club. It's a co-production between Singapore, the UK, the Philippines, France and the Netherlands.",
      "Kino Lorber picked up North American distribution after the festival.",
    ],
    why: "One of the year's most-watched Filipino titles on the festival circuit; look out for screenings near you.",
    image: {
      src: "/images/showbiz/filipinana-sundance.jpg",
      alt: "The Filipiñana team at the 2026 Sundance Film Festival awards",
      caption: "The Filipiñana team at the Sundance awards.",
      author: "Sarah K Joyce",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Sundance_awards_2026_-_Filipi%C3%B1ana_-_Farhana_Bhula,_Rafael_Manuel,_Isabel_Sicat,_Jeremy_Chua.jpg",
    },
    sources: [
      { name: "Sundance Institute", url: "https://www.sundance.org/blogs/2026-sundance-film-festival-announces-award-winners/" },
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/02/02/rafael-manuels-short-film-filipinana-earns-special-jury-award-at-sundance-2026" },
    ],
  },
  {
    slug: "analog-tv-switch-off-mega-manila",
    date: "2026-11-17",
    topic: "tv",
    title: "Mega Manila's analog TV signal goes dark this weekend",
    dek: "Free-to-air analog broadcasts across Metro Manila and nearby provinces are set to switch off on November 22, leaving digital only.",
    body: [
      "The National Telecommunications Commission set November 22 as the shutdown date for Metro Manila, Bulacan, Cavite, Rizal, Laguna, Pampanga and Bataan. Some reports put it a day earlier.",
      "Around 80% of TV households in the area were already watching digital broadcasts. GMA asked for more time to help viewers make the switch, but the NTC kept the deadline.",
    ],
    why: "Older TVs without a digital tuner will need a set-top box to keep watching local channels.",
    image: {
      src: "/images/showbiz/analog-tv-switch-off.jpg",
      alt: "Aerial view of GMA Network Center along EDSA in Quezon City",
      caption: "GMA Network Center on EDSA, August 2026.",
      author: "Patrickroque01",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:EDSA-Timog-East_NB_right,_GMA_Network_Center_drone_(Quezon_City;_08-20-2026).jpg",
    },
    sources: [
      { name: "Context.ph", url: "https://context.ph/2026/07/17/gma-network-ready-for-mega-manila-analog-tv-shutdown-in-november/" },
      { name: "Philstar", url: "https://www.philstar.com/business/2026/07/18/2542821/gma-network-ready-analog-exit/amp/" },
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/07/17/gma-prepares-to-pull-plug-analog-tv-ahead-of-november-deadline" },
    ],
  },
  {
    slug: "gawad-urian-2026-winners",
    date: "2026-10-08",
    topic: "film",
    title: "\"Bloom Where You Are Planted\" wins big at the Gawad Urian",
    dek: "The Cagayan Valley-made film took Best Picture, while four actors split the top acting prizes.",
    body: [
      "The critics' awards gave Best Actor jointly to Carlo Aquino (\"Bar Boys: After School\") and Jericho Rosales (\"Quezon\"), and Best Actress to Maris Racal (\"Sunshine\") and Odette Khan (\"Bar Boys: After School\").",
      "Director Laurice Guillen received the Natatanging Gawad Urian for her lifetime contribution to Filipino cinema.",
    ],
    why: "The Urian is chosen by film critics, so it's the year's best guide to Filipino films worth seeking out.",
    image: {
      src: "/images/showbiz/gawad-urian-2026.jpg",
      alt: "Portrait of actress Maris Racal",
      caption: "Maris Racal, one of this year's Best Actress winners.",
      author: "Anonnymuz",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Maris_Racal_2024.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/10/08/bloom-where-you-are-planted-dominates-49th-gawad-urian-awards-as-carlo-aquino-jericho-rosales-maris-racal-and-odette-khan-share-top-acting-honors" },
      { name: "Philstar", url: "https://www.philstar.com/nation/2026/10/09/2562003/gawad-urian-2026-full-list-winners" },
    ],
  },
  {
    slug: "filipino-music-awards-2026",
    date: "2026-10-06",
    topic: "music",
    title: "BINI and SB19 rule the Filipino Music Awards",
    dek: "BINI took Artist of the Year and Tour of the Year, SB19 won the most trophies, and Maki's \"KOLORCOASTER\" was Album of the Year.",
    body: [
      "SB19 won three awards, including Concert of the Year for \"Wakas At Simula: The Trilogy Concert Finale.\" BINI's Signals World Tour 2026 won Tour of the Year.",
      "\"Since Day One\" by Skusta Clee featuring Flow G was Song of the Year, and fitterkarma was named Breakthrough Artist.",
    ],
    why: "A quick map of who's driving OPM right now, from P-pop to hip-hop to indie.",
    image: {
      src: "/images/showbiz/filipino-music-awards-2026.jpg",
      alt: "Singer Maki performing in March 2026",
      caption: "Maki, whose \"KOLORCOASTER\" won Album of the Year, performing in March 2026.",
      author: "Borgenland",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:MakiWishBusMarch2026_A.jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/lifestyle/content/1004996/filipino-music-awards-2026-bini-wins-artist-of-the-year-sb19-bags-3-awards/story/" },
      { name: "Bandwagon", url: "https://www.bandwagon.asia/articles/bini-sb19-maki-skusta-clee-flow-g-more-win-big-at-filipino-music-awards-2026" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/10/07/bini-sb19-emerge-as-big-winners-at-filipino-music-awards-2026" },
    ],
  },
  {
    slug: "national-artists-2026",
    date: "2026-09-09",
    topic: "arts",
    title: "Ten new National Artists named in the largest batch yet",
    dek: "The honorees include composer Alfredo Buenaventura, Patis Tesoro, Bing Lao and Nonoy Froilan, plus the first woman named for visual arts.",
    body: [
      "Malacañang announced the ten through a presidential proclamation. National Artist is the country's highest honor for Filipinos in the arts.",
      "Buenaventura, born in 1929 in Bulacan, wove Philippine epics and folk themes into operas, symphonies and masses, and championed the rondalla tradition.",
    ],
    why: "The list doubles as a reading, listening and watching list of Filipino culture's foundations.",
    image: {
      src: "/images/showbiz/national-artists-2026.jpg",
      alt: "The main building of the Cultural Center of the Philippines in Manila",
      caption: "The Cultural Center of the Philippines in Manila.",
      author: "Michael",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:CULTURAL_CENTER_OF_THE_PHILIPPINES_MAIN_BUILDING_3_-_Flickr.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/09/10/ten-filipinos-named-national-artists-in-largest-batch-yet-including-first-woman-in-visual-arts-2" },
      { name: "GMA News", url: "https://www.gmanetwork.com/news/lifestyle/artandculture/1001806/10-new-national-artists-of-the-philippines-named/story/" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/09/09/alfredo-s-buenaventura-and-the-filipino-voice-in-music" },
    ],
  },
  {
    slug: "binibining-pilipinas-2026",
    date: "2026-07-18",
    topic: "pageants",
    title: "Gwendoline Soriano wins Binibining Pilipinas International",
    dek: "Four years after withdrawing, she came back to take the crown and five special awards at the Araneta Coliseum.",
    body: [
      "Soriano also won Best in Swimsuit and Best in Evening Gown. Tarlac's Sasha-Juli Belle Lacuna was crowned Binibining Pilipinas Globe.",
      "Julianne Raine Antonio of Dumaguete and Tracy Mae Sunio of Bacolod placed first and second runner-up.",
    ],
    why: "Pageants are close to a national sport in the Philippines; Soriano now carries the country to Miss International.",
    image: {
      src: "/images/showbiz/binibining-pilipinas-2026.jpg",
      alt: "Gwendoline Soriano during a visit to the Baguio City mayor's office in May 2026",
      caption: "Gwendoline Soriano visiting Baguio City Hall, May 2026.",
      author: "Baguio City Public Information Office",
      license: "Public domain",
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Gwendoline_Soriano_visits_Baguio%27s_Mayor_Office.jpg",
    },
    sources: [
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/07/18/gwendoline-soriano-wins-binibining-pilipinas-international-2026-crown" },
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/07/19/gwendoline-meliz-soriano-sasha-juli-belle-lacuna-crowned-binibining-pilipinas-2026-queens" },
      { name: "Philstar", url: "https://www.philstar.com/region/2026/07/20/2543232/baguio-tarlac-queens-rule-binibining-pilipinas-2026" },
    ],
  },
  {
    slug: "zack-tabudlo-forbes-30-under-30",
    date: "2026-05-28",
    topic: "music",
    title: "Zack Tabudlo makes Forbes Asia's 30 Under 30",
    dek: "The singer-songwriter behind a string of viral hits joins tennis star Alex Eala among this year's Filipino honorees.",
    body: [
      "Forbes cited his streaming reach across Southeast Asia; he was the most-streamed Philippine artist of 2022. He signed with Mercury Records under Universal Music Group in 2025.",
      "Tabudlo first rose to fame on \"The Voice Kids\" in 2014 and later returned to the show as a coach.",
    ],
    why: "A reminder that Filipino songwriters are building regional audiences on streaming, not just at home.",
    image: {
      src: "/images/showbiz/zack-tabudlo-forbes.jpg",
      alt: "Portrait of singer-songwriter Zack Tabudlo",
      caption: "Zack Tabudlo in 2022.",
      author: "Macinasron",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      source: "https://commons.wikimedia.org/wiki/File:Zack_Tabudlo_(2022).jpg",
    },
    sources: [
      { name: "GMA News", url: "https://www.gmanetwork.com/news/showbiz/chikaminute/989300/zack-tabudlo-named-to-forbes-asia-s-30-under-30-list-2026/story/" },
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/05/28/tennis-star-alex-eala-singer-songwriter-zack-tabudlo-land-on-forbes-30-under-30-asia-2026-list" },
    ],
  },
  {
    slug: "bea-millan-windorski-miss-universe-philippines",
    date: "2026-05-02",
    topic: "pageants",
    title: "La Union's Bea Millan-Windorski is Miss Universe Philippines",
    dek: "The Filipino-American beat 49 other candidates and heads to Miss Universe in Puerto Rico this November.",
    body: [
      "She was crowned at the SM Mall of Asia Arena by outgoing queen Ahtisa Manalo, with drag star Marina Summers hosting the night.",
      "Millan-Windorski previously represented the United States at Miss Earth 2024.",
    ],
    why: "Filipinos follow Miss Universe like a sports final; watch for her in Puerto Rico later this month.",
    image: {
      src: "/images/showbiz/bea-miss-universe-ph.jpg",
      alt: "Bea Millan-Windorski smiling during a courtesy visit in La Union, 2026",
      caption: "Bea Millan-Windorski on a courtesy visit to the La Union governor, 2026.",
      author: "Mario Eduardo \"TOT\" C. Ortega",
      license: "Public domain",
      licenseUrl: "",
      source: "https://commons.wikimedia.org/wiki/File:Bea_Millan-Windorski_in_2026.jpg",
    },
    sources: [
      { name: "Manila Bulletin", url: "https://mb.com.ph/2026/05/03/bea-millan-windorski-is-miss-universe-philippines-2026" },
      { name: "SunStar", url: "https://www.sunstar.com.ph/cebu/la-unions-bea-windorski-wins-miss-universe-ph-2026" },
    ],
  },
  {
    slug: "regine-velasquez-woman-of-the-year",
    date: "2026-03-24",
    topic: "music",
    title: "Regine Velasquez named Billboard Philippines' Woman of the Year",
    dek: "Asia's Songbird was honored at Billboard Philippines Women in Music, with BINI presenting her award.",
    body: [
      "The third edition of the event, at the BGC Arts Center, also recognized KZ Tandingan, Yeng Constantino, BINI and rock icon Lolita Carbon.",
      "Velasquez closed the night's program, four decades into a career that shaped Filipino pop.",
    ],
    why: "Velasquez is the voice many younger OPM stars grew up imitating; the honor connects generations.",
    image: {
      src: "/images/showbiz/regine-woman-of-the-year.jpg",
      alt: "Regine Velasquez performing on stage at her R30 concert",
      caption: "Regine Velasquez at her R30 concert, 2017.",
      author: "Rex Martin Gabriel",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      source: "https://commons.wikimedia.org/wiki/File:Regine_Velasquez_R30_Concert.jpg",
    },
    sources: [
      { name: "SunStar", url: "https://www.sunstar.com.ph/cebu/velasquez-named-woman-of-the-year-by-billboard-philippines" },
      { name: "Daily Tribune", url: "https://tribune.net.ph/2026/03/26/regine-at-40-the-voice-that-carried-generationsand-still-dreams-bigger" },
    ],
  },
];

export function getAllShowbiz(): ShowbizStory[] {
  return [...STORIES].sort((a, b) => b.date.localeCompare(a.date));
}

// Stories on the same topic first, then the closest in date. `exclude` skips slugs already linked (the pager).
export function getRelatedShowbiz(story: ShowbizStory, count = 3, exclude: string[] = []): ShowbizStory[] {
  const t = Date.parse(story.date);
  return STORIES.filter((s) => s.slug !== story.slug && !exclude.includes(s.slug))
    .sort(
      (a, b) =>
        Number(b.topic === story.topic) - Number(a.topic === story.topic) ||
        Math.abs(Date.parse(a.date) - t) - Math.abs(Date.parse(b.date) - t),
    )
    .slice(0, count);
}

export function getShowbizBySlug(slug: string) {
  return STORIES.find((s) => s.slug === slug) ?? null;
}

export function showbizTopicLabel(slug: ShowbizTopic) {
  return SHOWBIZ_TOPICS.find((t) => t.slug === slug)?.label ?? slug;
}
