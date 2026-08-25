import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const SITE_URL = 'https://montereygolftours.vercel.app'
const IAGTO_FOOTER = 'This quote is prepared in accordance with our IAGTO membership agreement. All rates are per person unless stated otherwise. Subject to availability at time of booking.'

function buildEmailHtml(lead: Record<string, unknown>, draft: Record<string, unknown>, groupSize: number): string {
  const golf = (draft.golf_items as Record<string,unknown>[]) ?? []
  const lodging = (draft.lodging_items as Record<string,unknown>[]) ?? []
  const fb = (draft.fb_items as Record<string,unknown>[]) ?? []
  const transport = (draft.transport_items as Record<string,unknown>[]) ?? []
  const activities = (draft.activity_items as Record<string,unknown>[]) ?? []
  const margin = Number(draft.margin_pct ?? 20) / 100

  function sectionHtml(title: string, items: Record<string,unknown>[], cols: string[]) {
    if (!items.length) return ''
    const rows = items.map(item =>
      '<tr>' + cols.map(c => '<td style="padding:8px 12px;border-bottom:1px solid #f3f4f6;font-size:13px;color:#374151">' + String(item[c] ?? '—') + '</td>').join('') + '</tr>'
    ).join('')
    return '<h3 style="font-size:14px;font-weight:600;color:#111827;margin:24px 0 8px">' + title + '</h3><table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;border:1px solid #e5e7eb"><tbody>' + rows + '</tbody></table>'
  }

  const totalPP = Number(draft.total_pp_single_golfer ?? 0)
  const totalGroup = Number(draft.group_total ?? 0)

  return '<div style="font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;max-width:680px;margin:0 auto;background:#f9fafb;padding:32px 24px">' +
    '<div style="background:white;border-radius:16px;padding:32px;border:1px solid #e5e7eb">' +
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:28px">' +
    '<svg width="32" height="32" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#2d6a4f"/><path d="M8 16 Q14 8 20 16" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="14" cy="18" r="2.5" fill="white"/></svg>' +
    '<div><div style="font-size:16px;font-weight:700;color:#111827">Monterey Golf Tours</div><div style="font-size:12px;color:#9ca3af">Custom Trip Quote</div></div></div>' +
    '<h1 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 8px;letter-spacing:-0.5px">Your Monterey Golf Trip Quote</h1>' +
    '<p style="font-size:14px;color:#6b7280;margin:0 0 24px">Dear ' + String(lead.name ?? 'Guest') + ', thank you for your interest in a Monterey golf experience. Here is your personalised quote.</p>' +
    '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin-bottom:24px">' +
    '<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">' +
    '<div><div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Per Person (Single)</div><div style="font-size:28px;font-weight:700;color:#111827">$' + totalPP.toLocaleString() + '</div></div>' +
    '<div><div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Group Total (' + groupSize + ' golfers)</div><div style="font-size:28px;font-weight:700;color:#111827">$' + totalGroup.toLocaleString() + '</div></div>' +
    '</div></div>' +
    sectionHtml('Golf', golf, ['course', 'rounds', 'description']) +
    sectionHtml('Accommodation', lodging, ['hotel', 'nights', 'room_type', 'description']) +
    sectionHtml('Food & Beverage', fb, ['description', 'headcount']) +
    sectionHtml('Transport', transport, ['description', 'type']) +
    sectionHtml('Activities', activities, ['description']) +
    (draft.notes ? '<div style="margin-top:24px;padding:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px"><p style="font-size:13px;color:#374151;margin:0">' + String(draft.notes) + '</p></div>' : '') +
    '<div style="margin-top:32px;padding-top:20px;border-top:1px solid #e5e7eb">' +
    '<p style="font-size:13px;color:#374151;margin:0 0 12px">Ready to confirm your trip? Reply to this email or call us directly.</p>' +
    '<a href="' + SITE_URL + '/quote" style="display:inline-block;background:#2d6a4f;color:white;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">Request Booking Confirmation</a>' +
    '</div>' +
    '<div style="margin-top:24px;padding-top:16px;border-top:1px solid #f3f4f6">' +
    '<p style="font-size:11px;color:#9ca3af;margin:0;line-height:1.6">' + IAGTO_FOOTER + '</p>' +
    '</div></div></div>'
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { draftId } = await req.json()
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 })

  const { data: lead } = await supabase.from('leads').select('*').eq('id', id).single()
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 })

  const { data: draft } = await supabase.from('quote_drafts').select('*').eq('id', draftId).single()
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 })

  const groupSize = parseInt(String(lead.group_size ?? '1'), 10) || 1
  const html = buildEmailHtml(lead as Record<string,unknown>, draft as Record<string,unknown>, groupSize)

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Sean Schaeffer <sean@montereygolftours.com>',
      to: [lead.email as string],
      subject: 'Your Monterey Golf Tour Quote — ' + String(lead.name),
      html,
    }),
  })

  if (!emailRes.ok) {
    const err = await emailRes.text()
    return NextResponse.json({ error: 'Email failed: ' + err }, { status: 500 })
  }

  await supabase.from('quote_drafts').update({ status: 'sent', sent_at: new Date().toISOString() }).eq('id', draftId)
  await supabase.from('activity_log').insert({
    action: 'quote_sent',
    entity_type: 'lead',
    entity_id: id,
    details: { note: 'Quote emailed to ' + String(lead.email), draft_id: draftId },
    created_by: 'admin',
  })

  return NextResponse.json({ ok: true })
}
