"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { LogOut, ExternalLink, ShieldCheck, Image as ImageIcon, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminHeader({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  const isMediaActive = pathname.startsWith("/admin/media");
  const isCollectionsActive = pathname.startsWith("/admin/collections");

  return (
    <header className="sticky top-0 z-40 w-full bg-ivory/95 backdrop-blur-md border-b border-border shadow-2xs">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand & Section Title */}
        <div className="flex items-center space-x-6">
          <Link href="/admin/media" className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-wider text-burgundy">
              {siteConfig.name}
            </span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-taupe font-bold">
              Admin Portal
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden sm:flex items-center space-x-1 bg-sand/60 p-1 rounded-full border border-border/80 text-xs font-semibold">
            <Link
              href="/admin/media"
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full transition-all",
                isMediaActive
                  ? "bg-card text-burgundy shadow-xs"
                  : "text-espresso/80 hover:text-burgundy"
              )}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Website Media</span>
            </Link>

            <Link
              href="/admin/collections"
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full transition-all",
                isCollectionsActive
                  ? "bg-card text-burgundy shadow-xs"
                  : "text-espresso/80 hover:text-burgundy"
              )}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Collections</span>
            </Link>
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-3">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium bg-sand px-2.5 py-0.5 rounded-full text-espresso border border-border/80">
            <ShieldCheck className="h-3 w-3 text-burgundy" /> Owner
          </span>

          <Link
            href="/"
            target="_blank"
            className="font-sans text-xs font-semibold text-espresso hover:text-burgundy inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border hover:bg-sand/60 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-xs text-taupe hover:text-burgundy"
          >
            <LogOut className="h-3.5 w-3.5 mr-1" />
            Sign Out
          </Button>
        </div>
      </Container>
    </header>
  );
}
