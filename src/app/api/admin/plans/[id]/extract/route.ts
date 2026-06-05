import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { extractPlanContent } from "@/lib/extractPlanContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const force = req.nextUrl.searchParams.get("force") === "1";

  try {
    await ensureDatabase();
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: { name: true, pdfData: true, contentStatus: true },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }
    if (!plan.pdfData) {
      return NextResponse.json({ error: "No PDF to extract from" }, { status: 400 });
    }
    // Never silently clobber a published page.
    if (plan.contentStatus === "published" && !force) {
      return NextResponse.json(
        { error: "Plan is published — pass ?force=1 to regenerate the draft" },
        { status: 409 }
      );
    }

    const content = await extractPlanContent(Buffer.from(plan.pdfData), plan.name);

    await prisma.plan.update({
      where: { id },
      data: {
        contentJson: content,
        contentStatus: "draft",
        contentUpdatedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, content, contentStatus: "draft" });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
