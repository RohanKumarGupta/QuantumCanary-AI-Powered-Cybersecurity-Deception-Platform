import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPTS, AI_MODEL } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { logText } = await req.json();
    if (!logText || logText.length < 10) {
      return NextResponse.json({ success: false, error: "Log text is too short" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      // Return mock analysis when no API key
      const mockAnalysis = `ATTACKER CLASSIFICATION: Automated Scanner
THREAT SCORE: 78 — Systematic credential brute-force with post-exploitation behavior
TOOLCHAIN DETECTED: hydra, wget, custom shell scripts
BEHAVIORAL ANALYSIS: The attacker performed a methodical credential brute-force attack, suggesting automated tooling. Post-authentication commands indicate immediate reconnaissance and payload delivery from an external server, consistent with botnet recruitment or cryptominer deployment.
RECOMMENDED ACTIONS:
1. Block the source IP at firewall and submit to threat intelligence feeds
2. Rotate all SSH credentials and implement key-based authentication
3. Investigate the external server for C2 infrastructure`;
      return new NextResponse(mockAnalysis, { headers: { "Content-Type": "text/plain" } });
    }
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await openai.chat.completions.create({
      model: AI_MODEL,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.THREAT_ANALYZER },
        { role: "user", content: `Analyze these security logs:\n\n${logText}` },
      ],
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
    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 });
  }
}
