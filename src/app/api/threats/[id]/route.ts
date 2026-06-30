import { NextRequest, NextResponse } from "next/server";
import { mockThreats, mockEvents } from "@/lib/mock-data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const threat = mockThreats.find((t) => t.id === id);
  if (!threat) return NextResponse.json({ success: false, error: "Threat not found" }, { status: 404 });
  const events = mockEvents.filter((e) => e.threatId === id);
  return NextResponse.json({ success: true, data: { ...threat, events } });
}
