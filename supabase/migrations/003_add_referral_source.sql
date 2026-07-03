-- MGTS leads table — additive migration
-- Adds referral_source ("How did you hear about us?") field.
-- IMPORTANT: 001 and 002 are already live. This is a separate follow-up —
-- run against the same live project (ewhatqtehwzlypjguvoo.supabase.co)
-- before deploying the QuoteForm.tsx changes that reference this column.

alter table leads
  add column if not exists referral_source text;
