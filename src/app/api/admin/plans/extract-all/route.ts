import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { extractPlanContent } from "@/lib/extractPlanContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Generate draft web-page content for every plan that has a PDF.
 * Processed sequentially to bound memory. Published plans are skipped
 * (so admin edits are never clobbered). Returns a per-plan result list.
 */
export async function POST() {
  try {
    await ensureDatabase();
    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: { id: true, name: true, pdfData: true, contentStatus: true },
    });

    const results: { id: string; name: string; ok: boolean; status: string; reason?: string }[] = [];

    for (const plan of plans) {
      if (!plan.pdfData) {
        results.push({ id: plan.id, name: plan.name, ok: false, status: "skipped", reason: "no PDF" });
        continue;
      }
      if (plan.contentStatus === "published") {
        results.push({ id: plan.id, name: plan.name, ok: false, status: "skipped", reason: "published" });
        continue;
      }
      try {
        const content = await extractPlanContent(Buffer.from(plan.pdfData), plan.name);
        await prisma.plan.update({
          where: { id: plan.id },
          data: { contentJson: content, contentStatus: "draft", contentUpdatedAt: new Date() },
        });
        const facts = content.keyFacts.length + content.sections.length;
        results.push({
          id: plan.id,
          name: plan.name,
          ok: true,
          status: "draft",
          reason: facts === 0 ? "empty draft — needs manual entry" : undefined,
        });
      } catch (e) {
        results.push({
          id: plan.id,
          name: plan.name,
          ok: false,
          status: "error",
          reason: e instanceof Error ? e.message : "extract failed",
        });
      }
    }

    const generated = results.filter((r) => r.ok).length;
    return NextResponse.json({ ok: true, generated, total: results.length, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Bulk extraction failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
