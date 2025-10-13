import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Get the path to the articles folder
const articlesDir = path.join(process.cwd(), "src/content");

// Get all markdown files from /content
export function getAllArticles() {
    const files = fs.readdirSync(articlesDir).filter((filename) => {
        const filePath = path.join(articlesDir, filename);
        return fs.statSync(filePath).isFile();
    });

    return files
        .map((filename) => {
            const filePath = path.join(articlesDir, filename);
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);

            return {
                id: data.id || 0, // Defaults to 0 if no id
                title: data.title,
                description: data.description,
                date: data.date,
                slug: data.slug,
                region: data.region,
                category: data.category || "all-article",
                tags: data.tags || [],
                alt: data.alt || "",
                faq: data.faq
            };
        })
        .sort((a, b) => b.id - a.id); // Sort in descending order
}

// Get a single article by slug
export async function getArticleBySlug(slug: string) {
    const filePath = path.join(articlesDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const htmlContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);

    return {
        title: data.title,
        description: data.description,
        date: data.date,
        slug: data.slug,
        region: data.region,
        tags: data.tags || [],
        category: data.category || "all-article",
        alt: data.alt || "",
        faq: data.faq,
        content: String(htmlContent),
    };
}

export const articles = getAllArticles();
