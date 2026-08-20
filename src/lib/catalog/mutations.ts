import { cloudinary } from "@/lib/cloudinary/server";
import { CatalogCategory, CatalogStatus } from "./types";
import { buildCatalogContextString } from "./mapping";
import { revalidateTag, revalidatePath } from "next/cache";

export async function updateCatalogItemMetadata(params: {
  publicId: string;
  category: CatalogCategory;
  title?: string;
  description?: string;
  priceDisplay?: string;
  alt: string;
  status: CatalogStatus;
  order?: number;
}) {
  const contextStr = buildCatalogContextString({
    category: params.category,
    alt: params.alt,
    title: params.title,
    description: params.description,
    priceDisplay: params.priceDisplay,
    status: params.status,
    order: params.order ?? 0,
  });

  await cloudinary.uploader.add_context(contextStr, [params.publicId]);

  await invalidateCatalogCache(params.category);
  return { success: true };
}

export async function deleteCatalogItem(publicId: string, category: CatalogCategory) {
  // 1. Verify resource exists and has tag creations-catalog
  const resource = await cloudinary.api.resource(publicId, { context: true, tags: true });
  
  if (!resource || !resource.tags?.includes("creations-catalog")) {
    throw new Error("Asset is not a managed creations-catalog item.");
  }

  // 2. Destroy asset
  const result = await cloudinary.uploader.destroy(publicId);

  // 3. Invalidate cache
  await invalidateCatalogCache(category);
  return { success: true, result };
}

export async function reorderCatalogItems(category: CatalogCategory, publicIds: string[]) {
  // Sequentially update catalog_display_order
  for (let index = 0; index < publicIds.length; index++) {
    const publicId = publicIds[index];
    await cloudinary.uploader.add_context(
      `catalog_display_order=${index}`,
      [publicId]
    );
  }

  await invalidateCatalogCache(category);
  return { success: true };
}

export async function invalidateCatalogCache(category?: CatalogCategory) {
  if (category) {
    revalidateTag(`catalog:${category}`, "max");
    revalidatePath(`/${category}`);
    revalidatePath(`/admin/collections/${category}`);
  }
  revalidateTag("catalog", "max");
  revalidatePath("/admin/collections");
}
