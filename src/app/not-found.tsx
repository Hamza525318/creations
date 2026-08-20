import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section variant="white" className="py-24 md:py-32 min-h-[70vh] flex items-center justify-center text-center">
      <div className="mx-auto max-w-md space-y-6">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-burgundy">
          404 · Page Not Found
        </span>
        <SectionHeading
          heading="Page not found"
          description="The page you are looking for does not exist or has been moved."
          align="center"
        />
        <div>
          <Button asChild variant="primary">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
