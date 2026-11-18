import type { Book } from "@/data/books";
import { COVER_TONE } from "@/lib/bookTone";

// A designed, typographic cover in a flat palette color (modern covers are copyrighted).
// Books with a freely licensed `image` (e.g. a public-domain first edition) show that instead.
export default function BookCover({
  book,
  size = "md",
  className = "",
}: {
  book: Pick<Book, "title" | "author" | "year" | "cover" | "image" | "coverImage">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const t = COVER_TONE[book.cover];
  // One long unbroken word (e.g. "ABNKKBSNPLAko?!") gets a step smaller so it doesn't split mid-word.
  const longWord = Math.max(...book.title.split(/\s+/).map((w) => w.length)) > 11;
  const title = longWord
    ? { sm: "text-sm", md: "text-lg sm:text-xl", lg: "text-2xl sm:text-3xl" }[size]
    : { sm: "text-base", md: "text-xl sm:text-2xl", lg: "text-3xl sm:text-4xl" }[size];
  const pad = { sm: "p-3", md: "p-4 sm:p-5", lg: "p-6 sm:p-8" }[size];

  const src = book.coverImage ?? book.image?.src;
  if (src) {
    return (
      <div className={`relative aspect-[2/3] overflow-hidden rounded-control bg-sand-200 shadow-card ${className}`}>
        <img
          src={src}
          alt={book.image?.alt ?? `Cover of ${book.title} by ${book.author}`}
          loading="lazy"
          decoding="async"
          width={400}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Cover: ${book.title} by ${book.author}`}
      className={`relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-control shadow-card ${t.bg} ${t.text} ${pad} ${className}`}
    >
      {/* Spine shadow: a flat darker strip, not a gradient. */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-black/15" />
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${t.muted}`}>{book.author}</p>
      <div>
        <span aria-hidden className={`mb-3 block h-1 w-8 ${t.rule}`} />
        <p className={`font-display font-semibold leading-[1.05] break-words ${title}`}>{book.title}</p>
      </div>
      <p className={`text-xs font-semibold tracking-widest ${t.muted}`}>{book.year}</p>
    </div>
  );
}
