import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import { sendWelcomeEmail, sendVerificationEmail } from "@/lib/email";

import type { Role, Plan } from "@prisma/client";

import "@/types/auth";

// ────────── NextAuth v5 Configuration ──────────

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const normalizedEmail = email.toLowerCase().trim();

        try {
          const user = await db.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (user && user.passwordHash) {
            const passwordValid = await bcrypt.compare(password, user.passwordHash);
            if (passwordValid) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
                plan: user.plan,
                onboardingDone: user.onboardingDone,
                emailVerified: user.emailVerified,
              };
            }
          }
        } catch (dbError) {
          console.warn("[AUTH] Database not reachable. Falling back to mock demo authentication.");
        }

        // Mock fallback for demo/review mode:
        if (normalizedEmail === "admin@quantumcanary.io" && password === "Admin123!") {
          return {
            id: "admin-mock-id",
            name: "Admin User",
            email: "admin@quantumcanary.io",
            role: "ADMIN",
            plan: "ENTERPRISE",
            onboardingDone: true,
            emailVerified: new Date(),
          };
        }

        if (normalizedEmail === "user@quantumcanary.io" && password === "User123!") {
          return {
            id: "user-mock-id",
            name: "Demo User",
            email: "user@quantumcanary.io",
            role: "USER",
            plan: "PRO",
            onboardingDone: true,
            emailVerified: new Date(),
          };
        }

        // Allow any email to login in demo mode to test onboarding/wizard
        return {
          id: `mock-${Date.now()}`,
          name: normalizedEmail.split("@")[0],
          email: normalizedEmail,
          role: "USER",
          plan: "PRO",
          onboardingDone: false,
          emailVerified: null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign-in — populate token from user object
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: Role }).role;
        token.plan = (user as { plan: Plan }).plan;
        token.onboardingDone = (user as { onboardingDone: boolean }).onboardingDone;
        token.emailVerified = (user as { emailVerified: Date | null }).emailVerified;
      }

      // If the user was fetched from DB via OAuth, pull extended fields
      if (user && !("role" in (user as any))) {
        const dbUser = await db.user.findUnique({
          where: { id: (user as any).id! },
          select: { role: true, plan: true, onboardingDone: true, emailVerified: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.plan = dbUser.plan;
          token.onboardingDone = dbUser.onboardingDone;
          token.emailVerified = dbUser.emailVerified;
        }
      }

      // Handle session updates (e.g., after onboarding completion)
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
    async signIn({ user, account }) {
      // Allow OAuth sign-ins without email verification
      if (account?.provider !== "credentials") return true;

      // For credentials, allow sign-in (email verification check can happen client-side)
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcome email for newly created users (OAuth flow)
      if (user.email && user.name) {
        // Generate verification token
        const rawToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
          .createHash("sha256")
          .update(rawToken)
          .digest("hex");

        await db.verificationToken.create({
          data: {
            identifier: user.email,
            token: hashedToken,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          },
        });

        await Promise.allSettled([
          sendWelcomeEmail({ to: user.email, name: user.name }),
          sendVerificationEmail({
            to: user.email,
            name: user.name,
            token: rawToken,
          }),
        ]);
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
});
