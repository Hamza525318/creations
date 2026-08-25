export const siteConfig = {
  name: "CREATION'S",
  legalName: "CREATION'S Curtains & Blinds Store",
  tagline: "Curtains and Blinds Store in Besant Nagar",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.creations.ind.in",
  location: "Besant Nagar, Chennai",
  address: {
    street: "New no: 37 (Old no: 11), 1, Urur Olcott Kuppam Rd, near Rajaji Bhavan",
    locality: "Besant Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600090",
    country: "IN",
    fullAddress:
      "New no: 37 (Old no: 11), 1, Urur Olcott Kuppam Rd, near Rajaji Bhavan, Besant Nagar, Chennai, Tamil Nadu 600090",
  },
  geo: {
    latitude: 13.0002,
    longitude: 80.2667,
  },
  phone: "+91 95970 90006",
  phoneRaw: "+919597090006",
  landline: "044 2491 9327",
  landlineRaw: "+914424919327",
  whatsapp: "+91 95970 90006",
  whatsappRaw: "919597090006",
  whatsappUrl:
    "https://wa.me/919597090006?text=Hello%20CREATION'S,%20I%20would%20like%20to%20enquire%20about%20curtains%20and%20blinds.",
  googleMapsUrl:
    "https://maps.google.com/?q=CREATION'S+Urur+Olcott+Kuppam+Rd+Besant+Nagar+Chennai+600090",
  hours: "Monday – Sunday: 11:00 AM – 8:00 PM",
  openingHoursSchema: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "20:00",
    },
  ],
  areaServed: ["Besant Nagar", "Adyar", "ECR", "Chennai", "Tamil Nadu"],
  socialLinks: {
    instagram: "https://instagram.com/creations_chennai",
  },
};

export type SiteConfig = typeof siteConfig;
