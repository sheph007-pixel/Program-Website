import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const rules = await prisma.aIMemoryRule.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return Response.json({ rules });
  } catch {
    return Response.json({ rules: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    if (!content?.trim()) {
      return Response.json({ error: "Content required" }, { status: 400 });
    }

    const maxSort = await prisma.aIMemoryRule.aggregate({ _max: { sortOrder: true } });
    const nextOrder = (maxSort._max.sortOrder || 0) + 1;

    const rule = await prisma.aIMemoryRule.create({
      data: { content: content.trim(), sortOrder: nextOrder },
    });

    return Response.json({ rule });
  } catch {
    return Response.json({ error: "Failed to create rule" }, { status: 500 });
  }
}
