import {
  CreditCard,
  DollarSign,
  Stethoscope,
  Eye,
  Brain,
  PawPrint,
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
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Paytient Visa Card
      </h1>
      <p className="mb-8 text-[15px] text-gray-500">
        Paytient is a sponsored line of credit for out-of-pocket healthcare
        costs for the whole family. Pay for care over time, always without
        interest or fees.
      </p>

      {/* Key highlights */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-5 text-center">
          <DollarSign size={24} className="mb-1.5 text-[var(--kennion-blue)]" />
          <span className="text-[13px] font-semibold text-[var(--kennion-navy)]">
            0% Interest
          </span>
          <span className="mt-0.5 text-[11px] text-gray-400">Always. No fees.</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-5 text-center">
          <CreditCard size={24} className="mb-1.5 text-[var(--kennion-blue)]" />
          <span className="text-[13px] font-semibold text-[var(--kennion-navy)]">
            Instant Virtual Card
          </span>
          <span className="mt-0.5 text-[11px] text-gray-400">Ready immediately</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-[var(--kennion-light)] p-5 text-center">
          <Clock size={24} className="mb-1.5 text-[var(--kennion-blue)]" />
          <span className="text-[13px] font-semibold text-[var(--kennion-navy)]">
            Flexible Payments
          </span>
          <span className="mt-0.5 text-[11px] text-gray-400">Pay on your schedule</span>
        </div>
      </div>

      {/* What it covers */}
      <h2 className="mb-4 text-lg font-semibold text-[var(--kennion-navy)]">
        What It Covers
      </h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.title}
              className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-0.5 text-[13px] font-semibold text-[var(--kennion-navy)]">
                  {b.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-gray-500">
                  {b.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-[var(--kennion-navy)]">
          How It Works
        </h2>
        <ol className="space-y-2.5 text-[13px] text-gray-500">
          <li className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[10px] font-bold text-white">
              1
            </span>
            Create your Paytient account — your virtual card is ready instantly.
          </li>
          <li className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[10px] font-bold text-white">
              2
            </span>
            Add to Apple Pay or Samsung Pay for immediate use. Physical card
            arrives in 7-10 days.
          </li>
          <li className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[10px] font-bold text-white">
              3
            </span>
            Pay at any provider that accepts Visa. Split each transaction into a
            personalized repayment plan.
          </li>
          <li className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-[10px] font-bold text-white">
              4
            </span>
            Payments are automatically deducted on the schedule you select — no
            interest, ever.
          </li>
        </ol>
      </div>

      {/* Activation tip */}
      <div className="mb-8 rounded-xl bg-[var(--kennion-light)] p-5">
        <h3 className="mb-1.5 text-[15px] font-semibold text-[var(--kennion-navy)]">
          Activate Your Physical Card
        </h3>
        <p className="text-[13px] leading-relaxed text-gray-500">
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="https://www.paytient.com/kennion"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-[var(--kennion-blue)] py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[var(--kennion-blue-hover)] hover:shadow-lg"
        >
          Set Up Your Paytient Card
        </a>
        <a
          href="https://apps.apple.com/us/app/paytient/id1418399898"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg border-2 border-[var(--kennion-blue)] py-3.5 text-center text-[15px] font-semibold text-[var(--kennion-blue)] transition-all hover:bg-[var(--kennion-light)]"
        >
          Download Paytient App
        </a>
      </div>
    </div>
  );
}
