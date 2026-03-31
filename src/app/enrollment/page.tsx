import { Monitor, Phone } from "lucide-react";

export default function EnrollmentPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[680px] flex-col items-center px-5 py-10 sm:py-14">
      <h1 className="page-title mb-3 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Enrollment
      </h1>
      <p className="mb-10 text-center text-[15px] leading-relaxed text-gray-500 sm:text-base">
        Enrollment instructions vary by group. Most employees use the Employee
        Navigator Enrollment Portal or Kennion&apos;s Enrollment Help Line, but
        some may follow a different process. If you&apos;re unsure, check with
        your HR team before enrolling.
      </p>

      {/* Enrollment Portal Button */}
      <a
        href="https://www.employeenavigator.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
      >
        <Monitor size={18} strokeWidth={1.5} />
        Enrollment Portal
      </a>

      {/* Help Line Section */}
      <p className="mt-10 mb-4 text-center text-[14px] text-gray-400">
        Call 833-614-1622 Now To Get Live Enrollment Support From Your Benefits
        Coach!
      </p>

      <a
        href="tel:8336141622"
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
      >
        <Phone size={18} strokeWidth={1.5} />
        Call Enrollment Help Line
      </a>
    </div>
  );
}
