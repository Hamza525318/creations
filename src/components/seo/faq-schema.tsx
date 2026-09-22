import React from "react";
import { siteConfig } from "@/config/site";
import { publishedFaqs, FAQItem } from "@/data/faqs";

interface FAQSchemaProps {
  items?: FAQItem[];
}

export default function FAQSchema({ items = publishedFaqs }: FAQSchemaProps) {
  // Only include items with valid question and answer
  const validFaqs = items.filter((item) => item.published && item.answer);

  if (validFaqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq-schema`,
    mainEntity: validFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
