"use client";

import Link from "next/link";
import { Printer, ArrowLeft, Smartphone, CreditCard, MessageCircle, Star, ThumbsUp, Users } from "lucide-react";

const steps = [
  {
    n: 1,
    icon: Smartphone,
    title: "Know Your Benefits",
    body: "Access all of your employee benefits including free 24/7 virtual healthcare and benefits support through the HealthJoy app. Plan details, ID card, claims status, prescription pricing, and a full wallet of your benefits, all in one place.",
  },
  {
    n: 2,
    icon: CreditCard,
    title: "Use Your Paytient Visa Card",
    body: "Go to any provider and use your Paytient Visa Card to pay out-of-pocket medical, pharmacy, dental, vision, and veterinary expenses. No fees. No interest. Repay over time on a schedule that works for you.",
  },
  {
    n: 3,
    icon: MessageCircle,
    title: "Get Help When You Need It",
    body: "Do not try to navigate healthcare alone. HealthJoy concierges are real people, available any hour. Chat in the app or call (877) 500-3212 for help finding a provider, scheduling a visit, understanding a bill, or anything else.",
  },
];

const stats = [
  { icon: Star, value: "4.9", label: "App Rating" },
  { icon: ThumbsUp, value: "94%", label: "Satisfaction Score" },
  { icon: Users, value: "3,300+", label: "Employee Reviews" },
];

const faqs = [
  {
    q: "Who can access the HealthJoy app?",
    a: "The HealthJoy app is a free benefit provided by your employer. If you are enrolled in an EBPA or HealthEZ health plan, a Guardian dental plan, or a VSP vision plan, you have access.",
  },
  {
    q: "Who can use the Paytient Visa Card?",
    a: "The Paytient Visa Card is a free benefit from your employer. It can be used for medical, dental, pharmacy, vision, and veterinary expenses at any provider, with no fees and no interest.",
  },
  {
    q: "What if a provider does not accept the plan?",
    a: "Around 90% of providers will accept and file your claim with EBPA or HealthEZ. If they do not, pay with your Paytient Visa Card and submit the receipt in the HealthJoy app for reimbursement through your plan's Self-Pay Benefit.",
  },
  {
    q: "Can I get free office visits?",
    a: "Yes. Virtual visits in the HealthJoy app are free. With your plan's Self-Pay Benefit, when you pay for an office visit in full with your Paytient Visa Card, the plan reimburses 100%. The HealthJoy concierge team will walk you through it.",
  },
  {
    q: "Can I go to any provider or pharmacy?",
    a: "Yes. Go to any provider or pharmacy. Pay for care with your Paytient Visa Card if needed. If you run into any issue, the HealthJoy app concierge will resolve it for you.",
  },
  {
    q: "Can you help me with medical bills?",
    a: "Yes. HealthJoy has medical billing experts who can review bills you suspect contain errors. They will answer questions, explain benefits, and make sure your bill is accurate before you pay.",
  },
  {
    q: "What if a facility does not accept?",
    a: "If a facility will not accept your plan for an elective procedure, federal law requires them to post prices online. Contact the concierge team for help with Pre-Payment through your plan's Pre-Payment Benefit (Apta Cash).",
  },
  {
    q: "Why does my health plan do this?",
    a: "Some providers may mistakenly think they do not accept your EBPA or HealthEZ plan, which leads to denials. To avoid this, the plan offers the Paytient Visa Card and Pre-Payment options, ensuring you have confidence in your coverage and access to care.",
  },
  {
    q: "Who is Kennion Benefit Advisors?",
    a: "Kennion Benefit Advisors is the team that built and runs your employee benefits program. They collaborate with your employer to make sure you have access to the best benefits possible.",
  },
];

export default function BenefitsToolkitGuide() {
  return (
    <div className="min-h-screen bg-white text-slate-800 print:bg-white">
      <style jsx global>{`
        @page { size: letter; margin: 0.5in; }
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="no-print sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3">
          <Link
            href="/education"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[var(--kennion-navy)]"
          >
            <ArrowLeft size={14} strokeWidth={2.2} />
            Education Center
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--kennion-navy)] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-blue-900"
          >
            <Printer size={14} strokeWidth={2.2} />
            Save as PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10 print:py-0">
        <header className="border-b border-slate-200 pb-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
            For Members
          </div>
          <h1 className="text-[32px] font-extrabold leading-[1.1] tracking-tight text-[var(--kennion-navy)]">
            The Power to Access and Pay for Care
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
            The HealthJoy app connects you with the right care and support, and
            your Paytient Visa Card gives you the power to pay any out-of-pocket
            cost. Together, they make sure you can always get care and never be
            stuck at a billing office.
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Three Steps
          </h2>
          <ol className="mt-4 space-y-4">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.n} className="rounded-2xl border border-slate-200 p-5 print:break-inside-avoid">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-sm">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--kennion-blue)]">
                        Step {s.n}
                      </p>
                      <h3 className="mt-0.5 text-[16px] font-bold text-[var(--kennion-navy)]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="mt-10 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            What Members Say
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 print:grid-cols-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center print:break-inside-avoid"
                >
                  <Icon size={18} className="mx-auto text-[var(--kennion-blue)]" strokeWidth={2} />
                  <p className="mt-2 text-[24px] font-extrabold text-[var(--kennion-navy)]">
                    {s.value}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 print:break-inside-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Get Started
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            <a
              href="https://healthjoy.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:shadow-md print:break-inside-avoid"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-sm">
                <Smartphone size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[var(--kennion-navy)]">
                  Download HealthJoy
                </h3>
                <p className="text-[12px] text-slate-500">healthjoy.com/download</p>
              </div>
            </a>
            <a
              href="https://my.paytient.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-all hover:border-blue-300 hover:shadow-md print:break-inside-avoid"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 text-white shadow-sm">
                <CreditCard size={20} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-[var(--kennion-navy)]">
                  Activate Paytient
                </h3>
                <p className="text-[12px] text-slate-500">my.paytient.com/signup</p>
              </div>
            </a>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 p-4 print:break-inside-avoid"
              >
                <h3 className="text-[13px] font-bold text-[var(--kennion-navy)]">
                  {f.q}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl bg-[var(--kennion-navy)] p-6 text-white print:break-inside-avoid">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
            Available 24/7
          </p>
          <h2 className="mt-2 text-[22px] font-bold leading-tight">
            HealthJoy Concierge
          </h2>
          <p className="mt-2 text-[18px] font-semibold">(877) 500-3212</p>
          <p className="mt-1 text-[12px] text-white/70">
            Real people, any hour, any day of the year.
          </p>
        </footer>
      </article>
    </div>
  );
}
