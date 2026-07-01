const SAMPLES = [
  {
    id: 1,
    label: "Option 1 — Permanent Marker",
    font: "'Permanent Marker', cursive",
    bg: "#E8384F",
    dot: "#F5D033",
  },
  {
    id: 2,
    label: "Option 2 — Caveat",
    font: "'Caveat', cursive",
    bg: "#2C6E8E",
    dot: "#F5D033",
  },
  {
    id: 3,
    label: "Option 3 — Bangers",
    font: "'Bangers', cursive",
    bg: "#F5D033",
    dot: "#E8384F",
  },
];

export default function FontSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-16">
        {SAMPLES.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            <p className="mb-6 font-sans text-sm font-semibold text-[#2A2620]">{s.label}</p>
            <div
              className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-full border-[6px] border-black"
              style={{
                background: `radial-gradient(circle, ${s.dot} 3px, transparent 3.5px) 0 0/18px 18px, ${s.bg}`,
              }}
            >
              <span
                className="px-6 text-center leading-[0.95] text-black"
                style={{ fontFamily: s.font, fontSize: "44px" }}
              >
                Best Time
                <br />
                to Play
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
