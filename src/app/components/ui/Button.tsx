import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const VARIANTS = {
  primary:
    "bg-lagoon-700 text-white shadow-card hover:bg-ocean-900 hover:shadow-card-hover",
  secondary:
    "border border-ocean-900/20 bg-white text-ocean-900 hover:border-ocean-900 hover:bg-ocean-900 hover:text-white",
  light: "bg-white text-ocean-900 shadow-card hover:bg-mango-400",
  ghost: "px-0! py-0! text-lagoon-700 hover:text-ocean-900",
} as const;

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  arrow?: boolean;
  external?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  external = false,
  className = "",
}: ButtonProps) {
  const classes = `group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <FaArrowRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
