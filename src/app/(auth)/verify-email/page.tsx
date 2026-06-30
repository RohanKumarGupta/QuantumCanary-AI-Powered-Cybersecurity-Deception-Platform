"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) { setStatus("error"); return; }
    fetch("/api/auth/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) })
      .then((r) => { setStatus(r.ok ? "success" : "error"); if (r.ok) setTimeout(() => router.push("/dashboard"), 2000); })
      .catch(() => setStatus("error"));
  }, [token, router]);

  return (
    <div className="text-center py-8">
      {status === "loading" && <><Loader2 size={48} className="animate-spin text-honey mx-auto mb-4" /><p>Verifying your email...</p></>}
      {status === "success" && <><CheckCircle size={48} className="text-asset mx-auto mb-4" /><h2 className="text-xl font-display font-bold mb-2">Email Verified!</h2><p className="text-sm text-muted">Redirecting to dashboard...</p></>}
      {status === "error" && <><XCircle size={48} className="text-threat mx-auto mb-4" /><h2 className="text-xl font-display font-bold mb-2">Verification Failed</h2><p className="text-sm text-muted mb-4">The link may have expired.</p><Link href="/login" className="btn-primary inline-flex px-6">Back to Login</Link></>}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="text-center py-8"><Loader2 size={48} className="animate-spin text-honey mx-auto mb-4" /><p>Loading...</p></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
