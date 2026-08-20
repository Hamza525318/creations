import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/layout/container";
import MediaAdminClient from "@/components/admin/media-admin-client";
import { getAllWebsiteMediaDirect } from "@/lib/media/queries";

export default async function AdminMediaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Initial server-side query of live Cloudinary media
  const initialMediaMap = await getAllWebsiteMediaDirect();

  return (
    <Container className="py-8 space-y-8">
      {/* Intro Header */}
      <div className="border-b border-border/80 pb-6 space-y-2">
        <span className="font-sans text-xs font-bold uppercase tracking-widest text-burgundy">
          Website Photography & Asset Control
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
          Owner Media Manager
        </h1>
        <p className="font-sans text-sm text-taupe max-w-2xl leading-relaxed">
          Manage the photography displayed across the CREATION&apos;S website. Upload replacement imagery, organize gallery projects, update alt text for accessibility, and publish live changes directly to Cloudinary.
        </p>
      </div>

      {/* Client Dashboard Component */}
      <MediaAdminClient initialMediaMap={initialMediaMap} />
    </Container>
  );
}
