const SAMPLES = [
  { id: 1, label: "Option 1 — Anton", font: "'Anton', sans-serif" },
  { id: 2, label: "Option 2 — Luckiest Guy", font: "'Luckiest Guy', cursive" },
  { id: 3, label: "Option 3 — Pacifico", font: "'Pacifico', cursive" },
];

function GolfBallSunburst() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <defs>
        <pattern id="halftone1" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1.8" fill="#000" opacity="0.55" />
        </pattern>
        <clipPath id="circleClip1">
          <circle cx="150" cy="150" r="144" />
        </clipPath>
      </defs>
      <circle cx="150" cy="150" r="144" fill="#E8384F" stroke="#000" strokeWidth="6" />
      <g clipPath="url(#circleClip1)">
        <g stroke="#000" strokeWidth="7" strokeLinecap="round">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line key={deg} x1="150" y1="150" x2="150" y2="30" transform={`rotate(${deg} 150 150)`} />
          ))}
        </g>
        <g stroke="#F5D033" strokeWidth="4" strokeLinecap="round">
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
            <line key={deg} x1="150" y1="150" x2="150" y2="34" transform={`rotate(${deg} 150 150)`} />
          ))}
        </g>
      </g>
      <circle cx="150" cy="205" r="46" fill="#FFFFFF" stroke="#000" strokeWidth="6" />
      <path d="M104 205 A46 46 0 0 1 196 205" fill="url(#halftone1)" opacity="0.9" />
      <circle cx="134" cy="192" r="4" fill="#000" />
      <circle cx="150" cy="188" r="4" fill="#000" />
      <circle cx="166" cy="192" r="4" fill="#000" />
      <circle cx="142" cy="205" r="4" fill="#000" />
      <circle cx="158" cy="205" r="4" fill="#000" />
      <circle cx="134" cy="218" r="4" fill="#000" />
      <circle cx="150" cy="222" r="4" fill="#000" />
      <circle cx="166" cy="218" r="4" fill="#000" />
    </svg>
  );
}

export default function FontSamplePage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE] px-6 py-16">
      <div className="mx-auto flex max-w-[900px] flex-wrap justify-center gap-16">
        {SAMPLES.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className="h-[220px] w-[220px] overflow-hidden rounded-full">
              <GolfBallSunburst />
            </div>
            <div
              className="mt-4 text-center leading-tight text-[#2A2620]"
              style={{ fontFamily: s.font, fontSize: "26px" }}
            >
              Best Time to Play
            </div>
            <p className="mt-2 font-sans text-xs text-[#8a857a]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
