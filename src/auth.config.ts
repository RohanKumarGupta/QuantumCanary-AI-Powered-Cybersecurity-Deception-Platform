import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import "@/types/auth";

// ────────── Edge-Compatible Auth Config ──────────
// This config is used by middleware and does NOT import Prisma.
// The authorize function here is a stub — the real validation
// happens in the full auth.ts config with PrismaAdapter.

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Credentials stub for edge — actual validation in auth.ts
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // Stub: real authorization happens server-side in auth.ts
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user as any;
        token.id = user.id!;
        token.role = u.role as "USER" | "ADMIN";
        token.plan = u.plan as "FREE" | "PRO" | "ENTERPRISE";
        token.onboardingDone = u.onboardingDone as boolean;
        token.emailVerified = u.emailVerified as Date | null;
      }

      if (trigger === "update" && session) {
        if (session.onboardingDone !== undefined) {
          token.onboardingDone = session.onboardingDone;
        }
        if (session.role !== undefined) {
          token.role = session.role;
        }
        if (session.plan !== undefined) {
          token.plan = session.plan;
        }
        if (session.emailVerified !== undefined) {
          token.emailVerified = session.emailVerified;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.plan = token.plan as "FREE" | "PRO" | "ENTERPRISE";
        session.user.onboardingDone = token.onboardingDone as boolean;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Dashboard routes — require auth
      const isDashboardRoute = pathname.startsWith("/dashboard") ||
        pathname.startsWith("/honeypots") ||
        pathname.startsWith("/threats") ||
        pathname.startsWith("/canary") ||
        pathname.startsWith("/settings") ||
        pathname.startsWith("/reports") ||
        pathname.startsWith("/onboarding");

      // Auth pages — redirect to dashboard if already logged in
      const isAuthPage = pathname === "/login" || pathname === "/register";

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isDashboardRoute) {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/login", nextUrl));
        }

        // Redirect to onboarding if not done (except if already on /onboarding)
        if (!auth.user.onboardingDone && pathname !== "/onboarding") {
          return Response.redirect(new URL("/onboarding", nextUrl));
        }

        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
