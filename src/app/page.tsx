import Link from "next/link";
import {
  ClipboardList,
  Monitor,
  Smartphone,
  CreditCard,
  UserSearch,
  HelpCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    num: 1,
    label: "View Plans",
    icon: ClipboardList,
    href: "/plans",
    color: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    num: 2,
    label: "Enroll",
    icon: Monitor,
    href: "/enrollment",
    color: "from-blue-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    num: 3,
    label: "Download App",
    icon: Smartphone,
    href: "/app-download",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
  {
    num: 4,
    label: "Get Visa Card",
    icon: CreditCard,
    href: "/visa",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
  {
    num: 5,
    label: "Find Care + 24/7 Access",
    icon: UserSearch,
    href: "/virtual-care",
    color: "from-cyan-600 to-teal-500",
    shadow: "shadow-teal-500/20",
  },
  {
    num: 6,
    label: "Ask For Help",
    icon: HelpCircle,
    href: "tel:8448396740",
    external: true,
    color: "from-teal-600 to-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col justify-center px-5 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-[620px]">
        {/* Header - compact */}
        <div className="mb-5 text-center animate-fade-in-up">
          <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--kennion-navy)] sm:text-[32px]" style={{ letterSpacing: "-0.02em" }}>
            Your Benefits Program
          </h1>
          <p className="mt-1.5 text-[14px] text-slate-500 sm:text-[15px]">
            Everything you need to enroll, explore, and get care - all in one place.
          </p>
        </div>

        {/* Steps - tight grid */}
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
                </div>
                <ArrowRight size={16} className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
              </div>
            );

            return step.external ? (
              <a key={step.num} href={step.href}>
                {inner}
              </a>
            ) : (
              <Link key={step.num} href={step.href}>
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Footer - compact */}
        <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3 animate-fade-in-up stagger-7">
          <Mail size={14} className="text-blue-500" />
          <p className="text-[12px] font-medium text-slate-400">
            Powered by <span className="text-slate-600 font-semibold">Kennion Benefit Advisors</span>
          </p>
        </div>
      </div>
    </div>
  );
}
