"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Check, X as XIcon } from "lucide-react";

type Row = {
  category: string;
  traditional: string;
  kennion: string;
};

const rows: Row[] = [
  {
    category: "Provider Access",
    traditional:
      "In-network and out-of-network distinction. Members are pushed into a defined network or pay sharply more outside it.",
    kennion:
      "No network restriction. Members can see any licensed doctor, specialist, hospital, or facility in any state.",
  },
  {
    category: "Pricing",
    traditional:
      "The carrier negotiates discounts off provider-set charges. The discount is opaque, and the underlying sticker rises every year.",
    kennion:
      "The plan pays every provider a fair, transparent rate built on a public Medicare benchmark. No negotiated-discount theater.",
  },
  {
    category: "Member Support",
    traditional:
      "Phone trees, call-center wait times, and explanation-of-benefits letters the member has to decode alone.",
    kennion:
      "Real-person concierge through HealthJoy, available by app or phone. The concierge calls providers on the member's behalf and resolves bills before they become problems.",
  },
  {
    category: "Out-of-Pocket Protection",
    traditional:
      "Deductible, copay, and coinsurance are paid out of pocket. A surprise out-of-network bill is the member's problem to fight.",
    kennion:
      "Paytient card every member carries: pay at the time of service at zero interest, submit the receipt, plan reimburses 100%. For larger procedures, the plan pre-pays the facility directly through Apta Cash.",
  },
  {
    category: "Premium Stability",
    traditional:
      "Annual rate hikes in the high single digits or more. A heavy claims year often produces a step-change at renewal.",
    kennion:
      "Captive structure smooths claim-year spikes. Renewals consistently come in below the broader fully insured market trend. Strong claim years build credit toward future rate stability.",
  },
  {
    category: "Brand Recognition",
    traditional:
      "Blue Cross, UnitedHealthcare, Cigna, or Aetna name on the card.",
    kennion:
      "Plan administrator name on the card (EBPA or HealthEZ). The administrator handles claims the same way any other self-funded plan does.",
  },
];

export default function VsTraditionalGuide() {
  return (
    <div className="min-h-screen bg-white text-slate-800 print:bg-white">
      <style jsx global>{`
        @page {
          size: letter;
          margin: 0.5in;
        }
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="no-print sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3">
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[var(--kennion-navy)]"
          >
            <ArrowLeft size={14} strokeWidth={2.2} />
            Education Center
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--kennion-navy)] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-blue-900"
          >
            <Printer size={14} strokeWidth={2.2} />
            Save as PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10 print:py-0">
        <header className="border-b border-slate-200 pb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
            For Employers and Advisors
          </div>
          <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--kennion-navy)]">
            How Your Plan Compares
          </h1>
          <p className="mt-2 text-[16px] text-slate-600">
            A side-by-side look at the Kennion Program versus a traditional Blue
            Cross, UnitedHealthcare, Cigna, or Aetna plan.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            The Short Version
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            Traditional carrier plans were built on networks and negotiated
            discounts. The Kennion Program is built on transparent pricing and
            member support. The structural differences below explain why the
            economics and the member experience are different, and why most
            small and mid-sized employers who switch do not go back.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Side by Side
          </h2>
          <div className="mt-4 space-y-3">
            {rows.map((row) => (
              <div
                key={row.category}
                className="rounded-2xl border border-slate-200 p-5 print:break-inside-avoid"
              >
                <h3 className="text-[15px] font-bold text-[var(--kennion-navy)]">
                  {row.category}
                </h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2 print:grid-cols-2">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <XIcon size={10} strokeWidth={2.5} />
                      Traditional
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-600">
                      {row.traditional}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--kennion-blue)]">
                      <Check size={10} strokeWidth={2.5} />
                      Kennion
                    </div>
                    <p className="text-[13px] leading-relaxed text-slate-700">
                      {row.kennion}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            One Thing Worth Knowing
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
            The honest tradeoff is brand recognition. A traditional carrier card
            carries a logo employees have seen for decades. A Kennion plan card
            carries the administrator's name. At the point of care the brand
            does nothing for the patient; the provider does not give better care
            because of a logo, and a claim is not paid any differently. What the
            brand provides is the feeling of certainty.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
            The Kennion Program replaces that feeling with real infrastructure: a
            concierge team that handles provider questions, a Paytient card that
            turns any visit into a fully-reimbursed event, and Apta Cash for
            facility pre-pay. None of those exist on a traditional carrier plan.
            Employers who make the switch consistently report that the support
            system is what their employees actually wanted in the first place.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Bottom Line
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            Traditional carrier plans are familiar. They are also the largest
            single driver of the cost growth they were originally designed to
            contain. The Kennion Program offers the same legal protections
            (real insurance, A-rated reinsurance behind a captive), the same
            care access (any licensed provider in any state), and a stronger
            member-support layer, at a more predictable long-term cost.
          </p>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-[11px] text-slate-400">
            Kennion Benefits Program · Hunter Shepherd, President ·
            205-641-0469 · hunter@kennion.com · www.kennionprogram.com
          </p>
        </footer>
      </article>
    </div>
  );
}
