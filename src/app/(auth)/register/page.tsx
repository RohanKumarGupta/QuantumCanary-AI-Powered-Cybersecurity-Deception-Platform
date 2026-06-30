"use client";

import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-center mb-1">Create your account</h1>
      <p className="text-sm text-muted text-center mb-6">Start detecting threats in 90 seconds</p>
      <OAuthButtons />
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[rgba(55,138,221,0.15)]" />
        <span className="text-xs text-muted">or sign up with email</span>
        <div className="flex-1 h-px bg-[rgba(55,138,221,0.15)]" />
      </div>
      <RegisterForm />
      <p className="text-sm text-muted text-center mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-honey hover:underline">Sign in →</Link>
      </p>
    </div>
  );
}
