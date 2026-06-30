import { NextRequest, NextResponse } from "next/server";
import { mockHoneypots } from "@/lib/mock-data";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const honeypot = mockHoneypots.find((h) => h.id === id);
  if (!honeypot) return NextResponse.json({ success: false, error: "Honeypot not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: honeypot });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  return NextResponse.json({ success: true, data: { id, ...body } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ success: true, message: `Honeypot ${id} deleted` });
}
