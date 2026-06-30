import { NextRequest, NextResponse } from "next/server";
import { mockThreats } from "@/lib/mock-data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const threat = mockThreats.find((t) => t.id === id);
  if (!threat) return NextResponse.json({ success: false, error: "Threat not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: { classification: threat.attackerType, score: threat.threatScore, toolchain: threat.toolchain, analysis: "AI dossier generation requires OpenAI API key configuration." } });
}
