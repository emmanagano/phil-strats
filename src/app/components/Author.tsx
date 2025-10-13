import React from "react";

export type AuthorProps = {
  /** Optional published date to show to the right */
  date?: string;
  /** Additional classes to tweak spacing where needed */
  className?: string;
};

/**
 * Reusable Author byline
 *
 * Examples:
 * <Author date="Aug 14, 2025" />
 */
export default function Author({ date, className = "" }: AuthorProps) {
  const name = "Emma Nagano";

  return (
    <div className={`flex${className ? ` ${className}` : ""} gap-2`}>
      {/* Date */}
      {date && (
        <time suppressHydrationWarning className="text-gray-500 text-sm mb-0.5">
          {date}
        </time>
      )}

      {/* Name */}
      <div className="text-gray-500 text-sm">
        <span>{name}</span>
      </div>
    </div>
  );
}
