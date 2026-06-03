"use client";

import Link from "next/link";
import { Printer, Phone, ShieldCheck, CreditCard, Building2, MessageSquare, ArrowLeft } from "lucide-react";

const safetyNets = [
  {
    icon: MessageSquare,
    title: "Concierge support",
    body: "A real person, available through the HealthJoy app or by phone, who calls providers on your behalf and answers any question about your plan.",
  },
  {
    icon: CreditCard,
    title: "Paytient card",
    body: "If a provider would rather be paid up front, swipe your Paytient card at zero interest. Submit the receipt and the plan reimburses you 100%, which makes the visit free.",
  },
  {
    icon: Building2,
    title: "Apta Cash",
    body: "For larger procedures where a hospital wants payment in advance, the plan pre-pays the procedure directly. You never come out of pocket at the door.",
  },
  {
    icon: ShieldCheck,
    title: "Full backing on any bill",
    body: "If a provider ever sends a disputed bill, forward it to us. Our team engages the provider directly and resolves it on your behalf. Since 2013, 100% of these have been resolved.",
  },
];

export default function EmployeeGuide() {
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

      {/* Top bar - hidden when printing */}
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
        {/* Header */}
        <header className="border-b border-slate-200 pb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
            For Members
          </div>
          <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--kennion-navy)]">
            Using Your Kennion Plan
          </h1>
          <p className="mt-2 text-[16px] text-slate-600">
            A simple guide to what happens when you see a doctor.
          </p>
        </header>

        {/* The short version */}
        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            The Short Version
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            You can see any licensed doctor, specialist, hospital, or facility in
            any state. You present your plan ID card. The administrator files the
            claim. You pay only your deductible, copay, and coinsurance. The vast
            majority of visits work this way without any extra step.
          </p>
        </section>

        {/* Step by step */}
        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Step by Step
          </h2>
          <ol className="mt-4 space-y-4">
            {[
              {
                title: "Pick any provider",
                body: "Any licensed doctor or facility in any state. There is no network restriction.",
              },
              {
                title: "Call and book the appointment",
                body: "Just like you always have. No referral required, no provider lookup tool to fight with.",
              },
              {
                title: "Bring your plan ID card",
                body: "Hand it to reception at check-in the same way you would on any other plan. The provider's billing office files the claim with the administrator shown on your card (EBPA or HealthEZ depending on your group).",
              },
              {
                title: "Pay only what the plan calls for",
                body: "Your deductible, copay, or coinsurance. Nothing more at the time of service.",
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-slate-600">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Safety nets */}
        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            If Anything Comes Up
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
            Most visits are straightforward. For the rare case where a provider has
            not seen the plan before, or wants payment up front, you have four
            safety nets behind you:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {safetyNets.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:break-inside-avoid"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                    <h3 className="text-[14px] font-bold text-[var(--kennion-navy)]">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* The honest framing */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            One Thing Worth Knowing
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
            There is no Blue Cross or UnitedHealthcare logo on your card. That is
            intentional. Your plan pays every provider a fair, transparent rate
            built on a public Medicare benchmark, which means there is no
            in-network or out-of-network distinction. You can see any doctor you
            want.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
            What you get in exchange for the unfamiliar logo is real: freedom to
            see any licensed provider in any state, a Paytient card no traditional
            plan offers, a concierge team that handles provider questions for you,
            and transparent costs. The brand recognition you are used to was never
            doing anything for you at the point of care. The support tools your
            plan provides actually do.
          </p>
        </section>

        {/* Contact */}
        <footer className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Questions
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                <h3 className="text-[13px] font-bold text-[var(--kennion-navy)]">
                  HealthJoy Concierge
                </h3>
              </div>
              <p className="mt-1 text-[13px] text-slate-600">
                (877) 500-3212 · available 24/7
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                <h3 className="text-[13px] font-bold text-[var(--kennion-navy)]">
                  Kennion Benefits
                </h3>
              </div>
              <p className="mt-1 text-[13px] text-slate-600">
                Hunter Shepherd · 205-641-0469
                <br />
                hunter@kennion.com
              </p>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-slate-400">
            Kennion Benefits Program · www.kennionprogram.com
          </p>
        </footer>
      </article>
    </div>
  );
}
