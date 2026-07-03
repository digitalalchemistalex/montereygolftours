const SAMPLE_QUESTIONS = [
  "How many people can you plan a trip for?",
  "Can you book Pebble Beach Resorts® courses, or just describe them?",
  "When's the best time to play the Monterey Peninsula?",
];

export default function FaqItalicDemoPage() {
  return (
    <div className="min-h-screen bg-[#EDE7D8] px-6 py-16">
      <div className="mx-auto max-w-[700px] space-y-10">
        <div>
          <p className="mb-4 font-sans text-sm text-[#5a564e]">
            Option A — question italic, answer stays normal (current answer style unchanged)
          </p>
          <div className="rounded-xl border border-[#e3ddcf] bg-white p-6">
            {SAMPLE_QUESTIONS.map((q) => (
              <div key={q} className="border-b border-[#ddd6c2] py-4 last:border-b-0">
                <div className="font-ui text-[15px] font-semibold italic leading-snug text-ink">
                  {q}
                </div>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
                  Sample answer text stays in its normal, non-italic style for contrast.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-sans text-sm text-[#5a564e]">
            Option B — question in italic serif (font-display instead of font-ui), a bit more editorial
          </p>
          <div className="rounded-xl border border-[#e3ddcf] bg-white p-6">
            {SAMPLE_QUESTIONS.map((q) => (
              <div key={q} className="border-b border-[#ddd6c2] py-4 last:border-b-0">
                <div className="font-display text-[17px] font-semibold italic leading-snug text-ink">
                  {q}
                </div>
                <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
                  Sample answer text stays in its normal, non-italic style for contrast.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
