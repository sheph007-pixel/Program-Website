import { ArrowUpRight } from "lucide-react";
import type { Partner } from "@/lib/programPartners";

/** One carrier or partner: brand mark, key facts and outbound links, styled like app.kennion.com. */
export default function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col rounded-[10px] border border-slate-200 bg-slate-50 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.4px] text-slate-400">Carrier / Partner</div>
      <div className="mt-1.5 mb-2 flex items-center gap-2.5">
        <span
          aria-hidden
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[13px] font-bold text-white"
          style={{ background: partner.color }}
        >
          {partner.mark}
        </span>
        <span className="text-[17px] font-medium text-slate-800">{partner.name}</span>
      </div>
      <dl className="flex-1">
        {partner.facts.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-3 border-t border-slate-200 py-2 text-[13.5px]">
            <dt className="text-slate-500">{label}</dt>
            <dd className="text-right font-semibold text-slate-800">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {partner.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-auto items-center justify-center gap-1 whitespace-nowrap rounded-md border border-blue-200 bg-blue-100 px-2.5 py-2 text-[12.5px] font-semibold text-blue-700 transition-colors hover:bg-blue-200"
          >
            {l.label}
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </a>
        ))}
      </div>
    </div>
  );
}
