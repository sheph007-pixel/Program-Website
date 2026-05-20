"use client";

import { Wallet, CreditCard, Receipt, BadgeCheck, FileSignature, ArrowUpRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUserName } from "@/components/NameContext";
import PhoneContact from "@/components/PhoneContact";

const steps = [
  {
    label: "Pay at the Visit",
    desc: "Use your Paytient card or any card to pay the provider in full at the time of service.",
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
    desc: "Submit your receipt and the plan reimburses the full amount you paid.",
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
    label: "Submit a Self-Pay Reimbursement",
    desc: "EBPA claim form — send us your receipt for 100% reimbursement",
    icon: FileSignature,
    href: "https://forms.cobaltbenefitsgroup.com/260694657475068",
    external: true,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-500/20",
  },
  {
    label: "Get Your Paytient Card",
    desc: "Pay for care with 0% interest, then get reimbursed",
    icon: CreditCard,
    href: "/visa",
    external: false,
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
];

export default function SelfPayPage() {
  const { name } = useUserName();

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25">
          <Wallet size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">
          {name ? `${name}, Pay & Get Reimbursed` : "Self-Pay Benefit"}
        </h1>
        <p className="page-subtitle">
          Go to any provider. If they don't take the plan, just pay at the visit
          and we'll reimburse 100% of what you paid. No copay, no coinsurance,
          no deductible.
        </p>
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
              <p className="text-[12px] text-slate-400 leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
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
          The Self-Pay Benefit applies to these services:
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
                <p className="text-[12px] text-slate-400">{btn.desc}</p>
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

      {/* Support contact */}
      <div className="divider" />
      <div className="animate-fade-in-up">
        <PhoneContact
          number="(877) 500-3212"
          label="HealthJoy Concierge"
          sublabel="Questions about self-pay or reimbursement"
          gradient="from-purple-600 to-fuchsia-500"
          shadow="shadow-purple-500/20"
        />
      </div>
    </div>
  );
}
