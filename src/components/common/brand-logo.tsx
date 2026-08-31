import React from "react";
import Image from "next/image";
import { WebsiteMedia } from "@/lib/media/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  media?: WebsiteMedia | null;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
}

export default function BrandLogo({
  media,
  className,
  imageClassName,
  fallbackClassName,
  width = 180,
  height = 48,
  alt = siteConfig.name,
  priority = false,
}: BrandLogoProps) {
  if (media && media.secureUrl) {
    return (
      <div className={cn("relative inline-flex items-center", className)}>
        <Image
          src={media.secureUrl}
          alt={alt || media.alt || siteConfig.name}
          width={width}
          height={height}
          priority={priority}
          className={cn("h-10 sm:h-12 w-auto object-contain", imageClassName)}
        />
      </div>
    );
  }

  return (
    <span
      className={cn(
        "font-display text-2xl sm:text-3xl font-semibold tracking-wider text-espresso",
        fallbackClassName
      )}
    >
      {siteConfig.name}
    </span>
  );
}
