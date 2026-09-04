// app/api/notify-lead/route.ts
// Sends:
//   1. Operator notification to LEAD_NOTIFY_EMAIL (Sean)
//   2. Customer confirmation to lead email address
// Uses lib/email.ts shared module.

export const runtime = "edge";

import { sendEmail, buildLeadNotificationHtml, buildLeadConfirmationHtml } from "@/lib/email";

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
