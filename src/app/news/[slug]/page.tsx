import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaSuitcaseRolling } from "react-icons/fa6";
import { getAllArticles } from "@/data/articles";
import { getAllNews, getNewsBySlug, getRelatedNews, topicLabel } from "@/data/news";
import Container from "@/app/components/ui/Container";
import { NEWS_TONE, formatNewsDate } from "@/lib/newsTone";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, pageTitle } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const brief = getNewsBySlug(slug);
  if (!brief) return { title: "Brief not found" };
  return {
    title: pageTitle(brief.title),
    description: brief.summary,
    alternates: { canonical: `/news/${brief.slug}` },
    openGraph: {
      type: "article",
      title: brief.title,
      description: brief.summary,
      url: `/news/${brief.slug}`,
      publishedTime: brief.date,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

export default async function NewsBriefPage({ params }: Params) {
  const { slug } = await params;
  const brief = getNewsBySlug(slug);
  if (!brief) notFound();

  const all = getAllNews();
  const i = all.findIndex((n) => n.slug === slug);
  const newer = all[i - 1] ?? null;
  const older = all[i + 1] ?? null;
  const related = getRelatedNews(brief, 3, [newer?.slug, older?.slug].filter((s): s is string => !!s));
  const articles = getAllArticles();
  const guides = (brief.guides ?? []).map((g) => {
    const article = articles.find((a) => a.slug === g);
    if (!article) throw new Error(`news/${brief.slug}: unknown guide "${g}" in guides`);
    return article;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: brief.title,
    description: brief.summary,
    datePublished: brief.date,
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    mainEntityOfPage: `${SITE_URL}/news/${brief.slug}`,
    citation: brief.sources.map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Container className="py-12 sm:py-16">
        <article className="mx-auto max-w-2xl">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold link">
            <FaArrowLeft aria-hidden className="h-3 w-3" /> All news
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${NEWS_TONE[brief.topic]}`}>
              {topicLabel(brief.topic)}
            </span>
            <time dateTime={brief.date} className="text-sm font-semibold text-muted">
              {formatNewsDate(brief.date)}
            </time>
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ocean-900 sm:text-5xl">{brief.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-ocean-800">{brief.summary}</p>

          <div className="mt-8 space-y-4 border-t border-sand-200 pt-8 text-lg leading-relaxed text-ocean-800">
            {brief.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {brief.travelNote && (
            <aside className="mt-10 grid overflow-hidden rounded-card bg-tip text-ocean-950 sm:grid-cols-[6rem_minmax(0,1fr)]">
              <div className="flex items-center gap-3 bg-ocean-900 px-5 py-3 text-tip sm:flex-col sm:justify-center sm:gap-2 sm:py-6">
                <FaSuitcaseRolling aria-hidden className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-xs font-bold uppercase tracking-widest text-white sm:text-center">For your trip</span>
              </div>
              <p className="p-5 font-display text-xl font-semibold leading-snug sm:p-7 sm:text-2xl">{brief.travelNote}</p>
            </aside>
          )}

          {guides.length > 0 && (
            <section aria-labelledby="plan-trip" className="mt-10">
              <h2 id="plan-trip" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
                Plan your trip
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {guides.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="flex items-center gap-4 rounded-card border border-sand-200 bg-white p-3 transition-colors duration-150 hover:border-ocean-900"
                    >
                      <img src={a.imageSmall} alt="" loading="lazy" className="photo-pop h-16 w-16 shrink-0 rounded-control object-cover" />
                      <span className="min-w-0">
                        <span className="block eyebrow">{a.place} guide</span>
                        <span className="mt-1 line-clamp-2 block font-semibold text-ocean-900">{a.title}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="sources" className="mt-10">
            <h2 id="sources" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Sources
            </h2>
            <ul className="mt-3 divide-y divide-sand-200 border-y border-sand-200">
              {brief.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-4 py-3 text-ocean-900 hover:underline"
                  >
                    {s.name}
                    <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3 shrink-0 text-muted" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-news" className="mt-12">
              <h2 id="related-news" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
                Related news
              </h2>
              <ul className="mt-3 divide-y divide-sand-200 border-y border-sand-200">
                {related.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/news/${n.slug}`} className="block py-3 hover:underline">
                      <span className="text-sm font-semibold text-muted">
                        {topicLabel(n.topic)} · {formatNewsDate(n.date, "short")}
                      </span>
                      <span className="mt-0.5 block font-semibold text-ocean-900">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Earlier and later news" className="mt-12 grid gap-px overflow-hidden rounded-card border border-sand-200 bg-sand-200 sm:grid-cols-2">
            {older ? <Pager brief={older} label="Earlier" /> : <div className="bg-white" />}
            {newer && <Pager brief={newer} label="Later" next />}
          </nav>
        </article>
      </Container>
    </>
  );
}

function Pager({ brief, label, next = false }: { brief: { slug: string; title: string; date: string }; label: string; next?: boolean }) {
  return (
    <Link href={`/news/${brief.slug}`} className={`block bg-white p-5 transition-colors duration-150 hover:bg-sand-50 ${next ? "sm:text-right" : ""}`}>
      <span className={`flex items-center gap-2 eyebrow ${next ? "sm:justify-end" : ""}`}>
        {!next && <FaArrowLeft aria-hidden className="h-3 w-3" />}
        {label} · {formatNewsDate(brief.date, "short")}
        {next && <FaArrowRight aria-hidden className="h-3 w-3" />}
      </span>
      <span className="mt-1 block font-semibold text-ocean-900">{brief.title}</span>
    </Link>
  );
}
