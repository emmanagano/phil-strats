import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { CATEGORIES, ISLAND_GROUPS } from "@/data/taxonomy";
import { NAV, SITE_NAME, SITE_TAGLINE, SOCIALS } from "@/lib/site";
import NewsletterForm from "./ui/NewsletterForm";

const linkClass = "text-sand-200 transition-colors hover:text-mango-400";

export default function SiteFooter() {
  return (
    <footer className="bg-ocean-950 text-sand-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-2xl font-semibold text-white">{SITE_NAME}</span>
          </Link>
          <p className="mt-4 max-w-sm text-sand-200">
            {SITE_TAGLINE}. Island guides, heritage walks, and honest travel tips — new
            stories every week.
          </p>
          <NewsletterForm id="footer-newsletter" tone="dark" className="mt-6 max-w-md" />
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
          <FooterColumn title="Explore">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Experiences">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/articles?category=${c.slug}`} className={linkClass}>
                  {c.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Regions">
            {ISLAND_GROUPS.map((g) => (
              <li key={g.slug}>
                <Link href={`/articles?region=${g.slug}`} className={linkClass}>
                  {g.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-sand-300 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-3">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-mango-400 hover:text-ocean-900"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href={SOCIALS.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="rounded-full bg-white/10 p-2.5 transition hover:bg-mango-400 hover:text-ocean-900"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mango-400">
        {title}
      </h2>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
