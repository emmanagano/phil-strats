// /llms.txt: a plain-text map of the site for AI assistants and LLM crawlers (llmstxt.org).
// Generated at build time from the same data as the sitemap, so new guides appear automatically.
import { getAllArticles } from "@/data/articles";
import { getAllNews } from "@/data/news";
import { getAllShowbiz } from "@/data/showbiz";
import { getAllBooks } from "@/data/books";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const guides = getAllArticles()
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.description}`);
  const news = getAllNews().map((n) => `- [${n.title}](${SITE_URL}/news/${n.slug}) (${n.date}): ${n.summary}`);
  const books = getAllBooks().map((b) => `- [${b.title} by ${b.author}](${SITE_URL}/books/${b.slug}) (${b.year}): ${b.summary}`);
  const showbiz = getAllShowbiz().map((s) => `- [${s.title}](${SITE_URL}/showbiz/${s.slug}) (${s.date}): ${s.dek}`);

  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Each destination guide covers the best months to go (rated month by month), routes from Manila and other hubs, daily budgets in pesos for three travel styles, things to do, sample itineraries, where to stay and eat, entrance fees, and practical essentials. Prices marked ≈ are estimates; each guide shows when it was last checked. News briefs and showbiz stories cite their sources.",
    "",
    "## Destination guides",
    "",
    ...guides,
    "",
    "## Philippines news",
    "",
    ...news,
    "",
    "## Filipino showbiz and pop culture",
    "",
    ...showbiz,
    "",
    "## Books by Filipino authors",
    "",
    ...books,
    "",
    "## Optional",
    "",
    `- [All destinations](${SITE_URL}/articles): browse guides by experience or region`,
    `- [Contact and FAQ](${SITE_URL}/contact)`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
