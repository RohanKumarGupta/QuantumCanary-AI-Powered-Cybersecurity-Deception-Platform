import { NextResponse } from "next/server";
import crypto from "crypto";

import { db } from "@/lib/db";

// ────────── POST /api/auth/verify-reset-token ──────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { valid: false, error: "Token is required." },
        { status: 400 }
      );
    }

    // Hash the incoming token to compare with stored hash
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find the reset token
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });

    // Token doesn't exist
    if (!resetToken) {
      return NextResponse.json({ valid: false });
    }

    // Token is expired
    if (resetToken.expires < new Date()) {
      return NextResponse.json({ valid: false });
    }

    // Token has been used
    if (resetToken.used) {
      return NextResponse.json({ valid: false });
    }

    // Token is valid
    return NextResponse.json({
      valid: true,
      email: resetToken.email,
    });
  } catch (error) {
    console.error("[VERIFY_RESET_TOKEN_ERROR]", error);
    return NextResponse.json(
      { valid: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
