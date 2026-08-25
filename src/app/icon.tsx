import { ImageResponse } from "next/og";
import { getMediaForSlot } from "@/lib/media/queries";

export const runtime = "nodejs";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default async function Icon() {
  const logoMedia = await getMediaForSlot("branding.logo-primary");

  if (logoMedia && logoMedia.secureUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#421a1f",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            padding: "2px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoMedia.secureUrl}
            alt="CREATION'S Favicon"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#421a1f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f7f4ef",
          fontWeight: 700,
          fontFamily: "serif",
          borderRadius: "6px",
        }}
      >
        C
      </div>
    ),
    {
      ...size,
    }
  );
}
