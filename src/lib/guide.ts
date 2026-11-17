// Shape of the optional `guide:` block in an article's frontmatter.
// Types only (plus tiny helpers), so client components can import this file.

export type MonthRating = "great" | "good" | "mixed" | "avoid";

export interface GuideMonth {
  rating: MonthRating;
  note: string;
}

export interface GuideRoute {
  from: string;
  steps: string[];
  time: string;
  cost: string;
  tip?: string;
}

export interface GuideExperience {
  name: string;
  tags: string[];
  blurb: string;
  cost: string;
  time: string;
  tip?: string;
}

export interface GuideDay {
  title: string;
  items: string[];
}

export interface GuideStay {
  area: string;
  vibe: string;
  bestFor: string;
  price: string;
}

export interface GuideEat {
  name: string;
  order: string;
  price: string;
}

export interface GuideFare {
  mode: string;
  cost: string;
  note?: string;
}

export interface GuideFee {
  name: string;
  amount: string;
}

// Per-day spend in PHP for one traveler, by travel style.
export interface BudgetStyle {
  stay: number;
  food: number;
  transport: number;
  activities: number;
}

export interface Guide {
  // Short place name used in section headings; defaults to the start of the title.
  place?: string;
  verified: string;
  verdict: string;
  bestFor: string[];
  quickFacts: { label: string; value: string }[];
  months: GuideMonth[];
  routes: GuideRoute[];
  budget: { usdRate: number; styles: Record<"backpacker" | "midrange" | "comfort", BudgetStyle> };
  experiences: GuideExperience[];
  itineraries: Record<string, GuideDay[]>;
  stays: GuideStay[];
  eats: GuideEat[];
  getAround: GuideFare[];
  fees: GuideFee[];
  essentials: { title: string; body: string }[];
  packing: string[];
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const RATING_LABEL: Record<MonthRating, string> = {
  great: "Best",
  good: "Good",
  mixed: "Mixed",
  avoid: "Wettest",
};

export const STYLE_LABEL = { backpacker: "Backpacker", midrange: "Mid-range", comfort: "Comfort" } as const;
export type BudgetStyleKey = keyof typeof STYLE_LABEL;

export function peso(n: number) {
  return `₱${Math.round(n).toLocaleString("en-US")}`;
}

// "Mar–May, Sep–Oct" from the months rated "great" (wraps Dec → Jan).
export function bestMonthsLabel(months: GuideMonth[]): string {
  const great = months.map((m) => m.rating === "great");
  if (!great.some(Boolean)) return "";
  if (great.every(Boolean)) return "Year-round";
  // Start scanning just after a non-great month so wrapped runs stay together.
  const start = great.findIndex((g) => !g);
  const ranges: string[] = [];
  let runStart = -1;
  for (let k = 1; k <= 12; k++) {
    const i = (start + k) % 12;
    if (great[i] && runStart < 0) runStart = i;
    const next = (i + 1) % 12;
    if (great[i] && (!great[next] || k === 12)) {
      ranges.push(runStart === i ? MONTHS[i] : `${MONTHS[runStart]}–${MONTHS[i]}`);
      runStart = -1;
    }
  }
  return ranges.slice(0, 2).join(", ");
}
