import Link from "next/link";
import {
  ClipboardList,
  Monitor,
  Smartphone,
  CreditCard,
  UserSearch,
  HelpCircle,
  Mail,
} from "lucide-react";

const steps = [
  {
    num: 1,
    label: "View Plans",
    icon: ClipboardList,
    href: "/plans",
  },
  {
    num: 2,
    label: "Enroll",
    icon: Monitor,
    href: "/enrollment",
  },
  {
    num: 3,
    label: "Download App",
    icon: Smartphone,
    href: "/app-download",
  },
  {
    num: 4,
    label: "Get Visa Card",
    icon: CreditCard,
    href: "/visa",
  },
  {
    num: 5,
    label: "Find Care + 24/7 Access",
    icon: UserSearch,
    href: "/virtual-care",
  },
  {
    num: 6,
    label: "Ask For Help",
    icon: HelpCircle,
    href: "tel:8448396740",
    external: true,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[680px] flex-col items-center px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Your Benefits Program
      </h1>
      <p className="mb-8 text-center text-[15px] text-gray-500">
        Everything you need to enroll, explore, and get care&nbsp;&mdash; all in
        one place.
      </p>

      <div className="flex w-full flex-col gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const inner = (
            <span className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)] sm:text-base">
              <Icon size={18} strokeWidth={1.5} />
              {step.num}. {step.label}
            </span>
          );

          return step.external ? (
            <a key={step.num} href={step.href}>
              {inner}
            </a>
          ) : (
            <Link key={step.num} href={step.href}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-8 w-full border-t border-gray-200" />

      {/* Footer */}
      <div className="flex w-full flex-col items-center gap-1.5 rounded-xl bg-[var(--kennion-light)] px-8 py-5 text-center">
        <Mail size={20} className="text-[var(--kennion-blue)]" />
        <p className="text-[13px] text-[var(--kennion-blue)]">
          Powered By Kennion Benefit Advisors
        </p>
      </div>
    </div>
  );
}
