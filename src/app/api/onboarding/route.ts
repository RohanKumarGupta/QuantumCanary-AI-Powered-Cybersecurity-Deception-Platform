import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, message: "Onboarding completed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save onboarding data" }, { status: 500 });
  }
}
