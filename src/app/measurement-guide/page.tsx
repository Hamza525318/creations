import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/container";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/config/seo";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import {
  beforeYouStartTips,
  curtainMeasurementSteps,
  blindMeasurementTypes,
} from "@/data/measurement-guide";
import {
  CurtainMeasurementDiagram,
  BlindMeasurementDiagram,
} from "@/components/measurement/measurement-diagram";
import {
  CheckCircle2,
  Ruler,
  Camera,
  MessageCircle,
  Phone,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "How to Measure Curtains & Blinds",
  description:
    "Step-by-step guide to measuring window width & drop for custom curtains and blinds before ordering from CREATION'S in Besant Nagar.",
  path: "/measurement-guide",
});

export default function MeasurementGuidePage() {
  const whatsappPrefill = encodeURIComponent(
    `Hello CREATION'S, I would like guidance on custom window furnishings.\n\nWindow Width:\nWindow Height / Drop:\nType (Curtains/Blinds):\nPreferred Style:\nMy Location in Chennai:`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappRaw}?text=${whatsappPrefill}`;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <BreadcrumbSchema
        items={[{ name: "Window Measurement Guide", url: "/measurement-guide" }]}
      />

      {/* Hero Header */}
      <section className="bg-sand/30 py-12 md:py-16 border-b border-border/60">
        <Container>
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs text-taupe hover:text-burgundy">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-burgundy shadow-2xs">
              <Ruler className="h-3.5 w-3.5" />
              <span>Step-by-Step Window Guide</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.15] text-espresso">
              How to measure your windows for curtains and blinds.
            </h1>

            <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed">
              A few initial measurements help us understand your window layout and provide accurate fabric estimates. For final fabrication, CREATION&apos;S can also assist with on-site measurement and professional fitting across Chennai.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-taupe">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Simple 5-minute process</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>Inches or centimetres</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>No specialist tools required</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 1: Before You Start Checklist */}
      <Section variant="white" className="py-12 md:py-16 border-b border-border/60">
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeading
            eyebrow="Preparation"
            heading="Before you begin measuring."
            description="Keep these quick pointers in mind to ensure your dimensions are clear and reliable."
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beforeYouStartTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-card p-5 rounded-2xl border border-border/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center gap-2 text-burgundy">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sand font-bold text-xs font-sans">
                    {idx + 1}
                  </div>
                  <h3 className="font-sans text-sm font-semibold text-espresso">
                    {tip.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-taupe leading-relaxed pl-9">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 2: Measuring for Curtains */}
      <Section variant="sand" className="py-14 md:py-20 border-b border-border/60">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
                Window Treatments
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
                Measuring for Curtains & Drapes
              </h2>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/curtains">
                <span>View Curtain Styles</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps Column */}
            <div className="lg:col-span-7 space-y-6">
              {curtainMeasurementSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-card p-6 rounded-2xl border border-border/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-burgundy text-ivory font-sans text-xs font-bold shrink-0">
                      {step.step}
                    </span>
                    <h3 className="font-display text-xl font-medium text-espresso">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-taupe leading-relaxed pl-10">
                    {step.description}
                  </p>

                  <ul className="pl-10 space-y-1.5 font-sans text-xs text-taupe list-disc list-outside ml-4">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Diagram Column */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <CurtainMeasurementDiagram />
              <div className="p-4 rounded-xl bg-card border border-border/70 text-xs text-taupe flex items-start gap-2.5">
                <Info className="h-4 w-4 text-burgundy shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Tip for High Ceilings:</strong> Hanging your curtain track 4 to 8 inches above the window frame or directly from the ceiling creates an illusion of taller walls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Measuring for Blinds */}
      <Section variant="white" className="py-14 md:py-20 border-b border-border/60">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
                Window Solutions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
                Measuring for Window Blinds
              </h2>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/blinds">
                <span>View Blinds Collection</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Diagram Column */}
            <div className="lg:col-span-5 space-y-4 order-2 lg:order-1 lg:sticky lg:top-24">
              <BlindMeasurementDiagram />
              <div className="p-4 rounded-xl bg-sand/40 border border-border/70 text-xs text-taupe flex items-start gap-2.5">
                <Info className="h-4 w-4 text-burgundy shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Always measure width at 3 points (top, middle, bottom) and height at 3 points (left, middle, right) as window frames are rarely completely square.
                </p>
              </div>
            </div>

            {/* Mount Types Column */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              {/* Inside Mount */}
              <div className="bg-card p-6 rounded-2xl border border-border/80 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-burgundy">
                    Option A (Most Popular)
                  </span>
                  <h3 className="font-display text-2xl font-medium text-espresso">
                    {blindMeasurementTypes.insideMount.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe">
                    {blindMeasurementTypes.insideMount.subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {blindMeasurementTypes.insideMount.steps.map((st, sIdx) => (
                    <div key={sIdx} className="space-y-1 pl-4 border-l-2 border-burgundy/30">
                      <h4 className="font-sans text-xs font-semibold text-espresso">
                        {st.title}
                      </h4>
                      <p className="font-sans text-xs text-taupe leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="pt-2 text-xs italic text-burgundy bg-sand/50 p-3 rounded-xl border border-border/60">
                  {blindMeasurementTypes.insideMount.note}
                </p>
              </div>

              {/* Outside Mount */}
              <div className="bg-card p-6 rounded-2xl border border-border/80 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-burgundy">
                    Option B (Shallow Frame or Side Light Protection)
                  </span>
                  <h3 className="font-display text-2xl font-medium text-espresso">
                    {blindMeasurementTypes.outsideMount.title}
                  </h3>
                  <p className="font-sans text-xs text-taupe">
                    {blindMeasurementTypes.outsideMount.subtitle}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {blindMeasurementTypes.outsideMount.steps.map((st, sIdx) => (
                    <div key={sIdx} className="space-y-1 pl-4 border-l-2 border-burgundy/30">
                      <h4 className="font-sans text-xs font-semibold text-espresso">
                        {st.title}
                      </h4>
                      <p className="font-sans text-xs text-taupe leading-relaxed">
                        {st.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="pt-2 text-xs italic text-taupe bg-sand/30 p-3 rounded-xl border border-border/60">
                  {blindMeasurementTypes.outsideMount.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 4: What to Send Us / WhatsApp Action */}
      <Section variant="sand" className="py-14 md:py-20 border-b border-border/60">
        <Container>
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 sm:p-12 border border-border shadow-md space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
                Easy Consultation
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
                Ready to share your measurements?
              </h2>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                Send your rough dimensions and a quick photo to our team on WhatsApp. We&apos;ll recommend fabric styles, pleats, and prepare a personalized estimate.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/30 border border-border/60">
                <Ruler className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-semibold text-espresso">1. Width & Height</h3>
                  <p className="font-sans text-[11px] text-taupe">Rough window or track size</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/30 border border-border/60">
                <Camera className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-semibold text-espresso">2. Full Window Photo</h3>
                  <p className="font-sans text-[11px] text-taupe">Shows wall & ceiling space</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/30 border border-border/60">
                <Sparkles className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-semibold text-espresso">3. Style Preference</h3>
                  <p className="font-sans text-[11px] text-taupe">Curtains, sheers, or blinds</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-sand/30 border border-border/60">
                <MessageCircle className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-xs font-semibold text-espresso">4. Your Area in Chennai</h3>
                  <p className="font-sans text-[11px] text-taupe">Besant Nagar, Adyar, ECR, etc.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="primary" className="w-full sm:w-auto">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Measurements on WhatsApp</span>
                </a>
              </Button>

              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Showroom ({siteConfig.phone})</span>
                </a>
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-center font-sans text-xs text-taupe pt-2 max-w-lg mx-auto">
              Self-measurements help us understand your space and calculate initial quotes. Final dimensions may be verified on-site by our team before fabrication.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
