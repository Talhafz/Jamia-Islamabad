import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'jamia_islamabad_super_secret_jwt_key_2026_x98f',
  });

  const { pathname } = req.nextUrl;

  // ── 1. Staff-only routes: /students, /admin, /faculty/manage ─────────────
  // Requires login AND a non-STUDENT role.
  // STUDENT sessions are explicitly redirected to /student-portal (not just 401).
  if (
    pathname.startsWith('/students') ||
    pathname.startsWith('/faculty/manage') ||
    pathname.startsWith('/admin')
  ) {
    // Not logged in → send to login
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const STAFF_ROLES = ['ADMIN', 'DIRECTOR', 'DEAN'];

    // Logged in as STUDENT → redirect to their own portal (explicit block, not silent)
    if (!STAFF_ROLES.includes(token.role as string)) {
      return NextResponse.redirect(new URL('/student-portal', req.url));
    }
  }

  // ── 2. Student Portal Routes ──────────────────────────────────────────────
  if (
    pathname.startsWith('/student-portal') ||
    pathname.startsWith('/my-application')
  ) {
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Only STUDENT and staff roles allowed
    const VALID_ROLES = ['STUDENT', 'ADMIN', 'DIRECTOR', 'DEAN'];
    if (!VALID_ROLES.includes(token.role as string)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/students/:path*',
    '/faculty/manage/:path*',
    '/admin/:path*',
    '/student-portal',
    '/student-portal/:path*',
    '/my-application/:path*',
  ],
};
