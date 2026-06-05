"use client";

import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";

/** Action bar for a plan detail page. Hidden when printing (no-print). */
export default function PlanPageActions() {
  return (
    <div className="no-print mb-6 flex flex-wrap items-center gap-2.5">
      <Link
        href="/plans"
        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
      >
        <ArrowLeft size={15} strokeWidth={2} />
        All plans
      </Link>

      <div className="flex-1" />

      <button
        onClick={() => window.print()}
        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:scale-[0.98]"
      >
        <Printer size={15} strokeWidth={2} />
        Print / Save as PDF
      </button>
    </div>
  );
}
