import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllArticles } from "@/data/articles";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import { SITE_URL } from "@/lib/site";
import ArticleBrowser, { ArticleGrid } from "./ArticleBrowser";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Every Phil Strats travel guide — beaches, nature escapes, and heritage towns across Luzon, Visayas, Mindanao, and Palawan.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/articles/${a.slug}`,
      name: a.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Destinations"
        title="Where to next?"
        description="Filter by the kind of trip you want or the island group you're heading to — or just search."
      />
      <Container className="pb-24">
        {/* The static HTML shows the full list; filters take over once JS loads. */}
        <Suspense fallback={<ArticleGrid articles={articles} />}>
          <ArticleBrowser articles={articles} />
        </Suspense>
      </Container>
    </>
  );
}
