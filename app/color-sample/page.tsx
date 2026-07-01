import Image from "next/image";

const AMENITIES = [
  "On-site Pete Dye golf course",
  "Spa Aiyana (10,500 sq ft)",
  "3 outdoor pools",
  "Valley Kitchen restaurant",
  "Estate vineyard + gardens",
  "On-site bike trails",
];

const FAQS = [
  { q: "Does Carmel Valley Ranch have standard hotel rooms?", a: "No — every accommodation is a suite, averaging 800 sq ft." },
  { q: "Who designed the golf course?", a: "Pete Dye designed the original course in 1980 — his only design in Northern California." },
  { q: "Is it usually warmer than the coast?", a: "Yes, its inland location sits outside the coastal marine layer." },
];

const VARIANTS = [
  {
    id: "A",
    label: "Option A — Warm Hospitality",
    bg: "#FBF1E6",
    card: "#FFFFFF",
    accent: "#B5602E",
    accentDark: "#8A461E",
    ink: "#3A2E22",
    sub: "#8A7561",
    border: "#EAD9C4",
    patternColor: "#1F6E66",
  },
  {
    id: "B",
    label: "Option B — Elegant Boutique",
    bg: "#FBF0F2",
    card: "#FFFFFF",
    accent: "#9E3B57",
    accentDark: "#742840",
    ink: "#2E2226",
    sub: "#8A7278",
    border: "#EBD5DB",
    patternColor: "#1C2B45",
  },
  {
    id: "C",
    label: "Option C — Coastal Spa",
    bg: "#F3F5EC",
    card: "#FFFFFF",
    accent: "#5C7A52",
    accentDark: "#41582F",
    ink: "#2A2E24",
    sub: "#7D8672",
    border: "#DEE5D2",
    patternColor: "#A8843D",
  },
];

export default function ColorSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto max-w-[900px] space-y-20">
        {VARIANTS.map((v) => (
          <div key={v.id}>
            <p className="mb-6 font-sans text-sm font-semibold text-[#2A2620]">{v.label}</p>

            <div className="rounded-2xl p-8" style={{ backgroundColor: v.bg }}>
              <div className="relative overflow-hidden rounded-xl p-6" style={{ backgroundColor: v.card, border: `1px solid ${v.border}` }}>
                <div className="pointer-events-none absolute inset-0" style={{ color: v.patternColor, opacity: 0.06 }}>
                  <Image src="/art/patterns/amenities-bg.svg" alt="" fill className="object-cover" />
                </div>
                <div className="relative">
                  <div className="font-serif text-2xl font-bold" style={{ color: v.ink, fontFamily: "Georgia, serif" }}>
                    Amenities
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {AMENITIES.map((a) => (
                      <div
                        key={a}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[13px]"
                        style={{ backgroundColor: v.bg, color: v.ink }}
                      >
                        <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ backgroundColor: v.accent }} />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-xl p-6" style={{ backgroundColor: v.card, border: `1px solid ${v.border}` }}>
                <div className="pointer-events-none absolute inset-0" style={{ color: v.patternColor, opacity: 0.06 }}>
                  <Image src="/art/patterns/faq-bg.svg" alt="" fill className="object-cover" />
                </div>
                <div className="relative">
                  <div className="font-serif text-2xl font-bold" style={{ color: v.ink, fontFamily: "Georgia, serif" }}>
                    Common questions
                  </div>
                  <div className="mt-4 space-y-3">
                    {FAQS.map((f) => (
                      <div key={f.q} className="border-b pb-3" style={{ borderColor: v.border }}>
                        <div className="text-[14px] font-semibold" style={{ color: v.ink }}>{f.q}</div>
                        <div className="mt-1 text-[13px]" style={{ color: v.sub }}>{f.a}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
                    style={{ backgroundColor: v.accent }}
                  >
                    Get a custom quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
