// Fixed vocabularies for article frontmatter. `category` and `islandGroup`
// must use one of these slugs; src/data/articles.ts rejects anything else.

export const CATEGORIES = [
  {
    slug: "beaches-islands",
    label: "Beaches & Islands",
    blurb: "White sand, lagoons, and island hopping.",
    image: "/images/el-nido-palawan.jpg",
  },
  {
    slug: "nature-adventure",
    label: "Nature & Adventure",
    blurb: "Caves, hills, and wild landscapes.",
    image: "/images/chocolate-hills-bohol.jpg",
  },
  {
    slug: "heritage-culture",
    label: "Heritage & Culture",
    blurb: "Colonial streets and centuries-old traditions.",
    image: "/images/vigan-and-laoag-ilocos.jpg",
  },
] as const;

export const ISLAND_GROUPS = [
  { slug: "luzon", label: "Luzon", image: "/images/banaue-rice-terraces-ifugao.jpg" },
  { slug: "visayas", label: "Visayas", image: "/images/boracay-aklan.jpg" },
  { slug: "mindanao", label: "Mindanao", image: "/images/siargao-surfing-capital.jpg" },
  { slug: "palawan", label: "Palawan", image: "/images/coron-palawan.jpg" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
export type IslandGroupSlug = (typeof ISLAND_GROUPS)[number]["slug"];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getIslandGroup(slug: string) {
  return ISLAND_GROUPS.find((g) => g.slug === slug);
}
