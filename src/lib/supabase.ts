import { createClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Minimal schema typing so the Supabase client knows the shape of our one
// table. Without this, @supabase/supabase-js falls back to `never` for
// insert/update payloads, which fails `tsc` during `next build` (even though
// `next dev` doesn't always catch it).
export type Database = {
  public: {
    Tables: {
      site_data: {
        Row: { id: number; data: Json; updated_at: string };
        Insert: { id: number; data: Json; updated_at?: string };
        Update: { id?: number; data?: Json; updated_at?: string };
      };
    };
  };
};

let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Server-only Supabase client using the service role key. This bypasses Row
 * Level Security, so it must NEVER be imported into a "use client" component
 * or exposed to the browser — only use it inside Route Handlers, Server
 * Components, and other server-side code (which is exactly how this project
 * uses it: from src/lib/db.ts and the upload route).
 */
export function getSupabaseServerClient() {
  if (cachedClient) return cachedClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diatur. Salin .env.local.example ke " +
        ".env.local dan isi kredensial Supabase kamu (lihat README.md)."
    );
  }

  cachedClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
