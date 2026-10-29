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
        className={`min-w-0 flex-1 rounded-full px-5 py-3.5 text-base outline-none transition focus:ring-2 ${
          dark
            ? "bg-white/10 text-white placeholder:text-white/60 ring-1 ring-white/20 focus:ring-mango-400"
            : "bg-white text-ocean-900 placeholder:text-muted ring-1 ring-sand-200 focus:ring-lagoon-600"
        }`}
      />
      <button
        type="submit"
        className={`rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
          dark
            ? "bg-mango-400 text-ocean-900 hover:bg-white"
            : "bg-lagoon-700 text-white hover:bg-ocean-900"
        }`}
      >
        Subscribe
      </button>
    </form>
  );
}
