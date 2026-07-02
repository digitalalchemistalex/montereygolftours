-- MGTS leads table — additive migration
-- Adds lodging, dining/activities, and ground transport fields per Master's
-- directive to add these to the quote form.
-- IMPORTANT: 001_create_leads_table.sql is already live (run and verified by
-- MASTER on 2026-07-02). This is a SEPARATE follow-up migration — run this
-- against the same live project (ewhatqtehwzlypjguvoo.supabase.co) before
-- deploying the QuoteForm.tsx changes that reference these columns, or new
-- submissions will fail the same way the original missing table did.

alter table leads
  add column if not exists hotels_interested text[],
  add column if not exists activities_interested text[],
  add column if not exists ground_transport_needed boolean default false;
