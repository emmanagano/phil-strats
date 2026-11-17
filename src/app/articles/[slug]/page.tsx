import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronRight,
  FaLocationDot,
  FaRegCalendar,
  FaRegClock,
} from "react-icons/fa6";
import { getAllArticles, getArticleBySlug, type ArticleSummary, type ImageCredit } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { AUTHOR, SITE_NAME, SITE_URL, SOCIALS } from "@/lib/site";
import FAQ from "@/app/components/FAQ";
import DestinationGuide from "@/app/components/guide/DestinationGuide";
import { categoryTone } from "@/lib/categoryTone";
import ArticleCard from "@/app/components/ui/ArticleCard";
import Container from "@/app/components/ui/Container";
import SectionHeading from "@/app/components/ui/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Guide not found" };

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: AUTHOR }],
    keywords: article.tags,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [AUTHOR],
      section: article.categoryLabel,
      tags: article.tags,
      images: [{ url: article.imageOg, width: 1200, height: 630, alt: article.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.imageOg],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const all = getAllArticles();
  const index = all.findIndex((a) => a.slug === slug);
  const newer = all[index - 1] ?? null;
  const older = all[index + 1] ?? null;
  const others = all.filter((a) => a.slug !== slug);
  // Same category first, then same region, so there are always three suggestions.
  const related = [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category && a.islandGroup === article.islandGroup),
    ...others,
  ]
    .filter((a, i, list) => list.findIndex((b) => b.slug === a.slug) === i)
    .slice(0, 3);

  const url = `${SITE_URL}/articles/${article.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: [article.imageOg, article.image].map((i) => `${SITE_URL}${i}`),
      datePublished: article.date,
      dateModified: article.updated,
      author: { "@type": "Person", name: AUTHOR, url: SOCIALS.instagram },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
      },
      articleSection: article.categoryLabel,
      keywords: article.tags.join(", "),
      wordCount: article.wordCount,
      inLanguage: "en",
      about: { "@type": "TouristDestination", name: article.region },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", item: SITE_URL },
        { name: "Destinations", item: `${SITE_URL}/articles` },
        { name: article.categoryLabel, item: `${SITE_URL}/articles?category=${article.category}` },
        { name: article.title, item: url },
      ].map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })),
    },
    ...(article.faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="-mt-18">
        <div className="relative isolate flex min-h-[calc(min(70vh,40rem)+4.5rem)] items-end overflow-hidden bg-ocean-900">
          <img
            src={article.image}
            alt={article.alt}
            width={1600}
            height={1200}
            fetchPriority="high"
            className="photo-pop absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <Container className="pt-28">
            {/* Solid caption panel: the photo stays full color, the text stays readable. */}
            <div className="max-w-3xl bg-ocean-900 p-6 sm:p-10">
            <nav aria-label="Breadcrumb" className="mb-5">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                <Crumb href="/">Home</Crumb>
                <Crumb href="/articles">Destinations</Crumb>
                <Crumb href={`/articles?category=${article.category}`} last>
                  {article.categoryLabel}
                </Crumb>
              </ol>
            </nav>
            <h1 className="text-3xl font-semibold leading-[1.08] text-white sm:text-5xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/85">
              <span className={`px-2.5 py-1 text-xs font-semibold tracking-wide ${categoryTone(article.category).tag}`}>
                {article.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaLocationDot aria-hidden className="text-coral-400" />
                {article.region}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaRegCalendar aria-hidden className="text-lagoon-300" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <FaRegClock aria-hidden className="text-lagoon-300" />
                {article.guide ? `Checked ${article.guide.verified}` : `${article.readingTime} min read`}
              </span>
              {article.updated !== article.date && (
                <span>
                  Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                </span>
              )}
              <span>By {AUTHOR}</span>
            </div>
            </div>
          </Container>
          {article.imageCredit && <PhotoCredit credit={article.imageCredit} />}
        </div>
      </section>

      {/* Interactive one-stop guide */}
      {article.guide && (
        <Container className="pb-14 sm:pb-20">
          <DestinationGuide guide={article.guide} slug={article.slug} place={article.guide.place ?? placeName(article.title)} />
          <div className="mx-auto mt-20 max-w-3xl sm:mt-28">
            {article.content.trim() && (
              <section aria-labelledby="story-title" className="border-t-2 border-ocean-900 pt-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">Why we love it</p>
                <h2 id="story-title" className="mt-2 text-3xl font-semibold text-ocean-900 sm:text-4xl">
                  The story behind the guide
                </h2>
                <article
                  className="prose prose-lg prose-brand mt-6 max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </section>
            )}
            {article.faq.length > 0 && (
              <div className="mt-16">
                <FAQ faq={article.faq} />
              </div>
            )}
            <TagList tags={article.tags} />
          </div>
        </Container>
      )}

      {/* Classic article body (guides without a guide block) */}
      {!article.guide && (
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="group rounded-card border border-sand-200 bg-white lg:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-semibold text-ocean-900 [&::-webkit-details-marker]:hidden">
                On this page
                <span className="text-sm text-lagoon-700 group-open:hidden">Show</span>
                <span className="hidden text-sm text-lagoon-700 group-open:inline">Hide</span>
              </summary>
              <div className="px-5 pb-4">
                <TocList toc={article.toc} />
              </div>
            </details>
            <nav aria-label="On this page" className="hidden lg:block">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-coral-700">
                On this page
              </p>
              <TocList toc={article.toc} />
            </nav>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <p className="font-display text-xl leading-relaxed text-ocean-800 sm:text-2xl">
              {article.description}
            </p>
            <article
              className="prose prose-lg prose-brand mt-8 max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            <TagList tags={article.tags} />
            <nav aria-label="Plan your trip" className="mt-12 border-l-4 border-coral-500 py-1 pl-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">Plan your trip</p>
              <ul className="mt-3 space-y-2 text-ocean-900">
                <li>
                  <Link className="underline decoration-lagoon-300 underline-offset-4 hover:text-lagoon-700" href={`/articles?region=${article.islandGroup}`}>
                    More {article.islandGroupLabel} travel guides
                  </Link>
                </li>
                <li>
                  <Link className="underline decoration-lagoon-300 underline-offset-4 hover:text-lagoon-700" href={`/articles?category=${article.category}`}>
                    More {article.categoryLabel.toLowerCase()} guides
                  </Link>
                </li>
              </ul>
            </nav>
            {article.faq.length > 0 && (
              <div className="mt-14">
                <FAQ faq={article.faq} />
              </div>
            )}
          </div>
        </div>
      </Container>
      )}

      {/* Prev / next */}
      {(newer || older) && (
        <Container className="pb-16">
          <div className="grid border-y border-sand-200 sm:grid-cols-2 sm:divide-x sm:divide-sand-200">
            {older ? <PagerCard article={older} direction="prev" /> : <div className="hidden sm:block" />}
            {newer && <PagerCard article={newer} direction="next" />}
          </div>
        </Container>
      )}

      {/* Related */}
      <section className="bg-sand-100 py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Keep exploring" title="You might also like" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function PhotoCredit({ credit }: { credit: ImageCredit }) {
  return (
    <p className="absolute bottom-0 right-0 bg-ocean-950/75 px-2.5 py-1 text-[0.7rem] text-white/80">
      Photo:{" "}
      <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
        {credit.author}
      </a>
      ,{" "}
      {credit.licenseUrl ? (
        <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
          {credit.license}
        </a>
      ) : (
        credit.license
      )}
    </p>
  );
}

// "Siargao Travel Guide: Surfing Capital…" -> "Siargao"
function placeName(title: string) {
  return title.split(/:| Travel Guide| Guide/)[0].trim();
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/articles?q=${encodeURIComponent(tag)}`}
            className="inline-block rounded-full border border-sand-300 px-3 py-1.5 text-sm text-ocean-800 transition hover:border-lagoon-600 hover:text-lagoon-700"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Crumb({ href, children, last = false }: { href: string; children: React.ReactNode; last?: boolean }) {
  return (
    <li className="inline-flex items-center gap-2">
      <Link href={href} className="transition hover:text-white hover:underline">
        {children}
      </Link>
      {!last && <FaChevronRight aria-hidden className="h-2.5 w-2.5 text-white/50" />}
    </li>
  );
}

function TocList({ toc }: { toc: { id: string; text: string }[] }) {
  return (
    <ol className="mt-4 space-y-1 border-l-2 border-sand-200 lg:mt-0">
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted transition hover:border-coral-500 hover:text-ocean-900"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

function PagerCard({ article, direction }: { article: ArticleSummary; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group flex items-center gap-5 py-5 transition-colors hover:bg-sand-100 sm:px-5 ${
        next ? "flex-row-reverse border-t border-sand-200 text-right sm:border-t-0" : ""
      }`}
    >
      <img src={article.imageSmall} alt="" width={96} height={96} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-card object-cover sm:h-24 sm:w-24" />
      <div className="min-w-0">
        <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coral-700 ${next ? "justify-end" : ""}`}>
          {next ? (
            <>
              Newer guide <FaArrowRight aria-hidden />
            </>
          ) : (
            <>
              <FaArrowLeft aria-hidden /> Older guide
            </>
          )}
        </p>
        <p className="mt-1 line-clamp-2 font-display text-lg font-semibold text-ocean-900 group-hover:text-lagoon-700">
          {article.title}
        </p>
      </div>
    </Link>
  );
}
