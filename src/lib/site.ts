export const SITE_URL = "https://philippinestrategies.netlify.app";
export const SITE_NAME = "Phil Strats";
export const SITE_TAGLINE = "Discover the Philippines, one island at a time";
export const SITE_DESCRIPTION =
  "Interactive travel guides to the Philippines: when to go, how to get there, and what it really costs, one island at a time.";
export const AUTHOR = "Emma Nagano";
export const DEFAULT_OG_IMAGE = "/images/el-nido-palawan-og.jpg";

/** Search results cut titles off near 60 characters; drop the brand suffix when it would push a title past that. */
export function pageTitle(title: string): string | { absolute: string } {
  return `${title} | ${SITE_NAME}`.length > 60 ? { absolute: title } : title;
}

export const SOCIALS = {
  instagram: "https://www.instagram.com/xxo.emmy",
  x: "https://x.com/emsnagano",
};

export const NEWSLETTER_ACTION =
  "https://buttondown.email/api/emails/embed-subscribe/philippinestrategies";

// Every main page, in order. The footer's "Explore" column and the sitemap read this list.
export const PAGES = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/articles" },
  { label: "News", href: "/news" },
  { label: "Showbiz", href: "/showbiz" },
  { label: "Sports", href: "/sports" },
  { label: "Books", href: "/books" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; children: NavLink[] };

// Header navigation: a short top level, with the story sections grouped under "Stories".
// The logo links home; Newsletter is the Subscribe button (NAV_CTA); Contact lives in the footer.
export const NAV: NavItem[] = [
  { label: "Destinations", href: "/articles" },
  {
    label: "Stories",
    children: [
      { label: "News", href: "/news" },
      { label: "Showbiz", href: "/showbiz" },
      { label: "Sports", href: "/sports" },
    ],
  },
  { label: "Books", href: "/books" },
];

export const NAV_CTA: NavLink = { label: "Subscribe", href: "/newsletter" };

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
