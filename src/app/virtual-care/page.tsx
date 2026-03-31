import { Smartphone, Play, MapPin, Building } from "lucide-react";

export default function VirtualCarePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[680px] flex-col items-center px-5 py-10 sm:py-14">
      <h1 className="page-title mb-3 text-center text-[28px] font-bold text-[var(--kennion-navy)] sm:text-[34px]">
        Free Virtual Care + Nationwide Access
      </h1>
      <p className="mb-8 text-center text-[15px] text-gray-500 sm:text-base">
        Get free unlimited 24/7 virtual care &mdash; plus access to providers
        nationwide.
      </p>

      {/* Virtual Care Buttons */}
      <div className="flex w-full flex-col gap-3">
        <a
          href="https://recurohealth.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
        >
          <Smartphone size={18} strokeWidth={1.5} />
          Talk To A Doctor Now For Free
        </a>
        <a
          href="https://recurohealth.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
        >
          <Play size={18} strokeWidth={1.5} />
          Educational Videos
        </a>
      </div>

      {/* Divider */}
      <div className="my-8 w-full border-t border-gray-200" />

      {/* Find Care Buttons */}
      <div className="flex w-full flex-col gap-3">
        <a
          href="https://hez.connect.payercompass.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
        >
          <MapPin size={18} strokeWidth={1.5} />
          Find A Provider
        </a>
        <a
          href="https://hez.connect.payercompass.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[var(--kennion-blue)] px-6 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[var(--kennion-blue-hover)]"
        >
          <Building size={18} strokeWidth={1.5} />
          Find A Facility
        </a>
      </div>
    </div>
  );
}
