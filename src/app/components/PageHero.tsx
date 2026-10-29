import Container from "./ui/Container";

// Title band for inner pages, with soft lagoon and coral glows behind the text.
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip pb-12 pt-10 sm:pb-16 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-lagoon-100 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-coral-100 blur-3xl"
      />
      <Container className="relative">
        {eyebrow && (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-coral-700">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] text-ocean-900 sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
