import Link from "next/link";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getAllArticles } from "@/data/articles";
import { getLatestBlurb } from "@/data/blurbs";
import { CATEGORIES, ISLAND_GROUPS } from "@/data/taxonomy";
import { SITE_NAME } from "@/lib/site";
import ArticleCard from "./components/ui/ArticleCard";
import Badge from "./components/ui/Badge";
import Button from "./components/ui/Button";
import Container from "./components/ui/Container";
import NewsletterForm from "./components/ui/NewsletterForm";
import SectionHeading from "./components/ui/SectionHeading";

export default function Home() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;
  const latest = rest.slice(0, 6);
  const blurb = getLatestBlurb();
  const countBy = (key: "category" | "islandGroup", slug: string) =>
    articles.filter((a) => a[key] === slug).length;

  return (
    <>
      {/* Hero */}
      {featured && (
        <section className="px-2 pt-2 sm:px-4">
          <div className="relative isolate flex min-h-[min(80vh,48rem)] items-end overflow-hidden rounded-[2rem] bg-ocean-900 sm:rounded-[2.5rem]">
            <img
              src={featured.image}
              alt={featured.alt}
              fetchPriority="high"
              className="animate-hero-zoom absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/90 via-ocean-950/40 to-ocean-950/10"
            />
            <Container className="pb-12 pt-32 sm:pb-16">
              <div className="max-w-3xl">
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge tone="mango">Latest guide</Badge>
                  <Badge tone="glass">{featured.categoryLabel}</Badge>
                </div>
                <h1 className="text-4xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                  {featured.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg text-white/85 sm:text-xl">
                  {featured.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={`/articles/${featured.slug}`} variant="light" arrow>
                    Read the guide
                  </Button>
                  <Link
                    href="/articles"
                    className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/10"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </div>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 rounded-2xl border border-white/25 bg-white/10 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl backdrop-saturate-150">
                {[
                  [articles.length, "Travel guides"],
                  [ISLAND_GROUPS.length, "Island groups"],
                  [CATEGORIES.length, "Experiences"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-widest text-white/70">{label}</dt>
                    <dd className="mt-1 font-display text-3xl font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        </section>
      )}

      {/* Experiences */}
      <Container as="section" className="reveal py-20 sm:py-28">
        <SectionHeading
          eyebrow="Find your kind of trip"
          title="Explore by experience"
          description="Island hopping, wild landscapes, or centuries-old streets — start with what you love."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/articles?category=${category.slug}`}
              className="group relative isolate flex aspect-[4/5] items-end overflow-hidden rounded-3xl p-3 shadow-card transition-shadow hover:shadow-card-hover md:aspect-[3/4]"
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/85 via-ocean-950/20 to-transparent"
              />
              <div className="w-full rounded-2xl border border-transparent p-4 text-white transition duration-300 group-hover:border-white/25 group-hover:bg-white/10 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] group-hover:backdrop-blur-xl group-hover:backdrop-saturate-150 group-focus-visible:border-white/25 group-focus-visible:bg-white/10 group-focus-visible:backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-mango-400">
                  {countBy("category", category.slug)} guides
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  <span className="box-decoration-clone bg-gradient-to-r from-mango-400/50 to-mango-400/50 bg-[length:0%_38%] bg-[position:0_90%] bg-no-repeat px-1 -mx-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_38%] group-focus-visible:bg-[length:100%_38%] motion-reduce:transition-none">
                    {category.label}
                  </span>
                </h3>
                <p className="mt-2 text-white/80">{category.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <FaArrowRight
                    aria-hidden
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Latest guides */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-lagoon-100 via-lagoon-50 to-mango-100 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-lagoon-300/60 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-coral-400/25 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-mango-400/35 blur-3xl" />
        </div>
        <Container className="reveal">
          <SectionHeading
            eyebrow="Fresh from the road"
            title="Latest travel guides"
            action={
              <Button href="/articles" variant="secondary" arrow>
                View all guides
              </Button>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      {/* Regions */}
      <Container as="section" className="reveal py-20 sm:py-28">
        <SectionHeading
          eyebrow="7,641 islands, four ways in"
          title="Browse by region"
          align="center"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ISLAND_GROUPS.map((group) => (
            <Link
              key={group.slug}
              href={`/articles?region=${group.slug}`}
              className="group relative isolate flex aspect-square items-end overflow-hidden rounded-3xl p-5 sm:p-6"
            >
              <img
                src={group.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ocean-950/80 to-transparent transition-colors group-hover:from-lagoon-700/90"
              />
              <div className="text-white">
                <h3 className="text-2xl font-semibold sm:text-3xl">{group.label}</h3>
                <p className="text-sm text-white/80">
                  {countBy("islandGroup", group.slug)} guides
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* About + latest blurb */}
      <Container as="section" className="reveal pb-20 sm:pb-28">
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl bg-lagoon-700 p-8 text-white sm:p-12 lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango-400">
              About {SITE_NAME}
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Travel the Philippines like a local.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-lagoon-50/90">
              From hidden beaches and mountain escapes to heritage towns and street food, every
              guide comes with practical tips, honest takes, and a ready-made itinerary.
            </p>
            <Button href="/contact" variant="light" arrow className="mt-8">
              Say hello
            </Button>
          </div>
          {blurb && (
            <a
              href={blurb.article_link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-3xl bg-mango-100 p-8 transition hover:bg-mango-400 sm:p-10 lg:col-span-2"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">
                  Worth reading · {blurb.source}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ocean-900">
                  {blurb.article_title}
                </h3>
                <p className="mt-3 text-ocean-800">{blurb.commentary}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ocean-900">
                Read on {blurb.source}
                <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3" />
              </span>
            </a>
          )}
        </div>
      </Container>

      {/* Newsletter */}
      <section className="px-2 pb-2 sm:px-4">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ocean-900 px-4 py-16 text-center sm:rounded-[2.5rem] sm:px-6 sm:py-24">
          <div
            aria-hidden
            className="absolute left-[8%] top-[-4rem] -z-10 h-80 w-80 rounded-full bg-lagoon-500/60 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute bottom-[-5rem] right-[10%] -z-10 h-80 w-80 rounded-full bg-coral-500/50 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute right-[28%] top-[8%] -z-10 h-56 w-56 rounded-full bg-mango-400/40 blur-3xl"
          />
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/25 bg-white/10 px-6 py-12 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl backdrop-saturate-150 sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mango-400">
              The weekly postcard
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-5xl">
              New islands in your inbox, every week.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Fresh guides, seasonal picks, and hidden gems. No spam — unsubscribe anytime.
            </p>
            <NewsletterForm id="home-newsletter" tone="dark" className="mx-auto mt-8 max-w-lg" />
          </div>
        </div>
      </section>
    </>
  );
}
