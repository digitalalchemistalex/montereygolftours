import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

function getMgtsClient() {
  return createClient(process.env.MGTS_SUPABASE_URL!, process.env.MGTS_SUPABASE_SERVICE_KEY!);
}

function buildQuoteResponseHtml(opts: {
  name: string;
  hotelName: string;
  ppGg: number | null;
  action: string;
  reason: string | null;
}): string {
  const isApprove  = opts.action === "approve";
  const statusLabel = isApprove ? "APPROVED" : "DECLINED";
  const statusColor = isApprove ? "#059669" : "#DC2626";

  return (
    `<h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">Quote ${statusLabel}</h2>` +
    `<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">` +
    `<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%">Customer</td>` +
    `<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">${opts.name}</td></tr>` +
    `<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Hotel</td>` +
    `<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">${opts.hotelName || "\u2014"}</td></tr>` +
    `<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Per person</td>` +
    `<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:700">${opts.ppGg ? "$" + opts.ppGg.toLocaleString() : "\u2014"}</td></tr>` +
    `<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Status</td>` +
    `<td style="padding:8px 12px;font-size:13px;font-weight:700;color:${statusColor}">${statusLabel}</td></tr>` +
    (!isApprove
      ? `<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Reason</td>` +
        `<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">${opts.reason || "Not specified"}</td></tr>`
      : "") +
    `</table>` +
    `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px"><tr>` +
    `<td style="background:#1E3A2F;border-radius:8px">` +
    `<a href="https://golfthehighsierra.com/admin/unified-leads" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Open in Admin \u2192</a>` +
    `</td></tr></table>`
  );
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const form   = await req.formData();
  const action = form.get("action") as string;
  const reason = form.get("reason") as string | null;

  const client = getMgtsClient();

  const { data: draft, error } = await client
    .from("quote_drafts")
    .select("id,lead_id,hotel_name,pp_gg,status")
    .eq("response_token", token)
    .maybeSingle();

  if (error || !draft) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: lead } = await client
    .from("leads")
    .select("name,email")
    .eq("id", draft.lead_id)
    .maybeSingle();

  const newStatus     = action === "approve" ? "approved" : "declined";
  const newLeadStatus = action === "approve" ? "booked"   : "lost";

  await client.from("quote_responses").insert({
    lead_id: draft.lead_id, draft_id: draft.id, action, reason: reason || null,
  }).then(() => {}, () => {});

  await client.from("quote_drafts").update({
    status: newStatus,
    approved_at:   action === "approve" ? new Date().toISOString() : null,
    declined_at:   action === "decline" ? new Date().toISOString() : null,
    decline_reason: reason || null,
  }).eq("id", draft.id);

  await client.from("leads").update({ status: newLeadStatus }).eq("id", draft.lead_id);

  await client.from("activity_log").insert({
    action:      action === "approve" ? "customer_approved" : "customer_declined",
    entity_type: "lead",
    entity_id:   draft.lead_id,
    details:     { pp_gg: draft.pp_gg, hotel: draft.hotel_name, reason: reason || null },
  }).then(() => {}, () => {});

  const key = process.env.RESEND_API_KEY;
  if (key) {
    const isApprove  = action === "approve";
    const subject    = isApprove
      ? `${lead?.name || "A customer"} approved their Monterey quote`
      : `${lead?.name || "A customer"} declined their Monterey quote`;

    await sendEmail({
      to:      "info@montereygolftours.com",
      subject,
      html:    buildQuoteResponseHtml({
        name:      lead?.name     || "\u2014",
        hotelName: draft.hotel_name,
        ppGg:      draft.pp_gg,
        action,
        reason,
      }),
      key,
    });
  }

  return NextResponse.redirect(new URL(`/quote/respond/${token}?a=${action}`, req.url), 303);
}
