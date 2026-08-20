import React from "react";
import Container from "./container";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
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

export default function Footer() {
  return (
    <footer className="bg-olive text-ivory border-t border-olive/80 pt-16 pb-24 md:pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-ivory/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-display text-3xl font-semibold tracking-wider text-ivory block">
                {siteConfig.name}
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-champagne block font-medium">
                {siteConfig.tagline}
              </span>
            </div>
            <p className="font-sans text-sm text-sand/80 leading-relaxed max-w-sm">
              Premier home furnishing studio in Besant Nagar, Chennai. Specialising in custom curtains, precision blinds, upholstery fabrics, and luxury bedspreads.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Navigation & Collections
            </h3>
            <ul className="space-y-2.5 font-sans text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sand/80 hover:text-champagne transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit & Hours Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Visit Showroom
            </h3>
            <div className="space-y-3 font-sans text-sm text-sand/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
                <span className="leading-snug">{siteConfig.address.fullAddress}</span>
              </div>
              <p className="text-xs text-sand/70 pl-6">{siteConfig.hours}</p>
            </div>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-champagne">
              Direct Contact
            </h3>
            <div className="space-y-2.5 font-sans text-sm text-sand/80">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-champagne transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-champagne shrink-0" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-2 hover:text-champagne transition-colors"
              >
                <Smartphone className="h-4 w-4 text-champagne shrink-0" />
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href={`tel:${siteConfig.landlineRaw}`}
                className="flex items-center gap-2 hover:text-champagne transition-colors"
              >
                <Phone className="h-4 w-4 text-champagne shrink-0" />
                <span>{siteConfig.landline}</span>
              </a>

              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-champagne transition-colors pt-1"
              >
                <InstagramIcon className="h-4 w-4 text-champagne shrink-0" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-sand/60">
          <p>© {new Date().getFullYear()} CREATION&apos;S. All rights reserved. Besant Nagar, Chennai.</p>
          <p className="text-sand/50">Changing Home Styles</p>
        </div>
      </Container>
    </footer>
  );
}
