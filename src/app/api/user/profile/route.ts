import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ success: true, data: { name: "Demo User", email: "user@quantumcanary.io", orgName: "Acme Corp", plan: "PRO" } });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, data: body, message: "Profile updated" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 });
  }
}
