"use client";

import React, { useState } from "react";
import { MediaSlot } from "@/config/media-slots";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import MediaUploadDialog from "./media-upload-dialog";
import MediaPreviewDialog from "./media-preview-dialog";
import { Button } from "@/components/ui/button";
import { Upload, Edit2, Check, X, Eye } from "lucide-react";
import { toast } from "sonner";

interface MediaSlotCardProps {
  slot: MediaSlot;
  media: WebsiteMedia | null;
  onRefresh: () => void;
}

export default function MediaSlotCard({
  slot,
  media,
  onRefresh,
}: MediaSlotCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altText, setAltText] = useState(media?.alt || "");
  const [savingAlt, setSavingAlt] = useState(false);

  const handleSaveAlt = async () => {
    if (!media) return;
    try {
      setSavingAlt(true);
      const res = await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-alt",
          publicId: media.publicId,
          slotKey: slot.key,
          altText,
        }),
      });

      if (!res.ok) throw new Error("Failed to save alt text.");

      toast.success("Alt text updated successfully.");
      setEditingAlt(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to update alt text.");
    } finally {
      setSavingAlt(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between bg-card p-5 rounded-2xl border border-border/80 shadow-2xs space-y-4">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-burgundy block">
            {slot.section}
          </span>
          <h3 className="font-display text-xl font-medium text-espresso">
            {slot.label}
          </h3>
        </div>
        <span className="font-sans text-xs bg-sand/80 px-2.5 py-1 rounded-full text-espresso font-semibold">
          {slot.aspectRatio}
        </span>
      </div>

      {/* Media Preview Box */}
      <div
        className={`relative ${media ? "cursor-pointer group/img" : ""}`}
        onClick={() => media && setPreviewOpen(true)}
      >
        <WebsiteImage
          media={media}
          aspectRatio={slot.aspectRatio as any}
          fallbackLabel={slot.label}
          fallbackCategory={slot.section}
          className="w-full max-h-72 transition-opacity group-hover/img:opacity-95"
        />
        {media && (
          <>
            <div className="absolute top-2 right-2 bg-espresso/80 text-ivory text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs font-mono">
              {media.width}×{media.height}px
            </div>
            <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl flex items-center justify-center pointer-events-none">
              <span className="bg-ivory/95 text-espresso font-semibold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-burgundy" /> View Full Preview
              </span>
            </div>
          </>
        )}
      </div>

      {/* Alt Text Display & Inline Editor */}
      {media && (
        <div className="pt-1 text-xs">
          {editingAlt ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="flex-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-espresso focus:ring-1 focus:ring-burgundy"
                placeholder="Enter image alt text"
              />
              <button
                onClick={handleSaveAlt}
                disabled={savingAlt}
                className="p-1.5 rounded-lg bg-burgundy text-ivory hover:bg-burgundy-dark"
                title="Save alt text"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setEditingAlt(false)}
                className="p-1.5 rounded-lg bg-sand text-espresso hover:bg-border"
                title="Cancel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-taupe bg-sand/40 px-3 py-1.5 rounded-lg">
              <span className="truncate max-w-[200px]" title={media.alt}>
                Alt: &ldquo;{media.alt}&rdquo;
              </span>
              <button
                onClick={() => { setAltText(media.alt); setEditingAlt(true); }}
                className="text-burgundy font-medium hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <Edit2 className="h-3 w-3" /> Edit
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action Controls */}
      <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
        {media ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPreviewOpen(true)}
            className="text-xs"
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            <span>Preview</span>
          </Button>
        ) : (
          <span className="text-[11px] text-taupe">
            Using placeholder
          </span>
        )}

        <Button
          size="sm"
          variant={media ? "secondary" : "primary"}
          onClick={() => setDialogOpen(true)}
        >
          <Upload className="h-3.5 w-3.5 mr-1.5" />
          <span>{media ? "Replace Image" : "Upload Image"}</span>
        </Button>
      </div>

      {/* Upload Sheet */}
      <MediaUploadDialog
        slot={slot}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={onRefresh}
      />

      {/* Full Preview Modal */}
      <MediaPreviewDialog
        media={media}
        slotLabel={slot.label}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}
