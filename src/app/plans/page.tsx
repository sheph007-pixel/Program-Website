"use client";

import { useState, useEffect, useCallback } from "react";
import { FileText, ExternalLink, X, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneContact from "@/components/PhoneContact";
import { useRefreshOnVisible } from "@/lib/useRefreshOnVisible";
import { categoryMeta } from "@/lib/categoryMeta";

type Plan = {
  id: string;
  name: string;
  category: string;
  summaryUrl: string;
  pdfName: string | null;
  hasWebPage?: boolean;
};

const categoryOrder = ["Health Plans", "Dental Plans", "Vision Plans", "Supplemental"];

type SupportInfo = { type: "idcard"; label: string; sublabel: string; gradient: string; shadow: string } | { type: "phone"; number: string; label: string; sublabel: string; gradient: string; shadow: string };

const categorySupport: Record<string, SupportInfo[] | null> = {
  "Health Plans": [
    { type: "idcard", label: "Health Plan Support", sublabel: "Call the number on the back of your ID card", gradient: "from-blue-600 to-blue-500", shadow: "shadow-blue-500/20" },
    { type: "phone", number: "(877) 500-3212", label: "HealthJoy Concierge", sublabel: "Don't have your ID card? Call HealthJoy 24/7 and they can help", gradient: "from-purple-600 to-fuchsia-500", shadow: "shadow-purple-500/20" },
  ],
  "Dental Plans": [
    { type: "idcard", label: "Dental Plan Support", sublabel: "Call the number on the back of your ID card", gradient: "from-indigo-600 to-violet-500", shadow: "shadow-violet-500/20" },
    { type: "phone", number: "(877) 500-3212", label: "HealthJoy Concierge", sublabel: "Don't have your ID card? Call HealthJoy 24/7 and they can help", gradient: "from-purple-600 to-fuchsia-500", shadow: "shadow-purple-500/20" },
  ],
  "Vision Plans": [
    { type: "phone", number: "(800) 877-7195", label: "VSP Vision Care", sublabel: "Call VSP for vision plan questions and support", gradient: "from-violet-600 to-purple-500", shadow: "shadow-purple-500/20" },
  ],
  "Supplemental": null,
};

export default function PlansPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("Health Plans");
  const [plans, setPlans] = useState<Record<string, Plan[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await fetch("/api/plans", { cache: "no-store" });
      const data = await res.json();
      if (data && Object.keys(data).length > 0) {
        setPlans(data);
      }
    } catch {
      // silent - page just shows empty categories
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Re-pull the latest plans whenever the page is brought back to the
  // foreground (e.g. reopening on mobile) so updates show without a refresh.
  useRefreshOnVisible(fetchPlans);

  // Close modal on Escape
  useEffect(() => {
    if (!selectedPlan) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPlan(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedPlan]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPlan) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedPlan]);

  const activePlans = plans[activeCategory] || [];
  const meta = categoryMeta[activeCategory];

  const hasPdf = (plan: Plan) => !!plan.pdfName;
  const hasWebPage = (plan: Plan) => !!plan.hasWebPage;
  const pdfUrl = (plan: Plan) => `/api/plans/${plan.id}/pdf`;

  const handlePlanClick = (plan: Plan) => {
    if (hasWebPage(plan)) {
      router.push(`/plans/${plan.id}`);
    } else if (hasPdf(plan)) {
      setSelectedPlan(plan);
    } else {
      window.open(plan.summaryUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">
          Plans
        </h1>
        <p className="page-subtitle">
          These are all the plans offered through the Kennion Benefits Program.
          To see the specific plans and rates for your group, log in to enroll,
          call the Benefits Enrollment Line, or check the HealthJoy app.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 animate-fade-in-up stagger-1">
        {categoryOrder.map((cat) => {
          const catMeta = categoryMeta[cat];
          const CatIcon = catMeta.icon;
          const isActive = activeCategory === cat;
          const count = (plans[cat] || []).length;
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
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading plans...</div>
      ) : activePlans.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">No plans available</div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 animate-fade-in-up stagger-2">
          {activePlans.map((plan, i) => (
            <button
              key={plan.id}
              onClick={() => handlePlanClick(plan)}
              className="card card-interactive group flex items-center gap-3 p-3.5 text-left transition-all w-full"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.bg}`}>
                <FileText size={16} className={meta.color} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)] leading-tight sm:text-[13px]">
                  {plan.name}
                </h3>
                <p className="text-[12px] text-slate-400 mt-0.5 sm:text-[11px]">
                  {hasWebPage(plan) ? "View details" : hasPdf(plan) ? "View summary" : "View details"}
                </p>
              </div>
              {hasWebPage(plan) ? (
                <ArrowRight size={14} className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500" />
              ) : hasPdf(plan) ? (
                <FileText size={14} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
              ) : (
                <ExternalLink size={14} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Support Contacts for Category */}
      {categorySupport[activeCategory] && (
        <>
          <div className="divider" />
          <div className="badge mb-4 bg-slate-100 text-slate-500">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Get Help
          </div>
          <div className="flex flex-col gap-3 animate-fade-in-up">
            {categorySupport[activeCategory]!.map((info) =>
              info.type === "idcard" ? (
                <div key={info.label} className="card flex items-center gap-4 p-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} shadow-lg ${info.shadow}`}>
                    <FileText size={20} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[var(--kennion-navy)]">
                      {info.label}
                    </div>
                    <div className="text-[12px] text-slate-400 mt-0.5">
                      {info.sublabel}
                    </div>
                  </div>
                </div>
              ) : (
                <PhoneContact
                  key={info.label}
                  number={info.number}
                  label={info.label}
                  sublabel={info.sublabel}
                  gradient={info.gradient}
                  shadow={info.shadow}
                />
              )
            )}
          </div>
        </>
      )}

      {/* ===== PDF VIEWER MODAL ===== */}
      {selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedPlan(null); }}
        >
          <div className="flex flex-col w-full h-full sm:w-[90vw] sm:max-w-4xl sm:h-[85vh] sm:rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4 bg-white">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryMeta[selectedPlan.category]?.bg || "bg-slate-50"}`}>
                <FileText size={18} className={categoryMeta[selectedPlan.category]?.color || "text-slate-500"} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] sm:text-[16px] font-bold text-[var(--kennion-navy)] truncate">
                  {selectedPlan.name}
                </h3>
                <p className="text-[11px] text-slate-400">{selectedPlan.category}</p>
              </div>
              <a
                href={pdfUrl(selectedPlan)}
                download
                className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[12px] font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* PDF Iframe */}
            <div className="flex-1 bg-slate-100">
              <iframe
                src={pdfUrl(selectedPlan)}
                className="w-full h-full border-0"
                title={`${selectedPlan.name} Summary`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
