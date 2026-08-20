"use client";

import React, { useState } from "react";
import { CatalogCategory, CatalogStatus } from "@/lib/catalog/types";
import { CATEGORIES } from "@/config/categories";
import { validateImageFile } from "@/lib/media/validation";
import { validateCatalogInput } from "@/lib/catalog/validation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Upload, AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CatalogUploadDialogProps {
  category: CatalogCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CatalogUploadDialog({
  category,
  open,
  onOpenChange,
  onSuccess,
}: CatalogUploadDialogProps) {
  const catDef = CATEGORIES[category];
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceDisplay, setPriceDisplay] = useState("");
  const [status, setStatus] = useState<CatalogStatus>("published");
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    const validation = validateImageFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    if (!alt) {
      setAlt(`${catDef.label} design photograph for CREATION'S catalog`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    // Validate inputs
    const inputValidation = validateCatalogInput({
      category,
      alt,
      title,
      description,
      priceDisplay,
      status,
    });

    if (!inputValidation.valid) {
      setError(inputValidation.error || "Invalid input fields.");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(15);
      setError(null);

      // 1. Get signed upload params from server
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uploadType: "catalog",
          category,
          altText: alt,
          title,
          description,
          priceDisplay,
          status,
        }),
      });

      if (!signRes.ok) {
        const signError = await signRes.json().catch(() => ({}));
        throw new Error(signError.error || "Failed to authorize upload signature.");
      }

      const signData = await signRes.json();
      setUploadProgress(40);

      // 2. Direct upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp.toString());
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);
      formData.append("public_id", signData.publicId);
      formData.append("tags", signData.tags);
      formData.append("context", signData.context);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`;

      const uploadRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errJson = await uploadRes.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || "Direct Cloudinary upload failed.");
      }

      setUploadProgress(85);

      // 3. Trigger cache revalidation
      await fetch("/api/catalog/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "revalidate",
          category,
        }),
      });

      setUploadProgress(100);
      toast.success(`${title || catDef.label + " design"} added successfully!`);

      // Reset state & close
      setTimeout(() => {
        setUploading(false);
        setFile(null);
        setPreviewUrl(null);
        setAlt("");
        setTitle("");
        setDescription("");
        setPriceDisplay("");
        setStatus("published");
        onOpenChange(false);
        onSuccess();
      }, 400);
    } catch (err: any) {
      console.error("Catalog upload error:", err);
      setError(err.message || "An unexpected error occurred during upload.");
      setUploading(false);
      toast.error("Upload failed. No changes were published.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col justify-between overflow-y-auto max-w-lg w-full">
        <div className="space-y-5">
          <SheetHeader className="pb-3 border-b border-border/60">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
              {catDef.label} Collection
            </span>
            <SheetTitle className="font-display text-2xl font-medium text-espresso">
              Add {catDef.label} Design
            </SheetTitle>
          </SheetHeader>

          {/* Image Upload Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-border-strong/60 rounded-2xl bg-card hover:bg-sand/30 transition-colors text-center cursor-pointer"
          >
            {previewUrl ? (
              <div className="relative w-full max-h-52 overflow-hidden rounded-xl bg-sand/40 border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-full h-44 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreviewUrl(null); }}
                  className="absolute top-2 right-2 bg-espresso/80 text-ivory text-xs px-2.5 py-1 rounded-md hover:bg-burgundy shadow-xs"
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full space-y-2.5 py-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-burgundy">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-sans text-sm font-semibold text-espresso block">
                    Click or drop photo here *
                  </span>
                  <span className="font-sans text-xs text-taupe block pt-0.5">
                    JPG, PNG, WebP · 4:5 ratio recommended · up to 10MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-3.5">
            {/* Alt Text (Required) */}
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-espresso flex items-center justify-between">
                <span>Accessibility Alt Text *</span>
                <span className="text-[10px] text-burgundy font-normal">Required for SEO & A11y</span>
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="e.g. Floor-length neutral linen curtain in sunlit Besant Nagar living room"
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-burgundy"
                required
              />
            </div>

            {/* Title (Optional) */}
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-espresso block">
                Design / Product Title <span className="text-taupe font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Textured Linen Sheer Curtain"
                maxLength={100}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>

            {/* Description (Optional) */}
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-espresso flex items-center justify-between">
                <span>Description <span className="text-taupe font-normal">(Optional, max 400 chars)</span></span>
                <span className="text-[10px] text-taupe">{description.length}/400</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Soft neutral sheers tailored to diffuse afternoon sunlight while preserving privacy."
                rows={2}
                maxLength={400}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-burgundy resize-none"
              />
            </div>

            {/* Price Display (Optional) */}
            <div className="space-y-1">
              <label className="font-sans text-xs font-semibold text-espresso block">
                Price Display <span className="text-taupe font-normal">(Optional text, e.g. &ldquo;₹850 / metre&rdquo; or &ldquo;From ₹1,200&rdquo;)</span>
              </label>
              <input
                type="text"
                value={priceDisplay}
                onChange={(e) => setPriceDisplay(e.target.value)}
                placeholder="e.g. ₹850 / metre"
                maxLength={50}
                className="w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-espresso focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>

            {/* Publishing Status Toggle */}
            <div className="pt-1">
              <label className="font-sans text-xs font-semibold text-espresso block mb-1.5">
                Visibility Status
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
                  ● Published (Live on site)
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
                  ○ Draft (Admin only)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-border/60 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 text-xs"
            disabled={uploading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            className="flex-1 text-xs"
            disabled={!file || uploading}
            onClick={handleUpload}
          >
            {uploading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                <span>Uploading ({uploadProgress}%)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                <span>{status === "published" ? "Upload & Publish" : "Save as Draft"}</span>
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
