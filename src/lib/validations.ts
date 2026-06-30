import { z } from "zod";

// ────────── Auth Schemas ──────────

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

// ────────── User Schemas ──────────

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  image: z.string().url().optional().or(z.literal("")),
});

export const onboardingSchema = z.object({
  orgName: z.string().optional(),
  industry: z.string().optional(),
  teamSize: z.string().optional(),
  infrastructure: z.array(z.string()).optional(),
});

// ────────── Honeypot Schemas ──────────

export const honeypotSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.enum(["SSH", "API", "SMTP", "S3", "DATABASE"]),
  port: z.number().int().min(1).max(65535).optional(),
  description: z.string().max(500).optional(),
  config: z.record(z.unknown()).optional(),
});

export const honeypotUpdateSchema = honeypotSchema.partial().extend({
  status: z.enum(["ACTIVE", "PAUSED", "ARCHIVED"]).optional(),
});

// ────────── Canary Token Schemas ──────────

export const canaryTokenSchema = z.object({
  tokenType: z.enum(["URL", "DNS", "DOCUMENT", "IMAGE"]),
  label: z.string().max(100).optional(),
  honeypotId: z.string().optional(),
});

// ────────── Threat Schemas ──────────

export const threatUpdateSchema = z.object({
  status: z.enum(["ACTIVE", "LURED", "TRAPPED", "BLOCKED", "RESOLVED"]).optional(),
  llmAnalysis: z.string().optional(),
});

// ────────── AI Schemas ──────────

export const aiAnalyzeSchema = z.object({
  logText: z.string().min(10, "Log text must be at least 10 characters").max(50000),
});

export const aiChatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

export const aiReportSchema = z.object({
  threatId: z.string(),
});

// ────────── Team Schemas ──────────

export const teamInviteSchema = z.object({
  email: z.string().email("Enter a valid email"),
  role: z.enum(["ADMIN", "VIEWER"]),
});

// ────────── Type Exports ──────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type HoneypotInput = z.infer<typeof honeypotSchema>;
export type HoneypotUpdateInput = z.infer<typeof honeypotUpdateSchema>;
export type CanaryTokenInput = z.infer<typeof canaryTokenSchema>;
export type ThreatUpdateInput = z.infer<typeof threatUpdateSchema>;
export type AIAnalyzeInput = z.infer<typeof aiAnalyzeSchema>;
export type AIChatInput = z.infer<typeof aiChatSchema>;
export type AIReportInput = z.infer<typeof aiReportSchema>;
export type TeamInviteInput = z.infer<typeof teamInviteSchema>;
