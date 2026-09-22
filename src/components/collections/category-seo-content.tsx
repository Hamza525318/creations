import React from "react";
import Link from "next/link";
import Container from "@/components/layout/container";
import { CatalogCategory } from "@/lib/catalog/types";
import { Ruler, Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";

interface CategorySEOContentProps {
  category: CatalogCategory;
}

export default function CategorySEOContent({ category }: CategorySEOContentProps) {
  if (category === "curtains") {
    return (
      <section className="py-12 md:py-16 bg-sand/20 border-t border-border/60">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
                Tailoring & Selection Guide
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
                Bespoke & Ready Made Curtains in Besant Nagar, Chennai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-taupe leading-relaxed">
              <div className="space-y-3">
                <p>
                  At <strong className="text-espresso">CREATION&apos;S</strong>, we help you dress your windows with precision-tailored drapery designed for Chennai&apos;s natural coastal light and privacy needs. Whether you are furnishing a living room with floor-to-ceiling sheer linen drapes or installing blackout curtains in a bedroom, our Besant Nagar studio provides hundreds of fabric textures, weaves, and pleating finishes.
                </p>
                <p>
                  For clients seeking immediate solutions, we also feature <strong className="text-espresso">ready made curtains</strong> and <strong className="text-espresso">ready to fit curtains</strong> that offer refined aesthetics with rapid turnaround for contemporary apartments.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  Customers from <strong className="text-espresso">Besant Nagar, Adyar, ECR, and South Chennai</strong> visit our Urur Olcott Kuppam Road showroom to feel fabric weights, inspect motorisation tracks, and consult on heading styles including pinch pleats, eyelets, wave folds, and double-height drops.
                </p>
                <p>
                  Every custom curtain order includes tailored fabric selection, optional blackout or thermal lining, accurate window measurement verification, and professional on-site installation.
                </p>
              </div>
            </div>

            {/* Quick Feature Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>Custom Pleating</span>
                </div>
                <p className="text-xs text-taupe">Pinch pleat, eyelet, wave fold & motorised track systems tailored to window dimensions.</p>
              </div>

              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <Clock className="h-4 w-4" />
                  <span>Ready to Fit Options</span>
                </div>
                <p className="text-xs text-taupe">Standard-sized, ready-made panels ready for fast fitting in residential apartments.</p>
              </div>

              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Lining & Privacy</span>
                </div>
                <p className="text-xs text-taupe">100% blackout linings, thermal insulation, and sheer daylight filtration options.</p>
              </div>
            </div>

            {/* Internal Helpful Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <Link
                href="/measurement-guide"
                className="inline-flex items-center gap-1.5 text-burgundy hover:underline py-1.5 px-3 rounded-lg bg-sand/60 hover:bg-sand"
              >
                <Ruler className="h-3.5 w-3.5" />
                <span>How to Measure Windows for Curtains</span>
              </Link>

              <Link
                href="/blinds"
                className="inline-flex items-center gap-1 text-espresso hover:text-burgundy transition-colors py-1.5 px-3 rounded-lg bg-sand/40 hover:bg-sand"
              >
                <span>Pairing with Window Blinds</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (category === "blinds") {
    return (
      <section className="py-12 md:py-16 bg-sand/20 border-t border-border/60">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
                Mechanism & Style Guide
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
                Tailored Window Blinds for Besant Nagar and Chennai Homes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-taupe leading-relaxed">
              <div className="space-y-3">
                <p>
                  Window blinds provide clean architectural lines, effortless daylight management, and compact footprint for modern homes. At <strong className="text-espresso">CREATION&apos;S Besant Nagar</strong>, we craft custom-fit <strong className="text-espresso">Roman blinds, roller shades, wooden Venetian blinds, and motorised blinds</strong> suited for Chennai&apos;s humidity and sunshine.
                </p>
                <p>
                  Whether you need sun-filtering sunscreen blinds for home offices or blackout Roman blinds for peaceful bedrooms, our mechanisms ensure smooth, durable operation.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  Homeowners across <strong className="text-espresso">Besant Nagar, Adyar, and the ECR corridor</strong> can explore our operating mechanisms, cassette trims, and textured wooden slats at our showroom near Rajaji Bhavan.
                </p>
                <p>
                  Our team assists with exact inside/outside recess measurements and clean bracket mounting for seamless architectural integration.
                </p>
              </div>
            </div>

            {/* Quick Feature Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>Roman & Roller</span>
                </div>
                <p className="text-xs text-taupe">Soft folding fabric Roman shades and sleek roller blinds for streamlined windows.</p>
              </div>

              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Wooden & Venetian</span>
                </div>
                <p className="text-xs text-taupe">Natural wood and faux-wood slats engineered for tropical longevity and light control.</p>
              </div>

              <div className="bg-card p-4 rounded-xl border border-border/80 space-y-1.5">
                <div className="flex items-center gap-2 text-burgundy font-semibold text-xs uppercase tracking-wider">
                  <Clock className="h-4 w-4" />
                  <span>Motorised Control</span>
                </div>
                <p className="text-xs text-taupe">Quiet remote and smart-home integrated motorised window blind mechanisms.</p>
              </div>
            </div>

            {/* Internal Helpful Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <Link
                href="/measurement-guide"
                className="inline-flex items-center gap-1.5 text-burgundy hover:underline py-1.5 px-3 rounded-lg bg-sand/60 hover:bg-sand"
              >
                <Ruler className="h-3.5 w-3.5" />
                <span>Inside vs Outside Recess Blind Measurement</span>
              </Link>

              <Link
                href="/curtains"
                className="inline-flex items-center gap-1 text-espresso hover:text-burgundy transition-colors py-1.5 px-3 rounded-lg bg-sand/40 hover:bg-sand"
              >
                <span>Explore Curtains & Drapery</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (category === "upholstery") {
    return (
      <section className="py-12 md:py-16 bg-sand/20 border-t border-border/60">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
                Restoration & Custom Fabrics
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
                Custom Sofa Re-covering & Upholstery in Chennai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-taupe leading-relaxed">
              <div className="space-y-3">
                <p>
                  High-quality furniture frames often outlast their surface fabric. <strong className="text-espresso">CREATION&apos;S</strong> provides custom re-upholstery and bespoke fabric solutions for sofas, accent armchairs, dining chairs, headboards, and outdoor seating.
                </p>
                <p>
                  Choose from high-rub count velvets, heavy linens, textured jacquards, and stain-resistant performance textiles at our Besant Nagar showroom.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  We assist clients across <strong className="text-espresso">Besant Nagar, Adyar, ECR, and central Chennai</strong> with high-density foam replacement, webbing reinforcement, and tailored piping finishes.
                </p>
                <p>
                  Visit our studio to inspect large swatch books and coordinate cushions with your curtains and interior color palette.
                </p>
              </div>
            </div>

            {/* Helpful Cross-Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <Link
                href="/curtains"
                className="inline-flex items-center gap-1.5 text-burgundy hover:underline py-1.5 px-3 rounded-lg bg-sand/60 hover:bg-sand"
              >
                <span>Coordinate with Custom Curtains</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <a
                href="/#location"
                className="inline-flex items-center gap-1 text-espresso hover:text-burgundy transition-colors py-1.5 px-3 rounded-lg bg-sand/40 hover:bg-sand"
              >
                <span>Showroom Location & Fabric Swatches</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (category === "bedspreads") {
    return (
      <section className="py-12 md:py-16 bg-sand/20 border-t border-border/60">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
                Linens & Layered Comfort
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
                Luxury Bedspreads & Quilts in Besant Nagar, Chennai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-taupe leading-relaxed">
              <div className="space-y-3">
                <p>
                  Create a layered, restful sanctuary with custom-fitted <strong className="text-espresso">bedspreads, tailored quilts, duvet covers, and decorative pillow pairings</strong> from CREATION&apos;S.
                </p>
                <p>
                  Our bedding collection emphasizes breathable pure cottons, quilted velvets, and elegant textured weaves suitable for Chennai&apos;s climate.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  Coordinate your bedroom linens with matching sheer drapes or blackout Roman blinds for a cohesive, designer-finished bedroom suite.
                </p>
                <p>
                  Visit our Besant Nagar showroom near Rajaji Bhavan to view fabric textures and custom sizing options.
                </p>
              </div>
            </div>

            {/* Helpful Cross-Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <Link
                href="/curtains"
                className="inline-flex items-center gap-1.5 text-burgundy hover:underline py-1.5 px-3 rounded-lg bg-sand/60 hover:bg-sand"
              >
                <span>Matching Bedroom Curtains</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <Link
                href="/blinds"
                className="inline-flex items-center gap-1 text-espresso hover:text-burgundy transition-colors py-1.5 px-3 rounded-lg bg-sand/40 hover:bg-sand"
              >
                <span>Bedroom Blackout Blinds</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return null;
}
