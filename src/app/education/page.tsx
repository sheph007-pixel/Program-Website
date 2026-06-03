"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Users, GitCompareArrows, CalendarCheck2, Smartphone, Coins } from "lucide-react";

type Guide = {
  slug: string;
  title: string;
  description: string;
  audience: string;
  icon: typeof FileText;
};

// To add a new guide:
//   1. Create src/app/education/<new-slug>/page.tsx
//   2. Append one entry below.
const guides: Guide[] = [
  {
    slug: "using-your-plan",
    title: "Using Your Kennion Plan",
    description:
      "A simple, printable guide for members and employees. Walks through what happens at the doctor, the four safety nets behind every visit, and one thing worth knowing about why there is no Blue Cross logo on the card.",
    audience: "Members and Employees",
    icon: Users,
  },
  {
    slug: "benefits-toolkit",
    title: "Your Benefits Toolkit",
    description:
      "The HealthJoy app and Paytient Visa Card explained for members. Three-step setup, real-world stats, signup links, and the questions members ask most often about how the tools work.",
    audience: "Members and Employees",
    icon: Smartphone,
  },
  {
    slug: "apta-cash",
    title: "Apta Cash for Major Procedures",
    description:
      "What to do when a doctor recommends surgery or an expensive diagnostic test. Apta Cash negotiates cash prices and waives plan deductibles and coinsurance. Includes the seven-step process and the direct phone number.",
    audience: "Members",
    icon: Coins,
  },
  {
    slug: "first-30-days",
    title: "Your First 30 Days",
    description:
      "A short, printable checklist for new members. Three weeks of small steps to set up the HealthJoy app, the Paytient card, and the support number so the plan is ready when you need it.",
    audience: "New Members",
    icon: CalendarCheck2,
  },
  {
    slug: "vs-traditional-plan",
    title: "How Your Plan Compares",
    description:
      "A side-by-side look at how your plan works versus a traditional Blue Cross, UnitedHealthcare, Cigna, or Aetna plan. Useful for understanding why your card looks different and what that means for you.",
    audience: "Members and HR",
    icon: GitCompareArrows,
  },
];

export default function EducationIndex() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
            <BookOpen size={12} strokeWidth={2.4} />
            Education
          </div>
          <h1 className="text-[32px] font-extrabold tracking-tight text-[var(--kennion-navy)]">
            Education Center
          </h1>
          <p className="mt-2 text-[16px] text-slate-600">
            Printable guides for prospects, members, and employees. Each one is
            built to be saved as a PDF and shared.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="grid gap-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.slug}
                href={`/education/${guide.slug}`}
                className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-[18px] font-bold text-[var(--kennion-navy)]">
                      {guide.title}
                    </h2>
                    <ArrowRight
                      size={18}
                      className="mt-1 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-blue-500"
                    />
                  </div>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
                    {guide.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {guide.audience}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-[12px] text-slate-400">
            Each guide is print-optimized. Open a guide and click Save as PDF to
            download a clean, branded copy.
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--kennion-blue)] hover:underline"
          >
            <ArrowRight size={14} strokeWidth={2.2} className="rotate-180" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
