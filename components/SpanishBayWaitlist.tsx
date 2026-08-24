"use client";
// components/SpanishBayWaitlist.tsx
// Waitlist form shown on The Links at Spanish Bay® course page
// until reopening April 17 2027.

import { useState, useEffect } from "react";

const REOPEN = new Date("2027-04-17T07:00:00-07:00");

function getCountdown() {
  const diff = REOPEN.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
  };
}

export default function SpanishBayWaitlist() {
  const [cd, setCd] = useState(getCountdown());
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [group, setGroup]     = useState("");
  const [month, setMonth]     = useState("");
  const [errors, setErrors]   = useState<{ name?: string; email?: string }>({});
  const [status, setStatus]   = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 30000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit() {
    const errs: { name?: string; email?: string } = {};
    if (!name.trim())  errs.name  = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/notify-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          group_size: group || "Not specified",
          travel_dates: month || "Flexible",
          referral_source: "spanish_bay_waitlist",
          message: "Spanish Bay waitlist signup — notified when tee times open",
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section
        style={{
          background: "#E6F1FB",
          border: "0.5px solid #185FA5",
          borderRadius: 12,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 22, marginBottom: 8 }}>✓</div>
        <p style={{ fontSize: 15, fontWeight: 500, color: "#042C53", margin: 0 }}>
          You&apos;re on the list.
        </p>
        <p style={{ fontSize: 14, color: "#185FA5", marginTop: 6 }}>
          We&apos;ll reach out personally when Spanish Bay tee times open.
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Hero */}
      <div
        style={{
          background: "#042C53",
          borderRadius: "16px 16px 0 0",
          padding: "2rem 2rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: -60, right: -60,
            width: 220, height: 220, borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
        {/* Pill */}
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.1)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.85)",
            fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: 20, marginBottom: "1rem",
          }}
        >
          <span
            style={{
              width: 6, height: 6, background: "#43d692",
              borderRadius: "50%", display: "inline-block",
              animation: "sbpulse 2s infinite",
            }}
          />
          Temporarily closed
        </span>
        <style>{`@keyframes sbpulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>

        <h2
          style={{
            margin: "0 0 0.5rem",
            fontSize: "clamp(18px, 4vw, 22px)",
            fontWeight: 500, color: "#ffffff", lineHeight: 1.25,
          }}
        >
          The Links at Spanish Bay&#174; reopens{" "}
          <span style={{ color: "#B5D4F4" }}>April&nbsp;17,&nbsp;2027</span>
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          The oceanside links in Del Monte Forest. Be first in line when tee times open.
        </p>

        {/* Countdown */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            borderTop: "0.5px solid rgba(255,255,255,0.12)", marginTop: "1.5rem",
          }}
        >
          {[
            { n: cd.days,  l: "Days"    },
            { n: cd.hours, l: "Hours"   },
            { n: cd.mins,  l: "Minutes" },
          ].map(({ n, l }, i) => (
            <div
              key={l}
              style={{
                padding: "1rem 0 0.875rem", textAlign: "center",
                borderRight: i < 2 ? "0.5px solid rgba(255,255,255,0.12)" : undefined,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(22px, 6vw, 28px)",
                  fontWeight: 500, color: "#ffffff", fontVariantNumeric: "tabular-nums",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2,
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #D3D1C7", borderTop: "none",
          borderRadius: "0 0 16px 16px",
          padding: "1.75rem 2rem",
        }}
      >
        <style>{`
          @media (max-width: 520px) {
            .sb-grid { grid-template-columns: 1fr !important; }
            .sb-form-wrap { padding: 1.25rem !important; }
          }
        `}</style>

        <div className="sb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#5F5E5A", fontWeight: 500, marginBottom: 5 }}>
              Name
            </label>
            <input
              type="text" value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="Your name"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#F1EFE8", border: `0.5px solid ${errors.name ? "#E24B4A" : "#B4B2A9"}`,
                borderRadius: 6, padding: "9px 12px", fontSize: 14, color: "#2C2C2A",
                outline: "none",
              }}
            />
            {errors.name && <p style={{ fontSize: 12, color: "#E24B4A", margin: "4px 0 0" }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#5F5E5A", fontWeight: 500, marginBottom: 5 }}>
              Email
            </label>
            <input
              type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@email.com"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#F1EFE8", border: `0.5px solid ${errors.email ? "#E24B4A" : "#B4B2A9"}`,
                borderRadius: 6, padding: "9px 12px", fontSize: 14, color: "#2C2C2A",
                outline: "none",
              }}
            />
            {errors.email && <p style={{ fontSize: 12, color: "#E24B4A", margin: "4px 0 0" }}>{errors.email}</p>}
          </div>
        </div>

        <div className="sb-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#5F5E5A", fontWeight: 500, marginBottom: 5 }}>
              Group size
            </label>
            <select
              value={group} onChange={(e) => setGroup(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#F1EFE8", border: "0.5px solid #B4B2A9",
                borderRadius: 6, padding: "9px 12px", fontSize: 14, color: "#2C2C2A",
                outline: "none",
              }}
            >
              <option value="">Select…</option>
              <option value="4 golfers">4 golfers</option>
              <option value="8 golfers">8 golfers</option>
              <option value="12+ golfers">12+ golfers</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#5F5E5A", fontWeight: 500, marginBottom: 5 }}>
              Target month
            </label>
            <select
              value={month} onChange={(e) => setMonth(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#F1EFE8", border: "0.5px solid #B4B2A9",
                borderRadius: 6, padding: "9px 12px", fontSize: 14, color: "#2C2C2A",
                outline: "none",
              }}
            >
              <option value="">Select…</option>
              <option value="April 2027">April 2027</option>
              <option value="May 2027">May 2027</option>
              <option value="Summer 2027">Summer 2027</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          style={{
            width: "100%", padding: "12px",
            background: status === "loading" ? "#5F5E5A" : "#042C53",
            color: "#ffffff", border: "none", borderRadius: 8,
            fontSize: 14, fontWeight: 500, cursor: status === "loading" ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {status === "loading" ? "Sending…" : "Notify me when Spanish Bay reopens"}
        </button>
        {status === "error" && (
          <p style={{ fontSize: 12, color: "#E24B4A", textAlign: "center", marginTop: 8 }}>
            Something went wrong. Try again or email us directly.
          </p>
        )}
        <p style={{ margin: "0.75rem 0 0", fontSize: 12, color: "#888780", textAlign: "center" }}>
          One email when tee times open. No spam.
        </p>
      </div>
    </section>
  );
}
