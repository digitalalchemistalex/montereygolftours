const SAMPLES = [
  {
    id: 1,
    label: "Option 1 — Fraunces + DM Sans",
    headlineFont: "'Fraunces', Georgia, serif",
    headlineWeight: 600,
    bodyFont: "'DM Sans', system-ui, sans-serif",
  },
  {
    id: 2,
    label: "Option 2 — Instrument Serif + Inter",
    headlineFont: "'Instrument Serif', Georgia, serif",
    headlineWeight: 400,
    bodyFont: "'Inter', system-ui, sans-serif",
  },
  {
    id: 3,
    label: "Option 3 — Space Grotesk (everywhere)",
    headlineFont: "'Space Grotesk', system-ui, sans-serif",
    headlineWeight: 700,
    bodyFont: "'Space Grotesk', system-ui, sans-serif",
  },
  {
    id: 4,
    label: "Option 4 — Source Serif 4 + Manrope",
    headlineFont: "'Source Serif 4', Georgia, serif",
    headlineWeight: 600,
    bodyFont: "'Manrope', system-ui, sans-serif",
  },
];

export default function FontSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-12 md:px-16">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-10 font-sans text-sm text-[#7a766e]">
          Font pairing samples — temporary review page, not part of the site.
        </p>
        {SAMPLES.map((s) => (
          <div
            key={s.id}
            className="mb-12 rounded-2xl border border-[#e3ddcf] bg-white p-8 md:p-10"
          >
            <p className="mb-5 font-sans text-xs font-semibold uppercase tracking-[.12em] text-[#2C6E8E]">
              {s.label}
            </p>
            <h2
              style={{
                fontFamily: s.headlineFont,
                fontWeight: s.headlineWeight,
                color: "#252321",
              }}
              className="mb-3 text-[40px] leading-[1.1] md:text-[52px]"
            >
              Your group&apos;s golf trip to the coast
            </h2>
            <p
              style={{ fontFamily: s.bodyFont }}
              className="max-w-[520px] text-[16px] leading-relaxed text-[#4a463f] md:text-[17px]"
            >
              Courses, tee times, lodging, and transport for the Monterey Peninsula —
              handled by people who know the fog patterns as well as the fairways.
            </p>
            <div className="mt-6 flex gap-3">
              <span
                style={{ fontFamily: s.bodyFont }}
                className="rounded-[9px] bg-[#2C6E8E] px-6 py-3 text-[15px] font-medium text-white"
              >
                Get a custom quote
              </span>
              <span
                style={{ fontFamily: s.bodyFont }}
                className="rounded-[9px] border border-[#d8b98f] px-6 py-3 text-[15px] font-medium text-[#252321]"
              >
                See sample itineraries
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
