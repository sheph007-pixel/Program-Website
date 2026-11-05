"use client";

import { FileText, ArrowUpRight, LogIn } from "lucide-react";
import PhoneContact from "@/components/PhoneContact";
import PartnerCard from "@/components/PartnerCard";
import { programBySlug, ENROLLMENT_PORTAL_URL, SCHEDULE_URL } from "@/lib/programPartners";

type SupportInfo = { type: "idcard"; label: string; sublabel: string; gradient: string; shadow: string } | { type: "phone"; number: string; label: string; sublabel: string; gradient: string; shadow: string };

const categorySupport: Record<string, SupportInfo[] | null> = {
  "Health Plans": [
    { type: "idcard", label: "Medical Plan Support", sublabel: "Call the number on the back of your ID card", gradient: "from-blue-600 to-blue-500", shadow: "shadow-blue-500/20" },
  ],
  "Dental Plans": [
    { type: "idcard", label: "Dental Plan Support", sublabel: "Call the number on the back of your ID card", gradient: "from-indigo-600 to-violet-500", shadow: "shadow-violet-500/20" },
  ],
  "Vision Plans": [
    { type: "phone", number: "(800) 877-7195", label: "VSP Vision Care", sublabel: "Call VSP for vision plan questions and support", gradient: "from-violet-600 to-purple-500", shadow: "shadow-purple-500/20" },
  ],
  "Supplemental": null,
};

export default function PlansView({ slug }: { slug: string }) {
  const program = programBySlug(slug);
  const activeCategory = program.category;
  const partners = [...program.partners].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="page-container page-container-wide">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">{program.title}</h1>
      </div>

      {/* Program partners */}
      <section className="mb-8 rounded-[10px] border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] animate-fade-in-up stagger-1 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[16px] font-semibold text-slate-800">{program.partnerNote}</h2>
            <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
              To see your plans and rates, log in or talk with a benefits counselor.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={ENROLLMENT_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <LogIn size={16} strokeWidth={2} />
              Log In
            </a>
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Schedule a Call
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
          </div>
        </div>
        <div className={`grid grid-cols-1 gap-3 ${partners.length > 1 ? "md:grid-cols-3" : ""}`}>
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </section>

      {/* Support Contacts for Category */}
      {categorySupport[activeCategory] && (
        <>
          <div className="divider" />
          <div className="badge mb-4 bg-slate-100 text-slate-500">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Plan Support
          </div>
          <div className="flex flex-col gap-3 animate-fade-in-up">
            {categorySupport[activeCategory]!.map((info) =>
              info.type === "idcard" ? (
                <div key={info.label} className="card flex items-center gap-4 p-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} shadow-lg ${info.shadow}`}>
                    <FileText size={20} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[var(--kennion-navy)]">
                      {info.label}
                    </div>
                    <div className="text-[12px] text-slate-400 mt-0.5">
                      {info.sublabel}
                    </div>
                  </div>
                </div>
              ) : (
                <PhoneContact
                  key={info.label}
                  number={info.number}
                  label={info.label}
                  sublabel={info.sublabel}
                  gradient={info.gradient}
                  shadow={info.shadow}
                />
              )
            )}
          </div>
        </>
      )}

    </div>
  );
}
