import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { normalizePlanContent, hasRenderableContent } from "@/lib/planContent";
import { getTemplate } from "@/lib/planTemplates";

export const dynamic = "force-dynamic";

/**
 * Publish every plan that has renderable web-page content. Plans with empty
 * content are skipped (and reported) so members never see a broken/404 page.
 * Returns a per-plan result list.
 */
export async function POST() {
  try {
    await ensureDatabase();
    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: { id: true, name: true, category: true, contentJson: true, contentStatus: true },
    });

    const results: { id: string; name: string; ok: boolean; status: string; reason?: string }[] = [];

    for (const plan of plans) {
      // Templated categories always render the standard grid, so they're always
      // publishable; freeform (Supplemental) needs actual content.
      const renderable = getTemplate(plan.category)
        ? true
        : hasRenderableContent(normalizePlanContent(plan.contentJson));
      if (!renderable) {
        results.push({
          id: plan.id,
          name: plan.name,
          ok: false,
          status: "skipped",
          reason: "no content - needs a draft / manual entry",
        });
        continue;
      }
      if (plan.contentStatus === "published") {
        results.push({ id: plan.id, name: plan.name, ok: true, status: "published", reason: "already published" });
        continue;
      }
      await prisma.plan.update({
        where: { id: plan.id },
        data: { contentStatus: "published", contentUpdatedAt: new Date() },
      });
      results.push({ id: plan.id, name: plan.name, ok: true, status: "published" });
    }

    const published = results.filter((r) => r.ok).length;
    const skipped = results.filter((r) => !r.ok).length;
    return NextResponse.json({ ok: true, published, skipped, total: results.length, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Bulk publish failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
