// app/api/cron/spanish-bay-open/route.ts
// Vercel cron: 0 7 17 4 * (7am PT, April 17 annually)
// Fires admin notification when Spanish Bay® reopens

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  // Only run on April 17
  const now   = new Date();
  const month = now.getMonth(); // 3 = April
  const day   = now.getDate();

  if (month !== 3 || day !== 17) {
    return NextResponse.json({ skipped: true, reason: "Not April 17" });
  }

  // Count waitlist leads
  let leadCount = 0;
  let leadRows: Array<{ name: string; email: string; group_size: string; travel_dates: string; created_at: string }> = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("leads")
      .select("name, email, group_size, travel_dates, created_at")
      .eq("referral_source", "spanish_bay_waitlist")
      .order("created_at", { ascending: true });

    leadRows  = data ?? [];
    leadCount = leadRows.length;
  } catch (err) {
    console.error("[spanish-bay-cron] Supabase error:", err);
  }

  const leadTable = leadRows
    .map((r, i) =>
      `${i + 1}. ${r.name} &lt;${r.email}&gt; — Group: ${r.group_size ?? "?"} — Target: ${r.travel_dates ?? "?"} — Signed up: ${new Date(r.created_at).toLocaleDateString("en-US")}`
    )
    .join("<br/>");

  const html = `
<h2 style="color:#042C53">The Links at Spanish Bay® reopened today — April 17, 2027</h2>
<p><strong>Total waitlist leads: ${leadCount}</strong></p>
<hr/>
<h3>ACTION REQUIRED — work through leads in order of signup (oldest first)</h3>
<ol>
  <li><strong>Pull the waitlist</strong><br/>Go to /admin/leads, filter referral_source = 'spanish_bay_waitlist', sort by created_at ASC.</li>
  <li><strong>Contact each lead within 24 hours</strong>
    <ul>
      <li>Confirm interest is still active</li>
      <li>Confirm group size and travel month</li>
      <li>Spanish Bay® PBC tee times require 30-day advance minimum</li>
      <li><strong>Earliest bookable tee time from today: May 17, 2027</strong></li>
      <li>Get them into a quote immediately — slots fill fast</li>
    </ul>
  </li>
  <li><strong>PBC booking contact</strong><br/>
    traveldesk@pebblebeach.com / 866.543.9306<br/>
    Karlyn Hawke (Director of Leisure Travel Sales): khawke@pebblebeach.com / 831-648-7861
  </li>
  <li><strong>IAGTO rates</strong><br/>
    Confidential — apply in quote builder under rate_configs.iagto_rate. Never show to customer.
  </li>
  <li><strong>Pricing notes</strong><br/>
    Monterey TOT: 10.5% (pre-fills in quote builder). California golf tax: 0%.
  </li>
  <li><strong>Site updates needed (ask MASTER or Raza)</strong>
    <ol type="a">
      <li>Remove "CLOSED" pill from The Links at Spanish Bay® course page</li>
      <li>Remove waitlist form — restore normal course CTA section</li>
      <li>Remove 'links-at-spanish-bay' from CLOSED_COURSE_SLUGS in lib/courses.ts so it reappears in QuoteForm course picker</li>
      <li>Update course page copy to reflect reopening</li>
    </ol>
  </li>
</ol>
<hr/>
<h3>Waitlist leads (sorted by signup date)</h3>
<p style="font-family:monospace;font-size:13px">${leadTable || "No leads found — check Supabase directly."}</p>
<hr/>
<p style="font-size:12px;color:#888">This email was sent automatically by the MGTS cron system on April 17, 2027.<br/>
IAGTO member. Rates and packages subject to IAGTO agreement terms.</p>
`;

  const to = process.env.LEAD_NOTIFY_EMAIL ?? "sean@montereygolftours.com";

  try {
    await resend.emails.send({
      from: "Sean Schaeffer <sean@montereygolftours.com>",
      to: [to, "digitalalchemistalex@gmail.com"],
      subject: `\u26F3 Spanish Bay\u00ae reopens TODAY \u2014 ${leadCount} waitlist leads ready to convert`,
      html,
    });
  } catch (err) {
    console.error("[spanish-bay-cron] Resend error:", err);
    return NextResponse.json({ success: false, error: String(err), leadCount });
  }

  return NextResponse.json({ success: true, leadCount });
}
