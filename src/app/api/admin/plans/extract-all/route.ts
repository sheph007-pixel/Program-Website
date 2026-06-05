import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { extractPlanContent } from "@/lib/extractPlanContent";
import { getTemplate, prefillValues } from "@/lib/planTemplates";

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
      select: { id: true, name: true, category: true, pdfData: true, contentStatus: true },
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
        const template = getTemplate(plan.category);
        // Templated categories store a { values } map mapped onto standard fields;
        // Supplemental stores the cleaned freeform content.
        const values = template ? prefillValues(plan.category, content) : null;
        const contentJson = template ? { values } : content;
        await prisma.plan.update({
          where: { id: plan.id },
          data: { contentJson, contentStatus: "draft", contentUpdatedAt: new Date() },
        });
        const filled = template
          ? Object.keys(values ?? {}).length
          : content.keyFacts.length + content.sections.length;
        results.push({
          id: plan.id,
          name: plan.name,
          ok: true,
          status: "draft",
          reason: filled === 0 ? "no fields matched — needs manual entry" : `${filled} fields filled`,
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
