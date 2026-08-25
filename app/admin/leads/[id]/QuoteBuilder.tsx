'use client'

import { useState, useEffect, useCallback } from 'react'

interface RateConfig {
  id: string; slug: string; name: string; type: string;
  is_pbc: boolean; net_rate: number | null; iagto_rate: number | null;
  tax_rate: number; resort_fee: number; closed_until: string | null;
}

interface GolfItem { course: string; slug: string; rounds: number; net_rate: number; tax_rate: number; description: string }
interface LodgingItem { hotel: string; slug: string; nights: number; rooms: number; nightly_rate: number; tax_rate: number; resort_fee: number; room_type: string; description: string }
interface SimpleItem { description: string; cost_pp: number; headcount?: number; type?: string }

interface Draft {
  id?: string; golf_items: GolfItem[]; lodging_items: LodgingItem[];
  fb_items: SimpleItem[]; transport_items: SimpleItem[]; activity_items: SimpleItem[];
  margin_pct: number; notes: string;
  total_pp_single_golfer?: number; total_pp_double_golfer?: number;
  total_pp_single_nongolfer?: number; total_pp_double_nongolfer?: number;
  group_total?: number;
}

const CLOSED = ['links-at-spanish-bay']
const PBC = ['pebble-beach-golf-links','spyglass-hill','del-monte-golf-course','links-at-spanish-bay']

function currency(n: number) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }

function calcTotals(draft: Draft, groupSize: number, nonGolfers: number) {
  const margin = 1 + draft.margin_pct / 100
  const golfers = Math.max(1, groupSize - nonGolfers)

  let golfCostPerGolfer = 0
  for (const g of draft.golf_items) {
    const rate = g.net_rate || 0
    const tax = rate * (g.tax_rate / 100)
    golfCostPerGolfer += (rate + tax) * g.rounds
  }

  let lodgingCostPerRoom = 0
  for (const l of draft.lodging_items) {
    const rate = l.nightly_rate || 0
    const tot = rate * (l.tax_rate / 100)
    const resortFee = l.resort_fee || 0
    lodgingCostPerRoom += (rate + tot + resortFee) * l.nights
  }
  const totalRooms = draft.lodging_items.reduce((a, l) => a + (l.rooms || 1), 0)
  const lodgingPerPax = totalRooms > 0 ? lodgingCostPerRoom / totalRooms : 0

  let sharedCostPP = 0
  for (const item of [...draft.fb_items, ...draft.transport_items, ...draft.activity_items]) {
    sharedCostPP += item.cost_pp || 0
  }

  const totalNetPP = golfCostPerGolfer + lodgingPerPax + sharedCostPP
  const singleGolfer = Math.ceil(totalNetPP * margin)
  const doubleGolfer = Math.ceil((golfCostPerGolfer + lodgingPerPax / 2 + sharedCostPP) * margin)
  const singleNonGolfer = Math.ceil((lodgingPerPax + sharedCostPP) * margin)
  const doubleNonGolfer = Math.ceil((lodgingPerPax / 2 + sharedCostPP) * margin)
  const groupTotal = Math.ceil(singleGolfer * golfers + (nonGolfers > 0 ? singleNonGolfer * nonGolfers : 0))

  return { singleGolfer, doubleGolfer, singleNonGolfer, doubleNonGolfer, groupTotal }
}

export default function QuoteBuilder({
  leadId, groupSize, nonGolfers, rawPayload
}: {
  leadId: string; groupSize: number; nonGolfers: number; rawPayload: Record<string,unknown> | null
}) {
  const [rates, setRates] = useState<RateConfig[]>([])
  const [draft, setDraft] = useState<Draft>({
    golf_items: [], lodging_items: [], fb_items: [], transport_items: [], activity_items: [],
    margin_pct: 20, notes: '',
  })
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')
  const [loaded, setLoaded] = useState(false)

  const golfRates = rates.filter(r => r.type === 'golf')
  const hotelRates = rates.filter(r => r.type === 'hotel')
  const totals = calcTotals(draft, groupSize, nonGolfers)

  useEffect(() => {
    fetch('/api/admin/rates').then(r => r.json()).then(d => setRates(d.rates ?? []))
    fetch('/api/admin/leads/' + leadId + '/quote').then(r => r.json()).then(d => {
      if (d.draft) setDraft(d.draft)
      setLoaded(true)
    })
  }, [leadId])

  const save = useCallback(async (d: Draft) => {
    setSaving(true)
    const totals = calcTotals(d, groupSize, nonGolfers)
    const res = await fetch('/api/admin/leads/' + leadId + '/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...d,
        total_pp_single_golfer: totals.singleGolfer,
        total_pp_double_golfer: totals.doubleGolfer,
        total_pp_single_nongolfer: totals.singleNonGolfer,
        total_pp_double_nongolfer: totals.doubleNonGolfer,
        group_total: totals.groupTotal,
      }),
    })
    const data = await res.json()
    if (data.draft?.id) setDraft(prev => ({ ...prev, id: data.draft.id }))
    setSaving(false)
    return data.draft?.id
  }, [leadId, groupSize, nonGolfers])

  async function sendQuote() {
    setSending(true)
    setMsg('')
    const draftId = draft.id ?? await save(draft)
    if (!draftId) { setMsg('Save draft first'); setSending(false); return }
    const res = await fetch('/api/admin/leads/' + leadId + '/send-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draftId }),
    })
    const data = await res.json()
    setSending(false)
    setMsg(data.ok ? '✅ Quote sent!' : '❌ ' + (data.error ?? 'Failed'))
    setTimeout(() => setMsg(''), 4000)
  }

  function addGolfItem(rate: RateConfig) {
    const item: GolfItem = {
      course: rate.name, slug: rate.slug, rounds: 1,
      net_rate: rate.net_rate ?? 0, tax_rate: rate.tax_rate,
      description: '',
    }
    const next = { ...draft, golf_items: [...draft.golf_items, item] }
    setDraft(next); save(next)
  }

  function addLodgingItem(rate: RateConfig) {
    const item: LodgingItem = {
      hotel: rate.name, slug: rate.slug, nights: 2, rooms: 1,
      nightly_rate: rate.net_rate ?? 0, tax_rate: rate.tax_rate,
      resort_fee: rate.resort_fee, room_type: 'King', description: '',
    }
    const next = { ...draft, lodging_items: [...draft.lodging_items, item] }
    setDraft(next); save(next)
  }

  function updateGolf(i: number, field: string, value: string | number) {
    const items = draft.golf_items.map((g, idx) => idx === i ? { ...g, [field]: value } : g)
    const next = { ...draft, golf_items: items }
    setDraft(next); save(next)
  }

  function updateLodging(i: number, field: string, value: string | number) {
    const items = draft.lodging_items.map((l, idx) => idx === i ? { ...l, [field]: value } : l)
    const next = { ...draft, lodging_items: items }
    setDraft(next); save(next)
  }

  function removeGolf(i: number) {
    const next = { ...draft, golf_items: draft.golf_items.filter((_, idx) => idx !== i) }
    setDraft(next); save(next)
  }

  function removeLodging(i: number) {
    const next = { ...draft, lodging_items: draft.lodging_items.filter((_, idx) => idx !== i) }
    setDraft(next); save(next)
  }

  function addSimple(key: 'fb_items' | 'transport_items' | 'activity_items') {
    const next = { ...draft, [key]: [...draft[key], { description: '', cost_pp: 0 }] }
    setDraft(next); save(next)
  }

  function updateSimple(key: 'fb_items' | 'transport_items' | 'activity_items', i: number, field: string, value: string | number) {
    const items = (draft[key] as SimpleItem[]).map((item, idx) => idx === i ? { ...item, [field]: value } : item)
    const next = { ...draft, [key]: items }
    setDraft(next); save(next)
  }

  function removeSimple(key: 'fb_items' | 'transport_items' | 'activity_items', i: number) {
    const next = { ...draft, [key]: (draft[key] as SimpleItem[]).filter((_, idx) => idx !== i) }
    setDraft(next); save(next)
  }

  const inputStyle = {
    padding: '6px 10px', border: '1px solid #d1d5db', borderRadius: '6px',
    fontSize: '13px', color: '#111827', background: 'white', fontFamily: 'inherit', outline: 'none',
  }

  const labelStyle = { fontSize: '11px', color: '#9ca3af', fontWeight: '600' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }

  if (!loaded) return <div style={{ padding: '32px', color: '#9ca3af', fontSize: '14px' }}>Loading quote builder…</div>

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", sans-serif' }}>

      {/* Totals banner */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <p style={labelStyle}>Per Person (Single)</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0, letterSpacing: '-1px' }}>{currency(totals.singleGolfer)}</p>
        </div>
        <div>
          <p style={labelStyle}>Per Person (Sharing)</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0, letterSpacing: '-1px' }}>{currency(totals.doubleGolfer)}</p>
        </div>
        <div>
          <p style={labelStyle}>Group Total ({groupSize} pax)</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#2d6a4f', margin: 0, letterSpacing: '-1px' }}>{currency(totals.groupTotal)}</p>
        </div>
      </div>

      {/* Margin slider */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ ...labelStyle, margin: 0, whiteSpace: 'nowrap' }}>Margin</label>
        <input type="range" min={5} max={50} step={1} value={draft.margin_pct}
          onChange={e => { const next = { ...draft, margin_pct: Number(e.target.value) }; setDraft(next); save(next) }}
          style={{ flex: 1 }} />
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#2d6a4f', minWidth: '40px' }}>{draft.margin_pct}%</span>
      </div>

      {/* Golf */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>Golf</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {golfRates.map(r => {
              const closed = CLOSED.includes(r.slug)
              const pbc = PBC.includes(r.slug) && !closed
              const noRate = r.net_rate === null && !pbc
              return (
                <button key={r.slug} onClick={() => !closed && addGolfItem(r)} disabled={closed} style={{
                  padding: '4px 10px', fontSize: '11px', fontWeight: '500', borderRadius: '6px',
                  border: '1px solid ' + (closed ? '#e5e7eb' : pbc ? '#fde68a' : '#d1d5db'),
                  background: closed ? '#f9fafb' : pbc ? '#fffbeb' : 'white',
                  color: closed ? '#9ca3af' : pbc ? '#854d0e' : '#374151',
                  cursor: closed ? 'not-allowed' : 'pointer',
                  textDecoration: closed ? 'line-through' : 'none',
                  fontFamily: 'inherit',
                }}>
                  {r.name.replace('Golf Course', '').replace('Golf Links', '').replace('Golf Club', '').trim()}
                  {pbc ? ' ★' : ''}{noRate ? ' (rate TBD)' : ''}
                </button>
              )
            })}
          </div>
        </div>
        {draft.golf_items.length === 0 && <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>No courses added. Click a course above to add.</p>}
        {draft.golf_items.map((g, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '8px', alignItems: 'end', marginBottom: '10px' }}>
            <div>
              <label style={labelStyle}>Course</label>
              <div style={{ ...inputStyle, background: '#f9fafb', color: '#374151' }}>{g.course}</div>
            </div>
            <div>
              <label style={labelStyle}>Rounds</label>
              <input type="number" min={1} max={10} value={g.rounds} onChange={e => updateGolf(i, 'rounds', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={labelStyle}>Net Rate / Round</label>
              <input type="number" value={g.net_rate} onChange={e => updateGolf(i, 'net_rate', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={labelStyle}>Subtotal</label>
              <div style={{ ...inputStyle, background: '#f9fafb', fontWeight: '600', color: '#2d6a4f' }}>{currency(g.rounds * (g.net_rate || 0))}</div>
            </div>
            <button onClick={() => removeGolf(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '16px', padding: '4px', alignSelf: 'flex-end', marginBottom: '1px' }}>✕</button>
          </div>
        ))}
      </div>

      {/* Lodging */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>Lodging</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {hotelRates.map(r => (
              <button key={r.slug} onClick={() => addLodgingItem(r)} style={{
                padding: '4px 10px', fontSize: '11px', fontWeight: '500', borderRadius: '6px',
                border: '1px solid ' + (r.is_pbc ? '#fde68a' : '#d1d5db'),
                background: r.is_pbc ? '#fffbeb' : 'white',
                color: r.is_pbc ? '#854d0e' : '#374151', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {r.name.replace('Hotel & Spa','').replace('Hotel','').replace('Lodge & Spa','').trim()}
                {r.is_pbc ? ' ★' : ''}
              </button>
            ))}
          </div>
        </div>
        {draft.lodging_items.length === 0 && <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>No hotels added.</p>}
        {draft.lodging_items.map((l, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: '8px', alignItems: 'end', marginBottom: '10px' }}>
            <div>
              <label style={labelStyle}>Hotel</label>
              <div style={{ ...inputStyle, background: '#f9fafb', color: '#374151' }}>{l.hotel}</div>
            </div>
            <div>
              <label style={labelStyle}>Nights</label>
              <input type="number" min={1} value={l.nights} onChange={e => updateLodging(i, 'nights', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={labelStyle}>Rooms</label>
              <input type="number" min={1} value={l.rooms} onChange={e => updateLodging(i, 'rooms', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={labelStyle}>Rate/Night</label>
              <input type="number" value={l.nightly_rate} onChange={e => updateLodging(i, 'nightly_rate', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={labelStyle}>Subtotal</label>
              <div style={{ ...inputStyle, background: '#f9fafb', fontWeight: '600', color: '#2d6a4f' }}>
                {currency(l.nights * (l.nightly_rate || 0) * l.rooms * (1 + (l.tax_rate || 0) / 100) + (l.resort_fee || 0) * l.nights)}
              </div>
            </div>
            <button onClick={() => removeLodging(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '16px', padding: '4px', alignSelf: 'flex-end', marginBottom: '1px' }}>✕</button>
          </div>
        ))}
      </div>

      {/* F&B / Transport / Activities */}
      {(['fb_items', 'transport_items', 'activity_items'] as const).map(key => {
        const titles: Record<string, string> = { fb_items: 'Food & Beverage', transport_items: 'Transport', activity_items: 'Activities' }
        return (
          <div key={key} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>{titles[key]}</h3>
              <button onClick={() => addSimple(key)} style={{ padding: '5px 12px', fontSize: '12px', fontWeight: '500', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' }}>+ Add</button>
            </div>
            {(draft[key] as SimpleItem[]).map((item, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr auto', gap: '8px', alignItems: 'end', marginBottom: '8px' }}>
                <div>
                  <label style={labelStyle}>Description</label>
                  <input value={item.description} onChange={e => updateSimple(key, i, 'description', e.target.value)} placeholder="e.g. Welcome dinner at Chart House" style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={labelStyle}>Cost pp</label>
                  <input type="number" value={item.cost_pp} onChange={e => updateSimple(key, i, 'cost_pp', Number(e.target.value))} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
                </div>
                <button onClick={() => removeSimple(key, i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '16px', padding: '4px', alignSelf: 'flex-end', marginBottom: '1px' }}>✕</button>
              </div>
            ))}
            {(draft[key] as SimpleItem[]).length === 0 && <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>None added.</p>}
          </div>
        )
      })}

      {/* Notes */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <label style={{ ...labelStyle, marginBottom: '8px' }}>Internal Notes (not shown to client)</label>
        <textarea value={draft.notes} rows={3} onChange={e => { const next = { ...draft, notes: e.target.value }; setDraft(next) }}
          onBlur={() => save(draft)}
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', color: '#111827', resize: 'vertical', fontFamily: 'inherit', outline: 'none' }} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={() => save(draft)} disabled={saving} style={{
          padding: '10px 20px', background: 'white', border: '1px solid #d1d5db',
          borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: '#374151',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>{saving ? 'Saving…' : 'Save Draft'}</button>
        <button onClick={sendQuote} disabled={sending} style={{
          padding: '10px 24px', background: '#2d6a4f', border: 'none',
          borderRadius: '8px', fontSize: '13px', fontWeight: '600', color: 'white',
          cursor: 'pointer', fontFamily: 'inherit', opacity: sending ? 0.7 : 1,
        }}>{sending ? 'Sending…' : 'Send Quote to Client'}</button>
        {msg && <span style={{ fontSize: '13px', color: msg.startsWith('✅') ? '#166534' : '#dc2626', fontWeight: '500' }}>{msg}</span>}
      </div>

    </div>
  )
}
