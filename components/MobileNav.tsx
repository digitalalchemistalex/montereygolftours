"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Courses",      href: "/golf-courses/",  image: "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f?auto=format&fit=crop&w=800&q=85" },
  { label: "Hotels",       href: "/hotels/",         image: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=85" },
  { label: "Destinations", href: "/destinations/",   image: "https://images.unsplash.com/photo-1502770513380-138d6d3a51dd?auto=format&fit=crop&w=800&q=85" },
  { label: "Itineraries",  href: "/itineraries/",    image: "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513?auto=format&fit=crop&w=800&q=85" },
  { label: "Packages",     href: "/packages/",       image: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=800&q=85" },
  { label: "Blog",         href: "/blog/",           image: "https://images.unsplash.com/photo-1571940205525-2d48d9f1f8d4?auto=format&fit=crop&w=800&q=85" },
  { label: "About",        href: "/about/",          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85" },
  { label: "FAQ",          href: "/faq/",            image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=85" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
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
            backgroundColor: "#16242c",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 18,
              right: 20,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              zIndex: 1,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M6 18L18 6" stroke="#f6f2e7" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Links */}
          <div style={{ flex: 1, overflowY: "auto", paddingTop: 64 }}>
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  height: 76,
                  overflow: "hidden",
                  paddingLeft: 24,
                  backgroundImage: `url(${link.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  textDecoration: "none",
                }}
              >
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg,rgba(10,15,15,.85) 0%,rgba(10,15,15,.5) 55%,rgba(10,15,15,.15) 100%)",
                }} />
                <span style={{
                  position: "relative",
                  zIndex: 1,
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#f6f2e7",
                  textShadow: "0 1px 6px rgba(0,0,0,.8)",
                }}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom */}
          <div style={{
            borderTop: "1px solid rgba(250,246,238,.1)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            backgroundColor: "#16242c",
          }}>
            <a href={SITE.phoneHref} style={{ color: "#f6f2e7", fontSize: 16, fontWeight: 600, textDecoration: "none", fontFamily: "sans-serif" }}>
              {SITE.phone}
            </a>
            <Link
              href="/quote/"
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                backgroundColor: "#E8A0A8",
                color: "#252321",
                textAlign: "center",
                padding: "14px 20px",
                borderRadius: 9,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                fontFamily: "sans-serif",
              }}
            >
              Get a Quote
            </Link>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
