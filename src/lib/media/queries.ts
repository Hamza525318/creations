import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary/server";
import { WebsiteMedia } from "./types";
import { MEDIA_SLOTS } from "@/config/media-slots";
import { unstable_cache } from "next/cache";

export function parseCloudinaryAsset(resource: any, slotKey?: string): WebsiteMedia {
  const context = resource.context?.custom || resource.context || {};
  const effectiveSlot = slotKey || context.website_slot || "";
  const slotDef = MEDIA_SLOTS[effectiveSlot];

  return {
    assetId: resource.asset_id || resource.public_id,
    publicId: resource.public_id,
    secureUrl: resource.secure_url,
    width: resource.width || 0,
    height: resource.height || 0,
    format: resource.format || "jpg",
    slotKey: effectiveSlot,
    section: slotDef?.section || context.website_section || "",
    alt: context.alt_text || context.alt || slotDef?.label || "CREATION'S Furnishing Photography",
    displayOrder: parseInt(context.display_order || "0", 10) || 0,
    createdAt: resource.created_at || new Date().toISOString(),
  };
}

async function fetchMediaForSlotRaw(slotKey: string): Promise<WebsiteMedia | null> {
  if (!isCloudinaryConfigured()) return null;

  try {
    const slotDef = MEDIA_SLOTS[slotKey];
    const folder = slotDef?.cloudinaryFolder || "creations/website";

    const result = await cloudinary.search
      .expression(`tags=creations-website AND folder="${folder}*" AND context.website_slot="${slotKey}"`)
      .sort_by("created_at", "desc")
      .max_results(1)
      .with_field("context")
      .execute();

    if (result.resources && result.resources.length > 0) {
      return parseCloudinaryAsset(result.resources[0], slotKey);
    }
    return null;
  } catch (error) {
    console.error(`Error querying media for slot [${slotKey}]:`, error);
    return null;
  }
}

async function fetchMediaCollectionRaw(slotKey: string): Promise<WebsiteMedia[]> {
  if (!isCloudinaryConfigured()) return [];

  try {
    const slotDef = MEDIA_SLOTS[slotKey];
    const folder = slotDef?.cloudinaryFolder || "creations/website";

    const result = await cloudinary.search
      .expression(`tags=creations-website AND folder="${folder}*" AND context.website_slot="${slotKey}"`)
      .max_results(slotDef?.maxItems || 20)
      .with_field("context")
      .execute();

    if (!result.resources || result.resources.length === 0) return [];

    const items = result.resources.map((res: any) => parseCloudinaryAsset(res, slotKey));

    return items.sort((a: WebsiteMedia, b: WebsiteMedia) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.error(`Error querying media collection for slot [${slotKey}]:`, error);
    return [];
  }
}

export async function getMediaForSlot(slotKey: string): Promise<WebsiteMedia | null> {
  return unstable_cache(
    () => fetchMediaForSlotRaw(slotKey),
    [`media-slot-${slotKey}`],
    {
      revalidate: 3600,
      tags: ["site-media", `site-media:${slotKey}`],
    }
  )();
}

export async function getMediaCollection(slotKey: string): Promise<WebsiteMedia[]> {
  return unstable_cache(
    () => fetchMediaCollectionRaw(slotKey),
    [`media-collection-${slotKey}`],
    {
      revalidate: 3600,
      tags: ["site-media", `site-media:${slotKey}`],
    }
  )();
}

export async function getAllWebsiteMediaDirect(): Promise<Record<string, WebsiteMedia | WebsiteMedia[]>> {
  if (!isCloudinaryConfigured()) return {};

  try {
    const result = await cloudinary.search
      .expression("tags=creations-website")
      .max_results(100)
      .with_field("context")
      .execute();

    const mediaMap: Record<string, WebsiteMedia | WebsiteMedia[]> = {};

    if (!result.resources || result.resources.length === 0) return mediaMap;

    const resources = result.resources;

    for (const slotKey of Object.keys(MEDIA_SLOTS)) {
      const slotDef = MEDIA_SLOTS[slotKey];
      const slotResources = resources.filter(
        (res: any) => (res.context?.custom?.website_slot || res.context?.website_slot) === slotKey
      );

      if (slotDef.mode === "collection") {
        const items = slotResources
          .map((res: any) => parseCloudinaryAsset(res, slotKey))
          .sort((a: WebsiteMedia, b: WebsiteMedia) => a.displayOrder - b.displayOrder);
        mediaMap[slotKey] = items;
      } else {
        if (slotResources.length > 0) {
          // Sort by creation date desc
          slotResources.sort(
            (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          mediaMap[slotKey] = parseCloudinaryAsset(slotResources[0], slotKey);
        }
      }
    }

    return mediaMap;
  } catch (error) {
    console.error("Error fetching all website media:", error);
    return {};
  }
}
