import Link from "next/link";
import type { ArticleSummary } from "@/data/articles";
import { peso } from "@/lib/guide";
import { categoryTone } from "@/lib/categoryTone";

// Destination card: photo on top with the ideal-stay badge, then category · area,
// the place name, a one-line blurb (frontmatter `card`), and best time / budget.
export default function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  const tone = categoryTone(article.category);
  const stay = article.idealStay ? shortStay(article.idealStay) : "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-150 hover:shadow-card-hover">
      <div className="relative aspect-[3/2] overflow-hidden bg-ocean-900">
        <img
          src={article.imageSmall}
          srcSet={`${article.imageSmall} 800w, ${article.image} 1600w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          width={800}
          height={533}
          decoding="async"
          alt={article.alt}
          loading={priority ? "eager" : "lazy"}
          className="photo-pop h-full w-full object-cover"
        />
        {stay && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ocean-950 shadow-sm">
            {stay}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] font-bold uppercase tracking-widest text-muted">
          <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
          <span>{tone.short}</span>
          {article.area && (
            <>
              <span aria-hidden className="text-sand-300">·</span>
              <span>{article.area}</span>
            </>
          )}
        </p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight text-ocean-900 transition-colors duration-150 group-hover:text-lagoon-700">
          {/* The stretched link makes the whole card clickable. */}
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-lagoon-600"
          >
            {article.cardTitle}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-[0.95rem] leading-relaxed text-ocean-800">{article.card}</p>
        <p className="sr-only">{article.description}</p>

        {(article.bestMonths || article.budgetFrom > 0) && (
          <dl className="mt-4 flex items-end justify-between gap-4 border-t border-sand-200 pt-3">
            {article.bestMonths && (
              <div>
                <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">Best time</dt>
                <dd className="mt-0.5 font-semibold text-ocean-900">{article.bestMonths}</dd>
              </div>
            )}
            {article.budgetFrom > 0 && (
              <div className="ml-auto text-right">
                <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">From</dt>
                <dd className="mt-0.5 font-semibold text-ocean-900">
                  {peso(article.budgetFrom)} <span className="font-normal text-muted">/day</span>
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </article>
  );
}

// Short stays stay as written ("Day trip or 1 night", "1–3 nights");
// longer ones are trimmed: "2–3 days in Moalboal or Badian" -> "2–3 days".
function shortStay(value: string) {
  if (value.length <= 20) return value;
  const m = value.match(/^[\d–-]+\s*(days?|nights?)/i);
  return m ? m[0] : value.split(/[(,]/)[0].trim().slice(0, 20);
}
