// Directive #6 — lead notification API route
// Called by QuoteForm after a successful Supabase insert.
// Fire-and-forget from the client — a failure here never blocks the lead save.
//
// Required env vars (set in Vercel dashboard):
//   RESEND_API_KEY   — get from resend.com (free tier covers this volume)
//   LEAD_NOTIFY_EMAIL — Sean's email address (where alerts go)
//
// The FROM address uses the montereygolftours.com domain which must be
// verified in Resend before production emails land. Until then, Resend
// will accept the send but may sandbox it — verify the domain first.

export const runtime = "edge";

function buildHtml(d: Record<string, unknown>): string {
  const courses = Array.isArray(d.courses_interested) ? (d.courses_interested as string[]).join(", ") || "None selected" : "—";
  const hotels  = Array.isArray(d.hotels_interested)  ? (d.hotels_interested  as string[]).join(", ") || "None selected" : "—";
  const activities = Array.isArray(d.activities_interested) ? (d.activities_interested as string[]).join(", ") || "None" : "—";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Georgia,serif;color:#2a2620;max-width:600px;margin:0 auto;padding:24px;">
  <div style="border-bottom:3px solid #c8a84b;padding-bottom:12px;margin-bottom:24px;">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#8a857a;">Monterey Golf Tours</p>
    <h1 style="margin:4px 0 0;font-size:24px;">New quote request</h1>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px;line-height:1.6;">
    <tr><td style="padding:6px 0;width:160px;color:#6a665e;vertical-align:top;">Name</td><td style="padding:6px 0;font-weight:bold;">${String(d.name || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Email</td><td style="padding:6px 0;"><a href="mailto:${String(d.email)}" style="color:#1a4f6e;">${String(d.email || "—")}</a></td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Phone</td><td style="padding:6px 0;">${String(d.phone || "Not provided")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Group size</td><td style="padding:6px 0;">${String(d.group_size || "—")} players</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Trip length</td><td style="padding:6px 0;">${String(d.trip_length || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Budget/person</td><td style="padding:6px 0;">${String(d.budget_per_person || "—")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Travel dates</td><td style="padding:6px 0;">${String(d.travel_dates || "Not specified")}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Courses</td><td style="padding:6px 0;">${courses}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Hotels</td><td style="padding:6px 0;">${hotels}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;vertical-align:top;">Activities</td><td style="padding:6px 0;">${activities}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Ground transport</td><td style="padding:6px 0;">${d.ground_transport_needed ? "Yes" : "No"}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">Non-golfer</td><td style="padding:6px 0;">${d.non_golfer_in_group ? "Yes" : "No"}</td></tr>
    <tr><td style="padding:6px 0;color:#6a665e;">How they found us</td><td style="padding:6px 0;">${String(d.referral_source || "Not specified")}</td></tr>
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
  const RESEND_KEY    = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL  = process.env.LEAD_NOTIFY_EMAIL;

  if (!RESEND_KEY || !NOTIFY_EMAIL) {
    // Env vars not configured yet — log and return 200 so the client
    // never surfaces an error to the visitor.
    console.warn("notify-lead: RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set");
    return Response.json({ ok: false, reason: "env not configured" }, { status: 200 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid json" }, { status: 400 });
  }

  const subject = `New lead: ${String(data.name || "Unknown")} — ${String(data.group_size || "?")} players, ${String(data.trip_length || "?")}`;

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
