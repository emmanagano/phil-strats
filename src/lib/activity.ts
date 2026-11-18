// Client-safe shapes and labels for the /activity feed (the data is built in src/data/activity.ts).

export const ACTIVITY_SECTIONS = [
  { slug: "destinations", label: "Destinations", plural: "guides", href: "/articles" },
  { slug: "news", label: "News", plural: "news briefs", href: "/news" },
  { slug: "showbiz", label: "Showbiz", plural: "showbiz stories", href: "/showbiz" },
  { slug: "sports", label: "Sports", plural: "sports stories", href: "/sports" },
  { slug: "books", label: "Books", plural: "books", href: "/books" },
] as const;

export type ActivitySection = (typeof ACTIVITY_SECTIONS)[number]["slug"];

export interface ActivityItem {
  date: string; // YYYY-MM-DD
  section: ActivitySection;
  kind: "new" | "updated";
  title: string;
  href: string;
}

// One day's items for one section and kind; long batches show a few items plus "+N more".
export interface ActivityGroup {
  section: ActivitySection;
  kind: "new" | "updated";
  items: ActivityItem[];
  more: number;
}

export interface ActivityDay {
  date: string;
  groups: ActivityGroup[];
}

export const sectionInfo = (slug: ActivitySection) => ACTIVITY_SECTIONS.find((s) => s.slug === slug)!;
