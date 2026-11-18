import Container from "./ui/Container";

const TONES = {
  ocean: { band: "bg-ocean-900 text-white", eyebrow: "text-white/85", body: "text-white/80", rule: "border-white/20", accent: "bg-white/40" },
  coral: { band: "bg-coral-600 text-white", eyebrow: "text-ocean-950", body: "text-white", rule: "border-white/30", accent: "bg-ocean-950/40" },
  mango: { band: "bg-mango-400 text-ocean-950", eyebrow: "text-ocean-900/80", body: "text-ocean-900/85", rule: "border-ocean-950/20", accent: "bg-ocean-950/40" },
} as const;

export type HeroTone = keyof typeof TONES;

// Inner-page header: a solid color band with an oversized headline, a row of
// key numbers, and a three-photo collage (one tall, two stacked). Flat color, no motion.
export default function PageHero({
  eyebrow,
  title,
  description,
  tone = "ocean",
  images = [],
  stats = [],
  aside,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: HeroTone;
  images?: { src: string; alt?: string }[];
  stats?: { value: string | number; label: string }[];
  // Custom right-hand column, used when a page has no photos (e.g. News).
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const t = TONES[tone];
  const [big, ...small] = images.slice(0, 3);

  return (
    <section className={`overflow-hidden ${t.band}`}>
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:py-20">
        <div>
          {eyebrow && (
            <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] ${t.eyebrow}`}>
              <span aria-hidden className={`h-1 w-8 ${t.accent}`} />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            {title}
          </h1>
          {description && <p className={`mt-6 max-w-xl text-lg sm:text-xl ${t.body}`}>{description}</p>}
          {children}
          {stats.length > 0 && (
            <dl className={`mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6 ${t.rule}`}>
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className={`text-xs font-bold uppercase tracking-widest ${t.body}`}>{s.label}</dt>
                  <dd className="font-display text-4xl font-semibold leading-none sm:text-5xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {!big && aside}
        {big && (
          <div aria-hidden className="grid h-72 grid-cols-[3fr_2fr] gap-2 sm:h-96 lg:h-[30rem]">
            <img src={big.src} alt="" className="photo-pop h-full w-full rounded-card object-cover" />
            {small.length > 0 && (
              <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${small.length}, minmax(0, 1fr))` }}>
                {small.map((img) => (
                  <img key={img.src} src={img.src} alt="" className="photo-pop h-full w-full rounded-card object-cover" />
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
