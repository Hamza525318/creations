"use client";

import React, { useState } from "react";
import { MEDIA_SLOTS } from "@/config/media-slots";
import { WebsiteMedia } from "@/lib/media/types";
import MediaSlotCard from "./media-slot-card";
import GalleryManager from "./gallery-manager";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface MediaAdminClientProps {
  initialMediaMap: Record<string, WebsiteMedia | WebsiteMedia[]>;
}

export default function MediaAdminClient({ initialMediaMap }: MediaAdminClientProps) {
  const router = useRouter();
  const [mediaMap, setMediaMap] = useState(initialMediaMap);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      // 1. Re-fetch media via API to update local state immediately
      const res = await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-all" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.mediaMap) {
          setMediaMap(data.mediaMap);
        }
      }
      // 2. Trigger Next.js router cache refresh
      router.refresh();
      toast.success("Media dashboard synced with live Cloudinary.");
    } catch (err) {
      console.error("Refresh error:", err);
      toast.error("Failed to refresh media slots.");
    } finally {
      setRefreshing(false);
    }
  };

  const getMediaForSlot = (slotKey: string): WebsiteMedia | null => {
    const item = mediaMap[slotKey];
    if (item && !Array.isArray(item)) return item;
    return null;
  };

  const getCollectionForSlot = (slotKey: string): WebsiteMedia[] => {
    const item = mediaMap[slotKey];
    if (Array.isArray(item)) return item;
    return [];
  };

  return (
    <div className="space-y-12">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center space-x-2 text-xs font-medium text-espresso">
          <Sparkles className="h-4 w-4 text-burgundy" />
          <span>Cloudinary Media Synchronization Active (Auto-Updates on Upload)</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh All Slots</span>
        </Button>
      </div>

      {/* 1. Branding / Logo Section */}
      <section className="space-y-4">
        <div className="border-b border-border/60 pb-2 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold text-espresso">
            1. Brand Identity & Logo
          </h2>
          <span className="font-sans text-xs text-taupe">Global Navbar Asset</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MediaSlotCard
            slot={MEDIA_SLOTS["branding.logo-primary"]}
            media={getMediaForSlot("branding.logo-primary")}
            onRefresh={handleRefresh}
          />
        </div>
      </section>

      {/* 2. Hero Section (Dual Zig-Zag Visuals) */}
      <section className="space-y-4">
        <div className="border-b border-border/60 pb-2 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold text-espresso">
            2. Hero Section (Dual Zig-Zag Visuals)
          </h2>
          <span className="font-sans text-xs text-taupe">Primary & Offset Accent Images</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaSlotCard
            slot={MEDIA_SLOTS["hero.main"]}
            media={getMediaForSlot("hero.main")}
            onRefresh={handleRefresh}
          />
          <MediaSlotCard
            slot={MEDIA_SLOTS["hero.secondary"]}
            media={getMediaForSlot("hero.secondary")}
            onRefresh={handleRefresh}
          />
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-espresso border-b border-border/60 pb-2">
          3. Category Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["categories.curtains", "categories.blinds", "categories.upholstery", "categories.bedspreads"].map((key) => (
            <MediaSlotCard
              key={key}
              slot={MEDIA_SLOTS[key]}
              media={getMediaForSlot(key)}
              onRefresh={handleRefresh}
            />
          ))}
        </div>
      </section>

      {/* 4. Curtain Reveal Gallery */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-espresso border-b border-border/60 pb-2">
          4. Curtain Reveal Animated Gallery
        </h2>
        <GalleryManager
          slot={MEDIA_SLOTS["gallery.curtain-reveal"]}
          items={getCollectionForSlot("gallery.curtain-reveal")}
          onRefresh={handleRefresh}
        />
      </section>

      {/* 5. Featured Projects Gallery */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-espresso border-b border-border/60 pb-2">
          5. Featured Projects Gallery
        </h2>
        <GalleryManager
          slot={MEDIA_SLOTS["gallery.projects"]}
          items={getCollectionForSlot("gallery.projects")}
          onRefresh={handleRefresh}
        />
      </section>

      {/* 6. Style Directions */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-espresso border-b border-border/60 pb-2">
          6. Find Your Style Directions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["styles.modern-minimal", "styles.warm-contemporary", "styles.classic-elegant"].map((key) => (
            <MediaSlotCard
              key={key}
              slot={MEDIA_SLOTS[key]}
              media={getMediaForSlot(key)}
              onRefresh={handleRefresh}
            />
          ))}
        </div>
      </section>

      {/* 7. About & Showroom */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-espresso border-b border-border/60 pb-2">
          7. About & Showroom Media
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MediaSlotCard
            slot={MEDIA_SLOTS["about.main"]}
            media={getMediaForSlot("about.main")}
            onRefresh={handleRefresh}
          />
          <MediaSlotCard
            slot={MEDIA_SLOTS["showroom.main"]}
            media={getMediaForSlot("showroom.main")}
            onRefresh={handleRefresh}
          />
        </div>
      </section>
    </div>
  );
}
