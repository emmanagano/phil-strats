import type { Metadata } from "next";
import { getAllNews } from "@/data/news";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";
import { NEWS_TONE, formatNewsDate } from "@/lib/newsTone";
import NewsList from "./NewsList";

export const metadata: Metadata = {
  title: "Philippines News This Year",
  description:
    "Quick, sourced briefs on what happened in the Philippines this year: storms, volcano alerts, flights, prices and politics, with what it means for your trip.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const news = getAllNews();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: news.map((n, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/news/${n.slug}`,
      name: n.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
      />
      <PageHero
        tone="ocean"
        eyebrow="Philippines this year"
        title="What's happening in the Philippines"
        description="Short, sourced briefs on the year so far, newest first. Each one takes a minute to read and tells you what it means if you're traveling."
        stats={[
          { value: news.length, label: "Briefs" },
          { value: news.filter((n) => n.travelNote).length, label: "With trip tips" },
          { value: new Set(news.map((n) => n.date.slice(0, 7))).size, label: "Months covered" },
        ]}
        aside={
          <div className="rounded-card bg-white text-ocean-900">
            <p className="flex items-center justify-between border-b border-sand-200 px-5 py-3 eyebrow">
              Latest headlines <span className="text-muted">{news.length} this year</span>
            </p>
            <ol className="divide-y divide-sand-200">
              {news.slice(0, 4).map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-4 px-5 py-4 transition-colors duration-150 hover:bg-sand-50">
                    <span className={`self-start px-2 py-1 text-center text-xs font-bold uppercase tracking-widest ${NEWS_TONE[n.topic]}`}>
                      {formatNewsDate(n.date, "short")}
                    </span>
                    <span className="font-display text-lg font-semibold leading-snug">{n.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        }
      />
      <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
        <NewsList news={news} />
        <p className="mt-16 max-w-2xl border-t border-sand-200 pt-6 text-sm text-muted">
          Briefs summarize reporting from the outlets linked on each page. Figures that were still changing when
          reported are marked as early counts. Always check official advisories (PAGASA, PHIVOLCS, your embassy)
          before you travel.
        </p>
      </Container>
    </>
  );
}
