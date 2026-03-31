import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.content !== undefined) data.content = body.content;
    if (body.isActive !== undefined) data.isActive = body.isActive;
    if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

    const rule = await prisma.aIMemoryRule.update({
      where: { id },
      data,
    });

    return Response.json({ rule });
  } catch {
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.aIMemoryRule.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
