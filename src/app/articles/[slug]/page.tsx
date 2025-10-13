import "../article.css";
import { getArticleBySlug, articles } from "@/data/articles";
import Author from "@/app/components/Author";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPost({ params }: any) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }
  const contentHtml = article.content;

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = articles[currentIndex - 1] || null;
  const nextArticle = articles[currentIndex + 1] || null;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <section className="max-w-3xl mx-auto px-6">
        <div className="flex justify-between items-center gap-4 text-sm border-b border-gray-300 pb-6 mb-8">
          {prevArticle ? (
            <a
              href={`/articles/${prevArticle.slug}`}
              className="flex items-center text-[#111828] hover:underline"
            >
              <FaArrowLeft className="mr-1" />
              Previous Article
            </a>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <a
              href={`/articles/${nextArticle.slug}`}
              className="flex items-center text-[#111828] hover:underline"
            >
              Next Article
              <FaArrowRight className="ml-1" />
            </a>
          ) : (
            <div />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <Author date={article.date} />
        <img
          src={`/images/${article.slug}.jpg`}
          alt={article.alt}
          className="w-full h-[500px] object-cover mb-6"
        />
        <p className="text-base text-gray-700 mb-6">{article.description}</p>
        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <div className="flex justify-between items-center gap-4 text-sm border-t border-gray-300 pt-6 mt-12">
          {prevArticle ? (
            <a
              href={`/articles/${prevArticle.slug}`}
              className="flex items-center text-[#111828] hover:underline"
            >
              <FaArrowLeft className="mr-1" />
              Previous Article
            </a>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <a
              href={`/articles/${nextArticle.slug}`}
              className="flex items-center text-[#111828] hover:underline"
            >
              Next Article
              <FaArrowRight className="ml-1" />
            </a>
          ) : (
            <div />
          )}
        </div>
        {article.faq && article.faq.length > 0 && <FAQ faq={article.faq} />}{" "}
        {article.category && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Related Articles
            </h2>
            <ul className="space-y-4">
              {articles
                .filter(
                  (a) =>
                    a.category === article.category && a.slug !== article.slug
                )
                .slice(0, 3)
                .map((related) => (
                  <li key={related.slug}>
                    <a
                      href={`/articles/${related.slug}`}
                      className="text-blue-600 hover:underline text-lg font-medium"
                    >
                      {related.title}
                    </a>
                    <p className="text-sm text-gray-500">
                      {related.description}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import FAQ from "@/app/components/article/FAQ";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | Philippine Strategies",
      description: "This article could not be found.",
    };
  }

  return {
    metadataBase: new URL("https://philippinestrategies.com"),
    title: `${article.title} | Philippine Strategies`,
    description: article.description,
    authors: [{ name: "Robert T. Wagner" }],
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://philippinestrategies.com/articles/${article.slug}`,
      images: [
        {
          url: `/images/${article.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: article.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`/images/${article.slug}.jpg`],
    },
  };
}
