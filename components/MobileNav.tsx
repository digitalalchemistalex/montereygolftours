"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { DESTINATIONS } from "@/lib/destinations";
import { ITINERARIES } from "@/lib/itineraries";

// ── Shared data — mirrors Header.tsx exactly, same source of truth ────────
const COURSE_CHAR: Record<string, string> = {
  "pebble-beach-golf-links": "Oceanside clifftop · iconic",
  "spyglass-hill":           "Pine forest into coastal dunes",
  "del-monte-golf-course":   "Oldest course west of the Mississippi",
  "the-hay":                 "9-hole short course · Tiger Woods design",
  "links-at-spanish-bay":    "Closed for renovation · reopens Apr 2027",
  "bayonet":                 "Championship · former Fort Ord",
  "black-horse":             "Monterey Bay views · Fort Ord",
  "carmel-valley-ranch":     "Fog-free inland · Pete Dye design",
  "quail-lodge":             "Sunny valley resort",
  "club-at-pasadera":        "Nicklaus Signature · Monday access",
  "poppy-hills":             "NCGA bentgrass · Del Monte Forest",
  "pacific-grove-golf-links":"Coastal municipal · ocean back nine",
  "laguna-seca-golf-ranch":  "Accessible daily-fee",
  "pasatiempo":              "Alister MacKenzie · Santa Cruz",
};

const HOTEL_NOTE: Record<string, { stars: string; note: string }> = {
  "bernardus-lodge":          { stars: "★★★★★", note: "Ultra-luxury · Carmel Valley" },
  "carmel-valley-ranch":      { stars: "★★★★",  note: "Golf resort · fog-free" },
  "quail-lodge":              { stars: "★★★★",  note: "Golf resort · valley" },
  "hyatt-regency-monterey":   { stars: "★★★★",  note: "22 secluded acres · golf groups" },
  "monterey-plaza":           { stars: "★★★★",  note: "Waterfront · Cannery Row" },
  "intercontinental-the-clement": { stars: "★★★★", note: "Boutique · oceanfront" },
  "portola-hotel":            { stars: "★★★★",  note: "Downtown Monterey" },
  "casa-munras":              { stars: "★★★",   note: "Boutique · historic garden" },
};

const PB_SLUGS    = ["pebble-beach-golf-links","spyglass-hill","del-monte-golf-course","the-hay","links-at-spanish-bay"];
const OTHER_SLUGS = ["bayonet","black-horse","carmel-valley-ranch","quail-lodge","club-at-pasadera",
                     "poppy-hills","pacific-grove-golf-links","laguna-seca-golf-ranch","pasatiempo"];
const MONTEREY_SLUGS = ["hyatt-regency-monterey","monterey-plaza","intercontinental-the-clement","portola-hotel","casa-munras"];
const CARMEL_SLUGS   = ["bernardus-lodge","quail-lodge","carmel-valley-ranch"];

const courseMap = Object.fromEntries(COURSES.map(c => [c.slug, c]));
const hotelMap  = Object.fromEntries(HOTELS.map(h => [h.slug, h]));
const FC = courseMap["bayonet"]!;
const FH = hotelMap["hyatt-regency-monterey"]!;

// Verified local-intelligence facts, sourced from LocalIntel.tsx — never invented.
function isCarWeek() {
  const month = new Date().getMonth();
  return month === 6 || month === 7;
}
function getIntelLine(): string {
  const facts = [
    "Fog typically clears by 10am \u00b7 best tee time 8\u201310am.",
    "Carmel Valley courses run 15\u201318\u00b0F warmer than the coast, often clear when the fog hasn't lifted.",
    "Monterey Regional Airport (MRY) is 10\u201320 minutes from most courses.",
    "March\u2013May and September\u2013November bring the lightest fog of the year.",
  ];
  if (isCarWeek()) {
    facts.push("Car Week (mid-August) closes Bayonet and Black Horse for several days \u2014 ask us before booking this month.");
  }
  return facts[Math.floor(Math.random() * facts.length)];
}

// ── Accordion chevron ───────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="8" viewBox="0 0 10 6" fill="none"
      style={{ transition: "transform 250ms ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
    >
      <path d="M1 1L5 5L9 1" stroke="#A8843D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Accordion section wrapper ───────────────────────────────────────────
function Section({
  label, open, onToggle, delay, mounted, children,
}: {
  label: string; open: boolean; onToggle: () => void; delay: number; mounted: boolean; children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "0.5px solid rgba(230,226,216,0.1)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", padding: "17px 0", cursor: "pointer",
          color: "#e6e2d8", fontSize: 21, fontFamily: "'Playfair Display', Georgia, serif", textAlign: "left",
        }}
      >
        {label}
        <Chevron open={open} />
      </button>
      <div style={{
        maxHeight: open ? 2000 : 0,
        overflow: "hidden",
        transition: "max-height 380ms ease",
      }}>
        <div style={{ paddingBottom: 20 }}>{children}</div>
      </div>
    </div>
  );
}

// ── Featured image panel (compact mobile version) ──────────────────────
function FeaturedRow({ image, alt, title, sub, href, onClick }: {
  image: string; alt: string; title: string; sub: string; href: string; onClick: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} style={{
      position: "relative", display: "flex", alignItems: "flex-end",
      height: 140, borderRadius: 10, overflow: "hidden", marginBottom: 16, textDecoration: "none",
    }}>
      <Image src={image} alt={alt} fill style={{ objectFit: "cover" }} sizes="340px" />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,16,14,.92) 0%, rgba(10,16,14,.35) 60%, rgba(10,16,14,.05) 100%)",
      }} />
      <div style={{ position: "relative", padding: "12px 16px" }}>
        <span style={{
          display: "inline-block", marginBottom: 6, borderRadius: 999, background: "#A8843D",
          padding: "3px 9px", fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700,
          letterSpacing: "0.08em", textTransform: "uppercase", color: "#12181c",
        }}>Featured</span>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#f6f2e7" }}>{title}</div>
        <div style={{ marginTop: 2, fontFamily: "Lora, Georgia, serif", fontSize: 12, color: "rgba(246,242,231,.8)" }}>{sub}</div>
      </div>
    </Link>
  );
}

// ── Group label ──────────────────────────────────────────────────────────
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      marginBottom: 8, fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 700,
      letterSpacing: "0.1em", textTransform: "uppercase", color: "#6f7d78",
    }}>{children}</div>
  );
}

// ── Simple item row ──────────────────────────────────────────────────────
function ItemRow({ title, sub, href, onClick, dim }: {
  title: string; sub?: string; href: string; onClick: () => void; dim?: boolean;
}) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: "flex", flexDirection: "column", padding: "8px 0", textDecoration: "none", opacity: dim ? 0.5 : 1,
    }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5, fontWeight: 500, color: "#e6e2d8" }}>{title}</span>
      {sub && <span style={{ fontFamily: "Lora, Georgia, serif", fontSize: 12, color: "#8a9199", marginTop: 1 }}>{sub}</span>}
    </Link>
  );
}

function ViewAllRow({ href, onClick, label }: { href: string; onClick: () => void; label: string }) {
  return (
    <Link href={href} onClick={onClick} style={{
      display: "block", marginTop: 10, paddingTop: 12, borderTop: "0.5px solid rgba(230,226,216,0.1)",
      fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#A8843D", textDecoration: "none",
    }}>{label} &rarr;</Link>
  );
}

const SIMPLE_LINKS = [
  { label: "About", href: "/about/" },
  { label: "FAQ",   href: "/faq/" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [intelLine, setIntelLine] = useState(getIntelLine());

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setIntelLine(getIntelLine());
      const t = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setMounted(false);
      setExpanded(null);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);
  const toggle = (key: string) => setExpanded(expanded === key ? null : key);

  return (
    <div className="lg:hidden">
      <button
        type="button" aria-label="Open menu" onClick={() => setOpen(true)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="#f6f2e7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {open && createPortal(
        <div style={{
          position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "#12181c",
          display: "flex", flexDirection: "column", fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "22px 24px 0", flexShrink: 0 }}>
            <button type="button" aria-label="Close menu" onClick={close} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" stroke="#e6e2d8" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Scrollable menu body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "18px 24px 0" }}>

            <div style={{
              marginBottom: 4, fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.22em",
              color: "#6f7d78", opacity: mounted ? 1 : 0, transition: "opacity 420ms ease",
            }}>MONTEREY PENINSULA</div>

            {/* ━━ COURSES ━━ */}
            <Section label="Courses" open={expanded === "courses"} onToggle={() => toggle("courses")} delay={40} mounted={mounted}>
              <FeaturedRow
                image={`${FC.image!}?auto=format&fit=crop&w=680&h=420&q=80`}
                alt={FC.name} title={FC.name} sub={COURSE_CHAR[FC.slug] ?? FC.hook}
                href={`/golf-courses/${FC.slug}/`} onClick={close}
              />
              <GroupLabel>Pebble Beach Resorts® &middot; IAGTO Partner</GroupLabel>
              {PB_SLUGS.map(slug => {
                const c = courseMap[slug]; if (!c) return null;
                const closed = slug === "links-at-spanish-bay";
                return (
                  <ItemRow key={slug} href={`/golf-courses/${slug}/`} onClick={close} dim={closed}
                    title={c.name.replace(" Golf Links®","®").replace(" Golf Course®","®").replace(" Golf Course","").replace("™"," ™") + (closed ? " (closed)" : "")}
                    sub={`Par ${c.par}`} />
                );
              })}
              <GroupLabel><span style={{ marginTop: 14, display: "block" }}>Championship, Resort &amp; Daily Fee</span></GroupLabel>
              {OTHER_SLUGS.map(slug => {
                const c = courseMap[slug]; if (!c) return null;
                return (
                  <ItemRow key={slug} href={`/golf-courses/${slug}/`} onClick={close}
                    title={c.name.replace(" Golf Links","").replace(" Golf Course","").replace(" Golf Club","").replace(" Golf Ranch","")}
                    sub={COURSE_CHAR[slug]?.split("·")[0].trim() ?? c.city.split(",")[0]} />
                );
              })}
              <ViewAllRow href="/golf-courses/" onClick={close} label="View all 14 courses" />
            </Section>

            {/* ━━ HOTELS ━━ */}
            <Section label="Hotels" open={expanded === "hotels"} onToggle={() => toggle("hotels")} delay={80} mounted={mounted}>
              <FeaturedRow
                image={`${FH.image}?auto=format&fit=crop&w=680&h=420&q=80`}
                alt={FH.name} title={FH.name} sub="22 secluded acres · Ideal for golf groups"
                href={`/hotels/${FH.slug}/`} onClick={close}
              />
              <GroupLabel>Monterey</GroupLabel>
              {MONTEREY_SLUGS.map(slug => {
                const h = hotelMap[slug]; if (!h) return null;
                const meta = HOTEL_NOTE[slug];
                return (
                  <ItemRow key={slug} href={`/hotels/${slug}/`} onClick={close}
                    title={h.name.replace(" Hotel & Spa","").replace(" Garden Hotel & Spa","").replace(" Hotel","")}
                    sub={meta ? `${meta.stars}  ${meta.note}` : undefined} />
                );
              })}
              <GroupLabel><span style={{ marginTop: 14, display: "block" }}>Carmel &amp; Carmel Valley</span></GroupLabel>
              {CARMEL_SLUGS.map(slug => {
                const h = hotelMap[slug]; if (!h) return null;
                const meta = HOTEL_NOTE[slug];
                return (
                  <ItemRow key={slug} href={`/hotels/${slug}/`} onClick={close}
                    title={h.name.replace(" Lodge & Spa","").replace(" & Golf Club","")}
                    sub={meta ? `${meta.stars}  ${meta.note}` : undefined} />
                );
              })}
              <ViewAllRow href="/hotels/" onClick={close} label="View all 9 hotels" />
            </Section>

            {/* ━━ DESTINATIONS ━━ */}
            <Section label="Destinations" open={expanded === "destinations"} onToggle={() => toggle("destinations")} delay={120} mounted={mounted}>
              <GroupLabel>6 Areas &middot; Monterey Peninsula + Central Coast</GroupLabel>
              {Object.values(DESTINATIONS).map(d => (
                <ItemRow key={d.slug} href={`/destinations/${d.slug}/`} onClick={close}
                  title={d.name}
                  sub={d.trustBar?.[0] ?? d.speakable.split(".")[0].slice(0, 60)} />
              ))}
              <ViewAllRow href="/destinations/" onClick={close} label="View all destinations" />
            </Section>

            {/* ━━ ITINERARIES ━━ */}
            <Section label="Itineraries" open={expanded === "itineraries"} onToggle={() => toggle("itineraries")} delay={160} mounted={mounted}>
              <GroupLabel>6 Sample Trips &middot; 3 to 7 Days</GroupLabel>
              {Object.values(ITINERARIES).map(t => (
                <ItemRow key={t.slug} href={`/itineraries/${t.slug}/`} onClick={close}
                  title={t.shortTitle}
                  sub={`${t.durationDays} days · ${t.rounds}${t.mostBooked ? "  ·  Most booked" : ""}`} />
              ))}
              <ViewAllRow href="/itineraries/" onClick={close} label="See all itineraries" />
            </Section>

            {/* ━━ SIMPLE LINKS ━━ */}
            {SIMPLE_LINKS.map((link, i) => (
              <Link
                key={link.href} href={link.href} onClick={close}
                style={{
                  display: "block", padding: "17px 0",
                  borderTop: "0.5px solid rgba(230,226,216,0.1)",
                  borderBottom: i === SIMPLE_LINKS.length - 1 ? "0.5px solid rgba(230,226,216,0.1)" : "none",
                  textDecoration: "none", color: "#e6e2d8", fontSize: 21,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 420ms ease ${200 + i * 40}ms, transform 420ms ease ${200 + i * 40}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Trademark / IAGTO disclaimer — fills otherwise-blank space, protects the brand */}
            <div style={{ padding: "26px 0 0", opacity: mounted ? 1 : 0, transition: "opacity 500ms ease 400ms" }}>
              <p style={{
                color: "rgba(230,226,216,0.45)", fontSize: 10.5, lineHeight: 1.6,
                fontFamily: "Inter, sans-serif",
              }}>
                Pebble Beach Golf Links&reg;, Spyglass Hill&reg; Golf Course, The Links at Spanish Bay&reg;,
                Del Monte Golf Course&reg;, The Hay&trade;, and Pebble Beach Resorts&reg; are registered
                trademarks of Pebble Beach Company. Monterey Golf Tours is an IAGTO-contracted golf travel
                operator authorized to promote and book Pebble Beach Resorts&reg; courses. All rights
                reserved by Pebble Beach Company.
              </p>
              <div style={{ marginTop: 10, display: "flex", gap: 14 }}>
                <Link href="/privacy/" onClick={close} style={{ color: "rgba(230,226,216,0.55)", fontSize: 11, fontFamily: "Inter, sans-serif", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  Privacy Policy
                </Link>
                <Link href="/terms/" onClick={close} style={{ color: "rgba(230,226,216,0.55)", fontSize: 11, fontFamily: "Inter, sans-serif", textDecoration: "underline", textUnderlineOffset: 2 }}>
                  Terms of Use
                </Link>
              </div>
            </div>

            {/* Live local intelligence line */}
            <div style={{ padding: "16px 0 8px", opacity: mounted ? 1 : 0, transition: "opacity 500ms ease 420ms" }}>
              <div style={{ color: "#7c8b85", fontSize: 13, lineHeight: 1.6, fontStyle: "italic", fontFamily: "Lora, Georgia, serif" }}>
                {intelLine}
              </div>
            </div>
          </div>

          {/* Bottom: phone + CTA — fixed, not scrolled */}
          <div style={{
            padding: "14px 24px 26px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0,
            borderTop: "0.5px solid rgba(230,226,216,0.1)",
            opacity: mounted ? 1 : 0, transition: "opacity 500ms ease 460ms",
          }}>
            <Link href="/quote/" onClick={close} style={{
              flex: 1, textAlign: "center", padding: "15px", backgroundColor: "#A8843D", color: "#12181c",
              fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "0.08em", fontWeight: 600, textDecoration: "none",
            }}>GET A QUOTE</Link>
            <a href={SITE.phoneHref} style={{ color: "#e6e2d8", fontFamily: "Inter, sans-serif", fontSize: 13, textDecoration: "none", whiteSpace: "nowrap" }}>
              {SITE.phone}
            </a>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
