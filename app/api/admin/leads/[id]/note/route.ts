import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { note } = await req.json()
  if (!note?.trim()) return NextResponse.json({ error: 'Note is required' }, { status: 400 })

  const { error } = await supabase.from('activity_log').insert({
    action: 'note_added',
    entity_type: 'lead',
    entity_id: id,
    details: { note: note.trim() },
    created_by: 'admin',
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
