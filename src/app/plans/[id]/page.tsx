import { notFound } from "next/navigation";
import { prisma, ensureDatabase } from "@/lib/db";
import { getCategoryMeta } from "@/lib/categoryMeta";
import { normalizePlanContent, isPublished, hasRenderableContent } from "@/lib/planContent";
import PlanPageActions from "@/components/PlanPageActions";

export const dynamic = "force-dynamic";

export default async function PlanDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { id } = await params;
  const { preview } = await searchParams;

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

  // Only show published pages publicly. ?preview=1 also reveals drafts (for admins).
  const isPreview = preview === "1";
  if (!plan || !plan.isActive) notFound();
  if (!isPublished(plan.contentStatus) && !isPreview) notFound();

  const content = normalizePlanContent(plan.contentJson);
  if (!hasRenderableContent(content) && !isPreview) notFound();

  const meta = getCategoryMeta(plan.category);
  const Icon = meta.icon;
  const title = content.title || plan.name;

  return (
    <div className="page-container">
      <PlanPageActions planId={id} hasPdf={!!plan.pdfName} />

      {isPreview && !isPublished(plan.contentStatus) && (
        <div className="no-print mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-[12px] font-medium text-amber-800">
          Preview — this page is a {plan.contentStatus} and is not visible to members yet.
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} shadow-lg ${meta.shadow}`}>
            <Icon size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            <div className={`text-[12px] font-semibold ${meta.color}`}>{plan.category}</div>
            <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-[var(--kennion-navy)] sm:text-[30px]">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Key facts */}
      {content.keyFacts.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {content.keyFacts.map((fact, i) => (
            <div key={i} className="card p-4">
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {fact.label}
              </div>
              <div className="mt-1 text-[16px] font-bold text-[var(--kennion-navy)]">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sections */}
      <div className="space-y-5">
        {content.sections.map((section, i) => (
          <div key={i} className="card overflow-hidden p-0">
            <div className="border-b border-slate-100 px-5 py-3.5">
              <h2 className="text-[15px] font-bold text-[var(--kennion-navy)]">
                {section.heading}
              </h2>
            </div>
            <div className="px-5 py-4">
              {section.body && (
                <p className="mb-3 whitespace-pre-line text-[13px] leading-relaxed text-slate-600 last:mb-0">
                  {section.body}
                </p>
              )}
              {section.rows && section.rows.length > 0 && (
                <table className="w-full border-collapse">
                  <tbody>
                    {section.rows.map((row, j) => (
                      <tr key={j} className="border-b border-slate-100 last:border-0">
                        <td className="py-2.5 pr-4 align-top text-[13px] font-medium text-slate-500">
                          {row.label}
                        </td>
                        <td className="py-2.5 text-right align-top text-[13px] font-semibold text-[var(--kennion-navy)]">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      {content.disclaimer && (
        <p className="mt-6 text-[11px] leading-relaxed text-slate-400">
          {content.disclaimer}
        </p>
      )}
    </div>
  );
}
