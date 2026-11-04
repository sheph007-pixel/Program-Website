import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROGRAMS, ENROLLMENT_PORTAL_URL, SCHEDULE_URL } from "@/lib/programPartners";

export default function HomePage() {
  return (
    <div>
      <header className="bg-blue-900 px-5 pt-12 pb-14 text-white sm:px-8">
        <div className="mx-auto max-w-[1040px]">
          <img src="/bensync/wordmark-reversed.png" alt="BenSync" className="h-11 w-auto sm:h-14" />
          <p className="mt-5 max-w-[640px] text-[19px] leading-snug sm:text-[22px]">
            Kennion Benefit Advisors works with your employer to offer the best benefits package.
          </p>
          <p className="mt-3 max-w-[640px] text-[15px] leading-relaxed text-white/75">
            This site is an overview of every option. Your group&apos;s specific plans and rates
            are in Employee Navigator.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={ENROLLMENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Employee Navigator
              <ArrowUpRight size={15} className="opacity-70" />
            </a>
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-white/25 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Talk to a Benefits Counselor
              <ArrowUpRight size={15} className="opacity-70" />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-5 pt-8 pb-14 sm:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex items-center justify-between gap-4 rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:border-blue-600"
            >
              <div>
                <h2 className="text-[18px] font-semibold text-slate-800">{p.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {p.partners.map((partner) => (
                    <span key={partner.name} className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                      <span
                        aria-hidden
                        className="flex h-4.5 w-4.5 items-center justify-center rounded text-[10px] font-bold text-white"
                        style={{ background: partner.color }}
                      >
                        {partner.mark}
                      </span>
                      {partner.name}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight size={18} className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
