export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  slug: string;
  region: string;
  category: string;
  alt: string;
}

export const staticArticles: Article[] = [
  {
    id: 1,
    title: "Boracay, Aklan: 2025 Travel Guide",
    description: "Boracay Travel Guide 2025 — Discover white sand beaches, top resorts, and island activities in the Philippines’ most famous destination.",
    date: "2025-10-13",
    slug: "boracay-aklan",
    region: "Western Visayas",
    category: "Beaches",
    alt: "Sandcastle sculpture reading “I ❤️ Boracay” on White Beach, with people swimming and sailboats on turquoise water in the background — a classic scene from Boracay Island, Aklan."
  },
  {
    id: 2,
    title: "El Nido Palawan: Top Attractions, Island Hopping & Tips",
    description: "El Nido Travel Guide 2025 — Discover Palawan’s top lagoons, beaches, and island-hopping tours in the Philippines’ most scenic paradise. Find tips on when to visit, how to get there, and the best things to do in El Nido.",
    date: "2025-10-13",
    slug: "el-nido-palawan",
    region: "Palawan",
    category: "Beaches",
    alt: "Aerial view of El Nido’s Big Lagoon in Palawan, featuring turquoise waters, limestone cliffs, and a secluded white sand beach — a signature sight from the island-hopping tours."
  },
  {
    id: 3,
    title: "Coron Palawan Travel: Best Lakes, Wreck Dives & Island Adventures",
    description: "Coron Palawan Travel Guide 2025 — Discover Kayangan Lake, Twin Lagoon, and the best wreck diving spots in one of the Philippines’ most stunning island destinations.",
    date: "2025-10-14",
    slug: "coron-palawan",
    region: "Palawan",
    category: "Beaches",
    alt: "Aerial view of Coron Bay in Palawan, featuring limestone cliffs, turquoise reefs, and a traditional Filipino outrigger boat sailing through the clear blue water."
  },
  {
    id: 4,
    title: "Puerto Princesa Underground River: Nature’s Hidden Wonder of Palawan",
    description: "Puerto Princesa Underground River Travel Guide 2025 — Discover Palawan’s UNESCO World Heritage Site, one of the New 7 Wonders of Nature, featuring limestone caves and an 8.2 km subterranean river.",
    date: "2025-10-14",
    slug: "puerto-princesa-palawan",
    region: "Palawan",
    category: "Nature & Adventure",
    alt: "Tourists on a paddleboat entering the Puerto Princesa Underground River cave, surrounded by limestone cliffs and turquoise water in Palawan, Philippines."
  },
  {
    id: 5,
    title: "Intramuros Manila: Exploring the Walled City and the Heart of Philippine History",
    description: "Intramuros Manila Travel Guide — Explore the historic Walled City of Manila, home to Fort Santiago, San Agustin Church, and Spanish colonial architecture that shaped Philippine history.",
    date: "2025-10-14",
    slug: "intramuros-manila",
    region: "Metro Manila",
    category: "Historical & Cultural",
    alt: "View of Manila Cathedral inside Intramuros with its iconic dome and clock tower, surrounded by colonial architecture and historic charm."
  },
  {
    id: 6,
    title: "Chocolate Hills Bohol: Discover the Iconic Landscape of the Philippines",
    description: "Chocolate Hills Bohol Travel Guide 2025 — Discover over 1,200 iconic cone-shaped hills that turn brown during summer, one of the most famous natural landmarks in the Philippines.",
    date: "2025-10-14",
    slug: "chocolate-hills-bohol",
    region: "Bohol, Central Visayas",
    category: "Nature & Adventure",
    alt: "Panoramic view of the Chocolate Hills in Bohol, Philippines, showing lush green mounds and tropical forest under a bright blue sky."
  },
  {
    id: 7,
    title: "Surfing Capital of the Philippines, Siargao",
    description: "Siargao Travel Guide 2025 — Discover the Surfing Capital of the Philippines. From Cloud 9 waves to island-hopping, lagoons, and palm-lined roads, explore why Siargao is the country’s top island paradise.",
    date: "2025-10-14",
    slug: "siargao-surfing-capital",
    region: "Surigao del Norte, Mindanao",
    category: "Beaches & Adventure",
    alt: "A winding coastal road surrounded by palm trees and morning mist in Siargao Island, Philippines — a serene tropical landscape known for surfing and island-hopping."
  }
];
