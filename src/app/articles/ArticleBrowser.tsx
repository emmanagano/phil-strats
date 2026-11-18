"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import type { ArticleSummary } from "@/data/articles";
import { CATEGORIES, ISLAND_GROUPS } from "@/data/taxonomy";
import ArticleCard from "@/app/components/ui/ArticleCard";

const PAGE_SIZE = 6;

// Filters live in the query string (?category=&region=&q=) so they survive
// reloads and can be linked to from the home page and footer.
export default function ArticleBrowser({ articles }: { articles: ArticleSummary[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("category") ?? "";
  const region = params.get("region") ?? "";
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const updateParams = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    setVisible(PAGE_SIZE);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (!category || a.category === category) &&
        (!region || a.islandGroup === region) &&
        (!q ||
          [a.title, a.description, a.region, ...a.tags].some((field) =>
            field.toLowerCase().includes(q)
          ))
    );
  }, [articles, category, region, query]);

  const hasFilters = Boolean(category || region || query);

  return (
    <div>
      <div className="mb-10 space-y-5 border-y border-sand-200 py-6">
        <div className="relative">
          <FaMagnifyingGlass
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          />
          <label htmlFor="article-search" className="sr-only">
            Search guides
          </label>
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams({ q: e.target.value });
            }}
            placeholder="Search beaches, towns, activities…"
            className="min-h-12 w-full rounded-control bg-white py-3 pl-11 pr-4 text-base text-ocean-900 outline-none ring-1 ring-sand-300 transition placeholder:text-muted focus:ring-2 focus:ring-ink"
          />
        </div>
        <FilterGroup
          label="Experience"
          options={CATEGORIES}
          value={category}
          onChange={(value) => updateParams({ category: value })}
        />
        <FilterGroup
          label="Region"
          options={ISLAND_GROUPS}
          value={region}
          onChange={(value) => updateParams({ region: value })}
        />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-sm font-medium text-muted">
          {results.length} {results.length === 1 ? "guide" : "guides"}
          {hasFilters ? " match your filters" : ""}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              updateParams({ category: "", region: "", q: "" });
            }}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold link"
          >
            <FaXmark aria-hidden /> Clear all
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ArticleGrid articles={results.slice(0, visible)} />
      ) : (
        <div className="rounded-card border-2 border-dashed border-sand-300 px-6 py-16 text-center">
          <p className="font-display text-2xl text-ocean-900">No guides found</p>
          <p className="mt-2 text-muted">Try a different search or clear the filters.</p>
        </div>
      )}

      {visible < results.length && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="min-h-11 rounded-control border border-ocean-900/20 bg-white px-8 py-3 text-sm font-semibold text-ocean-900 transition hover:border-ocean-900 hover:bg-ocean-900 hover:text-white"
          >
            Load more guides
          </button>
        </div>
      )}
    </div>
  );
}

export function ArticleGrid({ articles }: { articles: ArticleSummary[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <ArticleCard key={article.slug} article={article} priority={i < 3} />
      ))}
    </div>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { slug: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const chip = (active: boolean) =>
    `min-h-11 rounded-control border px-3.5 text-sm font-medium transition sm:min-h-10 ${
      active
        ? "border-ocean-900 bg-ocean-900 text-white"
        : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
    }`;

  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="w-full text-xs font-bold uppercase tracking-widest text-muted sm:mr-2 sm:w-24">
        {label}
      </span>
      <button type="button" aria-pressed={!value} onClick={() => onChange("")} className={chip(!value)}>
        All
      </button>
      {options.map((option) => (
        <button
          key={option.slug}
          type="button"
          aria-pressed={value === option.slug}
          onClick={() => onChange(value === option.slug ? "" : option.slug)}
          className={chip(value === option.slug)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
