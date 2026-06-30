import { NextRequest, NextResponse } from "next/server";
import { mockDashboardStats } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, data: mockDashboardStats });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
