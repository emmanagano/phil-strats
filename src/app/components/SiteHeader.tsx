"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NAV, SITE_NAME, isActivePath } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Pages with a full-screen image hero (home and articles) float the header over it until you scroll.
  const hasImageHero = pathname === "/" || pathname.startsWith("/articles/");
  const overHero = hasImageHero && !scrolled && !menuOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-150 ${
        scrolled || menuOpen
          ? "bg-sand-50/90 shadow-[0_1px_0_rgb(11_46_58/0.08)] backdrop-blur-lg"
          : overHero
            ? "bg-ocean-950/35 backdrop-blur-md"
            : "bg-sand-50/0"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span
            className={`font-display text-xl font-semibold transition-colors ${
              overHero ? "text-white" : "text-ocean-900"
            }`}
          >
            {SITE_NAME}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block px-3.5 py-2.5 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:transition-colors ${
                    active
                      ? overHero
                        ? "text-white after:bg-mango-400"
                        : "text-ocean-900 after:bg-coral-500"
                      : overHero
                        ? "text-white/85 after:bg-transparent hover:text-white hover:after:bg-white/50"
                        : "text-ocean-800 after:bg-transparent hover:text-lagoon-700 hover:after:bg-lagoon-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className={`-mr-2 grid h-11 w-11 place-items-center rounded-full transition lg:hidden ${
            overHero ? "text-white hover:bg-white/15" : "text-ocean-900 hover:bg-lagoon-100"
          }`}
        >
          {menuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-sand-200 bg-sand-50 lg:hidden"
      >
        <ul className="flex flex-col divide-y divide-sand-200 px-4 py-4 sm:px-6">
          {NAV.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`-mx-4 block border-l-4 px-4 py-4 font-display text-2xl transition-colors sm:-mx-6 sm:px-6 ${
                    active ? "border-coral-500 bg-sand-100 text-ocean-900" : "border-transparent text-ocean-900 hover:bg-sand-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
