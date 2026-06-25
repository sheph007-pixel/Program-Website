"use client";

import {
  Stethoscope,
  Building2,
  Siren,
  Pill,
  User,
  CreditCard,
  ArrowUpRight,
  ArrowRight,
  BadgeCheck,
  Sparkles,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import PhoneContact from "@/components/PhoneContact";

type CareLink = {
  label: string;
  href: string;
  external?: boolean;
};

type CareSetting = {
  label: string;
  icon: typeof Stethoscope;
  color: string;
  shadow: string;
  steps: string[];
  links?: CareLink[];
};

const settings: CareSetting[] = [
  {
    label: "Virtual Care",
    icon: Stethoscope,
    color: "from-cyan-500 to-teal-500",
    shadow: "shadow-teal-500/20",
    steps: [
      "Start here for everyday issues. Free virtual visits for primary care, urgent care, and mental health, 24/7.",
      "Open the HealthJoy app and start a visit. You pay nothing.",
    ],
    links: [{ label: "Learn About Virtual Care", href: "/virtual-care" }],
  },
  {
    label: "Office Visits",
    icon: User,
    color: "from-blue-600 to-indigo-500",
    shadow: "shadow-indigo-500/20",
    steps: [
      "Call any doctor, specialist, or urgent care you want and book the visit. No referral needed.",
      "Show your plan ID card at check-in and pay only your normal cost.",
      "If the office is unsure or wants payment up front, use your Self-Pay benefit: pay with your Paytient card, send the receipt, and the plan pays you back 100%. Or let our concierge team call their billing office first.",
    ],
    links: [{ label: "How Self-Pay Works", href: "/self-pay" }],
  },
  {
    label: "Facilities",
    icon: Building2,
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-purple-500/20",
    steps: [
      "For planned imaging, labs, an outpatient procedure, or surgery, call the concierge team before you schedule.",
      "We help you pick a high-quality provider and the plan pre-pays the cost directly through Apta Cash, so you are never the one paying at the door.",
      "Your deductible and coinsurance are waived when you use Apta Cash.",
    ],
    links: [{ label: "About Apta Cash", href: "/education/apta-cash" }],
  },
  {
    label: "Emergency Care",
    icon: Siren,
    color: "from-rose-500 to-red-500",
    shadow: "shadow-rose-500/20",
    steps: [
      "In an emergency, go to the nearest ER or call 911 right away. Never delay care.",
      "Show your plan ID card when you can. The plan covers emergency care, and our team handles any billing afterward.",
    ],
  },
  {
    label: "Prescriptions and Pharmacy",
    icon: Pill,
    color: "from-amber-500 to-orange-500",
    shadow: "shadow-orange-500/20",
    steps: [
      "Fill prescriptions at any pharmacy with your plan.",
      "Use the Drug Lookup tool to check coverage and price, and use your Paytient card for any out-of-pocket cost.",
    ],
    links: [
      {
        label: "Drug Lookup",
        href: "https://medone-rx.com/members/drug-lookup/0114",
        external: true,
      },
      { label: "Get Your Paytient Card", href: "/visa" },
    ],
  },
];

export default function ProvidersPage() {
  const openHelp = () => {
    window.dispatchEvent(new Event("open-kennion-chat"));
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/25">
          <Stethoscope size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <div className="mb-2 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-blue-600">
          <Sparkles size={13} strokeWidth={2} />
          Your Plan, Your Choice of Provider
        </div>
        <h1 className="page-title">See Any Provider You Want</h1>
        <p className="page-subtitle">
          Your health plan lets you go to any provider you want. There is no
          in-network or out-of-network, and no referrals. Here is how to use
          your plan for every kind of care.
        </p>
      </div>

      {/* No networks */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 mb-6 animate-fade-in-up flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
          <BadgeCheck size={16} className="text-emerald-700" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[13px] font-bold text-emerald-900 mb-1">
            There Is No In-Network or Out-of-Network
          </h3>
          <p className="text-[12px] text-emerald-900 leading-relaxed">
            See any licensed doctor, specialist, hospital, or facility,
            anywhere. The plan pays each provider a fair, consistent rate, so
            you are never limited to a network and you never need a referral. If
            a provider has not seen the plan before or asks for payment up
            front, our concierge team calls their billing office and sorts it
            out, and you are never blocked from getting care.
          </p>
        </div>
      </div>

      {/* By type of care */}
      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          By Type of Care
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {settings.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`card p-5 animate-fade-in-up stagger-${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-md ${s.shadow}`}
                >
                  <Icon size={20} className="text-white" strokeWidth={1.8} />
                </div>
                <h3 className="text-[16px] font-bold text-[var(--kennion-navy)]">
                  {s.label}
                </h3>
              </div>
              <ul className="space-y-2">
                {s.steps.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span className="text-[13px] text-slate-600 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
              {s.links && s.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-3">
                  {s.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--kennion-blue)]"
                      >
                        {link.label}
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 transition-all group-hover:text-blue-500"
                        />
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--kennion-blue)]"
                      >
                        {link.label}
                        <ArrowRight
                          size={14}
                          className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-500"
                        />
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="divider" />

      {/* Asked for a deposit / get help */}
      <div className="mb-3">
        <div className="badge mb-4 bg-amber-50 text-amber-600">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Need a Hand?
        </div>
      </div>
      <div className="card p-5 mb-4 animate-fade-in-up">
        <h3 className="text-[15px] font-bold text-[var(--kennion-navy)] mb-1.5">
          Asked for a Deposit, or Told the Plan Is Not Accepted?
        </h3>
        <p className="text-[13px] text-slate-600 leading-relaxed mb-4">
          You do not need to fix this yourself, and there is no contract for you
          to negotiate. Give us the provider's name and billing contact and our
          concierge team reaches out to their office directly to explain how the
          plan pays. Since 2013, we have resolved these every time. In the
          meantime, your Self-Pay benefit keeps you from ever being blocked from
          care.
        </p>
        <button
          type="button"
          onClick={openHelp}
          className="btn-primary"
        >
          <Headphones size={20} strokeWidth={1.8} />
          Get Help
        </button>
      </div>

      <PhoneContact
        number="(877) 500-3212"
        label="HealthJoy Concierge"
        sublabel="Care and plan questions, 24/7"
        gradient="from-blue-600 to-indigo-500"
        shadow="shadow-indigo-500/20"
      />
    </div>
  );
}
