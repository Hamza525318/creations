import React from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "4/5" | "3/4" | "4/3" | "16/9" | "16/10" | "16:10" | "1/1" | "auto";
  label?: string;
  category?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ImagePlaceholder({
  aspectRatio = "4/5",
  label = "Photography Placeholder",
  category,
  className,
  children,
  ...props
}: ImagePlaceholderProps) {
  const ratioClasses: Record<string, string> = {
    "4/5": "aspect-[4/5]",
    "3/4": "aspect-[3/4]",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "16/10": "aspect-[16/10]",
    "16:10": "aspect-[16/10]",
    "1/1": "aspect-square",
    auto: "",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-sand/60 p-6 text-center transition-all duration-500 hover:border-border-strong hover:bg-sand/80",
        ratioClasses[aspectRatio] || "aspect-[4/3]",
        className
      )}
      {...props}
    >
      {/* Decorative inner border framing */}
      <div className="absolute inset-3 rounded-xl border border-dashed border-border-strong/40 pointer-events-none transition-opacity duration-300 group-hover:border-burgundy/20" />

      {/* Subtle brand motif */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 text-burgundy/70 shadow-xs backdrop-blur-xs transition-transform duration-500 group-hover:scale-105 group-hover:text-burgundy">
          <Sparkles className="h-4 w-4" />
        </div>

        {category && (
          <span className="font-sans text-[11px] font-semibold tracking-widest uppercase text-burgundy/80">
            {category}
          </span>
        )}

        <span className="font-display text-base font-medium text-espresso/80 sm:text-lg">
          {label}
        </span>

        <span className="font-sans text-xs text-taupe/70">
          Photography coming soon
        </span>
      </div>

      {children}
    </div>
  );
}
