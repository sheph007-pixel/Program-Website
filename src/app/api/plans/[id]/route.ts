import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { normalizePlanContent, isPublished } from "@/lib/planContent";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const preview = req.nextUrl.searchParams.get("preview") === "1";

  try {
    await ensureDatabase();
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: {
        name: true,
        category: true,
        contentJson: true,
        contentStatus: true,
        pdfName: true,
        isActive: true,
      },
    });

    if (!plan || !plan.isActive) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (!isPublished(plan.contentStatus) && !preview) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        name: plan.name,
        category: plan.category,
        pdfName: plan.pdfName,
        contentStatus: plan.contentStatus,
        content: normalizePlanContent(plan.contentJson),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
