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

const CORPORATE_NEEDS = [
  "F&B / group dining",
  "AV / presentation setup",
  "Branded materials",
  "Team building activities",
  "Prizes / gifts",
  "Meeting space",
  "Photography / video",
  "Ground transport",
];

const CORPORATE_EVENT_TYPES = [
  "Client entertainment",
  "Team building",
  "Sales kickoff",
  "Retreat / offsite",
  "Incentive trip",
  "Other",
];

const TEE_TIME_OPTIONS = [
  { value: "early_bird", label: "Early bird", sub: "Before 8:00 am" },
  { value: "morning",    label: "Morning",    sub: "8:00 – 10:00 am" },
  { value: "mid_day",    label: "Mid-day",    sub: "10:00 am – 12:00 pm" },
  { value: "afternoon",  label: "Afternoon",  sub: "12:00 pm onwards" },
] as const;

const ROOM_CONFIG_OPTIONS = [
  {
    value: "king_single",
    label: "King — own room",
    sub: "1 golfer per room, king bed. Full privacy.",
    badge: null,
  },
  {
    value: "two_queens",
    label: "Two queens / doubles",
    sub: "2 golfers sharing, two beds. Most common for golf groups.",
    badge: null,
  },
  {
    value: "suite_shared",
    label: "Suite — shared",
    sub: "2 golfers in one suite. Separate bedroom + living room. Embassy Suites, CVR, Quail.",
    badge: "All-suite hotels",
  },
  {
    value: "villa_cottage",
    label: "Villa / cottage",
    sub: "4–6 golfers in a private villa or cottage. CVR, Bernardus, Lodge Cottages at Pebble Beach.",
    badge: "Small group",
  },
  {
    value: "exclusive_buyout",
    label: "Full estate / exclusive use",
    sub: "Entire property for your group only. Casa Palmero (24 rooms) or CVR cottages.",
    badge: "Private buyout",
  },
  {
    value: "no_preference",
    label: "No preference",
    sub: "We'll advise based on group size and budget.",
    badge: null,
  },
] as const;

const CADDIE_OPTIONS = [
  { value: "caddie",   label: "Caddies",       sub: "Where available — recommended for PBC courses" },
  { value: "cart",     label: "Cart only",      sub: "Motorised cart included" },
  { value: "walking",  label: "Walking",        sub: "No cart or caddie" },
  { value: "flexible", label: "Flexible",       sub: "We'll advise per course" },
] as const;

const BUDGET_TIER_OPTIONS = [
  { value: "value",     label: "Focused on value",     sub: "Pacific Grove, Laguna Seca, Del Monte tier" },
  { value: "mid",       label: "Mid-range",             sub: "Bayonet, CVR, Quail Lodge tier" },
  { value: "premium",   label: "Premium",               sub: "Pebble Beach®, Spyglass®, lodge stays" },
  { value: "no_limit",  label: "No limit",              sub: "Build the best possible trip" },
] as const;

const AIRPORT_OPTIONS = [
  { value: "MRY", label: "MRY — Monterey Regional",   sub: "10 min from most courses" },
  { value: "SJC", label: "SJC — San Jose",             sub: "~90 min drive" },
  { value: "SFO", label: "SFO — San Francisco",        sub: "~115 min drive" },
  { value: "own", label: "Own transport",              sub: "Driving or private travel" },
] as const;

const GAME_LEVELS = [
  {
    val: "low",
    title: "Single figures",
    sub: "Competitive, play regularly, score matters",
    hcp: "Handicap 0–9",
    hcpCls: "bg-[#eef4f7] text-[#1a4a5c]",
    intel: "The peninsula will give you a proper game",
    body: "Pebble Beach plays slope 145, Spyglass at 148 — both will expose any weakness in your iron game. Bayonet's Combat Corner on the back nine has humbled tour players. We'll build an itinerary that tests you round after round, not just ticks boxes.",
    courses: [
      { name: "Pebble Beach® — slope 145", style: "primary" },
      { name: "Spyglass Hill® — slope 148", style: "primary" },
      { name: "Bayonet — slope 141", style: "primary" },
      { name: "TPC Pasadera", style: "secondary" },
      { name: "Pasatiempo", style: "secondary" },
    ],
    pbcWarn: false,
  },
  {
    val: "mid",
    title: "Club golfer",
    sub: "Solid game, play most weeks, enjoy the challenge",
    hcp: "Handicap 10–20",
    hcpCls: "bg-[#eaf4ee] text-[#1a6040]",
    intel: "The full peninsula is open to you",
    body: "Most club golfers play Pebble in the high 80s to mid 90s — that's completely normal, and the views make every bogey forgettable. Bayonet's slope of 141 will test your ball-striking. Carmel Valley Ranch rewards course management over power. We'll build a mix that plays to your strengths.",
    courses: [
      { name: "Pebble Beach®", style: "primary" },
      { name: "Bayonet", style: "primary" },
      { name: "Carmel Valley Ranch", style: "primary" },
      { name: "Spyglass Hill®", style: "secondary" },
      { name: "Quail Lodge", style: "secondary" },
    ],
    pbcWarn: false,
  },
  {
    val: "high",
    title: "Social golfer",
    sub: "Play regularly, focus on the experience over score",
    hcp: "Handicap 21–28",
    hcpCls: "bg-[#fdf8ee] text-[#7a5a0a]",
    intel: "Monterey has the right courses for your game",
    body: "Carmel Valley Ranch (slope 130) and Quail Lodge (slope 128) are where you'll play your best golf on the peninsula — demanding enough to be interesting, fair enough to score on. Black Horse gives you Monterey Bay views without Bayonet's brutality. Pebble is on the table if the bucket-list round matters more than the scorecard — we'll tell you exactly what to expect.",
    courses: [
      { name: "Carmel Valley Ranch", style: "primary" },
      { name: "Quail Lodge", style: "primary" },
      { name: "Black Horse", style: "primary" },
      { name: "Pacific Grove Golf Links", style: "secondary" },
      { name: "Pebble Beach® — bucket list, not a scoring round", style: "note" },
    ],
    pbcWarn: false,
  },
  {
    val: "casual",
    title: "Casual / occasional",
    sub: "Get out a few times a year, here for the experience",
    hcp: "Handicap 28+",
    hcpCls: "bg-[#f5f0fa] text-[#4a2a7a]",
    intel: "Monterey has brilliant golf at every level",
    body: "Pacific Grove's back nine runs along the same coastline as Pebble Beach at a fraction of the price and the pressure. Del Monte is California's oldest course in continuous play — flat, walkable, and genuinely fun. Laguna Seca was designed by the Jones father-son duo and punches well above its green fee. Proper courses with real character.",
    courses: [
      { name: "Pacific Grove Golf Links", style: "primary" },
      { name: "Del Monte®", style: "primary" },
      { name: "Laguna Seca", style: "primary" },
      { name: "Quail Lodge", style: "secondary" },
      { name: "Pebble Beach® — the experience is worth it once", style: "note" },
    ],
    pbcWarn: true,
  },
] as const;

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
  const [groupName, setGroupName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [okToCall, setOkToCall] = useState(false);
  const [okToText, setOkToText] = useState(false);
  const [contactPrefError, setContactPrefError] = useState(false);
  const [coursesError, setCoursesError] = useState(false);
  const [returningCustomer, setReturningCustomer] = useState(false);
  const [roundsError, setRoundsError] = useState(false);
  const [teeTime1Error, setTeeTime1Error] = useState(false);
  const [roomConfigError, setRoomConfigError] = useState(false);
  const [caddieError, setCaddieError] = useState(false);
  const [budgetTierError, setBudgetTierError] = useState(false);
  const [airportError, setAirportError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [nightsError, setNightsError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [nonGolferCountError, setNonGolferCountError] = useState(false);
  const [corpAttendeesError, setCorpAttendeesError] = useState(false);
  const [corpEventTypeError, setCorpEventTypeError] = useState(false);

  // Game level
  const [gameLevel, setGameLevel] = useState<"low"|"mid"|"high"|"casual"|"">("");
  const [gameLevelError, setGameLevelError] = useState(false);
  const selectedLevel = GAME_LEVELS.find((g) => g.val === gameLevel) ?? null;

  // Trip type selector
  const [tripType, setTripType] = useState<"golf" | "stay" | "full" | "corp" | "">("");
  const [tripTypeError, setTripTypeError] = useState(false);
  const showLodging = tripType === "stay" || tripType === "full" || tripType === "corp";
  const showActivities = tripType === "full" || tripType === "corp";
  const showCorporate = tripType === "corp";

  // Corporate fields — cleared when switching away from corp
  const [corpAttendees, setCorpAttendees] = useState("");
  const [corpEventType, setCorpEventType] = useState("");
  const [corpNeeds, setCorpNeeds] = useState<string[]>([]);

  const handleTripType = (t: typeof tripType) => {
    if (tripType === "corp" && t !== "corp") {
      setCorpAttendees("");
      setCorpEventType("");
      setCorpNeeds([]);
    }
    setTripType(t);
    setTripTypeError(false);
  };

  // Section 2 — Trip details
  const [groupSize, setGroupSize] = useState("");
  const [nights, setNights] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesFlexible, setDatesFlexible] = useState(false);
  const [nonGolfer, setNonGolfer] = useState(false);
  const [nonGolferCount, setNonGolferCount] = useState("1");

  // Sections 3–5
  const [hotelPickForMe, setHotelPickForMe] = useState(false);
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

  const toggleCourse = (slug: string) => {
    toggle(selectedCourses, setSelectedCourses, slug);
    setCoursesError(false);
  };

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

  // Warn if PBC courses selected and arrival is less than 30 days out
  const pbcLeadTimeWarning = useMemo(() => {
    if (!hasPBC || !startDate) return false;
    const diff = Math.round((new Date(startDate).getTime() - Date.now()) / 86400000);
    return diff < 30;
  }, [hasPBC, startDate]);
  // 21-day minimum lead time
  const minArrival = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 21);
    return d.toISOString().split("T")[0];
  }, []);

  // Auto-calculate nights from arrival + departure
  const autoNights = useMemo(() => {
    if (!startDate || !endDate) return null;
    const diff = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000);
    return diff > 0 ? String(diff) : null;
  }, [startDate, endDate]);

  // Sync autoNights → nights field (only when dates are set and nights is empty or was auto-set)
  const [nightsAutoSet, setNightsAutoSet] = useState(false);

  // New enrichment fields
  const [roundsPerGolfer, setRoundsPerGolfer] = useState("");
  const [roundsAutoSet, setRoundsAutoSet] = useState(false);
  const [teeTimePref1, setTeeTimePref1] = useState("");
  const [teeTimePref2, setTeeTimePref2] = useState("");
  const [roomConfig, setRoomConfig] = useState("");
  const [caddieOption, setCaddieOption] = useState("");
  const [budgetTier, setBudgetTier] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  // Auto-calc rounds from nights (1 round per day default), allow override
  useMemo(() => {
    const n = parseInt(nights, 10);
    if (n > 0 && !roundsAutoSet) {
      setRoundsPerGolfer(String(n));
      setRoundsAutoSet(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nights]);

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
    let hasError = false;
    if (!gameLevel) { setGameLevelError(true); hasError = true; } else setGameLevelError(false);
    if (!tripType) { setTripTypeError(true); hasError = true; } else setTripTypeError(false);
    if (!okToCall && !okToText) { setContactPrefError(true); hasError = true; } else setContactPrefError(false);
    if (!phone.trim()) { setPhoneError(true); hasError = true; } else setPhoneError(false);
    if (!datesFlexible && !startDate) { setStartDateError(true); hasError = true; } else setStartDateError(false);
    if (datesFlexible && !nights) { setNightsError(true); hasError = true; } else setNightsError(false);
    if (nonGolfer && !nonGolferCount) { setNonGolferCountError(true); hasError = true; } else setNonGolferCountError(false);
    if (selectedCourses.length === 0) { setCoursesError(true); hasError = true; } else setCoursesError(false);
    if (!roundsPerGolfer) { setRoundsError(true); hasError = true; } else setRoundsError(false);
    if (!teeTimePref1) { setTeeTime1Error(true); hasError = true; } else setTeeTime1Error(false);
    if (!caddieOption) { setCaddieError(true); hasError = true; } else setCaddieError(false);
    if (showLodging && !roomConfig) { setRoomConfigError(true); hasError = true; } else setRoomConfigError(false);
    if (!budgetTier) { setBudgetTierError(true); hasError = true; } else setBudgetTierError(false);
    if ((transportNeeded === "airport" || transportNeeded === "both") && !arrivalAirport) { setAirportError(true); hasError = true; } else setAirportError(false);
    if (showCorporate && !corpAttendees) { setCorpAttendeesError(true); hasError = true; } else setCorpAttendeesError(false);
    if (showCorporate && !corpEventType) { setCorpEventTypeError(true); hasError = true; } else setCorpEventTypeError(false);
    if (hasError) return;
    setStatus("submitting");
    const travelDates = datesFlexible ? "Flexible" : [startDate, endDate].filter(Boolean).join(" to ");
    const fullMessage = [message, nonGolfer ? "Group includes a non-golfing partner or family member." : null]
      .filter(Boolean).join(" ");
    const payload = {
      name, group_name: groupName || null, email, phone: phone || null, group_size: groupSize,
      game_level: gameLevel || null,
      trip_type: tripType || null,
      corp_attendees: showCorporate ? corpAttendees || null : null,
      corp_event_type: showCorporate ? corpEventType || null : null,
      corp_needs: showCorporate && corpNeeds.length > 0 ? corpNeeds : null,
      nights: nights || null, travel_dates: travelDates || null,
      courses_interested: selectedCourses, hotels_interested: hotelPickForMe ? [] : selectedHotels,
      hotel_pick_for_me: hotelPickForMe,
      activities_interested: selectedActivities, transport_needed: transportNeeded || null,
      ok_to_call: okToCall, ok_to_text: okToText, returning_customer: returningCustomer,
      non_golfer_in_group: nonGolfer,
      non_golfer_count: nonGolfer ? nonGolferCount : null,
      referral_source: referralSource === "Other" && referralOther ? `Other: ${referralOther}` : referralSource || null,
      message: fullMessage || null,
      rounds_per_golfer: roundsPerGolfer || null,
      tee_time_pref_1: teeTimePref1 || null,
      tee_time_pref_2: teeTimePref2 || null,
      room_config: roomConfig || null,
      caddie_option: caddieOption || null,
      budget_tier: budgetTier || null,
      arrival_airport: arrivalAirport || null,
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
    <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10" style={{alignItems:"start"}}>
      {/* ── Main form ── */}
      <form onSubmit={handleSubmit}
        className="rounded-2xl border border-[#e3ddcf] bg-white p-6 shadow-[0_8px_28px_rgba(37,35,33,.08)] md:p-8 lg:p-10">

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
          <div>
            <label className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
              Group Name <span className="normal-case font-normal tracking-normal text-[#9a8a6e]">(if you have one)</span>
            </label>
            <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g. The Hackers" className={`mt-1 ${iCls}`} />
          </div>
          <Field label="Email" required>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={iCls} />
          </Field>
          <Field label="Mobile" required>
            <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); if (e.target.value.trim()) setPhoneError(false); }}
              placeholder="+1 (555) 000-0000" className={`${iCls} ${phoneError ? "border-[#a83232]" : ""}`} />
            {phoneError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Required if we may call you.</p>}
          </Field>
          <div className="flex flex-col justify-end gap-2">
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#8a857a]">
              Contact preferences <span className="text-[#a83232]">*</span>
              <span className="ml-1 normal-case text-[#9a8a6e] tracking-normal font-normal">select at least one</span>
            </p>
            <Check checked={okToCall} onChange={(v) => { setOkToCall(v); if (v) setContactPrefError(false); }} label="You may call me to discuss my quote" />
            <Check checked={okToText} onChange={(v) => { setOkToText(v); if (v) setContactPrefError(false); }} label="You may text me with questions" />
            {contactPrefError && (
              <p className="font-ui text-[12px] text-[#a83232]">Please select at least one contact method.</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Check checked={returningCustomer} onChange={setReturningCustomer} label="I've booked with Monterey Golf Tours before" />
          </div>
        </div>

        {/* ── Game level selector ── */}
        <div className="mb-2 mt-8">
          <div className="mb-3 flex items-center gap-2">
            <p className="font-ui text-[13px] font-bold uppercase tracking-[.08em] text-ink">
              How would you describe your game? <span className="text-[#a83232]">*</span>
            </p>
            {gameLevelError && <p className="font-ui text-[12px] text-[#a83232]">Please select one.</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {GAME_LEVELS.map((g) => (
              <button key={g.val} type="button"
                onClick={() => { setGameLevel(g.val); setGameLevelError(false); }}
                className={[
                  "rounded-[10px] border p-3 text-left transition-colors",
                  gameLevel === g.val
                    ? "border-[1.5px] border-ocean bg-[#f2f7fa]"
                    : "border-[#d8d2c2] bg-white hover:border-ocean",
                ].join(" ")}
              >
                <div className="font-ui text-[13px] font-semibold text-ink">{g.title}</div>
                <div className="mt-0.5 font-body text-[12px] text-[#8a857a]">{g.sub}</div>
                <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 font-ui text-[10px] font-semibold ${g.hcpCls}`}>
                  {g.hcp}
                </span>
              </button>
            ))}
          </div>

          {selectedLevel && (
            <div className={[
              "mt-4 rounded-xl border p-4 font-body text-[13px] leading-relaxed",
              gameLevel === "low" ? "border-[#b0cfd8] bg-[#eef4f7] text-[#1a3a4c]" :
              gameLevel === "mid" ? "border-[#9fd8b0] bg-[#eaf4ee] text-[#1a4030]" :
              gameLevel === "high" ? "border-[#dfc878] bg-[#fdf8ee] text-[#5a3a0a]" :
              "border-[#c8b0e0] bg-[#f5f0fa] text-[#3a1a5a]",
            ].join(" ")}>
              <p className="mb-1 font-ui text-[13px] font-semibold">{selectedLevel.intel}</p>
              <p>{selectedLevel.body}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedLevel.courses.map((c) => (
                  <span key={c.name} className={[
                    "rounded-full px-2.5 py-0.5 font-ui text-[11px] font-semibold",
                    c.style === "primary" ? "bg-[#1a4a5c] text-white" :
                    c.style === "secondary" ? "bg-[#eef4f7] text-[#1a4a5c]" :
                    "bg-[#fff3e0] text-[#7a4a0a]",
                  ].join(" ")}>{c.name}</span>
                ))}
              </div>
              {selectedLevel.pbcWarn && (
                <div className="mt-3 rounded-lg border border-[#f0a0a0] bg-[#fdecea] px-3 py-2.5 font-ui text-[12px] leading-relaxed text-[#6a1a1a]">
                  <strong>Note on Pebble Beach Golf Links®:</strong> At slope 145, it's one of the hardest rated courses in the country and the green fee runs $595 per round. We'll absolutely include it if it's on your list — just want to set honest expectations so the trip exceeds them.
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Trip type selector ── */}
        <div className="mb-2 mt-8">
          <div className="mb-3 flex items-center gap-2">
            <p className="font-ui text-[13px] font-bold uppercase tracking-[.08em] text-ink">
              What are you planning? <span className="text-[#a83232]">*</span>
            </p>
            {tripTypeError && <p className="font-ui text-[12px] text-[#a83232]">Please select one.</p>}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {([
              { val: "golf", icon: "ti-golf", title: "Golf only", sub: "Tee times, no lodging needed" },
              { val: "stay", icon: "ti-building", title: "Golf + Stay", sub: "Courses and hotel together" },
              { val: "full", icon: "ti-stars", title: "Full experience", sub: "Golf, hotel, dining and activities" },
              { val: "corp", icon: "ti-briefcase", title: "Corporate / group event", sub: "Team outing, client event, or retreat" },
            ] as const).map(({ val, icon, title, sub }) => (
              <button key={val} type="button" onClick={() => handleTripType(val)}
                className={[
                  "rounded-[10px] border p-3 text-left transition-colors",
                  tripType === val && val === "corp"
                    ? "border-[1.5px] border-[#7a5a0a] bg-[#fdf9ed]"
                    : tripType === val
                    ? "border-[1.5px] border-ocean bg-[#f2f7fa]"
                    : "border-[#d8d2c2] bg-white hover:border-ocean",
                ].join(" ")}
              >
                <div className={[
                  "mb-2 flex h-8 w-8 items-center justify-center rounded-lg font-ui text-base",
                  tripType === val && val === "corp" ? "bg-[#7a5a0a] text-white" :
                  tripType === val ? "bg-ocean text-white" : "bg-[#f0ece4] text-[#5a564e]",
                ].join(" ")}>
                  <i className={`ti ${icon}`} aria-hidden="true" />
                </div>
                <div className="font-ui text-[12px] font-semibold text-ink">{title}</div>
                <div className="mt-0.5 font-body text-[11px] leading-snug text-[#8a857a]">{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── 2. Trip Details ── */}
        <SectionHeader n={2} label="Trip details" />
        <div className="grid grid-cols-1 gap-5 border-b border-[#ede8da] pb-7 sm:grid-cols-2">
          <Field label="Number of golfers" required>
            <input type="number" min="2" max="400" required value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)} placeholder="e.g. 8" className={iCls} />
          </Field>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block font-ui text-[13px] font-semibold text-ink">Travel dates</label>
            {!datesFlexible && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Arrival</label>
                  <input type="date" value={startDate} min={minArrival}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setStartDateError(false);
                    if (endDate) {
                      const diff = Math.round((new Date(endDate).getTime() - new Date(e.target.value).getTime()) / 86400000);
                      if (diff > 0) { setNights(String(diff)); setNightsAutoSet(true); }
                    }
                  }} className={`${iCls} ${startDateError ? "border-[#a83232]" : ""}`} />
                  {startDateError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Arrival date required.</p>}
                </div>
                <div>
                  <label className="mb-1 block font-ui text-[11px] text-[#8a857a]">Departure</label>
                  <input type="date" value={endDate}
                    min={startDate ? new Date(new Date(startDate).getTime() + 86400000).toISOString().split("T")[0] : minArrival}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      if (startDate) {
                        const diff = Math.round((new Date(e.target.value).getTime() - new Date(startDate).getTime()) / 86400000);
                        if (diff > 0) { setNights(String(diff)); setNightsAutoSet(true); }
                      }
                    }} className={iCls} />
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
            {pbcLeadTimeWarning && (
              <div className="mt-3 rounded-lg border border-[#e8b876] bg-[#fdf3e2] px-4 py-3 font-ui text-[13px] leading-relaxed text-[#6a5528]">
                Pebble Beach Resorts® tee times for groups typically need 30+ days advance booking. We&apos;ll confirm availability — submit your request and we&apos;ll let you know what we can secure.
              </div>
            )}
          </div>
          <Field label="Nights" required={datesFlexible}>
            <input type="number" min="1" max="30" value={nights}
              onChange={(e) => { setNights(e.target.value); setNightsAutoSet(false); if (e.target.value) setNightsError(false); }}
              placeholder="e.g. 4" className={`${iCls} ${nightsError ? "border-[#a83232]" : ""}`} />
            {nightsError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Required when dates are flexible.</p>}
            {nightsAutoSet && nights && !nightsError && (
              <p className="mt-1 font-ui text-[11px] text-[#2f6b4f]">Auto-calculated from your dates</p>
            )}
          </Field>
          <div className="sm:col-span-2">
            <Check checked={nonGolfer} onChange={(v) => { setNonGolfer(v); if (!v) setNonGolferCount("1"); }}
              label="Traveling with a non-golfing partner or family member?" />
            {nonGolfer && (
              <div className="mt-3 sm:w-1/2">
                <Field label="How many non-golfers?" required>
                  <input type="number" min="1" max="100" value={nonGolferCount}
                    onChange={(e) => { setNonGolferCount(e.target.value); if (e.target.value) setNonGolferCountError(false); }}
                    className={`${iCls} ${nonGolferCountError ? "border-[#a83232]" : ""}`} />
                  {nonGolferCountError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Please enter the number of non-golfers.</p>}
                </Field>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. Golf ── */}
        <SectionHeader n={3} label="Golf" />
        <div className="border-b border-[#ede8da] pb-7">
          <div className="mb-3 flex items-center gap-2">
            <p className="font-body text-[13px] text-[#6a665e]">Select one or more courses <span className="text-[#a83232]">*</span></p>
            {coursesError && <p className="font-ui text-[12px] text-[#a83232]">Please select at least one course.</p>}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {BOOKABLE_COURSES.map((c) => {
              const sel = selectedCourses.includes(c.slug);
              const pbc = PBC_SLUGS.has(c.slug);
              return (
                <button key={c.slug} type="button"
                  onClick={() => toggleCourse(c.slug)}
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
                    {/* stat row */}
                    {c.rating && c.slope && (
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 border-t border-[#e3ddcf] pt-2">
                        <span className="font-ui text-[11px] text-[#9a8a6e]">Par <span className="font-semibold text-ink">{c.par}</span></span>
                        <span className="font-ui text-[11px] text-[#9a8a6e]">{c.yards}</span>
                        <span className="font-ui text-[11px] text-[#9a8a6e]">Rtg <span className="font-semibold text-ink">{c.rating}</span> · Slope <span className="font-semibold text-ink">{c.slope}</span></span>
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

          {/* ── Rounds + tee times ── */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Rounds per golfer" required>
              <input type="number" min="1" max="30" value={roundsPerGolfer}
                onChange={(e) => { setRoundsPerGolfer(e.target.value); setRoundsAutoSet(false); if (e.target.value) setRoundsError(false); }}
                placeholder="e.g. 4" className={`${iCls} ${roundsError ? "border-[#a83232]" : ""}`} />
              {roundsError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Required — helps us price the golf correctly.</p>}
              {roundsAutoSet && roundsPerGolfer && !roundsError && (
                <p className="mt-1 font-ui text-[11px] text-[#2f6b4f]">Auto-set from your nights — adjust if playing more than one round per day</p>
              )}
            </Field>
            <Field label="Caddie preference" required>
              <div className="grid grid-cols-2 gap-2">
                {CADDIE_OPTIONS.map((o) => (
                  <button key={o.value} type="button"
                    onClick={() => { setCaddieOption(o.value); setCaddieError(false); }}
                    className={[
                      "rounded-[10px] border p-2.5 text-left transition-colors",
                      caddieOption === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                    ].join(" ")}>
                    <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                    <div className="mt-0.5 font-body text-[11px] text-[#8a857a] leading-snug">{o.sub}</div>
                  </button>
                ))}
              </div>
              {caddieError && <p className="mt-2 font-ui text-[12px] text-[#a83232]">Please select a caddie preference.</p>}
            </Field>
          </div>
          <div className="mt-5">
            <p className="mb-2 font-ui text-[13px] font-semibold text-ink">Preferred tee times</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-1.5 font-ui text-[11px] text-[#8a857a] uppercase tracking-[.06em]">1st preference <span className="text-[#a83232]">*</span></p>
                <div className="grid grid-cols-2 gap-2">
                  {TEE_TIME_OPTIONS.map((o) => (
                    <button key={o.value} type="button"
                      onClick={() => { setTeeTimePref1(teeTimePref1 === o.value ? "" : o.value); setTeeTime1Error(false); }}
                      className={[
                        "rounded-[10px] border p-2.5 text-left transition-colors",
                        teeTimePref1 === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                      ].join(" ")}>
                      <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                      <div className="mt-0.5 font-body text-[11px] text-[#8a857a]">{o.sub}</div>
                    </button>
                  ))}
                </div>
                {teeTime1Error && <p className="mt-1.5 font-ui text-[12px] text-[#a83232]">Please select your preferred tee time.</p>}
              </div>
              <div>
                <p className="mb-1.5 font-ui text-[11px] text-[#8a857a] uppercase tracking-[.06em]">2nd preference</p>
                <div className="grid grid-cols-2 gap-2">
                  {TEE_TIME_OPTIONS.map((o) => (
                    <button key={o.value} type="button"
                      onClick={() => setTeeTimePref2(teeTimePref2 === o.value ? "" : o.value)}
                      className={[
                        "rounded-[10px] border p-2.5 text-left transition-colors",
                        teeTimePref2 === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                        teeTimePref2 === o.value && teeTimePref2 === teeTimePref1 ? "border-[#e8b876] bg-[#fdf3e2]" : "",
                      ].join(" ")}>
                      <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                      <div className="mt-0.5 font-body text-[11px] text-[#8a857a]">{o.sub}</div>
                    </button>
                  ))}
                </div>
                {teeTimePref2 && teeTimePref2 === teeTimePref1 && (
                  <p className="mt-1.5 font-ui text-[11px] text-[#7a5a0a]">Same as 1st — consider a different fallback</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Lodging ── */}
        {showLodging && (
        <><SectionHeader n={4} label="Lodging" />
        <div className="border-b border-[#ede8da] pb-7">
          {/* Pick for me toggle */}
          <label className={[
            "mb-4 flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors",
            hotelPickForMe ? "border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
          ].join(" ")}>
            <div className={[
              "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              hotelPickForMe ? "border-ocean bg-ocean" : "border-[#d8d2c2]",
            ].join(" ")}>
              {hotelPickForMe && <span className="block h-2 w-2 rounded-full bg-white" />}
            </div>
            <input type="checkbox" checked={hotelPickForMe}
              onChange={(e) => { setHotelPickForMe(e.target.checked); if (e.target.checked) setSelectedHotels([]); }}
              className="sr-only" />
            <div>
              <div className="font-ui text-[13px] font-semibold text-ink">Choose the best hotel for us</div>
              <div className="font-body text-[12px] text-[#8a857a]">We&apos;ll match lodging based on your courses, group size, and best available rates</div>
            </div>
          </label>

          {/* Room configuration */}
          <div className="mb-5">
            <p className="mb-1.5 font-ui text-[13px] font-semibold text-ink">Room configuration</p>
            <p className="mb-3 font-body text-[12px] text-[#8a857a]">Helps us match your group to the right hotel and price rooms correctly.</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ROOM_CONFIG_OPTIONS.map((o) => (
                <button key={o.value} type="button"
                  onClick={() => setRoomConfig(roomConfig === o.value ? "" : o.value)}
                  className={[
                    "rounded-[10px] border p-3 text-left transition-colors",
                    roomConfig === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                  ].join(" ")}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                    {o.badge && (
                      <span className="flex-shrink-0 rounded-full bg-[#eef4f7] px-2 py-0.5 font-ui text-[10px] font-semibold text-ocean">{o.badge}</span>
                    )}
                  </div>
                  <div className="mt-1 font-body text-[11px] text-[#8a857a] leading-snug">{o.sub}</div>
                </button>
              ))}
            </div>
            {(roomConfig === "villa_cottage" || roomConfig === "exclusive_buyout") && (
              <div className="mt-3 rounded-lg border border-[#e0c870] bg-[#fdf9ed] px-4 py-3 font-ui text-[12px] leading-relaxed text-[#7a5a0a]">
                {roomConfig === "exclusive_buyout"
                  ? "Casa Palmero™ at Pebble Beach (24 rooms, full estate) and Carmel Valley Ranch cottages both offer exclusive group buyout. We'll confirm availability and build the buyout into your quote."
                  : "Villas and cottages sleep 4–6 and are available at Carmel Valley Ranch, Bernardus Lodge, and The Lodge at Pebble Beach™ (Palmer & Eastwood Cottages). We'll match the right option to your group size."}
              </div>
            )}
          </div>

          {!hotelPickForMe && (
            <>
              <p className="mb-3 font-body text-[13px] text-[#6a665e]">Or select a hotel you have in mind</p>
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
            </>
          )}
        </div></>
        )}

        {/* ── 5. Activities & Transport ── */}
        {showActivities && (
        <><SectionHeader n={5} label="Activities & transport" />
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-ui text-[13px] font-semibold text-ink">Trip budget <span className="text-[#a83232]">*</span></p>
              <div className="flex flex-col gap-2">
                {BUDGET_TIER_OPTIONS.map((o) => (
                  <button key={o.value} type="button"
                    onClick={() => { setBudgetTier(budgetTier === o.value ? "" : o.value); setBudgetTierError(false); }}
                    className={[
                      "rounded-[10px] border p-2.5 text-left transition-colors",
                      budgetTier === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                    ].join(" ")}>
                    <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                    <div className="mt-0.5 font-body text-[11px] text-[#8a857a] leading-snug">{o.sub}</div>
                  </button>
                ))}
              </div>
              {budgetTierError && <p className="mt-2 font-ui text-[12px] text-[#a83232]">Please select a budget range.</p>}
            </div>
            <div>
              <p className="mb-2 font-ui text-[13px] font-semibold text-ink">Flying into <span className="text-[#9a8a6e] font-normal text-[11px] normal-case tracking-normal">— required with airport transfers</span></p>
              <div className="flex flex-col gap-2">
                {AIRPORT_OPTIONS.map((o) => (
                  <button key={o.value} type="button"
                    onClick={() => { setArrivalAirport(arrivalAirport === o.value ? "" : o.value); setAirportError(false); }}
                    className={[
                      "rounded-[10px] border p-2.5 text-left transition-colors",
                      arrivalAirport === o.value ? "border-[1.5px] border-ocean bg-[#f2f7fa]" : "border-[#d8d2c2] bg-white hover:border-ocean",
                    ].join(" ")}>
                    <div className="font-ui text-[12px] font-semibold text-ink">{o.label}</div>
                    <div className="mt-0.5 font-body text-[11px] text-[#8a857a]">{o.sub}</div>
                  </button>
                ))}
              </div>
              {airportError && <p className="mt-2 font-ui text-[12px] text-[#a83232]">Required when airport transfers are selected.</p>}
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
        </div></>
        )}

        {/* ── Corporate needs ── */}
        {showCorporate && (
        <><SectionHeader n={6} label="Corporate needs" />
        <div className="border-b border-[#ede8da] pb-7 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Expected attendees" required>
              <input type="number" min="1" max="1000" value={corpAttendees}
                onChange={(e) => { setCorpAttendees(e.target.value); if (e.target.value) setCorpAttendeesError(false); }}
                placeholder="e.g. 40" className={`${iCls} ${corpAttendeesError ? "border-[#a83232]" : ""}`} />
              {corpAttendeesError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Required for corporate quotes.</p>}
            </Field>
            <Field label="Event type" required>
              <select value={corpEventType} onChange={(e) => { setCorpEventType(e.target.value); if (e.target.value) setCorpEventTypeError(false); }}
                className={`${iCls} ${corpEventTypeError ? "border-[#a83232]" : ""}`}>
                <option value="">Select one…</option>
                {CORPORATE_EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {corpEventTypeError && <p className="mt-1 font-ui text-[12px] text-[#a83232]">Required for corporate quotes.</p>}
            </Field>
          </div>
          <div>
            <p className="mb-2 font-ui text-[13px] font-semibold text-ink">What do you need? <span className="font-normal text-[#8a857a]">(select all that apply)</span></p>
            <div className="flex flex-wrap gap-2">
              {CORPORATE_NEEDS.map((n) => {
                const sel = corpNeeds.includes(n);
                return (
                  <button key={n} type="button"
                    onClick={() => setCorpNeeds(prev => sel ? prev.filter(x => x !== n) : [...prev, n])}
                    className={[
                      "rounded-lg border px-3 py-1.5 font-ui text-[12px] transition-colors",
                      sel ? "border-[#7a5a0a] bg-[#fdf9ed] text-[#7a5a0a] font-semibold" : "border-[#d8d2c2] bg-white text-[#4a463f] hover:border-[#7a5a0a]",
                    ].join(" ")}>
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </div></>
        )}

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
      <aside className="hidden lg:block" style={{minHeight:0}}>
        <div className="sticky top-8 rounded-2xl border border-[#e3ddcf] bg-white p-5 shadow-[0_4px_16px_rgba(37,35,33,.06)]">
          <p className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[.1em] text-[#9a8a6e]">Your trip so far</p>
          {gameLevel && (
            <div className="mb-2 rounded-lg bg-[#f0ece4] px-3 py-2 font-ui text-[12px] font-semibold text-[#5a564e]">
              {GAME_LEVELS.find((g) => g.val === gameLevel)?.title}
            </div>
          )}
          {tripType && (
            <div className="mb-3 rounded-lg bg-[#eef4f7] px-3 py-2 font-ui text-[12px] font-semibold text-ocean">
              {tripType === "golf" ? "Golf only" : tripType === "stay" ? "Golf + Stay" : tripType === "full" ? "Full experience" : "Corporate / group event"}
            </div>
          )}
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
              {hotelPickForMe ? (
                <span className="rounded-full bg-[#eef4f7] px-2.5 py-0.5 font-ui text-[11px] text-ocean">Best match — we decide</span>
              ) : selectedHotels.length === 0 ? (
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
            <SummaryRow label="Rounds / golfer" value={roundsPerGolfer ? `${roundsPerGolfer} rounds` : null} />
            <SummaryRow label="Tee time" value={teeTimePref1 ? (TEE_TIME_OPTIONS.find(o => o.value === teeTimePref1)?.label ?? null) : null} />
            <SummaryRow label="Rooms" value={roomConfig ? (ROOM_CONFIG_OPTIONS.find(o => o.value === roomConfig)?.label ?? null) : null} />
            <SummaryRow label="Caddies" value={caddieOption ? (CADDIE_OPTIONS.find(o => o.value === caddieOption)?.label ?? null) : null} />
            <SummaryRow label="Budget" value={budgetTier ? (BUDGET_TIER_OPTIONS.find(o => o.value === budgetTier)?.label ?? null) : null} />
            <SummaryRow label="Airport" value={arrivalAirport ? (AIRPORT_OPTIONS.find(o => o.value === arrivalAirport)?.label ?? null) : null} />
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


