"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaChevronDown, FaXmark } from "react-icons/fa6";
import { NAV, NAV_CTA, SITE_NAME, isActivePath, type NavItem, type NavLink } from "@/lib/site";

const isGroup = (item: NavItem): item is { label: string; children: NavLink[] } => "children" in item;

// Solid navy bar on every page (white text stays readable over any hero photo).
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // On phones the bar slides away while scrolling down and comes back on scroll up.
  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setHidden(phone.matches && y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerHidden = hidden && !menuOpen;
  // Lets other sticky bars follow the header (see --header-offset in globals.css).
  useEffect(() => {
    document.documentElement.toggleAttribute("data-header-hidden", headerHidden);
  }, [headerHidden]);

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

  const active = (item: NavItem) =>
    isGroup(item) ? item.children.some((c) => isActivePath(pathname, c.href)) : isActivePath(pathname, item.href);

  return (
    <header
      className={`sticky top-0 z-50 bg-ocean-900 text-white [&_:focus-visible]:outline-white shadow-[0_1px_0_rgb(255_255_255/0.08)] transition-transform duration-150 ${
        headerHidden ? "-translate-y-full" : ""
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="" width={40} height={40} className="h-10 w-10" />
          <span className="font-display text-xl font-semibold">{SITE_NAME}</span>
          <span className="sr-only">home</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="relative">
                {isGroup(item) ? (
                  <NavDropdown item={item} active={active(item)} pathname={pathname} />
                ) : (
                  <Link href={item.href} aria-current={active(item) ? "page" : undefined} className={topLinkClass(active(item))}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={NAV_CTA.href}
            aria-current={isActivePath(pathname, NAV_CTA.href) ? "page" : undefined}
            className="ml-3 inline-flex min-h-10 items-center rounded-control border border-white/70 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-ocean-900 aria-[current=page]:bg-white aria-[current=page]:text-ocean-900"
          >
            {NAV_CTA.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/15 md:hidden"
        >
          {menuOpen ? <FaXmark className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto [&_a:focus-visible]:outline-ink border-t border-white/10 bg-sand-50 text-ocean-900 md:hidden"
      >
        <div className="flex min-h-full flex-col px-4 py-4 sm:px-6">
          <ul className="flex flex-col divide-y divide-sand-200">
            {NAV.map((item) =>
              isGroup(item) ? (
                <li key={item.label} className="py-3">
                  <p className={`-mx-4 border-l-4 px-4 py-1 font-display text-2xl sm:-mx-6 sm:px-6 ${active(item) ? "border-action" : "border-transparent"}`}>
                    {item.label}
                  </p>
                  <ul className="mt-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <MobileLink link={c} active={isActivePath(pathname, c.href)} indent />
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <MobileLink link={item} active={active(item)} />
                </li>
              ),
            )}
          </ul>
          <Link
            href={NAV_CTA.href}
            className="mt-auto flex min-h-12 w-full items-center justify-center rounded-control border-2 border-ocean-900 px-5 text-base font-semibold text-ocean-900 transition-colors hover:bg-ocean-900 hover:text-white"
          >
            {NAV_CTA.label}
          </Link>
        </div>
      </div>
    </header>
  );
}

function topLinkClass(active: boolean) {
  return `relative inline-flex min-h-11 items-center gap-1.5 px-3.5 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-0.5 after:transition-colors ${
    active ? "text-white after:bg-action" : "text-white/90 after:bg-transparent hover:text-white hover:after:bg-white/50"
  }`;
}

function MobileLink({ link, active, indent = false }: { link: NavLink; active: boolean; indent?: boolean }) {
  return (
    <Link
      href={link.href}
      aria-current={active ? "page" : undefined}
      className={`-mx-4 block border-l-4 px-4 transition-colors sm:-mx-6 sm:px-6 ${
        indent ? "py-2.5 pl-10 text-lg sm:pl-12" : "py-4 font-display text-2xl"
      } ${active ? "border-action bg-sand-100" : "border-transparent hover:bg-sand-100"}`}
    >
      {link.label}
    </Link>
  );
}

// Disclosure dropdown: button with aria-expanded; Escape, outside click and tabbing away close it.
function NavDropdown({ item, active, pathname }: { item: { label: string; children: NavLink[] }; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Arrow keys move between the links; ArrowDown on the button opens the menu at the first link.
  const links = () => Array.from(wrap.current?.querySelectorAll<HTMLAnchorElement>("[data-dropdown-link]") ?? []);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => links()[0]?.focus());
      return;
    }
    const list = links();
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    const next = e.key === "ArrowDown" ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
    list[next]?.focus();
  };

  return (
    <div
      ref={wrap}
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={topLinkClass(active)}
      >
        {item.label}
        <FaChevronDown aria-hidden className={`h-3 w-3 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="absolute left-0 top-full z-50 mt-1 [&_a:focus-visible]:outline-ink min-w-48 overflow-hidden rounded-card border border-sand-200 bg-white py-2 text-ocean-900 shadow-card-hover"
      >
        {item.children.map((c) => {
          const on = isActivePath(pathname, c.href);
          return (
            <li key={c.href}>
              <Link
                data-dropdown-link
                href={c.href}
                aria-current={on ? "page" : undefined}
                className={`block border-l-4 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-sand-100 focus-visible:outline-offset-[-4px] ${
                  on ? "border-action bg-sand-100" : "border-transparent"
                }`}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
