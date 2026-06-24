"use client";

import { Wallet, CreditCard, Receipt, BadgeCheck, FileSignature, ArrowUpRight, AlertCircle, ClipboardCheck, Stethoscope, Percent, MessageSquare } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    label: "Any Doctor",
    desc: "No provider network. See nearly any doctor who takes Visa.",
    icon: Stethoscope,
    color: "from-blue-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    label: "100% Back",
    desc: "No copay, no coinsurance, no deductible.",
    icon: BadgeCheck,
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    label: "Pay Less",
    desc: "Ask for a cash discount when you pay up front.",
    icon: Percent,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-500/20",
  },
];

const steps = [
  {
    label: "Pay at the Visit",
    desc: "Pay the provider in full with your Paytient Visa or any card, and ask for an itemized receipt.",
    icon: CreditCard,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-500/20",
    bg: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    label: "Keep Your Receipt",
    desc: "Save the itemized receipt showing the services you received and the amount you paid.",
    icon: Receipt,
    color: "from-orange-500 to-rose-500",
    shadow: "shadow-rose-500/20",
    bg: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    label: "Get 100% Back",
    desc: "Submit your receipt and the plan pays back every dollar you spent.",
    icon: BadgeCheck,
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
    bg: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

const coveredServices = [
  "Office Visits & In-Person Consultations",
  "Urgent Care Facility",
  "Outpatient Mental Health & Substance Abuse Treatment",
];

const actionButtons = [
  {
    label: "Submit via EBPA",
    desc: "EBPA claim form. Send your receipt for 100% reimbursement.",
    icon: FileSignature,
    href: "https://forms.cobaltbenefitsgroup.com/260694657475068",
    external: true,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-500/20",
  },
  {
    label: "Submit via HealthEZ",
    desc: "Log in to the HealthEZ member portal to submit your receipt.",
    icon: ClipboardCheck,
    href: "https://clientsts.myhealthez.com/Account/Login",
    external: true,
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
  },
  {
    label: "Get Your Paytient Card",
    desc: "Free with your benefits and zero interest. Use it for any out-of-pocket cost like dental, vision, and Rx.",
    icon: CreditCard,
    href: "/visa",
    external: false,
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
];

export default function SelfPayPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25">
          <Wallet size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">
          Self-Pay Benefit
        </h1>
        <p className="page-subtitle">
          Pay for a covered visit yourself, at any provider you like, and the
          plan pays you back 100%. No copay, no coinsurance, no deductible, no
          network limits. We have it set up for you.
        </p>
      </div>

      {/* Perks */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 mb-6 animate-fade-in-up">
        {perks.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.label}
              className="card flex flex-col items-center text-center p-5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} shadow-md ${p.shadow} mb-3`}>
                <Icon size={22} className="text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-[14px] font-bold text-[var(--kennion-navy)] mb-1">
                {p.label}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed sm:text-[12px]">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* How It Works */}
      <div className="mb-3">
        <div className="badge mb-4 bg-amber-50 text-amber-600">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          How It Works
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 mb-6 animate-fade-in-up stagger-1">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="card flex flex-col items-center text-center p-5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-md ${s.shadow} mb-3`}>
                <Icon size={22} className="text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-[14px] font-bold text-[var(--kennion-navy)] mb-1">
                {s.label}
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed sm:text-[12px]">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* What to Say at the Visit */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 mb-6 animate-fade-in-up stagger-2 flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100">
          <MessageSquare size={16} className="text-blue-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-blue-900 mb-1">
            What to Say at the Visit
          </h3>
          <p className="text-[12px] text-blue-900 leading-relaxed italic">
            &ldquo;I&apos;ll pay up front with a Visa card, and I&apos;ll need an
            itemized invoice to submit to my insurance.&rdquo;
          </p>
          <p className="mt-2 text-[12px] text-blue-800 leading-relaxed">
            Then ask if they offer a discount for paying in full at the time of
            service. Many providers do, because it saves them billing and
            paperwork.
          </p>
          <p className="mt-2 text-[12px] text-blue-800 leading-relaxed">
            You get your money back, the provider is paid on the spot, and the
            plan keeps costs down.
          </p>
        </div>
      </div>

      {/* What's Covered */}
      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          What's Covered
        </div>
      </div>
      <div className="card p-5 mb-4 animate-fade-in-up stagger-2">
        <p className="text-[13px] text-slate-500 mb-3">
          Self-Pay applies to these everyday visits:
        </p>
        <ul className="space-y-2.5">
          {coveredServices.map((service) => (
            <li key={service} className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <BadgeCheck size={13} className="text-emerald-600" strokeWidth={2.2} />
              </div>
              <span className="text-[13px] font-medium text-[var(--kennion-navy)]">
                {service}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-slate-100 pt-3 text-[12px] text-slate-400 leading-relaxed">
          Chiropractic care has its own separate benefit, so chiropractor visits
          are handled outside Self-Pay.
        </p>
      </div>

      {/* HSA Saver Notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 mb-6 animate-fade-in-up stagger-2 flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100">
          <AlertCircle size={16} className="text-amber-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-amber-900 mb-0.5">
            Saver HSA (HDHP) members
          </h3>
          <p className="text-[12px] text-amber-800 leading-relaxed">
            Under the Saver HSA option, the plan deductible still applies before
            reimbursement. All other plans reimburse 100% with no deductible.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Get Started
        </div>
        <p className="text-[12px] text-slate-400 mb-2">
          Submit your receipt through your plan&apos;s claims administrator,
          EBPA or HealthEZ. Not sure which one? Check your member ID card or ask
          us through Get Help.
        </p>
        <p className="text-[12px] text-slate-400">
          Using the Paytient Visa for Self-Pay is optional. Any card works, the
          plan reimburses based on what you paid.
        </p>
      </div>
      <div className="flex flex-col gap-3 animate-fade-in-up stagger-3">
        {actionButtons.map((btn) => {
          const Icon = btn.icon;
          const inner = (
            <>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${btn.color} shadow-md ${btn.shadow} transition-transform duration-300 group-hover:scale-105`}>
                <Icon size={20} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)]">{btn.label}</h3>
                <p className="text-[13px] text-slate-400 sm:text-[12px]">{btn.desc}</p>
              </div>
              <ArrowUpRight size={16} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
            </>
          );

          if (btn.external) {
            return (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive group flex items-center gap-4 p-4"
              >
                {inner}
              </a>
            );
          }

          return (
            <Link
              key={btn.label}
              href={btn.href}
              className="card card-interactive group flex items-center gap-4 p-4"
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
