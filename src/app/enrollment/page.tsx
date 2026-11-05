import { Monitor, ArrowUpRight } from "lucide-react";
import CounselorCTA from "@/components/CounselorCTA";
import { ENROLLMENT_PORTAL_URL } from "@/lib/programPartners";

const whenToEnroll: [string, string][] = [
  ["Open Enrollment", "Once a year, during the window your employer sets, you can join, change or drop your plans."],
  ["New Hires", "When you start a new job, you can enroll within your employer's new-hire window."],
  ["Life Events", "Marriage, a new baby or losing other coverage lets you make changes outside open enrollment."],
];

export default function EnrollmentPage() {
  return (
    <div className="page-container page-container-wide">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Open Enrollment</h1>
      </div>

      {/* Employee Navigator */}
      <div className="mx-auto max-w-[720px] animate-fade-in-up stagger-1">
        <a href={ENROLLMENT_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <Monitor size={20} strokeWidth={1.8} />
          Employee Navigator
          <ArrowUpRight size={16} className="ml-1 opacity-60" />
        </a>
      </div>

      <div className="mt-8 animate-fade-in-up stagger-2">
        <CounselorCTA />
      </div>

      <h2 className="mt-10 mb-3 text-[18px] font-semibold text-slate-800">When You Can Enroll</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 animate-fade-in-up stagger-3">
        {whenToEnroll.map(([title, body]) => (
          <div key={title} className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <div className="text-[15.5px] font-semibold text-slate-800">{title}</div>
            <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
