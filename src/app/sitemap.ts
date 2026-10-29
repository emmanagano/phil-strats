import type { MetadataRoute } from "next";
import { getAllArticles } from "@/data/articles";
import { NAV, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = NAV.map((item) => ({
    url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "weekly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const articles = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles];
}
