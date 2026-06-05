import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { normalizePlanContent, hasRenderableContent } from "@/lib/planContent";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await ensureDatabase();
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: {
        name: true,
        category: true,
        pdfName: true,
        contentJson: true,
        contentStatus: true,
        contentUpdatedAt: true,
      },
    });
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    return NextResponse.json({
      name: plan.name,
      category: plan.category,
      pdfName: plan.pdfName,
      contentStatus: plan.contentStatus,
      contentUpdatedAt: plan.contentUpdatedAt,
      content: normalizePlanContent(plan.contentJson),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const ALLOWED_STATUS = new Set(["none", "draft", "published"]);

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await ensureDatabase();
    const body = await req.json();
    const content = normalizePlanContent(body?.content);
    const requestedStatus =
      typeof body?.contentStatus === "string" && ALLOWED_STATUS.has(body.contentStatus)
        ? body.contentStatus
        : "draft";

    // Invariant: a published page must always have something to render, so the
    // public list/detail can rely on status alone without loading contentJson.
    if (requestedStatus === "published" && !hasRenderableContent(content)) {
      return NextResponse.json(
        { error: "Add at least one key fact or section before publishing." },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        contentJson: content,
        contentStatus: requestedStatus,
        contentUpdatedAt: new Date(),
      },
      select: { contentStatus: true, contentUpdatedAt: true },
    });

    return NextResponse.json({ ok: true, content, ...plan });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to save content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
