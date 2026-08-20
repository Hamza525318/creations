"use client";

import React, { useState } from "react";
import { MediaSlot } from "@/config/media-slots";
import { validateImageFile } from "@/lib/media/validation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Upload, AlertCircle, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaUploadDialogProps {
  slot: MediaSlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function MediaUploadDialog({
  slot,
  open,
  onOpenChange,
  onSuccess,
}: MediaUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    if (!altText) {
      setAltText(`${slot.label} photograph for CREATION'S website`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setUploadProgress(15);
      setError(null);

      // 1. Get signed params from server
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotKey: slot.key,
          altText: altText || slot.label,
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
        const cldError = errJson?.error?.message;
        if (cldError?.includes("api_secret") || cldError?.includes("signature") || uploadRes.status === 401) {
          throw new Error(
            "Cloudinary 401 Unauthorized: Invalid CLOUDINARY_API_SECRET in .env.local. Please verify your API secret in the Cloudinary Dashboard."
          );
        }
        throw new Error(cldError || "Direct Cloudinary upload failed.");
      }

      setUploadProgress(85);

      // 3. Trigger cache revalidation
      await fetch("/api/cloudinary/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "revalidate",
          slotKey: slot.key,
        }),
      });

      setUploadProgress(100);
      toast.success(`${slot.label} updated successfully!`);
      
      // Reset & notify parent
      setTimeout(() => {
        setUploading(false);
        setFile(null);
        setPreviewUrl(null);
        onOpenChange(false);
        onSuccess();
      }, 500);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "An unexpected error occurred during upload.");
      setUploading(false);
      toast.error("Upload failed. Existing media remains unchanged.");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col justify-between overflow-y-auto max-w-lg w-full">
        <div className="space-y-6">
          <SheetHeader className="pb-4 border-b border-border/60">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
              {slot.section} Section
            </span>
            <SheetTitle className="font-display text-2xl font-medium text-espresso">
              Upload {slot.label}
            </SheetTitle>
          </SheetHeader>

          {/* Slot Guidance Badge */}
          <div className="rounded-xl bg-sand/60 p-4 border border-border/80 text-xs space-y-1.5 text-espresso">
            <div className="flex items-center justify-between font-medium">
              <span>Target Aspect Ratio: <strong className="text-burgundy">{slot.aspectRatio}</strong></span>
              {slot.recommendedWidth && (
                <span>Dimensions: <strong>{slot.recommendedWidth} × {slot.recommendedHeight}px</strong></span>
              )}
            </div>
            {slot.description && <p className="text-taupe">{slot.description}</p>}
          </div>

          {/* Drag & Drop Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-strong/60 rounded-2xl bg-card hover:bg-sand/30 transition-colors text-center cursor-pointer"
          >
            {previewUrl ? (
              <div className="relative w-full max-h-56 overflow-hidden rounded-xl bg-sand/40 border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreviewUrl(null); }}
                  className="absolute top-2 right-2 bg-espresso/80 text-ivory text-xs px-2 py-1 rounded-md hover:bg-burgundy"
                >
                  Change File
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-burgundy">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-sans text-sm font-semibold text-espresso block">
                    Click to select or drop image here
                  </span>
                  <span className="font-sans text-xs text-taupe block pt-1">
                    Supports JPG, PNG, WebP up to 10 MB
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

          {/* Alt Text Input */}
          <div className="space-y-2">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Image Alt Text (Accessibility)
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g. Neutral living room curtain installation in Besant Nagar"
              className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-burgundy"
            />
            <p className="text-[11px] text-taupe">
              Descriptive text for screen readers and search engines.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-border/60 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={uploading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            className="flex-1"
            disabled={!file || uploading}
            onClick={handleUpload}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Uploading ({uploadProgress}%)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <span>Upload & Publish</span>
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
