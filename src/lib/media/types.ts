export interface WebsiteMedia {
  assetId: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  slotKey: string;
  section?: string;
  alt: string;
  displayOrder: number;
  createdAt: string;
}

export interface UploadSignResponse {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
  publicId: string;
  tags: string;
  context: string;
}
