import Link from "next/link";
import {
  FileText,
  ClipboardList,
  Smartphone,
  CreditCard,
  Users,
  HelpCircle,
  Mail,
} from "lucide-react";

const steps = [
  {
    num: 1,
    label: "View Plans",
    icon: FileText,
    href: "/plans",
    desc: "Explore your health, dental, vision & supplemental benefit options.",
  },
  {
    num: 2,
    label: "Enroll",
    icon: ClipboardList,
    href: "/enrollment",
    desc: "Complete your benefits enrollment quickly and easily.",
  },
  {
    num: 3,
    label: "Download App",
    icon: Smartphone,
    href: "/app-download",
    desc: "Get the myHealthEZ app to manage benefits on the go.",
  },
  {
    num: 4,
    label: "Get Visa Card",
    icon: CreditCard,
    href: "/visa",
    desc: "Set up your Paytient Visa card for interest-free healthcare payments.",
  },
  {
    num: 5,
    label: "Find Care + 24/7 Access",
    icon: Users,
    href: "/virtual-care",
    desc: "Access free virtual care and find providers near you.",
  },
  {
    num: 6,
    label: "Ask For Help",
    icon: HelpCircle,
    href: "tel:8448396740",
    desc: "Call 844-839-6740 or email Service@HealthEZ.com",
    external: true,
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-4 py-12 sm:py-16">
      <h1 className="mb-3 text-center text-3xl font-bold text-[var(--kennion-navy)] sm:text-4xl">
        Your Benefits Program
      </h1>
      <p className="mb-10 text-center text-gray-600 sm:text-lg">
        Everything you need to enroll, explore, and get care&nbsp;&mdash; all in
        one place.
      </p>

      <div className="flex w-full flex-col gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const inner = (
            <span className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--kennion-blue)] px-6 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-[var(--kennion-blue-hover)] hover:shadow-lg sm:text-lg">
              <Icon size={20} />
              {step.num}. {step.label}
            </span>
          );

          return step.external ? (
            <a key={step.num} href={step.href} title={step.desc}>
              {inner}
            </a>
          ) : (
            <Link key={step.num} href={step.href} title={step.desc}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 flex flex-col items-center gap-2 rounded-xl bg-[var(--kennion-light)] px-8 py-6 text-center">
        <Mail size={24} className="text-[var(--kennion-blue)]" />
        <p className="text-sm text-gray-500">
          Powered By Kennion Benefit Advisors
        </p>
      </div>
    </div>
  );
}
