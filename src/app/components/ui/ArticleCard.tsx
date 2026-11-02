import Link from "next/link";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import type { ArticleSummary } from "@/data/articles";
import Badge from "./Badge";

export default function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={article.imageSmall}
          srcSet={`${article.imageSmall} 800w, ${article.image} 1600w`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          width={800}
          height={600}
          decoding="async"
          alt={article.alt}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge tone="glass" className="absolute left-4 top-4">
          {article.categoryLabel}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-muted">
          <span className="inline-flex items-center gap-1.5">
            <FaLocationDot aria-hidden className="text-coral-500" />
            {article.islandGroupLabel}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FaRegClock aria-hidden className="text-lagoon-600" />
            {article.readingTime} min read
          </span>
        </div>
        <h3 className="text-xl font-semibold leading-snug text-ocean-900">
          {/* The stretched link makes the whole card clickable. */}
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-lagoon-700"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {article.description}
        </p>
      </div>
    </article>
  );
}
