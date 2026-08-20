import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Owner Passcode",
      credentials: {
        email: { label: "Owner Email", type: "email", placeholder: "owner@example.com" },
        passcode: { label: "Admin Passcode", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const allowedEmail = process.env.ADMIN_EMAIL || "owner@creations.com";
        const adminSecret = process.env.AUTH_SECRET || "creations-admin-secret";

        if (
          credentials.email.toLowerCase() === allowedEmail.toLowerCase() &&
          (credentials.passcode === adminSecret || process.env.NODE_ENV === "development")
        ) {
          return {
            id: "owner-1",
            name: "CREATION'S Owner",
            email: allowedEmail,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmail = process.env.ADMIN_EMAIL;
      if (!allowedEmail) return true;
      return user.email?.toLowerCase() === allowedEmail.toLowerCase();
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "creations-admin-secret-key-32-chars",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
