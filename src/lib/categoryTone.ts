// One solid brand color per experience category, used for tags and tile captions.
// Client-safe (no fs), so cards and the destination browser can share it.
// `dot` and `short` drive the small category marker on destination cards.
export const CATEGORY_TONE: Record<string, { tag: string; block: string; dot: string; short: string }> = {
  "beaches-islands": { tag: "bg-mango-400 text-ocean-950", block: "bg-mango-400 text-ocean-950", dot: "bg-lagoon-600", short: "Beaches" },
  "nature-adventure": { tag: "bg-white text-ocean-950", block: "bg-white text-ocean-950", dot: "bg-palm-600", short: "Nature" },
  "heritage-culture": { tag: "bg-coral-500 text-white", block: "bg-coral-500 text-white", dot: "bg-coral-600", short: "Heritage" },
};

export function categoryTone(slug: string) {
  return CATEGORY_TONE[slug] ?? CATEGORY_TONE["beaches-islands"];
}
