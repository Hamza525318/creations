"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, MessageCircle, Phone, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { WebsiteMedia } from "@/lib/media/types";

interface MobileNavProps {
  logoMedia?: WebsiteMedia | null;
}

export default function MobileNav({ logoMedia }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full text-espresso transition-colors hover:bg-sand/60 focus:outline-none focus:ring-2 focus:ring-burgundy md:hidden"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          <SheetHeader className="pb-4 border-b border-border/60">
            {logoMedia && logoMedia.secureUrl ? (
              <div className="relative h-10 max-h-[40px] flex items-center">
                <Image
                  src={logoMedia.secureUrl}
                  alt={logoMedia.alt || "CREATION'S"}
                  width={160}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
              </div>
            ) : (
              <>
                <SheetTitle className="font-display text-2xl font-semibold tracking-wide text-burgundy">
                  {siteConfig.name}
                </SheetTitle>
                <p className="font-sans text-xs text-taupe tracking-wider uppercase">
                  {siteConfig.tagline} · {siteConfig.location}
                </p>
              </>
            )}
          </SheetHeader>

          <nav aria-label="Mobile navigation" className="flex flex-col space-y-4">
            {mainNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-xl text-espresso hover:text-burgundy transition-colors py-1"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-border/60">
          <Button asChild variant="primary" className="w-full justify-center">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat on WhatsApp
            </a>
          </Button>

          <Button asChild variant="secondary" className="w-full justify-center">
            <a href={`tel:${siteConfig.phoneRaw}`} onClick={() => setOpen(false)}>
              <Phone className="h-4 w-4 mr-2" />
              Call {siteConfig.phone}
            </a>
          </Button>

          <div className="pt-2 text-xs text-taupe space-y-1">
            <p className="flex items-center gap-1.5 font-medium text-espresso">
              <MapPin className="h-3.5 w-3.5 text-burgundy shrink-0" />
              {siteConfig.address.fullAddress}
            </p>
            <p className="pl-5 text-taupe/80">{siteConfig.hours}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
