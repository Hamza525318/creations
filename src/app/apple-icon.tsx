import { ImageResponse } from "next/og";
import { getMediaForSlot } from "@/lib/media/queries";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function AppleIcon() {
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
            borderRadius: "36px",
            padding: "16px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoMedia.secureUrl}
            alt="CREATION'S Apple Touch Icon"
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
          fontSize: 100,
          background: "#421a1f",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f7f4ef",
          fontWeight: 700,
          fontFamily: "serif",
          borderRadius: "36px",
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
