const healthPlans = [
  { name: "Deluxe Platinum", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDjbxGFQKCtTLE-pAQjj6HAAaS3JHitaKhwlw2QteYgfDs?e=FdajUc" },
  { name: "Elite Health", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDiF-qR_lnSR46Cd9NCz5qgAculq2WeagWDxidEQ9i7DIc?e=aVy6jZ" },
  { name: "Freedom Platinum", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBfdf1DrXCGSKomJsf_91P7AbTkhqRxLH93Gk-qHTmLTrQ?e=h9kI87" },
  { name: "Premier Health", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCyEt8YEtvDSb02wOrhvpO1AaVg44QV1kxL2z86NMdygto?e=XJrtsi" },
  { name: "Choice Gold", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC5MNDjfZKMQ7yWSHI_EB3SAefFq02DB42YyV0zTWepuRc?e=8wPAx0" },
  { name: "Freedom Gold", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAv3Z7Q9Qs8T7B2EYZPfIymAcps0iDCrTg7G8BjCc27yGo?e=mUpNG0" },
  { name: "Select Health", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBnSZsY1kfVR43xJdohvpMlAWhQuWx6ox8OvrwNGpjh7vo?e=BkILWK" },
  { name: "Basic Gold", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGqetmNCvjSI5NMeT5iOmjAcewCSy2xov3oTOZQJu27to?e=QSjaJS" },
  { name: "Preferred Silver", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAYRhZ0CCxdQKyrTe9YO3NKAdAkv6VhRNe5SGAe9zkxDTE?e=kVdW9x" },
  { name: "Enhanced Silver", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAuc9wDHKnVRoXyPeQ4IY43AdvOEVhos94V5bt9mun5EZI?e=opToXJ" },
  { name: "Freedom Silver", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDH6B4j6MiuRZMie658uV20AbeaRwekwp7Hgfj-3Mgkg-I?e=ubZxvM" },
  { name: "Core Health", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAOp3ukpGTBToVCAEjQ3uVHAVf2g1j4ftsbsVoLwcGtzag?e=fxhCna" },
  { name: "Classic Silver", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBC2681O-G9QLN0l5ETbzDoAQIpbvHwbzkr3fTppEPAXDc?e=nCnyUV" },
  { name: "Saver HSA", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQBHhZx5Gp8IQ4W-zYLmS1JzAUK2EA9tXOSwgoFz9uqQMhw?e=89V3r7" },
  { name: "Freedom Bronze", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDMspItNgscRJ_H3njoL5w3AZ9LKu6lgJTpCQhnda_QX3s?e=jP32OB" },
];

const dentalPlans = [
  { name: "Advantage Dental (W Ortho)", link: "https://kennionplans.com" },
  { name: "Complete Dental (W Ortho)", link: "https://kennionplans.com" },
  { name: "Value Dental (W Ortho)", link: "https://kennionplans.com" },
  { name: "Complete Dental", link: "https://kennionplans.com" },
  { name: "Value Dental", link: "https://kennionplans.com" },
  { name: "Basic Dental", link: "https://kennionplans.com" },
  { name: "Choice Dental", link: "https://kennionplans.com" },
];

const visionPlans = [
  { name: "Premium Vision", link: "https://kennionplans.com" },
  { name: "Standard Vision", link: "https://kennionplans.com" },
  { name: "Value Vision", link: "https://kennionplans.com" },
  { name: "Base Vision", link: "https://kennionplans.com" },
];

const supplementalPlans = [
  { name: "Accident Insurance", link: "https://kennionplans.com" },
  { name: "Cancer Insurance", link: "https://kennionplans.com" },
  { name: "Critical Illness Insurance", link: "https://kennionplans.com" },
  { name: "Disability Insurance", link: "https://kennionplans.com" },
  { name: "Hospital + Surgery Insurance (GAP)", link: "https://kennionplans.com" },
  { name: "Individual Life ($100k+)", link: "https://kennionplans.com" },
  { name: "Voluntary Life (Max $100k)", link: "https://kennionplans.com" },
];

function PlanTable({
  plans,
  numbered,
}: {
  plans: { name: string; link: string }[];
  numbered: boolean;
}) {
  return (
    <div>
      <div className="mb-1 px-1 text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
        Plan Summary
      </div>
      <div className="divide-y divide-gray-100">
        {plans.map((plan, i) => (
          <div key={plan.name} className="flex items-center gap-6 py-3 px-1">
            {numbered && (
              <span className="w-8 text-[15px] text-gray-400">{i + 1}</span>
            )}
            <a
              href={plan.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-medium text-[var(--kennion-blue)] hover:underline"
            >
              {plan.name}
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
