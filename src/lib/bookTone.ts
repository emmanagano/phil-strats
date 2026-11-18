import type { CoverTone } from "@/data/books";

// Typographic book covers: one flat palette color each, with a contrasting rule and type.
export const COVER_TONE: Record<CoverTone, { bg: string; text: string; muted: string; rule: string }> = {
  ocean: { bg: "bg-ocean-800", text: "text-white", muted: "text-white/70", rule: "bg-mango-400" },
  night: { bg: "bg-ocean-950", text: "text-white", muted: "text-white/65", rule: "bg-coral-500" },
  coral: { bg: "bg-coral-600", text: "text-white", muted: "text-white/80", rule: "bg-mango-300" },
  mango: { bg: "bg-mango-400", text: "text-ocean-950", muted: "text-ocean-900/75", rule: "bg-coral-600" },
  sand: { bg: "bg-sand-200", text: "text-ocean-950", muted: "text-ocean-900/70", rule: "bg-lagoon-600" },
  lagoon: { bg: "bg-lagoon-700", text: "text-white", muted: "text-white/75", rule: "bg-mango-300" },
};
