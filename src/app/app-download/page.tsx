import { Smartphone, CreditCard, Search, BarChart3, Bot, Wallet } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Digital ID Card",
    desc: "Access your digital insurance card instantly — no need to carry a physical card.",
  },
  {
    icon: Search,
    title: "Find Providers",
    desc: "Search, select, and schedule appointments. Filter by location, specialty, and network status.",
  },
  {
    icon: BarChart3,
    title: "Track Expenses",
    desc: "Monitor total healthcare expenses, deductible progress, out-of-pocket costs, and outstanding bills.",
  },
  {
    icon: Wallet,
    title: "EZpay",
    desc: "Save a payment method (credit card, FSA, or HSA), schedule automated payments, and view statements.",
  },
  {
    icon: Bot,
    title: "Virtual Assistant",
    desc: "Find answers faster with a virtual assistant, support materials, or connect with a member rep.",
  },
  {
    icon: Smartphone,
    title: "Manage Benefits",
    desc: "View your benefits, manage your plan, and access all your health information in one place.",
  },
];

export default function AppDownloadPage() {
  return (
    <div className="mx-auto max-w-[680px] px-5 py-10 sm:py-14">
      <h1 className="page-title mb-2 text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Download the App
      </h1>
      <p className="mb-8 text-[15px] text-gray-500">
        The myHealthEZ app lets you manage your health plan anytime, anywhere.
        View benefits, pay bills, find providers, and access your digital ID
        card.
      </p>

      {/* Download buttons */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="https://apps.apple.com/us/app/myhealthez/id1571532368"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-black py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          Download on the App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=healthez.mobile"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-lg bg-[#34A853] py-3.5 text-center text-[15px] font-semibold text-white shadow-md transition-all hover:bg-[#2d9249] hover:shadow-lg"
        >
          Get it on Google Play
        </a>
      </div>

      {/* Features grid */}
      <h2 className="mb-4 text-lg font-semibold text-[var(--kennion-navy)]">
        What You Can Do
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--kennion-light)] text-[var(--kennion-blue)]">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="mb-0.5 text-[13px] font-semibold text-[var(--kennion-navy)]">
                  {f.title}
                </h3>
                <p className="text-[12px] leading-relaxed text-gray-500">
                  {f.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-[var(--kennion-light)] p-5 text-center">
        <p className="text-[13px] text-gray-500">
          Questions about the app? Contact HealthEZ at{" "}
          <a
            href="tel:8448396740"
            className="font-medium text-[var(--kennion-blue)]"
          >
            844-839-6740
          </a>{" "}
          or{" "}
          <a
            href="mailto:Service@HealthEZ.com"
            className="font-medium text-[var(--kennion-blue)]"
          >
            Service@HealthEZ.com
          </a>
        </p>
      </div>
    </div>
  );
}
