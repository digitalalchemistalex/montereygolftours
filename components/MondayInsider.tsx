// components/MondayInsider.tsx
// TPC Monterey at Pasadera — Monday public access block
// Facts verified: mgts-course-intelligence.md June 2026

import Link from "next/link";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MondayInsider() {
  return (
    <div style={{ border: "0.5px solid #D3D1C7", borderRadius: 16, overflow: "hidden", marginBottom: "2rem" }}>

      {/* Header */}
      <div
        style={{ background: "#042C53", padding: "1.75rem 2rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}
        className="monday-header"
      >
        <div
          style={{
            flexShrink: 0, width: 40, height: 40,
            background: "rgba(255,255,255,0.12)", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)", margin: "0 0 5px" }}>
            Insider access
          </p>
          <h3 style={{ margin: "0 0 0.4rem", fontSize: "clamp(15px,3.5vw,17px)", fontWeight: 500, color: "#ffffff", lineHeight: 1.25 }}>
            TPC Monterey at Pasadera is public &mdash; one day a week
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            The only Jack Nicklaus Signature course on the peninsula. Private club. Mondays open to the public.
          </p>
        </div>
        <style>{`@media(max-width:480px){.monday-header{flex-direction:column;padding:1.25rem;gap:.75rem}}`}</style>
      </div>

      {/* Week strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", background: "#F1EFE8", borderBottom: "0.5px solid #D3D1C7" }}>
        {DAYS.map((day, i) => {
          const open = i === 0;
          return (
            <div
              key={day}
              style={{
                padding: "12px 4px", textAlign: "center",
                fontSize: 11, fontWeight: 500,
                color: open ? "#042C53" : "#888780",
                background: open ? "#E6F1FB" : undefined,
                borderRight: i < 6 ? "0.5px solid #D3D1C7" : undefined,
              }}
            >
              {day}
              <div
                style={{
                  width: 5, height: 5, borderRadius: "50%",
                  margin: "5px auto 0",
                  background: open ? "#1D9E75" : "#D3D1C7",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div style={{ background: "#ffffff", padding: "1.5rem 2rem" }} className="monday-body">
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: "1.25rem" }}>
          {[["71", "Par"], ["6,673", "Yards"], ["73.7", "Rating"]].map(([n, l]) => (
            <div key={l} style={{ background: "#F1EFE8", borderRadius: 8, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: "#2C2C2A" }}>{n}</div>
              <div style={{ fontSize: 11, color: "#5F5E5A", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div
          style={{
            background: "#EAF3DE", borderLeft: "3px solid #1D9E75",
            borderRadius: "0 8px 8px 0", padding: "12px 14px",
            marginBottom: "1.25rem", display: "flex", gap: 10, alignItems: "flex-start",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
            <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
          </svg>
          <p style={{ margin: 0, fontSize: 13, color: "#173404", lineHeight: 1.6 }}>
            Guests of Bernardus Lodge can book outside Monday as a resort benefit &mdash; if your dates
            don&apos;t land on a Monday, we pair a Bernardus stay to unlock access any day.
          </p>
        </div>

        <Link
          href="/quote/"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: 12,
            background: "#042C53", color: "#ffffff",
            border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 500, textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          Build a package that includes Pasadera
        </Link>
        <style>{`@media(max-width:480px){.monday-body{padding:1.25rem}}`}</style>
      </div>
    </div>
  );
}
