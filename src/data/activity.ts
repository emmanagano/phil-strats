// Builds the /activity feed from the content data at build time. Server-only: guides come from
// getAllArticles(), which reads the markdown files with fs. Nothing here needs updating by hand,
// except that new books should set `added` (see src/data/books.ts).
import { getAllArticles } from "./articles";
import { getAllNews } from "./news";
import { getAllShowbiz } from "./showbiz";
import { getAllSports } from "./sports";
import { BOOKS_LAUNCHED, getAllBooks } from "./books";
import { ACTIVITY_SECTIONS, type ActivityDay, type ActivityItem } from "@/lib/activity";

const SHOWN_PER_GROUP = 3;
const WINDOW_DAYS = 45;

export function getActivity(): ActivityItem[] {
  const items: ActivityItem[] = [];
  for (const a of getAllArticles()) {
    items.push({ date: a.date, section: "destinations", kind: "new", title: a.cardTitle, href: `/articles/${a.slug}` });
    if (a.updated && a.updated !== a.date) {
      items.push({ date: a.updated, section: "destinations", kind: "updated", title: a.cardTitle, href: `/articles/${a.slug}` });
    }
  }
  for (const n of getAllNews()) items.push({ date: n.date, section: "news", kind: "new", title: n.title, href: `/news/${n.slug}` });
  for (const s of getAllShowbiz()) items.push({ date: s.date, section: "showbiz", kind: "new", title: s.title, href: `/showbiz/${s.slug}` });
  for (const s of getAllSports()) items.push({ date: s.date, section: "sports", kind: "new", title: s.title, href: `/sports/${s.slug}` });
  for (const b of getAllBooks()) {
    items.push({ date: b.added ?? BOOKS_LAUNCHED, section: "books", kind: "new", title: b.title, href: `/books/${b.slug}` });
  }
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

// Recent activity grouped by day, then by section (in nav order) with new items before updates.
export function getActivityDays(): ActivityDay[] {
  const items = getActivity();
  if (!items.length) return [];
  const cutoff = new Date(`${items[0].date}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - WINDOW_DAYS);
  const since = cutoff.toISOString().slice(0, 10);

  const byDay = new Map<string, ActivityItem[]>();
  for (const it of items) {
    if (it.date < since) continue;
    byDay.set(it.date, [...(byDay.get(it.date) ?? []), it]);
  }

  return [...byDay.entries()].map(([date, dayItems]) => ({
    date,
    groups: ACTIVITY_SECTIONS.flatMap(({ slug }) =>
      (["new", "updated"] as const)
        .map((kind) => {
          const all = dayItems.filter((i) => i.section === slug && i.kind === kind);
          return { section: slug, kind, items: all.slice(0, SHOWN_PER_GROUP), more: Math.max(0, all.length - SHOWN_PER_GROUP) };
        })
        .filter((g) => g.items.length > 0),
    ),
  }));
}
