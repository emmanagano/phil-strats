import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaBookOpen } from "react-icons/fa6";
import { eraLabel, getAllBooks, getBookBySlug, getRelatedBooks } from "@/data/books";
import { getAllArticles } from "@/data/articles";
import Container from "@/app/components/ui/Container";
import BookCover from "@/app/components/ui/BookCover";
import { SITE_NAME, SITE_URL, pageTitle } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book not found" };
  const title = `${book.title} by ${book.author}`;
  return {
    title: pageTitle(title),
    description: book.summary,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      type: "book",
      title,
      description: book.summary,
      url: `/books/${book.slug}`,
      ...(book.image ? { images: [book.image.src] } : {}),
    },
  };
}

export default async function BookPage({ params }: Params) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const articles = getAllArticles();
  const places = (book.setIn ?? []).map((s) => {
    const a = articles.find((x) => x.slug === s);
    if (!a) throw new Error(`books/${book.slug}: unknown guide "${s}" in setIn`);
    return a;
  });
  const related = getRelatedBooks(book);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.originalTitle && book.originalTitle !== book.title ? { alternateName: book.originalTitle } : {}),
    author: { "@type": "Person", name: book.author },
    datePublished: String(book.year),
    inLanguage: book.language,
    genre: book.genre,
    description: book.summary,
    url: `${SITE_URL}/books/${book.slug}`,
    ...(book.awards?.length ? { award: book.awards } : {}),
    mainEntityOfPage: `${SITE_URL}/books/${book.slug}`,
    publisher: undefined,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="py-12 sm:py-16">
        <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-lagoon-700 hover:underline">
          <FaArrowLeft aria-hidden className="h-3 w-3" /> All books
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
          <div className="mx-auto w-48 md:mx-0 md:w-full">
            <BookCover book={book} size="lg" />
            {book.coverImage && book.openLibrary && (
              <p className="mt-2 text-xs text-muted">
                Cover via{" "}
                <a href={`https://openlibrary.org/works/${book.openLibrary}`} className="underline" target="_blank" rel="noopener noreferrer">
                  Open Library
                </a>
              </p>
            )}
            {!book.coverImage && book.image && (
              <p className="mt-2 text-xs text-muted">
                {book.image.caption}{" "}
                <a href={book.image.source} className="underline" target="_blank" rel="noopener noreferrer">
                  {book.image.author}
                </a>
                ,{" "}
                <a href={book.image.licenseUrl} className="underline" target="_blank" rel="noopener noreferrer">
                  {book.image.license}
                </a>
              </p>
            )}
          </div>

          <article className="min-w-0 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-700">{eraLabel(book.era)}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-ocean-900 sm:text-5xl">{book.title}</h1>
            <p className="mt-3 text-xl text-ocean-800">
              by <span className="font-semibold text-ocean-900">{book.author}</span>
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-sand-200 py-4 text-sm">
              {[
                ["Published", String(book.year)],
                ["Language", book.language],
                ["Type", book.genre],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">{k}</dt>
                  <dd className="mt-0.5 font-semibold text-ocean-900">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 font-display text-xl leading-relaxed text-ocean-800 sm:text-2xl">{book.summary}</p>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ocean-800">
              {book.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <aside className="mt-10 grid overflow-hidden rounded-card bg-mango-400 text-ocean-950 sm:grid-cols-[6rem_minmax(0,1fr)]">
              <div className="flex items-center gap-3 bg-ocean-900 px-5 py-3 text-mango-300 sm:flex-col sm:justify-center sm:gap-2 sm:py-6">
                <FaBookOpen aria-hidden className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white sm:text-center">Why it matters</span>
              </div>
              <p className="p-5 font-display text-xl font-semibold leading-snug sm:p-7">{book.why}</p>
            </aside>

            {book.awards && book.awards.length > 0 && (
              <section aria-labelledby="awards" className="mt-10">
                <h2 id="awards" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Awards and honors</h2>
                <ul className="mt-3 space-y-2 text-ocean-900">
                  {book.awards.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {places.length > 0 && (
              <section aria-labelledby="read-before" className="mt-10">
                <h2 id="read-before" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Read it before you go</h2>
                {book.settingNote && <p className="mt-2 text-ocean-800">{book.settingNote}</p>}
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {places.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/articles/${a.slug}`}
                        className="flex items-center gap-4 rounded-card border border-sand-200 bg-white p-3 transition-colors duration-150 hover:border-ocean-900"
                      >
                        <img src={a.imageSmall} alt="" loading="lazy" className="photo-pop h-16 w-16 shrink-0 rounded-control object-cover" />
                        <span className="min-w-0">
                          <span className="block text-xs font-bold uppercase tracking-widest text-coral-700">{a.cardTitle} guide</span>
                          <span className="mt-1 line-clamp-2 block font-semibold text-ocean-900">{a.card}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="author" className="mt-10 border-l-4 border-lagoon-600 pl-5">
              <h2 id="author" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">About the author</h2>
              <p className="mt-2 text-ocean-900">
                <span className="font-semibold">{book.author}:</span> {book.authorNote}
              </p>
            </section>

            <section aria-labelledby="sources" className="mt-10">
              <h2 id="sources" className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Sources</h2>
              <ul className="mt-3 divide-y divide-sand-200 border-y border-sand-200">
                {[...book.sources, ...(book.openLibrary ? [{ name: "Open Library: editions and details", url: `https://openlibrary.org/works/${book.openLibrary}` }] : [])].map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-between gap-4 py-3 text-ocean-900 hover:text-lagoon-700"
                    >
                      {s.name}
                      <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3 shrink-0 text-muted" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="more-books" className="mt-20 border-t border-sand-200 pt-10">
            <h2 id="more-books" className="text-2xl font-semibold text-ocean-900 sm:text-3xl">Keep reading</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
              {related.map((b) => (
                <li key={b.slug}>
                  <Link href={`/books/${b.slug}`} className="group block">
                    <BookCover book={b} size="sm" className="transition-shadow duration-150 group-hover:shadow-card-hover" />
                    <p className="mt-2 font-semibold leading-snug text-ocean-900 group-hover:text-lagoon-700">{b.title}</p>
                    <p className="text-sm text-ocean-800">{b.author}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  );
}
