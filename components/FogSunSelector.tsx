"use client";
// components/FogSunSelector.tsx
// Interactive climate toggle on /hotels page

import { useState } from "react";
import Link from "next/link";

type Zone = "coast" | "valley";
type Tier = "golf-anchor" | "city-base" | "luxury";

interface HotelItem {
  slug: string;
  name: string;
  meta: string;
  tier: Tier;
}

const TIER_BADGE: Record<Tier, { bg: string; color: string; label: string }> = {
  "golf-anchor": { bg: "#EAF3DE", color: "#085041", label: "Golf anchor" },
  "city-base":   { bg: "#E6F1FB", color: "#042C53", label: "City base"  },
  luxury:        { bg: "#EEEDFE", color: "#3C3489", label: "Luxury"     },
};

const COAST: HotelItem[] = [
  { slug: "intercontinental-the-clement", name: "InterContinental The Clement", meta: "Cannery Row waterfront · premium",         tier: "city-base"   },
  { slug: "hyatt-regency-monterey",       name: "Hyatt Regency Monterey",       meta: "560 rooms · free airport shuttle",         tier: "golf-anchor" },
  { slug: "portola-hotel",                name: "Portola Hotel & Spa",           meta: "379 rooms · best for groups 20+",          tier: "city-base"   },
  { slug: "monterey-plaza-hotel",         name: "Monterey Plaza Hotel & Spa",   meta: "Cannery Row · AAA Four Diamond",           tier: "luxury"      },
];

const VALLEY: HotelItem[] = [
  { slug: "carmel-valley-ranch", name: "Carmel Valley Ranch",    meta: "Pete Dye course on-site · 179 all-suites · 500 acres", tier: "golf-anchor" },
  { slug: "quail-lodge",         name: "Quail Lodge & Golf Club", meta: "On-site course · best conditions in Central CA",       tier: "golf-anchor" },
  { slug: "bernardus-lodge",     name: "Bernardus Lodge & Spa",  meta: "Boutique luxury · TPC Pasadera access",                tier: "luxury"      },
];

const OPTIONS: { zone: Zone; icon: string; name: string; desc: string }[] = [
  { zone: "coast",  icon: "🌫",  name: "Coast",          desc: "Ocean views. Morning fog Jun–Aug. Cooler all year. Downtown Monterey or Cannery Row." },
  { zone: "valley", icon: "☀️", name: "Carmel Valley",   desc: "Sunny inland microclimate. Warm when the coast is fogged in. Golf resort atmosphere." },
];

export default function FogSunSelector() {
  const [zone, setZone] = useState<Zone>("coast");
  const list = zone === "coast" ? COAST : VALLEY;

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, color: "#2C2C2A", margin: "0 0 4px" }}>
        Coast or Carmel Valley?
      </h2>
      <p style={{ fontSize: 13, color: "#5F5E5A", margin: "0 0 1.25rem" }}>
        Two different Monterey climates. Pick what suits your group.
      </p>

      {/* Toggle */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.5rem" }}>
        {OPTIONS.map(({ zone: z, icon, name, desc }) => {
          const active = zone === z;
          const accentCoast  = active && z === "coast";
          const accentValley = active && z === "valley";
          return (
            <button
              key={z}
              onClick={() => setZone(z)}
              style={{
                border: `1.5px solid ${active ? (z === "coast" ? "#185FA5" : "#085041") : "#D3D1C7"}`,
                borderRadius: 12,
                padding: "1.25rem",
                cursor: "pointer",
                position: "relative",
                background: accentCoast ? "#EEF6FF" : accentValley ? "#EDF7F3" : "#ffffff",
                textAlign: "left",
              }}
              className="fog-opt"
            >
              <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{icon}</span>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#2C2C2A", marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, color: "#5F5E5A", lineHeight: 1.55 }}>{desc}</div>
              {active && (
                <div
                  style={{
                    position: "absolute", top: 10, right: 10,
                    width: 18, height: 18, borderRadius: "50%",
                    background: z === "coast" ? "#185FA5" : "#085041",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Hotel list */}
      <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888780", marginBottom: 10 }}>
        {zone === "coast" ? "Coast hotels" : "Carmel Valley hotels"}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {list.map((h) => {
          const badge = TIER_BADGE[h.tier];
          return (
            <Link
              key={h.slug}
              href={`/hotels/${h.slug}/`}
              style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                alignItems: "center", gap: 12,
                padding: "14px 16px",
                background: "#ffffff", border: "0.5px solid #D3D1C7",
                borderRadius: 10, textDecoration: "none",
              }}
              className="fog-hotel-row"
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#2C2C2A", marginBottom: 3 }}>{h.name}</div>
                <div style={{ fontSize: 12, color: "#5F5E5A" }}>{h.meta}</div>
              </div>
              <span
                style={{
                  fontSize: 10, fontWeight: 500, padding: "3px 9px",
                  borderRadius: 20, whiteSpace: "nowrap",
                  background: badge.bg, color: badge.color,
                }}
              >
                {badge.label}
              </span>
            </Link>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .fog-opt { padding: 1rem !important; }
          .fog-hotel-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
