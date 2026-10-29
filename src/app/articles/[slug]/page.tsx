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
import { getAllArticles, getArticleBySlug, type ArticleSummary } from "@/data/articles";
import { formatDate } from "@/lib/format";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import FAQ from "@/app/components/FAQ";
import ArticleCard from "@/app/components/ui/ArticleCard";
import Badge from "@/app/components/ui/Badge";
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
      images: [{ url: article.image, width: 1200, height: 630, alt: article.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
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
      image: `${SITE_URL}${article.image}`,
      datePublished: article.date,
      author: { "@type": "Person", name: AUTHOR },
      publisher: { "@type": "Organization", name: SITE_NAME },
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
      <section className="px-2 pt-2 sm:px-4">
        <div className="relative isolate flex min-h-[min(70vh,40rem)] items-end overflow-hidden rounded-[2rem] bg-ocean-900 sm:rounded-[2.5rem]">
          <img
            src={article.image}
            alt={article.alt}
            fetchPriority="high"
            className="animate-hero-zoom absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/90 via-ocean-950/35 to-ocean-950/20"
          />
          <Container className="pb-10 pt-28 sm:pb-14">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
                <Crumb href="/">Home</Crumb>
                <Crumb href="/articles">Destinations</Crumb>
                <Crumb href={`/articles?category=${article.category}`} last>
                  {article.categoryLabel}
                </Crumb>
              </ol>
            </nav>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
              {article.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
              <Badge tone="mango">{article.categoryLabel}</Badge>
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
                {article.readingTime} min read
              </span>
              <span>By {AUTHOR}</span>
            </div>
          </Container>
        </div>
      </section>

      {/* Body */}
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-20">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <details className="group rounded-3xl bg-white p-5 shadow-card lg:hidden">
              <summary className="cursor-pointer list-none font-semibold text-ocean-900 [&::-webkit-details-marker]:hidden">
                On this page
                <span className="float-right text-lagoon-700 group-open:hidden">Show</span>
                <span className="float-right hidden text-lagoon-700 group-open:inline">Hide</span>
              </summary>
              <TocList toc={article.toc} />
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
            {article.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/articles?q=${encodeURIComponent(tag)}`}
                      className="rounded-full bg-sand-100 px-3 py-1.5 text-sm text-ocean-800 transition hover:bg-lagoon-100 hover:text-lagoon-700"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {article.faq.length > 0 && (
              <div className="mt-14">
                <FAQ faq={article.faq} />
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Prev / next */}
      {(newer || older) && (
        <Container className="pb-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {older ? <PagerCard article={older} direction="prev" /> : <div />}
            {newer && <PagerCard article={newer} direction="next" />}
          </div>
        </Container>
      )}

      {/* Related */}
      <section className="bg-sand-100 py-20">
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
      className={`group flex items-center gap-5 rounded-3xl bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover ${
        next ? "flex-row-reverse text-right" : ""
      }`}
    >
      <img src={article.image} alt="" loading="lazy" className="h-20 w-20 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24" />
      <div className="min-w-0">
        <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-coral-700 ${next ? "justify-end" : ""}`}>
          {next ? (
            <>
              Newer guide <FaArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
            </>
          ) : (
            <>
              <FaArrowLeft aria-hidden className="transition-transform group-hover:-translate-x-1" /> Older guide
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
