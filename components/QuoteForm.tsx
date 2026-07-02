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

const GROUP_SIZES = ["2-4", "5-8", "9-12", "13-16", "17-20", "21-50", "50+"];
const BUDGET_RANGES = [
  "Under $1,000/person",
  "$1,000-$1,500/person",
  "$1,500-$2,000/person",
  "$2,000-$3,000/person",
  "$3,000+/person",
  "Not sure yet",
];
const TRIP_LENGTHS = ["3 days", "4 days", "5 days", "7 days", "Other / not sure yet"];

// The Links at Spanish Bay is closed for renovation until April 17, 2027 and
// must not be offered as a selectable option here.
const CLOSED_COURSE_SLUGS = new Set(["links-at-spanish-bay"]);
const BOOKABLE_COURSES = COURSES.filter((c) => !CLOSED_COURSE_SLUGS.has(c.slug));

const PREMIUM_COURSE_SLUGS = new Set([
  "pebble-beach-golf-links",
  "spyglass-hill",
  "links-at-spanish-bay",
]);

// Car Week / Concours d'Elegance runs mid-August — Bayonet and Black Horse
// close for several days and hotel rates spike. Same fact already disclosed
// elsewhere on the site (LocalIntel).
function isCarWeekDate(value: string) {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const month = d.getMonth(); // 0-indexed
  const day = d.getDate();
  return month === 7 && day >= 10 && day <= 20; // Aug 10-20, approximate window
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState(GROUP_SIZES[1]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [tripLength, setTripLength] = useState(TRIP_LENGTHS[1]);
  const [nonGolfer, setNonGolfer] = useState(false);

  // Read context from the referring page (course/hotel/trip slug in the URL)
  // once, up front, so a "Get a custom quote" click carries what the person
  // was actually looking at instead of always landing on an identical blank
  // form. Computed as lazy initial state rather than in an effect so it
  // doesn't trigger extra renders.
  const initialContext = useMemo(() => {
    const courseSlug = searchParams.get("course");
    const hotelSlug = searchParams.get("hotel");
    const tripSlug = searchParams.get("trip");

    if (courseSlug) {
      const course = COURSES.find((c) => c.slug === courseSlug);
      if (course) {
        return {
          courses: [courseSlug],
          message: "",
          budget: BUDGET_RANGES[0],
          note: `Noted — you're inquiring about ${course.name}.`,
        };
      }
    }

    if (hotelSlug) {
      const hotel = HOTELS.find((h) => h.slug === hotelSlug);
      if (hotel) {
        return {
          courses: [] as string[],
          message: `I'm interested in staying at ${hotel.name}.`,
          budget: BUDGET_RANGES[0],
          note: `Noted — you're inquiring about ${hotel.name}.`,
        };
      }
    }

    if (tripSlug) {
      const trip = ITINERARIES[tripSlug];
      if (trip) {
        const closest =
          BUDGET_RANGES.find((b) => {
            if (b === "Not sure yet") return false;
            const num = parseInt(b.replace(/[^0-9]/g, ""), 10);
            return trip.priceFrom <= num;
          }) ?? BUDGET_RANGES[0];
        return {
          courses: trip.courseSlugs,
          message: `I'm interested in the ${trip.title} itinerary.`,
          budget: closest,
          note: `Noted — you're inquiring about the ${trip.title} itinerary.`,
        };
      }
    }

    return { courses: [] as string[], message: "", budget: BUDGET_RANGES[0], note: null as string | null };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [budget, setBudget] = useState(initialContext.budget);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(initialContext.courses);
  const [message, setMessage] = useState(initialContext.message);
  const contextNote = initialContext.note;

  function toggleCourse(slug: string) {
    setSelectedCourses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  // Live compatibility hint: flag when a selected course's green fee alone
  // is likely to exceed a "budget" range the person has chosen.
  const compatibilityHint = useMemo(() => {
    if (budget !== "Under $1,000/person" && budget !== "$1,000-$1,500/person") return null;
    const premiumSelected = selectedCourses
      .filter((s) => PREMIUM_COURSE_SLUGS.has(s))
      .map((s) => COURSES.find((c) => c.slug === s)?.name)
      .filter(Boolean);
    if (premiumSelected.length === 0) return null;
    return `Heads up: ${premiumSelected.join(", ")} typically run $350\u2013$695 per round, which may exceed your selected budget across a multi-round trip. We'll still send options \u2014 just flagging it now so there are no surprises.`;
  }, [budget, selectedCourses]);

  // Live estimate: sum of green fees for the courses actually selected.
  // Golf only — lodging and transport are not included. Uses each course's
  // own verified priceEstimate; courses without a published rate are
  // excluded from the sum but noted.
  const liveEstimate = useMemo(() => {
    if (selectedCourses.length === 0) return null;
    let total = 0;
    let missing = 0;
    for (const slug of selectedCourses) {
      const est = COURSE_DETAILS[slug]?.priceEstimate;
      if (typeof est === "number") total += est;
      else missing += 1;
    }
    if (total === 0) return null;
    return { total, missing, count: selectedCourses.length };
  }, [selectedCourses]);

  const carWeekFlag = isCarWeekDate(startDate) || isCarWeekDate(endDate);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const travelDatesValue = datesFlexible
      ? "Flexible"
      : [startDate, endDate].filter(Boolean).join(" to ");

    const fullMessage = [message, nonGolfer ? "Group includes a non-golfing partner/family member." : null]
      .filter(Boolean)
      .join(" ");

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      group_size: groupSize,
      travel_dates: travelDatesValue || null,
      trip_length: tripLength,
      budget_per_person: budget,
      courses_interested: selectedCourses,
      non_golfer_in_group: nonGolfer,
      message: fullMessage || null,
    });

    if (error) {
      setStatus("error");
      return;
    }
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

      {/* Section: Your group */}
      <div className="mb-2 font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">
        Your group
      </div>
      <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          />
        </Field>
        <Field label="Phone (faster response with phone)">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          />
        </Field>
        <Field label="Group size" required>
          <select
            value={groupSize}
            onChange={(e) => setGroupSize(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          >
            {GROUP_SIZES.map((g) => (
              <option key={g} value={g}>
                {g} players
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#e3ddcf] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[14px] text-[#4a463f] hover:border-ocean">
            <input
              type="checkbox"
              checked={nonGolfer}
              onChange={(e) => setNonGolfer(e.target.checked)}
              className="h-4 w-4 accent-ocean"
            />
            Traveling with a non-golfing partner or family member?
          </label>
        </div>
      </div>

      {/* Section: Your trip */}
      <div className="mb-2 mt-7 font-ui text-[11px] font-bold uppercase tracking-[.1em] text-gold">
        Your trip
      </div>
      <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
        <Field label="Trip length" required>
          <select
            value={tripLength}
            onChange={(e) => setTripLength(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          >
            {TRIP_LENGTHS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget per person">
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          >
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">
            Travel dates
          </label>
          {!datesFlexible && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
                className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
              />
            </div>
          )}
          <label className="mt-2.5 flex cursor-pointer items-center gap-2 font-ui text-[13px] text-[#6a665e]">
            <input
              type="checkbox"
              checked={datesFlexible}
              onChange={(e) => {
                setDatesFlexible(e.target.checked);
                if (e.target.checked) {
                  setStartDate("");
                  setEndDate("");
                }
              }}
              className="h-3.5 w-3.5 accent-ocean"
            />
            My dates are flexible
          </label>

          {carWeekFlag && (
            <div className="mt-3 rounded-lg border border-[#e8b876] bg-[#fdf3e2] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#6a5528]">
              Heads up: mid-August is Car Week and the Concours d&apos;Elegance —
              Bayonet and Black Horse close for several days and hotel rates spike
              well above normal that week. We&apos;ll still send options, but wanted
              you to know before booking.
            </div>
          )}
        </div>
      </div>

      {compatibilityHint && (
        <div className="mt-5 rounded-lg border border-[#e8cfa0] bg-[#fdf3e2] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#6a5528]">
          {compatibilityHint}
        </div>
      )}

      <div className="mt-6">
        <label className="mb-2 block font-ui text-[13px] font-semibold text-ink">
          Courses you&apos;re interested in (optional)
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {BOOKABLE_COURSES.map((c) => (
            <label
              key={c.slug}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e3ddcf] bg-[#faf8f2] px-3 py-2 font-body text-[13px] text-[#4a463f] hover:border-ocean"
            >
              <input
                type="checkbox"
                checked={selectedCourses.includes(c.slug)}
                onChange={() => toggleCourse(c.slug)}
                className="h-4 w-4 accent-ocean"
              />
              {c.name}
            </label>
          ))}
        </div>

        {liveEstimate && (
          <div className="mt-4 rounded-lg border border-[#cfe0d8] bg-[#eef6f1] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#2f6b4f]">
            Your selected {liveEstimate.count === 1 ? "course adds" : `${liveEstimate.count} courses add`} up
            to about{" "}
            <span className="font-display text-base font-bold">
              ${liveEstimate.total.toLocaleString()}
            </span>{" "}
            per player in green fees{liveEstimate.missing > 0 ? " (some selected courses don't publish a rate and aren't included in this figure)" : ""}
            . This is golf only — lodging and transport aren&apos;t included yet.
          </div>
        )}
      </div>

      <div className="mt-6">
        <Field label="Anything we should know about your group? (optional)">
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 font-ui text-sm text-[#a83232]">
          Something went wrong submitting your request. Please try again, or call us
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 w-full rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send my quote request"}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">
        {label} {required && <span className="text-[#a83232]">*</span>}
      </label>
      {children}
    </div>
  );
}
