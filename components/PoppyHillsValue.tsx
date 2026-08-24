// components/PoppyHillsValue.tsx
// Value positioning block for Poppy Hills course page
// Quotes + facts: verified mgts-course-intelligence.md June 2026

import Link from "next/link";

export default function PoppyHillsValue() {
  return (
    <div style={{ border: "0.5px solid #D3D1C7", borderRadius: 16, overflow: "hidden", marginBottom: "2rem" }}>

      {/* Forest green header */}
      <div
        style={{ background: "#085041", padding: "1.75rem 2rem", position: "relative", overflow: "hidden" }}
        className="ph-header"
      >
        <div style={{ position: "absolute", top: -50, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        {/* Badges */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
          {[
            { label: "Golf Digest Top 100", bg: "rgba(67,214,146,0.18)", color: "#43d692", border: "rgba(67,214,146,0.3)" },
            { label: "93953 zip code",       bg: "rgba(255,255,255,0.1)",   color: "rgba(255,255,255,0.8)", border: "rgba(255,255,255,0.2)" },
            { label: "No PBC gate fee",      bg: "rgba(255,255,255,0.1)",   color: "rgba(255,255,255,0.8)", border: "rgba(255,255,255,0.2)" },
          ].map(({ label, bg, color, border }) => (
            <span
              key={label}
              style={{
                fontSize: 10, fontWeight: 500, padding: "3px 10px",
                borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.07em",
                background: bg, color, border: `0.5px solid ${border}`,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <h3 style={{ margin: "0 0 0.5rem", fontSize: "clamp(17px,4vw,20px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.25 }}>
          Championship golf in the Pebble Beach zip code &mdash; at a fraction of the cost
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65 }}>
          Poppy Hills sits inside Del Monte Forest, the same gated community as the iconic clifftop links
          overlooking Stillwater Cove.{" "}
          <strong style={{ color: "#9FE1CB" }}>Different owner. Different gate. Same zip code.</strong>{" "}
          NCGA-owned and open to the public.
        </p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "0.5px solid rgba(255,255,255,0.12)", marginTop: "1.5rem" }}>
          {[["7,002", "Yards"], ["73.5", "Rating"], ["135", "Slope"]].map(([n, l], i) => (
            <div
              key={l}
              style={{
                padding: "1rem 0", textAlign: "center",
                borderRight: i < 2 ? "0.5px solid rgba(255,255,255,0.12)" : undefined,
              }}
            >
              <div style={{ fontSize: "clamp(18px,5vw,22px)", fontWeight: 500, color: "#ffffff" }}>{n}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:480px){.ph-header{padding:1.25rem}}`}</style>
      </div>

      {/* White body */}
      <div style={{ background: "#ffffff", padding: "1.5rem 2rem" }} className="ph-body">
        {/* Quotes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
          {[
            { text: "\u201cReminds me a little bit of Pinehurst and a little bit of Pine Valley.\u201d", attr: "Colin Montgomerie" },
            { text: "\u201cI like that a lot. Would love a three-round event at Poppy Hills.\u201d",     attr: "Tom Watson"          },
          ].map(({ text, attr }) => (
            <div
              key={attr}
              style={{
                background: "#F1EFE8", borderLeft: "3px solid #085041",
                borderRadius: "0 8px 8px 0", padding: "12px 14px",
              }}
            >
              <p style={{ margin: "0 0 5px", fontSize: 13, color: "#2C2C2A", lineHeight: 1.6, fontStyle: "italic" }}>{text}</p>
              <div style={{ fontSize: 11, color: "#5F5E5A", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{attr}</div>
            </div>
          ))}
        </div>

        {/* Group tip */}
        <div
          style={{
            background: "#E6F1FB", borderLeft: "3px solid #185FA5",
            borderRadius: "0 8px 8px 0", padding: "12px 14px",
            marginBottom: "1.25rem", display: "flex", gap: 10, alignItems: "flex-start",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p style={{ margin: 0, fontSize: 13, color: "#042C53", lineHeight: 1.6 }}>
            Groups of 16+ get an advance booking window beyond the standard 90-day limit.
            We handle that coordination &mdash; you just show up.
          </p>
        </div>

        <Link
          href="/quote/"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: 12, boxSizing: "border-box",
            background: "#085041", color: "#ffffff",
            border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
          }}
        >
          Add Poppy Hills to my trip
        </Link>
        <style>{`@media(max-width:480px){.ph-body{padding:1.25rem}}`}</style>
      </div>
    </div>
  );
}
