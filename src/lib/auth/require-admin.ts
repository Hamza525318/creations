import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function checkIsAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return false;
  }

  const allowedEmail = process.env.ADMIN_EMAIL;
  if (!allowedEmail) {
    // If no ADMIN_EMAIL is explicitly configured, allow authenticated session in development
    return process.env.NODE_ENV === "development";
  }

  return session.user.email.toLowerCase() === allowedEmail.toLowerCase();
}

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    throw new Error("Unauthorized: Admin authentication required.");
  }

  const allowedEmail = process.env.ADMIN_EMAIL;
  if (allowedEmail && session.user.email.toLowerCase() !== allowedEmail.toLowerCase()) {
    throw new Error("Forbidden: Email address is not authorized as site owner.");
  }

  return { email: session.user.email };
}
