// app/api/deploy-webhook/route.ts
// Vercel calls this on every deployment event (success/fail/error)
// Set in Vercel dashboard: Project → Settings → Git → Deploy Hooks / Notifications
// OR use Vercel Log Drains + this endpoint as target

import { NextResponse } from "next/server";
import { sendDevAlert } from "@/lib/dev-alert";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Verify Vercel webhook signature
  const secret = process.env.DEPLOY_WEBHOOK_SECRET;
  const sig = req.headers.get("x-vercel-signature");
  if (secret && sig !== secret) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = await req.json();
  const { type, deployment } = payload;

  // Only alert on failures
  const failStates = ["ERROR", "CANCELED", "FAILED"];
  if (!failStates.includes(deployment?.state ?? type)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const state = deployment?.state ?? type;
  const url = deployment?.url ?? "unknown";
  const commit = deployment?.meta?.githubCommitMessage ?? "unknown commit";
  const branch = deployment?.meta?.githubCommitRef ?? "main";
  const deployId = deployment?.id ?? "unknown";

  await sendDevAlert({
    subject: `🚨 MGTS Deploy ${state} — ${commit.slice(0, 60)}`,
    title: `Deployment ${state}`,
    body: `
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <tr><td style="padding:6px 0;color:#666;width:120px">State</td><td style="padding:6px 0;color:#c0392b;font-weight:700">${state}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Commit</td><td style="padding:6px 0">${commit}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Branch</td><td style="padding:6px 0">${branch}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Deploy ID</td><td style="padding:6px 0;font-family:monospace;font-size:11px">${deployId}</td></tr>
        <tr><td style="padding:6px 0;color:#666">URL</td><td style="padding:6px 0"><a href="https://${url}">https://${url}</a></td></tr>
      </table>
      <p style="margin-top:16px">
        <a href="https://vercel.com/golfbookingsystem/montereygolftours/deployments" 
           style="background:#1a1a1a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:13px">
          View in Vercel →
        </a>
      </p>
    `,
  });

  return NextResponse.json({ ok: true });
}
