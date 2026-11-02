import type { MetadataRoute } from "next";
import { getAllArticles } from "@/data/articles";
import { NAV, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const all = getAllArticles();
  const latest = all.map((a) => a.updated).sort().at(-1);
  const pages = NAV.map((item) => ({
    ...(item.href === "/" || item.href === "/articles" ? { lastModified: latest } : {}),
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const articles = all.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.updated,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
