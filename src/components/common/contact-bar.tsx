"use client";

import React from "react";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function MobileContactBar() {
  return (
    <aside
      aria-label="Quick contact bar"
      className="fixed bottom-0 inset-x-0 z-40 bg-ivory/95 backdrop-blur-md border-t border-border/80 px-4 py-2.5 shadow-lg md:hidden"
    >
      <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex flex-1 flex-col items-center justify-center py-1.5 px-2 text-espresso hover:text-burgundy transition-colors rounded-lg active:bg-sand/60"
        >
          <Phone className="h-5 w-5 mb-0.5 text-burgundy" />
          <span className="font-sans text-[11px] font-semibold">Call Us</span>
        </a>

        <div className="w-[1px] h-8 bg-border/60" />

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center py-1.5 px-2 text-espresso hover:text-burgundy transition-colors rounded-lg active:bg-sand/60"
        >
          <MessageCircle className="h-5 w-5 mb-0.5 text-burgundy" />
          <span className="font-sans text-[11px] font-semibold">WhatsApp</span>
        </a>

        <div className="w-[1px] h-8 bg-border/60" />

        <a
          href={siteConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center py-1.5 px-2 text-espresso hover:text-burgundy transition-colors rounded-lg active:bg-sand/60"
        >
          <MapPin className="h-5 w-5 mb-0.5 text-burgundy" />
          <span className="font-sans text-[11px] font-semibold">Directions</span>
        </a>
      </div>
    </aside>
  );
}
