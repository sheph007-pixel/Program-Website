import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          select: { role: true, content: true },
        },
      },
    });

    if (!session) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({
      sessionId: session.id,
      messages: session.messages,
      ticketSent: session.ticketSent,
    });
  } catch {
    return Response.json({ error: "Failed to load" }, { status: 500 });
  }
}
