"use client";

import React, { useState } from "react";
import { MediaSlot } from "@/config/media-slots";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import MediaUploadDialog from "./media-upload-dialog";
import MediaPreviewDialog from "./media-preview-dialog";
import { Button } from "@/components/ui/button";
import { Upload, ArrowUp, ArrowDown, Trash2, Edit2, Check, X, GripVertical, Eye } from "lucide-react";
import { toast } from "sonner";

interface GalleryManagerProps {
  slot: MediaSlot;
  items: WebsiteMedia[];
  onRefresh: () => void;
}

export default function GalleryManager({
  slot,
  items,
  onRefresh,
}: GalleryManagerProps) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<WebsiteMedia | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (processing) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const publicIds = newItems.map((item) => item.publicId);

    try {
      setProcessing(true);
      const res = await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          publicIds,
          slotKey: slot.key,
        }),
      });

      if (!res.ok) throw new Error("Reorder failed.");

      toast.success("Gallery order updated.");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to reorder gallery.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm("Remove this image from the gallery?")) return;

    try {
      setProcessing(true);
      const res = await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          publicId,
          slotKey: slot.key,
        }),
      });

      if (!res.ok) throw new Error("Failed to delete asset.");

      toast.success("Image removed from gallery.");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete image.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSaveAlt = async (publicId: string) => {
    try {
      setProcessing(true);
      const res = await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-alt",
          publicId,
          slotKey: slot.key,
          altText: editAlt,
        }),
      });

      if (!res.ok) throw new Error("Failed to update alt text.");

      toast.success("Alt text updated.");
      setEditingId(null);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update alt text.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border/80 shadow-2xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
            {slot.section}
          </span>
          <h3 className="font-display text-2xl font-medium text-espresso">
            {slot.label} Collection ({items.length}/{slot.maxItems || 12})
          </h3>
          <p className="font-sans text-xs text-taupe pt-1">
            Upload, reorder, and remove project gallery photos shown on the landing page.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setUploadDialogOpen(true)}
          disabled={items.length >= (slot.maxItems || 12)}
        >
          <Upload className="h-4 w-4 mr-2" />
          <span>Add Project Image</span>
        </Button>
      </div>

      {/* Items Grid / List */}
      {items.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-sand/40 border border-dashed border-border-strong/60 space-y-3">
          <p className="font-display text-lg text-espresso">No gallery images uploaded yet.</p>
          <p className="font-sans text-xs text-taupe">
            Click &ldquo;Add Project Image&rdquo; to populate the live website gallery. Fallback placeholders are currently active.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={item.publicId}
              className="flex flex-col justify-between bg-ivory p-4 rounded-xl border border-border space-y-3 relative group"
            >
              <div className="space-y-3">
                {/* Index badge */}
                <div className="flex items-center justify-between text-xs text-espresso font-medium">
                  <span className="flex items-center gap-1">
                    <GripVertical className="h-4 w-4 text-taupe cursor-grab" />
                    <span>Position #{index + 1}</span>
                  </span>
                  <span className="font-mono text-[10px] text-taupe">{item.width}×{item.height}</span>
                </div>

                {/* Preview with click lightbox */}
                <div
                  className="relative cursor-pointer group/item"
                  onClick={() => { setPreviewMedia(item); setPreviewOpen(true); }}
                >
                  <WebsiteImage
                    media={item}
                    aspectRatio="4/3"
                    className="w-full transition-opacity group-hover/item:opacity-95"
                  />
                  <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover/item:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
                    <span className="bg-ivory/95 text-espresso font-semibold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Eye className="h-3 w-3 text-burgundy" /> Preview
                    </span>
                  </div>
                </div>

                {/* Alt Editor */}
                {editingId === item.publicId ? (
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      className="flex-1 rounded-lg border border-border px-2 py-1 text-xs text-espresso focus:ring-1 focus:ring-burgundy"
                      placeholder="Alt text"
                    />
                    <button
                      onClick={() => handleSaveAlt(item.publicId)}
                      className="p-1.5 rounded-lg bg-burgundy text-ivory"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1.5 rounded-lg bg-sand text-espresso"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-taupe bg-sand/50 p-2 rounded-lg">
                    <span className="truncate max-w-[170px]" title={item.alt}>
                      &ldquo;{item.alt}&rdquo;
                    </span>
                    <button
                      onClick={() => { setEditAlt(item.alt); setEditingId(item.publicId); }}
                      className="text-burgundy hover:underline font-medium ml-1"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Order & Delete Actions */}
              <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setPreviewMedia(item); setPreviewOpen(true); }}
                    className="p-1.5 rounded-lg border border-border hover:bg-sand text-espresso text-xs flex items-center gap-1"
                    title="View full preview"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => handleMove(index, "up")}
                    disabled={index === 0 || processing}
                    className="p-1.5 rounded-lg border border-border hover:bg-sand disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(index, "down")}
                    disabled={index === items.length - 1 || processing}
                    className="p-1.5 rounded-lg border border-border hover:bg-sand disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => handleDelete(item.publicId)}
                  disabled={processing}
                  className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                  title="Delete project photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <MediaUploadDialog
        slot={slot}
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        onSuccess={onRefresh}
      />

      {/* Full Preview Modal */}
      <MediaPreviewDialog
        media={previewMedia}
        slotLabel={slot.label}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}
