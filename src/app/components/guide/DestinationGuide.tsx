"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  FaBed,
  FaBowlFood,
  FaCalendarDays,
  FaCheck,
  FaCopy,
  FaHeart,
  FaMinus,
  FaMoneyBillWave,
  FaArrowUpRightFromSquare,
  FaPlaneArrival,
  FaPlus,
  FaRegClock,
  FaRegHeart,
  FaRoute,
  FaSuitcaseRolling,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import {
  MONTHS,
  RATING_LABEL,
  liveFaresUrl,
  STYLE_LABEL,
  peso,
  type BudgetStyleKey,
  type Guide,
  type MonthRating,
} from "@/lib/guide";
import { useStoredState } from "./useStoredState";
import { plural } from "@/lib/format";

const SECTIONS = [
  { id: "at-a-glance", label: "At a glance" },
  { id: "when-to-go", label: "When to go" },
  { id: "getting-there", label: "Getting there" },
  { id: "budget", label: "Budget" },
  { id: "things-to-do", label: "Things to do" },
  { id: "itinerary", label: "Itinerary" },
  { id: "stay-and-eat", label: "Stay & eat" },
  { id: "before-you-go", label: "Before you go" },
  { id: "your-plan", label: "Your plan" },
];

// Month rating colors: a bar on each month in the picker, and the accent on the detail.
const RATING_BAR: Record<MonthRating, string> = {
  great: "bg-good",
  good: "bg-good-soft",
  mixed: "bg-sand-300",
  avoid: "bg-ocean-700",
};

const RATING_BORDER: Record<MonthRating, string> = {
  great: "border-good",
  good: "border-good-soft",
  mixed: "border-sand-300",
  avoid: "border-ocean-700",
};

/* Shared control styles. Segmented controls are one bordered strip with dividers;
   `.seg` (globals.css) moves the focus ring inside so the strip can clip. */
// Nights slider range. 1 covers day trips, so the default stay is rarely pinned to the left edge.
const MIN_NIGHTS = 1;
const MAX_NIGHTS = 14;

const SEG = "seg flex w-full overflow-hidden rounded-control border sm:inline-flex sm:w-auto";
const SEG_LIGHT = `${SEG} border-ocean-900/25 bg-white divide-x divide-ocean-900/15`;
// Selected = solid ink; yellow is reserved for Tip callouts.
const segBtn = (on: boolean) =>
  `min-h-11 flex-1 px-2.5 py-2 text-sm font-semibold leading-tight transition-colors sm:flex-none sm:px-4 ${
    on ? "bg-ocean-900 text-white" : "text-ocean-800 hover:bg-sand-100"
  }`;
// Small toggle chips (filters): crisp rectangles, same family as the segmented controls.
const chip = (on: boolean) =>
  `min-h-11 rounded-control border px-3.5 text-sm font-medium capitalize transition sm:min-h-10 ${
    on
      ? "border-ocean-900 bg-ocean-900 text-white"
      : "border-sand-300 bg-white text-ocean-800 hover:border-ocean-900 hover:text-ocean-900"
  }`;
// Small uppercase field labels (12px floor for uppercase text).
const LABEL = "text-xs font-bold uppercase tracking-widest text-muted";

// Arrow-key support for tablists and radio groups (roving tabindex, automatic activation).
function onArrowKeys(e: React.KeyboardEvent<HTMLElement>, index: number, count: number, select: (i: number) => void) {
  const keys: Record<string, number> = {
    ArrowRight: index + 1,
    ArrowDown: index + 1,
    ArrowLeft: index - 1,
    ArrowUp: index - 1,
    Home: 0,
    End: count - 1,
  };
  if (!(e.key in keys)) return;
  e.preventDefault();
  const next = (keys[e.key] + count) % count;
  select(next);
  const items = e.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"], [role="radio"]');
  items?.[next]?.focus();
}

export default function DestinationGuide({ guide, slug, place }: { guide: Guide; slug: string; place: string }) {
  const k = (name: string) => `guide:${slug}:${name}`;
  const uid = useId();
  const itineraryKeys = Object.keys(guide.itineraries).sort((a, b) => Number(a) - Number(b));
  const firstGreat = Math.max(0, guide.months.findIndex((m) => m.rating === "great"));

  const [month, setMonth] = useStoredState<number | null>(k("month"), null);
  const [style, setStyle] = useStoredState<BudgetStyleKey>(k("style"), "midrange");
  const [days, setDays] = useStoredState<string>(k("days"), itineraryKeys[Math.floor(itineraryKeys.length / 2)] ?? "3");
  const [travelers, setTravelers] = useStoredState<number>(k("travelers"), 2);
  const [saved, setSaved] = useStoredState<string[]>(k("saved"), []);
  const [packed, setPacked] = useStoredState<string[]>(k("packed"), []);
  const [touchedBudget, setTouchedBudget] = useStoredState<boolean>(k("budget-set"), false);
  const [pickedDays, setPickedDays] = useStoredState<boolean>(k("days-set"), false);

  const steps = [
    { label: "Pick a month", done: month !== null, href: "#when-to-go" },
    { label: "Set your budget", done: touchedBudget, href: "#budget" },
    { label: "Save things to do", done: saved.length > 0, href: "#things-to-do" },
    { label: "Choose trip length", done: pickedDays, href: "#itinerary" },
    { label: "Pack your bag", done: packed.length > 0, href: "#before-you-go" },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  const nights = Number(days) || 3;
  // The longest itinerary that fits the chosen length (or the shortest one).
  const itineraryKey = [...itineraryKeys].reverse().find((key) => Number(key) <= nights) ?? itineraryKeys[0];
  const itineraryIndex = Math.max(0, itineraryKeys.indexOf(itineraryKey));
  const s = guide.budget.styles[style];
  const perDay = s.stay + s.food + s.transport + s.activities;
  // Rooms are shared, so stay cost is per room (2 people per room).
  const rooms = Math.ceil(travelers / 2);
  const total = (s.stay * rooms + (s.food + s.transport + s.activities) * travelers) * nights;
  const currentMonth = month ?? firstGreat;
  const bestMonths = guide.months
    .map((x, i) => (x.rating === "great" ? MONTHS[i] : null))
    .filter(Boolean)
    .join(", ");
  const styleKeys = Object.keys(STYLE_LABEL) as BudgetStyleKey[];
  const pickDays = (key: string) => {
    setDays(key);
    setPickedDays(true);
  };

  return (
    <>
      <GuideNav steps={steps} doneCount={doneCount} />

      {/* Wide gaps between the intro and the three chapters; tighter spacing inside each chapter. */}
      <div className="space-y-24 sm:space-y-32">
        {/* At a glance */}
        <Section id="at-a-glance" eyebrow="The short version" title={`Is ${place} for you?`}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="font-display text-xl leading-relaxed text-ocean-900 sm:text-2xl sm:leading-relaxed">
                {guide.verdict}
              </p>
              <p className={`${LABEL} mt-8`}>Best for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {guide.bestFor.map((b) => (
                  <li key={b} className="rounded-full border border-sand-300 bg-white px-3 py-1 text-sm font-medium text-ocean-900">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-x-6 border-t-2 border-ocean-900">
                {guide.quickFacts.map((f) => (
                  <div key={f.label} className="border-b border-sand-200 py-4">
                    <dt className={LABEL}>{f.label}</dt>
                    <dd className="mt-1 font-semibold text-ocean-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-muted">Prices, fees and routes last checked {guide.verified}.</p>
            </div>
          </div>
        </Section>

        <Chapter n={1} title="Plan" intro="When to go, how to get there, and what it costs.">
          {/* When to go */}
          <Section
            id="when-to-go"
            eyebrow="Pick a month"
            title={`Best time to visit ${place}`}
            intro="Choose a month to see what the weather and the sea are like."
          >
            <div
              role="radiogroup"
              aria-label="Month"
              className="seg grid grid-cols-6 gap-px overflow-hidden rounded-control border border-ocean-900/25 bg-ocean-900/15 sm:grid-cols-12"
            >
              {guide.months.map((m, i) => {
                const active = currentMonth === i;
                return (
                  <button
                    key={MONTHS[i]}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-controls={`${uid}-month-${i}`}
                    aria-label={`${MONTHS[i]}: ${RATING_LABEL[m.rating]}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setMonth(i)}
                    onKeyDown={(e) => onArrowKeys(e, i, 12, setMonth)}
                    className={`relative flex min-h-11 items-center justify-center pb-2 pt-3 text-sm font-semibold transition-colors ${
                      active ? "bg-ocean-900 text-white" : "bg-white text-ocean-900 hover:bg-sand-100"
                    }`}
                  >
                    <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${RATING_BAR[m.rating]}`} />
                    {MONTHS[i]}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              {(Object.keys(RATING_BAR) as MonthRating[]).map((r) => (
                <span key={r} className="inline-flex items-center gap-1.5">
                  <span aria-hidden className={`h-2.5 w-2.5 ${RATING_BAR[r]}`} />
                  {RATING_LABEL[r]}
                </span>
              ))}
              <span className="sm:ml-auto">Best months overall: {bestMonths}</span>
            </div>
            {/* Every month's note is in the HTML; only the chosen one is shown. */}
            <div className="mt-8" aria-live="polite">
              {guide.months.map((m, i) => (
                <p
                  key={MONTHS[i]}
                  id={`${uid}-month-${i}`}
                  hidden={i !== currentMonth}
                  className={`max-w-3xl border-l-4 pl-5 text-lg leading-relaxed text-ocean-800 sm:pl-6 ${RATING_BORDER[m.rating]}`}
                >
                  {m.note}
                </p>
              ))}
            </div>
          </Section>

          {/* Getting there */}
          <Section id="getting-there" eyebrow="Getting in" title={`How to get to ${place}`} intro="Choose where you're starting from.">
            <Tabs
              label="Starting point"
              tabs={guide.routes.map((r) => r.from)}
              render={(i) => {
                const r = guide.routes[i];
                return (
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
                    <ol className="relative space-y-6 border-l border-sand-300 pl-8">
                      {r.steps.map((step, n) => (
                        <li key={step} className="relative">
                          <span className="absolute -left-[2.85rem] top-0 grid h-7 w-7 place-items-center rounded-full border-2 border-ocean-900 bg-sand-50 text-sm font-bold text-ocean-900">
                            {n + 1}
                          </span>
                          <p className="leading-relaxed text-ocean-900">{step}</p>
                        </li>
                      ))}
                    </ol>
                    <aside className="border-t border-sand-300 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1">
                        <div>
                          <dt className={`flex items-center gap-2 ${LABEL}`}>
                            <FaRegClock aria-hidden /> Time
                          </dt>
                          <dd className="mt-1 font-semibold text-ocean-900">{r.time}</dd>
                        </div>
                        <div>
                          <dt className={`flex items-center gap-2 ${LABEL}`}>
                            <FaMoneyBillWave aria-hidden /> Cost
                          </dt>
                          <dd className="mt-1 font-semibold text-ocean-900">{r.cost}</dd>
                        </div>
                      </dl>
                      {r.tip && (
                        <p className="mt-6 border-l-4 border-tip bg-tip-soft px-4 py-3 text-sm leading-relaxed text-ocean-900">
                          <strong>Tip:</strong> {r.tip}
                        </p>
                      )}
                      {r.flight && (
                        <div className="mt-6">
                          <a
                            href={liveFaresUrl(r.flight, month)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-control bg-ocean-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-ocean-800"
                          >
                            <FaPlaneArrival aria-hidden />
                            Check live fares {r.flight.from} → {r.flight.to}
                            {month !== null && <span className="font-normal text-sand-200">· {MONTHS[month]}</span>}
                            <FaArrowUpRightFromSquare aria-hidden className="h-3 w-3" />
                            <span className="sr-only">(opens Google Flights in a new tab)</span>
                          </a>
                          <p className="mt-2 text-sm text-muted">
                            {month === null ? "Pick a month above to search that month. " : ""}Prices are live on Google Flights and change often.
                          </p>
                        </div>
                      )}
                    </aside>
                  </div>
                );
              }}
            />
          </Section>

          {/* Budget */}
          <Section
            id="budget"
            eyebrow="Set your budget"
            title={`How much does a ${place} trip cost?`}
            intro="Adjust the trip to get a rough total, excluding flights."
          >
            <div className="grid overflow-clip rounded-card border border-sand-300 bg-white text-ocean-900 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                {/* Phones: the full total sits below the controls, so keep a live total in view while adjusting. */}
                <p
                  aria-hidden
                  className="sticky top-[calc(var(--header-offset)+3.25rem)] z-10 flex items-baseline justify-between gap-3 border-b border-sand-300 bg-sand-50 px-5 py-3 transition-[top] duration-150 lg:hidden"
                >
                  <span className={LABEL}>Estimated total</span>
                  <span className="font-display text-2xl font-semibold text-ocean-900">≈ {peso(total)}</span>
                </p>
              <div className="space-y-8 p-5 sm:p-8">
                <fieldset>
                  <legend className={`mb-2 ${LABEL}`}>Travel style</legend>
                  <div className={SEG_LIGHT}>
                    {styleKeys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={style === key}
                        onClick={() => {
                          setStyle(key);
                          setTouchedBudget(true);
                        }}
                        className={segBtn(style === key)}
                      >
                        {STYLE_LABEL[key]}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className={`block ${LABEL}`}>
                      Nights: <span className="text-base text-ocean-900">{nights}</span>
                    </span>
                    <input
                      type="range"
                      min={MIN_NIGHTS}
                      max={MAX_NIGHTS}
                      value={nights}
                      onChange={(e) => {
                        setDays(e.target.value);
                        setTouchedBudget(true);
                        setPickedDays(true);
                      }}
                      className="h-11 w-full cursor-pointer accent-ocean-900"
                    />
                    <span aria-hidden className="flex justify-between text-sm text-muted">
                      <span>{plural(MIN_NIGHTS, "night")}</span>
                      <span>{plural(MAX_NIGHTS, "night")}</span>
                    </span>
                  </label>
                  <div>
                    <span className={`block ${LABEL}`}>Travelers</span>
                    <div className="mt-1 flex items-center gap-3">
                      <Stepper label="Fewer travelers" onClick={() => { setTravelers(Math.max(1, travelers - 1)); setTouchedBudget(true); }}>
                        <FaMinus />
                      </Stepper>
                      <span className="w-8 text-center font-display text-2xl font-semibold" aria-live="polite">
                        {travelers}
                      </span>
                      <Stepper label="More travelers" onClick={() => { setTravelers(Math.min(10, travelers + 1)); setTouchedBudget(true); }}>
                        <FaPlus />
                      </Stepper>
                    </div>
                  </div>
                </div>
                <BudgetBars style={s} perDay={perDay} />
              </div>
              </div>
              <div className="flex flex-col border-t border-sand-300 bg-sand-50 p-5 sm:p-8 lg:border-l lg:border-t-0">
                <div aria-live="polite">
                  <p className={LABEL}>Estimated total</p>
                  <p className="mt-2 font-display text-5xl font-semibold text-ocean-900">{peso(total)}</p>
                  <p className="mt-1 text-muted">≈ US${Math.round(total / guide.budget.usdRate).toLocaleString("en-US")}</p>
                  <p className="mt-4 text-sm text-muted">
                    {peso(total / travelers / nights)} per person per night · {plural(nights, "night")} · {plural(travelers, "traveler")}
                  </p>
                </div>
                {guide.fees.length > 0 && (
                  <div className="mt-6 border-t border-sand-300 pt-5">
                    <p className={`flex items-center gap-2 ${LABEL}`}>
                      <FaMoneyBillWave aria-hidden /> Cash you&apos;ll need
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {guide.fees.map((f) => (
                        <li key={f.name} className="flex justify-between gap-3">
                          <span className="text-ocean-800">{f.name}</span>
                          <span className="shrink-0 font-semibold text-ocean-900">{f.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </Chapter>

        <Chapter n={2} title="Explore" intro="What to do, a day-by-day plan, and where to stay and eat." band>
          {/* Things to do */}
          <Section
            id="things-to-do"
            eyebrow="Save what you like"
            title={`Top things to do in ${place}`}
            intro="Filter by mood and tap the heart to add a spot to your plan."
          >
            <Experiences guide={guide} saved={saved} setSaved={setSaved} />
          </Section>

          {/* Itinerary */}
          <Section
            id="itinerary"
            eyebrow="Choose trip length"
            title={`${place} itinerary`}
            intro="Pick how many days you have. Your budget above updates too."
          >
            <div role="tablist" aria-label="Trip length" className={SEG_LIGHT}>
              {itineraryKeys.map((key, i) => (
                <button
                  key={key}
                  id={`${uid}-days-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={itineraryKey === key}
                  aria-controls={`${uid}-days-panel-${i}`}
                  tabIndex={itineraryKey === key ? 0 : -1}
                  onClick={() => pickDays(key)}
                  onKeyDown={(e) => onArrowKeys(e, i, itineraryKeys.length, (n) => pickDays(itineraryKeys[n]))}
                  className={segBtn(itineraryKey === key)}
                >
                  {plural(Number(key), "day")}
                </button>
              ))}
            </div>
            {nights > Number(itineraryKey) && (
              <p className="mt-6 border-l-4 border-ocean-700 bg-white px-4 py-3 text-sm text-ocean-900">
                You have {plural(nights, "night")}. Here&apos;s the {plural(Number(itineraryKey), "day")} plan; use the extra time to slow down or repeat a favorite.
              </p>
            )}
            {/* All itineraries are in the HTML; inactive ones are hidden. */}
            {itineraryKeys.map((key, i) => (
              <div
                key={key}
                id={`${uid}-days-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${uid}-days-tab-${i}`}
                hidden={i !== itineraryIndex}
                tabIndex={0}
                className="mt-8"
              >
                <ItineraryDays days={guide.itineraries[key]} />
              </div>
            ))}
          </Section>

          {/* Stay & eat */}
          <Section id="stay-and-eat" eyebrow="Base yourself" title={`Where to stay and eat in ${place}`}>
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {guide.stays.map((st) => (
                <div key={st.area} className="flex flex-col border-t-2 border-ocean-900 pt-5">
                  <h3 className="flex items-center gap-2.5 text-xl font-semibold text-ocean-900">
                    <FaBed aria-hidden className="h-4 w-4 shrink-0 text-muted" />
                    {st.area}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-ocean-900">{st.price}</p>
                  <p className="mt-2 flex-1 leading-relaxed text-ocean-800">{st.vibe}</p>
                  <p className="mt-3 text-sm text-ocean-800">
                    <span className="text-muted">Best for:</span> {st.bestFor}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ocean-900">
                  <FaBowlFood aria-hidden className="text-muted" /> What to eat
                </h3>
                <ul className="mt-4 divide-y divide-sand-200 border-y border-sand-200">
                  {guide.eats.map((e) => (
                    <li key={e.name} className="py-4">
                      <p className="font-semibold text-ocean-900">{e.name}</p>
                      <p className="mt-0.5 text-sm font-semibold text-ocean-900">{e.price}</p>
                      <p className="mt-1 text-sm text-ocean-800">Order: {e.order}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ocean-900">
                  <FaRoute aria-hidden className="text-muted" /> Getting around
                </h3>
                <ul className="mt-4 divide-y divide-sand-200 border-y border-sand-200">
                  {guide.getAround.map((g) => (
                    <li key={g.mode} className="flex items-start justify-between gap-4 py-4">
                      <div>
                        <p className="font-semibold text-ocean-900">{g.mode}</p>
                        {g.note && <p className="mt-0.5 text-sm text-muted">{g.note}</p>}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-ocean-900">{g.cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        </Chapter>

        <Chapter n={3} title="Prepare" intro="What to know and pack, then your plan in one place.">
          {/* Before you go */}
          <Section id="before-you-go" eyebrow="Prep & pack" title="Know before you go">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
              <dl className="max-w-2xl divide-y divide-sand-200 border-y border-sand-200">
                {guide.essentials.map((e) => (
                  <div key={e.title} className="py-4">
                    <dt className="font-bold text-ocean-900">{e.title}</dt>
                    <dd className="mt-1 leading-relaxed text-ocean-800">{e.body}</dd>
                  </div>
                ))}
              </dl>
              <PackingList items={guide.packing} packed={packed} setPacked={setPacked} />
            </div>
          </Section>

          {/* Your plan */}
          <Section id="your-plan" eyebrow="You made it" title={`Your ${place} plan`}>
            <TripSummary
              place={place}
              month={month}
              guide={guide}
              nights={nights}
              travelers={travelers}
              style={style}
              total={total}
              saved={saved}
              packed={packed.length}
            />
          </Section>
        </Chapter>
      </div>
    </>
  );
}

/* ---------- building blocks ---------- */

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[calc(var(--header-offset)+5rem)]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className="mt-2 max-w-3xl text-3xl font-semibold text-ocean-900 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl text-muted">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

// Groups related sections into a chapter: wide gaps (or a full-width sand band) between chapters,
// tighter spacing between the sections inside one.
function Chapter({
  n,
  title,
  intro,
  band = false,
  children,
}: {
  n: number;
  title: string;
  intro: string;
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        band ? "bg-sand-100 py-16 shadow-[0_0_0_100vmax_var(--color-sand-100)] [clip-path:inset(0_-100vmax)] sm:py-24" : ""
      }
    >
      <header className="flex items-baseline gap-4 border-b-2 border-ocean-900 pb-4">
        <span className="font-display text-4xl font-semibold text-ocean-900/30 sm:text-5xl" aria-hidden>
          {String(n).padStart(2, "0")}
        </span>
        <div>
          <p className="font-display text-3xl font-semibold text-ocean-900 sm:text-4xl">{title}</p>
          <p className="mt-1 text-muted">{intro}</p>
        </div>
      </header>
      <div className="mt-12 space-y-16 sm:space-y-20">{children}</div>
    </div>
  );
}

function Stepper({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 place-items-center rounded-full border border-sand-300 bg-white text-ocean-900 transition hover:border-ocean-900"
    >
      {children}
    </button>
  );
}

// Every panel is rendered so its content is in the static HTML; inactive panels are hidden.
function Tabs({ label, tabs, render }: { label: string; tabs: string[]; render: (i: number) => React.ReactNode }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <div>
      <div role="tablist" aria-label={label} className={SEG_LIGHT}>
        {tabs.map((t, i) => (
          <button
            key={t}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onArrowKeys(e, i, tabs.length, setActive)}
            className={segBtn(active === i)}
          >
            {t}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-8"
        >
          {render(i)}
        </div>
      ))}
    </div>
  );
}

function BudgetBars({ style, perDay }: { style: Guide["budget"]["styles"]["midrange"]; perDay: number }) {
  const rows = [
    ["Room (per night)", style.stay],
    ["Food", style.food],
    ["Getting around", style.transport],
    ["Activities", style.activities],
  ] as const;
  return (
    <div className="space-y-3 border-t border-sand-200 pt-6">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="flex justify-between text-sm">
            <span className="text-ocean-800">{label}</span>
            <span className="font-semibold">{peso(value)}/day</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-sand-200">
            <div className="h-full bg-ocean-700 transition-[width] duration-200" style={{ width: `${(value / perDay) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Experiences({
  guide,
  saved,
  setSaved,
}: {
  guide: Guide;
  saved: string[];
  setSaved: (v: string[]) => void;
}) {
  const tags = useMemo(() => ["All", ...Array.from(new Set(guide.experiences.flatMap((e) => e.tags)))], [guide]);
  const [tag, setTag] = useState("All");
  const toggle = (name: string) =>
    setSaved(saved.includes(name) ? saved.filter((n) => n !== name) : [...saved, name]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter things to do">
          {tags.map((t) => (
            <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)} className={chip(tag === t)}>
              {t}
            </button>
          ))}
        </div>
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-900" aria-live="polite">
          <FaHeart aria-hidden className="text-action" /> {saved.length} saved to your plan
        </p>
      </div>
      {/* Filtered-out items stay in the HTML (hidden) so every spot is crawlable. */}
      <ul className="grid gap-x-12 border-t border-sand-300 md:grid-cols-2">
        {guide.experiences.map((e) => {
          const isSaved = saved.includes(e.name);
          const shown = tag === "All" || e.tags.includes(tag);
          return (
            <li
              key={e.name}
              hidden={!shown}
              className={`border-b border-sand-200 py-6 pl-4 transition-shadow ${
                isSaved ? "shadow-[inset_3px_0_0_var(--color-action)]" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-ocean-900">{e.name}</h3>
                  <p className="mt-2 leading-relaxed text-ocean-800">{e.blurb}</p>
                  <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <FaMoneyBillWave aria-hidden /> {e.cost}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FaRegClock aria-hidden /> {e.time}
                    </span>
                  </p>
                  {e.tip && (
                    <p className="mt-3 border-l-4 border-tip bg-tip-soft px-3 py-2 text-sm text-ocean-900">
                      <span className="font-semibold">Tip:</span> {e.tip}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  aria-pressed={isSaved}
                  aria-label={isSaved ? `Remove ${e.name} from your plan` : `Save ${e.name} to your plan`}
                  onClick={() => toggle(e.name)}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition ${
                    isSaved
                      ? "border-action-strong bg-action-strong text-white"
                      : "border-sand-300 bg-white text-action-strong hover:border-action hover:bg-action-soft"
                  }`}
                >
                  {isSaved ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function ItineraryDays({ days }: { days: Guide["itineraries"][string] }) {
  return (
    <ol className="border-b border-sand-300">
      {days.map((d, i) => (
        <li key={d.title} className="grid gap-3 border-t border-sand-300 py-6 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
          <p className="flex items-baseline gap-2 sm:block">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">Day</span>
            <span className="font-display text-3xl font-semibold text-ocean-900 sm:block sm:text-5xl">{i + 1}</span>
          </p>
          <div>
            <h3 className="text-xl font-semibold text-ocean-900">{d.title}</h3>
            <ul className="mt-3 space-y-2">
              {d.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-ocean-800">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-ocean-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

function PackingList({
  items,
  packed,
  setPacked,
}: {
  items: string[];
  packed: string[];
  setPacked: (v: string[]) => void;
}) {
  const pct = Math.round((packed.length / items.length) * 100);
  return (
    <div className="self-start rounded-card bg-sand-100 p-5 sm:p-6 lg:sticky lg:top-40">
      <div className="flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-ocean-900">
          <FaSuitcaseRolling aria-hidden className="text-muted" /> Packing checklist
        </h3>
        <span className="text-sm font-semibold text-ocean-900" aria-live="polite">
          {packed.length}/{items.length} packed
        </span>
      </div>
      <div
        className="mt-3 h-1.5 bg-white"
        role="progressbar"
        aria-label="Packing progress"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-good transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </div>
      <ul className="mt-4 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => {
          const on = packed.includes(item);
          return (
            <li key={item}>
              <label
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-control px-2 py-2 transition ${
                  on ? "text-muted line-through" : "text-ocean-900 hover:bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => setPacked(on ? packed.filter((p) => p !== item) : [...packed, item])}
                  className="h-6 w-6 shrink-0 cursor-pointer accent-ocean-900"
                />
                {item}
              </label>
            </li>
          );
        })}
      </ul>
      {pct === 100 && <p className="mt-4 font-semibold text-ocean-900">All packed. Time to go!</p>}
    </div>
  );
}

function TripSummary({
  place,
  month,
  guide,
  nights,
  travelers,
  style,
  total,
  saved,
  packed,
}: {
  place: string;
  month: number | null;
  guide: Guide;
  nights: number;
  travelers: number;
  style: BudgetStyleKey;
  total: number;
  saved: string[];
  packed: number;
}) {
  const [copied, setCopied] = useState(false);
  const monthName = month === null ? "Not picked yet" : `${MONTHS[month]} (${RATING_LABEL[guide.months[month].rating].toLowerCase()})`;
  const text = [
    `My ${place} trip`,
    `When: ${monthName}`,
    `Length: ${plural(nights, "night")}, ${plural(travelers, "traveler")}, ${STYLE_LABEL[style].toLowerCase()}`,
    `Budget: about ${peso(total)} excluding flights`,
    `Must-dos: ${saved.length ? saved.join(", ") : "none saved yet"}`,
    `Packing: ${packed}/${guide.packing.length} done`,
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="grid overflow-hidden rounded-card bg-ocean-900 text-white [&_:focus-visible]:outline-white lg:grid-cols-[minmax(0,1fr)_18rem]">
      <dl className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2 sm:p-10">
        <SummaryItem icon={<FaCalendarDays />} label="When" value={monthName} />
        <SummaryItem
          icon={<FaPlaneArrival />}
          label="Trip"
          value={`${plural(nights, "night")} · ${plural(travelers, "traveler")} · ${STYLE_LABEL[style]}`}
        />
        <SummaryItem icon={<FaMoneyBillWave />} label="Budget" value={`≈ ${peso(total)} excl. flights`} />
        <SummaryItem icon={<FaSuitcaseRolling />} label="Packing" value={`${packed}/${guide.packing.length} packed`} />
        <div className="border-t border-white/15 pt-6 sm:col-span-2">
          <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/85">
            <FaHeart aria-hidden /> Must-dos
          </dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {saved.length ? (
              saved.map((n) => (
                <span key={n} className="rounded-full bg-white/15 px-3 py-1 text-sm">
                  {n}
                </span>
              ))
            ) : (
              <a href="#things-to-do" className="text-white underline underline-offset-4">
                Save a few things to do
              </a>
            )}
          </dd>
        </div>
      </dl>
      <div className="flex flex-col justify-center border-t border-white/15 bg-ocean-950/30 p-5 sm:p-8 lg:border-l lg:border-t-0">
        <p className="text-sm leading-relaxed text-white/80">
          Copy this summary to paste into your notes or send to your travel group.
        </p>
        <button
          type="button"
          onClick={copy}
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-control bg-action px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-action-strong"
        >
          {copied ? <FaCheck aria-hidden /> : <FaCopy aria-hidden />}
          <span aria-live="polite">{copied ? "Copied!" : "Copy my plan"}</span>
        </button>
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/85">
        <span aria-hidden>{icon}</span> {label}
      </dt>
      <dd className="mt-1.5 font-display text-xl font-semibold">{value}</dd>
    </div>
  );
}

/* ---------- sticky jump bar + plan meter ---------- */

function GuideNav({ steps, doneCount }: { steps: { label: string; done: boolean }[]; doneCount: number }) {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const first = els[0];
      const last = els[els.length - 1];
      if (!first || !last) return;
      const start = first.offsetTop - window.innerHeight * 0.3;
      const end = last.offsetTop + last.offsetHeight - window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Keep the active item in view on small screens. Scroll only the rail sideways:
  // scrollIntoView would also scroll the page and fight the reader's own scrolling.
  const railRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    const item = document.getElementById(`chip-${active}`);
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    const left = item.offsetLeft - rail.clientWidth / 2 + item.offsetWidth / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Guide sections"
      className="sticky top-(--header-offset) z-40 -mx-4 transition-[top] duration-150 mb-12 border-b border-sand-200 bg-sand-50/95 backdrop-blur-lg sm:-mx-6 lg:-mx-8"
    >
      <div className="flex items-center gap-3 pl-1 pr-4 sm:pl-3 sm:pr-6 lg:pl-5 lg:pr-8">
        <ul ref={railRef} className="no-scrollbar relative flex min-w-0 flex-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                id={`chip-${s.id}`}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`flex min-h-12 items-center whitespace-nowrap border-b-2 px-3 text-sm font-medium transition-colors focus-visible:outline-offset-[-4px] ${
                  active === s.id
                    ? "border-action text-ocean-900"
                    : "border-transparent text-muted hover:border-sand-300 hover:text-ocean-900"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#your-plan"
          aria-label={`Your plan: ${doneCount} of ${steps.length} steps done`}
          className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-control border border-sand-300 bg-white px-2.5 text-sm font-semibold text-ocean-900 transition hover:border-ocean-900 sm:px-3"
          title={steps.map((s) => `${s.done ? "✓" : "○"} ${s.label}`).join("\n")}
        >
          <FaWandMagicSparkles aria-hidden className="text-muted" />
          <span className="hidden sm:inline">Plan</span> {doneCount}/{steps.length}
        </a>
      </div>
      <div className="h-0.5 bg-sand-200" aria-hidden>
        <div className="h-full origin-left bg-ocean-900" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </nav>
  );
}
