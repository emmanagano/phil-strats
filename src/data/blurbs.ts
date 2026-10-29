import rawBlurbs from "./blurbs.json";

export interface Blurb {
  title: string;
  date: string;
  article_title: string;
  article_link: string;
  commentary: string;
  source: string;
}

// Newest first, with the source site's domain for display.
export const blurbs: Blurb[] = rawBlurbs
  .map((b) => ({
    ...b,
    source: new URL(b.article_link).hostname.replace(/^www\./, ""),
  }))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getLatestBlurb() {
  return blurbs[0] ?? null;
}
