"use client";

import { useSession as useNextAuthSession } from "next-auth/react";
import type { SessionUser } from "@/types/auth";

// ────────── Typed Session Hook ──────────

interface UseSessionReturn {
  /** The current session user, or null if not authenticated */
  user: SessionUser | null;
  /** Whether the session is currently being loaded */
  isLoading: boolean;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** The session status: "loading" | "authenticated" | "unauthenticated" */
  status: "loading" | "authenticated" | "unauthenticated";
  /** Update the session (e.g., after onboarding) */
  update: (data?: Record<string, unknown>) => Promise<unknown>;
}

export function useSession(): UseSessionReturn {
  const { data: session, status, update } = useNextAuthSession();

  const user: SessionUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
        role: session.user.role,
        plan: session.user.plan,
        onboardingDone: session.user.onboardingDone,
        emailVerified: session.user.emailVerified,
      }
    : null;

  return {
    user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    status,
    update,
  };
}

export default useSession;
