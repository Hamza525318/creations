"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CatalogCategory, CatalogItem } from "@/lib/catalog/types";
import { CATEGORIES } from "@/config/categories";
import CatalogItemCard from "./catalog-item-card";
import CatalogUploadDialog from "./catalog-upload-dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Plus,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

interface CategoryCatalogClientProps {
  category: CatalogCategory;
  initialItems: CatalogItem[];
}

export default function CategoryCatalogClient({
  category,
  initialItems,
}: CategoryCatalogClientProps) {
  const router = useRouter();
  const catDef = CATEGORIES[category];
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/catalog/manage?category=${category}`);
      if (res.ok) {
        const data = await res.json();
        if (data.items) {
          setItems(data.items);
        }
      }
      router.refresh();
      toast.success(`${catDef.label} catalog synchronized.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to refresh catalog.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleMove = async (currentIndex: number, direction: "up" | "down") => {
    if (processing) return;
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[currentIndex];
    newItems[currentIndex] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    const publicIds = newItems.map((item) => item.publicId);

    try {
      setProcessing(true);
      const res = await fetch("/api/catalog/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          category,
          publicIds,
        }),
      });

      if (!res.ok) throw new Error("Reorder failed.");

      toast.success("Order updated and published.");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save order.");
      // Rollback
      handleRefresh();
    } finally {
      setProcessing(false);
    }
  };

  const publishedCount = items.filter((i) => i.status === "published").length;
  const draftCount = items.filter((i) => i.status === "draft").length;

  const filteredItems = items.filter((item) => {
    if (filter === "published") return item.status === "published";
    if (filter === "draft") return item.status === "draft";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border">
        <div className="flex items-center space-x-3">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs">
            <Link href="/admin/collections">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All Collections
            </Link>
          </Button>

          <span className="text-border">|</span>

          <div className="flex items-center space-x-2 text-xs font-semibold text-espresso">
            <Layers className="h-4 w-4 text-burgundy" />
            <span>{catDef.label} Collection Manager</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href={catDef.href}
            target="_blank"
            className="font-sans text-xs font-semibold text-espresso hover:text-burgundy inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border hover:bg-sand/60 transition-colors"
          >
            <span>View Public /{catDef.key}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-8 px-2.5 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </Button>
        </div>
      </div>

      {/* Category Header Card */}
      <div className="bg-sand/40 p-6 sm:p-8 rounded-3xl border border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
            Category Catalog
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
            {catDef.label} Designs
          </h1>
          <p className="font-sans text-sm text-taupe leading-relaxed">
            {catDef.description}
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs">
            <span className="bg-card border border-border px-3 py-1 rounded-full font-medium text-espresso">
              Total: <strong>{items.length}</strong>
            </span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-medium">
              Live on site: <strong>{publishedCount}</strong>
            </span>
            {draftCount > 0 && (
              <span className="bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full font-medium">
                Drafts: <strong>{draftCount}</strong>
              </span>
            )}
          </div>
        </div>

        <Button
          size="lg"
          variant="primary"
          onClick={() => setUploadOpen(true)}
          className="shrink-0 shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add {catDef.label} Design</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filter === "all"
                ? "bg-burgundy text-ivory shadow-xs"
                : "bg-card text-espresso border border-border hover:bg-sand/60"
            }`}
          >
            All Designs ({items.length})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filter === "published"
                ? "bg-emerald-700 text-ivory shadow-xs"
                : "bg-card text-espresso border border-border hover:bg-sand/60"
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              filter === "draft"
                ? "bg-amber-700 text-ivory shadow-xs"
                : "bg-card text-espresso border border-border hover:bg-sand/60"
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        <span className="font-sans text-xs text-taupe hidden sm:inline-block">
          Use &uarr; &darr; arrows on cards to reorder display sequence
        </span>
      </div>

      {/* Grid of Catalog Items */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-card border-2 border-dashed border-border/80 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-burgundy mx-auto">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-xl text-espresso font-medium">
              No {filter !== "all" ? filter : ""} designs found in {catDef.label}.
            </h3>
            <p className="font-sans text-xs text-taupe max-w-md mx-auto">
              Upload photographs of fabric options, installations, or designs. They will automatically be displayed on the public <strong className="text-espresso">/{catDef.key}</strong> page.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setUploadOpen(true)}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            <span>Add First {catDef.label} Design</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <CatalogItemCard
              key={item.publicId}
              item={item}
              index={index}
              totalItems={filteredItems.length}
              onMove={handleMove}
              onRefresh={handleRefresh}
              processing={processing}
            />
          ))}
        </div>
      )}

      {/* Upload Sheet */}
      <CatalogUploadDialog
        category={category}
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
