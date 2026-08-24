// Directive #6 — lead notification API route
// Updated: notify email aligned to D#15 QuoteForm fields (budget_per_person + trip_length removed)
//
// Required env vars (set in Vercel dashboard):
//   RESEND_API_KEY   — get from resend.com (free tier covers this volume)
//   LEAD_NOTIFY_EMAIL — Sean's email address (where alerts go)

export const runtime = "edge";

function buildHtml(d: Record<string, unknown>): string {
  const courses    = Array.isArray(d.courses_interested)    ? (d.courses_interested as string[]).join(", ")    || "None selected" : "—";
  const hotels     = Array.isArray(d.hotels_interested)     ? (d.hotels_interested  as string[]).join(", ")    || "None selected" : "—";
  const activities = Array.isArray(d.activities_interested) ? (d.activities_interested as string[]).join(", ") || "None"          : "—";
  const corpNeeds  = Array.isArray(d.corp_needs)            ? (d.corp_needs as string[]).join(", ")            || "—"             : "—";

  const gameLabelMap: Record<string, string> = {
    single_figures: "Single figures",
    club_golfer:    "Club golfer",
    social_golfer:  "Social golfer",
    casual:         "Casual",
  };
  const tripLabelMap: Record<string, string> = {
    golf_only:       "Golf only",
    golf_stay:       "Golf + Stay",
    full_experience: "Full experience",
    corporate:       "Corporate",
  };

  const gameLevel = d.game_level ? (gameLabelMap[d.game_level as string] ?? String(d.game_level)) : "—";
  const tripType  = d.trip_type  ? (tripLabelMap[d.trip_type   as string] ?? String(d.trip_type))  : "—";

  const isCorporate = d.trip_type === "corporate";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Georgia,serif;color:#2a2620;max-width:600px;margin:0 auto;padding:24px;">
  <div style="border-bottom:3px solid #c8a84b;padding-bottom:12px;margin-bottom:24px;text-align:center;">
    <img src="https://montereygolftours.com/brand/logo-400.png" alt="Monterey Golf Tours" width="72" height="72" style="display:block;margin:0 auto 10px;" />
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#8a857a;">Monterey Golf Tours</p>
    <h1 style="margin:4px 0 0;font-size:24px;">New quote request</h1>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px;line-height:1.6;">
    <tr><td style="padding:6px 0;width:180px;color:#6a665e;vertical-align:top;">Name</td><td style="padding:6px 0;font-weight:bold;">${String(d.name || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Email</td><td style="padding:6px 0;"><a href="mailto:${String(d.email)}" style="color:#1a4f6e;">${String(d.email || "—")}</a></td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Phone</td><td style="padding:6px 0;">${String(d.phone || "Not provided")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Contact pref</td><td style="padding:6px 0;">${[d.ok_to_call ? "📞 Call" : "", d.ok_to_text ? "💬 Text" : ""].filter(Boolean).join(" · ") || "—"}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Trip type</td><td style="padding:6px 0;">${tripType}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Game level</td><td style="padding:6px 0;">${gameLevel}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Group size</td><td style="padding:6px 0;">${String(d.group_size || "—")} golfers${d.non_golfer_in_group ? ` + ${String(d.non_golfer_count || "?")} non-golfer(s)` : ""}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Nights</td><td style="padding:6px 0;">${String(d.nights || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Travel dates</td><td style="padding:6px 0;">${String(d.travel_dates || "Not specified")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Courses</td><td style="padding:6px 0;">${courses}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Hotels</td><td style="padding:6px 0;">${d.hotel_pick_for_me ? "Pick for me" : hotels}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Activities</td><td style="padding:6px 0;">${activities}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Ground transport</td><td style="padding:6px 0;">${String(d.transport_needed || "Not specified")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Returning guest</td><td style="padding:6px 0;">${d.returning_customer ? "Yes" : "No"}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">How they found us</td><td style="padding:6px 0;">${String(d.referral_source || "Not specified")}</td></tr>
    ${isCorporate ? `
    <tr><td colspan="2" style="padding:10px 0 4px;font-weight:700;font-size:13px;color:#1a4f6e;">Corporate details</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Attendees</td><td style="padding:6px 0;">${String(d.corp_attendees || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Event type</td><td style="padding:6px 0;">${String(d.corp_event_type || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Needs</td><td style="padding:6px 0;">${corpNeeds}</td></tr>
    ` : ""}
    ${d.message ? `<tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Message</td><td style="padding:6px 0;">${String(d.message)}</td></tr>` : ""}
  </table>

  <div style="margin-top:28px;padding:16px;background:#eef6f1;border-left:3px solid #2e6b44;border-radius:4px;">
    <p style="margin:0;font-size:13px;color:#2f6b4f;">Respond within 24 hours — that&apos;s what the form promises.</p>
  </div>

  <p style="margin-top:28px;font-size:11px;color:#8a857a;">Sent by montereygolftours.com quote form</p>
</body>
</html>`;
}

export async function POST(req: Request) {
  const RESEND_KEY   = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL;

  if (!RESEND_KEY || !NOTIFY_EMAIL) {
    console.warn("notify-lead: RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set");
    return Response.json({ ok: false, reason: "env not configured" }, { status: 200 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid json" }, { status: 400 });
  }

  const tripLabel = data.trip_type === "corporate" ? "Corporate" :
                    data.trip_type === "golf_stay"  ? "Golf+Stay" :
                    data.trip_type === "full_experience" ? "Full exp" : "Golf only";

  const subject = `New lead: ${String(data.name || "Unknown")} — ${String(data.group_size || "?")} golfers · ${String(data.nights || "?")} nights · ${tripLabel}`;

  const sendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Monterey Golf Tours <notifications@montereygolftours.com>",
      to: [NOTIFY_EMAIL],
      subject,
      html: buildHtml(data),
    }),
  });

  if (!sendRes.ok) {
    const err = await sendRes.text();
    console.error("notify-lead: Resend error", sendRes.status, err);
  }

  return Response.json({ ok: sendRes.ok });
}
