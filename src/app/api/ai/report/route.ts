import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPTS, AI_MODEL } from "@/lib/ai";
import { mockThreats } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { threatId } = await req.json();
    const threat = mockThreats.find((t) => t.id === threatId) || mockThreats[0];
    const threatData = `IP: ${threat.ipAddress}, Type: ${threat.attackerType}, Score: ${threat.threatScore}, Tools: ${threat.toolchain.join(", ")}, Country: ${threat.country}, Events: ${threat.totalEvents}`;
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse(`# Incident Report — ${threat.ipAddress}\n\n## Executive Summary\nA ${threat.attackerType?.toLowerCase()} threat actor from ${threat.country} was detected targeting our infrastructure with a threat score of ${threat.threatScore}/100.\n\n## Attack Vectors\n- Toolchain: ${threat.toolchain.join(", ")}\n- Total events: ${threat.totalEvents}\n\n## Recommended Actions\n1. Block IP ${threat.ipAddress} at firewall level\n2. Review access logs for compromised systems\n3. Rotate affected credentials`, { headers: { "Content-Type": "text/plain" } });
    }
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await openai.chat.completions.create({
      model: AI_MODEL,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPTS.REPORT_GENERATOR }, { role: "user", content: `Generate incident report for: ${threatData}` }],
    });
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });
    return new NextResponse(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Report generation failed" }, { status: 500 });
  }
}
