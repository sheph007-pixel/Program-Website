"use client";

import Link from "next/link";
import {
  Printer,
  ArrowLeft,
  Heart,
  Sparkles,
  Eye,
  ShieldCheck,
  Receipt,
  Stethoscope,
  CreditCard,
  Wallet,
} from "lucide-react";

type Coverage = {
  icon: typeof Heart;
  label: string;
  detail: string;
};

const coverages: Coverage[] = [
  {
    icon: Heart,
    label: "Health",
    detail: "15 plan designs from $100 to $9,000 deductibles. HSA-qualified options available.",
  },
  {
    icon: Sparkles,
    label: "Dental",
    detail: "7 plans up to $2,500 annual max. Orthodontia options available.",
  },
  {
    icon: Eye,
    label: "Vision",
    detail: "4 VSP plans with frame and contact lens allowances up to $200.",
  },
  {
    icon: ShieldCheck,
    label: "Supplemental",
    detail: "Voluntary life, disability, accident, critical illness, and hospital.",
  },
];

type Diff = {
  icon: typeof Receipt;
  title: string;
  body: string;
};

const differentiators: Diff[] = [
  {
    icon: Receipt,
    title: "One Monthly Invoice",
    body: "Every benefit, every carrier, every employee on a single itemized bill. Health, dental, vision, supplemental, prescription, all together. No reconciling four invoices a month.",
  },
  {
    icon: Stethoscope,
    title: "Free 24/7 Virtual Care",
    body: "Unlimited telemedicine, mental health visits, and real-person concierge support for every employee. Doctor visits at zero cost, available any hour.",
  },
  {
    icon: CreditCard,
    title: "Paytient Visa Card",
    body: "Interest-free payment plan for medical, dental, vision, prescription, and even veterinary bills. Pay any provider on the spot and repay over time at no interest.",
  },
  {
    icon: Wallet,
    title: "Flat $99 Monthly Program Fee",
    body: "All advisor fees are built into the products. Headcount never changes the fee. Predictable, transparent administration cost regardless of how the group grows.",
  },
];

type Partner = { name: string; role: string };

const partners: Partner[] = [
  { name: "Employee Navigator", role: "HR Platform" },
  { name: "HealthJoy", role: "Member App + Concierge" },
  { name: "Paytient", role: "Visa Card" },
  { name: "EBPA / Cobalt Benefits Group", role: "TPA · cobaltbenefitsgroup.com" },
  { name: "HealthEZ", role: "TPA · healthez.com" },
  { name: "MedOne", role: "Rx Admin · medone-rx.com" },
  { name: "VSP", role: "Vision Carrier" },
  { name: "Guardian", role: "Supplemental Carrier" },
];

export default function ProgramOverviewGuide() {
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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
            Employee Benefits Program
          </div>
          <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-[var(--kennion-navy)]">
            Big-company benefits.
            <br />
            <span className="text-[var(--kennion-blue)]">Small-company simplicity.</span>
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
            Health, dental, vision, and supplemental plans for groups of 2 to
            250. One platform. One monthly invoice. A licensed advisor who
            handles the work.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["One Advisor", "One Program", "One Bill"].map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-slate-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--kennion-blue)]" />
                {p}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Coverage Lines
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {coverages.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 print:break-inside-avoid"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                    <h3 className="text-[14px] font-bold uppercase tracking-wider text-[var(--kennion-navy)]">
                      {c.label}
                    </h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    {c.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            What Makes It Different
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            Built for employers who want more, without the headaches.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {differentiators.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="rounded-xl border border-slate-200 p-4 print:break-inside-avoid"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[var(--kennion-blue)]" strokeWidth={2} />
                    <h3 className="text-[14px] font-bold text-[var(--kennion-navy)]">
                      {d.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    {d.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            How It Works
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
            Get a full proposal online in minutes, not weeks.
          </p>
          <ol className="mt-4 space-y-3">
            {[
              { t: "Upload Your Census", b: "Drop your employee census into the proposal tool at kennion.com. No back-and-forth phone tag." },
              { t: "Get Instant Pricing", b: "See real, underwritten rates for every plan tier the moment you upload." },
              { t: "Review Every Plan", b: "Compare deductibles, copays, and full plan details side by side, modeled against your actual census." },
            ].map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">{s.t}</h3>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-slate-600">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Powered By Best-In-Class Partners
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {partners.map((p) => (
              <div
                key={p.name}
                className="rounded-lg border border-slate-200 px-4 py-3"
              >
                <h3 className="text-[13px] font-bold text-[var(--kennion-navy)]">{p.name}</h3>
                <p className="text-[11px] uppercase tracking-wider text-slate-500">{p.role}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl bg-[var(--kennion-navy)] p-6 text-white print:break-inside-avoid">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em]">
            Skip the Wait
          </div>
          <h2 className="mt-3 text-[22px] font-bold leading-tight">
            Upload your census. See your rates today.
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/70">
            No phone tag. No two-week proposal cycle. Upload your census at
            kennion.com and view real pricing in minutes.
          </p>
          <div className="mt-5 border-t border-white/15 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
              Your Licensed Advisor
            </p>
            <p className="mt-1 text-[14px] font-semibold">Hunter Shepherd</p>
            <p className="text-[12px] text-white/70">President, Kennion Benefit Advisors</p>
            <p className="mt-2 text-[13px]">205-641-0469 · hunter@kennion.com</p>
            <p className="mt-1 text-[13px] font-semibold text-white">kennion.com</p>
          </div>
        </footer>

        <p className="mt-6 text-[10px] text-slate-400">
          Kennion Benefit Advisors · Private program for Kennion clients only ·
          Underwriting required · Rates and benefits subject to change each
          January 1.
        </p>
      </article>
    </div>
  );
}
