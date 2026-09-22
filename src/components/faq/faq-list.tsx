"use client";

import React, { useState } from "react";
import { FAQItem } from "@/data/faqs";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FAQListProps {
  items: FAQItem[];
}

export default function FAQList({ items }: FAQListProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const triggerId = `faq-trigger-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "bg-card border-burgundy/40 shadow-xs"
                : "bg-card/70 border-border/80 hover:border-border hover:bg-card"
            }`}
          >
            <h3 className="m-0 p-0 text-base font-normal">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggle(item.id)}
                className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-burgundy rounded-2xl cursor-pointer"
              >
                <span className="font-display text-lg sm:text-xl font-medium text-espresso pr-2">
                  {item.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand/60 text-burgundy transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-sand text-burgundy" : ""
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 space-y-3 border-t border-border/40"
              >
                <p className="font-sans text-xs sm:text-sm text-taupe leading-relaxed">
                  {item.answer}
                </p>

                {item.link && (
                  <div className="pt-1">
                    {item.link.href.startsWith("http") ? (
                      <a
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:underline"
                      >
                        <span>{item.link.text}</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        href={item.link.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:underline"
                      >
                        <span>{item.link.text}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
