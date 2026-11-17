import type { NewsTopic } from "@/data/news";

// Solid color per news topic, matching the site's flat color-block style.
export const NEWS_TONE: Record<NewsTopic, string> = {
  travel: "bg-mango-400 text-ocean-950",
  weather: "bg-coral-500 text-white",
  economy: "bg-ocean-700 text-white",
  politics: "bg-ocean-900 text-white",
  culture: "bg-sand-200 text-ocean-900",
};

export function formatNewsDate(date: string, style: "long" | "short" = "long") {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: style === "long" ? "long" : "short",
    day: "numeric",
    ...(style === "long" ? { year: "numeric" } : {}),
  });
}

export function monthKey(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
