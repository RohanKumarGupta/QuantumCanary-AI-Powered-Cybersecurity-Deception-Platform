'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });
      // Always show success regardless of email existence (security)
      setIsSent(true);
    } catch {
      setIsSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-[rgba(29,158,117,0.12)] flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-[#1D9E75]" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#E8EDF5] font-display">Check your email</h2>
        <p className="text-sm text-[#5A6A82] leading-relaxed">
          If an account with that email exists, we&apos;ve sent a password reset link. Check your inbox and
          spam folder.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-[#378ADD] hover:text-[#5BA4E8] transition-colors font-medium mt-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to sign in
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-[#E8EDF5] font-display">Forgot your password?</h2>
        <p className="text-sm text-[#5A6A82] mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="reset-email" className="label-text">
            Email
          </label>
          <input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={`input-field ${errors.email ? 'error' : ''}`}
            {...register('email')}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            'Send reset link'
          )}
        </button>

        <p className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-[#5A6A82] hover:text-[#E8EDF5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
