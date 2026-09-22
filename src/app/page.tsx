import React from "react";
import HeroSection from "@/components/sections/hero-section";
import CategorySection from "@/components/sections/category-section";
import BenefitsSection from "@/components/sections/benefits-section";
import CurtainRevealSection from "@/components/sections/curtain-reveal-section";
import GallerySection from "@/components/sections/gallery-section";
import StyleSection from "@/components/sections/style-section";
import AboutSection from "@/components/sections/about-us-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import FAQSection from "@/components/sections/faq-section";
import ContactCTASection from "@/components/sections/contact-cta-section";
import LocationSection from "@/components/sections/location-section";
import LocalBusinessSchema from "@/components/seo/local-business-schema";
import WebsiteSchema from "@/components/seo/website-schema";
import FAQSchema from "@/components/seo/faq-schema";
import { getMediaForSlot } from "@/lib/media/queries";

export default async function HomePage() {
  const [logoMedia, heroMedia] = await Promise.all([
    getMediaForSlot("branding.logo-primary"),
    getMediaForSlot("hero.main"),
  ]);

  return (
    <>
      <LocalBusinessSchema logoMedia={logoMedia} coverMedia={heroMedia} />
      <WebsiteSchema />
      <FAQSchema />
      <HeroSection />
      <CategorySection />
      <BenefitsSection />
      <CurtainRevealSection />
      <GallerySection />
      <StyleSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTASection />
      <LocationSection />
    </>
  );
}
