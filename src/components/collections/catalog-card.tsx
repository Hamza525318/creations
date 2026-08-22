import React from "react";
import Image from "next/image";
import { CatalogItem } from "@/lib/catalog/types";
import { CATEGORIES } from "@/config/categories";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface CatalogCardProps {
  item: CatalogItem;
}

export default function CatalogCard({ item }: CatalogCardProps) {
  const catDef = CATEGORIES[item.category];

  // Compose tailored WhatsApp enquiry message
  const itemLabel = item.title ? item.title : `${catDef.label} design`;
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the ${itemLabel} shown on your CREATION'S website.`
  );
  const rawNumber = siteConfig.phoneRaw.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${whatsappMessage}`;

  return (
    <article className="group flex flex-col justify-between bg-card rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-border/80 shadow-2xs hover:border-burgundy/40 hover:shadow-md transition-all duration-300">
      <div className="space-y-2.5 sm:space-y-3.5">
        {/* Photo Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg sm:rounded-xl bg-sand/40 border border-border/70">
          <Image
            src={item.secureUrl}
            alt={item.alt || item.title || `${catDef.label} Design`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Subtle price tag overlay on image if price exists */}
          {item.priceDisplay && (
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 bg-espresso/90 text-ivory text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-xs font-sans shadow-xs">
              {item.priceDisplay}
            </div>
          )}
        </div>

        {/* Content Section (adapts cleanly if metadata absent) */}
        <div className="space-y-1 px-0.5">
          {item.title && (
            <h3 className="font-display text-sm sm:text-lg font-medium text-espresso group-hover:text-burgundy transition-colors leading-snug line-clamp-2">
              {item.title}
            </h3>
          )}

          {/* Description shown on sm+ screens to preserve mobile compactness */}
          {item.description && (
            <p className="hidden sm:block font-sans text-xs text-taupe leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer / WhatsApp Enquiry Action */}
      <div className="pt-2 sm:pt-3 border-t border-border/40 mt-2 sm:mt-3 flex items-center justify-between gap-1">
        <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-burgundy/80 truncate">
          {catDef.label}
        </span>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-espresso hover:text-burgundy transition-colors py-1 px-1.5 sm:px-2 rounded-md sm:rounded-lg hover:bg-sand/60 shrink-0 min-h-[36px]"
          aria-label={`Enquire about ${itemLabel} on WhatsApp`}
        >
          <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-burgundy" />
          <span>Enquire</span>
        </a>
      </div>
    </article>
  );
}
