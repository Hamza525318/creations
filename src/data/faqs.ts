import { siteConfig } from "@/config/site";

export interface FAQItem {
  id: string;
  question: string;
  answer: string | null;
  category: "showroom" | "measurement" | "installation" | "pricing" | "orders" | "delivery" | "care";
  published: boolean;
  requiresConfirmation?: boolean;
  link?: {
    text: string;
    href: string;
  };
}

export const faqs: FAQItem[] = [
  {
    id: "showroom-location",
    question: "Where is your showroom located and what are the store timings?",
    answer: `Our showroom is located at ${siteConfig.address.fullAddress}. We are open 7 days a week, Monday through Sunday from 11:00 AM to 8:00 PM.`,
    category: "showroom",
    published: true,
    link: {
      text: "Get Directions on Google Maps",
      href: siteConfig.googleMapsUrl,
    },
  },
  {
    id: "home-measurement-install",
    question: "Do you provide home window measurement and installation in Chennai?",
    answer:
      "Yes. We offer on-site window measurement and professional fitting across Chennai to ensure your curtains, blind tracks, and drapery are precisely measured and securely installed.",
    category: "measurement",
    published: true,
    link: {
      text: "View Window Measurement Guide",
      href: "/measurement-guide",
    },
  },
  {
    id: "walkin-appointment",
    question: "Can I visit the showroom without an appointment?",
    answer:
      "Yes, walk-ins are always welcome. You can drop by our Besant Nagar showroom anytime during opening hours to browse fabrics, compare textures, and discuss your home furnishing requirements.",
    category: "showroom",
    published: true,
  },
  {
    id: "fabric-samples",
    question: "Can I see and touch physical fabric swatches before making a decision?",
    answer:
      "Yes. Our showroom features hundreds of curated fabric swatches, pure cottons, natural linens, blackout materials, sheer drapery, and upholstery textures for you to examine in person.",
    category: "showroom",
    published: true,
  },
  {
    id: "estimate-pricing",
    question: "How can I get an initial estimate or quote for my windows?",
    answer:
      "You can send your approximate window measurements (Width × Height) and a room photo directly to us on WhatsApp, or bring your architectural layout to our Besant Nagar store for an upfront estimate.",
    category: "pricing",
    published: true,
    link: {
      text: "Chat on WhatsApp for Quote",
      href: siteConfig.whatsappUrl,
    },
  },
  {
    id: "how-to-measure-diy",
    question: "How do I take initial measurements myself?",
    answer:
      "We provide a simple step-by-step measurement guide showing how to measure curtain track widths, floor drops, and inside or outside window blind recesses with a standard steel tape.",
    category: "measurement",
    published: true,
    link: {
      text: "Read How to Measure",
      href: "/measurement-guide",
    },
  },

  // =========================================================================
  // Unconfirmed Business Policy Questions (Draft - Unpublished until confirmed)
  // =========================================================================
  {
    id: "turnaround-time",
    question: "How long do custom curtain and blind orders typically take?",
    answer: null,
    category: "orders",
    published: false,
    requiresConfirmation: true,
  },
  {
    id: "delivery-outside-chennai",
    question: "Do you deliver or ship outside Chennai across India?",
    answer: null,
    category: "delivery",
    published: false,
    requiresConfirmation: true,
  },
  {
    id: "advance-payment-terms",
    question: "What are the payment terms and advance requirements for custom orders?",
    answer: null,
    category: "pricing",
    published: false,
    requiresConfirmation: true,
  },
  {
    id: "fabric-care-cleaning",
    question: "What are the recommended cleaning and maintenance instructions for linen and cotton curtains?",
    answer: null,
    category: "care",
    published: false,
    requiresConfirmation: true,
  },
];

export const publishedFaqs = faqs.filter((faq) => faq.published && faq.answer !== null);
