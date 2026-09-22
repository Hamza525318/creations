import React from "react";
import Image from "next/image";
import { WebsiteMedia } from "@/lib/media/types";
import ImagePlaceholder from "./image-placeholder";
import { cn } from "@/lib/utils";

interface WebsiteImageProps {
  media?: WebsiteMedia | null;
  aspectRatio?: "4/5" | "3/4" | "4/3" | "16/9" | "16/10" | "16:10" | "1/1" | "auto";
  alt?: string;
  className?: string;
  fallbackLabel?: string;
  fallbackCategory?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}

export default function WebsiteImage({
  media,
  aspectRatio = "4/5",
  alt,
  className,
  fallbackLabel = "Photography Placeholder",
  fallbackCategory,
  priority = false,
  fetchPriority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: WebsiteImageProps) {
  if (!media || !media.secureUrl) {
    return (
      <ImagePlaceholder
        aspectRatio={aspectRatio}
        label={fallbackLabel}
        category={fallbackCategory}
        className={className}
      />
    );
  }

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

  const computedFetchPriority = fetchPriority || (priority ? "high" : undefined);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-sand/40 border border-border/70 group",
        ratioClasses[aspectRatio] || "aspect-[4/3]",
        className
      )}
    >
      <Image
        src={media.secureUrl}
        alt={alt || media.alt || fallbackLabel}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : undefined}
        fetchPriority={computedFetchPriority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
    </div>
  );
}
