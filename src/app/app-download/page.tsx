import { Download, HelpCircle, Play, CheckCircle, Phone } from "lucide-react";

const buttons = [
  {
    label: "Download The App",
    icon: Download,
    href: "https://healthjoy.com/download/",
  },
  {
    label: "Frequently Asked Questions",
    icon: HelpCircle,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/FAQ",
  },
  {
    label: "Educational Videos",
    icon: Play,
    href: "https://healthjoymemberservices.zendesk.com/hc/en-us/p/educational-videos",
  },
  {
    label: "Activation",
    icon: CheckCircle,
    href: "https://mygroups.healthjoy.com/membership",
  },
];

export default function AppDownloadPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[680px] flex-col items-center px-5 py-10 sm:py-14">
      <h1 className="page-title mb-3 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        HealthJoy App
      </h1>
      <p className="mb-10 text-center text-[15px] leading-relaxed text-gray-500 sm:text-base">
        Once you&apos;re enrolled, HealthJoy becomes your starting point for
        everything healthcare and benefits-related. The app gives you free,
        unlimited access to medical professionals, healthcare experts, and all
        your personalized employee benefits&mdash;in one place.
      </p>

      {/* Action Buttons */}
      <div className="flex w-full flex-col gap-3">
        {buttons.map((btn) => {
          const Icon = btn.icon;
          return (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
            >
              <Icon size={18} strokeWidth={1.5} />
              {btn.label}
            </a>
          );
        })}
      </div>

      {/* HealthJoy Concierge */}
      <div className="mt-12 flex w-full items-center gap-4 rounded-xl bg-gray-50 px-5 py-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2h6l3 7H6L9 2z" />
            <path d="M12 9v13" />
            <path d="M8 13h8" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-bold text-[var(--kennion-navy)]">
            HEALTHJOY CONCIERGE
          </div>
          <div className="text-[13px] text-gray-400">
            CALL 24/7 (877) 500-3212
          </div>
        </div>
        <a
          href="tel:8775003212"
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-[var(--kennion-blue)] transition-colors hover:bg-gray-50"
        >
          <Phone size={14} strokeWidth={1.5} />
          Call
        </a>
      </div>
    </div>
  );
}
