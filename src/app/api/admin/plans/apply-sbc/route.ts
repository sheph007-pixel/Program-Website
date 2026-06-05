import { NextResponse } from "next/server";
import { prisma, ensureDatabase } from "@/lib/db";
import { cleanValues } from "@/lib/planTemplates";
import { PLAN_SEED_VALUES } from "@/lib/planSeedValues";

export const dynamic = "force-dynamic";

/**
 * Apply the official SBC-extracted standard-field values to matching plans
 * (matched by plan name). Merges over any existing values (SBC wins for its
 * fields), keeps the plan's current publish status, so live published pages show
 * the real numbers immediately instead of "Refer to plan documents".
 */
export async function POST() {
  try {
    await ensureDatabase();
    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: { id: true, name: true, category: true, contentJson: true },
    });

    const results: { id: string; name: string; ok: boolean; status: string; reason?: string }[] = [];

    for (const plan of plans) {
      const seed = PLAN_SEED_VALUES[plan.name];
      if (!seed) {
        results.push({ id: plan.id, name: plan.name, ok: false, status: "skipped", reason: "no SBC data" });
        continue;
      }
      const existing = ((plan.contentJson as { values?: Record<string, string> } | null)?.values) ?? {};
      const merged = cleanValues(plan.category, { ...existing, ...seed });
      await prisma.plan.update({
        where: { id: plan.id },
        data: { contentJson: { values: merged }, contentUpdatedAt: new Date() },
      });
      results.push({ id: plan.id, name: plan.name, ok: true, status: "updated", reason: `${Object.keys(merged).length} fields` });
    }

    const updated = results.filter((r) => r.ok).length;
    return NextResponse.json({ ok: true, updated, total: results.length, results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Apply SBC failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
