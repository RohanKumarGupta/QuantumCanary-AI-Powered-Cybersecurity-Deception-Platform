import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPTS, AI_MODEL } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Messages required" }, { status: 400 });
    }
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("I'm the QuantumCanary AI assistant. To enable full AI capabilities, please configure your OPENAI_API_KEY in the environment variables. I can help with cybersecurity concepts, honeypot deployment strategies, and threat analysis once configured.", { headers: { "Content-Type": "text/plain" } });
    }
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const stream = await openai.chat.completions.create({
      model: AI_MODEL,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPTS.CHAT_ASSISTANT }, ...messages],
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
    return NextResponse.json({ success: false, error: "Chat failed" }, { status: 500 });
  }
}
