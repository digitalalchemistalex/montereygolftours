const RYE_VARIANTS = [
  { id: 1, label: "Rye — Classic black", color: "#1A1A1A", bg: "#FAF6EE" },
  { id: 2, label: "Rye — Brand ink", color: "#252321", bg: "#FAF6EE" },
  { id: 3, label: "Rye — Ocean blue", color: "#1F4F66", bg: "#FAF6EE" },
  { id: 4, label: "Rye — Coral/gold accent", color: "#B5602E", bg: "#FAF6EE" },
  { id: 5, label: "Rye — Cream on ink (reversed)", color: "#FAF6EE", bg: "#252321" },
  { id: 6, label: "Rye — Two-tone (ink + coral)", color: "#252321", bg: "#FAF6EE", accent: "#E8A0A8" },
];

const SANCREEK_VARIANTS = [
  { id: 7, label: "Sancreek — Classic black", color: "#1A1A1A", bg: "#FAF6EE" },
  { id: 8, label: "Sancreek — Ocean blue", color: "#1F4F66", bg: "#FAF6EE" },
  { id: 9, label: "Sancreek — Terracotta", color: "#8A461E", bg: "#FAF6EE" },
  { id: 10, label: "Sancreek — Cream on ink (reversed)", color: "#FAF6EE", bg: "#252321" },
];

export default function LogoStyleSamplePage() {
  return (
    <div className="min-h-screen bg-[#EDE7D8] px-6 py-16">
      <div className="mx-auto max-w-[900px]">
        <p className="mb-8 font-sans text-sm text-[#5a564e]">
          Rye variants (closest match to the uploaded style — bold western/wanted-poster serif)
        </p>
        <div className="mb-16 space-y-6">
          {RYE_VARIANTS.map((v) => (
            <div
              key={v.id}
              className="flex flex-col items-center justify-center rounded-xl px-6 py-10"
              style={{ backgroundColor: v.bg }}
            >
              <div
                style={{
                  fontFamily: "'Rye', serif",
                  fontSize: "44px",
                  color: v.color,
                  letterSpacing: "1px",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                {v.accent ? (
                  <>
                    <span style={{ color: v.color }}>MONTEREY </span>
                    <span style={{ color: v.accent }}>GOLF</span>
                    <span style={{ color: v.color }}> TOURS</span>
                  </>
                ) : (
                  "MONTEREY GOLF TOURS"
                )}
              </div>
              <p className="mt-4 font-sans text-xs text-[#8a857a]">{v.label}</p>
            </div>
          ))}
        </div>

        <p className="mb-8 font-sans text-sm text-[#5a564e]">
          Sancreek variants (bolder, more compact western style)
        </p>
        <div className="space-y-6">
          {SANCREEK_VARIANTS.map((v) => (
            <div
              key={v.id}
              className="flex flex-col items-center justify-center rounded-xl px-6 py-10"
              style={{ backgroundColor: v.bg }}
            >
              <div
                style={{
                  fontFamily: "'Sancreek', serif",
                  fontSize: "40px",
                  color: v.color,
                  letterSpacing: "1px",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                MONTEREY GOLF TOURS
              </div>
              <p className="mt-4 font-sans text-xs text-[#8a857a]">{v.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
