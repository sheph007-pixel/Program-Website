const healthPlans = [
  "Deluxe Platinum",
  "Elite Health",
  "Freedom Platinum",
  "Premier Health",
  "Choice Gold",
  "Freedom Gold",
  "Select Health",
  "Basic Gold",
  "Preferred Silver",
  "Enhanced Silver",
  "Freedom Silver",
  "Core Health",
  "Classic Silver",
  "Saver HSA",
  "Freedom Bronze",
];

const dentalPlans = [
  "Advantage Dental (W Ortho)",
  "Complete Dental (W Ortho)",
  "Value Dental (W Ortho)",
  "Complete Dental",
  "Value Dental",
  "Basic Dental",
  "Choice Dental",
];

const visionPlans = [
  "Premium Vision",
  "Standard Vision",
  "Value Vision",
  "Base Vision",
];

const supplementalPlans = [
  "Accident Insurance",
  "Cancer Insurance",
  "Critical Illness Insurance",
  "Disability Insurance",
  "Hospital + Surgery Insurance (GAP)",
  "Individual Life ($100k+)",
  "Voluntary Life (Max $100k)",
];

function PlanTable({
  plans,
  numbered,
}: {
  plans: string[];
  numbered: boolean;
}) {
  return (
    <div>
      <div className="mb-1 px-1 text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
        Plan Summary
      </div>
      <div className="divide-y divide-gray-100">
        {plans.map((plan, i) => (
          <div key={plan} className="flex items-center gap-6 py-3 px-1">
            {numbered && (
              <span className="w-8 text-[15px] text-gray-400">{i + 1}</span>
            )}
            <a
              href="https://kennionplans.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-[var(--kennion-blue)] hover:underline"
            >
              {plan}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlansPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-3 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Plans
      </h1>
      <p className="mb-10 text-center text-[15px] leading-relaxed text-gray-500">
        This page gives you a quick look at all the benefits available through
        our national program. After you enroll, you&apos;ll find all your
        personal benefit information in the HealthJoy app.
      </p>

      {/* Health Plans */}
      <section className="mb-10">
        <h2 className="page-title mb-4 text-[22px] font-bold text-[var(--kennion-navy)] sm:text-[26px]">
          Health Plans
        </h2>
        <PlanTable plans={healthPlans} numbered={true} />
      </section>

      {/* Dental Plans */}
      <section className="mb-10">
        <h2 className="page-title mb-4 text-[22px] font-bold text-[var(--kennion-navy)] sm:text-[26px]">
          Dental Plans
        </h2>
        <PlanTable plans={dentalPlans} numbered={true} />
      </section>

      {/* Vision Plans */}
      <section className="mb-10">
        <h2 className="page-title mb-4 text-[22px] font-bold text-[var(--kennion-navy)] sm:text-[26px]">
          Vision Plans
        </h2>
        <PlanTable plans={visionPlans} numbered={true} />
      </section>

      {/* Supplemental */}
      <section className="mb-10">
        <h2 className="page-title mb-4 text-[22px] font-bold text-[var(--kennion-navy)] sm:text-[26px]">
          Supplemental
        </h2>
        <PlanTable plans={supplementalPlans} numbered={false} />
      </section>
    </div>
  );
}
