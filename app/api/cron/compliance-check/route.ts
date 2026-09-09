import { NextResponse } from "next/server";
import { sendDevAlert } from "@/lib/dev-alert";

// PBC portal images that MUST have a credit field wherever used on site
// Any pbc-portal/ image found in source data without a credit field = violation
const PBC_PORTAL_PREFIX = "/images/pbc-portal/";

// Required text that must appear in the footer
const REQUIRED_TRADEMARK_TEXT = "trademarks, service marks and trade dress of Pebble Beach Company";
const REQUIRED_PHOTO_CREDIT_TEXT = "courtesy of Pebble Beach Company";

type Violation = {
  type: "MISSING_CREDIT" | "MISSING_TRADEMARK" | "MISSING_PHOTO_CREDIT";
  detail: string;
};

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Verify cron secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://montereygolftours.vercel.app";

  const violations: Violation[] = [];

  // 1. Check footer for required trademark + photo credit text
  try {
    const footerPage = await fetch(`${base}/`, { cache: "no-store" });
    const html = await footerPage.text();
    if (!html.includes(REQUIRED_TRADEMARK_TEXT)) {
      violations.push({
        type: "MISSING_TRADEMARK",
        detail: "Footer trademark acknowledgment text missing from homepage HTML",
      });
    }
    if (!html.includes(REQUIRED_PHOTO_CREDIT_TEXT)) {
      violations.push({
        type: "MISSING_PHOTO_CREDIT",
        detail: "Footer PBC photo credit line missing from homepage HTML",
      });
    }
  } catch (e) {
    violations.push({
      type: "MISSING_TRADEMARK",
      detail: `Could not fetch homepage to verify footer: ${e}`,
    });
  }

  // 2. Check PBC portal images on key pages for credit rendering
  const pagesToCheck = [
    { url: `${base}/golf-courses/pebble-beach-golf-links/`, name: "Pebble Beach Golf Links" },
    { url: `${base}/golf-courses/spyglass-hill-golf-course/`, name: "Spyglass Hill" },
    { url: `${base}/golf-courses/del-monte-golf-course/`, name: "Del Monte" },
    { url: `${base}/golf-courses/the-hay/`, name: "The Hay" },
    { url: `${base}/hotels/the-lodge-at-pebble-beach/`, name: "The Lodge" },
    { url: `${base}/hotels/the-inn-at-spanish-bay/`, name: "The Inn at Spanish Bay" },
    { url: `${base}/hotels/casa-palmero/`, name: "Casa Palmero" },
  ];

  for (const page of pagesToCheck) {
    try {
      const res = await fetch(page.url, { cache: "no-store" });
      const html = await res.text();
      // PBC pages must contain "Photo by" credit text in rendered HTML
      if (!html.includes("Photo by")) {
        violations.push({
          type: "MISSING_CREDIT",
          detail: `No "Photo by" credit found on ${page.name} (${page.url})`,
        });
      }
    } catch (e) {
      violations.push({
        type: "MISSING_CREDIT",
        detail: `Could not fetch ${page.name} to verify credits: ${e}`,
      });
    }
  }

  // 3. Report
  if (violations.length > 0) {
    await sendDevAlert({
      subject: `🚨 MGTS Compliance Violation — ${violations.length} issue(s) found`,
      title: "PBC Compliance Check Failed",
      body: `
        <p>The automated compliance check found <strong>${violations.length} violation(s)</strong> that must be fixed before they become a legal issue.</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <tr style="background:#f5f5f5">
            <th style="padding:8px;text-align:left;border:1px solid #ddd">Type</th>
            <th style="padding:8px;text-align:left;border:1px solid #ddd">Detail</th>
          </tr>
          ${violations.map(v => `
            <tr>
              <td style="padding:8px;border:1px solid #ddd;color:#c0392b;font-weight:600">${v.type}</td>
              <td style="padding:8px;border:1px solid #ddd">${v.detail}</td>
            </tr>
          `).join("")}
        </table>
        <p style="margin-top:16px">Fix immediately — PBC contract requires photographer credits on all portal images.</p>
      `,
    });
    return NextResponse.json({ ok: false, violations });
  }

  return NextResponse.json({ ok: true, message: "All compliance checks passed" });
}
