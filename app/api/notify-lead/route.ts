// Directive #6 — lead notification API route
// Updated: notify email aligned to D#15 QuoteForm fields (budget_per_person + trip_length removed)
//
// Required env vars (set in Vercel dashboard):
//   RESEND_API_KEY   — get from resend.com (free tier covers this volume)
//   LEAD_NOTIFY_EMAIL — Sean's email address (where alerts go)

export const runtime = "edge";

function R(label: string, val: string, highlight = false): string {
  if (!val || val === 'undefined' || val === '—' || val === 'No' || val === 'Not specified') return '';
  if (highlight) return `<tr>
    <td style="padding:8px 12px;background:#ECFDF5;font-size:11px;color:#065F46;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;font-size:13px;color:#059669;font-weight:700">${val}</td>
  </tr>`;
  return `<tr>
    <td style="padding:8px 12px;background:#F9FAFB;font-size:11px;color:#6B7280;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:38%;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;font-size:13px;color:#111;font-weight:500">${val}</td>
  </tr>`;
}

function buildHtml(d: Record<string, unknown>): string {
  const courses    = Array.isArray(d.courses_interested)    ? (d.courses_interested as string[]).join(', ')    || '—' : '—';
  const hotels     = Array.isArray(d.hotels_interested)     ? (d.hotels_interested  as string[]).join(', ')    || '—' : '—';
  const activities = Array.isArray(d.activities_interested) ? (d.activities_interested as string[]).join(', ') || '—' : '—';
  const corpNeeds  = Array.isArray(d.corp_needs)            ? (d.corp_needs as string[]).join(', ')            || '—' : '—';

  const gameLabelMap: Record<string, string> = {
    single_figures: 'Single figures', club_golfer: 'Club golfer',
    social_golfer: 'Social golfer', casual: 'Casual',
  };
  const tripLabelMap: Record<string, string> = {
    golf_only: 'Golf only', golf_stay: 'Golf + Stay',
    full_experience: 'Full experience', corporate: 'Corporate',
  };
  const gameLevel = d.game_level ? (gameLabelMap[d.game_level as string] ?? String(d.game_level)) : '';
  const tripType  = d.trip_type  ? (tripLabelMap[d.trip_type   as string] ?? String(d.trip_type))  : '';
  const isCorporate = d.trip_type === 'corporate';
  const okToCall = d.ok_to_call !== false;
  const okToText = d.ok_to_text !== false;
  const name = String(d.name || '—');
  const email = String(d.email || '');
  const phone = String(d.phone || '');
  const adminUrl = 'https://golfthehighsierra.com/admin/unified-leads';

  const rows = [
    R('Name', `<strong>${name}</strong>`),
    R('Phone', phone ? `<a href="tel:${phone}" style="color:#1E3A2F;font-weight:700;text-decoration:none">${phone}</a>` : ''),
    R('Email', email ? `<a href="mailto:${email}" style="color:#1E3A2F;text-decoration:none">${email}</a>` : ''),
    R('Group Size', d.group_size ? `${String(d.group_size)} golfers${d.non_golfer_in_group ? ` + ${String(d.non_golfer_count || '?')} non-golfer(s)` : ''}` : ''),
    R('Trip Type', tripType),
    R('Game Level', gameLevel),
    R('Nights', String(d.nights || '')),
    R('Travel Dates', String(d.travel_dates || '')),
    R('Courses', courses === '—' ? '' : courses),
    R('Hotels', d.hotel_pick_for_me ? 'Pick for me' : (hotels === '—' ? '' : hotels)),
    R('Activities', activities === '—' ? '' : activities),
    R('Rounds / Golfer', String(d.rounds_per_golfer || '')),
    R('Tee Time 1', d.tee_time_pref_1 ? String(d.tee_time_pref_1).replace(/_/g, ' ') : ''),
    R('Tee Time 2', d.tee_time_pref_2 ? String(d.tee_time_pref_2).replace(/_/g, ' ') : ''),
    R('Room Config', String(d.room_config || '')),
    R('Caddies', String(d.caddie_option || '')),
    R('Budget Tier', d.budget_tier ? String(d.budget_tier).replace(/_/g, ' ') : ''),
    R('Flying Into', String(d.arrival_airport || '')),
    R('Ground Transport', String(d.transport_needed || '')),
    R('Returning Guest', d.returning_customer ? 'Yes' : ''),
    R('How Found Us', String(d.referral_source || '')),
    ...(isCorporate ? [
      R('Corp Attendees', String(d.corp_attendees || '')),
      R('Corp Event Type', String(d.corp_event_type || '')),
      R('Corp Needs', corpNeeds === '—' ? '' : corpNeeds),
    ] : []),
    R('Special Requests', String(d.message || '')),
    okToCall ? R('OK to Call', '📞 Yes — call them', true) : '',
    !okToText ? '' : R('OK to Text', '💬 Yes — text them', true),
  ].join('');

  return \`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body { margin:0; padding:0; background:#F3F4F6; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif; }
  .wrap { max-width:600px; margin:24px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
  table { border-collapse:collapse; }
</style>
</head>
<body>
<div class="wrap">
  <div style="background:#1E3A2F;padding:20px 32px">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td style="vertical-align:middle;padding-right:20px;width:1%">
          <a href="https://montereygolftours.com" style="display:block;text-decoration:none">
            <img src="https://montereygolftours.com/images/mgts-logo-white.png"
                 alt="Monterey Golf Tours"
                 style="display:block;height:56px;width:auto;border:0" />
          </a>
        </td>
        <td style="vertical-align:middle">
          <div style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.3px;line-height:1.2">Monterey Golf Tours</div>
          <div style="color:#C9A24D;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-top:3px">Pebble Beach · Carmel · Monterey Peninsula</div>
        </td>
      </tr>
    </table>
  </div>
  <div style="height:3px;background:linear-gradient(90deg,#C9A24D,#B08C3A)"></div>

  <div style="padding:32px">
    <h2 style="margin:0 0 4px;font-size:22px;font-weight:800;color:#111">New Lead — Call Required</h2>
    <p style="margin:0 0 20px;font-size:13px;color:#6B7280">montereygolftours.com · ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>

    <div style="font-size:11px;color:#9CA3AF;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Lead Details</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">
      \${rows}
    </table>

    <table cellpadding="0" cellspacing="0" border="0" style="margin-top:24px">
      <tr>
        <td style="background:#1E3A2F;border-radius:8px">
          <a href="\${adminUrl}" style="display:inline-block;padding:12px 24px;color:#fff;text-decoration:none;font-size:14px;font-weight:700">Open in Admin →</a>
        </td>
        \${phone ? \`<td width="12"></td>
        <td style="border:1px solid #E5E7EB;border-radius:8px">
          <a href="tel:\${phone}" style="display:inline-block;padding:12px 24px;color:#374151;text-decoration:none;font-size:14px;font-weight:600">📞 Call Now</a>
        </td>\` : ''}
      </tr>
    </table>
  </div>

  <div style="padding:20px 32px;font-size:12px;color:#9CA3AF;text-align:center;border-top:1px solid #E5E7EB">
    Monterey Golf Tours &nbsp;·&nbsp; 2700 Mill St Suite 800, Reno, NV 89502<br>
    <a href="mailto:info@montereygolftours.com" style="color:#9CA3AF">info@montereygolftours.com</a>
  </div>
</div>
</body>
</html>\`;
}


export async function POST(req: Request) {
  const RESEND_KEY   = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL;

  if (!RESEND_KEY || !NOTIFY_EMAIL) {
    console.warn("notify-lead: RESEND_API_KEY or LEAD_NOTIFY_EMAIL not set");
    return Response.json({ ok: false, reason: "env not configured" }, { status: 200 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "invalid json" }, { status: 400 });
  }

  const tripLabel = data.trip_type === "corporate" ? "Corporate" :
                    data.trip_type === "golf_stay"  ? "Golf+Stay" :
                    data.trip_type === "full_experience" ? "Full exp" : "Golf only";

  const subject = `New lead: ${String(data.name || "Unknown")} — ${String(data.group_size || "?")} golfers · ${String(data.nights || "?")} nights · ${tripLabel}`;

  const sendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Monterey Golf Tours <notifications@montereygolftours.com>",
      to: [NOTIFY_EMAIL],
      subject,
      html: buildHtml(data),
    }),
  });

  if (!sendRes.ok) {
    const err = await sendRes.text();
    console.error("notify-lead: Resend error", sendRes.status, err);
  }

  return Response.json({ ok: sendRes.ok });
}
