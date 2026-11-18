import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { getAllArticles } from "@/data/articles";
import { getAllNews, topicLabel } from "@/data/news";
import { getAllShowbiz, showbizTopicLabel } from "@/data/showbiz";
import { getAllSports, sportsTopicLabel } from "@/data/sports";
import { getAllBooks } from "@/data/books";
import { SHOWBIZ_TONE } from "@/lib/showbizTone";
import { SPORTS_TONE } from "@/lib/sportsTone";
import BookCover from "./components/ui/BookCover";
import StoryTile, { MiniHeadline } from "./components/ui/StoryTile";
import { CATEGORIES, ISLAND_GROUPS } from "@/data/taxonomy";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import ArticleCard from "./components/ui/ArticleCard";
import Badge from "./components/ui/Badge";
import { categoryTone } from "@/lib/categoryTone";
import Button from "./components/ui/Button";
import Container from "./components/ui/Container";
import NewsletterForm from "./components/ui/NewsletterForm";
import SectionHeading from "./components/ui/SectionHeading";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  // A page-level openGraph replaces the root one, so restate the shared fields.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function Home() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;
  const latest = rest.slice(0, 6);
  const news = getAllNews().slice(0, 5);
  const showbiz = getAllShowbiz().slice(0, 3);
  const sports = getAllSports().slice(0, 3);
  // Shelf preview: books with a real cover, ones set in places we cover first.
  const books = getAllBooks()
    .filter((b) => b.coverImage)
    .sort((a, b) => Number(Boolean(b.setIn?.length)) - Number(Boolean(a.setIn?.length)))
    .slice(0, 6);
  const countBy = (key: "category" | "islandGroup", slug: string) =>
    articles.filter((a) => a[key] === slug).length;

  return (
    <>
      {/* Hero */}
      {featured && (
        <section className="-mt-18">
          <h1 className="sr-only">{`${SITE_NAME}: Philippines travel guides. ${SITE_TAGLINE}`}</h1>
          <div className="relative isolate flex min-h-[calc(min(80vh,48rem)+4.5rem)] items-end overflow-hidden bg-ocean-900">
            <img
              src={featured.image}
              alt={featured.alt}
              fetchPriority="high"
              className="photo-pop absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <Container className="pt-32">
              {/* Solid caption panel: the photo stays full color, the text stays readable. */}
              <div className="max-w-2xl bg-ocean-900 p-6 text-white sm:p-10">
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge tone="light">Latest guide</Badge>
                  <span className={`px-2.5 py-1 text-sm font-semibold tracking-wide ${categoryTone(featured.category).tag}`}>
                    {featured.categoryLabel}
                  </span>
                </div>
                <h2 className="text-3xl font-semibold leading-[1.08] sm:text-5xl">{featured.title}</h2>
                <p className="mt-4 max-w-xl text-base text-white/85 sm:text-lg">{featured.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button href={`/articles/${featured.slug}`} variant="light" arrow>
                    Read the guide
                  </Button>
                  <Link
                    href="/articles"
                    className="inline-flex min-h-11 items-center rounded-control px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/50 transition hover:bg-white/10"
                  >
                    Browse all destinations
                  </Link>
                </div>
              </div>
            </Container>
          </div>
          {/* Color block: stats strip */}
          <div className="bg-mango-400 text-ocean-950">
            <Container>
              <dl className="grid grid-cols-3 divide-x divide-ocean-950/15">
                {[
                  [articles.length, "Travel guides"],
                  [ISLAND_GROUPS.length, "Island groups"],
                  [CATEGORIES.length, "Experiences"],
                ].map(([value, label]) => (
                  <div key={label} className="flex flex-col-reverse px-4 py-5 first:pl-0 sm:flex-row-reverse sm:items-baseline sm:justify-end sm:gap-3 sm:px-8">
                    <dt className="text-xs font-bold uppercase tracking-widest text-ocean-950/75">{label}</dt>
                    <dd className="font-display text-3xl font-semibold sm:text-4xl">{value}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </div>
        </section>
      )}

      {/* Experiences */}
      <section className="bg-ocean-900 py-20 sm:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Find your kind of trip"
          title="Explore by experience"
          description="Island hopping, wild landscapes, or centuries-old streets: start with what you love."
        />
        <div className="grid gap-1.5 md:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/articles?category=${category.slug}`}
              className="group relative isolate flex aspect-[4/3] items-end overflow-hidden focus-visible:outline-offset-[-4px] focus-visible:outline-white sm:aspect-[16/10] md:aspect-[3/4]"
            >
              <img
                src={category.image}
                alt=""
                loading="lazy"
                className="photo-pop absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className={`w-full p-6 transition-colors duration-150 group-hover:bg-ocean-900 group-hover:text-white lg:p-8 ${categoryTone(category.slug).block}`}>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  {countBy("category", category.slug)} guides
                </p>
                <h3 className="mt-2 text-3xl font-semibold">
                  {category.label}
                </h3>
                <p className="mt-2 max-w-sm opacity-85">{category.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-current/25 pt-4 text-sm font-semibold">
                  Explore
                  <FaArrowRight
                    aria-hidden
                    className="h-3 w-3"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
      </section>

      {/* Latest guides */}
      <section className="border-y border-sand-200 bg-sand-100 py-20 sm:py-28">
        <Container>
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

      {/* Regions: bento on a sun-yellow band */}
      <section className="bg-mango-400 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="7,641 islands, four ways in"
            title="Browse by region"
            action={
              <Button href="/articles?view=map" variant="light" arrow>
                See them on the map
              </Button>
            }
          />
          <div className="grid gap-2 sm:grid-cols-2 lg:h-[42rem] lg:grid-cols-4 lg:grid-rows-2">
            {ISLAND_GROUPS.map((group, i) => {
              const picks = articles.filter((a) => a.islandGroup === group.slug).slice(0, i === 0 ? 4 : 3);
              const layout = [
                "lg:col-span-2 lg:row-span-2",
                "lg:col-span-2",
                "",
                "",
              ][i];
              return (
                <div
                  key={group.slug}
                  className={`group relative isolate flex min-h-80 flex-col justify-between overflow-hidden rounded-card ${layout}`}
                >
                  <img
                    src={group.image}
                    alt=""
                    loading="lazy"
                    className="photo-pop absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <ul className="relative z-20 flex flex-wrap gap-1.5 p-3 sm:p-4">
                    {picks.map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/articles/${a.slug}`}
                          className="block rounded-control bg-white px-2.5 py-1 text-sm font-semibold text-ocean-900 transition-colors duration-150 hover:bg-ocean-900 hover:text-white"
                        >
                          {a.place}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between gap-4 bg-ocean-900 p-4 text-white transition-colors duration-150 group-hover:bg-ocean-700 sm:p-6">
                    <h3 className={`font-semibold leading-none ${i === 0 ? "text-5xl sm:text-7xl" : "text-3xl sm:text-4xl"}`}>
                      {/* Stretched link: the whole tile opens the region. */}
                      <Link
                        href={`/articles?region=${group.slug}`}
                        className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:outline-4 focus-visible:after:outline-offset-[-4px] focus-visible:after:outline-white"
                      >
                        {group.label}
                      </Link>
                    </h3>
                    <p className="shrink-0 text-right">
                      <span className="block font-display text-3xl font-semibold leading-none text-white">
                        {countBy("islandGroup", group.slug)}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/85">guides</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* News, Showbiz and Sports at a glance */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Beyond the guides"
            title="What's happening in the Philippines"
            action={
              <Button href="/activity" variant="secondary" arrow>
                See what&apos;s new
              </Button>
            }
          />
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <HomeColumn title="News" href="/news" cta="All news">
              <ul className="divide-y divide-sand-200 border-y border-sand-200">
                {news.map((n) => (
                  <MiniHeadline key={n.slug} href={`/news/${n.slug}`} date={n.date} title={n.title} tag={topicLabel(n.topic)} />
                ))}
              </ul>
            </HomeColumn>
            <HomeColumn title="Showbiz" href="/showbiz" cta="All showbiz">
              {showbiz[0] && (
                <StoryTile
                  href={`/showbiz/${showbiz[0].slug}`}
                  image={showbiz[0].image}
                  tag={showbizTopicLabel(showbiz[0].topic)}
                  tagTone={SHOWBIZ_TONE[showbiz[0].topic]}
                  date={showbiz[0].date}
                  title={showbiz[0].title}
                />
              )}
              <ul className="mt-4 divide-y divide-sand-200 border-t border-sand-200">
                {showbiz.slice(1).map((st) => (
                  <MiniHeadline key={st.slug} href={`/showbiz/${st.slug}`} date={st.date} title={st.title} />
                ))}
              </ul>
            </HomeColumn>
            <HomeColumn title="Sports" href="/sports" cta="All sports">
              {sports[0] && (
                <StoryTile
                  href={`/sports/${sports[0].slug}`}
                  image={sports[0].image}
                  tag={sportsTopicLabel(sports[0].topic)}
                  tagTone={SPORTS_TONE[sports[0].topic]}
                  date={sports[0].date}
                  title={sports[0].title}
                />
              )}
              <ul className="mt-4 divide-y divide-sand-200 border-t border-sand-200">
                {sports.slice(1).map((st) => (
                  <MiniHeadline key={st.slug} href={`/sports/${st.slug}`} date={st.date} title={st.title} />
                ))}
              </ul>
            </HomeColumn>
          </div>
        </Container>
      </section>

      {/* Books shelf preview */}
      <section className="border-y border-sand-200 bg-sand-100 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Read before you go"
            title="Books by Filipino authors"
            description="Novels, memoirs and stories, many set in places you can visit."
            action={
              <Button href="/books" variant="secondary" arrow>
                Browse the shelf
              </Button>
            }
          />
          <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {books.map((b) => (
              <li key={b.slug}>
                <Link href={`/books/${b.slug}`} className="group block focus-visible:outline-none">
                  <BookCover
                    book={b}
                    className="transition-shadow duration-150 group-hover:shadow-card-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink"
                  />
                  <p className="mt-3 font-display text-lg font-semibold leading-snug text-ocean-900 group-hover:underline">{b.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{b.author}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* About + planning tools */}
      <Container as="section" className="py-20 sm:py-28">
        <div className="grid gap-12 border-t-2 border-ocean-900 pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">
              About {SITE_NAME}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-ocean-900 sm:text-5xl">
              Travel the Philippines like a local.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ocean-800">
              From hidden beaches and mountain escapes to heritage towns and street food, every
              guide comes with practical tips, honest takes, and a ready-made itinerary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/articles" arrow>
                Choose a destination
              </Button>
              <Button href="/contact" variant="secondary">
                Say hello
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow">
              Every guide is a trip planner
            </p>
            <ol className="mt-4 divide-y divide-sand-200 border-y border-sand-200">
              {[
                ["Pick your month", "See which months are best for weather and sea."],
                ["Set a budget", "Get a rough total for your style and group size."],
                ["Save the spots you love", "Build a must-do list as you read."],
                ["Pack and go", "Tick off a checklist, then copy your plan."],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-5 py-4">
                  <span className="w-6 shrink-0 font-display text-2xl font-semibold leading-none text-ink-soft">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ocean-900">{title}</p>
                    <p className="mt-0.5 text-sm text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* Newsletter */}
      <section className="bg-ocean-900 py-16 sm:py-24">
        <Container className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow-on-dark">
              The island postcard
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold text-white sm:text-5xl">
              New islands in your inbox, whenever we find them.
            </h2>
            <p className="mt-4 max-w-lg text-white/80">
              Fresh guides, seasonal picks, and lesser-known spots. No spam. Unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm id="home-newsletter" tone="dark" className="max-w-xl lg:justify-self-end" />
        </Container>
      </section>
    </>
  );
}

// One column of the "What's happening" block: a section label with its own "All …" link.
function HomeColumn({ title, href, cta, children }: { title: string; href: string; cta: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-4 border-t-2 border-ocean-900 pt-4">
        <h3 className="text-2xl font-semibold text-ocean-900">{title}</h3>
        <Link href={href} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold link">
          {cta} <FaArrowRight aria-hidden className="h-3 w-3" />
        </Link>
      </div>
      {children}
    </div>
  );
}
