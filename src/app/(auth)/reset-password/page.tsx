import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-center mb-1">Set new password</h1>
      <p className="text-sm text-muted text-center mb-6">Enter your new password below</p>
      <Suspense fallback={<div className="h-40 w-full animate-pulse bg-space-700/50 rounded-lg" />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
