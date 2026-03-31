import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const userCode = req.nextUrl.searchParams.get("userCode");
  const userName = req.nextUrl.searchParams.get("userName");

  if (!userCode && !userName) {
    return Response.json({ sessions: [] });
  }

  try {
    // Build filter: match by userCode OR userName for backward compatibility
    const conditions = [];
    if (userCode) conditions.push({ userCode });
    if (userName) conditions.push({ userName });

    const sessions = await prisma.chatSession.findMany({
      where: conditions.length === 1 ? conditions[0] : { OR: conditions },
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
