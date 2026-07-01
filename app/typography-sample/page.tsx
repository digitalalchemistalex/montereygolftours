const OPTIONS = [
  { id: 1, label: "Cormorant", category: "Elegant / display serif", font: "'Cormorant', serif", weight: 700 },
  { id: 2, label: "Abril Fatface", category: "Elegant / bold fashion display", font: "'Abril Fatface', serif", weight: 400 },
  { id: 3, label: "Prata", category: "Elegant / refined display", font: "'Prata', serif", weight: 400 },
  { id: 4, label: "Frank Ruhl Libre", category: "Elegant / literary serif", font: "'Frank Ruhl Libre', serif", weight: 700 },
  { id: 5, label: "Spectral", category: "Elegant / contemporary serif", font: "'Spectral', serif", weight: 600 },
  { id: 6, label: "Crimson Pro", category: "Elegant / classic book serif", font: "'Crimson Pro', serif", weight: 600 },
  { id: 7, label: "Forum", category: "Elegant / Roman capitals", font: "'Forum', serif", weight: 400 },
  { id: 8, label: "Julius Sans One", category: "Elegant / thin geometric", font: "'Julius Sans One', sans-serif", weight: 400 },
  { id: 9, label: "Josefin Sans", category: "Elegant / art-deco geometric", font: "'Josefin Sans', sans-serif", weight: 500 },
  { id: 10, label: "Quattrocento", category: "Elegant / sturdy serif", font: "'Quattrocento', serif", weight: 700 },
  { id: 11, label: "Cardo", category: "Elegant / scholarly serif", font: "'Cardo', serif", weight: 700 },
  { id: 12, label: "Vollkorn", category: "Elegant / readable serif", font: "'Vollkorn', serif", weight: 700 },
  { id: 13, label: "Zilla Slab", category: "Modern / slab serif", font: "'Zilla Slab', serif", weight: 600 },
  { id: 14, label: "Rozha One", category: "Distinctive / display serif", font: "'Rozha One', serif", weight: 400 },
  { id: 15, label: "Caudex", category: "Distinctive / unusual serif", font: "'Caudex', serif", weight: 700 },
  { id: 16, label: "Fjalla One", category: "Bold / condensed sans", font: "'Fjalla One', sans-serif", weight: 400 },
  { id: 17, label: "Oswald", category: "Bold / condensed sans", font: "'Oswald', sans-serif", weight: 600 },
  { id: 18, label: "Bebas Neue", category: "Bold / poster caps", font: "'Bebas Neue', sans-serif", weight: 400 },
  { id: 19, label: "Archivo Black", category: "Bold / heavy sans", font: "'Archivo Black', sans-serif", weight: 400 },
  { id: 20, label: "Anton", category: "Bold / impact condensed", font: "'Anton', sans-serif", weight: 400 },
  { id: 21, label: "Yeseva One", category: "Distinctive / quirky display serif", font: "'Yeseva One', serif", weight: 400 },
  { id: 22, label: "Abhaya Libre", category: "Elegant / distinctive serif", font: "'Abhaya Libre', serif", weight: 700 },
  { id: 23, label: "Gilda Display", category: "Elegant / refined display", font: "'Gilda Display', serif", weight: 400 },
  { id: 24, label: "Domine", category: "Elegant / strong serif", font: "'Domine', serif", weight: 700 },
  { id: 25, label: "Piazzolla", category: "Elegant / contemporary serif", font: "'Piazzolla', serif", weight: 600 },
  { id: 26, label: "Fraunces", category: "Distinctive / characterful serif", font: "'Fraunces', serif", weight: 600 },
];

export default function TypographySamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto max-w-[820px]">
        <p className="mb-10 font-sans text-sm text-[#8a857a]">
          Monterey Golf Tours &mdash; typography options, round 2 (all caps)
        </p>
        <div className="space-y-9">
          {OPTIONS.map((o) => (
            <div key={o.id} className="border-b border-[#e3ddcf] pb-7">
              <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[.08em] text-[#a89f8c]">
                Option {o.id} &middot; {o.category}
              </p>
              <div
                className="leading-none text-[#252321]"
                style={{
                  fontFamily: o.font,
                  fontWeight: o.weight,
                  fontSize: "48px",
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
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
