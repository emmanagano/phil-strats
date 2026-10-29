export const SITE_URL = "https://philippinestrategies.netlify.app";
export const SITE_NAME = "Phil Strats";
export const SITE_TAGLINE = "Discover the Philippines, one island at a time";
export const SITE_DESCRIPTION =
  "Your travel and culture guide to the Philippines — hidden islands, heritage towns, and authentic local experiences.";
export const AUTHOR = "Emma Nagano";

export const SOCIALS = {
  instagram: "https://www.instagram.com/xxo.emmy",
  x: "https://x.com/emsnagano",
};

export const NEWSLETTER_ACTION =
  "https://buttondown.email/api/emails/embed-subscribe/philippinestrategies";

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/articles" },
  { label: "Blurbs", href: "/blurbs" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
] as const;

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
