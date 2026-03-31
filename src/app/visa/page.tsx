import { CreditCard, Monitor, LogIn, ArrowUpRight, Zap } from "lucide-react";
import PhoneContact from "@/components/PhoneContact";

const buttons = [
  {
    label: "Get Your Card",
    desc: "Set up your interest-free Paytient Visa card",
    icon: CreditCard,
    href: "https://my.paytient.com/signup",
    color: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    label: "Learn More",
    desc: "See how Paytient works and what it covers",
    icon: Monitor,
    href: "https://www.paytient.com/kennion",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
  {
    label: "Log In",
    desc: "Access your existing Paytient account",
    icon: LogIn,
    href: "https://my.paytient.com/login",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
];

const highlights = [
  { label: "0% Interest", sub: "Always. No fees." },
  { label: "Instant Card", sub: "Ready immediately" },
  { label: "Flexible Pay", sub: "Your schedule" },
];

export default function VisaPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/25">
          <Zap size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Paytient Visa</h1>
        <p className="page-subtitle">
          Enrolled in any benefits? You can get the Paytient Visa card for free
          as part of the Kennion program. Use it to pay for medical, dental,
          vision, pharmacy, and even vet bills. No fees. No interest. Ever.
          Pay back on your schedule.
        </p>
      </div>

      {/* Highlights */}
      <div className="mb-8 grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
        {highlights.map((h) => (
          <div key={h.label} className="card flex flex-col items-center p-4 text-center">
            <span className="text-[14px] font-bold text-[var(--kennion-navy)]">{h.label}</span>
            <span className="mt-0.5 text-[11px] text-slate-400">{h.sub}</span>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="flex flex-col gap-3">
        {buttons.map((btn, i) => {
          const Icon = btn.icon;
          return (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-interactive group flex items-center gap-4 p-4 animate-fade-in-up stagger-${i + 2}`}
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

      {/* Paytient Support */}
      <div className="divider" />
      <div className="animate-fade-in-up stagger-5">
        <PhoneContact
          number="(866) 345-9591"
          label="Paytient Support"
          sublabel="Help with your Paytient Visa card"
          gradient="from-blue-600 to-indigo-500"
          shadow="shadow-blue-500/20"
        />
      </div>
    </div>
  );
}
