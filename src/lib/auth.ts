import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "webdesa_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 hari

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET belum diatur. Salin .env.local.example menjadi .env.local dan isi nilainya."
    );
  }
  return secret;
}

export function createSessionToken(username: string) {
  const payload = JSON.stringify({ u: username, exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return false;
  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
export const SESSION_MAX_AGE = MAX_AGE_SECONDS;

/**
 * Authoritative session check for use inside Route Handlers and Server Components
 * (Node.js runtime only — do NOT import this in middleware.ts, which runs on the
 * Edge Runtime and does not support Node's `crypto` module).
 */
export function isAuthenticated(cookieValue: string | undefined | null): boolean {
  return verifySessionToken(cookieValue);
}

/**
 * Call at the top of any mutating (POST/PUT/DELETE) Route Handler.
 * Returns a 401 NextResponse to return immediately if unauthenticated, or null if OK.
 */
export async function requireAuth(): Promise<NextResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
