import Link from "next/link";
import { formatNewsDate } from "@/lib/newsTone";

// Compact photo story card for previews of Showbiz and Sports (home page and elsewhere).
// Photo on top (4:3) with the topic tag, then date and headline. The whole card is the link.
export default function StoryTile({
  href,
  image,
  tag,
  tagTone,
  date,
  title,
}: {
  href: string;
  image: { src: string; alt: string };
  tag: string;
  tagTone: string;
  date: string;
  title: string;
}) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sand-200">
        <img src={image.src} alt={image.alt} loading="lazy" className="photo-pop h-full w-full object-cover" />
        <span className={`absolute left-0 top-3 px-2.5 py-1 text-xs font-bold uppercase tracking-widest ${tagTone}`}>{tag}</span>
      </div>
      <time dateTime={date} className="mt-3 block text-sm text-muted">
        {formatNewsDate(date)}
      </time>
      <h3 className="mt-1 text-xl font-semibold leading-snug text-ocean-900 group-hover:underline">
        <Link
          href={href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-ink"
        >
          {title}
        </Link>
      </h3>
    </article>
  );
}

// One-line headline row: date, then the title as a link. Used under a StoryTile and in news lists.
export function MiniHeadline({ href, date, title, tag }: { href: string; date: string; title: string; tag?: string }) {
  return (
    <li>
      <Link href={href} className="group block py-3">
        <span className="block text-sm text-muted">
          {tag && <span className="font-semibold text-ocean-900">{tag} · </span>}
          {formatNewsDate(date, "short")}
        </span>
        <span className="mt-0.5 block font-semibold leading-snug text-ocean-900 group-hover:underline">{title}</span>
      </Link>
    </li>
  );
}
