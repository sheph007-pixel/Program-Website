import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";

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
        isActive: true,
      },
    });

    // Group by category
    const grouped: Record<string, typeof plans> = {};
    for (const plan of plans) {
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
