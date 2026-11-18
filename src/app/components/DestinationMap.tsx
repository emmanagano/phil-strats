"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ArticleSummary } from "@/data/articles";
import { ISLAND_GROUPS } from "@/data/taxonomy";
import { PH_MAP, project, type IslandGroupKey } from "@/lib/map";
import ArticleCard from "@/app/components/ui/ArticleCard";

const [, , FULL_W, FULL_H] = PH_MAP.viewBox;
const ASPECT = FULL_W / FULL_H;

// The view box around an island group. Its shape follows the group (tall Luzon, wide Mindanao),
// kept between the whole country's proportions and a slightly wide box so no region renders tiny.
function zoomBox(key: IslandGroupKey | "") {
  if (!key) return [0, 0, FULL_W, FULL_H] as const;
  const [x0, y0, x1, y1] = PH_MAP.bbox[key];
  const pad = 24;
  let w = x1 - x0 + pad * 2;
  let h = y1 - y0 + pad * 2;
  const maxAspect = 1.25;
  if (w / h < ASPECT) w = h * ASPECT;
  else if (w / h > maxAspect) h = w / maxAspect;
  return [(x0 + x1) / 2 - w / 2, (y0 + y1) / 2 - h / 2, w, h] as const;
}

// Interactive map for /articles?view=map: island groups filter by region (and zoom in),
// pins open the guide's card in the side panel. Only the guides passed in are shown.
export default function DestinationMap({
  articles,
  region,
  onRegion,
}: {
  articles: ArticleSummary[];
  region: string;
  onRegion: (slug: string) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgWidth, setSvgWidth] = useState(FULL_W);

  const groupKey = (ISLAND_GROUPS.some((g) => g.slug === region) ? region : "") as IslandGroupKey | "";
  const [vx, vy, vw, vh] = zoomBox(groupKey);
  // Screen pixels per map unit: pin sizes are set in pixels and converted, so they stay tappable at any zoom.
  const px = svgWidth / vw;
  const u = (pixels: number) => pixels / px;

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSvgWidth(entry.contentRect.width || FULL_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clear the selection when its guide is filtered out; Escape also clears it.
  useEffect(() => {
    if (active && !articles.some((a) => a.slug === active)) setActive(null);
  }, [articles, active]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Project pins, then fan out ones that would sit on top of each other (e.g. the two Sagada guides).
  const pins = useMemo(() => {
    const placed: { a: ArticleSummary; x: number; y: number }[] = [];
    for (const a of articles) {
      if (!a.coordinates) continue;
      let { x, y } = project(a.coordinates);
      const near = placed.filter((p) => Math.hypot(p.x - x, p.y - y) < u(14));
      if (near.length) {
        const angle = (near.length * Math.PI * 2) / 6 - Math.PI / 2;
        x += Math.cos(angle) * u(14);
        y += Math.sin(angle) * u(14);
      }
      placed.push({ a, x, y });
    }
    return placed;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, px]);

  const selected = articles.find((a) => a.slug === active) ?? null;
  const byName = [...pins].sort((p, q) => p.a.cardTitle.localeCompare(q.a.cardTitle));
  // On phones the card sits below the map, so bring it into view when a pin is picked.
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (active && window.matchMedia("(max-width: 767px)").matches) {
      panelRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [active]);
  const pressKey = (fn: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
      <div>
        <svg
          ref={svgRef}
          viewBox={`${vx} ${vy} ${vw} ${vh}`}
          role="group"
          aria-label="Map of the Philippines with destination guides"
          className="mx-auto block h-auto w-full max-w-[34rem] rounded-card border border-sand-200 bg-white"
        >
          {/* Sea: clicking it closes the open card. */}
          <rect x={vx} y={vy} width={vw} height={vh} className="fill-white" onClick={() => setActive(null)} />
          {ISLAND_GROUPS.map((g) => {
            const key = g.slug as IslandGroupKey;
            const on = groupKey === key;
            const dim = groupKey && !on;
            return (
              <path
                key={key}
                d={PH_MAP.groups[key]}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={on ? `${g.label} (selected). Show all regions` : `Show ${g.label}`}
                onClick={() => onRegion(on ? "" : key)}
                onKeyDown={pressKey(() => onRegion(on ? "" : key))}
                strokeWidth={u(on ? 1.5 : 0.75)}
                className={`cursor-pointer outline-none transition-colors duration-150 focus-visible:fill-sand-300 ${
                  on ? "fill-sand-200 stroke-ocean-900" : "fill-sand-200 stroke-sand-300 hover:fill-sand-300"
                } ${dim ? "opacity-40" : ""}`}
              />
            );
          })}
          {pins.map(({ a, x, y }) => {
            const on = a.slug === active;
            const label = `${a.cardTitle}, ${a.area}`;
            return (
              <g
                key={a.slug}
                role="button"
                tabIndex={0}
                aria-label={label}
                aria-pressed={on}
                onClick={() => setActive(on ? null : a.slug)}
                onKeyDown={pressKey(() => setActive(on ? null : a.slug))}
                className="group cursor-pointer outline-none"
              >
                <title>{label}</title>
                {/* Invisible 44px tap target. */}
                <circle cx={x} cy={y} r={u(22)} className="fill-transparent" />
                <circle
                  cx={x}
                  cy={y}
                  r={u(13)}
                  className="fill-none stroke-ocean-900 opacity-0 group-focus-visible:opacity-100"
                  strokeWidth={u(2)}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={u(on ? 8 : 6)}
                  className="fill-ocean-900 stroke-white transition-colors duration-150 group-hover:fill-ocean-700"
                  strokeWidth={u(on ? 3 : 2)}
                />
              </g>
            );
          })}
          {/* Name label for the open pin, drawn last so it sits on top. */}
          {pins
            .filter((p) => p.a.slug === active)
            .map(({ a, x, y }) => {
              // Near the right edge the label goes to the left of the pin so it isn't cut off.
              const flip = x > vx + vw * 0.62;
              return (
              <text
                key={a.slug}
                x={flip ? x - u(12) : x + u(12)}
                y={y + u(5)}
                textAnchor={flip ? "end" : "start"}
                fontSize={u(14)}
                strokeWidth={u(4)}
                className="pointer-events-none fill-ocean-900 stroke-white font-sans font-semibold [paint-order:stroke]"
              >
                {a.cardTitle}
              </text>
              );
            })}
        </svg>
        <p className="mx-auto mt-3 max-w-[34rem] text-sm text-muted">
          Tap a region to zoom in, or a pin to see the guide. Simplified outline; pins mark each guide&apos;s main town or spot.
        </p>
      </div>

      <aside ref={panelRef} aria-live="polite" className="md:sticky md:top-40 md:self-start">
        {selected ? (
          <div>
            <ArticleCard article={selected} />
            <button type="button" onClick={() => setActive(null)} className="mt-3 min-h-11 text-sm font-semibold link">
              Close
            </button>
          </div>
        ) : (
          <div>
            <p className="eyebrow">On the map</p>
            <p className="mt-2 text-muted">
              {pins.length} {pins.length === 1 ? "guide" : "guides"}. Pick a pin or a name below.
            </p>
            <ul className="mt-4 max-h-[28rem] divide-y divide-sand-200 overflow-y-auto border-y border-sand-200">
              {byName.map(({ a }) => (
                <li key={a.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(a.slug)}
                    className="flex min-h-11 w-full items-baseline justify-between gap-3 py-2 text-left text-ocean-900 hover:underline"
                  >
                    <span className="font-medium">{a.cardTitle}</span>
                    <span className="shrink-0 text-sm text-muted">{a.area}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
