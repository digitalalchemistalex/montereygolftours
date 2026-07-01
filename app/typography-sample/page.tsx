const OPTIONS = [
  { id: 0, label: "Current — Playfair Display", category: "Baseline", font: "'Playfair Display', serif", weight: 800 },
  { id: 1, label: "Cinzel", category: "Elegant / classical", font: "'Cinzel', serif", weight: 700 },
  { id: 2, label: "Cormorant Garamond", category: "Elegant / delicate", font: "'Cormorant Garamond', serif", weight: 600 },
  { id: 3, label: "EB Garamond", category: "Elegant / timeless", font: "'EB Garamond', serif", weight: 600 },
  { id: 4, label: "Marcellus", category: "Elegant / refined", font: "'Marcellus', serif", weight: 400 },
  { id: 5, label: "Italiana", category: "Elegant / luxury fashion", font: "'Italiana', serif", weight: 400 },
  { id: 6, label: "Bodoni Moda", category: "Elegant / high-contrast editorial", font: "'Bodoni Moda', serif", weight: 700 },
  { id: 7, label: "UnifrakturMaguntia", category: "Gothic / blackletter", font: "'UnifrakturMaguntia', cursive", weight: 400 },
  { id: 8, label: "IM Fell English SC", category: "Vintage / antique small caps", font: "'IM Fell English SC', serif", weight: 400 },
  { id: 9, label: "Great Vibes", category: "Handwriting / calligraphy", font: "'Great Vibes', cursive", weight: 400 },
  { id: 10, label: "Alex Brush", category: "Handwriting / brush script", font: "'Alex Brush', cursive", weight: 400 },
  { id: 11, label: "Parisienne", category: "Handwriting / delicate script", font: "'Parisienne', cursive", weight: 400 },
];

export default function TypographySamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-10 font-sans text-sm text-[#8a857a]">
          Monterey Golf Tours &mdash; typography options
        </p>
        <div className="space-y-10">
          {OPTIONS.map((o) => (
            <div key={o.id} className="border-b border-[#e3ddcf] pb-8">
              <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-[#a89f8c]">
                {o.id === 0 ? "Baseline" : `Option ${o.id}`} &middot; {o.category}
              </p>
              <div
                className="leading-none text-[#252321]"
                style={{ fontFamily: o.font, fontWeight: o.weight, fontSize: "56px" }}
              >
                Monterey Golf Tours
              </div>
              <p className="mt-2 font-sans text-xs text-[#8a857a]">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
