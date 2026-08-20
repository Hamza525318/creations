import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileContactBar from "@/components/common/contact-bar";
import { getMediaForSlot } from "@/lib/media/queries";
import { siteConfig } from "@/config/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CREATION'S | Home Furnishings in Besant Nagar, Chennai",
    template: "%s | CREATION'S",
  },
  description:
    "Explore bespoke curtains, precision window blinds, upholstery fabrics, and luxury bedspreads at CREATION'S in Besant Nagar, Chennai.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: siteConfig.url,
    title: "CREATION'S | Home Furnishings in Besant Nagar, Chennai",
    description:
      "Explore bespoke curtains, precision window blinds, upholstery fabrics, and luxury bedspreads at CREATION'S in Besant Nagar, Chennai.",
    images: [
      {
        url: `${siteConfig.url}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "CREATION'S - Home Furnishings in Besant Nagar, Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CREATION'S | Home Furnishings in Besant Nagar, Chennai",
    description:
      "Explore bespoke curtains, precision window blinds, upholstery fabrics, and luxury bedspreads at CREATION'S in Besant Nagar, Chennai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logoMedia = await getMediaForSlot("branding.logo-primary");

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased selection:bg-burgundy selection:text-ivory">
        <Header logoMedia={logoMedia} />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileContactBar />
      </body>
    </html>
  );
}
