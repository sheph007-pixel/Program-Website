"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Phone, HelpCircle, Calendar, ShieldCheck, ClipboardList } from "lucide-react";

const explainers = [
  {
    icon: HelpCircle,
    title: "What is Apta Cash?",
    body: "Apta Cash is a healthcare concierge service that helps employees lower their out-of-pocket costs by choosing high-quality providers who offer affordable cash prices for major procedures.",
  },
  {
    icon: Calendar,
    title: "When should I call?",
    body: "Whenever one of your doctors recommends a major diagnostic test or surgery that can be planned in advance, call Apta Cash first at 205-651-4729. Earlier is better, since the team needs time to negotiate.",
  },
  {
    icon: ShieldCheck,
    title: "Why does it help?",
    body: "Your plan deductible and coinsurance are waived when you use Apta Cash. If you are enrolled in an HDHP, IRS rules may require a minimum deductible, but the savings are still significant.",
  },
  {
    icon: ClipboardList,
    title: "How does it work?",
    body: "Your Apta Cash coordinator asks about the procedure, helps you choose a high-value provider, negotiates a cash price below the plan's typical cost, walks you through scheduling and any required pre-certification, and prepares to pay the full cash price when you receive care.",
  },
];

const steps = [
  "Pain or symptom",
  "Schedule appointment",
  "Receive diagnosis",
  "Doctor recommends procedure",
  "Call Apta Cash",
  "We negotiate cash price",
  "You save money",
];

export default function AptaCashGuide() {
  return (
    <div className="min-h-screen bg-white text-slate-800 print:bg-white">
      <style jsx global>{`
        @page { size: letter; margin: 0.5in; }
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-amber-700">
            For Members
          </div>
          <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-[var(--kennion-navy)]">
            Save money on surgery and major procedures.
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
            If your doctor recommends a planned surgery or expensive diagnostic
            test, Apta Cash can negotiate a lower price and waive your plan
            deductible and coinsurance.
          </p>
        </header>

        {/* Phone callout */}
        <section className="mt-6 print:break-inside-avoid">
          <a
            href="tel:2056514729"
            className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-5 text-white shadow-md print:break-inside-avoid"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Phone size={22} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
                Call Apta Cash
              </p>
              <p className="text-[26px] font-extrabold leading-tight">205-651-4729</p>
            </div>
          </a>
        </section>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            How Apta Cash Works
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {explainers.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:break-inside-avoid"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                    <h3 className="text-[14px] font-bold text-[var(--kennion-navy)]">
                      {e.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    {e.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Seven Steps to Save
          </h2>
          <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap print:flex-row print:flex-wrap">
            {steps.map((s, i) => (
              <li
                key={i}
                className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 p-3 sm:min-w-0 sm:basis-[calc(50%-0.25rem)] print:basis-[calc(50%-0.25rem)]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[13px] font-semibold text-[var(--kennion-navy)]">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Worth Knowing
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-700">
            Apta Cash is powered by MedEcash. Your plan deductible and
            coinsurance are waived when you use Apta Cash. HDHP plans may have
            a minimum deductible per IRS rules. The earlier you call after a
            procedure is recommended, the more your coordinator can do.
          </p>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-[11px] text-slate-400">
            Kennion Benefits Program · Apta Cash 205-651-4729 ·
            kennionprogram.com
          </p>
        </footer>
      </article>
    </div>
  );
}
