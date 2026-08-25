import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(req: NextRequest) {
  const { leadId, status } = await req.json()
  const valid = ['new','contacted','quoted','booked','archived']
  if (!leadId || !valid.includes(status)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  const { error } = await supabase.from('leads').update({ status }).eq('id', leadId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabase.from('activity_log').insert({
    action: 'status_changed',
    entity_type: 'lead',
    entity_id: leadId,
    details: { note: 'Status changed to ' + status },
    created_by: 'admin',
  })
  return NextResponse.json({ ok: true })
}
