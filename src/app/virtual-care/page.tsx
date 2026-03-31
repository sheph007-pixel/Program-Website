import { Smartphone, Play, MapPin, Building, ArrowUpRight, Heart } from "lucide-react";

const virtualCareButtons = [
  {
    label: "Talk To A Doctor Now For Free",
    desc: "Connect with a board-certified doctor 24/7",
    icon: Smartphone,
    href: "https://onelink.to/k5x5jc",
    color: "from-blue-600 to-cyan-500",
    shadow: "shadow-cyan-500/20",
  },
  {
    label: "Educational Videos",
    desc: "Learn about your virtual care benefits",
    icon: Play,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/educational-videos",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-violet-500/20",
  },
];

const findCareButtons = [
  {
    label: "Find A Provider",
    desc: "Search doctors by location and specialty",
    icon: MapPin,
    href: "https://hez.connect.payercompass.com/",
    color: "from-teal-600 to-emerald-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    label: "Find A Facility",
    desc: "Locate hospitals and medical facilities",
    icon: Building,
    href: "https://hez.connect.payercompass.com/",
    color: "from-emerald-600 to-green-500",
    shadow: "shadow-green-500/20",
  },
];

export default function VirtualCarePage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-teal-500/25">
          <Heart size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Free Virtual Care + Nationwide Access</h1>
        <p className="page-subtitle">
          Get free unlimited 24/7 virtual care - plus access to providers
          nationwide.
        </p>
      </div>

      {/* Virtual Care */}
      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Virtual Care
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {virtualCareButtons.map((btn, i) => {
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
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)]">{btn.label}</h3>
                <p className="text-[12px] text-slate-400">{btn.desc}</p>
              </div>
              <ArrowUpRight size={16} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
            </a>
          );
        })}
      </div>

      <div className="divider" />

      {/* Find Care */}
      <div className="mb-3">
        <div className="badge mb-4 bg-teal-50 text-teal-600">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          Find Care
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {findCareButtons.map((btn, i) => {
          const Icon = btn.icon;
          return (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-interactive group flex items-center gap-4 p-4 animate-fade-in-up stagger-${i + 3}`}
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
