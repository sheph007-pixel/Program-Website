"use client";

import { Phone } from "lucide-react";

type Props = {
  number: string; // formatted: (877) 500-3212
  label: string; // e.g. "HealthJoy Concierge"
  sublabel?: string; // e.g. "Available 24/7"
  gradient?: string;
  shadow?: string;
};

function digitsOnly(formatted: string) {
  return formatted.replace(/\D/g, "");
}

export default function PhoneContact({
  number,
  label,
  sublabel,
  gradient = "from-blue-600 to-cyan-500",
  shadow = "shadow-blue-500/20",
}: Props) {
  const digits = digitsOnly(number);

  return (
    <div className="card flex items-center gap-4 p-5">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${shadow}`}
      >
        <Phone size={20} className="text-white" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-bold text-[var(--kennion-navy)]">
          {label}
        </div>
        {sublabel && (
          <div className="text-[12px] text-slate-400 mt-0.5">{sublabel}</div>
        )}
        {/* Desktop: show number as text */}
        <div className="hidden sm:block mt-1 text-[15px] font-semibold text-[var(--kennion-blue)]">
          {number}
        </div>
      </div>
      {/* Mobile: tap to call button */}
      <a
        href={`tel:${digits}`}
        className="flex sm:hidden items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all active:scale-95"
      >
        <Phone size={15} strokeWidth={1.8} />
        Call
      </a>
      {/* Desktop: subtle call link */}
      <a
        href={`tel:${digits}`}
        className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--kennion-blue)] shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
      >
        <Phone size={15} strokeWidth={1.8} />
        Call
      </a>
    </div>
  );
}
