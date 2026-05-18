"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Building2 } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "Placeholder question about the Kennion program?",
    answer:
      "Placeholder answer. Replace this content with the FAQ copy you'd like employer groups to see.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/25">
          <HelpCircle size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Employer FAQ</h1>
        <p className="page-subtitle">
          Answers to common questions about the Kennion Benefits Program for
          employer groups.
        </p>
      </div>

      <div className="mb-3">
        <div className="badge mb-4 bg-blue-50 text-blue-600">
          <Building2 size={12} strokeWidth={2} />
          For Employer Groups
        </div>
      </div>

      <div className="flex flex-col gap-2.5 animate-fade-in-up stagger-1">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="card overflow-hidden p-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <span className="text-[14px] font-semibold text-[var(--kennion-navy)] leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={2}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-blue-500" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-100 px-4 py-4">
                    <p className="text-[13px] leading-relaxed text-slate-600 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
