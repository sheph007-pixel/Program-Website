import { Users, Search, HelpCircle, Link2 } from "lucide-react";

export default function AdditionalLinksPage() {
  return (
    <div className="mx-auto max-w-[780px] px-5 py-6 sm:py-10">
      {/* Top row: Find A Provider + Drug Lookup */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a
          href="https://hez.connect.payercompass.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
        >
          <Users size={18} strokeWidth={1.5} />
          Find A Provider
        </a>
        <a
          href="https://medone-rx.com/members/drug-lookup/0114"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-6 py-3.5 text-[15px] font-medium text-[var(--kennion-navy)] transition-all hover:bg-gray-50"
        >
          <Search size={18} strokeWidth={1.5} />
          Drug Lookup
        </a>
      </div>

      {/* Ask For Help card */}
      <a
        href="tel:8448396740"
        className="mb-3 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[var(--kennion-light)] px-6 py-5 transition-all hover:bg-blue-100"
      >
        <HelpCircle size={22} strokeWidth={1.5} className="text-[var(--kennion-blue)]" />
        <span className="text-[14px] font-medium text-[var(--kennion-navy)]">
          Ask For Help
        </span>
      </a>

      {/* Quick Links card */}
      <a
        href="https://kennionplans.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[var(--kennion-light)] px-6 py-5 transition-all hover:bg-blue-100"
      >
        <Link2 size={22} strokeWidth={1.5} className="text-[var(--kennion-blue)]" />
        <span className="text-[14px] font-medium text-[var(--kennion-navy)]">
          Quick Links
        </span>
      </a>
    </div>
  );
}
