import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHeader from "@/components/admin/admin-header";
import { Toaster } from "sonner";
import AuthProvider from "@/components/admin/auth-provider";

export const metadata: Metadata = {
  title: "CREATION'S Owner Media Manager",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <div className="min-h-screen flex flex-col bg-background text-espresso antialiased">
        {session && <AdminHeader userEmail={session.user?.email || ""} />}
        <main className="flex-1 pb-16">{children}</main>
        <Toaster position="top-right" richColors />
      </div>
    </AuthProvider>
  );
}
