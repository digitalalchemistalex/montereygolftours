// app/opengraph-image.tsx
// Site-wide fallback OG image — rendered at build time via @vercel/og (Satori)
// Individual pages override with their own hero images via generateMetadata
// This fires for: homepage, /about/, /contact/, /quote/, /faq/, /packages/

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Monterey Golf Tours — Custom Peninsula Golf Trips";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(160deg, #0e2a20 0%, #1a3a2a 40%, #0d1e17 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture — diagonal gold lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(135deg, rgba(198,163,84,0.04) 0px, rgba(198,163,84,0.04) 1px, transparent 1px, transparent 60px)",
          }}
        />

        {/* Gold accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #c6a354, #e8c97a, #c6a354)",
          }}
        />

        {/* Top-right badge */}
        <div
          style={{
            position: "absolute",
            top: 36,
            right: 52,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(198,163,84,0.15)",
            border: "1px solid rgba(198,163,84,0.4)",
            borderRadius: 32,
            padding: "8px 18px",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#c6a354",
            }}
          />
          <span
            style={{
              color: "#c6a354",
              fontSize: 13,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            IAGTO Partner · Pebble Beach Resorts® Operator
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            padding: "0 64px 60px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              color: "#c6a354",
              fontSize: 15,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Monterey Peninsula Golf
          </span>

          {/* Main headline */}
          <div
            style={{
              color: "#faf6ee",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              marginBottom: 24,
              maxWidth: 820,
            }}
          >
            Monterey Golf Tours
          </div>

          {/* Sub */}
          <div
            style={{
              color: "rgba(250,246,238,0.72)",
              fontSize: 24,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: 700,
              marginBottom: 36,
            }}
          >
            Custom golf packages for the Monterey Peninsula — 14 courses, 9 hotels, tee times and transfers handled end to end.
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 32,
            }}
          >
            {[
              ["14", "Courses"],
              ["9", "Hotels"],
              ["2–400", "Players"],
              ["24hrs", "Quote turnaround"],
            ].map(([num, label]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  paddingRight: 32,
                  borderRight: "1px solid rgba(198,163,84,0.3)",
                }}
              >
                <span
                  style={{
                    color: "#c6a354",
                    fontSize: 28,
                    fontWeight: 700,
                    fontFamily: "system-ui, sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    color: "rgba(250,246,238,0.55)",
                    fontSize: 13,
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 52,
            color: "rgba(250,246,238,0.35)",
            fontSize: 14,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          montereygolftours.com
        </div>
      </div>
    ),
    { ...size }
  );
}
