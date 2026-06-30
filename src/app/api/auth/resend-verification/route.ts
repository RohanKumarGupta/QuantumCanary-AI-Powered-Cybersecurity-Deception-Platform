import { NextResponse } from "next/server";
import crypto from "crypto";

import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";
import { checkRateLimit, resendVerificationLimiter } from "@/lib/rate-limit";

// ────────── POST /api/auth/resend-verification ──────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit: 3 per hour per email
    const rateLimitResult = await checkRateLimit(
      resendVerificationLimiter,
      normalizedEmail
    );
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error:
            "Too many verification requests. Please wait before trying again.",
        },
        { status: 429 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Don't reveal whether the email exists
      return NextResponse.json({
        success: true,
        message: "If an account exists with that email, a verification link has been sent.",
      });
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Your email is already verified.",
      });
    }

    // Delete any existing verification tokens for this email
    await db.verificationToken.deleteMany({
      where: { identifier: normalizedEmail },
    });

    // Generate new verification token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await db.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: hashedToken,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // Send verification email
    await sendVerificationEmail({
      to: normalizedEmail,
      name: user.name || "there",
      token: rawToken,
    });

    return NextResponse.json({
      success: true,
      message: "Verification email sent. Please check your inbox.",
    });
  } catch (error) {
    console.error("[RESEND_VERIFICATION_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
