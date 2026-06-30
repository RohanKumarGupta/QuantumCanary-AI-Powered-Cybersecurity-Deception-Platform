import { Suspense } from "react";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-center mb-1">Welcome back</h1>
      <p className="text-sm text-muted text-center mb-6">Sign in to your QuantumCanary account</p>
      <OAuthButtons />
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[rgba(55,138,221,0.15)]" />
        <span className="text-xs text-muted">or continue with email</span>
        <div className="flex-1 h-px bg-[rgba(55,138,221,0.15)]" />
      </div>
      <Suspense fallback={<div className="h-40 w-full animate-pulse bg-space-700/50 rounded-lg" />}>
        <LoginForm />
      </Suspense>
      <p className="text-sm text-muted text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-honey hover:underline">Create one free →</Link>
      </p>
    </div>
  );
}
