import { createClient } from "@supabase/supabase-js";

let cachedClient: ReturnType<typeof createClient> | null = null;

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

  cachedClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
