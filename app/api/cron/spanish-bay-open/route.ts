// app/api/cron/spanish-bay-open/route.ts
// Vercel cron: 0 7 17 4 * (7am PT, April 17 annually)
// Logo: /brand/logo-transparent-master.png circular 72px

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

const LOGO = `<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td style="vertical-align:middle;padding-right:16px;width:1%">
<a href="https://montereygolftours.com" style="display:block;text-decoration:none">
<img src="https://montereygolftours.vercel.app/brand/logo-transparent-master.png"
 alt="Monterey Golf Tours" width="72" height="72"
 style="display:block;width:72px;height:72px;object-fit:contain;border-radius:50%;border:0" /></a></td>
<td style="vertical-align:middle">
<div style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.2px;line-height:1.2">Monterey Golf Tours</div>
<div style="color:#C9A24D;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px">
Pebble Beach &middot; Carmel &middot; Monterey Peninsula</div>
</td></tr></table>`;

const EMAIL_HEADER = `<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;}
.wrap{max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
table{border-collapse:collapse;}</style></head><body><div class="wrap">
<div style="background:#1E3A2F;padding:16px 28px">${LOGO}</div>
<div style="height:3px;background:linear-gradient(90deg,#C9A24D,#B08C3A)"></div>`;

const EMAIL_FOOTER = `<div style="padding:16px 28px;font-size:11px;color:#9CA3AF;text-align:center;border-top:1px solid #E5E7EB">
Monterey Golf Tours &nbsp;&middot;&nbsp; 2700 Mill St Suite 800, Reno, NV 89502<br>
<a href="mailto:info@montereygolftours.com" style="color:#9CA3AF">info@montereygolftours.com</a>
<br><span style="font-size:10px;font-style:italic;margin-top:6px;display:inline-block">
IAGTO member. Rates and packages subject to IAGTO agreement terms.</span>
</div></div></body></html>`;

export async function GET() {
  const now   = new Date();
  const month = now.getMonth();
  const day   = now.getDate();

  if (month !== 3 || day !== 17) {
    return NextResponse.json({ skipped: true, reason: "Not April 17" });
  }

  let leadCount = 0;
  let leadRows: Array<{ name: string; email: string; group_size: string; travel_dates: string; created_at: string }> = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );
    const { data } = await supabase
      .from("leads")
      .select("name, email, group_size, travel_dates, created_at")
      .eq("referral_source", "spanish_bay_waitlist")
      .order("created_at", { ascending: true });

    leadRows  = (data ?? []) as typeof leadRows;
    leadCount = leadRows.length;
  } catch (err) {
    console.error("[spanish-bay-cron] Supabase error:", err);
  }

  const leadTable = leadRows
    .map((r, i) =>
      `${i + 1}. ${r.name} &lt;${r.email}&gt; &mdash; Group: ${r.group_size ?? "?"} &mdash; Target: ${r.travel_dates ?? "?"} &mdash; Signed up: ${new Date(r.created_at).toLocaleDateString("en-US")}`
    )
    .join("<br/>");

  const bodyHtml = `
<div style="padding:28px 32px">
<h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111">&#9971; Spanish Bay&#174; Reopens Today</h2>
<p style="margin:0 0 20px;font-size:13px;color:#6B7280">April 17, 2027 &mdash; automated cron alert</p>

<div style="background:#ECFDF5;border:1px solid #6EE7B7;border-radius:8px;padding:14px 18px;margin-bottom:24px">
  <div style="font-size:15px;font-weight:700;color:#065F46">Total waitlist leads: ${leadCount}</div>
  <div style="font-size:12px;color:#047857;margin-top:4px">Work through in order of signup (oldest first)</div>
</div>

<h3 style="font-size:13px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px">Action required</h3>
<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;margin-bottom:24px">
  <tr><td style="padding:10px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;width:28%;vertical-align:top">1. Pull waitlist</td>
  <td style="padding:10px 12px;font-size:12.5px;color:#111;border-bottom:1px solid #F3F4F6">Go to admin, filter referral_source = &lsquo;spanish_bay_waitlist&rsquo;, sort by created_at ASC.</td></tr>
  <tr><td style="padding:10px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;vertical-align:top;border-bottom:1px solid #F3F4F6">2. Contact leads</td>
  <td style="padding:10px 12px;font-size:12.5px;color:#111;border-bottom:1px solid #F3F4F6">Each lead within 24 hours. Confirm interest, group size, travel month. Earliest bookable tee time: <strong>May 17, 2027</strong>.</td></tr>
  <tr><td style="padding:10px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;vertical-align:top;border-bottom:1px solid #F3F4F6">3. PBC booking</td>
  <td style="padding:10px 12px;font-size:12.5px;color:#111;border-bottom:1px solid #F3F4F6">traveldesk@pebblebeach.com / 866.543.9306<br>Karlyn Hawke: khawke@pebblebeach.com / 831-648-7861</td></tr>
  <tr><td style="padding:10px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.4px;vertical-align:top">4. Site updates</td>
  <td style="padding:10px 12px;font-size:12.5px;color:#111">Remove CLOSED pill. Remove waitlist form. Remove &lsquo;links-at-spanish-bay&rsquo; from CLOSED_COURSE_SLUGS.</td></tr>
</table>

<h3 style="font-size:13px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px">Waitlist leads &mdash; oldest first</h3>
<div style="font-family:monospace;font-size:11.5px;line-height:2;background:#F9FAFB;padding:14px;border-radius:8px;border:1px solid #E5E7EB;color:#374151">
  ${leadTable || "No leads found &mdash; check Supabase leads table directly."}
</div>

<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px"><tr>
  <td style="background:#1E3A2F;border-radius:8px">
    <a href="https://golfthehighsierra.com/admin/unified-leads" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Open Admin &#8594;</a>
  </td>
</tr></table>
</div>`;

  const html = EMAIL_HEADER + bodyHtml + EMAIL_FOOTER;

  const RESEND_KEY   = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL ?? "info@montereygolftours.com";
  const DEV_EMAIL    = process.env.DEV_NOTIFY_EMAIL ?? "alex@golfthehighsierra.com";

  if (!RESEND_KEY) {
    console.error("[spanish-bay-cron] RESEND_API_KEY not set");
    return NextResponse.json({ success: false, error: "RESEND_API_KEY missing", leadCount });
  }

  const sendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Monterey Golf Tours <info@montereygolftours.com>",
      to: [NOTIFY_EMAIL, DEV_EMAIL],
      subject: `\u26F3 Spanish Bay\u00ae reopens TODAY \u2014 ${leadCount} waitlist leads ready to convert`,
      html,
    }),
  });

  if (!sendRes.ok) {
    const err = await sendRes.text();
    console.error("[spanish-bay-cron] Resend error:", err);
    return NextResponse.json({ success: false, error: err, leadCount });
  }

  return NextResponse.json({ success: true, leadCount });
}
