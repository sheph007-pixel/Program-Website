import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });

    // Group by category
    const grouped: Record<string, typeof plans> = {};
    for (const plan of plans) {
      if (!grouped[plan.category]) grouped[plan.category] = [];
      grouped[plan.category].push(plan);
    }

    return NextResponse.json(grouped);
  } catch {
    // Fallback: return empty if DB not connected
    return NextResponse.json({});
  }
}
