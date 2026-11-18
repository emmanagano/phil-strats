import { NEWSLETTER_ACTION } from "@/lib/site";

export default function NewsletterForm({
  id,
  tone = "light",
  className = "",
}: {
  id: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <form
      action={NEWSLETTER_ACTION}
      method="post"
      target="_blank"
      className={`flex w-full flex-col gap-3 sm:flex-row ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        className={`min-h-12 min-w-0 flex-1 rounded-control px-4 py-3 text-base outline-none transition focus:ring-2 ${
          dark
            ? "bg-white/10 text-white placeholder:text-white/60 ring-1 ring-white/30 backdrop-blur-md focus:ring-white"
            : "bg-white text-ocean-900 placeholder:text-muted ring-1 ring-sand-200 focus:ring-ink"
        }`}
      />
      <button
        type="submit"
        className={`min-h-12 rounded-control px-6 py-3 text-sm font-semibold transition-colors ${
          dark
            ? "bg-action text-white hover:bg-action-strong"
            : "bg-action text-white hover:bg-action-strong"
        }`}
      >
        Subscribe
      </button>
    </form>
  );
}
