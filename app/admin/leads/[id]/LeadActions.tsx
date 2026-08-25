'use client'

import { useState } from 'react'

const STATUSES = ['new','contacted','quoted','booked','archived']
const STATUS_LABELS: Record<string, string> = {
  new: 'New', contacted: 'Contacted', quoted: 'Quoted', booked: 'Booked', archived: 'Archived'
}

export default function LeadActions({ leadId, currentStatus }: { leadId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function updateStatus(newStatus: string) {
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/admin/leads/status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status: newStatus }),
    })
    setSaving(false)
    if (res.ok) { setStatus(newStatus); setMsg('Status updated') }
    else setMsg('Failed to update status')
    setTimeout(() => setMsg(''), 2000)
  }

  async function addNote() {
    if (!note.trim()) return
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/admin/leads/' + leadId + '/note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    })
    setSaving(false)
    if (res.ok) { setNote(''); setMsg('Note saved'); window.location.reload() }
    else setMsg('Failed to save note')
  }

  return (
    <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', fontFamily: '-apple-system, sans-serif' }}>
      <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>Actions</h3>

      {/* Status */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Status</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => updateStatus(s)} disabled={saving || s === status} style={{
              padding: '5px 12px', fontSize: '12px', fontWeight: '500', borderRadius: '6px', cursor: s === status ? 'default' : 'pointer',
              border: s === status ? '2px solid #2d6a4f' : '1px solid #e5e7eb',
              background: s === status ? '#f0fdf4' : 'white',
              color: s === status ? '#166534' : '#374151',
            }}>{STATUS_LABELS[s]}</button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Add Note</label>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
          placeholder="Add a note about this lead..."
          style={{
            width: '100%', boxSizing: 'border-box', padding: '8px 12px',
            border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px',
            color: '#111827', resize: 'vertical', fontFamily: 'inherit', outline: 'none',
          }}
        />
        <button onClick={addNote} disabled={saving || !note.trim()} style={{
          marginTop: '8px', width: '100%', padding: '8px', background: '#2d6a4f',
          color: 'white', border: 'none', borderRadius: '7px', fontSize: '13px',
          fontWeight: '600', cursor: note.trim() ? 'pointer' : 'not-allowed',
          opacity: note.trim() ? 1 : 0.5, fontFamily: 'inherit',
        }}>Save Note</button>
      </div>

      {msg && <p style={{ fontSize: '12px', color: '#2d6a4f', margin: '8px 0 0 0', textAlign: 'center' }}>{msg}</p>}
    </div>
  )
}
