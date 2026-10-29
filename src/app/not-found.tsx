import type { Metadata } from "next";
import { getAllArticles } from "@/data/articles";
import ArticleCard from "./components/ui/ArticleCard";
import Button from "./components/ui/Button";
import Container from "./components/ui/Container";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  const popular = getAllArticles().slice(0, 3);

  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-8xl font-semibold text-lagoon-600 sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-ocean-900 sm:text-5xl">
          This island isn&apos;t on our map
        </h1>
        <p className="mt-4 text-lg text-muted">
          The page you&apos;re looking for has drifted away. Head back to shore, or try one of
          these guides.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/articles" variant="secondary">
            All destinations
          </Button>
        </div>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </Container>
  );
}
