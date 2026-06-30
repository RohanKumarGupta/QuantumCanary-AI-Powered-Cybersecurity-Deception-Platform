import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      plan: "FREE" | "PRO" | "ENTERPRISE";
      onboardingDone: boolean;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    role: "USER" | "ADMIN";
    plan: "FREE" | "PRO" | "ENTERPRISE";
    onboardingDone: boolean;
    emailVerified: Date | null;
    passwordHash?: string | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
    plan: "FREE" | "PRO" | "ENTERPRISE";
    onboardingDone: boolean;
    emailVerified: Date | null;
  }
}

export type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: "USER" | "ADMIN";
  plan: "FREE" | "PRO" | "ENTERPRISE";
  onboardingDone: boolean;
  emailVerified: Date | null;
};
