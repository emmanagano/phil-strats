export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  id,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  // "dark" for headings sitting on a solid colored band.
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <div
      className={`mb-10 flex flex-col gap-4 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={`mb-3 ${dark ? "eyebrow-on-dark" : "eyebrow"}`}>
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={`text-3xl font-semibold sm:text-4xl ${dark ? "text-white" : "text-ocean-900"}`}>
          {title}
        </h2>
        {description && <p className={`mt-3 text-lg ${dark ? "text-white/80" : "text-muted"}`}>{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
