"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./container";
import MobileNav from "./mobile-nav";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { WebsiteMedia } from "@/lib/media/types";

interface HeaderProps {
  logoMedia?: WebsiteMedia | null;
}

export default function Header({ logoMedia }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/90 backdrop-blur-md border-b border-border/60 transition-all duration-300">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand Logo or Wordmark */}
        <Link href="/" className="group flex items-center focus:outline-none" aria-label="CREATION'S Home">
          {logoMedia && logoMedia.secureUrl ? (
            <div className="relative flex items-center h-11 sm:h-12 max-h-[48px]">
              <Image
                src={logoMedia.secureUrl}
                alt={logoMedia.alt || "CREATION'S"}
                width={200}
                height={48}
                priority
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-semibold tracking-wider text-espresso group-hover:text-burgundy transition-colors">
                {siteConfig.name}
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-taupe group-hover:text-burgundy/80 transition-colors">
                {siteConfig.tagline} · {siteConfig.location}
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-8">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-espresso/90 hover:text-burgundy transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-burgundy after:transition-all hover:after:w-full"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Desktop Action & Mobile Trigger */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:block">
            <WhatsAppButton size="sm" label="Chat on WhatsApp" />
          </div>
          <MobileNav logoMedia={logoMedia} />
        </div>
      </Container>
    </header>
  );
}
