import { NextRequest, NextResponse } from "next/server";
import { mockHoneypots } from "@/lib/mock-data";
import { honeypotSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ success: true, data: mockHoneypots });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch honeypots" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = honeypotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 });
    }
    const newHoneypot = {
      id: `hp_${Date.now()}`,
      userId: "demo",
      ...parsed.data,
      status: "ACTIVE",
      totalHits: 0,
      deployedAt: new Date(),
      updatedAt: new Date(),
      config: parsed.data.config || {},
      generatedData: null,
    };
    return NextResponse.json({ success: true, data: newHoneypot }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create honeypot" }, { status: 500 });
  }
}
