import { prisma, ensureDatabase } from "@/lib/db";

export async function GET() {
  try {
    await ensureDatabase();
    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        summaryUrl: true,
        pdfName: true,
        externalUrl: true,
      },
    });
    return Response.json({ count: plans.length, plans });
  } catch (e) {
    return Response.json({ error: String(e) });
  }
}
