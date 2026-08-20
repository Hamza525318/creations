import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  updateMediaAltText,
  deleteMediaAsset,
  reorderGalleryCollection,
  invalidateMediaCache,
} from "@/lib/media/mutations";
import { getAllWebsiteMediaDirect } from "@/lib/media/queries";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const mediaMap = await getAllWebsiteMediaDirect();
    return NextResponse.json({ success: true, mediaMap });
  } catch (error: any) {
    console.error("Fetch media error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch media map." },
      { status: error.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authorize Admin
    await requireAdmin();

    // 2. Parse Action
    const body = await req.json();
    const { action, publicId, slotKey, altText, publicIds } = body;

    if (action === "get-all") {
      const mediaMap = await getAllWebsiteMediaDirect();
      return NextResponse.json({ success: true, mediaMap });
    }

    if (action === "update-alt") {
      if (!publicId || !slotKey || typeof altText !== "string") {
        return NextResponse.json({ error: "Missing publicId, slotKey, or altText" }, { status: 400 });
      }
      await updateMediaAltText(publicId, slotKey, altText);
      const mediaMap = await getAllWebsiteMediaDirect();
      return NextResponse.json({ success: true, message: "Alt text updated successfully.", mediaMap });
    }

    if (action === "delete") {
      if (!publicId || !slotKey) {
        return NextResponse.json({ error: "Missing publicId or slotKey" }, { status: 400 });
      }
      await deleteMediaAsset(publicId, slotKey);
      const mediaMap = await getAllWebsiteMediaDirect();
      return NextResponse.json({ success: true, message: "Asset removed successfully.", mediaMap });
    }

    if (action === "reorder") {
      if (!Array.isArray(publicIds) || !slotKey) {
        return NextResponse.json({ error: "Missing publicIds array or slotKey" }, { status: 400 });
      }
      await reorderGalleryCollection(publicIds, slotKey);
      const mediaMap = await getAllWebsiteMediaDirect();
      return NextResponse.json({ success: true, message: "Gallery reordered successfully.", mediaMap });
    }

    if (action === "revalidate") {
      await invalidateMediaCache(slotKey);
      const mediaMap = await getAllWebsiteMediaDirect();
      return NextResponse.json({ success: true, message: "Media cache revalidated.", mediaMap });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (error: any) {
    console.error("Media management error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to perform media action." },
      { status: error.message?.includes("Unauthorized") ? 401 : 500 }
    );
  }
}
