import { prisma, ensureDatabase } from "@/lib/db";

/**
 * Diagnose and fix plans where PDFs were uploaded but summaryUrl
 * still points to SharePoint instead of the internal PDF endpoint.
 */
export async function GET() {
  try {
    await ensureDatabase();

    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        summaryUrl: true,
        externalUrl: true,
        pdfName: true,
        // Check if pdfData exists without fetching the binary
        pdfData: false,
      },
    });

    // We need a separate query to check which plans actually have pdfData
    // since select: false doesn't help us check existence
    const plansWithPdfCheck = await prisma.$queryRawUnsafe<
      { id: string; has_pdf: boolean }[]
    >(`SELECT id, ("pdfData" IS NOT NULL) as has_pdf FROM "Plan"`);

    const pdfMap = new Map(plansWithPdfCheck.map((p) => [p.id, p.has_pdf]));

    const report: {
      fixed: { name: string; oldUrl: string; newUrl: string }[];
      alreadyCorrect: string[];
      noPdfData: string[];
    } = { fixed: [], alreadyCorrect: [], noPdfData: [] };

    for (const plan of plans) {
      const hasPdfData = pdfMap.get(plan.id) ?? false;
      const isInternal = plan.summaryUrl.startsWith("/api/plans/");

      if (hasPdfData && !isInternal) {
        // PDF was uploaded but summaryUrl still points externally — FIX IT
        const newUrl = `/api/plans/${plan.id}/pdf`;
        await prisma.plan.update({
          where: { id: plan.id },
          data: {
            summaryUrl: newUrl,
            // Preserve external URL if not already saved
            ...(plan.summaryUrl.startsWith("http") && !plan.externalUrl
              ? { externalUrl: plan.summaryUrl }
              : {}),
          },
        });
        report.fixed.push({ name: plan.name, oldUrl: plan.summaryUrl, newUrl });
      } else if (hasPdfData && isInternal) {
        report.alreadyCorrect.push(plan.name);
      } else {
        report.noPdfData.push(plan.name);
      }
    }

    return Response.json({
      totalPlans: plans.length,
      fixed: report.fixed.length,
      alreadyCorrect: report.alreadyCorrect.length,
      noPdfData: report.noPdfData.length,
      details: report,
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
