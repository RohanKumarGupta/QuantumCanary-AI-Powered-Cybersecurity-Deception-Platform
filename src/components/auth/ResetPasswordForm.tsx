'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPasswordSchema, type ResetPasswordInput } from '@/lib/validations';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, ShieldX, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PASSWORD_REQUIREMENTS = [
  { key: 'length', label: '8+ characters', test: (pw: string) => pw.length >= 8 },
  { key: 'upper', label: 'Uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { key: 'number', label: 'Number', test: (pw: string) => /[0-9]/.test(pw) },
  { key: 'special', label: 'Special character', test: (pw: string) => /[^a-zA-Z0-9]/.test(pw) },
] as const;

const STRENGTH_COLORS = ['#E24B4A', '#BA7517', '#EFB927', '#1D9E75'] as const;

function getStrengthScore(password: string): number {
  return PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
}

type TokenStatus = 'verifying' | 'valid' | 'invalid' | 'success';

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('verifying');
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '', token },
  });

  const watchedPassword = watch('password', '');
  const strengthScore = useMemo(() => getStrengthScore(watchedPassword), [watchedPassword]);

  useEffect(() => {
    if (!token) {
      setTokenStatus('invalid');
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/auth/verify-reset-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        setTokenStatus(res.ok ? 'valid' : 'invalid');
      } catch {
        setTokenStatus('invalid');
      }
    })();
  }, [token]);

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: data.token,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || 'Failed to reset password');
      }

      setTokenStatus('success');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Verifying Token ──
  if (tokenStatus === 'verifying') {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#378ADD]" />
        <p className="text-sm text-[#5A6A82]">Verifying your reset link…</p>
      </div>
    );
  }

  // ── Invalid Token ──
  if (tokenStatus === 'invalid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-[rgba(226,75,74,0.12)] flex items-center justify-center">
            <ShieldX className="w-7 h-7 text-[#E24B4A]" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#E8EDF5] font-display">Invalid or expired link</h2>
        <p className="text-sm text-[#5A6A82] leading-relaxed">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <Link href="/forgot-password" className="btn-primary inline-flex w-auto px-6">
          Request new link
        </Link>
      </motion.div>
    );
  }

  // ── Success ──
  if (tokenStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-[rgba(29,158,117,0.12)] flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-[#1D9E75]" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#E8EDF5] font-display">Password reset!</h2>
        <p className="text-sm text-[#5A6A82]">Redirecting you to sign in…</p>
        <Loader2 className="w-4 h-4 animate-spin text-[#378ADD] mx-auto" />
      </motion.div>
    );
  }

  // ── Reset Form ──
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-[#E8EDF5] font-display">Set new password</h2>
        <p className="text-sm text-[#5A6A82] mt-1">Choose a strong password for your account.</p>
      </div>

      {formError && (
        <div className="flex items-center gap-2 rounded-lg bg-[rgba(226,75,74,0.12)] border border-[rgba(226,75,74,0.3)] p-3 text-sm text-[#E24B4A]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="hidden" {...register('token')} />

        {/* New Password */}
        <div>
          <label htmlFor="new-password" className="label-text">
            New password
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`input-field pr-10 ${errors.password ? 'error' : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6A82] hover:text-[#E8EDF5] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password.message}</p>}

          {/* Strength Meter */}
          {watchedPassword.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{
                      background:
                        i < strengthScore
                          ? STRENGTH_COLORS[strengthScore - 1]
                          : 'rgba(255,255,255,0.08)',
                    }}
                  />
                ))}
              </div>
              <ul className="space-y-1">
                {PASSWORD_REQUIREMENTS.map((req) => {
                  const met = req.test(watchedPassword);
                  return (
                    <li key={req.key} className="flex items-center gap-1.5 text-xs">
                      <motion.div
                        initial={false}
                        animate={{ scale: met ? [1, 1.3, 1] : 1, color: met ? '#1D9E75' : '#5A6A82' }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-3 h-3" />
                      </motion.div>
                      <span style={{ color: met ? '#1D9E75' : '#5A6A82' }}>{req.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="reset-confirm" className="label-text">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="reset-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              className={`input-field pr-10 ${errors.confirmPassword ? 'error' : ''}`}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6A82] hover:text-[#E8EDF5] transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting…
            </>
          ) : (
            'Reset password'
          )}
        </button>
      </form>
    </div>
  );
}
