import { CalendarClock, ArrowUpRight } from "lucide-react";
import { SCHEDULE_URL } from "@/lib/programPartners";

/** Book a call with a licensed benefits counselor (Calendly). */
export default function CounselorCTA() {
  return (
    <section className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <CalendarClock size={22} strokeWidth={1.8} />
        </div>
        <div className="flex-1">
          <h2 className="text-[18px] font-semibold text-slate-800">Talk With a Benefits Counselor</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
            Book a free call and we&apos;ll help you enroll.
          </p>
        </div>
        <a
          href={SCHEDULE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-5 py-3 text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Schedule a Call
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </a>
      </div>
    </section>
  );
}
