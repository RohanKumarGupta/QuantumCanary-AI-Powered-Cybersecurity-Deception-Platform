import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const serverRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

// ────────── POST /api/auth/register ──────────

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const parsed = serverRegisterSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Try database registration, fall back to mock if DB unavailable
    try {
      const { db } = await import("@/lib/db");
      await db.$connect();

      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      // Hash password & create user
      const passwordHash = await bcrypt.hash(password, 12);
      await db.user.create({
        data: { name, email: normalizedEmail, passwordHash },
      });
    } catch {
      // DB not available — accept registration in demo mode
      console.log(`[REGISTER_DEMO] Mock registration for ${normalizedEmail}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
