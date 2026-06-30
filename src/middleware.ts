import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { authConfig } from "@/auth.config";

// ────────── Edge Rate Limiting ──────────
// In-memory rate limiting for edge runtime (no Prisma/Upstash import here)
// For production, Upstash REST API calls are used directly

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function edgeRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// Clean up stale entries periodically (every 1000 checks)
let cleanupCounter = 0;
function maybeCleanup() {
  cleanupCounter++;
  if (cleanupCounter >= 1000) {
    cleanupCounter = 0;
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetAt) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// ────────── Auth Middleware ──────────

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request: NextRequest) {
  maybeCleanup();

  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // ── Rate Limiting for API routes ──
  if (pathname.startsWith("/api/ai/")) {
    // AI routes: 20 requests per minute
    const rateLimitKey = `ai:${ip}`;
    const result = edgeRateLimit(rateLimitKey, 20, 60 * 1000);
    if (!result.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please slow down." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "60",
          },
        }
      );
    }
  }

  if (pathname === "/api/auth/register") {
    // Register: 5 requests per hour
    const rateLimitKey = `register:${ip}`;
    const result = edgeRateLimit(rateLimitKey, 5, 60 * 60 * 1000);
    if (!result.allowed) {
      return NextResponse.json(
        { error: "Too many registration attempts. Try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "Retry-After": "3600",
          },
        }
      );
    }
  }

  // ── API Route Auth ──
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    // Protected API routes require authentication
    const session = (request as unknown as { auth: { user?: { id: string } } | null }).auth;
    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  // Route protection is handled by the `authorized` callback in authConfig
  return NextResponse.next();
});

// ────────── Matcher Configuration ──────────

export const config = {
  matcher: [
    // Dashboard & protected pages
    "/dashboard/:path*",
    "/honeypots/:path*",
    "/threats/:path*",
    "/canary/:path*",
    "/settings/:path*",
    "/reports/:path*",
    "/onboarding/:path*",
    // Auth pages (to redirect if already logged in)
    "/login",
    "/register",
    // Protected API routes
    "/api/honeypots/:path*",
    "/api/threats/:path*",
    "/api/canary/:path*",
    "/api/reports/:path*",
    "/api/settings/:path*",
    "/api/ai/:path*",
    "/api/team/:path*",
    // Auth API routes (register rate limiting)
    "/api/auth/register",
    "/api/auth/forgot-password",
    "/api/auth/reset-password",
    "/api/auth/verify-email",
    "/api/auth/resend-verification",
    "/api/auth/verify-reset-token",
  ],
};
