import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaArrowUpRightFromSquare, FaStar } from "react-icons/fa6";
import { getAllSports, getSportsBySlug, sportsTopicLabel, getRelatedSports } from "@/data/sports";
import Container from "@/app/components/ui/Container";
import { formatNewsDate } from "@/lib/newsTone";
import { SPORTS_TONE } from "@/lib/sportsTone";
import { SITE_NAME, SITE_URL, pageTitle } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSports().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const story = getSportsBySlug(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: pageTitle(story.title),
    description: story.dek,
    alternates: { canonical: `/sports/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.dek,
      url: `/sports/${story.slug}`,
      publishedTime: story.date,
      images: [story.image.src],
    },
  };
}

export default async function SportsStoryPage({ params }: Params) {
  const { slug } = await params;
  const story = getSportsBySlug(slug);
  if (!story) notFound();

  const all = getAllSports();
  const i = all.findIndex((s) => s.slug === slug);
  const newer = all[i - 1] ?? null;
  const older = all[i + 1] ?? null;
  const related = getRelatedSports(story, 3, [newer?.slug, older?.slug].filter((s): s is string => !!s));
  const img = story.image;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.dek,
    datePublished: story.date,
    image: [`${SITE_URL}${img.src}`],
    publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    mainEntityOfPage: `${SITE_URL}/sports/${story.slug}`,
    citation: story.sources.map((s) => s.url),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Container className="py-10 sm:py-14">
        <Link href="/sports" className="inline-flex items-center gap-2 text-sm font-semibold link">
          <FaArrowLeft aria-hidden className="h-3 w-3" /> All sports news
        </Link>

        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded-card bg-sand-200">
              <img src={img.src} alt={img.alt} className="photo-pop h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 text-sm text-muted">
              {img.caption} Photo:{" "}
              <a href={img.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-ocean-900">
                {img.author}
              </a>
              ,{" "}
              {img.licenseUrl ? (
                <a href={img.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-ocean-900">
                  {img.license}
                </a>
              ) : (
                img.license
              )}
            </figcaption>
          </figure>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${SPORTS_TONE[story.topic]}`}>
                {sportsTopicLabel(story.topic)}
              </span>
              <time dateTime={story.date} className="text-sm font-semibold text-muted">
                {formatNewsDate(story.date)}
              </time>
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-ocean-900 sm:text-5xl">{story.title}</h1>
            <p className="mt-5 text-xl leading-relaxed text-ocean-800">{story.dek}</p>
          </div>
        </header>

        <div className="mx-auto mt-12 max-w-2xl">
          <div className="space-y-4 text-lg leading-relaxed text-ocean-800">
            {story.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <aside className="mt-10 grid overflow-hidden rounded-card border border-sand-200 bg-sand-100 text-ocean-900 sm:grid-cols-[6rem_minmax(0,1fr)]">
            <div className="flex items-center gap-3 bg-ocean-900 px-5 py-3 text-white sm:flex-col sm:justify-center sm:gap-2 sm:py-6">
              <FaStar aria-hidden className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-xs font-bold uppercase tracking-widest text-white sm:text-center">Why it matters</span>
            </div>
            <p className="p-5 font-display text-xl font-semibold leading-snug sm:p-7 sm:text-2xl">{story.why}</p>
          </aside>

          <section aria-labelledby="sources" className="mt-10">
            <h2 id="sources" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
              Sources
            </h2>
            <ul className="mt-3 divide-y divide-sand-200 border-y border-sand-200">
              {story.sources.map((s) => (
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
            <section aria-labelledby="related-stories" className="mt-12">
              <h2 id="related-stories" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">
                More stories
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/sports/${r.slug}`} className="group block">
                      <img src={r.image.src} alt="" loading="lazy" className="photo-pop aspect-[4/3] w-full rounded-card object-cover" />
                      <span className="mt-2 line-clamp-2 block font-semibold text-ocean-900 group-hover:underline">{r.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Earlier and later stories" className="mt-12 grid gap-4 sm:grid-cols-2">
            {older ? <Pager story={older} label="Earlier" /> : <div />}
            {newer && <Pager story={newer} label="Later" next />}
          </nav>
        </div>
      </Container>
    </>
  );
}

function Pager({ story, label, next = false }: { story: { slug: string; title: string; image: { src: string } }; label: string; next?: boolean }) {
  return (
    <Link
      href={`/sports/${story.slug}`}
      className={`group flex items-center gap-4 rounded-card border border-sand-200 bg-white p-3 transition-colors duration-150 hover:border-ocean-900 ${next ? "flex-row-reverse text-right" : ""}`}
    >
      <img src={story.image.src} alt="" loading="lazy" className="photo-pop h-16 w-16 shrink-0 rounded-control object-cover" />
      <span className="min-w-0">
        <span className={`flex items-center gap-2 eyebrow ${next ? "justify-end" : ""}`}>
          {!next && <FaArrowLeft aria-hidden className="h-3 w-3" />}
          {label}
          {next && <FaArrowRight aria-hidden className="h-3 w-3" />}
        </span>
        <span className="mt-1 line-clamp-2 block font-semibold text-ocean-900">{story.title}</span>
      </span>
    </Link>
  );
}
