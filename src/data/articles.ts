import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCategory, getIslandGroup } from "./taxonomy";

const articlesDir = path.join(process.cwd(), "src/content");
const imagesDir = path.join(process.cwd(), "public/images");

export interface FAQItem {
  question: string;
  answer: string;
}

// Everything except the rendered body; safe to pass to client components.
export interface ArticleSummary {
  id: number;
  title: string;
  description: string;
  date: string;
  updated: string;
  slug: string;
  region: string;
  category: string;
  categoryLabel: string;
  islandGroup: string;
  islandGroupLabel: string;
  tags: string[];
  alt: string;
  image: string;
  imageSmall: string;
  imageOg: string;
  wordCount: number;
  readingTime: number;
  faq: FAQItem[];
}

export interface TocItem {
  id: string;
  text: string;
}

export interface Article extends ArticleSummary {
  content: string;
  toc: TocItem[];
}

function readArticleFile(filename: string) {
  const fileContents = fs.readFileSync(path.join(articlesDir, filename), "utf8");
  const { data, content } = matter(fileContents);
  const expectedSlug = filename.replace(/\.md$/, "");

  // Fail the build early on bad frontmatter instead of rendering a broken page.
  const problems: string[] = [];
  if (data.slug !== expectedSlug) problems.push(`slug "${data.slug}" should be "${expectedSlug}"`);
  const category = getCategory(data.category);
  if (!category) problems.push(`unknown category "${data.category}"`);
  const islandGroup = getIslandGroup(data.islandGroup);
  if (!islandGroup) problems.push(`unknown islandGroup "${data.islandGroup}"`);
  if (!fs.existsSync(path.join(imagesDir, `${expectedSlug}.jpg`))) {
    problems.push(`missing image public/images/${expectedSlug}.jpg`);
  }
  for (const img of [`${expectedSlug}-800.jpg`, `${expectedSlug}-og.jpg`]) {
    if (!fs.existsSync(path.join(imagesDir, img))) problems.push(`missing image public/images/${img} (run npm run images)`);
  }
  // Soft SEO checks: warn, never fail the build.
  const warnings: string[] = [];
  if (String(data.title ?? "").length > 60) warnings.push(`title is ${data.title.length} chars (aim for 60 or fewer)`);
  const descLen = String(data.description ?? "").length;
  if (descLen < 120 || descLen > 160) warnings.push(`description is ${descLen} chars (aim for 120-160)`);
  if (!data.alt) warnings.push("missing alt text");
  if (/\b20\d\d\b/.test(`${data.title} ${data.description}`)) warnings.push("title/description hardcodes a year");
  if (warnings.length > 0) console.warn(`[seo] src/content/${filename}: ${warnings.join("; ")}`);
  if (problems.length > 0) {
    throw new Error(`src/content/${filename}: ${problems.join("; ")}`);
  }

  const words = content.trim().split(/\s+/).length;
  const summary: ArticleSummary = {
    id: data.id || 0,
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || data.date,
    slug: expectedSlug,
    region: data.region,
    category: category!.slug,
    categoryLabel: category!.label,
    islandGroup: islandGroup!.slug,
    islandGroupLabel: islandGroup!.label,
    tags: data.tags || [],
    alt: data.alt || data.title,
    image: `/images/${expectedSlug}.jpg`,
    imageSmall: `/images/${expectedSlug}-800.jpg`,
    imageOg: `/images/${expectedSlug}-og.jpg`,
    wordCount: words,
    readingTime: Math.max(1, Math.round(words / 200)),
    faq: data.faq || [],
  };
  return { summary, content };
}

function markdownFiles() {
  return fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
}

// Newest (highest id) first.
export function getAllArticles(): ArticleSummary[] {
  return markdownFiles()
    .map((f) => readArticleFile(f).summary)
    .sort((a, b) => b.id - a.id);
}

type HastNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { id?: string };
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

// Collects the h2 headings (already given ids by rehype-slug) for the table of contents.
function collectToc(toc: TocItem[]) {
  return () => (tree: HastNode) => {
    for (const node of tree.children ?? []) {
      if (node.type === "element" && node.tagName === "h2" && node.properties?.id) {
        toc.push({ id: node.properties.id, text: textOf(node).replace(/:\s*$/, "") });
      }
    }
  };
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filename = `${slug}.md`;
  if (!fs.existsSync(path.join(articlesDir, filename))) return null;

  const { summary, content } = readArticleFile(filename);
  const toc: TocItem[] = [];
  const html = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(collectToc(toc))
    .use(rehypeStringify)
    .process(content);

  return { ...summary, content: String(html), toc };
}
