import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { prisma, ensureDatabase } from "@/lib/db";
import { getCategoryMeta } from "@/lib/categoryMeta";
import { normalizePlanContent, scrubPlanContent, isPublished, hasRenderableContent } from "@/lib/planContent";
import Link from "next/link";
import { getTemplate, resolveValues, renderFromTemplate, FREE_VIRTUAL_CARE } from "@/lib/planTemplates";
import PlanPageActions from "@/components/PlanPageActions";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.kennionprogram.com";

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

  // Templated categories (Health/Dental/Vision) render a uniform standard grid;
  // Supplemental keeps the cleaned freeform content.
  const template = getTemplate(plan.category);
  const freeform = scrubPlanContent(normalizePlanContent(plan.contentJson));
  let content;
  if (template) {
    const values = resolveValues(plan.category, plan.contentJson, freeform);
    content = renderFromTemplate(plan.category, values);
  } else {
    content = freeform;
    if (!hasRenderableContent(content) && !isPreview) notFound();
  }

  const meta = getCategoryMeta(plan.category);
  const Icon = meta.icon;
  const title = content.title || plan.name;

  // QR (printed footer) deep-links to this plan's live page on kennionprogram.com
  const planUrl = `${SITE_URL}/plans/${id}`;
  let qrDataUrl = "";
  try {
    qrDataUrl = await QRCode.toDataURL(planUrl, { width: 160, margin: 0 });
  } catch {
    // QR is decorative for print; ignore failures
  }

  return (
    <div className="page-container">
      <PlanPageActions />

      {/* Print-only branded header */}
      <div className="print-only mb-5 border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-extrabold tracking-wide text-[var(--kennion-navy)]">
            KENNION <span className="font-medium text-slate-400">Benefits Program</span>
          </div>
          <div className="text-[11px] text-slate-400">kennionprogram.com</div>
        </div>
      </div>

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

      {/* Free Virtual Care — included on every medical plan */}
      {plan.category === "Health Plans" && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-bold text-[var(--kennion-navy)]">
                {FREE_VIRTUAL_CARE.heading}
              </h2>
              <p className="text-[12px] text-slate-500">{FREE_VIRTUAL_CARE.note}</p>
            </div>
            <Link
              href={FREE_VIRTUAL_CARE.href}
              className="no-print shrink-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-2 text-[12px] font-semibold text-white shadow-sm transition-all hover:shadow-md"
            >
              {FREE_VIRTUAL_CARE.cta} →
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {FREE_VIRTUAL_CARE.services.map((s) => (
              <div key={s} className="rounded-xl border border-emerald-100 bg-white p-3 text-center">
                <div className="text-[12px] font-semibold leading-tight text-[var(--kennion-navy)]">{s}</div>
                <div className="mt-1 text-[15px] font-extrabold text-emerald-600">Free</div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Fixed branded footer with QR — repeats on every printed/PDF page */}
      <div className="print-footer">
        <div className="text-[10px] leading-tight text-slate-500">
          <div className="text-[11px] font-extrabold tracking-wide text-[var(--kennion-navy)]">
            KENNION <span className="font-medium text-slate-400">Benefits Program</span>
          </div>
          <div>{plan.category} &middot; {title}</div>
          <div>kennionprogram.com</div>
        </div>
        {qrDataUrl && (
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrDataUrl} alt="Scan to view this plan at kennionprogram.com" />
            <div className="mt-0.5 text-[8px] text-slate-400">Scan to view online</div>
          </div>
        )}
      </div>
    </div>
  );
}
