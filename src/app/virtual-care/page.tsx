"use client";

import { Smartphone, Play, ArrowUpRight, Heart, Stethoscope, ShieldCheck, Activity } from "lucide-react";
import { useUserName } from "@/components/NameContext";

const benefits = [
  {
    label: "Free Primary Care",
    desc: "See a doctor for checkups, prescriptions, and ongoing care at no cost",
    icon: Stethoscope,
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-cyan-500/20",
    bg: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Free Urgent Care",
    desc: "Get treated for illnesses, injuries, and symptoms right away at no cost",
    icon: Activity,
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
    bg: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    label: "Free Virtual Care",
    desc: "Connect with a board-certified doctor 24/7 from anywhere at no cost",
    icon: ShieldCheck,
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
    bg: "bg-violet-50",
    textColor: "text-violet-600",
  },
];

const actionButtons = [
  {
    label: "Talk To A Doctor Now For Free",
    desc: "Open the HealthJoy app and connect instantly",
    icon: Smartphone,
    href: "https://onelink.to/k5x5jc",
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-cyan-500/20",
  },
  {
    label: "Educational Videos",
    desc: "Learn how to use your HealthJoy Telemed benefits",
    icon: Play,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/educational-videos",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
];

export default function VirtualCarePage() {
  const { name } = useUserName();

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-teal-500/25">
          <Heart size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">
          {name ? `${name}, You Have Free Virtual Care` : "Free Virtual Care"}
        </h1>
        <p className="page-subtitle">
          One of the biggest perks of the Kennion program. Through HealthJoy
          Telemed, you and your family get free, unlimited access to doctors
          for primary care, urgent care, and virtual visits. No copays. No
          surprise bills. Just open the app.
        </p>
      </div>

      {/* Three Free Benefits */}
      <div className="mb-3">
        <div className="badge mb-4 bg-emerald-50 text-emerald-600">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Included For All Enrolled Members
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 mb-6 animate-fade-in-up stagger-1">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className="card flex flex-col items-center text-center p-5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${b.color} shadow-md ${b.shadow} mb-3`}>
                <Icon size={22} className="text-white" strokeWidth={1.8} />
              </div>
              <h3 className="text-[14px] font-bold text-[var(--kennion-navy)] mb-1">
                {b.label}
              </h3>
              <p className="text-[12px] text-slate-400 leading-relaxed">
                {b.desc}
              </p>
              <div className={`mt-3 rounded-full px-3 py-1 text-[11px] font-bold ${b.bg} ${b.textColor}`}>
                $0 Cost
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Get Started
        </div>
      </div>
      <div className="flex flex-col gap-3 animate-fade-in-up stagger-2">
        {actionButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-interactive group flex items-center gap-4 p-4"
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${btn.color} shadow-md ${btn.shadow} transition-transform duration-300 group-hover:scale-105`}>
                <Icon size={20} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)]">{btn.label}</h3>
                <p className="text-[12px] text-slate-400">{btn.desc}</p>
              </div>
              <ArrowUpRight size={16} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
