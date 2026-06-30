import { NextRequest, NextResponse } from "next/server";
import { mockThreats } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, data: mockThreats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch threats" }, { status: 500 });
  }
}
