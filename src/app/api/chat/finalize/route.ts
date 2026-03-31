import { NextRequest } from "next/server";
import OpenAI from "openai";
import { prisma } from "@/lib/db";

function getClient() {
  return new OpenAI({ apiKey: process.env.openai || process.env.OPENAI_API_KEY || "" });
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return Response.json({ ok: true });

    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!session || session.summary || session.messages.length < 2) {
      return Response.json({ ok: true });
    }

    const transcript = session.messages
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const completion = await getClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Summarize this benefits support chat in 1-2 sentences. Focus on what the member needed help with and whether it was resolved. Be concise.",
        },
        { role: "user", content: transcript },
      ],
      max_tokens: 150,
    });

    const summary = completion.choices[0]?.message?.content || "No summary available";

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { summary },
    });

    return Response.json({ ok: true, summary });
  } catch {
    return Response.json({ ok: true });
  }
}
