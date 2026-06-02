import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "MasaPay — QR меню и поръчки за ресторанти";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0f9d58 0%, #0c7f47 60%, #0a6c3c 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.85,
            display: "flex",
          }}
        >
          MasaPay
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Менюто е на масата.</span>
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>
              Поръчката в кухнята.
            </span>
          </div>
          <div style={{ fontSize: 30, opacity: 0.9, maxWidth: 880, display: "flex" }}>
            QR система за поръчки в ресторанти и кафенета. Първи месец безплатно.
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            opacity: 0.85,
          }}
        >
          <div style={{ display: "flex" }}>www.masapay.eu</div>
          <div style={{ display: "flex" }}>София · 2026</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
