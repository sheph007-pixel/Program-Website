import { NextRequest } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status") || "all";
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const perPage = 20;

  // Only surface real, two-way conversations - a session must have at least one
  // message the visitor actually typed (not just someone opening the widget).
  const where: Record<string, unknown> = {
    messages: { some: { role: "user" } },
  };
  if (status !== "all") {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { userName: { contains: search, mode: "insensitive" } },
      { userCode: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    await ensureDatabase();
    const [sessions, totalCount] = await Promise.all([
      prisma.chatSession.findMany({
        where,
        include: { _count: { select: { messages: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.chatSession.count({ where }),
    ]);

    return Response.json({
      sessions,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage),
      page,
    });
  } catch {
    return Response.json({ sessions: [], totalCount: 0, totalPages: 0, page: 1 });
  }
}
