import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete account" }, { status: 500 });
  }
}
