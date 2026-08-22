"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { COURSES } from "@/lib/courses";
import { COURSE_DETAILS } from "@/lib/course-details";
import { HOTELS } from "@/lib/hotels";
import { ITINERARIES } from "@/lib/itineraries";
import Reveal from "./Reveal";

// ─── Constants ───────────────────────────────────────────────────────────────

const REFERRAL_SOURCES = [
  "Google search",
  "Referred by a friend or colleague",
  "Social media",
  "Golf publication or blog",
  "Previous trip with us",
  "Other",
];

const ACTIVITIES = [
  "Wine tasting (Carmel Valley — Bernardus, Folktale)",
  "Monterey Bay Aquarium",
  "Cannery Row dining",
  "Spa / wellness",
  "Scenic coastal drive through Del Monte Forest",
  "Carmel-by-the-Sea galleries & shopping",
];

const TRANSPORT_OPTIONS = [
  { value: "", label: "No transport needed" },
  { value: "airport", label: "Airport transfers only (MRY / SJC / SFO)" },
  { value: "ground", label: "Between courses & hotels" },
  { value: "both", label: "Both airport and ground" },
];

const CLOSED_COURSE_SLUGS = new Set(["links-at-spanish-bay", "the-hay"]);
const PBC_SLUGS = new Set(["pebble-beach-golf-links", "spyglass-hill", "del-monte-golf-course"]);
const BOOKABLE_COURSES = COURSES.filter((c) => !CLOSED_COURSE_SLUGS.has(c.slug));

const DIFFICULTY_LABEL: Record<string, string> = {
  championship: "Championship",
  challenging: "Challenging",
  moderate: "Moderate",
  accessible: "Accessible",
};

const DIFFICULTY_CLS: Record<string, string> = {
  championship: "bg-[#fdecea] text-[#7a1a1a]",
  challenging: "bg-[#fff3e0] text-[#7a4a0a]",
  moderate: "bg-[#eaf4ee] text-[#1a6040]",
  accessible: "bg-[#e8edf2] text-[#3a5068]",
};

function isCarWeekDate(v: string) {
  if (!v) return false;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return false;
  return d.getMonth() === 7 && d.getDate() >= 10 && d.getDate() <= 20;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Section 1 — Contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [okToCall, setOkToCall] = useState(false);
  const [okToText, setOkToText] = useState(false);
  const [returningCustomer, setReturningCustomer] = useState(false);

  // Section 2 — Trip details
  const [groupSize, setGroupSize] = useState("8");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [nonGolfer, setNonGolfer] = useState(false);

  // Sections 3–5
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [transportNeeded, setTransportNeeded] = useState("");

  // Section 6 — Almost done
  const [referralSource, setReferralSource] = useState("");
  const [referralOther, setReferralOther] = useState("");
  const [message, setMessage] = useState("");

  // URL pre-fill
  const initialContext = useMemo(() => {
    const courseSlug = searchParams.get("course");
    const hotelSlug = searchParams.get("hotel");
    const tripSlug = searchParams.get("trip");
    if (courseSlug) {
      const c = COURSES.find((x) => x.slug === courseSlug);
      if (c) return { courses: [courseSlug], note: `Noted — you're inquiring about ${c.name}.` };
    }
    if (hotelSlug) {
      const h = HOTELS.find((x) => x.slug === hotelSlug);
      if (h) return { courses: [] as string[], note: `Noted — you're inquiring about ${h.name}.` };
    }
    if (tripSlug) {
      const t = ITINERARIES[tripSlug];
      if (t) return { courses: t.courseSlugs, note: `Noted — you're inquiring about the ${t.title} itinerary.` };
    }
    return { courses: [] as string[], note: null as string | null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCourses, setSelectedCourses] = useState<string[]>(initialContext.courses);
  const contextNote = initialContext.note;

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  // Live green-fee estimate
  const liveEstimate = useMemo(() => {
    if (selectedCourses.length === 0) return null;
    let total = 0, missing = 0;
    for (const slug of selectedCourses) {
      const est = COURSE_DETAILS[slug]?.priceEstimate;
      if (typeof est === "number") total += est;
      else missing += 1;
    }
    if (total === 0) return null;
    return { total, missing, count: selectedCourses.length };
  }, [selectedCourses]);

  const hasPBC = selectedCourses.some((s) => PBC_SLUGS.has(s));
  const carWeekFlag = isCarWeekDate(startDate) || isCarWeekDate(endDate);

  // Summary for sidebar
  const summaryDates = useMemo(() => {
    if (datesFlexible) return "Flexible";
    if (!startDate) return null;
    const s = new Date(startDate);
    const e = endDate ? new Date(endDate) : null;
    const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return e ? `${fmt(s)} – ${fmt(e)}` : fmt(s);
  }, [startDate, endDate, datesFlexible]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    const travelDates = datesFlexible ? "Flexible" : [startDate, endDate].filter(Boolean).join(" to ");
    const fullMessage = [message, nonGolfer ? "Group includes a non-golfing partner or family member." : null]
      .filter(Boolean).join(" ");
    const payload = {
      name, email, phone: phone || null, group_size: groupSize,
      nights: nights || null, travel_dates: travelDates || null,
      courses_interested: selectedCourses, hotels_interested: selectedHotels,
      activities_interested: selectedActivities, transport_needed: transportNeeded || null,
      ok_to_call: okToCall, ok_to_text: okToText, returning_customer: returningCustomer,
      non_golfer_in_group: nonGolfer,
      referral_source: referralSource === "Other" && referralOther ? `Other: ${referralOther}` : referralSource || null,
      message: fullMessage || null,
    };
    const { error } = await supabase.from("leads").insert({ ...payload, raw_payload: payload });
    if (error) { setStatus("error"); return; }
    fetch("/api/notify-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#e3ddcf] bg-white p-8 text-center md:p-10">
        <div className="font-display text-2xl font-bold text-ink md:text-[28px]">
          Got it — thank you, {name.split(" ")[0]}.
        </div>
        <p className="mx-auto mt-3 max-w-[480px] font-body text-[15px] leading-relaxed text-[#5a564e]">
          We&apos;ll have a custom quote to you within 24 hours. In the meantime, our most popular starting point is the 4-day Classic Peninsula trip.
        </p>
        <Link href="/itineraries/4-day-monterey-peninsula-golf-trip/"
          className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark">
          See the 4-day sample itinerary &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
      {/* ── Main form ── */}
      <form onSubmit={handleSubmit}
        className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_8px_28px_rgba(37,35,33,.08)] md:p-10">

        {contextNote && (
          <Reveal>
            <div className="mb-6 rounded-lg border border-[#cfe0d8] bg-[#eef6f1] px-4 py-3 font-ui text-[13px] text-[#2f6b4f]">
              {contextNote}
            </div>
          </Reveal>
        )}

        {/* ── 1. Contact Info ── */}
        <SectionHeader n={1} label="Contact info" />
        <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
          <Field label="First name" required>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John" className={iCls} />
          </Field>
          <Field label="Email" required>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={iCls} />
          </Field>
          <Field label="Mobile">
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" className={iCls} />
          </Field>
          <div className="flex flex-col justify-end gap-2">
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">Contact preferences</p>
            <Check checked={okToCall} onChange={setOkToCall} label="You may call me to discuss my quote" />
            <Check checked={okToText} onChange={setOkToText} label="You may text me with questions" />
          </div>
          <div className="sm:col-span-2">
            <Check checked={returningCustomer} onChange={setReturningCustomer} label="I've booked with Monterey Golf Tours before" />
          </div>
        </div>

        {/* ── 2. Trip Details ── */}
        <SectionHeader n={2} label="Trip details" />
        <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
          <Field label="Number of golfers" required>
            <input type="number" min="2" max="400" required value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)} placeholder="e.g. 12" className={iCls} />
          </Field>
          <Field label="Nights">
            <input type="number" min="1" max="30" value={nights}
              onChange={(e) => setNights(e.target.value)} placeholder="e.g. 4" className={iCls} />
          </Field>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Travel dates</label>
            {!datesFlexible && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Arrival</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={iCls} />
                </div>
                <div>
                  <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Departure</label>
                  <input type="date" value={endDate} min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)} className={iCls} />
                </div>
              </div>
            )}
            <label className="mt-2.5 flex cursor-pointer items-center gap-2 font-ui text-[13px] text-[#6a665e]">
              <input type="checkbox" checked={datesFlexible}
                onChange={(e) => { setDatesFlexible(e.target.checked); if (e.target.checked) { setStartDate(""); setEndDate(""); } }}
                className="h-3.5 w-3.5 accent-ocean" />
              My dates are flexible
            </label>
            {carWeekFlag && (
              <div className="mt-3 rounded-lg border border-[#e8b876] bg-[#fdf3e2] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#6a5528]">
                Heads up: mid-August is Car Week — Bayonet and Black Horse close for several days and hotel rates spike. We&apos;ll still send options.
              </div>
            )}
          </div>
          <div className="sm:col-span-2">
            <Check checked={nonGolfer} onChange={setNonGolfer} label="Traveling with a non-golfing partner or family member?" />
          </div>
        </div>

        {/* ── 3. Golf ── */}
        <SectionHeader n={3} label="Golf" />
        <div className="border-b border-[#ede8da] pb-7">
          <p className="mb-3 font-body text-[13px] text-[#6a665e]">
            Select courses you&apos;re interested in — <span className="text-[#9a8a6e]">optional</span>
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {BOOKABLE_COURSES.map((c) => {
              const sel = selectedCourses.includes(c.slug);
              const pbc = PBC_SLUGS.has(c.slug);
              return (
                <button key={c.slug} type="button"
                  onClick={() => toggle(selectedCourses, setSelectedCourses, c.slug)}
                  className={[
                    "rounded-[10px] border text-left transition-colors overflow-hidden",
                    sel && pbc ? "border-[1.5px] border-[#b89a3a] bg-[#fdf9ed]" :
                    sel ? "border-[1.5px] border-ocean bg-[#f2f7fa]" :
                    pbc ? "border-[#d4b84a] bg-white hover:border-[#b89a3a]" :
                    "border-[#d8d2c2] bg-white hover:border-ocean",
                  ].join(" ")}
                >
                  {/* top color bar */}
                  <div className={[
                    "h-1",
                    sel && pbc ? "bg-[#b89a3a]" :
                    sel ? "bg-ocean" :
                    pbc ? "bg-[#d4b84a]" : "bg-[#d0dde3]",
                  ].join(" ")} />
                  <div className="p-2.5">
                    {/* name + check */}
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="font-ui text-[12px] font-semibold leading-snug text-ink">{c.name}</span>
                      <span className={[
                        "mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border",
                        sel && pbc ? "border-[#b89a3a] bg-[#b89a3a]" :
                        sel ? "border-ocean bg-ocean" : "border-[#d8d2c2] bg-white",
                      ].join(" ")}>
                        {sel && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                    </div>
                    {/* stat grid */}
                    {c.rating && c.slope && (
                      <div className="mb-2 grid grid-cols-3 divide-x divide-[#e3ddcf] border border-[#e3ddcf] rounded-md overflow-hidden">
                        <div className="px-2 py-1.5">
                          <div className="font-ui text-[12px] font-semibold text-ink">{c.par}</div>
                          <div className="font-ui text-[10px] text-[#9a8a6e]">Par</div>
                        </div>
                        <div className="px-2 py-1.5">
                          <div className="font-ui text-[11px] font-semibold text-ink">{c.yards.replace(" yds","")}</div>
                          <div className="font-ui text-[10px] text-[#9a8a6e]">Yards</div>
                        </div>
                        <div className="px-2 py-1.5">
                          <div className="font-ui text-[11px] font-semibold text-ink">{c.rating} / {c.slope}</div>
                          <div className="font-ui text-[10px] text-[#9a8a6e]">Rtg / Slope</div>
                        </div>
                      </div>
                    )}
                    {/* bottom row */}
                    <div className="flex items-center justify-between gap-1.5">
                      {c.walkable && (
                        <span className={[
                          "rounded-full px-2 py-0.5 font-ui text-[10px] font-semibold",
                          c.walkable === "walk" ? "bg-[#eaf4ee] text-[#1a6040]" :
                          c.walkable === "cart" ? "bg-[#fff3e0] text-[#7a4a0a]" :
                          "bg-[#fdecea] text-[#7a1a1a]",
                        ].join(" ")}>
                          {c.walkable === "walk" ? "Walking" : c.walkable === "cart" ? "Cart rec." : "Cart only"}
                        </span>
                      )}
                      {c.pace && <span className="font-ui text-[10px] text-[#9a8a6e]">{c.pace}</span>}
                      {c.difficulty && (
                        <span className={`rounded-full px-2 py-0.5 font-ui text-[10px] font-semibold ${DIFFICULTY_CLS[c.difficulty] ?? ""}`}>
                          {DIFFICULTY_LABEL[c.difficulty]}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {hasPBC && (
            <div className="mt-4 rounded-lg border border-[#e0c870] bg-[#fdf9ed] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#7a5a0a]">
              Pebble Beach Resorts® courses (Pebble Beach Golf Links®, Spyglass Hill®, Del Monte®) have green fees of $80–$595 per round depending on the course. Full pricing will be included in your custom quote.
            </div>
          )}
          {liveEstimate && (
            <div className="mt-3 rounded-lg border border-[#cfe0d8] bg-[#eef6f1] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#2f6b4f]">
              {liveEstimate.count} {liveEstimate.count === 1 ? "course" : "courses"} selected — green fees est.{" "}
              <span className="font-semibold">${liveEstimate.total.toLocaleString()} per player</span>
              {liveEstimate.missing > 0 ? " (some courses don't publish a rate)" : ""}. Golf only — lodging not included.
            </div>
          )}
        </div>

        {/* ── 4. Lodging ── */}
        <SectionHeader n={4} label="Lodging" />
        <div className="border-b border-[#ede8da] pb-7">
          <p className="mb-3 font-body text-[13px] text-[#6a665e]">
            Hotels you&apos;re interested in — <span className="text-[#9a8a6e]">optional</span>
          </p>
          <div className="flex flex-col gap-2">
            {HOTELS.map((h) => {
              const sel = selectedHotels.includes(h.slug);
              return (
                <button key={h.slug} type="button"
                  onClick={() => toggle(selectedHotels, setSelectedHotels, h.slug)}
                  className={[
                    "flex items-stretch overflow-hidden rounded-[10px] border text-left transition-colors",
                    sel ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                  ].join(" ")}
                >
                  <div className={`w-1 flex-shrink-0 ${sel ? "bg-ocean" : "bg-[#d0dde3]"}`} />
                  <div className="flex flex-1 items-center justify-between gap-3 px-3 py-2.5">
                    <div>
                      <div className="font-ui text-[13px] font-semibold text-ink">{h.name}</div>
                      {h.city && <div className="mt-0.5 font-body text-[11px] text-[#9a8a6e]">{h.city}</div>}
                    </div>
                    <span className={[
                      "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border",
                      sel ? "border-ocean bg-ocean" : "border-[#d8d2c2] bg-white",
                    ].join(" ")}>
                      {sel && <span className="block h-1.5 w-1.5 rounded-full bg-white" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-3 font-body text-[12px] text-[#8a857a]">
            Not sure yet? Leave this blank — we&apos;ll match lodging to whichever courses you play.
          </p>
        </div>

        {/* ── 5. Activities & Transport ── */}
        <SectionHeader n={5} label="Activities & transport" />
        <div className="space-y-5 border-b border-[#ede8da] pb-7">
          <div>
            <p className="mb-3 font-body text-[13px] text-[#6a665e]">Activities of interest — <span className="text-[#9a8a6e]">optional</span></p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ACTIVITIES.map((a) => {
                const sel = selectedActivities.includes(a);
                return (
                  <label key={a} className={[
                    "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-body text-[13px] transition-colors",
                    sel ? "border-ocean bg-[#f2f7fa] text-ocean" : "border-[#d8d2c2] bg-white text-[#4a463f] hover:border-ocean",
                  ].join(" ")}>
                    <input type="checkbox" checked={sel} onChange={() => toggle(selectedActivities, setSelectedActivities, a)} className="h-4 w-4 accent-ocean" />
                    {a}
                  </label>
                );
              })}
            </div>
          </div>
          <Field label="Transportation">
            <select value={transportNeeded} onChange={(e) => setTransportNeeded(e.target.value)} className={iCls}>
              {TRANSPORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {transportNeeded && (
              <p className="mt-2 font-body text-[12px] text-[#8a857a]">
                MRY is 10 min from most courses. SJC and SFO are 90–115 min drives if flying into the Bay Area.
              </p>
            )}
          </Field>
        </div>

        {/* ── 6. Almost Done ── */}
        <SectionHeader n={6} label="Almost done" />
        <div className="space-y-5">
          <Field label="Anything we should know about your group?">
            <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Special requests, anniversary trip, corporate event, handicaps, walking vs riding…"
              className={iCls} />
          </Field>
          <Field label="How did you hear about us?">
            <select value={referralSource} onChange={(e) => setReferralSource(e.target.value)}
              className={`${iCls} max-w-[400px]`}>
              <option value="">Select one…</option>
              {REFERRAL_SOURCES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {referralSource === "Other" && (
              <input type="text" placeholder="Please tell us where" value={referralOther}
                onChange={(e) => setReferralOther(e.target.value)}
                className={`mt-3 ${iCls} max-w-[400px]`} />
            )}
          </Field>
        </div>

        {status === "error" && (
          <p className="mt-4 font-ui text-sm text-[#a83232]">
            Something went wrong. Please try again or call us directly.
          </p>
        )}

        <button type="submit" disabled={status === "submitting"}
          className="mt-8 w-full rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark disabled:opacity-60 sm:w-auto">
          {status === "submitting" ? "Sending…" : "Get My Custom Quote →"}
        </button>
      </form>

      {/* ── Sticky summary sidebar (desktop only) ── */}
      <aside className="hidden lg:block">
        <div className="sticky top-8 rounded-2xl border border-[#e3ddcf] bg-white p-5 shadow-[0_4px_16px_rgba(37,35,33,.06)]">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-[#9a8a6e]">Your trip so far</p>
          <div className="space-y-0 divide-y divide-[#ede8da]">
            <SummaryRow label="Golfers" value={groupSize ? `${groupSize} golfers` : null} />
            <SummaryRow label="Dates" value={summaryDates} />
            <SummaryRow label="Nights" value={nights ? `${nights} nights` : null} />
            <div className="py-3">
              <p className="mb-1.5 font-ui text-[11px] text-[#9a8a6e]">Courses</p>
              {selectedCourses.length === 0 ? (
                <p className="font-body text-[12px] italic text-[#b4b2a9]">none selected</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourses.map((slug) => {
                    const c = COURSES.find((x) => x.slug === slug);
                    return c ? (
                      <span key={slug} className="rounded-full bg-[#eef4f7] px-2.5 py-0.5 font-ui text-[11px] text-ocean">
                        {c.name.replace("Golf Links®","GL®").replace("Golf Course®","GC®").replace(" Golf Club","").replace(" Golf Course","").replace(" Golf Ranch","")}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </div>
            <div className="py-3">
              <p className="mb-1.5 font-ui text-[11px] text-[#9a8a6e]">Lodging</p>
              {selectedHotels.length === 0 ? (
                <p className="font-body text-[12px] italic text-[#b4b2a9]">none selected</p>
              ) : (
                <div className="flex flex-col gap-1">
                  {selectedHotels.map((slug) => {
                    const h = HOTELS.find((x) => x.slug === slug);
                    return h ? <span key={slug} className="font-body text-[12px] text-ink">{h.name}</span> : null;
                  })}
                </div>
              )}
            </div>
            <SummaryRow label="Transport" value={transportNeeded ? TRANSPORT_OPTIONS.find((o) => o.value === transportNeeded)?.label ?? null : null} />
          </div>
          {liveEstimate && (
            <div className="mt-4 rounded-lg bg-ocean px-4 py-3 text-white">
              <p className="font-ui text-[11px] opacity-75">Green fees estimate</p>
              <p className="font-display text-[22px] font-bold">${liveEstimate.total.toLocaleString()}</p>
              <p className="font-ui text-[11px] opacity-70">per player · golf only</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const iCls = "w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean";

function SectionHeader({ n, label }: { n: number; label: string }) {
  return (
    <div className="mb-3 mt-8 flex items-center gap-3 first:mt-0">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean font-ui text-[11px] font-bold text-cream">
        {n}
      </div>
      <div className="font-ui text-[13px] font-bold uppercase tracking-[.08em] text-ink">{label}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">
        {label} {required && <span className="text-[#a83232]">*</span>}
      </label>
      {children}
    </div>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 font-body text-[14px] text-[#4a463f]">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-ocean flex-shrink-0" />
      {label}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="font-ui text-[11px] text-[#9a8a6e]">{label}</span>
      <span className={`font-ui text-[12px] text-right ${value ? "font-semibold text-ink" : "italic text-[#b4b2a9]"}`}>
        {value ?? "not set"}
      </span>
    </div>
  );
}
