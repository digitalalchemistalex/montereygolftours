// lib/dev-alert.ts — sends immediate alerts to dev when something breaks
// Used by: compliance cron, error boundary, deploy webhook

const RESEND_API = "https://api.resend.com/emails";
const FROM = "MGTS Monitor <info@montereygolftours.com>";
const DEV_EMAIL = "dawoodanialtaaf@gmail.com";

type AlertOptions = {
  subject: string;
  title: string;
  body: string; // HTML
};

export async function sendDevAlert({ subject, title, body }: AlertOptions) {
  const html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<style>
  body { margin:0; padding:0; background:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif; }
  .wrap { max-width:600px; margin:24px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }
  .header { background:#1a1a1a; padding:20px 28px; }
  .header-title { color:#fff; font-size:16px; font-weight:800; }
  .header-sub { color:#c0392b; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; margin-top:4px; }
  .body { padding:28px; }
  h2 { color:#1a1a1a; font-size:18px; margin:0 0 16px; }
  .footer { background:#f9f9f9; padding:16px 28px; font-size:11px; color:#999; border-top:1px solid #eee; }
</style>
</head><body><div class="wrap">
  <div class="header">
    <div class="header-title">MontereyGolfTours.com</div>
    <div class="header-sub">🚨 Developer Alert</div>
  </div>
  <div class="body">
    <h2>${title}</h2>
    ${body}
    <p style="margin-top:24px;font-size:12px;color:#999">
      Sent by MGTS automated monitor · ${new Date().toISOString()}
    </p>
  </div>
  <div class="footer">
    montereygolftours.vercel.app · Repo: digitalalchemistalex/montereygolftours
  </div>
</div></body></html>`;

  await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [DEV_EMAIL],
      subject,
      html,
    }),
  });
}
