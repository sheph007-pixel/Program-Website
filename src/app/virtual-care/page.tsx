import {
  Video,
  Phone,
  Clock,
  DollarSign,
  Shield,
  Brain,
  Pill,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7/365 Access",
    desc: "See a board-certified doctor anytime — day or night, weekends, and holidays.",
  },
  {
    icon: Video,
    title: "Video or Phone",
    desc: "Connect with a doctor by secure video call or phone from home, office, or on the go.",
  },
  {
    icon: DollarSign,
    title: "$0 Copay",
    desc: "Virtual urgent care visits are available at no cost to you and your family.",
  },
  {
    icon: Pill,
    title: "Prescriptions",
    desc: "Doctors can diagnose, prescribe medication, and send it to your pharmacy of choice.",
  },
  {
    icon: Brain,
    title: "Behavioral Health",
    desc: "Access licensed psychiatrists and therapists when and where you need them, across all 50 states.",
  },
  {
    icon: Shield,
    title: "Whole Family",
    desc: "Coverage extends to you and your eligible dependents — everyone gets access.",
  },
];

const conditions = [
  "Cold & Flu",
  "Allergies",
  "Sinus Infections",
  "Bronchitis",
  "Skin Rashes",
  "Headaches",
  "Urinary Infections",
  "Eye Infections",
  "Ear Infections",
  "Nausea & Vomiting",
  "Anxiety & Depression",
  "Stress Management",
];

export default function VirtualCarePage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Free Virtual Care
      </h1>
      <p className="mb-8 text-[15px] text-gray-500">
        Access board-certified doctors 24/7 from anywhere. No waiting rooms, no
        drive time. Get diagnosed, treated, and prescribed — all virtually.
      </p>

      {/* Features */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-0.5 text-[13px] font-semibold text-[var(--kennion-navy)]">
                  {f.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Common conditions */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-[var(--kennion-navy)]">
          Common Conditions Treated
        </h2>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[var(--kennion-light)] px-3 py-1 text-[11px] font-medium text-[var(--kennion-navy)]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mb-8 rounded-xl bg-[var(--kennion-light)] p-5">
        <h2 className="mb-3 text-base font-semibold text-[var(--kennion-navy)]">
          How It Works
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <Stethoscope
              size={18}
              className="mt-0.5 shrink-0 text-[var(--kennion-blue)]"
              strokeWidth={1.5}
            />
            <p className="text-[13px] text-gray-500">
              <strong className="text-[var(--kennion-navy)]">Urgent Care:</strong> Connect with a doctor in under 10
              minutes for common medical concerns. Available 24/7/365.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Brain
              size={18}
              className="mt-0.5 shrink-0 text-[var(--kennion-blue)]"
              strokeWidth={1.5}
            />
            <p className="text-[13px] text-gray-500">
              <strong className="text-[var(--kennion-navy)]">Behavioral Health:</strong> Schedule appointments with
              licensed psychiatrists and therapists for ongoing mental health
              support.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone
              size={18}
              className="mt-0.5 shrink-0 text-[var(--kennion-blue)]"
              strokeWidth={1.5}
            />
            <p className="text-[13px] text-gray-500">
              <strong className="text-[var(--kennion-navy)]">Follow-up Care:</strong> Personalized, ongoing
              communication ensures you get the follow-up care you need.
            </p>
          </div>
        </div>
      </div>

      <a
        href="https://recurohealth.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-lg bg-[var(--kennion-blue)] py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[var(--kennion-blue-hover)] hover:shadow-lg"
      >
        Access Virtual Care Now
      </a>
    </div>
  );
}
