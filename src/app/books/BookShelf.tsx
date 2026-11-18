"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaLocationDot, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { BOOK_ERAS, BOOK_KINDS, authorSortKey, bookKind, type Book } from "@/data/books";
import BookCover from "@/app/components/ui/BookCover";

const SORTS = [
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
  { value: "title", label: "Title A–Z" },
  { value: "author", label: "Author A–Z" },
] as const;
type Sort = (typeof SORTS)[number]["value"];

// Search, filters and sort live in the query string (?q=&era=&kind=&lang=&place=1&sort=)
// so a filtered shelf survives reloads and can be shared.
export default function BookShelf({ books }: { books: Book[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const era = params.get("era") ?? "";
  const kind = params.get("kind") ?? "";
  const lang = params.get("lang") ?? "";
  const place = params.get("place") === "1";
  const sortParam = params.get("sort") ?? "";
  const sort: Sort = SORTS.some((s) => s.value === sortParam) ? (sortParam as Sort) : "oldest";
  const [query, setQuery] = useState(params.get("q") ?? "");

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const languages = useMemo(() => Array.from(new Set(books.map((b) => b.language))).sort(), [books]);
  const q = query.trim().toLowerCase();

  // Each filter's counts reflect every *other* active filter, so options never lead to zero results silently.
  const matches = (b: Book, skip?: "era" | "kind" | "lang" | "place") =>
    (skip === "era" || !era || b.era === era) &&
    (skip === "kind" || !kind || bookKind(b.genre) === kind) &&
    (skip === "lang" || !lang || b.language === lang) &&
    (skip === "place" || !place || Boolean(b.setIn?.length)) &&
    (!q ||
      [b.title, b.originalTitle ?? "", b.author, b.summary, b.genre, b.settingNote ?? ""].some((f) =>
        f.toLowerCase().includes(q),
      ));

  const results = useMemo(() => {
    const list = books.filter((b) => matches(b));
    const byTitle = (a: Book, b: Book) => a.title.localeCompare(b.title);
    switch (sort) {
      case "newest":
        return list.sort((a, b) => b.year - a.year || byTitle(a, b));
      case "title":
        return list.sort(byTitle);
      case "author":
        return list.sort((a, b) => authorSortKey(a.author).localeCompare(authorSortKey(b.author)) || a.year - b.year);
      default:
        return list.sort((a, b) => a.year - b.year || byTitle(a, b));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, era, kind, lang, place, q, sort]);

  const count = (skip: "era" | "kind" | "lang" | "place", test: (b: Book) => boolean) =>
    books.filter((b) => matches(b, skip) && test(b)).length;

  const chips = [
    era && { key: "era", label: BOOK_ERAS.find((e) => e.slug === era)?.label ?? era },
    kind && { key: "kind", label: BOOK_KINDS.find((k) => k.slug === kind)?.label ?? kind },
    lang && { key: "lang", label: lang },
    place && { key: "place", label: "Set in places you can visit" },
    q && { key: "q", label: `"${query.trim()}"` },
  ].filter(Boolean) as { key: string; label: string }[];

  const clearAll = () => {
    setQuery("");
    update({ era: "", kind: "", lang: "", place: "", q: "" });
  };

  return (
    <>
      <div className="mb-8 space-y-5 border-y border-sand-200 py-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <FaMagnifyingGlass aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <label htmlFor="book-search" className="sr-only">Search books</label>
            <input
              id="book-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                update({ q: e.target.value });
              }}
              placeholder="Search titles, authors, places…"
              className="min-h-12 w-full rounded-control bg-white py-3 pl-11 pr-4 text-base text-ocean-900 outline-none ring-1 ring-sand-300 transition placeholder:text-muted focus:ring-2 focus:ring-ink"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="book-sort" className="text-xs font-bold uppercase tracking-widest text-muted">Sort</label>
            <select
              id="book-sort"
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "oldest" ? "" : e.target.value })}
              className="min-h-12 rounded-control bg-white px-3 text-sm font-semibold text-ocean-900 outline-none ring-1 ring-sand-300 focus:ring-2 focus:ring-ink"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <FilterRow
          label="Era"
          value={era}
          onChange={(v) => update({ era: v })}
          options={BOOK_ERAS.map((e) => ({ value: e.slug, label: e.label, n: count("era", (b) => b.era === e.slug) }))}
          all={count("era", () => true)}
        />
        <FilterRow
          label="Type"
          value={kind}
          onChange={(v) => update({ kind: v })}
          options={BOOK_KINDS.map((k) => ({ value: k.slug, label: k.label, n: count("kind", (b) => bookKind(b.genre) === k.slug) }))}
          all={count("kind", () => true)}
        />
        <FilterRow
          label="Language"
          value={lang}
          onChange={(v) => update({ lang: v })}
          options={languages.map((l) => ({ value: l, label: l, n: count("lang", (b) => b.language === l) }))}
          all={count("lang", () => true)}
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-24 text-xs font-bold uppercase tracking-widest text-muted">Travel</span>
          <button
            type="button"
            aria-pressed={place}
            disabled={!place && count("place", (b) => Boolean(b.setIn?.length)) === 0}
            onClick={() => update({ place: place ? "" : "1" })}
            className={`inline-flex min-h-11 items-center gap-2 rounded-control border px-4 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
              place ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
            }`}
          >
            <FaLocationDot aria-hidden />
            Set in places you can visit
            <span className={place ? "text-white/85" : "text-muted"}>{count("place", (b) => Boolean(b.setIn?.length))}</span>
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <p aria-live="polite" className="mr-2 text-sm font-medium text-muted">
            {results.length} {results.length === 1 ? "book" : "books"}
            {chips.length ? " match" : ""}
          </p>
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                if (c.key === "q") setQuery("");
                update({ [c.key]: "" });
              }}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-sand-200 px-3 text-sm font-semibold text-ocean-900 transition-colors duration-150 hover:bg-sand-300"
              aria-label={`Remove filter: ${c.label}`}
            >
              {c.label} <FaXmark aria-hidden className="h-3 w-3" />
            </button>
          ))}
        </div>
        {chips.length > 0 && (
          <button type="button" onClick={clearAll} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold link">
            <FaXmark aria-hidden /> Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <BookGrid books={results} />
      ) : (
        <div className="rounded-card border-2 border-dashed border-sand-300 px-6 py-16 text-center">
          <p className="font-display text-2xl text-ocean-900">No books found</p>
          <p className="mt-2 text-muted">Try a different search or clear the filters.</p>
          <button type="button" onClick={clearAll} className="mt-5 min-h-11 rounded-control bg-ocean-900 px-5 text-sm font-semibold text-white hover:bg-ocean-800">
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}

// Plain grid, also used as the server-rendered fallback so every book is in the HTML.
export function BookGrid({ books }: { books: Book[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((b) => (
        <li key={b.slug}>
          <Link href={`/books/${b.slug}`} className="group block focus-visible:outline-none">
            <BookCover
              book={b}
              className="transition-shadow duration-150 group-hover:shadow-card-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-ink"
            />
            <p className="mt-3 font-display text-lg font-semibold leading-snug text-ocean-900 transition-colors duration-150 group-hover:underline">
              {b.title}
            </p>
            <p className="mt-0.5 text-sm text-ocean-800">{b.author}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
              {b.year} · {b.genre}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
  all,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; n: number }[];
  all: number;
}) {
  const btn = (on: boolean) =>
    `inline-flex min-h-11 items-center gap-2 rounded-control border px-4 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
      on ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
    }`;
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      <button type="button" aria-pressed={!value} onClick={() => onChange("")} className={btn(!value)}>
        All <span className={!value ? "text-white/85" : "text-muted"}>{all}</span>
      </button>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            disabled={!on && o.n === 0}
            onClick={() => onChange(on ? "" : o.value)}
            className={btn(on)}
          >
            {o.label} <span className={on ? "text-white/85" : "text-muted"}>{o.n}</span>
          </button>
        );
      })}
    </div>
  );
}
