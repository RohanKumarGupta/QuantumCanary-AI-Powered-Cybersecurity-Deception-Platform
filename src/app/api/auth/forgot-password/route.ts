import { NextResponse } from "next/server";
import crypto from "crypto";

import { db } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit, forgotPasswordLimiter } from "@/lib/rate-limit";

// ────────── POST /api/auth/forgot-password ──────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit by email
    const rateLimitResult = await checkRateLimit(
      forgotPasswordLimiter,
      normalizedEmail
    );
    if (!rateLimitResult.success) {
      // Still return success for security — don't reveal rate limiting to attackers
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success for security (don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, we've sent a password reset link.",
      });
    }

    // Invalidate any existing reset tokens for this email
    await db.passwordResetToken.updateMany({
      where: {
        email: normalizedEmail,
        used: false,
      },
      data: {
        used: true,
      },
    });

    // Generate reset token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    // Store hashed token (expires in 1 hour)
    await db.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        token: hashedToken,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    // Send reset email
    await sendPasswordResetEmail({
      to: normalizedEmail,
      name: user.name || "there",
      token: rawToken,
    });

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, we've sent a password reset link.",
    });
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
