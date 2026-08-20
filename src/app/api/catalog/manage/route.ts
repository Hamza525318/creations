import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  updateCatalogItemMetadata,
  deleteCatalogItem,
  reorderCatalogItems,
  invalidateCatalogCache,
} from "@/lib/catalog/mutations";
import { getCatalogItems } from "@/lib/catalog/queries";
import { validateCatalogInput } from "@/lib/catalog/validation";
import { CatalogCategory } from "@/lib/catalog/types";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") as CatalogCategory;

    if (!category) {
      return NextResponse.json({ error: "Missing category parameter" }, { status: 400 });
    }

    const items = await getCatalogItems(category, true);
    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("Fetch catalog error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch catalog items." },
      { status: error.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize Admin
    await requireAdmin();

    // 2. Parse payload
    const body = await req.json();
    const { action, category, publicId, title, description, priceDisplay, alt, status, publicIds } = body;

    if (!category) {
      return NextResponse.json({ error: "Missing category" }, { status: 400 });
    }

    if (action === "get-all") {
      const items = await getCatalogItems(category as CatalogCategory, true);
      return NextResponse.json({ success: true, items });
    }

    if (action === "update-metadata") {
      if (!publicId || !alt) {
        return NextResponse.json({ error: "Missing publicId or alt text" }, { status: 400 });
      }

      const validation = validateCatalogInput({
        category,
        alt,
        title,
        description,
        priceDisplay,
        status,
      });

      if (!validation.valid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }

      await updateCatalogItemMetadata({
        publicId,
        category: category as CatalogCategory,
        title,
        description,
        priceDisplay,
        alt,
        status: status || "published",
      });

      const items = await getCatalogItems(category as CatalogCategory, true);
      return NextResponse.json({
        success: true,
        message: "Catalog item updated successfully.",
        items,
      });
    }

    if (action === "delete") {
      if (!publicId) {
        return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
      }

      await deleteCatalogItem(publicId, category as CatalogCategory);
      const items = await getCatalogItems(category as CatalogCategory, true);
      return NextResponse.json({
        success: true,
        message: "Catalog item deleted successfully.",
        items,
      });
    }

    if (action === "reorder") {
      if (!Array.isArray(publicIds)) {
        return NextResponse.json({ error: "Missing publicIds array" }, { status: 400 });
      }

      await reorderCatalogItems(category as CatalogCategory, publicIds);
      const items = await getCatalogItems(category as CatalogCategory, true);
      return NextResponse.json({
        success: true,
        message: "Catalog order updated successfully.",
        items,
      });
    }

    if (action === "revalidate") {
      await invalidateCatalogCache(category as CatalogCategory);
      const items = await getCatalogItems(category as CatalogCategory, true);
      return NextResponse.json({
        success: true,
        message: "Catalog cache revalidated.",
        items,
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    console.error("Catalog management error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to perform catalog action." },
      { status: error.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
