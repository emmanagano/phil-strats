import type { Metadata } from "next";
import { getAllSports } from "@/data/sports";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import SportsGrid from "./SportsGrid";

export const metadata: Metadata = {
  title: "Filipino Sports News",
  description:
    "The Filipino athletes making news this year, from Carlos Yulo and EJ Obiena at the Asian Games to Alex Eala's first WTA title. Short, sourced and photo-led.",
  alternates: { canonical: "/sports" },
};

export default function SportsPage() {
  const stories = getAllSports();
  return (
    <>
      <PageHero
        tone="ocean"
        eyebrow="Sports"
        title="Filipinos on the world stage"
        description="The wins, records and milestones of Filipino athletes this year. Short, sourced, and big on photos."
        // Collage uses photos from further down the page, so the lead and first row don't repeat.
        images={stories.slice(-4, -1).map((s) => ({ src: s.image.src }))}
        stats={[
          { value: stories.length, label: "Stories" },
          { value: new Set(stories.map((s) => s.topic)).size, label: "Sports" },
        ]}
      />
      <Container className="pb-20 pt-12 sm:pb-28 sm:pt-16">
        <SportsGrid stories={stories} />
        <p className="mt-16 max-w-2xl border-t border-sand-200 pt-6 text-sm text-muted">
          Stories cover public results, titles and events, sourced from the outlets linked on each page.
          Photos are freely licensed and credited on each story. Their use doesn&apos;t imply any endorsement of
          Phil Strats.
        </p>
      </Container>
    </>
  );
}
