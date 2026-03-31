import { Users, Search, HelpCircle, Link2, ArrowUpRight, Phone, ExternalLink } from "lucide-react";

export default function AdditionalLinksPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Additional Links</h1>
        <p className="page-subtitle">
          Quick access to providers, tools, and support.
        </p>
      </div>

      {/* Top action row */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 animate-fade-in-up stagger-1">
        <a
          href="https://hez.connect.payercompass.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <Users size={20} strokeWidth={1.8} />
          Find A Provider
        </a>
        <a
          href="https://medone-rx.com/members/drug-lookup/0114"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 bg-white px-6 py-4 text-[15px] font-semibold text-[var(--kennion-navy)] shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
        >
          <Search size={20} strokeWidth={1.8} />
          Drug Lookup
        </a>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 animate-fade-in-up stagger-2">
        <a
          href="tel:8448396740"
          className="card card-interactive group flex flex-col items-center gap-3 p-6 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
            <HelpCircle size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">Ask For Help</h3>
            <p className="mt-1 text-[12px] text-slate-400">Call 844-839-6740</p>
          </div>
        </a>

        <a
          href="https://kennionplans.com"
          target="_blank"
          rel="noopener noreferrer"
          className="card card-interactive group flex flex-col items-center gap-3 p-6 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
            <Link2 size={22} className="text-white" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[var(--kennion-navy)]">Quick Links</h3>
            <p className="mt-1 text-[12px] text-slate-400">Member resources &amp; portals</p>
          </div>
        </a>
      </div>
    </div>
  );
}
