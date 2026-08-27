import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import RespondClient from './RespondClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getMgtsClient() {
  return createClient(process.env.MGTS_SUPABASE_URL!, process.env.MGTS_SUPABASE_SERVICE_KEY!);
}

async function getDraft(token: string) {
  const client = getMgtsClient();
  const { data: draft } = await client
    .from('quote_drafts')
    .select('id,lead_id,hotel_name,pp_gg,status,decline_reason')
    .eq('response_token', token)
    .maybeSingle();
  if (!draft) return null;

  const { data: lead } = await client.from('leads').select('name').eq('id', draft.lead_id).maybeSingle();

  // Sender — use GTHS admin_users for now (Sean)
  const sender = { name: 'Sean Schaeffer', phone: '(775) 846-4653', photo_url: null as string | null };

  return { ...draft, leadName: lead?.name || '', sender };
}

export default async function RespondPage({
  params, searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ a?: string }>;
}) {
  const { token } = await params;
  const { a } = await searchParams;
  const draft = await getDraft(token);
  if (!draft) notFound();

  const firstName = (draft.leadName || '').split(' ')[0] || 'there';
  const alreadyApproved = draft.status === 'approved';
  const alreadyDeclined = draft.status === 'declined';
  const initialAction = a === 'decline' ? 'decline' : 'approve';
  const ppGG = draft.pp_gg ?? 0;

  return (
    <div style={{ background: '#F5F5F0', minHeight: '100vh', fontFamily: 'system-ui,-apple-system,sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ background: '#1E3A2F', padding: '20px 24px', borderRadius: '10px 10px 0 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://montereygolftours.com/images/logo-white.png" alt="Monterey Golf Tours"
            style={{ height: 32, display: 'block' }}
            onError={() => {}} />
          <div style={{ height: 3, background: 'linear-gradient(90deg,#C9A24D,#B08C3A)', marginTop: 14 }} />
        </div>

        <div style={{ background: '#fff', padding: '28px 24px', borderRadius: '0 0 10px 10px' }}>
          <RespondClient
            token={token}
            firstName={firstName}
            hotelName={draft.hotel_name || ''}
            ppGG={ppGG}
            alreadyApproved={alreadyApproved}
            alreadyDeclined={alreadyDeclined}
            initialAction={initialAction}
            sender={draft.sender}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#9CA3AF' }}>
          Monterey Golf Tours &middot; (775) 846-4653
        </div>
      </div>
    </div>
  );
}
