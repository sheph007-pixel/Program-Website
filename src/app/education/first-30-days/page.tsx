"use client";

import Link from "next/link";
import { Printer, ArrowLeft, CheckCircle2, Phone, Smartphone, CreditCard, FileText, MessageSquare } from "lucide-react";

type Step = {
  label: string;
  body: string;
};

const week1: Step[] = [
  {
    label: "Download the HealthJoy app",
    body: "Open the App Store or Google Play and search for HealthJoy. Sign in with the credentials your HR team provided at enrollment. The app is your home base for the concierge, your plan details, and your ID card.",
  },
  {
    label: "Save the support number",
    body: "Add HealthJoy Concierge to your phone contacts: (877) 500-3212. Available 24/7. Use this number any time a provider has a question, you get a bill you do not understand, or you want to find a doctor.",
  },
  {
    label: "Activate your Paytient card",
    body: "You will receive activation instructions from Paytient. Activate the card on day one so it is ready when you need it. Paytient covers any out-of-pocket medical, dental, vision, prescription, or veterinary expense up front at zero interest.",
  },
  {
    label: "Save your plan ID card to your phone",
    body: "Both EBPA and HealthEZ make a digital ID card available through their member portal. Save a screenshot or add to your Apple Wallet / Google Wallet so it is one tap away at any provider visit.",
  },
];

const week2: Step[] = [
  {
    label: "Read your plan summary",
    body: "Your HR team distributed the plan summary at enrollment. Skim the deductible, out-of-pocket maximum, and copay structure for your chosen plan so you know what to expect at a visit.",
  },
  {
    label: "Note your current doctors",
    body: "Make a list of any current doctor or specialist you see regularly. You can keep seeing them. If you want extra confidence, call the concierge ahead of your next visit and the team will reach out to the office on your behalf.",
  },
  {
    label: "Find a primary care doctor if you do not have one",
    body: "Use the HealthJoy app to search providers, or call the concierge for a recommendation. Annual preventive visits are covered at no out-of-pocket cost.",
  },
];

const week34: Step[] = [
  {
    label: "Schedule a preventive visit if you are due",
    body: "Annual physical, dental cleaning, or eye exam. Preventive visits are the easiest way to see the plan in action without any out-of-pocket exposure.",
  },
  {
    label: "Use the concierge at least once",
    body: "Even if you just want to confirm coverage for an upcoming visit. The concierge is the most underused benefit of this plan, and the easiest way to feel comfortable with how it works.",
  },
  {
    label: "If you need a prescription, ask MedOne to compare alternatives",
    body: "Most prescriptions are covered at $0 to $100 depending on tier. Look up your medication at medone-rx.com/members/drug-lookup/0114, or let the HealthJoy app flag lower-cost alternatives at the pharmacy.",
  },
];

const quickRef = [
  { icon: Phone, label: "HealthJoy Concierge", value: "(877) 500-3212 · 24/7" },
  { icon: Smartphone, label: "HealthJoy app", value: "App Store and Google Play" },
  { icon: CreditCard, label: "Paytient", value: "0% interest card for any out-of-pocket cost" },
  { icon: FileText, label: "MedOne drug lookup", value: "medone-rx.com/members/drug-lookup/0114" },
  { icon: MessageSquare, label: "Kennion Benefits", value: "Hunter Shepherd · 205-641-0469 · hunter@kennion.com" },
];

export default function First30DaysGuide() {
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
            For New Members
          </div>
          <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--kennion-navy)]">
            Your First 30 Days
          </h1>
          <p className="mt-2 text-[16px] text-slate-600">
            A short checklist to get the most out of your Kennion plan from day
            one. Each step takes a few minutes.
          </p>
        </header>

        {[
          { title: "Week 1 · Set Up", steps: week1 },
          { title: "Week 2 · Get Familiar", steps: week2 },
          { title: "Week 3 to 4 · Put It to Work", steps: week34 },
        ].map((section) => (
          <section key={section.title} className="mt-8 print:break-inside-avoid">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
              {section.title}
            </h2>
            <ol className="mt-4 space-y-4">
              {section.steps.map((step, i) => (
                <li key={i} className="flex gap-4 print:break-inside-avoid">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[var(--kennion-blue)]"
                    strokeWidth={2}
                  />
                  <div>
                    <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">
                      {step.label}
                    </h3>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-slate-600">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Quick Reference
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {quickRef.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.label}
                  className="rounded-xl border border-slate-200 bg-white p-3 print:break-inside-avoid"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                      {r.label}
                    </h3>
                  </div>
                  <p className="mt-1 text-[13px] text-slate-700">{r.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-[11px] text-slate-400">
            Kennion Benefits Program · www.kennionprogram.com
          </p>
        </footer>
      </article>
    </div>
  );
}
