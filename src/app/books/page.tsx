import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { BOOK_ERAS, getAllBooks } from "@/data/books";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import BookCover from "@/app/components/ui/BookCover";
import { SITE_URL } from "@/lib/site";
import BookShelf, { BookGrid } from "./BookShelf";

export const metadata: Metadata = {
  title: "Books by Filipino Authors",
  description:
    "The best-known books by Filipino writers, from Rizal's novels to modern bestsellers and diaspora prize winners, with where each one takes you in the Philippines.",
  alternates: { canonical: "/books" },
};

export default function BooksPage() {
  const books = getAllBooks();
  const withPlaces = books.filter((b) => b.setIn?.length).length;
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/books/${b.slug}`,
      name: `${b.title} by ${b.author}`,
    })),
  };
  // Hero shelf: three books with strong covers, one per era feel (falls back to the oldest).
  const featured = ["el-filibusterismo", "dekada-70", "trese"]
    .map((slug) => books.find((b) => b.slug === slug))
    .filter((b): b is (typeof books)[number] => Boolean(b));
  if (featured.length < 3) featured.push(...books.slice(0, 3 - featured.length));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
      />
      <PageHero
        tone="ocean"
        eyebrow="Books"
        title="Read the Philippines"
        description="The books Filipinos grew up with and the ones the world is reading now, from Rizal to today's prize winners. Many are set in places you can visit, so read one before you go."
        stats={[
          { value: books.length, label: "Books" },
          { value: new Set(books.map((b) => b.author)).size, label: "Authors" },
          { value: withPlaces, label: "Linked to guides" },
        ]}
        aside={
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {featured.map((b, i) => (
              <Link key={b.slug} href={`/books/${b.slug}`} className={i === 1 ? "translate-y-6" : ""} aria-label={`${b.title} by ${b.author}`}>
                <BookCover book={b} size="sm" />
              </Link>
            ))}
          </div>
        }
      />
      <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
        <Suspense fallback={<BookGrid books={books} />}>
          <BookShelf books={books} />
        </Suspense>
        <div className="mt-16 grid gap-6 border-t border-sand-200 pt-8 sm:grid-cols-3">
          {BOOK_ERAS.map((e) => (
            <div key={e.slug}>
              <p className="font-display text-xl font-semibold text-ocean-900">{e.label}</p>
              <p className="mt-1 text-sm text-ocean-800">{e.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-muted">
          Summaries are our own and stop at each book&apos;s setup. Covers are designed by Phil Strats, except where a
          freely licensed image is credited. Award and reading-list facts are linked on each book&apos;s page.
        </p>
      </Container>
    </>
  );
}
