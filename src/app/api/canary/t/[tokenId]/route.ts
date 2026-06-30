import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ tokenId: string }> }) {
  const { tokenId } = await params;
  // Public endpoint: canary token was accessed/triggered
  console.log(`[CANARY] Token ${tokenId} triggered from ${req.headers.get("x-forwarded-for") || "unknown"}`);
  // In production: update DB, send alert email, log event
  return new NextResponse("", { status: 200 });
}
