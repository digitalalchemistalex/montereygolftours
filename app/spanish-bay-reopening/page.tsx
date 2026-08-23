"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { SITE } from "@/lib/site";

export default function SpanishBayWaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const { error } = await supabase.from("spanish_bay_waitlist").insert({
      name, email, phone: phone || null,
      group_size: groupSize || null,
      notes: notes || null,
    });
    if (error) {
      if (error.code === "23505") {
        setErrorMsg("That email is already on the list — we\'ll be in touch.");
        setStatus("error");
      } else {
        setErrorMsg("Something went wrong. Please try again or call us directly.");
        setStatus("error");
      }
      return;
    }
    setStatus("success");
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#f8f5ef]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#0d2a38] px-6 py-20 text-center md:px-14 md:py-28">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url(\"https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1600&q=60\")", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="relative mx-auto max-w-[760px]">
            <div className="mb-4 inline-block rounded-full border border-[rgba(255,255,255,.2)] bg-[rgba(255,255,255,.08)] px-4 py-1.5 font-ui text-[12px] font-semibold uppercase tracking-[.1em] text-[#c9a83c]">
              Reopening April 17, 2027
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              The Links at Spanish Bay®<br />
              <span className="text-[#c9a83c]">is coming back.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[580px] font-body text-[17px] leading-relaxed text-[rgba(255,255,255,.8)]">
              Gil Hanse — the architect behind the Olympic Club renovation and Bethpage Black restoration — has spent the past year redesigning one of the most atmospheric links courses in American golf. It reopens April 17, 2027. Join the waitlist and we&apos;ll secure your group&apos;s tee times the moment bookings open.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-ui text-[13px] text-[rgba(255,255,255,.6)]">
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a83c]" />
                Pebble Beach Resorts® course
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a83c]" />
                Gil Hanse redesign
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c9a83c]" />
                Links-style · Pacific Ocean views
              </span>
            </div>
          </div>
        </section>

        {/* ── Countdown strip ── */}
        <div className="border-b border-[#e3ddcf] bg-white px-6 py-4">
          <div className="mx-auto flex max-w-[960px] items-center justify-center gap-3 font-ui text-[13px] text-[#5a564e]">
            <span className="font-semibold text-ink">April 17, 2027</span>
            <span className="text-[#d8d2c2]">—</span>
            <span>Reopening date confirmed by Pebble Beach Resorts®</span>
            <span className="text-[#d8d2c2]">·</span>
            <span>Group tee times will book fast. Secure yours now.</span>
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:items-start">

            {/* ── Left: Content ── */}
            <div>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                Why this matters
              </h2>
              <div className="mt-6 space-y-6 font-body text-[15px] leading-relaxed text-[#4a463f]">
                <p>
                  The Links at Spanish Bay® was originally designed by Robert Trent Jones Jr., Tom Watson, and Sandy Tatum — a true links layout carved through the Del Monte Forest dunes along the Pacific coastline. It&apos;s the only course in the Pebble Beach Resorts® portfolio with a genuine links character: firm, fast, wind-exposed fairways and the sound of the ocean on every hole.
                </p>
                <p>
                  Gil Hanse doesn&apos;t renovate courses to modernise them. He renovates them to reveal what was always there. His work at The Olympic Club restored lost green complexes. His Bethpage Black restoration gave the course back its original ferocity. What he&apos;s doing at Spanish Bay is a full reimagining — not a cosmetic refresh.
                </p>
                <p>
                  When it reopens, Spanish Bay will be one of the most anticipated tee times in American golf. Group slots — particularly for 8+ players — will be the first to go. Pebble Beach Resorts® manages demand tightly. The groups who book early play Spanish Bay in its first season. The rest wait.
                </p>
                <p>
                  We&apos;ve been booking groups at Pebble Beach Resorts® courses for years through our IAGTO partnership. The moment bookings open for the redesigned Spanish Bay, we&apos;ll reach out to everyone on this list with tee time options and group pricing — before they&apos;re available to the public.
                </p>
              </div>

              {/* ── What to expect ── */}
              <div className="mt-10">
                <h3 className="mb-5 font-display text-xl font-bold text-ink">What the course offers</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[
                    { title: "Links character", body: "Firm, fast fairways through coastal dunes — the only true links layout at Pebble Beach Resorts®." },
                    { title: "Pacific Ocean views", body: "Every hole plays with the ocean visible. The back nine turns directly into the prevailing wind off the bay." },
                    { title: "The bagpipes at sunset", body: "A Pebble Beach tradition — a lone piper plays at the 18th green as the sun drops over the Pacific. Spanish Bay is where you experience this." },
                    { title: "Walking only", body: "Like Pebble Beach Golf Links®, Spanish Bay is a walking course. The links terrain and coastal setting make it one of the best walks in golf." },
                    { title: "Par 72 · 6,726 yards", body: "Slope 146 from the back tees — the wind changes this course entirely depending on which direction it&apos;s blowing." },
                    { title: "Gil Hanse redesign", body: "One of the three best course architects currently working. What he&apos;s built here won&apos;t be properly understood until you walk it." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-[#e3ddcf] bg-white p-4">
                      <div className="mb-1.5 font-ui text-[13px] font-semibold text-ink">{item.title}</div>
                      <div className="font-body text-[13px] leading-relaxed text-[#6a665e]">{item.body}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Timeline ── */}
              <div className="mt-10">
                <h3 className="mb-5 font-display text-xl font-bold text-ink">What happens next</h3>
                <div className="space-y-4">
                  {[
                    { date: "Now", label: "Join the waitlist", body: "Your name goes on our priority list. No commitment, no deposit." },
                    { date: "Early 2027", label: "We contact you", body: "When Pebble Beach Resorts® opens group bookings, we reach out to everyone on this list first with available tee times and group pricing." },
                    { date: "April 17, 2027", label: "Spanish Bay reopens", body: "First groups tee off on the redesigned course. Early waitlist members play in the opening season." },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0d2a38] font-ui text-[11px] font-bold text-white">{i + 1}</div>
                        {i < 2 && <div className="mt-1 w-px flex-1 bg-[#d8d2c2]" />}
                      </div>
                      <div className="pb-6">
                        <div className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#9a8a6e]">{step.date}</div>
                        <div className="mt-0.5 font-ui text-[14px] font-semibold text-ink">{step.label}</div>
                        <div className="mt-1 font-body text-[13px] leading-relaxed text-[#6a665e]">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Waitlist form ── */}
            <div className="lg:sticky lg:top-8">
              {status === "success" ? (
                <div className="rounded-2xl border border-[#e3ddcf] bg-white p-8 text-center shadow-[0_8px_28px_rgba(37,35,33,.08)]">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef6f1]">
                    <svg className="h-6 w-6 text-[#1a6040]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">You&apos;re on the list.</h3>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-[#6a665e]">
                    We&apos;ll reach out as soon as group bookings open for the redesigned Spanish Bay — well before public availability.
                  </p>
                  <Link href="/packages/" className="mt-6 inline-block font-ui text-[13px] font-semibold text-ocean hover:underline">
                    Browse other Monterey packages →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_8px_28px_rgba(37,35,33,.08)] md:p-8">
                  <div className="mb-1 inline-block rounded-full bg-[#fdf9ed] px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#c9a83c]">
                    Priority waitlist
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                    Be first to book Spanish Bay
                  </h3>
                  <p className="mt-2 font-body text-[13px] leading-relaxed text-[#6a665e]">
                    Join the list. We&apos;ll contact you the moment group tee times open for the reopened course — before public availability.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Name <span className="text-[#a83232]">*</span></label>
                      <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Michael Chen"
                        className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean" />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Email <span className="text-[#a83232]">*</span></label>
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean" />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Mobile</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean" />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Group size</label>
                      <select value={groupSize} onChange={(e) => setGroupSize(e.target.value)}
                        className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean">
                        <option value="">Select…</option>
                        <option value="2-4">2–4 players</option>
                        <option value="5-8">5–8 players</option>
                        <option value="9-16">9–16 players</option>
                        <option value="17+">17+ players</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Anything we should know?</label>
                      <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
                        placeholder="Preferred dates, trip type, other courses you want to pair it with…"
                        className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean" />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="mt-3 font-ui text-[13px] text-[#a83232]">{errorMsg}</p>
                  )}

                  <button type="submit" disabled={status === "submitting"}
                    className="mt-6 w-full rounded-[9px] bg-[#0d2a38] px-7 py-4 font-ui text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#1a4a5c] disabled:opacity-60">
                    {status === "submitting" ? "Joining…" : "Join the waitlist →"}
                  </button>
                  <p className="mt-3 text-center font-ui text-[12px] text-[#9a8a6e]">
                    No commitment. No deposit. We&apos;ll reach out when bookings open.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="border-t border-[#e3ddcf] bg-white px-6 py-12 text-center">
          <p className="font-body text-[15px] text-[#6a665e]">
            Want to book a Monterey trip that&apos;s available now?
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/itineraries/pebble-beach-golf-package/"
              className="rounded-[9px] bg-ocean px-6 py-3 font-ui text-[14px] font-semibold text-cream hover:bg-ocean-dark">
              The Pebble Pilgrimage →
            </Link>
            <Link href="/quote/"
              className="rounded-[9px] border border-[#d8d2c2] bg-white px-6 py-3 font-ui text-[14px] font-semibold text-ink hover:border-ocean">
              Get a custom quote
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
