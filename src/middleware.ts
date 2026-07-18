import { NextRequest, NextResponse } from "next/server";

// NOTE: This file runs on the Edge Runtime, which does not support Node's
// `crypto` module. It intentionally does NOT verify the session signature —
// that authoritative check happens in lib/auth.ts (Node.js runtime), used by
// the admin layout and by every mutating API route. This middleware only does
// a cheap "is a session cookie present at all" check so obviously-unauthenticated
// visitors get redirected early, without pulling Node crypto into the edge bundle.
const SESSION_COOKIE_NAME = "webdesa_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
