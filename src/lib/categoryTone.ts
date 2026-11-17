// One solid brand color per experience category, used for tags and tile captions.
// Client-safe (no fs), so cards and the destination browser can share it.
export const CATEGORY_TONE: Record<string, { tag: string; block: string }> = {
  "beaches-islands": { tag: "bg-mango-400 text-ocean-950", block: "bg-mango-400 text-ocean-950" },
  "nature-adventure": { tag: "bg-white text-ocean-950", block: "bg-white text-ocean-950" },
  "heritage-culture": { tag: "bg-coral-500 text-white", block: "bg-coral-500 text-white" },
};

export function categoryTone(slug: string) {
  return CATEGORY_TONE[slug] ?? CATEGORY_TONE["beaches-islands"];
}
