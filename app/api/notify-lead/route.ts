// app/api/notify-lead/route.ts
// Sends:
//   1. Operator notification to LEAD_NOTIFY_EMAIL (Sean)
//   2. Customer confirmation to lead email address
// Uses lib/email.ts shared module.

export const runtime = "edge";

import { sendEmail, buildLeadNotificationHtml, buildLeadConfirmationHtml } from "@/lib/email";
import { sendDevAlert } from "@/lib/dev-alert";

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

  // Health check probe — just confirm route is alive
  if (data._healthcheck) {
    return Response.json({ ok: true, healthcheck: true });
  }

  const tripLabel =
    data.trip_type === "corporate" ? "Corporate" :
    data.trip_type === "golf_stay" ? "Golf+Stay" :
    data.trip_type === "full_experience" ? "Full exp" : "Golf only";

  // 1. Operator email
  const subject = `New lead: ${String(data.name || "Unknown")} \u2014 ${String(data.group_size || "?")} golfers \u00b7 ${String(data.nights || "?")} nights \u00b7 ${tripLabel}`;
  const adminUrl = "https://golfthehighsierra.com/admin/unified-leads";

  const opResult = await sendEmail({
    to: NOTIFY_EMAIL,
    subject,
    html: buildLeadNotificationHtml(data, adminUrl),
    key: RESEND_KEY,
  });

  if (!opResult.ok) {
    console.error("notify-lead: operator email failed", opResult.error);
    // Alert dev immediately — Sean won't know about the lead
    await sendDevAlert({
      subject: "🚨 MGTS Lead email FAILED — Sean did not receive notification",
      title: "Lead email delivery failure",
      body: `
        <p><strong>A lead was submitted but the operator notification email failed to send.</strong></p>
        <p>Sean has NOT been notified. The lead IS saved in Supabase.</p>
        <table style="font-size:13px;border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#666;width:120px">Lead name</td><td>${String(data.name || "Unknown")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td>${String(data.email || "none")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Group size</td><td>${String(data.group_size || "?")}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Resend error</td><td style="color:#c0392b">${opResult.error ?? "unknown"}</td></tr>
        </table>
        <p style="margin-top:16px">
          <a href="https://golfthehighsierra.com/admin/unified-leads"
             style="background:#1E3A2F;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px">
            View lead in Admin →
          </a>
        </p>
      `,
    }).catch(() => {}); // never let alert failure break the response
  }

  // 2. Customer confirmation (only if email present)
  const customerEmail = String(data.email || "").trim();
  let custResult: { ok: boolean; id?: string; error?: string } | null = null;

  if (customerEmail && customerEmail.includes("@")) {
    const custSubject = `We got your Monterey golf trip request`;
    custResult = await sendEmail({
      to: customerEmail,
      subject: custSubject,
      html: buildLeadConfirmationHtml(data),
      key: RESEND_KEY,
    });
    if (!custResult.ok) {
      console.error("notify-lead: customer confirmation failed", custResult.error);
    }
  }

  return Response.json({
    ok: opResult.ok,
    operator_id: opResult.id,
    customer_ok: custResult?.ok ?? null,
    customer_id: custResult?.id ?? null,
  });
}
