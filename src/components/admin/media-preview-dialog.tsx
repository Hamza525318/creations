"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WebsiteMedia } from "@/lib/media/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface MediaPreviewDialogProps {
  media: WebsiteMedia | null;
  slotLabel?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MediaPreviewDialog({
  media,
  slotLabel,
  open,
  onOpenChange,
}: MediaPreviewDialogProps) {
  const [copied, setCopied] = useState(false);

  if (!media) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(media.secureUrl);
    setCopied(true);
    toast.success("Image URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full bg-card p-6 rounded-3xl border border-border/80 shadow-2xl">
        <DialogHeader className="border-b border-border/60 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
                {media.section || "Website Media"}
              </span>
              <DialogTitle className="font-display text-2xl font-medium text-espresso">
                {slotLabel || media.slotKey || "Media Preview"}
              </DialogTitle>
            </div>
            <span className="font-mono text-xs bg-sand px-3 py-1 rounded-full text-espresso font-medium">
              {media.format.toUpperCase()} · {media.width} × {media.height}px
            </span>
          </div>
        </DialogHeader>

        {/* Image Full Box */}
        <div className="relative w-full max-h-[60vh] min-h-[300px] overflow-hidden rounded-2xl bg-sand/30 border border-border flex items-center justify-center my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.secureUrl}
            alt={media.alt || "Uploaded media preview"}
            className="max-h-[58vh] max-w-full object-contain rounded-xl shadow-xs"
          />
        </div>

        {/* Metadata Details & Copy Bar */}
        <div className="space-y-3 pt-2">
          <div className="bg-sand/40 p-3.5 rounded-xl border border-border/60 text-xs space-y-1.5 text-espresso">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-espresso">Alt Text:</span>
              <span className="text-taupe italic">&ldquo;{media.alt}&rdquo;</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-espresso">Cloudinary Public ID:</span>
              <span className="font-mono text-taupe text-[11px]">{media.publicId}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
            >
              {copied ? <Check className="h-4 w-4 mr-1.5 text-emerald-600" /> : <Copy className="h-4 w-4 mr-1.5" />}
              <span>{copied ? "Copied URL" : "Copy Image URL"}</span>
            </Button>

            <Button asChild size="sm" variant="secondary">
              <a href={media.secureUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1.5" />
                <span>Open Original</span>
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
