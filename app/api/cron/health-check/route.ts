// app/api/cron/health-check/route.ts
// Runs every 30 minutes — tests every critical system and emails dev if anything fails silently
// Covers: QuoteForm pipeline, notify-lead, weather API, GTHS/TripCaddie API, Supabase connectivity,
//         Spanish Bay waitlist, all key page routes returning 200

import { NextResponse } from "next/server";
import { sendDevAlert } from "@/lib/dev-alert";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Check = {
  name: string;
  ok: boolean;
  detail: string;
  critical: boolean; // if true, lead/revenue impact
};

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = "https://montereygolftours.vercel.app";
  const checks: Check[] = [];

  // ─── 1. Supabase connectivity ──────────────────────────────────────────────
  // If Supabase is down, leads are lost silently — QuoteForm writes there first
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/leads?select=id&limit=1`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        cache: "no-store",
      }
    );
    checks.push({
      name: "Supabase (leads table)",
      ok: res.ok,
      detail: res.ok ? `HTTP ${res.status}` : `HTTP ${res.status} — leads will be lost if QuoteForm submits`,
      critical: true,
    });
  } catch (e) {
    checks.push({ name: "Supabase (leads table)", ok: false, detail: `Connection failed: ${e}`, critical: true });
  }

  // ─── 2. Resend / notify-lead email pipeline ────────────────────────────────
  // Hit the API with a dry-run flag — check it responds without 500
  try {
    const res = await fetch(`${base}/api/notify-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _healthcheck: true, name: "Health Check", email: "health@check.internal" }),
      cache: "no-store",
    });
    // 200 = env vars set and route alive (even if it skips sending for _healthcheck)
    // 500 = broken
    checks.push({
      name: "notify-lead API",
      ok: res.status < 500,
      detail: res.status < 500 ? `HTTP ${res.status}` : `HTTP ${res.status} — Sean and customer emails broken`,
      critical: true,
    });
  } catch (e) {
    checks.push({ name: "notify-lead API", ok: false, detail: `Route unreachable: ${e}`, critical: true });
  }

  // ─── 3. Weather API (Open-Meteo) ──────────────────────────────────────────
  try {
    const res = await fetch(`${base}/api/weather`, { cache: "no-store" });
    const json = await res.json().catch(() => null);
    const ok = res.ok && json && Array.isArray(json);
    checks.push({
      name: "Weather API",
      ok,
      detail: ok ? "OK — fog intel returning" : `HTTP ${res.status} — weather widget broken on site`,
      critical: false,
    });
  } catch (e) {
    checks.push({ name: "Weather API", ok: false, detail: `Failed: ${e}`, critical: false });
  }

  // ─── 4. GTHS / TripCaddie API ─────────────────────────────────────────────
  try {
    const res = await fetch(
      "https://golfthehighsierra.com/trips-caddie/api/api-trips.php?region=Monterey&limit=1",
      { cache: "no-store" }
    );
    const ok = res.ok;
    checks.push({
      name: "GTHS TripCaddie API",
      ok,
      detail: ok ? `HTTP ${res.status}` : `HTTP ${res.status} — past trips / caddie pages broken`,
      critical: false,
    });
  } catch (e) {
    checks.push({ name: "GTHS TripCaddie API", ok: false, detail: `Unreachable: ${e}`, critical: false });
  }

  // ─── 5. Key page routes — all must return 200 ────────────────────────────
  const pages = [
    { path: "/", name: "Homepage", critical: true },
    { path: "/quote/", name: "Quote page", critical: true },
    { path: "/golf-courses/pebble-beach-golf-links/", name: "PBGL course page", critical: true },
    { path: "/golf-courses/spyglass-hill-golf-course/", name: "Spyglass course page", critical: false },
    { path: "/golf-courses/tpc-monterey-at-pasadera/", name: "Pasadera course page", critical: false },
    { path: "/hotels/the-lodge-at-pebble-beach/", name: "Lodge hotel page", critical: false },
    { path: "/itineraries/", name: "Itineraries page", critical: false },
    { path: "/experiences/", name: "Experiences page", critical: false },
    { path: "/golf-courses/the-links-at-spanish-bay/", name: "Spanish Bay page", critical: false },
    { path: "/blog/", name: "Blog index", critical: false },
    { path: "/about/", name: "About page", critical: false },
    { path: "/contact/", name: "Contact page", critical: false },
  ];

  await Promise.all(
    pages.map(async (p) => {
      try {
        const res = await fetch(`${base}${p.path}`, { cache: "no-store" });
        checks.push({
          name: `Page: ${p.name}`,
          ok: res.status === 200,
          detail: res.status === 200 ? "200 OK" : `HTTP ${res.status}`,
          critical: p.critical,
        });
      } catch (e) {
        checks.push({ name: `Page: ${p.name}`, ok: false, detail: `Unreachable: ${e}`, critical: p.critical });
      }
    })
  );

  // ─── Report ───────────────────────────────────────────────────────────────
  const failures = checks.filter((c) => !c.ok);
  const criticalFailures = failures.filter((c) => c.critical);

  if (failures.length > 0) {
    const rows = failures
      .map(
        (c) => `
        <tr style="background:${c.critical ? "#fff5f5" : "#fffdf0"}">
          <td style="padding:8px;border:1px solid #ddd;font-weight:600;color:${c.critical ? "#c0392b" : "#e67e22"}">${c.critical ? "🚨 CRITICAL" : "⚠️ WARNING"}</td>
          <td style="padding:8px;border:1px solid #ddd">${c.name}</td>
          <td style="padding:8px;border:1px solid #ddd;font-size:12px">${c.detail}</td>
        </tr>`
      )
      .join("");

    await sendDevAlert({
      subject: `${criticalFailures.length > 0 ? "🚨 CRITICAL" : "⚠️ WARNING"} MGTS Health Check — ${failures.length} failure(s)`,
      title: `${failures.length} system(s) failing on MontereyGolfTours.com`,
      body: `
        <p>${criticalFailures.length > 0
          ? `<strong style="color:#c0392b">${criticalFailures.length} CRITICAL failure(s) — leads may be lost or pages are down.</strong>`
          : `${failures.length} non-critical failure(s) detected.`
        }</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:12px">
          <tr style="background:#f5f5f5">
            <th style="padding:8px;text-align:left;border:1px solid #ddd;width:120px">Severity</th>
            <th style="padding:8px;text-align:left;border:1px solid #ddd">System</th>
            <th style="padding:8px;text-align:left;border:1px solid #ddd">Detail</th>
          </tr>
          ${rows}
        </table>
        <p style="margin-top:16px;font-size:12px">
          All checks: ${checks.length} · Passed: ${checks.length - failures.length} · Failed: ${failures.length}
        </p>
      `,
    });
  }

  return NextResponse.json({
    ok: failures.length === 0,
    total: checks.length,
    passed: checks.length - failures.length,
    failed: failures.length,
    critical_failures: criticalFailures.length,
    failures: failures.map((c) => ({ name: c.name, detail: c.detail, critical: c.critical })),
  });
}
