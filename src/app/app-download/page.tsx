import { Download, HelpCircle, Play, CheckCircle, ArrowUpRight, Sparkles } from "lucide-react";
import PhoneContact from "@/components/PhoneContact";

const buttons = [
  {
    label: "Download The App",
    icon: Download,
    href: "https://healthjoy.com/download/",
    color: "from-blue-600 to-blue-500",
    shadow: "shadow-blue-500/20",
  },
  {
    label: "Frequently Asked Questions",
    icon: HelpCircle,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/FAQ",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
  {
    label: "Educational Videos",
    icon: Play,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/educational-videos",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
  },
  {
    label: "Activation",
    icon: CheckCircle,
    href: "https://mygroups.healthjoy.com/membership",
    color: "from-cyan-600 to-teal-500",
    shadow: "shadow-teal-500/20",
  },
];

export default function AppDownloadPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 shadow-lg shadow-violet-500/25">
          <Sparkles size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">HealthJoy App</h1>
        <p className="page-subtitle">
          Once you&apos;re enrolled, HealthJoy becomes your starting point for
          everything healthcare and benefits-related. The app gives you free,
          unlimited access to medical professionals, healthcare experts, and all
          your personalized employee benefits - in one place.
        </p>
      </div>

      {/* Action Cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {buttons.map((btn, i) => {
          const Icon = btn.icon;
          return (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-interactive group flex items-center gap-4 p-4 animate-fade-in-up stagger-${i + 1}`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${btn.color} shadow-md ${btn.shadow} transition-transform duration-300 group-hover:scale-105`}>
                <Icon size={20} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)]">{btn.label}</h3>
              </div>
              <ArrowUpRight size={16} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
            </a>
          );
        })}
      </div>

      {/* HealthJoy Concierge */}
      <div className="divider" />
      <div className="animate-fade-in-up stagger-5">
        <PhoneContact
          number="(877) 500-3212"
          label="HealthJoy Concierge"
          sublabel="Available 24/7 for app and benefits help"
          gradient="from-purple-600 to-fuchsia-500"
          shadow="shadow-purple-500/20"
        />
      </div>
    </div>
  );
}
