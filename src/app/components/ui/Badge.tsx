const TONES = {
  mango: "bg-mango-400 text-ocean-900",
  lagoon: "bg-lagoon-100 text-lagoon-700",
  glass: "bg-white/85 text-ocean-900 backdrop-blur",
} as const;

export default function Badge({
  children,
  tone = "lagoon",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
