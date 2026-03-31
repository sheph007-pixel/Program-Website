import { CreditCard, Monitor, LogIn } from "lucide-react";

const buttons = [
  {
    label: "Get Your Card",
    icon: CreditCard,
    href: "https://www.paytient.com/kennion",
  },
  {
    label: "Learn More",
    icon: Monitor,
    href: "https://www.paytient.com",
  },
  {
    label: "Log In",
    icon: LogIn,
    href: "https://app.paytient.com",
  },
];

export default function VisaPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[680px] flex-col items-center px-5 py-10 sm:py-14">
      <h1 className="page-title mb-3 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Paytient Visa
      </h1>
      <p className="mb-10 text-center text-[15px] leading-relaxed text-gray-500 sm:text-base">
        If you&apos;re enrolled in a group health plan, you can get the Paytient
        Visa card for free. Use it to pay for medical, dental, vision, pharmacy,
        and even vet bills&mdash;with no fees or interest, ever.
      </p>

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
    </div>
  );
}
