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
  { name: "Advantage Dental (W Ortho)", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQC1zNTdLbCfSKJSl0nZut-jAZYEVN2E6i8ehEcKIM0tdrU?e=D0Dbhr" },
  { name: "Complete Dental (W Ortho)", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQARyqwnbTxmT5p_V5yPCvuFAeeaj1qBW6bltnCw1DGaadY?e=etPWcd" },
  { name: "Value Dental (W Ortho)", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQAJhfPyTeISR6g630yMPL7rAfIh0KqKCBDdMKy8wXNt1RI?e=9DW6ON" },
  { name: "Complete Dental", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDsmA3LxY0xSa5Ubz-9uLD_AZOiVrHXjk3aF0lw2s-AHPg?e=h3KHAD" },
  { name: "Value Dental", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCqpwo6dBnASrxCgQEZbj6bAZVQHgQnGK27Qb0dIvwQcic?e=vz2T5A" },
  { name: "Basic Dental", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCCBYcyLhXyTKz3ztcFG6nSAaeCZYIRmoscfv-ODP183nA?e=VAmfh0" },
  { name: "Choice Dental", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDRZP1EmrZjTYo6OxTAP5YNAe6cInudHdmeAe4EsgYdWGM?e=bNOAAW" },
];

const visionPlans = [
  { name: "Premium Vision", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCGHsTU0pS-QJebH4j_09OWAZ2zV-EPZw4G8dajTD1RAco?e=Lctihu" },
  { name: "Standard Vision", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQDz2khRMs-8T6K52hyB6XyOAa_nb61a4xrpZDMRGjP4_K4?e=YIEVCe" },
  { name: "Value Vision", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCIB4xpeM3hR7gJ-3b-FvRxAWidQM4y69kLD7txvrPpATA?e=ezJ4ic" },
  { name: "Base Vision", link: "https://kennion-my.sharepoint.com/:b:/p/hunter/IQCrPHVJa5-_Qo4F9rgxl2M6ARVgvx_XsqusN1EzYWgPQbY?e=MRuc8G" },
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
