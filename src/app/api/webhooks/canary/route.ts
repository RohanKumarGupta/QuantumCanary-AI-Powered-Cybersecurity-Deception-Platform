import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[Canary Webhook] Token triggered:", body);
  return NextResponse.json({ success: true, message: "Canary event processed" });
}
