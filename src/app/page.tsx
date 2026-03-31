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
  Shield,
} from "lucide-react";

const steps = [
  {
    num: 1,
    label: "View Plans",
    desc: "Explore your health, dental, vision & supplemental options",
    icon: ClipboardList,
    href: "/plans",
    color: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    num: 2,
    label: "Enroll",
    desc: "Complete your enrollment quickly and easily",
    icon: Monitor,
    href: "/enrollment",
    color: "from-blue-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    num: 3,
    label: "Download App",
    desc: "Get HealthJoy to manage benefits on the go",
    icon: Smartphone,
    href: "/app-download",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
  {
    num: 4,
    label: "Get Visa Card",
    desc: "Set up interest-free healthcare payments",
    icon: CreditCard,
    href: "/visa",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
  {
    num: 5,
    label: "Find Care + 24/7 Access",
    desc: "Access free virtual care and providers nationwide",
    icon: UserSearch,
    href: "/virtual-care",
    color: "from-cyan-600 to-teal-500",
    shadow: "shadow-teal-500/20",
  },
  {
    num: 6,
    label: "Ask For Help",
    desc: "Call 844-839-6740 or email for support",
    icon: HelpCircle,
    href: "tel:8448396740",
    external: true,
    color: "from-teal-600 to-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
];

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Hero */}
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
          <Shield size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Your Benefits Program</h1>
        <p className="page-subtitle">
          Everything you need to enroll, explore, and get care&nbsp;&mdash; all
          in one place.
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const inner = (
            <div className={`card card-interactive group flex items-center gap-4 p-4 animate-fade-in-up stagger-${step.num}`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg ${step.shadow} transition-transform duration-300 group-hover:scale-105`}>
                <Icon size={22} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-500/70">STEP {step.num}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">
                  {step.label}
                </h3>
                <p className="text-[13px] text-slate-500 leading-snug">
                  {step.desc}
                </p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
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

      {/* Footer */}
      <div className="divider" />
      <div className="animate-fade-in-up stagger-7 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
          <Mail size={16} className="text-blue-600" />
        </div>
        <p className="text-[13px] font-medium text-slate-500">
          Powered by <span className="text-[var(--kennion-navy)] font-semibold">Kennion Benefit Advisors</span>
        </p>
      </div>
    </div>
  );
}
