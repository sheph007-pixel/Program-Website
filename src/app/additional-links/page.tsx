import { ExternalLink } from "lucide-react";

const links = [
  {
    category: "Member Portals",
    items: [
      {
        title: "KennionPlans.com — Member Portal",
        desc: "Access your plan details, find providers, and manage your health benefits.",
        url: "https://kennionplans.com",
      },
      {
        title: "myHealthEZ Member Portal",
        desc: "Log in to see up-to-date plan information, real-time claims, and helpful resources.",
        url: "https://healthez.com/who-we-help/members/",
      },
      {
        title: "Find a Doctor / Provider Search",
        desc: "Search local healthcare professionals, filter by location and specialty.",
        url: "https://hez.connect.payercompass.com/",
      },
      {
        title: "First Health Provider Locator",
        desc: "Find in-network providers through the First Health network.",
        url: "https://providerlocator.firsthealth.com/LocateProvider/SelectNetworkType",
      },
      {
        title: "HealthEZ Provider Portal",
        desc: "Portal for healthcare providers to submit claims and access resources.",
        url: "https://provider.myhealthez.com/",
      },
    ],
  },
  {
    category: "Apps",
    items: [
      {
        title: "myHealthEZ App — iOS",
        desc: "Download the myHealthEZ app for iPhone.",
        url: "https://apps.apple.com/us/app/myhealthez/id1571532368",
      },
      {
        title: "myHealthEZ App — Android",
        desc: "Download the myHealthEZ app for Android.",
        url: "https://play.google.com/store/apps/details?id=healthez.mobile",
      },
      {
        title: "Paytient App — iOS",
        desc: "Download the Paytient app for iPhone.",
        url: "https://apps.apple.com/us/app/paytient/id1418399898",
      },
      {
        title: "Paytient App — Android",
        desc: "Download the Paytient app for Android.",
        url: "https://play.google.com/store/apps/details?id=com.paytient",
      },
    ],
  },
  {
    category: "Partners & Services",
    items: [
      {
        title: "Paytient — Health Payment Account",
        desc: "Set up your interest-free Visa card for healthcare expenses.",
        url: "https://www.paytient.com/kennion",
      },
      {
        title: "Recuro Health — Virtual Care",
        desc: "Access 24/7 virtual urgent care, behavioral health, and primary care.",
        url: "https://recurohealth.com",
      },
      {
        title: "HealthEZ — Plan Administrator",
        desc: "Learn about HealthEZ, the independent TPA managing your health benefits.",
        url: "https://healthez.com",
      },
    ],
  },
  {
    category: "Documents & Resources",
    items: [
      {
        title: "Benefit Overview 2024",
        desc: "Download the comprehensive benefit overview document.",
        url: "https://kennionplans.com/wp-content/uploads/sites/319/2023/12/Kennion-Freedom-Plans_2024_Benefit-Overview.pdf",
      },
      {
        title: "Kennion Program Overview",
        desc: "Download the employee benefits program overview.",
        url: "https://www.kennion.com/content/files/2025/07/Kennion-Program-Overview.pdf",
      },
      {
        title: "2025 Master Medical Plan & SPD",
        desc: "Download the Summary Plan Description document.",
        url: "https://kennionplans.com/wp-content/uploads/sites/319/2025/03/Kennion-Plans-Master-Medical-Plan-Document-and-SPD_2025.pdf",
      },
      {
        title: "Kennion Benefit Advisors — Main Site",
        desc: "Visit the main Kennion Benefit Advisors website.",
        url: "https://www.kennion.com",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Call HealthEZ Support",
        desc: "844-839-6740 — Available during business hours.",
        url: "tel:8448396740",
      },
      {
        title: "Email HealthEZ Support",
        desc: "Service@HealthEZ.com — Get help via email.",
        url: "mailto:Service@HealthEZ.com",
      },
      {
        title: "Contact Kennion",
        desc: "Reach out to Kennion Benefit Advisors directly.",
        url: "https://www.kennion.com/contact/",
      },
    ],
  },
];

export default function AdditionalLinksPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Additional Links
      </h1>
      <p className="mb-8 text-[15px] text-gray-500">
        Quick access to all your benefits resources, portals, apps, and support
        contacts.
      </p>

      <div className="space-y-8">
        {links.map((section) => (
          <div key={section.category}>
            <h2 className="mb-3 text-base font-semibold text-[var(--kennion-navy)]">
              {section.category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target={item.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-[var(--kennion-blue)] hover:shadow-md"
                >
                  <h3 className="mb-1 text-[13px] font-semibold text-[var(--kennion-navy)]">
                    {item.title}
                  </h3>
                  <p className="mb-2 flex-1 text-[11px] leading-relaxed text-gray-400">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--kennion-blue)]">
                    Open <ExternalLink size={11} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
