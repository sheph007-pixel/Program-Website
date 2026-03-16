import { ClipboardList, UserPlus, CreditCard, Phone } from "lucide-react";

const enrollSteps = [
  {
    num: 1,
    title: "Review Your Options",
    icon: ClipboardList,
    desc: "Visit KennionPlans.com to review available plans, coverage details, and costs for you and your family.",
  },
  {
    num: 2,
    title: "Complete Enrollment",
    icon: UserPlus,
    desc: "Work with your HR department or benefits administrator during open enrollment to complete your enrollment forms.",
  },
  {
    num: 3,
    title: "Receive Your ID Card",
    icon: CreditCard,
    desc: "After enrollment closes, you'll receive your medical ID card. New members should watch for it in the mail.",
  },
  {
    num: 4,
    title: "Activate Your Account",
    icon: Phone,
    desc: "Set up your myHealthEZ account to manage your plan, view benefits, pay bills, and access your digital ID card.",
  },
];

export default function EnrollmentPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="mb-2 text-3xl font-bold text-[var(--kennion-navy)]">
        Enrollment
      </h1>
      <p className="mb-10 text-gray-600">
        From onboarding to open enrollment, Kennion provides the tools, support,
        and service to make your enrollment easy.
      </p>

      <div className="space-y-6">
        {enrollSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--kennion-blue)] text-lg font-bold text-white">
                {step.num}
              </div>
              <div>
                <h2 className="mb-1 text-lg font-semibold text-[var(--kennion-navy)]">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="https://kennionplans.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl bg-[var(--kennion-blue)] py-4 text-center font-semibold text-white shadow-md transition-all hover:bg-[var(--kennion-blue-hover)] hover:shadow-lg"
        >
          Go to Enrollment Portal
        </a>
        <a
          href="tel:8448396740"
          className="flex-1 rounded-xl border-2 border-[var(--kennion-blue)] py-4 text-center font-semibold text-[var(--kennion-blue)] transition-all hover:bg-[var(--kennion-light)]"
        >
          Call 844-839-6740
        </a>
      </div>

      <div className="mt-8 rounded-xl bg-[var(--kennion-light)] p-6">
        <h3 className="mb-2 font-semibold text-[var(--kennion-navy)]">
          Current Members
        </h3>
        <p className="text-sm text-gray-600">
          If you are a current HealthEZ member, you will receive a new medical
          ID card after open enrollment closes. Need a replacement? Log into
          your myHealthEZ account to request a new card or download a digital
          copy. Dependents over 19 can create their own account.
        </p>
      </div>
    </div>
  );
}
