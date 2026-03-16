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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold text-[var(--kennion-navy)]">
        Your Benefit Plans
      </h1>
      <p className="mb-8 text-gray-600">
        Kennion delivers better group health, dental, vision, and supplemental
        benefits — with lower rates, more options, and smarter technology.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <a
              key={plan.title}
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[var(--kennion-blue)] hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={24} />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-[var(--kennion-navy)]">
                {plan.title}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                {plan.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--kennion-blue)]">
                Learn More <ExternalLink size={14} />
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl bg-[var(--kennion-light)] p-6 text-center">
        <p className="text-sm text-gray-600">
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
