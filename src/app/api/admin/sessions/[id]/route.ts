import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await prisma.chatSession.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });

    if (!session) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ session });
  } catch {
    return Response.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.status) data.status = body.status;

    const session = await prisma.chatSession.update({
      where: { id },
      data,
    });

    return Response.json({ session });
  } catch {
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.chatSession.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}
