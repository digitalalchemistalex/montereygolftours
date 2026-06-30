"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { COURSES } from "@/lib/courses";

const GROUP_SIZES = ["2-4", "5-8", "9-12", "13-16", "17-20", "21-50", "50+"];
const BUDGET_RANGES = [
  "Under $1,000/person",
  "$1,000-$1,500/person",
  "$1,500-$2,000/person",
  "$2,000-$3,000/person",
  "$3,000+/person",
  "Not sure yet",
];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [groupSize, setGroupSize] = useState(GROUP_SIZES[1]);
  const [travelDates, setTravelDates] = useState("");
  const [budget, setBudget] = useState(BUDGET_RANGES[0]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleCourse(slug: string) {
    setSelectedCourses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      group_size: groupSize,
      travel_dates: travelDates || null,
      budget_per_person: budget,
      courses_interested: selectedCourses,
      message: message || null,
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
      className="rounded-2xl border border-[#e3ddcf] bg-white p-6 md:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        <Field label="Travel dates or month (flexible is fine)">
          <input
            type="text"
            placeholder="e.g. mid-September, or flexible"
            value={travelDates}
            onChange={(e) => setTravelDates(e.target.value)}
            className="w-full rounded-lg border border-[#d8d2c2] bg-[#faf8f2] px-3.5 py-2.5 font-body text-[15px] text-ink outline-none focus:border-ocean"
          />
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
      </div>

      <div className="mt-6">
        <label className="mb-2 block font-ui text-[13px] font-semibold text-ink">
          Courses you&apos;re interested in (optional)
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
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
        className="mt-7 w-full rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-cream hover:bg-ocean-dark disabled:opacity-60 sm:w-auto"
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
