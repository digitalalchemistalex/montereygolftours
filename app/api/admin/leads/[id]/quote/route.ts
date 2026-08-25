import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabase
    .from('quote_drafts')
    .select('*')
    .eq('lead_id', id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()
  if (error && error.code !== 'PGRST116') return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ draft: data ?? null })
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()

  const { data: existing } = await supabase
    .from('quote_drafts')
    .select('id')
    .eq('lead_id', id)
    .eq('status', 'draft')
    .limit(1)
    .single()

  const payload = {
    lead_id: id,
    golf_items: body.golf_items ?? [],
    lodging_items: body.lodging_items ?? [],
    fb_items: body.fb_items ?? [],
    transport_items: body.transport_items ?? [],
    activity_items: body.activity_items ?? [],
    margin_pct: body.margin_pct ?? 20,
    total_pp_single_golfer: body.total_pp_single_golfer,
    total_pp_double_golfer: body.total_pp_double_golfer,
    total_pp_single_nongolfer: body.total_pp_single_nongolfer,
    total_pp_double_nongolfer: body.total_pp_double_nongolfer,
    group_total: body.group_total,
    notes: body.notes ?? '',
    updated_at: new Date().toISOString(),
  }

  let result
  if (existing) {
    result = await supabase.from('quote_drafts').update(payload).eq('id', existing.id).select().single()
  } else {
    result = await supabase.from('quote_drafts').insert(payload).select().single()
  }

  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 })
  return NextResponse.json({ draft: result.data })
}
