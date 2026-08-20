export interface Testimonial {
  id: string;
  author: string;
  badge?: string;
  location?: string;
  rating: number;
  timeAgo?: string;
  quote: string;
  projectType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    author: "Krithi chulliparambil",
    badge: "Local Guide · 40 reviews",
    location: "Google Review",
    rating: 5,
    timeAgo: "5 months ago",
    quote:
      "Have been coming to Creations for quite a few years now. I prefer them to the other curtain vendors for their cotton and linen fabrics, uniqueness of designs and their openness to customisation. They are also quite affordable. When in the store they'll be able to help you very readily with mix and match, lengths and their expert suggestions. Love them and will keep coming back!",
    projectType: "Cotton & Linen Curtains",
  },
  {
    id: "review-2",
    author: "Alifiya Hussain",
    badge: "9 reviews",
    location: "Google Review",
    rating: 5,
    timeAgo: "2 months ago",
    quote:
      "Very nice collection. Quality of bed sheet is excellent and reasonable. Uncle firoz suggests you the right curtain selection which one is wise. My go to place . You can never get out empty handed from this store",
    projectType: "Bed Sheets & Curtains",
  },
  {
    id: "review-3",
    author: "Srishti R",
    badge: "Local Guide · 22 reviews",
    location: "Google Review",
    rating: 5,
    timeAgo: "7 months ago",
    quote:
      "Wonderful collection and great service by Mr Firoz and team. Delivery and installation was prompt and quick as well. I would definitely recommend this store for anyone looking to purchase curtains for their home.",
    projectType: "Curtain Delivery & Installation",
  },
  {
    id: "review-4",
    author: "vinu gopi",
    badge: "6 reviews",
    location: "Google Review",
    rating: 5,
    timeAgo: "5 months ago",
    quote:
      "Got my curtains done with them.. Excellent service and work. Very quick in finishing the work and neat job.",
    projectType: "Custom Curtains",
  },
];
