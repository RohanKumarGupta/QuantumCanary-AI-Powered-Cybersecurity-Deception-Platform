import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Stripe webhook handler placeholder
  const body = await req.text();
  console.log("[Stripe Webhook] Received event");
  return NextResponse.json({ received: true });
}
