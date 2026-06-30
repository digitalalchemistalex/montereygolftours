-- MGTS leads table
-- Per cost-control skill: anon INSERT allowed, SELECT/UPDATE/DELETE require service role only.
-- Run this once against the Supabase project before the quote form goes live.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  group_size text not null,
  travel_dates text,
  budget_per_person text,
  courses_interested text[],
  message text
);

create index if not exists leads_created_at_idx on leads(created_at);

alter table leads enable row level security;

-- Anonymous (public, anon key) users may INSERT only.
create policy "Anyone can submit a lead"
  on leads for insert
  to anon
  with check (true);

-- No SELECT/UPDATE/DELETE policy for anon — service role bypasses RLS
-- and is used server-side only (e.g. for the email notification step).
