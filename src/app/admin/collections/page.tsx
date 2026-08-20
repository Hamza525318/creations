import React from "react";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/require-admin";
import Container from "@/components/layout/container";
import AdminHeader from "@/components/admin/admin-header";
import CollectionsOverviewClient from "@/components/admin/catalog/collections-overview-client";
import { getCatalogCounts } from "@/lib/catalog/queries";
import { getMediaForSlot } from "@/lib/media/queries";
import { CATEGORY_LIST } from "@/config/categories";
import { WebsiteMedia } from "@/lib/media/types";

export const metadata: Metadata = {
  title: "Collections CMS | CREATION'S Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCollectionsPage() {
  const session = await requireAdmin();

  // Fetch live counts
  const counts = await getCatalogCounts();

  // Fetch cover media for preview
  const covers: Record<string, WebsiteMedia | null> = {};
  for (const cat of CATEGORY_LIST) {
    covers[cat.coverSlot] = await getMediaForSlot(cat.coverSlot);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader userEmail={session.email} />
      <main className="flex-1 py-10">
        <Container>
          <CollectionsOverviewClient counts={counts} covers={covers} />
        </Container>
      </main>
    </div>
  );
}
