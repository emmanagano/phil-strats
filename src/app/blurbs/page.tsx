import type { Metadata } from "next";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { blurbs } from "@/data/blurbs";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";

export const metadata: Metadata = {
  title: "Blurbs",
  description: "Our favorite Philippines travel reads from around the web, with a quick take on each.",
  alternates: { canonical: "/blurbs" },
};

export default function BlurbsPage() {
  return (
    <>
      <PageHero
        eyebrow="Blurbs"
        title="Good reads from around the web"
        description="The best Philippines travel writing we've found lately, with a quick note on why it's worth your time."
      />
      <Container className="pb-24">
        <ol className="grid gap-5 md:grid-cols-2">
          {blurbs.map((blurb, i) => (
            <li key={blurb.article_link} className="reveal">
              <a
                href={blurb.article_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full flex-col rounded-3xl p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8 ${
                  i === 0 ? "bg-ocean-900 text-white md:col-span-2" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-[0.15em]">
                  <span className={i === 0 ? "text-mango-400" : "text-coral-700"}>{blurb.source}</span>
                  <time className={i === 0 ? "text-white/70" : "text-muted"}>{blurb.date}</time>
                </div>
                <h2
                  className={`mt-4 text-2xl font-semibold leading-snug ${
                    i === 0 ? "sm:text-4xl" : "text-ocean-900 group-hover:text-lagoon-700"
                  }`}
                >
                  {blurb.article_title}
                </h2>
                <p className={`mt-3 flex-1 leading-relaxed ${i === 0 ? "text-white/80 sm:text-lg" : "text-muted"}`}>
                  {blurb.commentary}
                </p>
                <span
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${
                    i === 0 ? "text-mango-400" : "text-lagoon-700"
                  }`}
                >
                  Read the article
                  <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
