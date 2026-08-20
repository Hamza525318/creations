"use client";

import React, { useState, useEffect } from "react";
import { CatalogItem, CatalogStatus } from "@/lib/catalog/types";
import { validateCatalogInput } from "@/lib/catalog/validation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";

interface CatalogEditDialogProps {
  item: CatalogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CatalogEditDialog({
  item,
  open,
  onOpenChange,
  onSuccess,
}: CatalogEditDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceDisplay, setPriceDisplay] = useState("");
  const [alt, setAlt] = useState("");
  const [status, setStatus] = useState<CatalogStatus>("published");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setPriceDisplay(item.priceDisplay || "");
      setAlt(item.alt || "");
      setStatus(item.status || "published");
      setError(null);
    }
  }, [item]);

  if (!item) return null;

  const handleSave = async () => {
    const validation = validateCatalogInput({
      category: item.category,
      alt,
      title,
      description,
      priceDisplay,
      status,
    });

    if (!validation.valid) {
      setError(validation.error || "Invalid input.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/catalog/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-metadata",
          publicId: item.publicId,
          category: item.category,
          title,
          description,
          priceDisplay,
          alt,
          status,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update item metadata.");
      }

      toast.success("Design details updated successfully.");
      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to save changes.");
      toast.error("Failed to update design.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full bg-card p-6 rounded-3xl border border-border shadow-2xl">
        <DialogHeader className="border-b border-border/60 pb-3">
          <DialogTitle className="font-display text-2xl font-medium text-espresso">
            Edit Design Details
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4 py-2">
          {/* Alt text */}
          <div className="space-y-1">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Accessibility Alt Text *
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:ring-1 focus:ring-burgundy"
              required
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Design Title <span className="text-taupe font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Linen Sheer Curtain"
              maxLength={100}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:ring-1 focus:ring-burgundy"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-sans text-xs font-semibold text-espresso">
                Description <span className="text-taupe font-normal">(Optional)</span>
              </label>
              <span className="text-[10px] text-taupe">{description.length}/400</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of fabric, texture, or design..."
              rows={3}
              maxLength={400}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:ring-1 focus:ring-burgundy resize-none"
            />
          </div>

          {/* Price display */}
          <div className="space-y-1">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Price Display <span className="text-taupe font-normal">(Optional, e.g. &ldquo;₹850 / metre&rdquo;)</span>
            </label>
            <input
              type="text"
              value={priceDisplay}
              onChange={(e) => setPriceDisplay(e.target.value)}
              placeholder="e.g. ₹850 / metre"
              maxLength={50}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:ring-1 focus:ring-burgundy"
            />
          </div>

          {/* Status */}
          <div className="pt-1">
            <label className="font-sans text-xs font-semibold text-espresso block mb-1.5">
              Publishing Visibility
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("published")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  status === "published"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400"
                    : "bg-card text-taupe border-border hover:bg-sand/40"
                }`}
              >
                ● Published (Public)
              </button>
              <button
                type="button"
                onClick={() => setStatus("draft")}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  status === "draft"
                    ? "bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400"
                    : "bg-card text-taupe border-border hover:bg-sand/40"
                }`}
              >
                ○ Draft (Admin Only)
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5 mr-1.5" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
