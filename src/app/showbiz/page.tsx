import type { Metadata } from "next";
import { getAllShowbiz } from "@/data/showbiz";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import ShowbizGrid from "./ShowbizGrid";

export const metadata: Metadata = {
  title: "Filipino Showbiz & Pop Culture",
  description:
    "The Filipino music, TV, film and stage stories worth knowing this year, from BINI and SB19 to Lea Salonga, Carmelle and Pinoy Big Brother.",
  alternates: { canonical: "/showbiz" },
};

export default function ShowbizPage() {
  const stories = getAllShowbiz();
  return (
    <>
      <PageHero
        tone="coral"
        eyebrow="Showbiz"
        title="Filipino pop culture, worth your scroll"
        description="The music, shows, films and stars Filipinos are talking about this year. Short, sourced, and big on photos."
        // Collage uses photos from further down the page, so the lead and first row don't repeat.
        images={stories.slice(-4, -1).map((s) => ({ src: s.image.src }))}
        stats={[
          { value: stories.length, label: "Stories" },
          { value: stories.filter((s) => s.topic === "music").length, label: "Music stories" },
          { value: new Set(stories.map((s) => s.topic)).size, label: "Topics" },
        ]}
      />
      <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
        <ShowbizGrid stories={stories} />
        <p className="mt-16 max-w-2xl border-t border-sand-200 pt-6 text-sm text-muted">
          Stories cover public achievements, releases and events, sourced from the outlets linked on each page.
          Photos are freely licensed and credited on each story. Their use doesn&apos;t imply any endorsement of
          Phil Strats.
        </p>
      </Container>
    </>
  );
}
