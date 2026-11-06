import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROGRAMS, ENROLLMENT_PORTAL_URL, SCHEDULE_URL } from "@/lib/programPartners";

/** Home tile names: plain words that fit any group's lineup. */
const TILE_TITLES: Record<string, string> = { medical: "Health" };

export default function HomePage() {
  return (
    <div>
      <header className="bg-blue-900 px-5 pt-12 pb-14 text-white sm:px-8">
        <div className="mx-auto max-w-[1040px]">
          <img src="/bensync/wordmark-reversed.png" alt="BenSync" className="h-11 w-auto sm:h-14" />
          <h1 className="mt-6 text-[26px] font-semibold leading-tight sm:text-[32px]">Welcome</h1>
          <p className="mt-2 text-[17px] text-white/80 sm:text-[19px]">View your benefits.</p>
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
              <h2 className="text-[18px] font-semibold text-slate-800">{TILE_TITLES[p.slug] ?? p.title}</h2>
              <ArrowRight size={18} className="shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={ENROLLMENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Enroll Now
            <ArrowUpRight size={15} className="opacity-80" />
          </a>
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-6 py-3 text-[15px] font-semibold text-slate-800 transition-colors hover:border-blue-600 hover:text-blue-700"
          >
            Get Help
            <ArrowUpRight size={15} className="opacity-60" />
          </a>
        </div>
      </main>
    </div>
  );
}
