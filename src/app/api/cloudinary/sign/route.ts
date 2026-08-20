import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { MEDIA_SLOTS } from "@/config/media-slots";
import { CATEGORIES } from "@/config/categories";
import { CatalogCategory } from "@/lib/catalog/types";
import { buildCatalogContextString } from "@/lib/catalog/mapping";
import { generateUploadSignature } from "@/lib/cloudinary/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize Admin
    await requireAdmin();

    // 2. Parse payload
    const body = await req.json();
    const { uploadType, slotKey, category, altText, title, description, priceDisplay, status } = body;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "";
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

    // CASE A: Catalog Item Upload
    if (uploadType === "catalog" || (category && CATEGORIES[category as CatalogCategory])) {
      const catKey = category as CatalogCategory;
      const catDef = CATEGORIES[catKey];
      const folder = catDef.cloudinaryFolder;
      const publicId = `catalog-${catKey}-${Date.now()}`;
      const tags = `creations-catalog,creations-catalog-${catKey}`;

      const context = buildCatalogContextString({
        category: catKey,
        alt: altText || `${catDef.label} Design`,
        title,
        description,
        priceDisplay,
        status: status || "published",
        order: Date.now(), // temporary order, sorted by admin
      });

      const paramsToSign: Record<string, any> = {
        context,
        folder,
        public_id: publicId,
        tags,
        timestamp,
      };

      const signature = generateUploadSignature(paramsToSign);

      return NextResponse.json({
        timestamp,
        signature,
        apiKey,
        cloudName,
        folder,
        publicId,
        tags,
        context,
      });
    }

    // CASE B: Fixed Media Slot Upload
    if (!slotKey || !MEDIA_SLOTS[slotKey]) {
      return NextResponse.json(
        { error: `Invalid or unconfigured media slot / category: ${slotKey || category}` },
        { status: 400 }
      );
    }

    const slotDef = MEDIA_SLOTS[slotKey];
    const folder = slotDef.cloudinaryFolder;
    const cleanSlotName = slotKey.replace(/[^a-zA-Z0-9]/g, "-");
    const publicId = `${cleanSlotName}-${Date.now()}`;
    const tags = "creations-website";
    const sanitizeAlt = (altText || slotDef.label).replace(/[|]/g, " ");
    const context = `website_slot=${slotKey}|website_section=${slotDef.section}|alt_text=${sanitizeAlt}|display_order=0`;

    const paramsToSign: Record<string, any> = {
      context,
      folder,
      public_id: publicId,
      tags,
      timestamp,
    };

    const signature = generateUploadSignature(paramsToSign);

    return NextResponse.json({
      timestamp,
      signature,
      apiKey,
      cloudName,
      folder,
      publicId,
      tags,
      context,
    });
  } catch (error: any) {
    console.error("Cloudinary sign error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate upload signature." },
      { status: error.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
