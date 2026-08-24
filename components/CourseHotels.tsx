// components/CourseHotels.tsx
// Closest hotels list shown on every course page
// Data source: lib/proximity.ts (verified mgts-lodging-intelligence.md June 2026)

import { getHotelsForCourse, type HotelTier } from "@/lib/proximity";

const TIER_BADGE: Record<HotelTier, { bg: string; text: string; label: string }> = {
  "golf-anchor": { bg: "#EAF3DE", text: "#085041", label: "Golf anchor" },
  luxury:        { bg: "#EEEDFE", text: "#3C3489", label: "Luxury"      },
  "city-base":   { bg: "#E6F1FB", text: "#042C53", label: "City base"  },
  boutique:      { bg: "#F1EFE8", text: "#444441", label: "Boutique"   },
};

interface Props {
  courseSlug: string;
  courseName: string;
}

export default function CourseHotels({ courseSlug, courseName }: Props) {
  const hotels = getHotelsForCourse(courseSlug).slice(0, 5);
  if (hotels.length === 0) return null;

  return (
    <section
      style={{
        borderTop: "0.5px solid #D3D1C7",
        padding: "3.5rem 0",
      }}
    >
      <p
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#888780",
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        {courseName}
      </p>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "#2C2C2A",
          marginBottom: "1.25rem",
        }}
      >
        Closest hotels
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {hotels.map((h) => {
          const badge = TIER_BADGE[h.tier];
          const isFar = h.minutes > 20;
          return (
            <a
              key={h.hotelSlug}
              href={}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#ffffff",
                border: "0.5px solid #D3D1C7",
                borderRadius: 10,
                textDecoration: "none",
                opacity: isFar ? 0.6 : 1,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#2C2C2A",
                    marginBottom: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {h.hotelName}
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: badge.bg,
                      color: badge.text,
                    }}
                  >
                    {badge.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#5F5E5A" }}>{h.meta}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    lineHeight: 1,
                    color: isFar ? "#B4B2A9" : "#042C53",
                  }}
                >
                  {h.minutes === 0 ? "On-site" : }
                </div>
                {h.minutes !== 0 && (
                  <div style={{ fontSize: 11, color: "#888780", marginTop: 2 }}>drive</div>
                )}
              </div>
            </a>
          );
        })}
      </div>
      <p style={{ marginTop: 10, fontSize: 12, color: "#888780" }}>
        Drive times approximate. Verify with Google Maps before booking transport.
      </p>
    </section>
  );
}
