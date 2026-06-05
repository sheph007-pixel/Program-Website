import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { normalizePlanContent, scrubPlanContent, hasRenderableContent } from "@/lib/planContent";
import { getTemplate, resolveValues, cleanValues } from "@/lib/planTemplates";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = new Set(["none", "draft", "published"]);

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

    const template = getTemplate(plan.category);
    const freeform = scrubPlanContent(normalizePlanContent(plan.contentJson));

    return NextResponse.json({
      name: plan.name,
      category: plan.category,
      pdfName: plan.pdfName,
      contentStatus: plan.contentStatus,
      contentUpdatedAt: plan.contentUpdatedAt,
      // Templated categories edit a structured form; Supplemental stays freeform.
      template: template ?? null,
      values: template ? resolveValues(plan.category, plan.contentJson, freeform) : null,
      content: freeform,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await ensureDatabase();
    const plan0 = await prisma.plan.findUnique({ where: { id }, select: { category: true } });
    if (!plan0) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const body = await req.json();
    const requestedStatus =
      typeof body?.contentStatus === "string" && ALLOWED_STATUS.has(body.contentStatus)
        ? body.contentStatus
        : "draft";

    const template = getTemplate(plan0.category);

    // Templated categories store a { values } map; the standard fields always
    // render, so no "must have content" guard is needed. Supplemental is freeform.
    let contentJson: object;
    if (template) {
      contentJson = { values: cleanValues(plan0.category, body?.values) };
    } else {
      const freeform = normalizePlanContent(body?.content);
      if (requestedStatus === "published" && !hasRenderableContent(freeform)) {
        return NextResponse.json(
          { error: "Add at least one key fact or section before publishing." },
          { status: 400 }
        );
      }
      contentJson = freeform;
    }

    const plan = await prisma.plan.update({
      where: { id },
      data: {
        contentJson,
        contentStatus: requestedStatus,
        contentUpdatedAt: new Date(),
      },
      select: { contentStatus: true, contentUpdatedAt: true },
    });

    return NextResponse.json({ ok: true, ...plan });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to save content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
