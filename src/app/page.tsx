"use client";

import Link from "next/link";
import {
  ClipboardList,
  Monitor,
  Smartphone,
  CreditCard,
  UserSearch,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: 1,
    label: "Explore Plans",
    sub: "See all available benefits",
    icon: ClipboardList,
    href: "/plans",
    color: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    num: 2,
    label: "Enroll",
    sub: "See your plans and rates",
    icon: Monitor,
    href: "/enrollment",
    color: "from-blue-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    num: 3,
    label: "Get the App",
    sub: "Your personalized benefits hub",
    icon: Smartphone,
    href: "/app-download",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
  {
    num: 4,
    label: "Get Visa Card",
    sub: "Pay for care with 0% interest",
    icon: CreditCard,
    href: "/visa",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
  {
    num: 5,
    label: "Free Virtual Care",
    sub: "See a doctor at no cost",
    icon: UserSearch,
    href: "/virtual-care",
    color: "from-cyan-600 to-teal-500",
    shadow: "shadow-teal-500/20",
  },
  {
    num: 6,
    label: "Get Help",
    sub: "We're here for you",
    icon: HelpCircle,
    href: "#",
    chat: true,
    color: "from-teal-600 to-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
];

export default function HomePage() {
  const handleClick = (step: (typeof steps)[number]) => {
    if (step.chat) {
      window.dispatchEvent(new CustomEvent("open-kennion-chat"));
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-5 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-[620px]">
        {/* Header */}
        <div className="mb-5 text-center animate-fade-in-up">
          <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--kennion-navy)] sm:text-[32px]" style={{ letterSpacing: "-0.02em" }}>
            Your Benefits Program
          </h1>
          <p className="mt-1.5 text-[14px] text-slate-500 sm:text-[15px]">
            Welcome to the Kennion Benefits Program. Whether you&apos;re new or
            already enrolled, everything you need is right here.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            const inner = (
              <div className={`card card-interactive group flex items-center gap-3 p-3 animate-fade-in-up stagger-${step.num}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-md ${step.shadow} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon size={18} className="text-white" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)] leading-tight">
                    {step.label}
                  </h3>
                  {step.sub && (
                    <p className="text-[12px] text-slate-400 mt-0.5 sm:text-[11px]">{step.sub}</p>
                  )}
                </div>
                <ArrowRight size={16} className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
              </div>
            );

            if (step.chat) {
              return (
                <button key={step.num} onClick={() => handleClick(step)} className="text-left">
                  {inner}
                </button>
              );
            }

            return (
              <Link key={step.num} href={step.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
