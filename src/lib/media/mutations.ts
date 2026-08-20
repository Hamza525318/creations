import { cloudinary } from "@/lib/cloudinary/server";
import { MEDIA_SLOTS } from "@/config/media-slots";
import { revalidateTag, revalidatePath } from "next/cache";

export async function updateMediaAltText(publicId: string, slotKey: string, altText: string) {
  const slotDef = MEDIA_SLOTS[slotKey];
  if (!slotDef) {
    throw new Error(`Invalid media slot key: ${slotKey}`);
  }

  await cloudinary.uploader.add_context(
    `alt_text=${altText}`,
    [publicId]
  );

  revalidateTag(`site-media:${slotKey}`, "max");
  revalidateTag("site-media", "max");
  revalidatePath("/");
  return { success: true };
}

export async function deleteMediaAsset(publicId: string, slotKey: string) {
  const slotDef = MEDIA_SLOTS[slotKey];
  if (!slotDef) {
    throw new Error(`Invalid media slot key: ${slotKey}`);
  }

  // Delete asset from Cloudinary
  const result = await cloudinary.uploader.destroy(publicId);

  revalidateTag(`site-media:${slotKey}`, "max");
  revalidateTag("site-media", "max");
  revalidatePath("/");
  return { success: true, result };
}

export async function reorderGalleryCollection(publicIds: string[], slotKey: string) {
  const slotDef = MEDIA_SLOTS[slotKey];
  if (!slotDef || slotDef.mode !== "collection") {
    throw new Error(`Invalid collection slot key: ${slotKey}`);
  }

  // Sequentially update context.display_order for each asset
  for (let index = 0; index < publicIds.length; index++) {
    const publicId = publicIds[index];
    await cloudinary.uploader.add_context(
      `display_order=${index}`,
      [publicId]
    );
  }

  revalidateTag(`site-media:${slotKey}`, "max");
  revalidateTag("site-media", "max");
  revalidatePath("/");
  return { success: true };
}

export async function invalidateMediaCache(slotKey?: string) {
  if (slotKey) {
    revalidateTag(`site-media:${slotKey}`, "max");
  }
  revalidateTag("site-media", "max");
  revalidatePath("/");
}
