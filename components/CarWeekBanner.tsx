// components/CarWeekBanner.tsx
// Shows Aug 1–20 only. No props. Bayonet + Black Horse pages only.
// Concorso Italiano at Bayonet Black Horse — verified mgts-lodging-intelligence.md

export default function CarWeekBanner() {
  const now  = new Date();
  const m    = now.getMonth(); // 7 = August
  const d    = now.getDate();
  if (!(m === 7 && d >= 1 && d <= 20)) return null;

  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid #EF9F27", marginBottom: "2rem" }}>
      {/* Alert bar */}
      <div
        style={{
          background: "#633806", padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 8,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FAC775" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span
          style={{
            fontSize: 12, fontWeight: 500, color: "#ffffff",
            textTransform: "uppercase", letterSpacing: "0.06em",
          }}
        >
          Car Week conflict — Bayonet &amp; Black Horse
        </span>
      </div>
      {/* Body */}
      <div style={{ background: "#FAEEDA", padding: "1rem 1.25rem" }}>
        <p style={{ margin: "0 0 0.75rem", fontSize: 14, color: "#412402", lineHeight: 1.6 }}>
          The Concorso Italiano runs at Bayonet Black Horse during Car Week. Both courses close
          to golf Aug&nbsp;14&ndash;17. Book around these dates if either course is on your list.
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Aug 14", "Aug 15", "Aug 16", "Aug 17"].map((d) => (
            <span
              key={d}
              style={{
                background: "#854F0B", color: "#FAEEDA",
                fontSize: 12, fontWeight: 500,
                padding: "4px 12px", borderRadius: 20,
              }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
