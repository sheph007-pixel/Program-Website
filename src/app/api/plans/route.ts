import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { isPublished } from "@/lib/planContent";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureDatabase();
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        category: true,
        sortOrder: true,
        summaryUrl: true,
        pdfName: true,
        contentStatus: true,
      },
    });

    // A web page is only published when it has renderable content (enforced at
    // write time by the content PUT + publish-all), so status alone is a safe,
    // cheap signal here — no need to load the heavy contentJson.
    const shaped = plans.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      sortOrder: p.sortOrder,
      summaryUrl: p.summaryUrl,
      pdfName: p.pdfName,
      hasWebPage: isPublished(p.contentStatus),
    }));

    // Group by category
    const grouped: Record<string, typeof shaped> = {};
    for (const plan of shaped) {
      if (!grouped[plan.category]) grouped[plan.category] = [];
      grouped[plan.category].push(plan);
    }

    return NextResponse.json(grouped, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
