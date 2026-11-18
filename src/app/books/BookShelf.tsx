"use client";
import { useState } from "react";
import Link from "next/link";
import { BOOK_ERAS, type Book, type BookEra } from "@/data/books";
import BookCover from "@/app/components/ui/BookCover";

// Cover grid with era and language filters. Covers are typographic, so the grid stays light.
export default function BookShelf({ books }: { books: Book[] }) {
  const [era, setEra] = useState<BookEra | "all">("all");
  const [language, setLanguage] = useState<string>("all");
  const languages = Array.from(new Set(books.map((b) => b.language))).sort();
  const shown = books.filter((b) => (era === "all" || b.era === era) && (language === "all" || b.language === language));

  return (
    <>
      <div className="mb-10 space-y-4">
        <FilterRow
          label="Era"
          value={era}
          onChange={(v) => setEra(v as BookEra | "all")}
          options={[{ value: "all", label: "All" }, ...BOOK_ERAS.map((e) => ({ value: e.slug, label: e.label }))]}
        />
        {languages.length > 1 && (
          <FilterRow
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[{ value: "all", label: "All" }, ...languages.map((l) => ({ value: l, label: l }))]}
          />
        )}
      </div>

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "book" : "books"}
      </p>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((b) => (
          <li key={b.slug}>
            <Link href={`/books/${b.slug}`} className="group block focus-visible:outline-none">
              <BookCover book={b} className="transition-shadow duration-150 group-hover:shadow-card-hover group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-lagoon-600" />
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-ocean-900 transition-colors duration-150 group-hover:text-lagoon-700">
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
    </>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs font-bold uppercase tracking-widest text-muted">{label}</span>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`min-h-11 rounded-control border px-4 text-sm font-semibold transition-colors duration-150 ${
              on ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
