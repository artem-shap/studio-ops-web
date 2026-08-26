import { ImageResponse } from "next/og";

export const alt = "StudioOps — a design and development studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than kept as a binary in the repository, so
 * the wording cannot drift away from the site it represents.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141518",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#f5f4f2",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, color: "#f5f4f2", fontWeight: 600 }}>
            StudioOps
          </div>
        </div>

        <div
          style={{
            fontSize: 76,
            lineHeight: 1.08,
            color: "#f5f4f2",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            maxWidth: 900,
            display: "flex",
          }}
        >
          Good work, and always knowing where it stands
        </div>

        <div style={{ fontSize: 26, color: "#8d8f95", display: "flex" }}>
          Brand, websites and internal tools
        </div>
      </div>
    ),
    size,
  );
}
