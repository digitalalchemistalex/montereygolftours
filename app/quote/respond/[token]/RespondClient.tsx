'use client';
import { useEffect, useState, useRef } from 'react';

interface Sender {
  name: string;
  phone: string | null;
  photo_url: string | null;
}

interface Props {
  token: string;
  firstName: string;
  hotelName: string;
  ppGG: number;
  alreadyApproved: boolean;
  alreadyDeclined: boolean;
  initialAction: 'approve' | 'decline';
  sender: Sender | null;
}

export default function RespondClient({
  token, firstName, hotelName, ppGG,
  alreadyApproved, alreadyDeclined, initialAction, sender,
}: Props) {
  const [state, setState] = useState<'idle'|'submitting'|'approved'|'declined'>(
    alreadyApproved ? 'approved' : alreadyDeclined ? 'declined' : 'idle'
  );
  const [view, setView] = useState<'approve'|'decline'>(initialAction);
  const [selectedReason, setSelectedReason] = useState('');
  const confettiFired = useRef(false);

  useEffect(() => {
    if (state !== 'approved' || confettiFired.current) return;
    confettiFired.current = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const confetti = (window as any).confetti;
      if (!confetti) return;
      confetti({ particleCount: 80, spread: 55, origin: { x: 0.5, y: 0.1 }, colors: ['#C9A24D','#B08C3A','#1E3A2F','#6B8E7F','#ffffff'], scalar: 1.1, gravity: 1.2 });
      setTimeout(() => confetti({ particleCount: 50, spread: 80, origin: { x: 0.5, y: 0.05 }, colors: ['#C9A24D','#B08C3A','#1E3A2F'], scalar: 0.9, gravity: 1.1 }), 400);
    };
    document.head.appendChild(script);
  }, [state]);

  async function submit(action: 'approve'|'decline', reason?: string) {
    setState('submitting');
    const form = new FormData();
    form.append('action', action);
    if (reason) form.append('reason', reason);
    await fetch(`/api/quote-response/${token}`, { method: 'POST', body: form });
    setState(action === 'approve' ? 'approved' : 'declined');
  }

  const REASONS = ['Price is too high', "Dates don't work", 'Went with another company', 'Something else'];

  const senderCard = sender ? (
    <div style={{ padding: '16px 0', borderTop: '1px solid #F3F4F6', marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {sender.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sender.photo_url} width={44} height={44}
            style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} alt="" />
        ) : (
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1E3A2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#C9A24D', fontSize: 14, fontWeight: 700 }}>
              {sender.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{sender.name}</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Monterey Golf Tours</div>
        </div>
      </div>
      {sender.phone && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#374151' }}>
          Cell: <a href={`tel:${sender.phone.replace(/\D/g, '')}`}
            style={{ color: '#1E3A2F', fontWeight: 700, textDecoration: 'none' }}>
            {sender.phone}
          </a>
        </div>
      )}
    </div>
  ) : null;

  if (state === 'approved') {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⛳</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1E3A2F', marginBottom: 8 }}>
          You&apos;re on the tee, {firstName}.
        </div>
        <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
          Your Monterey package is confirmed. Our team will be in touch shortly to lock in your tee times and send next steps.
        </div>
        {hotelName && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 10, padding: '14px 18px', fontSize: 13, color: '#065F46', fontWeight: 500 }}>
            <div>📍 {hotelName}</div>
          </div>
        )}
        {senderCard}
      </div>
    );
  }

  if (state === 'declined') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111' }}>Thanks for letting us know, {firstName}.</div>
        <div style={{ fontSize: 13, color: '#6B7280', marginTop: 8 }}>
          We appreciate you telling us. If anything changes, just reply to your quote email anytime.
        </div>
      </div>
    );
  }

  if (view === 'decline') {
    return (
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4, textAlign: 'center' }}>
          What&apos;s not working, {firstName}?
        </div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 18, textAlign: 'center' }}>
          Helps us get it right — takes 5 seconds.
        </div>
        {REASONS.map(reason => (
          <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: `1px solid ${selectedReason === reason ? '#1E3A2F' : '#E5E7EB'}`, borderRadius: 8, marginBottom: 8, fontSize: 13, color: '#374151', cursor: 'pointer', background: selectedReason === reason ? '#F0FDF4' : '#fff' }}>
            <input type="radio" name="reason" value={reason} checked={selectedReason === reason}
              onChange={() => setSelectedReason(reason)} style={{ width: 16, height: 16 }} />
            {reason}
          </label>
        ))}
        <button disabled={!selectedReason || state === 'submitting'}
          onClick={() => selectedReason && submit('decline', selectedReason)}
          style={{ width: '100%', padding: 13, background: selectedReason ? '#5F5E5A' : '#D1D5DB', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: selectedReason ? 'pointer' : 'not-allowed', marginTop: 8 }}>
          {state === 'submitting' ? 'Sending…' : 'Send'}
        </button>
        <button onClick={() => setView('approve')}
          style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 4 }}>Confirm your package</div>
      <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>{hotelName}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: '#1E3A2F', marginBottom: 20 }}>
        ${ppGG.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: '#9CA3AF' }}>/person</span>
      </div>
      {senderCard}
      <button onClick={() => submit('approve')} disabled={state === 'submitting'}
        style={{ width: '100%', padding: 13, background: '#1E3A2F', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: state === 'submitting' ? 0.7 : 1 }}>
        {state === 'submitting' ? 'Confirming…' : 'Accept Quote'}
      </button>
      <button onClick={() => setView('decline')}
        style={{ width: '100%', marginTop: 10, background: 'none', border: 'none', fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }}>
        I want to decline
      </button>
    </div>
  );
}
