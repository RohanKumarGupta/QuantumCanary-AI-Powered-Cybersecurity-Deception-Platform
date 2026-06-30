'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerSchema, type RegisterInput } from '@/lib/validations';
import { Eye, EyeOff, Loader2, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const PASSWORD_REQUIREMENTS = [
  { key: 'length', label: '8+ characters', test: (pw: string) => pw.length >= 8 },
  { key: 'upper', label: 'Uppercase letter', test: (pw: string) => /[A-Z]/.test(pw) },
  { key: 'number', label: 'Number', test: (pw: string) => /[0-9]/.test(pw) },
  { key: 'special', label: 'Special character', test: (pw: string) => /[^a-zA-Z0-9]/.test(pw) },
] as const;

const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'] as const;
const STRENGTH_COLORS = ['#E24B4A', '#BA7517', '#EFB927', '#1D9E75'] as const;

function getStrengthScore(password: string): number {
  return PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
}

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', terms: false },
  });

  const watchedPassword = watch('password', '');
  const strengthScore = useMemo(() => getStrengthScore(watchedPassword), [watchedPassword]);

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || 'Registration failed');
      }

      // Auto sign-in after registration
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setAuthError('Account created but auto sign-in failed. Please sign in manually.');
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Banner */}
      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 rounded-lg bg-[rgba(226,75,74,0.12)] border border-[rgba(226,75,74,0.3)] p-3 text-sm text-[#E24B4A]">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label htmlFor="name" className="label-text">
          Full name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          className={`input-field ${errors.name ? 'error' : ''}`}
          {...register('name')}
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="label-text">
          Work email
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={`input-field ${errors.email ? 'error' : ''}`}
          {...register('email')}
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="reg-password" className="label-text">
          Password
        </label>
        <div className="relative">
          <input
            id="reg-password"
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
            <p
              className="text-xs font-medium transition-colors duration-300"
              style={{ color: STRENGTH_COLORS[Math.max(0, strengthScore - 1)] }}
            >
              {strengthScore > 0 ? STRENGTH_LABELS[strengthScore - 1] : 'Too short'}
            </p>

            {/* Requirements Checklist */}
            <ul className="space-y-1">
              {PASSWORD_REQUIREMENTS.map((req) => {
                const met = req.test(watchedPassword);
                return (
                  <li key={req.key} className="flex items-center gap-1.5 text-xs">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: met ? [1, 1.3, 1] : 1,
                        color: met ? '#1D9E75' : '#5A6A82',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3" />
                    </motion.div>
                    <span
                      className="transition-colors duration-200"
                      style={{ color: met ? '#1D9E75' : '#5A6A82' }}
                    >
                      {req.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="reg-confirm" className="label-text">
          Confirm password
        </label>
        <div className="relative">
          <input
            id="reg-confirm"
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

      {/* Terms */}
      <div>
        <label className="flex items-start gap-2 cursor-pointer text-sm text-[#5A6A82]">
          <input
            type="checkbox"
            className="mt-0.5 w-3.5 h-3.5 rounded border-[rgba(55,138,221,0.3)] bg-transparent accent-[#378ADD]"
            {...register('terms')}
          />
          <span>
            I agree to the{' '}
            <a href="/terms" className="text-[#378ADD] hover:underline" target="_blank">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#378ADD] hover:underline" target="_blank">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.terms && <p className="error-text">{errors.terms.message}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={isLoading} className="btn-primary mt-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account…
          </>
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
}
