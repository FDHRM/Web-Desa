-- Jalankan SQL ini sekali di Supabase project kamu:
-- Dashboard Supabase > SQL Editor > New query > tempel ini > Run

create table if not exists site_data (
  id integer primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Catatan: project ini mengakses tabel ini lewat Service Role Key (server-only),
-- yang otomatis melewati Row Level Security. Jadi kamu TIDAK perlu membuat
-- policy RLS apa pun untuk tabel ini agar aplikasi berfungsi.
