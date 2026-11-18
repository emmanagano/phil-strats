"use client";
import { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { SPORTS_TOPICS, type SportsStory, type SportsTopic } from "@/data/sports";
import { formatNewsDate } from "@/lib/newsTone";
import { SPORTS_TONE } from "@/lib/sportsTone";

// Lead story as a big split feature, then a filterable grid of photo cards.
export default function SportsGrid({ stories }: { stories: SportsStory[] }) {
  const [topic, setTopic] = useState<SportsTopic | "all">("all");
  const lead = stories.find((s) => s.featured) ?? stories[0];
  const rest = stories.filter((s) => s !== lead);
  const shown = topic === "all" ? rest : stories.filter((s) => s.topic === topic);

  return (
    <>
      {topic === "all" && lead && <LeadStory story={lead} />}

      <div role="group" aria-label="Filter by topic" className="mb-8 mt-14 flex flex-wrap gap-2">
        {[{ slug: "all" as const, label: "Everything" }, ...SPORTS_TOPICS].map((t) => {
          const on = topic === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setTopic(t.slug)}
              className={`min-h-11 rounded-control border px-4 text-sm font-semibold transition-colors duration-150 ${
                on ? "border-ocean-900 bg-ocean-900 text-white" : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Bento: a 2x2 feature, then a wide tile later on, so the rhythm varies. */}
      <ul className="grid grid-flow-dense auto-rows-[22rem] gap-2 sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-3">
        {shown.map((s, i) => {
          // Repeats every 8 cards (one 2x2 + one wide = 12 cells = 4 full rows).
          const span = i % 8 === 0 ? "sm:col-span-2 lg:row-span-2" : i % 8 === 6 ? "lg:col-span-2" : "";
          return (
            <li key={s.slug} className={span}>
              <StoryCard story={s} big={i % 8 === 0} />
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className="text-muted">No stories in this topic yet.</p>}
    </>
  );
}

function TopicTag({ story }: { story: SportsStory }) {
  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${SPORTS_TONE[story.topic]}`}>
      {SPORTS_TOPICS.find((t) => t.slug === story.topic)?.label}
    </span>
  );
}

function LeadStory({ story }: { story: SportsStory }) {
  return (
    <article className="group relative grid overflow-hidden rounded-card bg-ocean-900 text-white lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="aspect-[4/3] overflow-hidden bg-ocean-950 lg:aspect-auto lg:min-h-[28rem]">
        <img src={story.image.src} alt={story.image.alt} className="photo-pop h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10">
        <div className="flex items-center gap-3">
          <TopicTag story={story} />
          <span className="text-sm text-white/85">Featured · {formatNewsDate(story.date)}</span>
        </div>
        <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
          <Link
            href={`/sports/${story.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-white"
          >
            {story.title}
          </Link>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-white/85">{story.dek}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/40 underline-offset-4">
          Read the story <FaArrowRight aria-hidden className="h-3 w-3" />
        </span>
      </div>
    </article>
  );
}

function StoryCard({ story, big = false }: { story: SportsStory; big?: boolean }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-card bg-ocean-900">
      <img src={story.image.src} alt={story.image.alt} loading="lazy" className="photo-pop absolute inset-0 h-full w-full object-cover" />
      <div className="absolute left-0 top-4">
        <TopicTag story={story} />
      </div>
      <div className={`absolute inset-x-3 bottom-3 rounded-control bg-white transition-colors duration-150 group-hover:bg-ocean-900 ${big ? "p-5 sm:p-7" : "p-4"}`}>
        <time
          dateTime={story.date}
          className="text-xs font-bold uppercase tracking-widest text-muted transition-colors duration-150 group-hover:text-white/85"
        >
          {formatNewsDate(story.date)}
        </time>
        <h3
          className={`mt-1 font-semibold leading-snug text-ocean-900 transition-colors duration-150 group-hover:text-white ${
            big ? "text-2xl sm:text-4xl" : "text-lg"
          }`}
        >
          <Link
            href={`/sports/${story.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
          >
            {story.title}
          </Link>
        </h3>
        {big ? (
          <p className="mt-2 hidden text-ocean-800 transition-colors duration-150 group-hover:text-white/85 sm:block">{story.dek}</p>
        ) : (
          <p className="sr-only">{story.dek}</p>
        )}
      </div>
    </article>
  );
}
