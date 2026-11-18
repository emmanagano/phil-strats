// Neutral labels. Yellow is reserved for Tip callouts and teal for good/best signals.
const TONES = {
  light: "bg-white text-ocean-900",
  ink: "bg-ocean-900 text-white",
  glass: "bg-white/85 text-ocean-900 backdrop-blur",
} as const;

export default function Badge({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
