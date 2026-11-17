import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const VARIANTS = {
  primary:
    "bg-coral-500 text-white hover:bg-ocean-900",
  secondary:
    "border border-ocean-900/20 bg-white text-ocean-900 hover:border-ocean-900 hover:bg-ocean-900 hover:text-white",
  light: "bg-white text-ocean-900 hover:bg-mango-300",
  ghost: "min-h-0! px-0! py-0! text-lagoon-700 hover:text-ocean-900",
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
  const classes = `group inline-flex items-center gap-2 min-h-11 rounded-control px-5 py-3 text-sm font-semibold transition-colors duration-150 ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <FaArrowRight
          aria-hidden
          className="h-3.5 w-3.5"
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
