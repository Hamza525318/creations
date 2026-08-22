import React from "react";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";

interface CurtainGalleryProps {
  images: WebsiteMedia[];
}

const FALLBACK_REVEAL_ITEMS = [
  {
    id: "cr-1",
    title: "Double-Height Velvet Drapery",
    category: "Living Room Curtains",
    aspectRatio: "16/9" as const,
    label: "Living Room Curtains Installation",
  },
  {
    id: "cr-2",
    title: "Motorised Sheer Roman Blinds",
    category: "Master Bedroom",
    aspectRatio: "4/5" as const,
    label: "Sheer Window Treatments",
  },
  {
    id: "cr-3",
    title: "Custom Linen Sectional Upholstery",
    category: "Upholstery Design",
    aspectRatio: "4/5" as const,
    label: "Bespoke Sofa Re-covering",
  },
  {
    id: "cr-4",
    title: "Layered Cotton Bedroom Suite",
    category: "Bedspreads & Linens",
    aspectRatio: "16/9" as const,
    label: "Quilted Bedding Ensemble",
  },
];

export default function CurtainGallery({ images }: CurtainGalleryProps) {
  const hasImages = images && images.length > 0;

  if (hasImages) {
    return (
      <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3 p-2 sm:p-6 bg-card/60 rounded-2xl sm:rounded-3xl border border-border/70">
        {images.map((item, index) => (
          <div
            key={item.publicId}
            className="group flex flex-col space-y-2 bg-card p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-border/80 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
          >
            <WebsiteImage
              media={item}
              aspectRatio="4/3"
              alt={item.alt || `Curtain reveal project #${index + 1}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full"
            />
            {/* Installation title & description commented out as requested */}
            {/* 
            <div className="flex items-center justify-between px-1">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-burgundy">
                Installation #{index + 1}
              </span>
              <p className="font-display text-sm font-medium text-espresso group-hover:text-burgundy transition-colors truncate max-w-[200px]">
                {item.alt || "CREATION'S Custom Furnishing"}
              </p>
            </div>
            */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4 p-2 sm:p-6 bg-card/60 rounded-2xl sm:rounded-3xl border border-border/70">
      {FALLBACK_REVEAL_ITEMS.map((item) => (
        <div
          key={item.id}
          className="group flex flex-col space-y-2 bg-card p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-border/80 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
        >
          <WebsiteImage
            media={null}
            aspectRatio="4/5"
            fallbackCategory={item.category}
            fallbackLabel={item.label}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
            className="w-full"
          />
          {/* Installation title & description commented out as requested */}
          {/* 
          <div className="space-y-1 px-1">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-burgundy">
              {item.category}
            </span>
            <h3 className="font-display text-base font-medium text-espresso group-hover:text-burgundy transition-colors">
              {item.title}
            </h3>
          </div>
          */}
        </div>
      ))}
    </div>
  );
}
