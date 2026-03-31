import { Monitor, ArrowUpRight } from "lucide-react";
import PhoneContact from "@/components/PhoneContact";

export default function EnrollmentPage() {
  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Enrollment</h1>
        <p className="page-subtitle">
          Enrollment instructions vary by group. Most employees use the Employee
          Navigator Enrollment Portal or Kennion&apos;s Enrollment Help Line, but
          some may follow a different process. If you&apos;re unsure, check with
          your HR team before enrolling.
        </p>
      </div>

      {/* Enrollment Portal */}
      <div className="animate-fade-in-up stagger-1">
        <a
          href="https://goenroll.employeenavigator.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <Monitor size={20} strokeWidth={1.8} />
          Enrollment Portal
          <ArrowUpRight size={16} className="ml-1 opacity-60" />
        </a>
      </div>

      <div className="divider" />

      {/* Help Line */}
      <div className="animate-fade-in-up stagger-2 text-center">
        <div className="card inline-flex items-center gap-2 px-4 py-2 mb-5">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[13px] font-medium text-slate-500">Live support available now</span>
        </div>
        <p className="mb-5 text-[15px] text-slate-500">
          Call your Benefits Coach for live enrollment support.
        </p>
      </div>

      <div className="animate-fade-in-up stagger-3">
        <PhoneContact
          number="(833) 614-1622"
          label="Enrollment Help Line"
          sublabel="Live enrollment support from your Benefits Coach"
          gradient="from-emerald-600 to-teal-500"
          shadow="shadow-emerald-500/20"
        />
      </div>
    </div>
  );
}
