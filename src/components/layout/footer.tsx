import React from "react";
import Link from "next/link";
import Container from "./container";
import BrandLogo from "@/components/common/brand-logo";
import { siteConfig } from "@/config/site";
import { WebsiteMedia } from "@/lib/media/types";
import { MapPin, Phone, MessageCircle, Smartphone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface FooterProps {
  logoMedia?: WebsiteMedia | null;
}

export default function Footer({ logoMedia }: FooterProps) {
  return (
    <footer className="bg-olive text-ivory border-t border-olive/80 pt-16 pb-24 md:pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-ivory/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <div className="bg-card/90 px-3.5 py-2 rounded-xl inline-flex items-center shadow-xs border border-ivory/20">
                <BrandLogo
                  media={logoMedia}
                  height={44}
                  width={180}
                  imageClassName="h-9 sm:h-10 w-auto object-contain"
                  fallbackClassName="text-espresso text-2xl font-bold"
                />
              </div>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-champagne block font-medium pt-1">
                {siteConfig.tagline}
              </span>
            </div>
            <p className="font-sans text-sm text-sand/80 leading-relaxed max-w-sm">
              Premier curtains and blinds store in Besant Nagar, Chennai. Specialising in custom drapery, precision window shades, upholstery fabrics, and luxury bedspreads.
            </p>
          </div>

          {/* Core Collections Links (SEO Internal Link Equity) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Our Collections
            </p>
            <ul className="space-y-2.5 font-sans text-sm">
              <li>
                <Link
                  href="/curtains"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Curtains in Besant Nagar
                </Link>
              </li>
              <li>
                <Link
                  href="/blinds"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Window Blinds & Shades
                </Link>
              </li>
              <li>
                <Link
                  href="/upholstery"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Sofa Upholstery Fabrics
                </Link>
              </li>
              <li>
                <Link
                  href="/bedspreads"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Luxury Bedspreads & Quilts
                </Link>
              </li>
            </ul>
          </div>

          {/* Helpful Guides & Showroom Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Help & Guides
            </p>
            <ul className="space-y-2.5 font-sans text-sm">
              <li>
                <Link
                  href="/measurement-guide"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Window Measurement Guide
                </Link>
              </li>
              <li>
                <a
                  href="/#location"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Besant Nagar Showroom
                </a>
              </li>
              <li>
                <a
                  href="/#why-us"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Why Choose CREATION&apos;S
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-sand/80 hover:text-champagne transition-colors"
                >
                  Furnishing FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-3 space-y-4">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Visit & Contact
            </p>
            <div className="space-y-2.5 font-sans text-sm text-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">{siteConfig.address.fullAddress}</span>
              </div>

              <div className="pt-1 flex flex-col space-y-2">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-champagne transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-champagne shrink-0" />
                  <span>WhatsApp: {siteConfig.phone}</span>
                </a>

                <a
                  href={`tel:${siteConfig.landlineRaw}`}
                  className="flex items-center gap-2 hover:text-champagne transition-colors"
                >
                  <Phone className="h-4 w-4 text-champagne shrink-0" />
                  <span>Landline: {siteConfig.landline}</span>
                </a>

                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-champagne transition-colors pt-0.5"
                >
                  <InstagramIcon className="h-4 w-4 text-champagne shrink-0" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-sand/60">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Besant Nagar, Chennai.</p>
          <p className="text-sand/50">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
