import { NextRequest, NextResponse } from "next/server";
import { mockCanaryTokens } from "@/lib/mock-data";
import { canaryTokenSchema } from "@/lib/validations";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: mockCanaryTokens });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = canaryTokenSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 });
    const token = { id: `ct_${Date.now()}`, userId: "demo", tokenHash: crypto.randomBytes(16).toString("hex"), ...parsed.data, triggered: false, triggeredAt: null, triggeredIp: null, triggeredMeta: {}, createdAt: new Date() };
    return NextResponse.json({ success: true, data: token }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create canary token" }, { status: 500 });
  }
}
