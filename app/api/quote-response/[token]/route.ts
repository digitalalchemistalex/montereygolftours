import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getMgtsClient() {
  return createClient(process.env.MGTS_SUPABASE_URL!, process.env.MGTS_SUPABASE_SERVICE_KEY!);
}

const EMAIL_HEADER = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;}.wrap{max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}table{border-collapse:collapse;}</style></head><body><div class="wrap"><div style="background:#1E3A2F;padding:20px 32px"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="vertical-align:middle;padding-right:20px;width:1%"><a href="https://montereygolftours.com" style="display:block;text-decoration:none"><img src="https://montereygolftours.com/images/mgts-logo-white.png" alt="Monterey Golf Tours" style="display:block;height:56px;width:auto;border:0" /></a></td><td style="vertical-align:middle"><div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.3px;line-height:1.2">Monterey Golf Tours</div><div style="color:#C9A24D;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px">Pebble Beach &middot; Carmel &middot; Monterey Peninsula</div></td></tr></table></div><div style="height:3px;background:linear-gradient(90deg,#C9A24D,#B08C3A)"></div>`;
const EMAIL_FOOTER = `<div style="padding:20px 32px;font-size:12px;color:#9CA3AF;text-align:center;border-top:1px solid #E5E7EB">Monterey Golf Tours &nbsp;&middot;&nbsp; 2700 Mill St Suite 800, Reno, NV 89502<br><a href="mailto:info@montereygolftours.com" style="color:#9CA3AF">info@montereygolftours.com</a></div></div></body></html>`;

async function sendNotification(subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const html = EMAIL_HEADER
    + '<div style="padding:32px">'
    + body
    + '</div>'
    + EMAIL_FOOTER;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: '"Monterey Golf Tours" <info@montereygolftours.com>',
      to: ['info@montereygolftours.com'],
      subject,
      html,
    }),
  }).catch(() => {});
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const form = await req.formData();
  const action = form.get('action') as string;
  const reason = form.get('reason') as string | null;

  const client = getMgtsClient();

  const { data: draft, error } = await client
    .from('quote_drafts')
    .select('id,lead_id,hotel_name,pp_gg,status')
    .eq('response_token', token)
    .maybeSingle();

  if (error || !draft) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: lead } = await client.from('leads').select('name,email').eq('id', draft.lead_id).maybeSingle();

  const newStatus = action === 'approve' ? 'approved' : 'declined';
  const newLeadStatus = action === 'approve' ? 'booked' : 'lost';

  await client.from('quote_responses').insert({
    lead_id: draft.lead_id, draft_id: draft.id, action, reason: reason || null,
  }).then(() => {}, () => {});

  await client.from('quote_drafts').update({
    status: newStatus,
    approved_at: action === 'approve' ? new Date().toISOString() : null,
    declined_at: action === 'decline' ? new Date().toISOString() : null,
    decline_reason: reason || null,
  }).eq('id', draft.id);

  await client.from('leads').update({ status: newLeadStatus }).eq('id', draft.lead_id);

  await client.from('activity_log').insert({
    action: action === 'approve' ? 'customer_approved' : 'customer_declined',
    entity_type: 'lead', entity_id: draft.lead_id,
    details: { pp_gg: draft.pp_gg, hotel: draft.hotel_name, reason: reason || null },
  }).then(() => {}, () => {});

  const isApprove = action === 'approve';
  const subject = isApprove
    ? `${lead?.name || 'A customer'} approved their Monterey quote`
    : `${lead?.name || 'A customer'} declined their Monterey quote`;

  const statusColor = isApprove ? '#059669' : '#DC2626';
  const statusLabel = isApprove ? 'APPROVED' : 'DECLINED';
  const body = '<h2 style="margin:0 0 16px;font-size:22px;font-weight:800;color:#111">'
    + 'Quote ' + statusLabel + '</h2>'
    + '<table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">'
    + '<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%">Customer</td>'
    + '<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">' + (lead?.name || '—') + '</td></tr>'
    + '<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Hotel</td>'
    + '<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">' + (draft.hotel_name || '—') + '</td></tr>'
    + '<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Per Person</td>'
    + '<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:700">$' + (draft.pp_gg?.toLocaleString() || '—') + '</td></tr>'
    + '<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Status</td>'
    + '<td style="padding:8px 12px;font-size:13px;font-weight:700;color:' + statusColor + '">' + statusLabel + '</td></tr>'
    + (isApprove ? '' : '<tr><td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Reason</td>'
    + '<td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">' + (reason || 'Not specified') + '</td></tr>')
    + '</table>'
    + '<table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px"><tr>'
    + '<td style="background:#1E3A2F;border-radius:8px">'
    + '<a href="https://golfthehighsierra.com/admin/unified-leads" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Open in Admin →</a>'
    + '</td></tr></table>';

  await sendNotification(subject, body);

  return NextResponse.redirect(new URL(`/quote/respond/${token}?a=${action}`, req.url), 303);
}
