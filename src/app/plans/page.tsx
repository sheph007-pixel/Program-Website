import {
  Shield,
  Stethoscope,
  Eye,
  Pill,
  HeartPulse,
  ExternalLink,
} from "lucide-react";

const plans = [
  {
    title: "Group Health",
    icon: Shield,
    desc: "Comprehensive medical coverage with access to a broad network of providers. HealthEZ administers your plan with transparent pricing and concierge-level support.",
    link: "https://kennionplans.com",
  },
  {
    title: "Dental",
    icon: Stethoscope,
    desc: "Preventive and restorative dental coverage. Cleanings, exams, fillings, crowns, and more — at the provider of your choice.",
    link: "https://kennionplans.com",
  },
  {
    title: "Vision",
    icon: Eye,
    desc: "Annual eye exams, frames, lenses, and contacts. Visit your local optometrist or buy contacts online with your benefits.",
    link: "https://kennionplans.com",
  },
  {
    title: "Pharmacy",
    icon: Pill,
    desc: "Your Pharmacy Benefit Manager is MedOne — reducing prescription drug costs, improving convenience, and offering home delivery plus a network of pharmacies.",
    link: "https://kennionplans.com",
  },
  {
    title: "Supplemental",
    icon: HeartPulse,
    desc: "Additional coverage options including accident, critical illness, and hospital indemnity plans to protect against unexpected medical expenses.",
    link: "https://kennionplans.com",
  },
];

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Your Benefit Plans
      </h1>
      <p className="mb-8 text-[15px] text-gray-500">
        Kennion delivers better group health, dental, vision, and supplemental
        benefits — with lower rates, more options, and smarter technology.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <a
              key={plan.title}
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[var(--kennion-blue)] hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h2 className="mb-1.5 text-base font-semibold text-[var(--kennion-navy)]">
                {plan.title}
              </h2>
              <p className="mb-3 flex-1 text-[13px] leading-relaxed text-gray-500">
                {plan.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--kennion-blue)]">
                Learn More <ExternalLink size={13} />
              </span>
            </a>
          );
        })}
      </div>

      {/* Patient Advocacy */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-[var(--kennion-navy)]">
          Patient Advocacy &amp; Balance Billing Protection
        </h2>
        <p className="mb-2 text-[13px] text-gray-500">
          Payer Compass (Zelis) provides URAC-accredited Care Management and
          balance billing protection. If you receive a balance bill, do not pay
          it — contact Patient Advocacy.
        </p>
        <div className="flex flex-wrap gap-3 text-[13px]">
          <a
            href="tel:8557193763"
            className="font-medium text-[var(--kennion-blue)]"
          >
            855-719-3763
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">7am–5pm CST, Mon–Fri</span>
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-[var(--kennion-light)] p-5 text-center">
        <p className="text-[13px] text-gray-500">
          For detailed plan documents and benefit summaries, visit{" "}
          <a
            href="https://kennionplans.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--kennion-blue)] underline"
          >
            KennionPlans.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:8448396740"
            className="font-medium text-[var(--kennion-blue)]"
          >
            844-839-6740
          </a>
        </p>
      </div>
    </div>
  );
}
