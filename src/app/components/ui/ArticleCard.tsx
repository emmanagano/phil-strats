import Link from "next/link";
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import type { ArticleSummary } from "@/data/articles";
import { peso } from "@/lib/guide";
import { categoryTone } from "@/lib/categoryTone";

// Image-led destination card: the photo fills a tall frame, with a compact
// solid panel inset at the bottom for the name and trip-deciding facts.
export default function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  const facts = [
    article.bestMonths,
    article.budgetFrom > 0 ? `from ${peso(article.budgetFrom)}/day` : "",
    article.idealStay ? shortStay(article.idealStay) : "",
  ].filter(Boolean);

  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-card bg-ocean-900 shadow-card transition-shadow duration-150 hover:shadow-card-hover">
      <img
        src={article.imageSmall}
        srcSet={`${article.imageSmall} 800w, ${article.image} 1600w`}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        width={800}
        height={1000}
        decoding="async"
        alt={article.alt}
        loading={priority ? "eager" : "lazy"}
        className="photo-pop absolute inset-0 h-full w-full object-cover"
      />
      <span className={`absolute left-0 top-4 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest ${categoryTone(article.category).tag}`}>
        {article.categoryLabel}
      </span>

      <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-control bg-white p-4 transition-colors duration-150 group-hover:bg-ocean-900 sm:p-5">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-widest text-muted transition-colors duration-150 group-hover:text-white/70">
            <FaLocationDot aria-hidden className="text-coral-500" />
            {article.islandGroupLabel}
          </p>
          <h3 className="mt-1 text-2xl font-semibold leading-tight text-ocean-900 transition-colors duration-150 group-hover:text-white">
            {/* The stretched link makes the whole card clickable. */}
            <Link
              href={`/articles/${article.slug}`}
              className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-lagoon-600"
            >
              {article.place}
            </Link>
          </h3>
          {facts.length > 0 && (
            <p className="mt-1.5 text-sm font-medium text-ocean-800 transition-colors duration-150 group-hover:text-white/85">
              {facts.join(" · ")}
            </p>
          )}
          <p className="sr-only">{article.description}</p>
        </div>
        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mango-400 text-ocean-950">
          <FaArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

// "4–7 days" stays; "2–3 days in Moalboal or Badian" -> "2–3 days"; "Half day to 1 day" kept short.
function shortStay(value: string) {
  const m = value.match(/^[\d–-]+\s*(days?|nights?)/i);
  return m ? m[0] : value.split(/[(,]/)[0].trim().slice(0, 16);
}
