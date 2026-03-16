import {
  CreditCard,
  DollarSign,
  Stethoscope,
  Eye,
  Brain,
  PawPrint,
  Smartphone,
  Clock,
} from "lucide-react";

const benefits = [
  {
    icon: Stethoscope,
    title: "Medical & Dental",
    desc: "Pay for doctor visits, dental care, and medical procedures — all interest-free.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "Eye exams, frames, lenses, and contacts from your optometrist or online.",
  },
  {
    icon: Brain,
    title: "Mental Health",
    desc: "Meet with a therapist online or in-person. Your mental health matters.",
  },
  {
    icon: PawPrint,
    title: "Veterinary",
    desc: "Furry family members are included — flea/tick medication, cleanings, and more.",
  },
];

export default function VisaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold text-[var(--kennion-navy)]">
        Paytient Visa Card
      </h1>
      <p className="mb-10 text-gray-600">
        Paytient is a sponsored line of credit for out-of-pocket healthcare
        costs for the whole family. Pay for care over time, always without
        interest or fees.
      </p>

      {/* Key highlights */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-6 text-center">
          <DollarSign
            size={28}
            className="mb-2 text-[var(--kennion-blue)]"
          />
          <span className="text-sm font-semibold text-[var(--kennion-navy)]">
            0% Interest
          </span>
          <span className="mt-1 text-xs text-gray-500">Always. No fees.</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-6 text-center">
          <CreditCard
            size={28}
            className="mb-2 text-[var(--kennion-blue)]"
          />
          <span className="text-sm font-semibold text-[var(--kennion-navy)]">
            Instant Virtual Card
          </span>
          <span className="mt-1 text-xs text-gray-500">
            Ready immediately
          </span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-6 text-center">
          <Clock size={28} className="mb-2 text-[var(--kennion-blue)]" />
          <span className="text-sm font-semibold text-[var(--kennion-navy)]">
            Flexible Payments
          </span>
          <span className="mt-1 text-xs text-gray-500">
            Pay on your schedule
          </span>
        </div>
      </div>

      {/* What it covers */}
      <h2 className="mb-6 text-xl font-semibold text-[var(--kennion-navy)]">
        What It Covers
      </h2>
      <div className="mb-10 grid gap-5 sm:grid-cols-2">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-[var(--kennion-navy)]">
                  {b.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <div className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[var(--kennion-navy)]">
          How It Works
        </h2>
        <ol className="space-y-3 text-sm text-gray-600">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-xs font-bold text-white">
              1
            </span>
            Create your Paytient account — your virtual card is ready instantly.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-xs font-bold text-white">
              2
            </span>
            Add to Apple Pay or Samsung Pay for immediate use. Physical card
            arrives in 7-10 days.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-xs font-bold text-white">
              3
            </span>
            Pay at any provider that accepts Visa. Split each transaction into a
            personalized repayment plan.
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-xs font-bold text-white">
              4
            </span>
            Payments are automatically deducted on the schedule you select — no
            interest, ever.
          </li>
        </ol>
      </div>

      {/* Activation tip */}
      <div className="mb-10 rounded-xl bg-[var(--kennion-light)] p-6">
        <h3 className="mb-2 font-semibold text-[var(--kennion-navy)]">
          Activate Your Physical Card
        </h3>
        <p className="text-sm text-gray-600">
          When your physical card arrives, text the last 4 digits from your
          phone to{" "}
          <a
            href="sms:5732693836"
            className="font-medium text-[var(--kennion-blue)]"
          >
            573-269-3836
          </a>{" "}
          to activate. You can also activate in the Paytient app by swiping to
          the white card on the home screen and pressing and holding to enter
          your last 4 digits.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="https://www.paytient.com/kennion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl bg-[var(--kennion-blue)] py-4 text-center font-semibold text-white shadow-md transition-all hover:bg-[var(--kennion-blue-hover)] hover:shadow-lg"
        >
          Set Up Your Paytient Card
        </a>
        <a
          href="https://apps.apple.com/us/app/paytient/id1418399898"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl border-2 border-[var(--kennion-blue)] py-4 text-center font-semibold text-[var(--kennion-blue)] transition-all hover:bg-[var(--kennion-light)]"
        >
          Download Paytient App
        </a>
      </div>
    </div>
  );
}
