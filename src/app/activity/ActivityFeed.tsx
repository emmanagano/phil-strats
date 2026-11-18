"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ACTIVITY_SECTIONS, sectionInfo, type ActivityDay, type ActivitySection } from "@/lib/activity";
import { formatNewsDate } from "@/lib/newsTone";

type Filter = ActivitySection | "all";
const isSection = (v: string | null): v is ActivitySection => ACTIVITY_SECTIONS.some((s) => s.slug === v);

// Reads ?section= and renders the filtered feed. Must sit inside <Suspense> (useSearchParams).
export default function ActivityFeed({ days }: { days: ActivityDay[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("section");
  const section: Filter = isSection(raw) ? raw : "all";
  const pick = (next: Filter) =>
    router.replace(next === "all" ? pathname : `${pathname}?section=${next}`, { scroll: false });
  return <Feed days={days} section={section} onPick={pick} />;
}

// Static version (Suspense fallback): every section, chips link to the filtered URLs.
export function Feed({ days, section = "all", onPick }: { days: ActivityDay[]; section?: Filter; onPick?: (f: Filter) => void }) {
  const visible = days
    .map((d) => ({ ...d, groups: d.groups.filter((g) => section === "all" || g.section === section) }))
    .filter((d) => d.groups.length > 0);
  const chips: { slug: Filter; label: string }[] = [{ slug: "all", label: "All" }, ...ACTIVITY_SECTIONS];

  return (
    <>
      <div role="group" aria-label="Filter by section" className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const on = section === c.slug;
          const cls = `inline-flex min-h-11 items-center rounded-control border px-4 text-sm font-semibold transition-colors duration-150 ${
            on ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
          }`;
          return onPick ? (
            <button key={c.slug} type="button" aria-pressed={on} onClick={() => onPick(c.slug)} className={cls}>
              {c.label}
            </button>
          ) : (
            <Link key={c.slug} href={c.slug === "all" ? "/activity" : `/activity?section=${c.slug}`} aria-current={on ? "true" : undefined} className={cls}>
              {c.label}
            </Link>
          );
        })}
      </div>

      <ol className="mt-10 space-y-10">
        {visible.map((day) => (
          <li key={day.date}>
            <h2 className="border-b-2 border-ocean-900 pb-2 font-sans text-sm font-semibold text-ocean-900">
              <time dateTime={day.date}>{formatNewsDate(day.date)}</time>
            </h2>
            <ul className="divide-y divide-sand-200">
              {day.groups.map((g) => {
                const info = sectionInfo(g.section);
                return [
                  ...g.items.map((it) => (
                    <li key={`${it.href}-${it.kind}`} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="w-32 shrink-0 text-xs font-bold uppercase tracking-widest text-muted">{info.label}</span>
                      <span className="min-w-0 flex-1">
                        <Link href={it.href} className="link font-medium">
                          {it.title}
                        </Link>
                        {it.kind === "updated" && (
                          <span className="ml-2 rounded-full border border-sand-300 px-2 py-0.5 text-sm text-muted">Updated</span>
                        )}
                      </span>
                    </li>
                  )),
                  g.more > 0 && (
                    <li key={`${g.section}-${g.kind}-more`} className="py-3 sm:pl-38">
                      <Link href={info.href} className="text-sm font-semibold link">
                        +{g.more} more {g.kind === "updated" ? `${info.plural} updated` : info.plural}
                      </Link>
                    </li>
                  ),
                ];
              })}
            </ul>
          </li>
        ))}
      </ol>
      {visible.length === 0 && <p className="mt-10 text-muted">Nothing new in this section lately.</p>}
    </>
  );
}
