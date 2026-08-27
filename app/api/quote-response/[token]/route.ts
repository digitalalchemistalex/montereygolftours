import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, emailWrap } from '@/lib/gths-email';

export const dynamic = 'force-dynamic';

function getMgtsClient() {
  return createClient(process.env.MGTS_SUPABASE_URL!, process.env.MGTS_SUPABASE_SERVICE_KEY!);
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

  // Record the response
  await client.from('quote_responses').insert({
    lead_id: draft.lead_id,
    draft_id: draft.id,
    action,
    reason: reason || null,
  }).then(() => {}, () => {});

  // Update draft status
  await client.from('quote_drafts').update({
    status: newStatus,
    approved_at: action === 'approve' ? new Date().toISOString() : null,
    declined_at: action === 'decline' ? new Date().toISOString() : null,
    decline_reason: reason || null,
  }).eq('id', draft.id);

  // Update lead status
  await client.from('leads').update({
    status: newLeadStatus,
  }).eq('id', draft.lead_id);

  // Log to activity_log
  await client.from('activity_log').insert({
    action: action === 'approve' ? 'customer_approved' : 'customer_declined',
    entity_type: 'lead',
    entity_id: draft.lead_id,
    details: { pp_gg: draft.pp_gg, hotel: draft.hotel_name, reason: reason || null },
  }).then(() => {}, () => {});

  // Notify Sean
  const subject = action === 'approve'
    ? `${lead?.name || 'A customer'} approved their Monterey quote`
    : `${lead?.name || 'A customer'} declined their Monterey quote`;
  const body = action === 'approve'
    ? `<p style="font-size:14px;color:#111">${lead?.name} confirmed their Monterey Golf package — $${draft.pp_gg?.toLocaleString()}/person.</p>
       <p style="font-size:14px;color:#111">Lead moved to <strong>booked</strong>.</p>`
    : `<p style="font-size:14px;color:#111">${lead?.name} declined their Monterey Golf quote.</p>
       <p style="font-size:14px;color:#111">Reason: <strong>${reason || 'Not specified'}</strong></p>
       <p style="font-size:14px;color:#111">Lead moved to <strong>lost</strong>.</p>`;

  await sendEmail({
    to: 'sean@golfthehighsierra.com',
    subject,
    html: emailWrap(body),
  }).then(() => {}, () => {});

  return NextResponse.redirect(new URL(`/quote/respond/${token}?a=${action}`, req.url), 303);
}
