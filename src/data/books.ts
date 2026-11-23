// "Books": well-known books by Filipino and Filipino-heritage authors. Client-safe (no fs).
// Rules: original summaries only (no copied blurbs, no spoilers past the setup), every "why it
// matters" claim backed by `sources`, and `setIn` slugs must match a destination guide
// (the build fails otherwise). `coverImage` is a small cover thumbnail from Open Library, used to
// identify the book and credited on its page; without one, BookCover draws a typographic cover.

import { MORE_BOOKS } from "./books-more";

export const BOOK_ERAS = [
  { slug: "classic", label: "Classics", blurb: "Spanish and American-era books every Filipino knows." },
  { slug: "modern", label: "Modern Philippines", blurb: "Landmark novels and bestsellers written at home." },
  { slug: "diaspora", label: "Diaspora", blurb: "Filipino and Filipino-heritage writers abroad." },
] as const;

export type BookEra = (typeof BOOK_ERAS)[number]["slug"];

// Flat cover colors from the jeepney palette (see src/lib/bookTone.ts).
export type CoverTone = "ocean" | "coral" | "mango" | "sand" | "night" | "lagoon";

export interface BookImage {
  src: string;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
}

export interface Book {
  slug: string;
  title: string;
  // Title in the original language when the book is best known in translation.
  originalTitle?: string;
  author: string;
  // One line about the author for the book page.
  authorNote: string;
  year: number;
  language: string;
  genre: string;
  era: BookEra;
  // One or two sentences: card text and meta description (120–160 characters is ideal).
  summary: string;
  // Two short paragraphs, original wording, no spoilers past the setup.
  body: string[];
  // Why it's famous, with every claim covered by `sources`.
  why: string;
  awards?: string[];
  // Destination guides (article slugs) where the book is set or that it illuminates.
  setIn?: string[];
  // Shown on guides under "Read before you go", e.g. "Set partly in Spanish-era Manila".
  settingNote?: string;
  cover: CoverTone;
  image?: BookImage;
  // Open Library work ID (e.g. "OL1622748W"): credit link for the cover and an extra source.
  openLibrary?: string;
  // Cover thumbnail in public/images/books/<slug>.jpg, checked by eye before adding.
  coverImage?: string;
  // Day the book joined the shelf (YYYY-MM-DD), shown on /activity. Defaults to BOOKS_LAUNCHED.
  added?: string;
  // Optional search title and meta description for books with real search demand (e.g. student
  // queries). Defaults: "<title> by <author>" and `summary`. Keep the title to 60 characters.
  seoTitle?: string;
  seoDescription?: string;
  // Optional reading-guide sections shown under the body, each with an H2 (sourced, no spoilers
  // past the setup).
  notes?: { heading: string; body: string[] }[];
  sources: { name: string; url: string }[];
}

// The shelf launched with its first 76 books on this day; newer books set `added`.
export const BOOKS_LAUNCHED = "2026-11-18";

const BASE_BOOKS: Book[] = [
  {
    slug: "noli-me-tangere",
    openLibrary: "OL1622789W",
    title: "Noli Me Tángere",
    originalTitle: "Noli Me Tángere",
    author: "José Rizal",
    authorNote:
      "Physician, writer and reformer, executed by Spanish authorities in 1896 and honored as the Philippines' national hero.",
    year: 1887,
    language: "Spanish",
    genre: "Novel",
    era: "classic",
    summary:
      "Rizal's first novel follows a young Filipino returning from Europe to a town ruled by friars and officials. Every Filipino student reads it.",
    body: [
      "Crisóstomo Ibarra comes home from his studies in Europe hoping to build a school in his town. He finds his father dead in disgrace and a community bent around the power of the friars and the colonial government.",
      "Written in Spanish and first printed in Berlin, the novel mixes romance, satire and tragedy in a portrait of 19th-century Filipino society, with characters whose names still work as shorthand in the Philippines today.",
    ],
    why:
      "Its exposure of colonial abuse made Rizal a marked man and helped inspire the Philippine Revolution. Since 1956, Republic Act 1425 (the Rizal Law) has required schools and universities to teach it.",
    setIn: ["intramuros-manila"],
    settingNote: "Set in a lakeside town and in Spanish-era Manila.",
    cover: "coral",
    sources: [
      { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/topic/Noli-Me-Tangere" },
      { name: "Official Gazette: Republic Act No. 1425", url: "https://www.officialgazette.gov.ph/1956/06/12/republic-act-no-1425/" },
    ],
  },
  {
    slug: "el-filibusterismo",
    openLibrary: "OL1622748W",
    coverImage: "/images/books/el-filibusterismo.jpg",
    title: "El Filibusterismo",
    author: "José Rizal",
    authorNote:
      "Physician, writer and reformer, executed by Spanish authorities in 1896 and honored as the Philippines' national hero.",
    year: 1891,
    language: "Spanish",
    genre: "Novel",
    era: "classic",
    summary:
      "The darker sequel to Noli Me Tángere: a wealthy jeweler moves through Manila society with a plan of his own. Required reading alongside the first novel.",
    body: [
      "Thirteen years after the events of Noli Me Tángere, a mysterious jeweler called Simoun has the ear of the colonial government. Students campaign for a Spanish-language academy, officials scheme, and Simoun pursues an agenda no one around him suspects.",
      "Rizal dedicated the book to the three priests executed in 1872, and its tone is angrier and more political than the first novel's. It was printed in Ghent, Belgium, with money Rizal and his friends could barely spare.",
    ],
    why:
      "Read as Rizal's sharpest attack on colonial rule, it is taught in every Philippine school under the Rizal Law of 1956, together with Noli Me Tángere.",
    setIn: ["intramuros-manila"],
    settingNote: "Set mostly in Manila in the late 1800s.",
    cover: "night",
    sources: [
      { name: "Encyclopaedia Britannica", url: "https://www.britannica.com/topic/El-filibusterismo" },
      { name: "Official Gazette: Republic Act No. 1425", url: "https://www.officialgazette.gov.ph/1956/06/12/republic-act-no-1425/" },
    ],
  },
  {
    slug: "florante-at-laura",
    openLibrary: "OL15794139W",
    coverImage: "/images/books/florante-at-laura.jpg",
    title: "Florante at Laura",
    author: "Francisco Balagtas",
    authorNote:
      "Tagalog poet of the early 1800s from Bulacan, so central to Filipino poetry that the art of debate in verse, balagtasan, is named after him.",
    year: 1838,
    language: "Filipino",
    genre: "Epic poem (awit)",
    era: "classic",
    summary:
      "A Tagalog verse romance set in a mythical Albania, full of love, betrayal and hidden criticism of Spanish rule. Filipino high schoolers still study it.",
    body: [
      "Florante, a nobleman of Albania, is found tied to a tree in a dark forest, mourning his country and his beloved Laura. A Muslim warrior from Persia rescues him, and Florante's story of court intrigue and betrayal unfolds in four-line rhyming stanzas.",
      "Balagtas wrote in the awit form, with twelve-syllable lines, and set the story far from the Philippines, a choice many readers see as a way to criticize tyranny without naming Spain. It is traditionally dated to 1838, though the oldest edition known today was printed in 1853.",
    ],
    why:
      "It is considered a masterpiece of Tagalog poetry and remains a standard text in Philippine high schools, and Balagtas's influence lives on in the balagtasan verse-debate tradition.",
    cover: "mango",
    sources: [
      { name: "Encyclopaedia Britannica: Francisco Balagtas", url: "https://www.britannica.com/biography/Francisco-Balagtas" },
      { name: "Wikipedia: Florante at Laura", url: "https://en.wikipedia.org/wiki/Florante_at_Laura" },
      { name: "DepEd LRMDS: Grade 8 module", url: "https://lrmds.deped.gov.ph/detail/6997" },
    ],
  },
  {
    slug: "banaag-at-sikat",
    openLibrary: "OL5305523W",
    coverImage: "/images/books/banaag-at-sikat.jpg",
    title: "Banaag at Sikat",
    author: "Lope K. Santos",
    authorNote: "Tagalog novelist, poet and labor journalist who first serialized the novel in his workers' weekly.",
    year: 1906,
    language: "Filipino",
    genre: "Novel",
    era: "classic",
    summary:
      "Two young men argue over how to fix an unequal society in American-era Manila. Called the first socialist novel in the Philippines.",
    body: [
      "Delfin, a socialist, and his friend Felipe, an anarchist, debate how to change a society divided between rich landlords and the workers and tenants who serve them. Their arguments run alongside love stories that cross those same class lines.",
      "Santos wrote it in Tagalog and serialized it in his labor weekly before it was completed in 1906. The title means \"From Early Dawn to Full Light\".",
    ],
    why:
      "It is credited as the Philippines' first socialist novel and the fountainhead of social realism in the Tagalog novel, with an influence that reached later labor and peasant movements.",
    cover: "sand",
    sources: [{ name: "Wikipedia: Banaag at Sikat", url: "https://en.wikipedia.org/wiki/Banaag_at_Sikat" }],
  },
  {
    slug: "how-my-brother-leon-brought-home-a-wife",
    openLibrary: "OL2330137W",
    coverImage: "/images/books/how-my-brother-leon-brought-home-a-wife.jpg",
    title: "How My Brother Leon Brought Home a Wife",
    author: "Manuel Arguilla",
    authorNote: "Ilocano writer from La Union (1911–1944), executed by Japanese forces during World War II.",
    year: 1940,
    language: "English",
    genre: "Short stories",
    era: "classic",
    summary:
      "Gentle stories of rural Ilocano life. The title story, about a city bride's first night in a farming village, is a staple of Philippine classrooms.",
    body: [
      "In the title story, young Baldo drives a cart through the fields of Nagrebcan with his brother Leon and Leon's new wife, Maria, a city woman about to meet their father for the first time. Little happens, and every detail of the evening matters.",
      "The other stories in the collection stay close to the farms, families and landscapes of La Union in the years before the war.",
    ],
    why:
      "The collection won first prize for the short story in the first Commonwealth Literary Contest in 1940, and the title story remains one of the most anthologized pieces of Filipino writing in English.",
    awards: ["Commonwealth Literary Contest, first prize for the short story (1940)"],
    setIn: ["la-union-san-juan"],
    settingNote: "Set in a farming village in La Union.",
    cover: "lagoon",
    sources: [
      { name: "Wikipedia: Manuel Arguilla", url: "https://en.wikipedia.org/wiki/Manuel_Arguilla" },
      { name: "Inquirer: the house in the literary classic", url: "https://newsinfo.inquirer.net/902364/house-in-literary-classic-defies-time/amp" },
    ],
  },
  {
    slug: "have-come-am-here",
    openLibrary: "OL518758W",
    title: "Have Come, Am Here",
    author: "José Garcia Villa",
    authorNote: "Manila-born poet (1908–1997) who lived in New York from 1930; National Artist for Literature, 1973.",
    year: 1942,
    language: "English",
    genre: "Poetry",
    era: "diaspora",
    summary:
      "The New York debut of the poet who signed himself Doveglion: spare, strange poems that introduced his invented \"reversed consonance\" rhyme.",
    body: [
      "Villa's poems are short, spiritual and deliberately odd, playing with sound, punctuation and the self. This collection, published by Viking in New York, introduced the rhyme scheme he called reversed consonance.",
      "His later work includes the famous comma poems, and his collected poems are now available as a Penguin Classic, Doveglion.",
    ],
    why:
      "The book won an award from the American Academy of Arts and Letters, Villa was among the first National Artists for Literature, and Penguin Classics published his collected poems in 2008.",
    cover: "night",
    sources: [
      { name: "Poets.org: José Garcia Villa", url: "https://poets.org/poet/jose-garcia-villa" },
      { name: "NCCA: José Garcia Villa", url: "https://ncca.gov.ph/?p=6747" },
      { name: "Inquirer USA: Penguin publishes Villa", url: "https://usa.inquirer.net/16254/jose-garcia-villa-honored-in-ny-as-penguin-publishes-his-poems" },
    ],
  },
  {
    slug: "america-is-in-the-heart",
    openLibrary: "OL1622940W",
    coverImage: "/images/books/america-is-in-the-heart.jpg",
    title: "America Is in the Heart",
    author: "Carlos Bulosan",
    authorNote: "Born in Pangasinan, he emigrated to the US in 1930 and worked the farms and canneries of the West Coast before becoming a writer.",
    year: 1946,
    language: "English",
    genre: "Memoir (semi-autobiographical)",
    era: "diaspora",
    summary:
      "A boy grows up poor in rural Pangasinan, then sails to America and faces racism and brutal work on the West Coast. A Filipino-American classic.",
    body: [
      "The book opens in the villages and fields of Pangasinan, where Carlos and his family struggle to hold on to their land. As a young man he leaves for the United States, expecting the America of his schoolbooks.",
      "What he finds is migrant labor, violence and exclusion, and a growing hope that writing and solidarity can claim the America he believed in.",
    ],
    why:
      "Published in 1946 to critical praise, it became a touchstone of the Filipino-American movement in the 1970s, is widely taught, and joined Penguin Classics in 2019.",
    setIn: ["hundred-islands-pangasinan"],
    settingNote: "Opens in rural Pangasinan.",
    cover: "ocean",
    sources: [
      { name: "Penguin Random House", url: "https://penguinrandomhouse.com/books/600643/america-is-in-the-heart-by-carlos-bulosan-foreword-by-elaine-castillo-introduction-by-e-san-juan-jr-selected-by-jeffrey-arellano-cabusao/" },
      { name: "Encyclopedia.com: Carlos Bulosan", url: "https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/carlos-bulosan" },
      { name: "Wikipedia: America Is in the Heart", url: "https://en.wikipedia.org/wiki/America_Is_in_the_Heart" },
    ],
  },
  {
    slug: "without-seeing-the-dawn",
    openLibrary: "OL7699106W",
    coverImage: "/images/books/without-seeing-the-dawn.jpg",
    title: "Without Seeing the Dawn",
    author: "Stevan Javellana",
    authorNote: "Writer from Panay whose war novel was published in Boston in 1947.",
    year: 1947,
    language: "English",
    genre: "Novel",
    era: "classic",
    summary:
      "A farming village on Panay before and during World War II. Widely called the first Filipino novel in English after the war.",
    body: [
      "The first half follows village life on Panay: courtship, harvests and the hardships of tenant farmers. The second half brings the Japanese occupation and the choices it forces on ordinary people.",
      "Its frank portrayal of wartime suffering, including the experience of women, has drawn renewed attention in recent years.",
    ],
    why:
      "Published by Little, Brown in 1947, it is widely called the first post-war Filipino novel in English and was adapted by director Lino Brocka as the film Santiago!",
    setIn: ["iloilo-guimaras"],
    settingNote: "Set on Panay before and during World War II.",
    cover: "sand",
    sources: [
      { name: "Wikipedia: Without Seeing the Dawn", url: "https://en.wikipedia.org/wiki/Without_Seeing_the_Dawn" },
      { name: "Vera Files", url: "https://verafiles.org/articles/plight-of-comfort-women-revisited-in-a-1947-filipino-novel" },
    ],
  },
  {
    slug: "the-woman-who-had-two-navels",
    openLibrary: "OL345149W",
    coverImage: "/images/books/the-woman-who-had-two-navels.jpg",
    title: "The Woman Who Had Two Navels",
    author: "Nick Joaquin",
    authorNote: "Manila-born writer of fiction, plays and journalism (1917–2004); National Artist for Literature, 1976.",
    year: 1961,
    language: "English",
    genre: "Novel",
    era: "modern",
    summary:
      "A troubled young Manila wife claims she has two navels, and the claim pulls a circle of exiles and old families into the past. Joaquin's signature novel.",
    body: [
      "Connie Escobar insists she was born with two navels, and her search for someone to believe her leads to a Filipino doctor and a family of exiles in Hong Kong. Around her, Joaquin builds a portrait of a country caught between its Spanish past and an Americanized present.",
      "Its lush, gothic style made Joaquin's name, and his stories of old Manila are among the most loved in Philippine literature.",
    ],
    why:
      "It won the Stonehill Award for the Filipino novel in English, and in 2017 it gave its name to Joaquin's Penguin Classics collection, which made him the third Filipino in that series after Rizal and Villa.",
    setIn: ["intramuros-manila"],
    settingNote: "Set among old Manila families and their exiles.",
    cover: "coral",
    sources: [
      { name: "ABS-CBN: Penguin Classics honors Nick Joaquin", url: "https://abs-cbn.com/life/04/28/17/penguin-classics-honors-nick-joaquin-with-new-collection" },
      { name: "NPR review", url: "https://www.npr.org/2017/04/19/523586256/a-potent-uneasy-blend-of-passion-and-fatalism-in-the-woman-who-had-two-navels" },
    ],
  },
  {
    slug: "the-pretenders",
    openLibrary: "OL110977W",
    title: "The Pretenders",
    author: "F. Sionil José",
    authorNote: "Novelist from Rosales, Pangasinan (1924–2022); National Artist for Literature (2001) and Ramon Magsaysay awardee (1980).",
    year: 1962,
    language: "English",
    genre: "Novel",
    era: "modern",
    summary:
      "A scholar with peasant roots marries into a rich Manila family and loses himself. The best-known book of the five-novel Rosales Saga.",
    body: [
      "Antonio Samson grew up poor in Pangasinan, earned a doctorate abroad and married the daughter of a powerful Manila family. Now he has to decide what he owes the people he came from.",
      "The Rosales Saga follows families from the town of Rosales across about a hundred years of Philippine history, and The Pretenders is where most readers start.",
    ],
    why:
      "The saga made F. Sionil José the Filipino writer most often named as a Nobel candidate, and earned him the Ramon Magsaysay Award and the title of National Artist.",
    setIn: ["hundred-islands-pangasinan"],
    settingNote: "Part of a saga rooted in Rosales, Pangasinan.",
    cover: "ocean",
    sources: [
      { name: "Wikipedia: F. Sionil José", url: "https://en.wikipedia.org/wiki/F._Sionil_Jos%C3%A9" },
      { name: "ABS-CBN: F. Sionil José dies at 97", url: "https://news.abs-cbn.com/life/01/06/22/f-sionil-jose-dies-at-97" },
      { name: "Ramon Magsaysay Award Foundation", url: "https://rmaward.asia/tribute-for-francisco-sionil-jose/" },
    ],
  },
  {
    slug: "sa-mga-kuko-ng-liwanag",
    openLibrary: "OL949669W",
    title: "Sa mga Kuko ng Liwanag",
    author: "Edgardo M. Reyes",
    authorNote: "Tagalog novelist and screenwriter whose fiction first ran in the weekly magazine Liwayway.",
    year: 1966,
    language: "Filipino",
    genre: "Novel",
    era: "modern",
    summary:
      "A young fisherman comes to Manila to find the woman he loves and is swallowed by the city. The basis of Lino Brocka's classic film Maynila.",
    body: [
      "Julio leaves his fishing village for Manila to search for Ligaya, who left with a promise of work. He takes jobs on construction sites and in the backstreets, and the city shows him its hardest face.",
      "First serialized in Liwayway in 1966 and 1967, the novel became one of the defining portraits of urban poverty in Philippine fiction. The title means \"In the Claws of Brightness\".",
    ],
    why:
      "Lino Brocka adapted it as Maynila: Sa mga Kuko ng Liwanag, one of the most celebrated Filipino films, and the novel remains a standard in Filipino literature classes.",
    setIn: ["intramuros-manila"],
    settingNote: "Set in the backstreets of Manila.",
    cover: "night",
    sources: [{ name: "Wikipedia: In the Claws of Brightness", url: "https://www.Wikipedia.org/wiki/In_the_Claws_of_Brightness" }],
  },
  {
    slug: "mga-ibong-mandaragit",
    openLibrary: "OL1783933W",
    title: "Mga Ibong Mandaragit",
    author: "Amado V. Hernandez",
    authorNote: "Poet, novelist and labor leader (1903–1970), jailed in the 1950s and named National Artist for Literature in 1973.",
    year: 1969,
    language: "Filipino",
    genre: "Novel",
    era: "modern",
    summary:
      "A former guerrilla fights for justice in a country run by the powerful, during and after the Japanese occupation. Partly written in prison.",
    body: [
      "Mando Plaridel survives the war as a guerrilla and returns to a postwar society where landlords, officials and foreign interests still hold the power. He sets out to change it by other means.",
      "Hernandez wrote parts of the novel while imprisoned in the early 1950s. Penguin has published an English translation, The Birds of Prey.",
    ],
    why:
      "It is one of the landmark socio-political novels in Filipino, by one of the first National Artists for Literature, and a fixture of Filipino literature courses.",
    cover: "coral",
    sources: [
      { name: "Wikipedia: Mga Ibong Mandaragit", url: "https://en.wikipedia.com/wiki/Mga_Ibong_Mandaragit" },
      { name: "Wikipedia: Amado V. Hernandez", url: "https://en.wikipedia.org/wiki/Amado_V._Hernandez" },
      { name: "Penguin SEA: Amado V. Hernandez", url: "https://www.penguin.sg/book_author/amado-v-hernandez/" },
    ],
  },
  {
    slug: "dekada-70",
    openLibrary: "OL2330253W",
    coverImage: "/images/books/dekada-70.jpg",
    title: "Dekada '70",
    author: "Lualhati Bautista",
    authorNote: "Novelist and activist (1945–2023) and a three-time Palanca grand-prize winner for the novel.",
    year: 1983,
    language: "Filipino",
    genre: "Novel",
    era: "modern",
    summary:
      "A middle-class Manila mother watches martial law reach into her family, one son at a time. A Filipino classic and a hit 2002 film.",
    body: [
      "Amanda Bartolome is a wife and mother of five sons in the 1970s. As Ferdinand Marcos's martial law tightens, each son's choices pull the family into the politics of the decade, and Amanda begins to question her own place in it.",
      "Bautista tells the story from inside the household, which is why so many Filipino readers recognize their own families in it.",
    ],
    why:
      "It won the Palanca grand prize, and Chito S. Roño's 2002 film, starring Vilma Santos, won Best Picture at the Metro Manila Film Festival. It remains one of the most widely read Filipino novels about martial law.",
    awards: ["Palanca Award, grand prize for the novel (1983)"],
    cover: "mango",
    sources: [
      { name: "Philstar: Lualhati Bautista dies at 77", url: "https://www.philstar.com/headlines/2023/02/12/2244433/writer-activist-lualhati-bautista-dies-77" },
      { name: "Wikipedia: Dekada '70 (film)", url: "https://en.wikipedia.org/wiki/Dekada_%2770_(film)" },
      { name: "Rappler: Penguin offer for Dekada '70", url: "https://www.rappler.com/life-and-style/literature/lualhati-bautista-gets-offer-penguin-publish-dekada-70/" },
    ],
  },
  {
    slug: "dogeaters",
    openLibrary: "OL7972127W",
    coverImage: "/images/books/dogeaters.jpg",
    title: "Dogeaters",
    author: "Jessica Hagedorn",
    authorNote: "Manila-born novelist, poet and performer based in the United States.",
    year: 1990,
    language: "English",
    genre: "Novel",
    era: "diaspora",
    summary:
      "A chorus of voices, from movie-mad schoolgirls to generals' wives, in a Manila of radio dramas, nightclubs and political power. A landmark Filipino-American novel.",
    body: [
      "Rio Gonzaga, a girl from a wealthy family, is one of many narrators in a Manila where gossip columns, Hollywood films and soap operas mix with the menace of a dictatorship.",
      "Hagedorn's collage of voices and styles captures a city and a political era through its pop culture.",
    ],
    why:
      "It was a 1990 National Book Award finalist, won the American Book Award, and was reissued by Penguin in 2024.",
    awards: ["National Book Award finalist, fiction (1990)", "American Book Award"],
    setIn: ["intramuros-manila"],
    settingNote: "Set in Manila.",
    cover: "coral",
    sources: [
      { name: "Poetry Foundation: Jessica Hagedorn", url: "https://poetryfoundation.org/poets/jessica-hagedorn" },
      { name: "Readings: 2024 Penguin edition", url: "https://readings.com.au/product/9780143138167/dogeaters--jessica-hagedorn--2024--9780143138167" },
    ],
  },
  {
    slug: "abnkkbsnplako",
    openLibrary: "OL25434254W",
    coverImage: "/images/books/abnkkbsnplako.jpg",
    title: "ABNKKBSNPLAko?!",
    author: "Bob Ong",
    authorNote: "Pseudonymous writer of humor and fiction whose real identity has never been confirmed; one of the bestselling authors in the Philippines.",
    year: 2001,
    language: "Filipino",
    genre: "Humorous memoir",
    era: "modern",
    summary:
      "A funny, nostalgic look back at Filipino school days, from grade school to college. The book that made Bob Ong a publishing phenomenon.",
    body: [
      "Written in conversational Filipino and English, it walks through the teachers, classmates, uniforms and exams that every Filipino student remembers, with plenty of jokes at the narrator's own expense.",
      "The title is a play on \"Aba Nakakabasa Pala Ako?!\" (\"Hey, I can read after all?!\"). It started a string of Bob Ong bestsellers.",
    ],
    why:
      "Its first print run of 500 copies sold out quickly, and it has sold roughly 240,000 copies, its publisher's bestselling title. Viva Films adapted it in 2014.",
    cover: "mango",
    sources: [
      { name: "Wikipedia: ABNKKBSNPLAko?!", url: "https://en.wikipedia.org/wiki/ABNKKBSNPLAko%3F!" },
      { name: "Streetprint Manila", url: "https://manila.streetprint.org/items/15813" },
    ],
  },
  {
    slug: "para-kay-b",
    openLibrary: "OL1033754W",
    title: "Para kay B",
    author: "Ricky Lee",
    authorNote: "Screenwriter and novelist (born 1948), named National Artist for Film and Broadcast Arts in 2022.",
    year: 2008,
    language: "Filipino",
    genre: "Novel",
    era: "modern",
    summary:
      "Five love stories, linked by a writer who believes love devastates four out of five of us. A rare Filipino literary bestseller.",
    body: [
      "A writer sets out to write five love stories to test his theory that only one in five people ends up happy in love. The stories, and the writer's own life, start to bleed into each other.",
      "The full title is Para kay B (o kung paano dinevastate ng pag-ibig ang 4 out of 5 sa atin). A sequel, Lahat ng B, came out in 2022, and Ateneo University Press published an English edition, For B.",
    ],
    why:
      "It sold about 30,000 copies in two years, a huge number in a market where literary novels often struggle to sell 1,000 copies a year.",
    cover: "lagoon",
    sources: [
      { name: "Philstar: building an audience for books", url: "https://philstar.com/entertainment/2012/01/27/771382/building-audience-books-movies" },
      { name: "GMA News: Ricky Lee on Para kay B", url: "https://www.gmanetwork.com/news/lifestyle/artandculture/865623/ricky-lee-on-para-kay-b-its-sequel-lahat-ng-b-and-keeping-his-promise-of-writing-personal-dedicat/story" },
      { name: "NCCA: National Artist Ricky Lee", url: "https://ncca.gov.ph/?p=26371" },
    ],
  },
  {
    slug: "ilustrado",
    openLibrary: "OL15348317W",
    coverImage: "/images/books/ilustrado.jpg",
    title: "Ilustrado",
    author: "Miguel Syjuco",
    authorNote: "Manila-born novelist whose debut won the Man Asian Literary Prize while still in manuscript.",
    year: 2010,
    language: "English",
    genre: "Novel",
    era: "diaspora",
    summary:
      "When a famous Filipino writer is found dead in New York, his young protégé goes home to Manila to piece together his life.",
    body: [
      "The body of Crispin Salvador, a celebrated and controversial Filipino novelist, is pulled from the Hudson River, and the manuscript he was working on is missing. A young writer named Miguel sets out to write his biography.",
      "The novel mixes Salvador's writings, interviews, blog posts and jokes into a satirical portrait of Filipino politics, family and the expatriate experience.",
    ],
    why:
      "It won the 2008 Man Asian Literary Prize as a manuscript, along with the Palanca grand prize, and was named a New York Times Notable Book of 2010.",
    awards: ["Man Asian Literary Prize (2008)", "Palanca Award, grand prize (2008)", "New York Times Notable Book (2010)"],
    setIn: ["intramuros-manila"],
    settingNote: "Set in New York and Manila.",
    cover: "night",
    sources: [
      { name: "Wikipedia: Miguel Syjuco", url: "https://en.wikipedia.org/wiki/Miguel_Syjuco" },
      { name: "Sunday Times (Sri Lanka)", url: "https://www.sundaytimes.lk/170101/plus/the-writer-no-one-took-notice-of-until-he-won-the-man-asia-literary-prize-222128.html" },
    ],
  },
  {
    slug: "shes-dating-the-gangster",
    title: "She's Dating the Gangster",
    author: "Bianca Bernardino",
    authorNote: "Began posting the story on Wattpad in 2006, years before it became a bestselling book and film.",
    year: 2013,
    language: "Filipino",
    genre: "Romance",
    era: "modern",
    summary:
      "A high-school girl agrees to a fake relationship with the school's resident bad boy. The Wattpad story that became a bestseller and a box-office hit.",
    body: [
      "Written in a mix of Filipino and English, the story follows a pretend romance that gets complicated, told in the quick, chatty voice that made Wattpad stories a hit with Filipino teens.",
      "It began as an online serial in 2006 and came out in print in 2013.",
    ],
    why:
      "The print edition topped National Book Store's Philippine bestseller list and sold over 50,000 copies, and the 2014 Star Cinema film starring Kathryn Bernardo and Daniel Padilla was a major box-office success.",
    cover: "coral",
    sources: [
      { name: "Vera Files: Book power perks up the movies", url: "https://verafiles.org/articles/book-power-perks-up-the-movies" },
      { name: "Rappler", url: "https://www.rappler.com/entertainment/49246-kathniel-shes-dating-the-gangster" },
    ],
  },
  {
    slug: "isle-of-the-lost",
    openLibrary: "OL17125669W",
    title: "Isle of the Lost",
    author: "Melissa de la Cruz",
    authorNote: "Manila-born Filipina American author of bestselling young-adult series, including Blue Bloods and Disney's Descendants novels.",
    year: 2015,
    language: "English",
    genre: "Young adult fantasy",
    era: "diaspora",
    summary:
      "The teenage children of Disney's most famous villains grow up on an island prison. The prequel novel to Disney's Descendants.",
    body: [
      "Mal, Evie, Jay and Carlos are the children of Maleficent, the Evil Queen, Jafar and Cruella de Vil, stuck on an island cut off from the kingdom of Auradon. A quest gives them a chance to prove themselves, to their parents or to each other.",
      "It launched a series of Descendants novels alongside Disney's films.",
    ],
    why:
      "It spent more than 50 weeks on the New York Times bestseller list, 15 of them at No. 1, with over a million copies in print.",
    cover: "lagoon",
    sources: [
      { name: "Penguin Random House", url: "https://www.penguinrandomhouse.com/books/728965/isle-of-the-lost-the-a-descendants-novel-vol-1-by-melissa-de-la-cruz/9781484712955" },
      { name: "Publishers Weekly", url: "https://www.publishersweekly.com/pw/by-topic/childens/childrens-book-news/article/87786-cover-reveal-do-a-esmeralda-who-ate-everything-by-melissa-de-la-cruz.html" },
    ],
  },
  {
    slug: "in-the-country",
    openLibrary: "OL20003054W",
    coverImage: "/images/books/in-the-country.jpg",
    title: "In the Country",
    author: "Mia Alvar",
    authorNote: "Filipino American writer whose debut story collection won the PEN/Bingham Prize.",
    year: 2015,
    language: "English",
    genre: "Short stories",
    era: "diaspora",
    summary:
      "Stories of Filipinos at home and abroad: nurses, workers, families and exiles, from Manila to the Middle East to New York.",
    body: [
      "Each story follows Filipinos making their way in the world, whether overseas workers far from home, families in Manila, or people caught up in the country's politics.",
      "Together they map the Filipino diaspora with unusual depth and tenderness.",
    ],
    why:
      "It won the 2016 PEN/Robert W. Bingham Prize for debut fiction and was a finalist for the National Book Critics Circle's John Leonard Prize.",
    awards: ["PEN/Robert W. Bingham Prize for Debut Fiction (2016)"],
    cover: "sand",
    sources: [
      { name: "PEN America", url: "https://pen.org/2016-penrobert-w-bingham-prize/" },
      { name: "Penguin Random House", url: "https://www.penguinrandomhouse.com/books/237106/in-the-country-by-mia-alvar/" },
    ],
  },
  {
    slug: "hello-universe",
    openLibrary: "OL17851394W",
    coverImage: "/images/books/hello-universe.jpg",
    title: "Hello, Universe",
    author: "Erin Entrada Kelly",
    authorNote: "Filipino American children's author and two-time Newbery Medal winner.",
    year: 2017,
    language: "English",
    genre: "Children's novel",
    era: "diaspora",
    summary:
      "A shy Filipino American boy, a bully and a well bring four kids together over one summer day. Winner of the Newbery Medal.",
    body: [
      "Virgil Salinas is quiet in a family of loud talkers and confides mostly in his grandmother and his guinea pig. When a bully plays a cruel trick, three other kids, each with their own worries, are drawn into helping.",
      "The story weaves in Filipino folklore and the everyday details of a Filipino American family.",
    ],
    why:
      "It won the 2018 Newbery Medal, America's top prize for children's literature, and Netflix announced a film adaptation in 2019.",
    awards: ["Newbery Medal (2018)"],
    cover: "mango",
    sources: [
      { name: "Wikipedia: Hello, Universe", url: "https://en.wikipedia.org/wiki/Hello,_Universe" },
      { name: "Netflix", url: "https://about.netflix.com/en/news/netflix-to-produce-hello-universe-movie-based-on-newbery-award-winning-novel-from-erin-entrada-kelly" },
    ],
  },
  {
    slug: "insurrecto",
    openLibrary: "OL19762925W",
    coverImage: "/images/books/insurrecto.jpg",
    title: "Insurrecto",
    author: "Gina Apostol",
    authorNote: "Filipino novelist whose earlier book, Gun Dealers' Daughter, won the 2013 PEN/Open Book Award.",
    year: 2018,
    language: "English",
    genre: "Novel",
    era: "diaspora",
    summary:
      "An American filmmaker and a Filipino translator travel through Duterte-era Philippines, each writing a different film about the Balangiga massacre.",
    body: [
      "Magsalin, a Filipino translator, and Chiara, an American director, set out together across the Philippines. Both want to tell the story of the 1901 Balangiga uprising and its brutal American reprisal, but they disagree on how.",
      "The novel shuffles their two scripts into a puzzle about who gets to tell history.",
    ],
    why: "Publishers Weekly named it one of its 10 Best Books of 2018.",
    cover: "ocean",
    sources: [
      { name: "Wikipedia: Gina Apostol", url: "https://en.wikipedia.org/wiki/Gina_Apostol" },
      { name: "PEN America: 2013 PEN/Open Book Award", url: "https://pen.org/?p=37465" },
    ],
  },
  {
    slug: "america-is-not-the-heart",
    openLibrary: "OL19738160W",
    coverImage: "/images/books/america-is-not-the-heart.jpg",
    title: "America Is Not the Heart",
    author: "Elaine Castillo",
    authorNote: "Filipino American novelist from the San Francisco Bay Area.",
    year: 2018,
    language: "English",
    genre: "Novel",
    era: "diaspora",
    summary:
      "A woman with a hidden past moves in with her uncle's family in the Bay Area and slowly builds a new life. A celebrated Filipino-American debut.",
    body: [
      "Hero De Vera arrives in Milpitas, California, to live with her uncle's family after years she doesn't talk about. She looks after her young cousin and finds unexpected connection in the Filipino community around her.",
      "The title answers Carlos Bulosan's America Is in the Heart, and Castillo later wrote the foreword to its Penguin Classics edition.",
    ],
    why:
      "It was named a best book of 2018 by NPR and many others and was a finalist for several first-novel prizes, including the Center for Fiction First Novel Prize.",
    cover: "coral",
    sources: [
      { name: "Penguin Random House: Elaine Castillo", url: "https://penguinrandomhouse.com/authors/2144051/elaine-castillo" },
      { name: "Penguin Random House: America Is in the Heart (foreword)", url: "https://penguinrandomhouse.com/books/600643/america-is-in-the-heart-by-carlos-bulosan-foreword-by-elaine-castillo-introduction-by-e-san-juan-jr-selected-by-jeffrey-arellano-cabusao/" },
    ],
  },
  {
    slug: "patron-saints-of-nothing",
    openLibrary: "OL20082448W",
    coverImage: "/images/books/patron-saints-of-nothing.jpg",
    title: "Patron Saints of Nothing",
    author: "Randy Ribay",
    authorNote: "Filipino American author of young-adult novels.",
    year: 2019,
    language: "English",
    genre: "Young adult novel",
    era: "diaspora",
    summary:
      "A Filipino American teen travels to the Philippines to learn the truth about his cousin's death in the drug war.",
    body: [
      "Jay Reguero is finishing high school in Michigan when he learns that his cousin Jun, once his closest pen pal, has been killed in the Philippine government's war on drugs. No one in the family will talk about it, so Jay goes to find out for himself.",
      "The novel explores belonging, family silence and what it means to be from two countries at once.",
    ],
    why: "It was a 2019 National Book Award finalist for Young People's Literature and a finalist for the Los Angeles Times Book Prize.",
    awards: ["National Book Award finalist, Young People's Literature (2019)"],
    cover: "night",
    sources: [
      { name: "National Book Foundation", url: "https://www.nationalbook.org/?p=24808" },
      { name: "NPR / NHPR", url: "https://www.nhpr.org/2019-06-17/patron-saints-of-nothing-is-a-book-for-the-hyphenated" },
    ],
  },
  {
    slug: "arsenic-and-adobo",
    openLibrary: "OL24340224W",
    coverImage: "/images/books/arsenic-and-adobo.jpg",
    title: "Arsenic and Adobo",
    author: "Mia P. Manansala",
    authorNote: "Filipino American author of the Tita Rosie's Kitchen mysteries.",
    year: 2021,
    language: "English",
    genre: "Mystery",
    era: "diaspora",
    summary:
      "A young woman comes home to save her family's Filipino restaurant, and then a food critic drops dead at the table. A cozy mystery full of Filipino food.",
    body: [
      "Lila Macapagal returns to her small Illinois hometown to help her aunt's struggling restaurant. When an unpopular critic collapses after a meal, Lila becomes the prime suspect and has to find the killer herself, with a little help from her nosy aunties.",
      "It opens the Tita Rosie's Kitchen series, with Filipino dishes in every chapter.",
    ],
    why: "It won the Agatha Award for Best First Novel, plus the Anthony and Macavity awards for best first mystery.",
    awards: ["Agatha Award, Best First Novel (2021)", "Anthony Award, Best First Novel", "Macavity Award, Best First Mystery"],
    cover: "mango",
    sources: [
      { name: "Penguin Random House Global", url: "https://global.penguinrandomhouse.com/announcements/berkley-author-mia-p-manansala-wins-agatha-award-for-best-first-novel/" },
    ],
  },
  {
    slug: "some-people-need-killing",
    openLibrary: "OL35771902W",
    title: "Some People Need Killing",
    author: "Patricia Evangelista",
    authorNote: "Manila-based journalist who reported on the drug war for years; named a 2026 World Press Freedom Hero by the International Press Institute.",
    year: 2023,
    language: "English",
    genre: "Memoir and reportage",
    era: "modern",
    summary:
      "A Filipino journalist's account of years covering the killings of Rodrigo Duterte's drug war. One of the most acclaimed books of 2023.",
    body: [
      "Evangelista reported from crime scenes, wakes and police stations as thousands were killed in the government's war on drugs. The book follows victims, families, killers and her own struggle to keep bearing witness.",
      "It is a hard, essential read for anyone who wants to understand the Philippines of the late 2010s.",
    ],
    why:
      "The New York Times named it one of the 10 Best Books of 2023, it was longlisted for the Women's Prize for Non-Fiction, and it won the New York Public Library's 2024 Helen Bernstein Award for Excellence in Journalism.",
    awards: [
      "New York Times 10 Best Books of 2023",
      "Women's Prize for Non-Fiction, longlist",
      "Helen Bernstein Book Award for Excellence in Journalism (2024)",
    ],
    cover: "night",
    sources: [
      { name: "Rappler", url: "https://www.rappler.com/?p=2666698" },
      { name: "Library Journal", url: "https://libraryjournal.com/story/patricia-evangelista-wins-nypl-bernstein-award-for-excellence-in-journalism-book-pulse" },
      { name: "Women's Prize", url: "https://www.womensprize.com/?p=8681" },
    ],
  },
  {
    slug: "the-hurricane-wars",
    openLibrary: "OL34023561W",
    coverImage: "/images/books/the-hurricane-wars.jpg",
    title: "The Hurricane Wars",
    author: "Thea Guanzon",
    authorNote: "Fantasy author from Bacolod, Negros Occidental, whose debut became a New York Times bestseller.",
    year: 2023,
    language: "English",
    genre: "Romantic fantasy",
    era: "modern",
    summary:
      "Two enemies on opposite sides of a long war are forced into an uneasy alliance. A Southeast Asia-inspired fantasy by a Bacolod-based writer.",
    body: [
      "A young soldier who commands light and a prince who commands shadow have every reason to hate each other, until a common threat pushes them together.",
      "The world draws on Southeast Asian landscapes and history, and the book opens a trilogy.",
    ],
    why:
      "It reached No. 12 on the New York Times bestseller list in its first week and was a USA Today bestseller and a Barnes & Noble Best Book of 2023.",
    cover: "lagoon",
    sources: [
      { name: "Inquirer USA", url: "https://usa.inquirer.net/138446/this-filipina-authors-debut-novel-made-it-to-the-new-york-times-bestsellers-list" },
      { name: "ABS-CBN ANCX", url: "https://news2.abs-cbn.com/ancx/culture/books/10/17/23/filipinas-fantasy-book-is-new-york-times-bestseller" },
    ],
  },
];

const BOOKS: Book[] = [...BASE_BOOKS, ...MORE_BOOKS];

// Oldest first within the whole list, so the shelf reads as a timeline.
export function getAllBooks(): Book[] {
  return [...BOOKS].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

export function getBookBySlug(slug: string) {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

export function getBooksForGuide(slug: string): Book[] {
  return getAllBooks().filter((b) => b.setIn?.includes(slug));
}

// Same author first, then same era, closest in year.
export function getRelatedBooks(book: Book, count = 4): Book[] {
  return BOOKS.filter((b) => b.slug !== book.slug)
    .sort(
      (a, b) =>
        Number(b.author === book.author) - Number(a.author === book.author) ||
        Number(b.era === book.era) - Number(a.era === book.era) ||
        Math.abs(a.year - book.year) - Math.abs(b.year - book.year),
    )
    .slice(0, count);
}

// Broad types for the shelf filter, derived from each book's free-text `genre`.
export const BOOK_KINDS = [
  { slug: "fiction", label: "Novels & fiction" },
  { slug: "stories", label: "Short stories" },
  { slug: "poetry", label: "Poetry" },
  { slug: "nonfiction", label: "Nonfiction" },
  { slug: "young", label: "Young readers" },
] as const;

export type BookKind = (typeof BOOK_KINDS)[number]["slug"];

export function bookKind(genre: string): BookKind {
  const g = genre.toLowerCase();
  if (/young adult|children/.test(g)) return "young";
  if (/short stories/.test(g)) return "stories";
  if (/poe(m|try)/.test(g)) return "poetry";
  if (/memoir|essay|history|letters|reportage/.test(g)) return "nonfiction";
  return "fiction";
}

// "N. V. M. Gonzalez" -> "Gonzalez"; "Budjette Tan and Kajo Baldisimo" -> "Tan"; "Melissa de la Cruz" -> "de la Cruz".
export function authorSortKey(author: string): string {
  const first = author.split(/\s+and\s+/)[0].trim();
  const m = first.match(/\b((?:de la|de los|del|dela|de)\s+\S+)$/i);
  return (m ? m[1] : first.split(/\s+/).at(-1) ?? first).toLowerCase();
}

export function eraLabel(slug: BookEra) {
  return BOOK_ERAS.find((e) => e.slug === slug)?.label ?? slug;
}
