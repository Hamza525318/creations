import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center" | "right";
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  align = "left",
  action,
  dark = false,
  className,
  ...props
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto max-w-2xl",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={cn(
        "flex flex-col mb-10 md:mb-14 space-y-3",
        alignStyles[align],
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-sans text-xs sm:text-xs font-bold uppercase tracking-[0.14em]",
            dark ? "text-champagne" : "text-burgundy"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight",
          dark ? "text-ivory" : "text-espresso"
        )}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={cn(
            "font-sans text-base sm:text-lg leading-relaxed max-w-xl font-normal pt-1",
            dark ? "text-sand/80" : "text-taupe"
          )}
        >
          {description}
        </p>
      )}

      {action && <div className="pt-3">{action}</div>}
    </div>
  );
}
