"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaSuitcaseRolling } from "react-icons/fa6";
import { NEWS_TOPICS, type NewsBrief, type NewsTopic } from "@/data/news";
import { NEWS_TONE, formatNewsDate, monthKey } from "@/lib/newsTone";

// Timeline of briefs grouped by month, newest first, with a topic filter.
export default function NewsList({ news }: { news: NewsBrief[] }) {
  const [topic, setTopic] = useState<NewsTopic | "all">("all");
  const shown = topic === "all" ? news : news.filter((n) => n.topic === topic);

  const months = useMemo(() => {
    const groups: { month: string; items: NewsBrief[] }[] = [];
    for (const n of shown) {
      const m = monthKey(n.date);
      const last = groups.at(-1);
      if (last?.month === m) last.items.push(n);
      else groups.push({ month: m, items: [n] });
    }
    return groups;
  }, [shown]);

  return (
    <>
      <div role="group" aria-label="Filter by topic" className="mb-12 flex flex-wrap gap-2">
        {[{ slug: "all" as const, label: "All news" }, ...NEWS_TOPICS].map((t) => {
          const on = topic === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setTopic(t.slug)}
              className={`min-h-11 rounded-control border px-4 text-sm font-semibold transition-colors duration-150 ${
                on ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-14">
        {months.map(({ month, items }) => (
          <section key={month} aria-labelledby={`m-${month.replace(/\s+/g, "-").toLowerCase()}`}>
            <h2
              id={`m-${month.replace(/\s+/g, "-").toLowerCase()}`}
              className="mb-2 border-b-2 border-ocean-900 pb-2 text-2xl font-semibold text-ocean-900 sm:text-3xl"
            >
              {month}
            </h2>
            <ol className="divide-y divide-sand-200">
              {items.map((n) => (
                <li key={n.slug}>
                  <article className="group relative grid gap-2 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8">
                    <div className="flex items-center gap-3 sm:block">
                      <time dateTime={n.date} className="font-display text-lg font-semibold text-ocean-900">
                        {formatNewsDate(n.date, "short")}
                      </time>
                      <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase tracking-widest sm:mt-2 ${NEWS_TONE[n.topic]}`}>
                        {NEWS_TOPICS.find((t) => t.slug === n.topic)?.label}
                      </span>
                    </div>
                    <div className="max-w-3xl">
                      <h3 className="text-xl font-semibold leading-snug text-ocean-900 transition-colors duration-150 group-hover:underline sm:text-2xl">
                        <Link
                          href={`/news/${n.slug}`}
                          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-ink"
                        >
                          {n.title}
                        </Link>
                      </h3>
                      <p className="mt-2 leading-relaxed text-ocean-800">{n.summary}</p>
                      {n.travelNote && (
                        <p className="mt-4 flex items-stretch overflow-hidden rounded-control text-sm">
                          <span className="flex shrink-0 items-center gap-1.5 bg-ocean-900 px-2.5 text-xs font-bold uppercase tracking-widest text-tip">
                            <FaSuitcaseRolling aria-hidden className="h-3.5 w-3.5" /> Trip tip
                          </span>
                          <span className="bg-tip-soft px-3 py-2 font-medium text-ocean-950">{n.travelNote}</span>
                        </p>
                      )}
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 underline decoration-sand-300 underline-offset-4">
                        Read the brief <FaArrowRight aria-hidden className="h-3 w-3" />
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {months.length === 0 && <p className="text-muted">No briefs in this topic yet.</p>}
      </div>
    </>
  );
}
