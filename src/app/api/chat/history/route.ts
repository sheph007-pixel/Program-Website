import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const userCode = req.nextUrl.searchParams.get("userCode");
  if (!userCode) {
    return Response.json({ sessions: [] });
  }

  try {
    const sessions = await prisma.chatSession.findMany({
      where: { userCode },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        summary: true,
        status: true,
        ticketSent: true,
        createdAt: true,
        _count: { select: { messages: true } },
      },
    });

    return Response.json({ sessions });
  } catch {
    return Response.json({ sessions: [] });
  }
}
