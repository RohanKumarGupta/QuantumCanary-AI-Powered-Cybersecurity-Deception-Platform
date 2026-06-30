import { NextRequest, NextResponse } from "next/server";
import { mockAnalyticsData } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, data: mockAnalyticsData });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}
