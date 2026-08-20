"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CatalogItem } from "@/lib/catalog/types";
import CatalogEditDialog from "./catalog-edit-dialog";
import MediaPreviewDialog from "@/components/admin/media-preview-dialog";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Edit3, Trash2, Eye, GripVertical, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

interface CatalogItemCardProps {
  item: CatalogItem;
  index: number;
  totalItems: number;
  onMove: (index: number, direction: "up" | "down") => void;
  onRefresh: () => void;
  processing: boolean;
}

export default function CatalogItemCard({
  item,
  index,
  totalItems,
  onMove,
  onRefresh,
  processing,
}: CatalogItemCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const itemName = item.title || `${item.category} design #${index + 1}`;
    if (!confirm(`Remove "${itemName}" from the ${item.category} collection?`)) {
      return;
    }

    try {
      setDeleting(true);
      const res = await fetch("/api/catalog/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          publicId: item.publicId,
          category: item.category,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete item.");
      }

      toast.success(`"${itemName}" removed from collection.`);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete item.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between bg-card p-4 rounded-2xl border border-border/80 shadow-2xs space-y-3 relative transition-all hover:border-burgundy/40 hover:shadow-md">
      <div className="space-y-3">
        {/* Top Header: Order position + Status badge */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 font-medium text-espresso">
            <GripVertical className="h-3.5 w-3.5 text-taupe" />
            <span>Position #{index + 1}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              item.status === "published"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            {item.status === "published" ? (
              <>
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                <span>Published</span>
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 text-amber-600" />
                <span>Draft</span>
              </>
            )}
          </span>
        </div>

        {/* Thumbnail with click lightbox */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-sand/40 border border-border/70 cursor-pointer group/img"
          onClick={() => setPreviewOpen(true)}
        >
          <Image
            src={item.secureUrl}
            alt={item.alt || item.title || "Catalog photograph"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/img:scale-105"
          />

          <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none">
            <span className="bg-ivory/95 text-espresso font-semibold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 text-burgundy" /> Preview
            </span>
          </div>

          {/* Format/Dimension Tag */}
          <div className="absolute bottom-2 right-2 bg-espresso/80 text-ivory text-[10px] px-2 py-0.5 rounded-md font-mono backdrop-blur-xs">
            {item.width}×{item.height}
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-1.5 pt-1">
          {item.title ? (
            <h4 className="font-display text-lg font-medium text-espresso leading-snug truncate" title={item.title}>
              {item.title}
            </h4>
          ) : (
            <h4 className="font-display text-sm italic text-taupe">
              (No title set)
            </h4>
          )}

          {item.description && (
            <p className="font-sans text-xs text-taupe line-clamp-2 leading-relaxed" title={item.description}>
              {item.description}
            </p>
          )}

          {item.priceDisplay && (
            <div className="pt-0.5">
              <span className="font-sans text-xs font-bold text-burgundy bg-burgundy/5 border border-burgundy/20 px-2.5 py-0.5 rounded-md inline-block">
                {item.priceDisplay}
              </span>
            </div>
          )}

          <div className="pt-1 text-[11px] text-taupe/80 truncate" title={item.alt}>
            Alt: &ldquo;{item.alt}&rdquo;
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
        {/* Move up / down */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(index, "up")}
            disabled={index === 0 || processing}
            className="p-1.5 rounded-lg border border-border hover:bg-sand text-espresso disabled:opacity-30 transition-colors"
            title="Move up in order"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMove(index, "down")}
            disabled={index === totalItems - 1 || processing}
            className="p-1.5 rounded-lg border border-border hover:bg-sand text-espresso disabled:opacity-30 transition-colors"
            title="Move down in order"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Edit & Delete Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditOpen(true)}
            className="h-8 px-2.5 text-xs text-espresso"
          >
            <Edit3 className="h-3.5 w-3.5 mr-1 text-burgundy" />
            <span>Edit</span>
          </Button>

          <button
            onClick={handleDelete}
            disabled={deleting || processing}
            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
            title="Delete design"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Edit Metadata Modal */}
      <CatalogEditDialog
        item={item}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={onRefresh}
      />

      {/* Full Preview Lightbox */}
      <MediaPreviewDialog
        media={{
          assetId: item.assetId,
          publicId: item.publicId,
          secureUrl: item.secureUrl,
          width: item.width,
          height: item.height,
          format: item.format,
          slotKey: `catalog.${item.category}`,
          section: `${item.category.toUpperCase()} Collection`,
          alt: item.alt,
          displayOrder: item.order,
          createdAt: item.createdAt || "",
        }}
        slotLabel={item.title || `${item.category} Design`}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}
