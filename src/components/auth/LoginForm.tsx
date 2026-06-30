'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError('Invalid email or password. Please try again.');
      } else {
        router.push(callbackUrl);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
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

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-text">
          Email
        </label>
        <input
          id="email"
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
        <label htmlFor="password" className="label-text">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
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
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-[#5A6A82] hover:text-[#E8EDF5] transition-colors">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded border-[rgba(55,138,221,0.3)] bg-transparent accent-[#378ADD]"
          />
          <span>Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-[#378ADD] hover:text-[#5BA4E8] transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <button type="submit" disabled={isLoading} className="btn-primary mt-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-[#5A6A82] mt-4">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#378ADD] hover:text-[#5BA4E8] transition-colors font-medium">
          Create one free →
        </Link>
      </p>
    </form>
  );
}
