import { ExternalLink, Shield, Stethoscope, Eye, HeartPulse } from "lucide-react";

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

const sections = [
  { title: "Health Plans", icon: Shield, plans: healthPlans, numbered: true, color: "from-blue-600 to-blue-500", count: 15 },
  { title: "Dental Plans", icon: Stethoscope, plans: dentalPlans, numbered: true, color: "from-indigo-600 to-violet-500", count: 7 },
  { title: "Vision Plans", icon: Eye, plans: visionPlans, numbered: true, color: "from-violet-600 to-purple-500", count: 4 },
  { title: "Supplemental", icon: HeartPulse, plans: supplementalPlans, numbered: false, color: "from-cyan-600 to-teal-500", count: 7 },
];

export default function PlansPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Plans</h1>
        <p className="page-subtitle">
          This page gives you a quick look at all the benefits available through
          our national program. After you enroll, you&apos;ll find all your
          personal benefit information in the HealthJoy app.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section, sIdx) => {
          const SectionIcon = section.icon;
          return (
            <section key={section.title} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 0.1}s` }}>
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${section.color} shadow-md`}>
                  <SectionIcon size={18} className="text-white" strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[var(--kennion-navy)]">{section.title}</h2>
                </div>
                <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
                  {section.count} plans
                </span>
              </div>

              <div className="card overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-100">
                  <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                    Plan Summary
                  </span>
                </div>
                <div className="divide-y divide-slate-50">
                  {section.plans.map((plan, i) => (
                    <a
                      key={plan.name}
                      href={plan.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-blue-50/50"
                    >
                      {section.numbered && (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[12px] font-semibold text-slate-400 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                          {i + 1}
                        </span>
                      )}
                      <span className="flex-1 text-[14px] font-medium text-[var(--kennion-navy)] group-hover:text-blue-600 transition-colors">
                        {plan.name}
                      </span>
                      <ExternalLink size={14} className="shrink-0 text-slate-300 transition-all group-hover:text-blue-500" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
