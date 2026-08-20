import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import Container from "@/components/layout/container";
import AdminHeader from "@/components/admin/admin-header";
import CategoryCatalogClient from "@/components/admin/catalog/category-catalog-client";
import { getCatalogItems } from "@/lib/catalog/queries";
import { isValidCategory } from "@/lib/catalog/validation";
import { CatalogCategory } from "@/lib/catalog/types";
import { CATEGORIES } from "@/config/categories";

interface AdminCategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: AdminCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORIES[category as CatalogCategory]?.label || "Collection";
  return {
    title: `Manage ${label} | CREATION'S Admin`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminCategoryPage({
  params,
}: AdminCategoryPageProps) {
  const session = await requireAdmin();
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const items = await getCatalogItems(category as CatalogCategory, true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AdminHeader userEmail={session.email} />
      <main className="flex-1 py-10">
        <Container>
          <CategoryCatalogClient
            category={category as CatalogCategory}
            initialItems={items}
          />
        </Container>
      </main>
    </div>
  );
}
