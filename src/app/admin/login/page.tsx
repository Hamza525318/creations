"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { ShieldCheck, LogIn, Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        passcode,
      });

      if (res?.error) {
        setError("Invalid email or admin passcode.");
        setLoading(false);
      } else {
        router.push("/admin/media");
        router.refresh();
      }
    } catch (err: any) {
      setError("Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl border border-border shadow-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sand text-burgundy shadow-xs">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-espresso">
            {siteConfig.name}
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-burgundy font-bold">
            Owner Media Portal
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Owner Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-taupe" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="owner@creations.com"
                className="w-full rounded-xl border border-border bg-ivory pl-10 pr-4 py-2.5 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-burgundy"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-xs font-semibold text-espresso block">
              Admin Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-taupe" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-ivory pl-10 pr-4 py-2.5 text-sm text-espresso focus:outline-none focus:ring-2 focus:ring-burgundy"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center mt-2"
            disabled={loading}
          >
            <LogIn className="h-4 w-4 mr-2" />
            <span>{loading ? "Authenticating..." : "Sign In to Media Manager"}</span>
          </Button>
        </form>

        {/* Google OAuth Option */}
        <div className="pt-4 border-t border-border/60 text-center space-y-3">
          <p className="font-sans text-xs text-taupe">Or authenticate via Google</p>
          <Button
            variant="outline"
            className="w-full justify-center text-xs"
            onClick={() => signIn("google", { callbackUrl: "/admin/media" })}
          >
            Sign in with Google Account
          </Button>
        </div>
      </div>
    </div>
  );
}
