import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a Redis client if env vars are set, otherwise use an in-memory fallback
function getRedis() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return null;
}

const redis = getRedis();

// ────────── Rate Limiters ──────────

/**
 * Register endpoint: 5 per hour per IP
 */
export const registerLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:register",
    })
  : null;

/**
 * Login endpoint: 10 per 15 min per IP
 */
export const loginLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "15 m"),
      prefix: "rl:login",
    })
  : null;

/**
 * Forgot password: 3 per hour per email
 */
export const forgotPasswordLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "rl:forgot-password",
    })
  : null;

/**
 * Resend verification: 3 per hour per user
 */
export const resendVerificationLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "rl:resend-verify",
    })
  : null;

/**
 * AI routes: 20 per minute per user
 */
export const aiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      prefix: "rl:ai",
    })
  : null;

/**
 * General API: 100 per minute per user
 */
export const apiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "1 m"),
      prefix: "rl:api",
    })
  : null;

/**
 * Check rate limit - returns true if allowed, false if rate limited
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining?: number; reset?: number }> {
  if (!limiter) {
    // No Redis configured - allow all requests in development
    return { success: true };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
