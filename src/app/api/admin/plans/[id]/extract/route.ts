import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { extractPlanContent } from "@/lib/extractPlanContent";
import { getTemplate, prefillValues } from "@/lib/planTemplates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Generate a draft from the plan's PDF and RETURN it for the editor to load.
 * This does NOT persist - the admin reviews the draft and clicks Save. That
 * keeps a currently-published page live (and its content intact) until the
 * admin deliberately saves, matching the editor's "until you save" prompt.
 */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await ensureDatabase();
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: { name: true, category: true, pdfData: true, contentStatus: true },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    if (!plan.pdfData) {
      return NextResponse.json({ error: "No PDF to extract from" }, { status: 400 });
    }

    const content = await extractPlanContent(Buffer.from(plan.pdfData), plan.name);
    // For templated categories, map the extraction onto the standard fields.
    const template = getTemplate(plan.category);
    const values = template ? prefillValues(plan.category, content) : null;

    // Return without persisting; the editor holds it until the admin saves.
    return NextResponse.json({ ok: true, content, values, contentStatus: plan.contentStatus });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
