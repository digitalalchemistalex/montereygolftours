// lib/email.ts — Monterey Golf Tours shared email module
// Uses Resend API directly (edge-compatible raw fetch).
// All emails: from info@montereygolftours.com, to LEAD_NOTIFY_EMAIL or customer.

const RESEND_API = "https://api.resend.com/emails";
const FROM = "Monterey Golf Tours <info@montereygolftours.com>";
const SITE = "https://montereygolftours.com";
const LOGO_URL = "https://montereygolftours.vercel.app/brand/logo-transparent-master.png";

export const HEADER = `<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body{margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;}
  .wrap{max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
  table{border-collapse:collapse;}
</style>
</head><body><div class="wrap">
<div style="background:#1E3A2F;padding:16px 28px">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
    <td style="vertical-align:middle;padding-right:16px;width:1%">
      <a href="${SITE}" style="display:block;text-decoration:none">
        <img src="${LOGO_URL}" alt="Monterey Golf Tours" width="72" height="72"
             style="display:block;width:72px;height:72px;object-fit:contain;border-radius:50%;border:0"/>
      </a>
    </td>
    <td style="vertical-align:middle">
      <div style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.2px;line-height:1.2">Monterey Golf Tours</div>
      <div style="color:#C9A24D;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px">
        Pebble Beach &middot; Carmel &middot; Monterey Peninsula
      </div>
    </td>
  </tr></table>
</div>
<div style="height:3px;background:linear-gradient(90deg,#C9A24D,#B08C3A)"></div>`;

export const FOOTER = `
<div style="padding:16px 28px;font-size:11px;color:#9CA3AF;text-align:center;border-top:1px solid #E5E7EB">
  Monterey Golf Tours &nbsp;&middot;&nbsp; 2700 Mill St Suite 800, Reno, NV 89502<br>
  <a href="mailto:info@montereygolftours.com" style="color:#9CA3AF">info@montereygolftours.com</a>
  &nbsp;&middot;&nbsp; <a href="tel:18662787010" style="color:#9CA3AF">(866) 278-7010</a><br>
  <span style="font-size:10px;color:#D1D5DB">
    You received this because you submitted an inquiry at montereygolftours.com.
    This is a transactional email confirming your request.
  </span>
</div>
</div></body></html>`;

export type SendResult = { ok: boolean; id?: string; error?: string };

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  key: string;
}): Promise<SendResult> {
  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: { Authorization: `Bearer ${opts.key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: HEADER + '<div style="padding:28px 32px">' + opts.html + '</div>' + FOOTER,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: err };
    }
    const d = await res.json() as { id?: string };
    return { ok: true, id: d.id };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/** Internal notification to Sean — full lead detail */
export function buildLeadNotificationHtml(d: Record<string, unknown>, adminUrl: string): string {
  function R(label: string, val: string, highlight = false): string {
    if (!val || val === "undefined" || val === "\u2014" || val === "No" || val === "Not specified") return "";
    if (highlight) return `<tr>
      <td style="padding:8px 12px;background:#ECFDF5;font-size:11px;color:#065F46;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#059669;font-weight:700">${val}</td>
    </tr>`;
    return `<tr>
      <td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">${val}</td>
    </tr>`;
  }

  const courses    = Array.isArray(d.courses_interested)    ? (d.courses_interested as string[]).join(", ")    || "\u2014" : "\u2014";
  const hotels     = Array.isArray(d.hotels_interested)     ? (d.hotels_interested  as string[]).join(", ")    || "\u2014" : "\u2014";
  const activities = Array.isArray(d.activities_interested) ? (d.activities_interested as string[]).join(", ") || "\u2014" : "\u2014";
  const corpNeeds  = Array.isArray(d.corp_needs)            ? (d.corp_needs as string[]).join(", ")            || "\u2014" : "\u2014";

  const gameLabelMap: Record<string, string> = {
    single_figures: "Single figures", club_golfer: "Club golfer",
    social_golfer: "Social golfer", casual: "Casual",
  };
  const tripLabelMap: Record<string, string> = {
    golf_only: "Golf only", golf_stay: "Golf + Stay",
    full_experience: "Full experience", corporate: "Corporate",
  };

  const gameLevel  = d.game_level ? (gameLabelMap[d.game_level as string] ?? String(d.game_level)) : "";
  const tripType   = d.trip_type  ? (tripLabelMap[d.trip_type   as string] ?? String(d.trip_type))  : "";
  const isCorp     = d.trip_type === "corporate";
  const name       = String(d.name  || "\u2014");
  const email      = String(d.email || "");
  const phone      = String(d.phone || "");
  const okToCall   = d.ok_to_call !== false;
  const okToText   = d.ok_to_text !== false;

  const phoneBtn = phone
    ? `<td width="12"></td><td style="border:1px solid #E5E7EB;border-radius:8px"><a href="tel:${phone}" style="display:inline-block;padding:12px 24px;color:#374151;text-decoration:none;font-size:14px;font-weight:600">&#128222; Call Now</a></td>`
    : "";

  const rows = [
    R("Name",  `<strong>${name}</strong>`),
    R("Phone", phone ? `<a href="tel:${phone}" style="color:#1E3A2F;font-weight:700;text-decoration:none">${phone}</a>` : ""),
    R("Email", email ? `<a href="mailto:${email}" style="color:#1E3A2F;text-decoration:none">${email}</a>` : ""),
    R("Group Size", d.group_size ? `${String(d.group_size)} golfers${d.non_golfer_in_group ? ` + ${String(d.non_golfer_count || "?")} non-golfer(s)` : ""}` : ""),
    R("Trip Type",  tripType),
    R("Game Level", gameLevel),
    R("Nights",     String(d.nights || "")),
    R("Travel Dates", String(d.travel_dates || "")),
    R("Courses",    courses === "\u2014" ? "" : courses),
    R("Hotels",     d.hotel_pick_for_me ? "Pick for me" : (hotels === "\u2014" ? "" : hotels)),
    R("Activities", activities === "\u2014" ? "" : activities),
    R("Rounds / Golfer", String(d.rounds_per_golfer || "")),
    R("Tee Time 1", d.tee_time_pref_1 ? String(d.tee_time_pref_1).replace(/_/g, " ") : ""),
    R("Tee Time 2", d.tee_time_pref_2 ? String(d.tee_time_pref_2).replace(/_/g, " ") : ""),
    R("Room Config", String(d.room_config || "")),
    R("Caddies",    String(d.caddie_option || "")),
    R("Flying Into", String(d.arrival_airport || "")),
    R("Ground Transport", String(d.transport_needed || "")),
    R("Returning Guest", d.returning_customer ? "Yes" : ""),
    R("How Found Us", String(d.referral_source || "")),
    ...(isCorp ? [
      R("Corp Attendees",  String(d.corp_attendees || "")),
      R("Corp Event Type", String(d.corp_event_type || "")),
      R("Corp Needs", corpNeeds === "\u2014" ? "" : corpNeeds),
    ] : []),
    R("Special Requests", String(d.message || "")),
    okToCall ? R("OK to Call", "\ud83d\udcde Yes \u2014 call them", true) : "",
    okToText  ? R("OK to Text", "\ud83d\udcac Yes \u2014 text them", true) : "",
  ].join("");

  return `<h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#111">New Lead \u2014 Call Required</h2>
<p style="margin:0 0 20px;font-size:13px;color:#6B7280">montereygolftours.com \u00b7 ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
<div style="font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Lead Details</div>
<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">${rows}</table>
<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px"><tr>
  <td style="background:#1E3A2F;border-radius:8px">
    <a href="${adminUrl}" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Open in Admin \u2192</a>
  </td>
  ${phoneBtn}
</tr></table>`;
}

/** Customer confirmation email — sent after quote form submission */
export function buildLeadConfirmationHtml(d: Record<string, unknown>): string {
  const name    = String(d.name  || "there");
  const courses = Array.isArray(d.courses_interested)
    ? (d.courses_interested as string[]).slice(0, 3).join(", ")
    : "";
  const nights  = d.nights ? `${String(d.nights)}-night` : "";
  const size    = d.group_size ? `${String(d.group_size)}-person` : "";
  const tripDesc = [size, nights].filter(Boolean).join(" ") || "group golf";

  return `<h2 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#111">We got your request, ${name}.</h2>
<p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.6">
  Thanks for reaching out about a ${tripDesc} trip to the Monterey Peninsula.
  We\u2019ll review your details and come back to you within 24 hours with a custom quote.
</p>
${courses ? `<p style="margin:0 0 20px;font-size:14px;color:#6B7280">
  <strong>Courses you\u2019re interested in:</strong> ${courses}${Array.isArray(d.courses_interested) && (d.courses_interested as string[]).length > 3 ? "\u2026" : ""}
</p>` : ""}
<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;margin-bottom:24px">
  <tr>
    <td style="padding:12px 16px;background:#F9FAFB;font-size:12px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:40%">What happens next</td>
    <td style="padding:12px 16px;font-size:14px;color:#111">We build your custom itinerary and quote within 24 hours</td>
  </tr>
  <tr>
    <td style="padding:12px 16px;background:#F9FAFB;font-size:12px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Questions?</td>
    <td style="padding:12px 16px;font-size:14px;color:#111">
      Call or text us: <a href="tel:18662787010" style="color:#1E3A2F;font-weight:700;text-decoration:none">(866) 278-7010</a>
    </td>
  </tr>
</table>
<table cellpadding="0" cellspacing="0" border="0"><tr>
  <td style="background:#1E3A2F;border-radius:8px">
    <a href="https://montereygolftours.com" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Back to site \u2192</a>
  </td>
</tr></table>`;
}
