export interface Project {
  id: string;
  title: string;
  category: string;
  location?: string;
  aspectRatio: "4/3" | "3/4";
  placeholderLabel: string;
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Sheer & Velvet Layered Living Room",
    category: "Curtains",
    location: "Besant Nagar",
    aspectRatio: "4/3",
    placeholderLabel: "Living Room Curtains Installation",
  },
  {
    id: "proj-2",
    title: "Motorised Blackout Blinds",
    category: "Blinds",
    location: "Adyar",
    aspectRatio: "3/4",
    placeholderLabel: "Master Suite Window Treatment",
  },
  {
    id: "proj-3",
    title: "Textured Linen Sofa Upholstery",
    category: "Upholstery",
    location: "RA Puram",
    aspectRatio: "3/4",
    placeholderLabel: "Bespoke Sofa Re-covering",
  },
  {
    id: "proj-4",
    title: "Quilted Cotton Bedspread Suite",
    category: "Bedspreads",
    location: "Kotturpuram",
    aspectRatio: "4/3",
    placeholderLabel: "Bedroom Textile Ensemble",
  },
  {
    id: "proj-5",
    title: "Minimalist Wooden Venetian Blinds",
    category: "Blinds",
    location: "ECR",
    aspectRatio: "4/3",
    placeholderLabel: "Sunroom Blinds Project",
  },
  {
    id: "proj-6",
    title: "Floor-to-Ceiling Drapery",
    category: "Curtains",
    location: "Thiruvanmiyur",
    aspectRatio: "3/4",
    placeholderLabel: "Double Height Living Curtain",
  },
];
