"use client";

import { useState } from "react";
import { Shield, Stethoscope, Eye, HeartPulse, X, ExternalLink, FileText, ChevronRight } from "lucide-react";

type Plan = { name: string; summaryUrl: string };

const categoryMeta: Record<string, { icon: typeof Shield; color: string; gradient: string; shadow: string; bg: string }> = {
  "Health Plans": { icon: Shield, color: "text-blue-600", gradient: "from-blue-600 to-blue-500", shadow: "shadow-blue-500/20", bg: "bg-blue-50" },
  "Dental Plans": { icon: Stethoscope, color: "text-indigo-600", gradient: "from-indigo-600 to-violet-500", shadow: "shadow-violet-500/20", bg: "bg-indigo-50" },
  "Vision Plans": { icon: Eye, color: "text-violet-600", gradient: "from-violet-600 to-purple-500", shadow: "shadow-purple-500/20", bg: "bg-violet-50" },
  "Supplemental": { icon: HeartPulse, color: "text-teal-600", gradient: "from-teal-600 to-emerald-500", shadow: "shadow-emerald-500/20", bg: "bg-teal-50" },
};

// Static plan data (works without DB — DB can override via API)
const staticPlans: Record<string, Plan[]> = {
  "Health Plans": [
    { name: "Deluxe Platinum", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDjbxGFQKCtTLE-pAQjj6HAAaS3JHitaKhwlw2QteYgfDs?e=FdajUc" },
    { name: "Elite Health", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDiF-qR_lnSR46Cd9NCz5qgAculq2WeagWDxidEQ9i7DIc?e=aVy6jZ" },
    { name: "Freedom Platinum", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBfdf1DrXCGSKomJsf_91P7AbTkhqRxLH93Gk-qHTmLTrQ?e=h9kI87" },
    { name: "Premier Health", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCyEt8YEtvDSb02wOrhvpO1AaVg44QV1kxL2z86NMdygto?e=XJrtsi" },
    { name: "Choice Gold", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC5MNDjfZKMQ7yWSHI_EB3SAefFq02DB42YyV0zTWepuRc?e=8wPAx0" },
    { name: "Freedom Gold", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAv3Z7Q9Qs8T7B2EYZPfIymAcps0iDCrTg7G8BjCc27yGo?e=mUpNG0" },
    { name: "Select Health", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBnSZsY1kfVR43xJdohvpMlAWhQuWx6ox8OvrwNGpjh7vo?e=BkILWK" },
    { name: "Basic Gold", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGqetmNCvjSI5NMeT5iOmjAcewCSy2xov3oTOZQJu27to?e=QSjaJS" },
    { name: "Preferred Silver", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAYRhZ0CCxdQKyrTe9YO3NKAdAkv6VhRNe5SGAe9zkxDTE?e=kVdW9x" },
    { name: "Enhanced Silver", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAuc9wDHKnVRoXyPeQ4IY43AdvOEVhos94V5bt9mun5EZI?e=opToXJ" },
    { name: "Freedom Silver", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDH6B4j6MiuRZMie658uV20AbeaRwekwp7Hgfj-3Mgkg-I?e=ubZxvM" },
    { name: "Core Health", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAOp3ukpGTBToVCAEjQ3uVHAVf2g1j4ftsbsVoLwcGtzag?e=fxhCna" },
    { name: "Classic Silver", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBC2681O-G9QLN0l5ETbzDoAQIpbvHwbzkr3fTppEPAXDc?e=nCnyUV" },
    { name: "Saver HSA", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBHhZx5Gp8IQ4W-zYLmS1JzAUK2EA9tXOSwgoFz9uqQMhw?e=89V3r7" },
    { name: "Freedom Bronze", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDMspItNgscRJ_H3njoL5w3AZ9LKu6lgJTpCQhnda_QX3s?e=jP32OB" },
  ],
  "Dental Plans": [
    { name: "Advantage Dental (W Ortho)", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC1zNTdLbCfSKJSl0nZut-jAZYEVN2E6i8ehEcKIM0tdrU?e=D0Dbhr" },
    { name: "Complete Dental (W Ortho)", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQARyqwnbTxmT5p_V5yPCvuFAeeaj1qBW6bltnCw1DGaadY?e=etPWcd" },
    { name: "Value Dental (W Ortho)", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAJhfPyTeISR6g630yMPL7rAfIh0KqKCBDdMKy8wXNt1RI?e=9DW6ON" },
    { name: "Complete Dental", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDsmA3LxY0xSa5Ubz-9uLD_AZOiVrHXjk3aF0lw2s-AHPg?e=h3KHAD" },
    { name: "Value Dental", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCqpwo6dBnASrxCgQEZbj6bAZVQHgQnGK27Qb0dIvwQcic?e=vz2T5A" },
    { name: "Basic Dental", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCCBYcyLhXyTKz3ztcFG6nSAaeCZYIRmoscfv-ODP183nA?e=VAmfh0" },
    { name: "Choice Dental", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDRZP1EmrZjTYo6OxTAP5YNAe6cInudHdmeAe4EsgYdWGM?e=bNOAAW" },
  ],
  "Vision Plans": [
    { name: "Premium Vision", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGHsTU0pS-QJebH4j_09OWAZ2zV-EPZw4G8dajTD1RAco?e=Lctihu" },
    { name: "Standard Vision", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDz2khRMs-8T6K52hyB6XyOAa_nb61a4xrpZDMRGjP4_K4?e=YIEVCe" },
    { name: "Value Vision", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCIB4xpeM3hR7gJ-3b-FvRxAWidQM4y69kLD7txvrPpATA?e=ezJ4ic" },
    { name: "Base Vision", summaryUrl: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCrPHVJa5-_Qo4F9rgxl2M6ARVgvx_XsqusN1EzYWgPQbY?e=MRuc8G" },
  ],
  "Supplemental": [
    { name: "Accident Insurance", summaryUrl: "https://kennionplans.com" },
    { name: "Cancer Insurance", summaryUrl: "https://kennionplans.com" },
    { name: "Critical Illness Insurance", summaryUrl: "https://kennionplans.com" },
    { name: "Disability Insurance", summaryUrl: "https://kennionplans.com" },
    { name: "Hospital + Surgery Insurance (GAP)", summaryUrl: "https://kennionplans.com" },
    { name: "Individual Life ($100k+)", summaryUrl: "https://kennionplans.com" },
    { name: "Voluntary Life (Max $100k)", summaryUrl: "https://kennionplans.com" },
  ],
};

const categoryOrder = ["Health Plans", "Dental Plans", "Vision Plans", "Supplemental"];

function PdfViewerModal({ plan, category, onClose }: { plan: Plan; category: string; onClose: () => void }) {
  const meta = categoryMeta[category];
  const Icon = meta?.icon || FileText;

  // Convert SharePoint sharing link to embeddable format
  const embedUrl = plan.summaryUrl.includes("sharepoint.com")
    ? plan.summaryUrl.replace(":b:", ":b:") + "&action=embedview"
    : plan.summaryUrl;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${meta?.gradient} shadow-md`}>
            <Icon size={16} className="text-white" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-bold text-[var(--kennion-navy)] truncate">{plan.name}</h3>
            <p className="text-[12px] text-slate-400">{category} &middot; Plan Summary</p>
          </div>
          <a
            href={plan.summaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-semibold text-[var(--kennion-blue)] transition-all hover:bg-blue-50 hover:border-blue-200"
          >
            <ExternalLink size={13} />
            Open in New Tab
          </a>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-slate-50">
          <iframe
            src={embedUrl}
            className="h-full w-full border-0"
            title={`${plan.name} - Plan Summary`}
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<{ plan: Plan; category: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Health Plans");

  const activePlans = staticPlans[activeCategory] || [];
  const meta = categoryMeta[activeCategory];
  const ActiveIcon = meta?.icon || Shield;

  return (
    <>
      <div className="page-container">
        <div className="page-header animate-fade-in-up">
          <h1 className="page-title">Plans</h1>
          <p className="page-subtitle">
            Explore all benefits available through our national program.
            Click any plan to view its summary.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 animate-fade-in-up stagger-1">
          {categoryOrder.map((cat) => {
            const catMeta = categoryMeta[cat];
            const CatIcon = catMeta.icon;
            const isActive = activeCategory === cat;
            const count = (staticPlans[cat] || []).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--kennion-navy)] text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                <CatIcon size={15} strokeWidth={1.8} />
                {cat.replace(" Plans", "")}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Plan Tiles Grid */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up stagger-2">
          {activePlans.map((plan, i) => (
            <button
              key={plan.name}
              onClick={() => setSelectedPlan({ plan, category: activeCategory })}
              className="card card-interactive group flex items-center gap-3 p-3.5 text-left transition-all"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.bg}`}>
                <FileText size={16} className={meta.color} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] truncate leading-tight">
                  {plan.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">View summary</p>
              </div>
              <ChevronRight size={14} className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500" />
            </button>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPlan && (
        <PdfViewerModal
          plan={selectedPlan.plan}
          category={selectedPlan.category}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}
