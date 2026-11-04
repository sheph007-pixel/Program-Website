import Link from "next/link";
import { ArrowRight, Monitor, ArrowUpRight } from "lucide-react";
import CounselorCTA from "@/components/CounselorCTA";
import { PROGRAMS, ENROLLMENT_PORTAL_URL } from "@/lib/programPartners";

const steps: [string, string][] = [
  [
    "Your Employer Picks Your Partners",
    "Each group chooses one partner for each benefit, so your exact plans and rates depend on your employer.",
  ],
  [
    "Talk With a Benefits Counselor",
    "Schedule a free 1-on-1 call with a licensed counselor to go through every option and what it costs you.",
  ],
  [
    "Enroll",
    "Make your elections in the Enrollment Portal during your group's open enrollment, or when you are newly hired.",
  ],
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <header className="bg-blue-900 px-5 pt-10 pb-12 text-white sm:px-8">
        <div className="mx-auto max-w-[1040px]">
          <div className="text-[12px] font-bold uppercase tracking-[0.6px] text-sky-400">
            One Program for Every Employer
          </div>
          <img
            src="/bensync/wordmark-reversed.png"
            alt="BenSync"
            className="mt-3 h-11 w-auto sm:h-14"
          />
          <div className="mt-2 text-[14px] font-medium text-white/70">Powered by Kennion Benefit Advisors</div>
          <p className="mt-4 max-w-[720px] text-[15.5px] leading-relaxed text-white/85">
            BenSync is one benefits program shared by employers of every size, and new groups
            can join all year. Kennion Benefit Advisors works
            with your employer to choose from the program&apos;s partners below. Your group&apos;s
            specific plans and rates are set up in the Enrollment Portal: log in to enroll, or
            schedule time to talk with a licensed benefits counselor.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={ENROLLMENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Monitor size={18} strokeWidth={1.8} />
              Enrollment Portal
              <ArrowUpRight size={15} className="opacity-70" />
            </a>
            <Link
              href="/enrollment"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              How Enrollment Works
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1040px] px-5 pt-8 pb-14 sm:px-8">
        {/* Benefits */}
        <h2 className="mb-3 text-[20px] font-semibold text-slate-800">What the Program Offers</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PROGRAMS.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}`}
              className="group flex flex-col rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:border-blue-600"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[18px] font-semibold text-slate-800">{p.title}</h3>
                <ArrowRight size={17} className="text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </div>
              <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {p.partners.map((partner) => (
                  <span key={partner.name} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[12.5px] font-medium text-slate-700">
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
              {p.partners.length > 1 && (
                <div className="mt-2 text-[12.5px] font-semibold text-blue-700">{p.partnerNote}</div>
              )}
            </Link>
          ))}
        </div>

        {/* Counselor */}
        <div className="mt-8">
          <CounselorCTA />
        </div>

        {/* How it works */}
        <h2 className="mt-10 mb-3 text-[20px] font-semibold text-slate-800">How It Works</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {steps.map(([title, body], i) => (
            <div key={title} className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <div className="mb-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-900 text-[14px] font-bold text-white">
                {i + 1}
              </div>
              <div className="text-[15.5px] font-semibold text-slate-800">{title}</div>
              <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] leading-relaxed text-slate-400">
          Plans, benefits and rates are set by each carrier and vary by employer. Your
          enrollment materials confirm what your group offers. Nothing here is an offer of
          coverage or a guarantee of benefits.
        </p>
      </main>
    </div>
  );
}
