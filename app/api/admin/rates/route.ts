import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('rate_configs')
    .select('*')
    .order('type')
    .order('name')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ rates: data })
}

export async function PATCH(req: Request) {
  const { id, net_rate, iagto_rate, resort_fee, tax_rate } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const { error } = await supabase.from('rate_configs').update({
    net_rate, iagto_rate, resort_fee, tax_rate, updated_at: new Date().toISOString()
  }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
