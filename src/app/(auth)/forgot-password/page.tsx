"use client";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-center mb-1">Reset your password</h1>
      <p className="text-sm text-muted text-center mb-6">Enter your email and we&apos;ll send a reset link</p>
      <ForgotPasswordForm />
    </div>
  );
}
