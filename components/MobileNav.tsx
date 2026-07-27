"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Courses",      href: "/golf-courses/" },
  { label: "Hotels",       href: "/hotels/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "Itineraries",  href: "/itineraries/" },
  { label: "About",        href: "/about/" },
  { label: "FAQ",          href: "/faq/" },
];

// Verified local-intelligence facts, sourced from LocalIntel.tsx — never invented.
function isCarWeek() {
  const month = new Date().getMonth(); // 0-indexed
  return month === 6 || month === 7; // July or August
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [intelLine, setIntelLine] = useState(getIntelLine());

  // Lock body scroll when open, trigger stagger-in animation, pick a fresh fact
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setIntelLine(getIntelLine());
      // next tick so the CSS transition actually fires
      const t = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setMounted(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Hamburger */}
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H21M3 12H21M3 18H21" stroke="#f6f2e7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Portal overlay — bypasses header stacking context entirely */}
      {open && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#12181c",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          {/* Top bar: close only */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "22px 24px 0",
          }}>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" stroke="#e6e2d8" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Featured first link — large editorial treatment */}
          <div style={{ padding: "30px 28px 0" }}>
            <div style={{
              color: "#6f7d78",
              fontSize: 11,
              letterSpacing: "0.22em",
              fontFamily: "Inter, sans-serif",
              marginBottom: 6,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 420ms ease, transform 420ms ease",
            }}>
              MONTEREY PENINSULA
            </div>
            <Link
              href={LINKS[0].href}
              onClick={() => setOpen(false)}
              onFocus={() => setActiveIndex(0)}
              onMouseEnter={() => setActiveIndex(0)}
              style={{
                display: "block",
                textDecoration: "none",
                color: "#e6e2d8",
                fontSize: 42,
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 460ms ease 40ms, transform 460ms ease 40ms",
              }}
            >
              {LINKS[0].label}
            </Link>
            <div style={{
              width: 38,
              height: 1,
              background: "#A8843D",
              margin: "14px 0 26px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 400ms ease 160ms, transform 400ms ease 160ms",
            }} />
          </div>

          {/* Remaining links — numbered rows, staggered */}
          <div style={{ padding: "0 28px", flex: 1, overflowY: "auto" }}>
            {LINKS.slice(1).map((link, i) => {
              const delay = 120 + i * 55;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  onFocus={() => setActiveIndex(i + 1)}
                  onMouseEnter={() => setActiveIndex(i + 1)}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "#e6e2d8",
                    fontSize: 21,
                    padding: "15px 0",
                    borderTop: "0.5px solid rgba(230,226,216,0.1)",
                    borderBottom: i === LINKS.length - 2 ? "0.5px solid rgba(230,226,216,0.1)" : "none",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Live local intelligence line */}
          <div style={{
            padding: "22px 28px 8px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 500ms ease 420ms",
          }}>
            <div style={{
              color: "#7c8b85",
              fontSize: 13,
              lineHeight: 1.6,
              fontStyle: "italic",
              fontFamily: "Lora, Georgia, serif",
            }}>
              {intelLine}
            </div>
          </div>

          {/* Bottom: phone + CTA */}
          <div style={{
            padding: "14px 28px 26px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: mounted ? 1 : 0,
            transition: "opacity 500ms ease 460ms",
          }}>
            <Link
              href="/quote/"
              onClick={() => setOpen(false)}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "15px",
                backgroundColor: "#A8843D",
                color: "#12181c",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                letterSpacing: "0.08em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              GET A QUOTE
            </Link>
            <a
              href={SITE.phoneHref}
              style={{
                color: "#e6e2d8",
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {SITE.phone}
            </a>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
