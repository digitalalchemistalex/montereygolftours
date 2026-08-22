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

// The Links at Spanish Bay® is closed for renovation until April 17, 2027.
const CLOSED_COURSE_SLUGS = new Set(["links-at-spanish-bay"]);
const BOOKABLE_COURSES = COURSES.filter((c) => !CLOSED_COURSE_SLUGS.has(c.slug));

const PREMIUM_COURSE_SLUGS = new Set([
  "pebble-beach-golf-links",
  "spyglass-hill",
  "links-at-spanish-bay",
]);

function isCarWeekDate(value: string) {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  return d.getMonth() === 7 && d.getDate() >= 10 && d.getDate() <= 20;
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // 1. Contact Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [okToCall, setOkToCall] = useState(false);
  const [okToText, setOkToText] = useState(false);
  const [returningCustomer, setReturningCustomer] = useState(false);

  // 2. Trip Details
  const [groupSize, setGroupSize] = useState("8");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [nonGolfer, setNonGolfer] = useState(false);

  // 3–4. Golf & Lodging
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // 5. Services
  const [transportNeeded, setTransportNeeded] = useState("");

  // 6. Almost Done
  const [referralSource, setReferralSource] = useState("");
  const [referralOther, setReferralOther] = useState("");
  const [message, setMessage] = useState("");

  const initialContext = useMemo(() => {
    const courseSlug = searchParams.get("course");
    const hotelSlug = searchParams.get("hotel");
    const tripSlug = searchParams.get("trip");

    if (courseSlug) {
      const course = COURSES.find((c) => c.slug === courseSlug);
      if (course) return { courses: [courseSlug], contextNote: `Noted — you're inquiring about ${course.name}.` };
    }
    if (hotelSlug) {
      const hotel = HOTELS.find((h) => h.slug === hotelSlug);
      if (hotel) return { courses: [] as string[], contextNote: `Noted — you're inquiring about ${hotel.name}.` };
    }
    if (tripSlug) {
      const trip = ITINERARIES[tripSlug];
      if (trip) return { courses: trip.courseSlugs, contextNote: `Noted — you're inquiring about the ${trip.title} itinerary.` };
    }
    return { courses: [] as string[], contextNote: null as string | null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedCourses, setSelectedCourses] = useState<string[]>(initialContext.courses);
  const { contextNote } = initialContext;

  function toggleCourse(slug: string) {
    setSelectedCourses((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  }
  function toggleHotel(slug: string) {
    setSelectedHotels((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]);
  }
  function toggleActivity(a: string) {
    setSelectedActivities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  // Live green-fee estimate when courses are selected
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

  // PBC premium-course notice (no budget field — just flag the courses)
  const premiumNotice = useMemo(() => {
    const premium = selectedCourses
      .filter((s) => PREMIUM_COURSE_SLUGS.has(s))
      .map((s) => COURSES.find((c) => c.slug === s)?.name)
      .filter(Boolean);
    if (premium.length === 0) return null;
    return `${premium.join(" and ")} ${premium.length === 1 ? "is" : "are"} Pebble Beach Resorts® — green fees run $350–$695 per round. We'll include full pricing in your custom quote.`;
  }, [selectedCourses]);

  const carWeekFlag = isCarWeekDate(startDate) || isCarWeekDate(endDate);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const travelDates = datesFlexible
      ? "Flexible"
      : [startDate, endDate].filter(Boolean).join(" to ");

    const fullMessage = [
      message,
      nonGolfer ? "Group includes a non-golfing partner or family member." : null,
    ].filter(Boolean).join(" ");

    const payload = {
      name,
      email,
      phone: phone || null,
      group_size: groupSize,
      nights: nights || null,
      travel_dates: travelDates || null,
      courses_interested: selectedCourses,
      hotels_interested: selectedHotels,
      activities_interested: selectedActivities,
      transport_needed: transportNeeded || null,
      ok_to_call: okToCall,
      ok_to_text: okToText,
      returning_customer: returningCustomer,
      non_golfer_in_group: nonGolfer,
      referral_source: referralSource === "Other" && referralOther ? `Other: ${referralOther}` : referralSource || null,
      message: fullMessage || null,
    };

    const { error } = await supabase.from("leads").insert({
      ...payload,
      raw_payload: payload,
    });

    if (error) { setStatus("error"); return; }

    fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#e3ddcf] bg-white p-8 text-center md:p-10">
        <div className="font-display text-2xl font-bold text-ink md:text-[28px]">
          Got it — thank you, {name.split(" ")[0]}.
        </div>
        <p className="mx-auto mt-3 max-w-[480px] font-body text-[15px] leading-relaxed text-[#5a564e]">
          We&apos;ll have a custom quote to you within 24 hours. In the meantime, our most
          popular starting point is the 4-day Classic Peninsula trip.
        </p>
        <Link
          href="/itineraries/4-day-monterey-peninsula-golf-trip/"
          className="mt-6 inline-block rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark"
        >
          See the 4-day sample itinerary &rarr;
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_8px_28px_rgba(37,35,33,.08)] md:p-10"
    >
      {contextNote && (
        <Reveal>
          <div className="mb-6 rounded-lg border border-[#cfe0d8] bg-[#eef6f1] px-4 py-3 font-ui text-[13px] text-[#2f6b4f]">
            {contextNote}
          </div>
        </Reveal>
      )}

      {/* ── 1. Contact Info ── */}
      <SectionHeader n={1} label="Contact Info" />
      <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
        <Field label="First name" required>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className={inputCls} placeholder="e.g. John" />
        </Field>
        <Field label="Email" required>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className={inputCls} />
        </Field>
        <Field label="Mobile">
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className={inputCls} placeholder="+1 (555) 000-0000" />
        </Field>
        <div className="flex flex-col justify-end gap-2">
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
            Contact preferences
          </p>
          <label className={checkRowCls}>
            <input type="checkbox" checked={okToCall} onChange={(e) => setOkToCall(e.target.checked)} className={checkCls} />
            You may call me to discuss my quote
          </label>
          <label className={checkRowCls}>
            <input type="checkbox" checked={okToText} onChange={(e) => setOkToText(e.target.checked)} className={checkCls} />
            You may text me with questions about my trip
          </label>
        </div>
        <div className="sm:col-span-2">
          <label className={checkRowCls}>
            <input type="checkbox" checked={returningCustomer} onChange={(e) => setReturningCustomer(e.target.checked)} className={checkCls} />
            I&apos;ve booked with Monterey Golf Tours before
          </label>
        </div>
      </div>

      {/* ── 2. Trip Details ── */}
      <SectionHeader n={2} label="Trip Details — Golf & Lodging" />
      <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
        <Field label="Number of golfers" required>
          <input type="number" min="2" max="400" required value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            placeholder="e.g. 12" className={inputCls} />
        </Field>
        <Field label="Nights">
          <input type="number" min="1" max="30" value={nights}
            onChange={(e) => setNights(e.target.value)}
            placeholder="e.g. 4" className={inputCls} />
        </Field>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">
            Travel dates
          </label>
          {!datesFlexible && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Arrival</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Departure</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined} className={inputCls} />
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
              Heads up: mid-August is Car Week and the Concours d&apos;Elegance —
              Bayonet and Black Horse close for several days and hotel rates spike that week.
              We&apos;ll still send options, but wanted you to know before booking.
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className={checkRowCls}>
            <input type="checkbox" checked={nonGolfer} onChange={(e) => setNonGolfer(e.target.checked)} className={checkCls} />
            Traveling with a non-golfing partner or family member?
          </label>
        </div>
      </div>

      {/* ── 3. Golf ── */}
      <SectionHeader n={3} label="Golf" />
      <div className="border-b border-[#ede8da] pb-7">
        <label className="mb-2 block font-ui text-[13px] font-semibold text-ink">
          Courses you&apos;re interested in <span className="font-normal text-[#8a857a]">(optional — select one or more)</span>
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKABLE_COURSES.map((c) => (
            <label key={c.slug}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e3ddcf] bg-[#faf8f2] px-3 py-2 font-body text-[13px] text-[#4a463f] hover:border-ocean">
              <input type="checkbox" checked={selectedCourses.includes(c.slug)}
                onChange={() => toggleCourse(c.slug)} className={checkCls} />
              {c.name}
            </label>
          ))}
        </div>
        {premiumNotice && (
          <div className="mt-4 rounded-lg border border-[#e8d9a0] bg-[#fdf8e8] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#6a5528]">
            {premiumNotice}
          </div>
        )}
        {liveEstimate && (
          <div className="mt-3 rounded-lg border border-[#cfe0d8] bg-[#eef6f1] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#2f6b4f]">
            Your selected {liveEstimate.count === 1 ? "course adds" : `${liveEstimate.count} courses add`} up
            to about{" "}
            <span className="font-display text-base font-bold">${liveEstimate.total.toLocaleString()}</span>
            {" "}per player in green fees{liveEstimate.missing > 0 ? " (some courses don't publish a rate and aren't included)" : ""}.
            Golf only — lodging and transport not included.
          </div>
        )}
      </div>

      {/* ── 4. Lodging ── */}
      <SectionHeader n={4} label="Lodging" />
      <div className="border-b border-[#ede8da] pb-7">
        <label className="mb-2 block font-ui text-[13px] font-semibold text-ink">
          Hotels you&apos;re interested in <span className="font-normal text-[#8a857a]">(optional)</span>
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {HOTELS.map((h) => (
            <label key={h.slug}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e3ddcf] bg-[#faf8f2] px-3 py-2 font-body text-[13px] text-[#4a463f] hover:border-ocean">
              <input type="checkbox" checked={selectedHotels.includes(h.slug)}
                onChange={() => toggleHotel(h.slug)} className={checkCls} />
              {h.name}
            </label>
          ))}
        </div>
        <p className="mt-2.5 font-body text-[12px] text-[#8a857a]">
          Not sure yet? Leave this blank — we&apos;ll match lodging to whichever courses you play.
        </p>
      </div>

      {/* ── 5. Dining, Activities & Transport ── */}
      <SectionHeader n={5} label="Dining, Activities & Transport" />
      <div className="border-b border-[#ede8da] pb-7 space-y-5">
        <div>
          <label className="mb-2 block font-ui text-[13px] font-semibold text-ink">
            Activities of interest <span className="font-normal text-[#8a857a]">(optional)</span>
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ACTIVITIES.map((a) => (
              <label key={a}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e3ddcf] bg-[#faf8f2] px-3 py-2 font-body text-[13px] text-[#4a463f] hover:border-ocean">
                <input type="checkbox" checked={selectedActivities.includes(a)}
                  onChange={() => toggleActivity(a)} className={checkCls} />
                {a}
              </label>
            ))}
          </div>
        </div>
        <Field label="Transportation">
          <select value={transportNeeded} onChange={(e) => setTransportNeeded(e.target.value)} className={inputCls}>
            {TRANSPORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {transportNeeded && (
            <p className="mt-2 font-body text-[12px] text-[#8a857a]">
              MRY is 10 min from most courses. SJC and SFO are 90–115 min drives if flying into the Bay Area instead.
            </p>
          )}
        </Field>
      </div>

      {/* ── 6. Almost Done ── */}
      <SectionHeader n={6} label="Almost Done" />
      <div className="space-y-5">
        <Field label="Anything we should know about your group?">
          <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Special requests, anniversary trip, corporate event, handicaps, walking vs riding…"
            className={inputCls} />
        </Field>
        <Field label="How did you hear about us?">
          <select value={referralSource} onChange={(e) => setReferralSource(e.target.value)}
            className={`${inputCls} max-w-[400px]`}>
            <option value="">Select one…</option>
            {REFERRAL_SOURCES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {referralSource === "Other" && (
            <input type="text" placeholder="Please tell us where" value={referralOther}
              onChange={(e) => setReferralOther(e.target.value)}
              className={`mt-3 ${inputCls} max-w-[400px]`} />
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
  );
}

const inputCls = "w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean";
const checkCls = "h-4 w-4 accent-ocean flex-shrink-0";
const checkRowCls = "flex cursor-pointer items-center gap-2.5 font-body text-[14px] text-[#4a463f]";

function SectionHeader({ n, label }: { n: number; label: string }) {
  return (
    <div className="mb-3 mt-8 flex items-center gap-3 first:mt-0">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean font-ui text-[11px] font-bold text-cream">
        {n}
      </div>
      <div className="font-ui text-[13px] font-bold uppercase tracking-[.08em] text-ink">
        {label}
      </div>
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
