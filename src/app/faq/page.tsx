"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Mail,
} from "lucide-react";
import PhoneContact from "@/components/PhoneContact";

type FaqItem = {
  question: string;
  answer: string;
};

type Section = {
  title: string;
  items: FaqItem[];
};

const sections: Section[] = [
  {
    title: "Part I · The Big Picture",
    items: [
      {
        question: `Why does the Kennion Program exist? Why not just buy a standard plan from Blue Cross, Aetna, Cigna, or UnitedHealthcare?`,
        answer: `The traditional carrier-network model has not been sustainable for small and mid-sized employers at the cost trajectory premiums have been on. The Kaiser Family Foundation put the average family premium above $25,000 in 2024, with roughly seven to eight percent annual increases. Larger employers have already responded: about two-thirds of American workers are now in self-funded plans, where the employer funds claims directly and buys insurance only against the worst years. What used to require a benefits department of its own has become the mainstream approach. The Kennion Program brings that same self-funded structure to small and mid-sized employers who were previously locked out of it.`,
      },
      {
        question: `Why have I never heard of the Kennion Program before?`,
        answer: `Because it is a private program. It is not sold through other brokers, not quoted on the open market, and not available through any insurance professional outside of Kennion. Employer access runs only through us, by design. The program operates inside a closed captive arrangement we have managed since 2013, and we are deliberate about which employers we bring into it. That is part of what keeps the underwriting disciplined and the long-term performance steady.`,
      },
      {
        question: `My broker or consultant has never heard of this. Should I be concerned?`,
        answer: `No. A local broker or consultant has access to the same traditional carrier products everyone else sees, and most can also show you other reference-based pricing programs available in the open market. They do not have access to this one specifically because it is not distributed that way. Different programs come through different channels. The legitimate questions for an employer are whether the program performs and whether the structure behind it is sound. Both are addressed below.`,
      },
      {
        question: `Is reference-based pricing legitimate, or is it some kind of workaround?`,
        answer: `It is legitimate and mainstream. Reference-based pricing has become a major and growing segment of the small and mid-sized employer market, with multiple national programs operating on the same approach. Rather than relying on a carrier's negotiated network discounts, which vary widely and require staying inside the network, reference-based pricing pays every provider a fair rate built on a public Medicare benchmark. The rate applies the same way to any provider, anywhere in the country.`,
      },
      {
        question: `Is this real insurance, or are we taking on the risk ourselves?`,
        answer: `It is real insurance, structured as a self-funded plan with stop-loss coverage behind it. The employer funds expected claims at a level that includes a built-in margin. Above that level, the captive insurance company that backs the program carries the claims. Behind the captive sits a layered reinsurance program with an A-rated reinsurer at the top. The employer's exposure for the year is the monthly funded contribution. Once the plan year closes, the employer has no further liability for claims from that year.`,
      },
      {
        question: `Isn't this more work than a familiar Blue Cross plan?`,
        answer: `Honestly, there is some learning curve. A reference-based-pricing plan asks employees and providers to do a few things differently than a traditional Blue Cross, Aetna, Cigna, or UnitedHealthcare plan. A small minority of providers will need a phone call before the appointment to understand how the plan pays, and our concierge team handles that on the member's behalf. The tradeoff is cost and sustainability. Traditional carrier plans are familiar, but the premium trajectory for small and mid-sized employers has become untenable. The Kennion Program asks for a small adjustment in exchange for permanent cost relief.`,
      },
      {
        question: `If reference-based pricing is so good, why isn't everyone doing it?`,
        answer: `Reference-based pricing is now a major and growing segment of the small and mid-sized employer market, used by multiple national programs alongside ours. The traditional carrier-network model is what most small employers have been on for forty years, and switching is a deliberate choice that takes time. Familiarity is a powerful reason to stay put, even when the underlying economics are deteriorating. But the trend is one-way. As carrier premium increases compound year after year, more employers are moving to programs structured like this one.`,
      },
      {
        question: `Do we have a choice? Could we stay with our current carrier plan?`,
        answer: `Of course. Every employer has a choice between sticking with the traditional carrier-network model and moving to a self-funded, reference-based-pricing structure like the Kennion Program. We are not trying to be Blue Cross. We are the alternative for employers who have decided that traditional carrier plans no longer fit their economics. If a traditional plan still works for your group financially, that may be the right call. If it does not, this is the alternative built for that situation.`,
      },
    ],
  },
  {
    title: "Part II · How the Program Is Structured",
    items: [
      {
        question: `How is the plan structured underneath?`,
        answer: `It is a level-funded health plan backed by a captive insurance company. The employer pays one fixed amount each month. Inside that single payment sit three things: the money set aside to pay expected claims, the cost of running the plan, and the stop-loss coverage that protects the year if claims run high. Above the funded layer, the captive carries the year's claims, with a layered reinsurance program behind the captive.`,
      },
      {
        question: `Who is the stop-loss carrier, and what is the A.M. Best rating?`,
        answer: `Stop-loss is issued through a captive insurance company that is part of the Kennion Program. The captive itself is not currently A.M. Best rated. That is common for private captive arrangements like this. Behind the captive sits a layered reinsurance program, with the ultimate reinsurer in the program A-rated.`,
      },
      {
        question: `What are the per-individual and aggregate attachment points?`,
        answer: `The level-funded structure handles this differently than a traditional self-funded plan. Each group is funded for the expected claims of the year plus a margin built in above that, paid in equal monthly amounts. Above that funded level, the captive absorbs the claims for the rest of the year. There is no separate per-individual deductible or aggregate cap an employer could breach mid-year. The monthly funded contribution is the employer's full exposure. Once the plan year closes, the employer has no further liability for claims or expenses from that year.`,
      },
      {
        question: `Is stop-loss included in the monthly premium, or billed separately?`,
        answer: `Included. The single monthly amount covers expected claims, plan administration, and the stop-loss premium. No separate stop-loss invoice, and no year-end true-up.`,
      },
      {
        question: `What is the claims run-out period at year end?`,
        answer: `Four years. The policy carries a Terminal Funding provision that provides four years of run-out coverage for claims incurred during the policy year, so any late-arriving claim is still paid under that year's coverage even if it shows up long after renewal.`,
      },
      {
        question: `Are the captives real insurance companies? Where are they domiciled and regulated?`,
        answer: `Yes. The program operates two captives, domiciled in Alabama and Vermont, which are two of the most established captive insurance domiciles in the United States. Both are managed by Strategic Risk Solutions (the largest independent captive manager in the world), audited annually by an independent firm, and in good standing with their state insurance departments. Kennion received the Strategic Risk Solutions Captivator Award at the firm's 2025 client symposium.`,
      },
    ],
  },
  {
    title: "Part III · Provider Access",
    items: [
      {
        question: `Does the plan use a Blue Cross, Aetna, Cigna, or UnitedHealthcare network?`,
        answer: `No. The plan does not operate inside a carrier-branded provider network in any state. It uses reference-based pricing, which means it pays any provider a fair, consistent rate built on a public Medicare benchmark, the same way regardless of who the provider is.`,
      },
      {
        question: `What about "Cobalt"? Isn't that a provider network?`,
        answer: `Cobalt Benefits Group, LLC is a Vermont-headquartered third-party administrator that processes claims for self-funded plans. It is not a provider network. The Kennion Program's plan administrator, EBPA, is part of Cobalt Benefits Group, which is how that name appears in our materials. It is a claims-administration role, not a network.`,
      },
      {
        question: `Can employees see any provider they want?`,
        answer: `Yes. Any licensed physician, specialist, hospital, or facility in any state can be used. There is no network excluding any provider, and no in-network or out-of-network distinction inside the plan. The plan pays each provider the same reasonable Medicare-based rate, and the employee pays only the deductible, copay, and coinsurance set by the plan they chose.`,
      },
      {
        question: `Can you provide a provider-level spreadsheet showing who is and isn't in-network?`,
        answer: `No, because there is no in-network or out-of-network distinction inside the plan. There is nothing to fence off and therefore no in/out list to produce. Any licensed provider, anywhere, can be used.`,
      },
      {
        question: `What will ID cards and claims look like to a provider?`,
        answer: `ID cards carry the plan administrator's branding (EBPA) and the relevant payer information rather than "Kennion." Eligibility verification and claims submission run through that administrator in the same way a provider would handle any other self-funded plan.`,
      },
    ],
  },
  {
    title: "Part IV · Day-to-Day Member Experience",
    items: [
      {
        question: `How does the concierge work?`,
        answer: `Every member has a concierge available through the HealthJoy app or a phone call. A real person helps find a provider, schedule the appointment, or work through a confusing bill. If a provider has not seen the plan before, our team will reach out to the provider's billing office to explain how the plan pays before the appointment.`,
      },
      {
        question: `Who handles payment when an employee sees a provider?`,
        answer: `The plan pays providers directly. The employee is only responsible for their normal share of the cost: the deductible, copay, and coinsurance specified by the plan they chose. The employee does not negotiate with the provider.`,
      },
      {
        question: `What is the Paytient card?`,
        answer: `Paytient is a member benefit. Every employee carries a Paytient card to cover out-of-pocket medical, dental, vision, prescription, or even veterinary costs up front, and to repay Paytient over time at no interest. For routine office visits, an employee who pays with the Paytient card (or any other card) can submit the receipt to the plan for 100% reimbursement, which effectively makes a doctor visit free to the employee.`,
      },
      {
        question: `What is MedeCash Apta Pay?`,
        answer: `For elective procedures where a hospital or provider asks for payment up front before scheduling, the plan can pre-pay the procedure through the program's MedeCash Apta Pay arrangement, so a difficult billing office never blocks care from happening.`,
      },
      {
        question: `What if a provider sends a balance bill?`,
        answer: `Balance billing can happen with reference-based pricing, but it is small. Industry data, and our own experience over more than a decade, puts it at well under one percent of claims. The employee should not pay a disputed balance without guidance from us. The employee sends the bill to Kennion or HealthJoy, and our team works directly with the provider to resolve it. Since the program's inception in 2013, 100 percent of balance-billing issues that have arisen have been resolved by our team.`,
      },
    ],
  },
  {
    title: "Part V · Prescriptions",
    items: [
      {
        question: `How is prescription coverage handled?`,
        answer: `MedOne handles prescriptions on a pass-through basis. MedOne bills the plan exactly what it pays the pharmacy and passes every manufacturer rebate and discount back to the plan, earning only a flat, disclosed administrative fee. There is no spread.`,
      },
      {
        question: `Where can employees look up a specific medication?`,
        answer: `Employees can look up any specific drug at medone-rx.com/members/drug-lookup/0114. The tool shows what tier the drug falls into and what it will cost before filling. The HealthJoy app also flags lower-cost alternatives at the pharmacy.`,
      },
      {
        question: `What is the cost difference between formulary and non-formulary drugs?`,
        answer: `Drugs on the MedOne formulary are covered by the plan at one of three tiers, with typical employee cost roughly: generic, $0 to $15; preferred brand, $30 to $75; non-preferred brand, $60 to $100. Drugs not on the formulary are not covered by the plan. An employee in that situation would either work with their prescriber to find a covered alternative (the HealthJoy app helps identify these) or fill the prescription themselves at retail or through a discount program like GoodRx. This is consistent with how most major employer health plans handle formulary versus non-formulary drugs.`,
      },
    ],
  },
  {
    title: "Part VI · Renewals and Rate Stability",
    items: [
      {
        question: `What do renewals typically look like?`,
        answer: `Renewals on the health plan have come in well below the broader fully insured market trend, which Kaiser and PwC have put at roughly seven to eight percent annually. The most recent renewal cycle (January 1, 2026) came in flat, with no rate increase on the health plan. The two renewals before that (January 1, 2025 and January 1, 2024) both came in below quoted trend. The captive structure is what smooths out the spikes that would otherwise hit a traditional renewal in a heavy claims year.`,
      },
      {
        question: `What happens if our group has a bad claims year?`,
        answer: `That is what the captive and the layered reinsurance program behind it are for. Above the group's funded layer, the captive absorbs the year's claims. The captive itself has reinsurance behind it, with an A-rated reinsurer at the top of the program. A bad year does not translate into a step-change at renewal the way it would on a traditional carrier plan.`,
      },
      {
        question: `What if our group has a strong claims year? Does the savings come back to us?`,
        answer: `Yes. When a group's claims come in lower than expected, that good experience is not lost to a carrier. It builds a credit that goes toward holding down the group's future rate increases, so a group that runs its plan well sees the benefit of doing so. Under a traditional fully insured plan, money left unspent at year-end simply belongs to the carrier.`,
      },
      {
        question: `How much flexibility do we have at renewal?`,
        answer: `Full flexibility. The program operates on a calendar year, and at each January 1 renewal an employer can change which plans are offered, how much it contributes, and how employees choose. It is not a take-it-or-leave-it package.`,
      },
    ],
  },
  {
    title: "Part VII · The Company Behind It",
    items: [
      {
        question: `How long has Kennion been operating?`,
        answer: `Kennion Benefit Advisors traces back more than fifty years. The firm's founder, Hal Shepherd, began practicing in employee benefits in 1969, and several related benefits and insurance firms operated under his leadership over the following decades before being brought together into what is today Kennion Benefit Advisors. The captive program itself dates to 2013, giving it more than a decade of continuous operating history under the same architecture. Across that period the program has served hundreds of employer groups and thousands of covered employees.`,
      },
      {
        question: `Who are the program's partners?`,
        answer: `Every layer is run by a firm with national scale. Captives are managed by Strategic Risk Solutions, the largest independent captive manager in the world, engaged with Kennion since the program's inception in 2013. Day-to-day plan administration runs through EBPA, which is part of Cobalt Benefits Group, a Vermont-headquartered third-party administrator that serves more than 200,000 members nationally and has been part of the Kennion Program since 2013 as well. Prescriptions run through MedOne. Life and supplemental coverage is fully insured through Guardian, a company that has been in business for more than 150 years. Vision runs through VSP, the largest vision carrier in the country.`,
      },
      {
        question: `Is Kennion licensed?`,
        answer: `Both Kennion Benefit Advisors and Hunter Shepherd, President (National Producer Number 16406853), are licensed insurance professionals where appropriate and in good standing. The captives that underpin the Kennion Program are domiciled in Alabama and Vermont and regulated by those states. The plans and programs themselves meet all applicable state and federal requirements, and the program has been in continuous operation since 2013.`,
      },
      {
        question: `What state guaranty protections apply to our employees under this structure?`,
        answer: `A self-funded plan backed by stop-loss insurance and a captive is not covered by a state insurance guaranty fund; that protection applies to fully insured carrier products. The protection on this plan comes from a different place: the captive's own surplus, annual independent audits, ongoing oversight by the state insurance departments where the captives are chartered (Alabama and Vermont), professional management by Strategic Risk Solutions, and a layered reinsurance program behind the captive with the ultimate reinsurer A-rated. This is the same protection structure used by most large American employers that fund their own health risk.`,
      },
    ],
  },
  {
    title: "Part VIII · The Agreement",
    items: [
      {
        question: `What is the contract term?`,
        answer: `One year, running January 1 through December 31, with the option to renew. Everything that governs the plan is in writing. The participation agreement, the stop-loss policy, and its certificate lay out how the plan is funded, how claims are paid, what is covered, and how a group renews or leaves.`,
      },
      {
        question: `What are our options if we need to exit mid-year? Is there an early-termination penalty?`,
        answer: `Either party may terminate the stop-loss policy with thirty days' written notice. There is no separate early-termination penalty above that. Premium and association dues that have already accrued through the termination date remain payable. Claims incurred while you were covered continue to be paid under the policy that was in force at the time, during its four-year run-out period. The agreement is not auto-renewing; a new application is signed each year for the following year.`,
      },
      {
        question: `Can our attorney review the agreement before we sign?`,
        answer: `Yes. An employer's attorney is welcome to read every word of the participation agreement, the stop-loss policy, and the certificate before anything is signed. Most attorneys do.`,
      },
    ],
  },
  {
    title: "Part IX · Getting Started",
    items: [
      {
        question: `How does an employer evaluate the program?`,
        answer: `An employer uploads its employee census at kennionprogram.com to receive an instant proposal showing real rates and full plan details across every plan tier. Underwriting is required, and the proposal returns within minutes rather than weeks.`,
      },
      {
        question: `What does the timeline from interest to effective date look like?`,
        answer: `A typical timeline is two to four weeks from instant proposal to a January 1 effective date, assuming the standard renewal cycle. Off-cycle starts are possible for groups joining mid-year and are handled case by case.`,
      },
      {
        question: `Who should I contact with follow-up questions?`,
        answer: `Hunter Shepherd, President of Kennion Benefit Advisors, can be reached directly at 205-641-0469 or hunter@kennion.com. The program lives at kennionprogram.com.`,
      },
    ],
  },
];

const AUTOLINK_REGEX =
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|((?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s)]*)?)/g;

const linkClass =
  "text-[var(--kennion-blue)] underline underline-offset-2 decoration-slate-300 transition-colors hover:decoration-[var(--kennion-blue)]";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  AUTOLINK_REGEX.lastIndex = 0;
  while ((match = AUTOLINK_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const email = match[1];
    const url = match[2];
    if (email) {
      nodes.push(
        <a key={`${keyPrefix}-${key++}`} href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      );
    } else if (url) {
      const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      nodes.push(
        <a
          key={`${keyPrefix}-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {url}
        </a>
      );
    }
    lastIndex = AUTOLINK_REGEX.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

const totalQuestionCount = sections.reduce((sum, s) => sum + s.items.length, 0);

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [manuallyOpen, setManuallyOpen] = useState<Set<string>>(
    () => new Set(["0-0"])
  );

  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const filteredSections = useMemo(() => {
    if (!isSearching) {
      return sections.map((section, sIdx) => ({
        sectionIndex: sIdx,
        title: section.title,
        items: section.items.map((item, iIdx) => ({
          itemIndex: iIdx,
          ...item,
        })),
      }));
    }
    return sections
      .map((section, sIdx) => ({
        sectionIndex: sIdx,
        title: section.title,
        items: section.items
          .map((item, iIdx) => ({ itemIndex: iIdx, ...item }))
          .filter((item) => {
            const haystack = `${item.question} ${item.answer}`.toLowerCase();
            return haystack.includes(trimmedQuery);
          }),
      }))
      .filter((section) => section.items.length > 0);
  }, [trimmedQuery, isSearching]);

  const matchedCount = filteredSections.reduce(
    (sum, s) => sum + s.items.length,
    0
  );

  const isOpen = (id: string) => {
    if (isSearching) return true;
    return manuallyOpen.has(id);
  };

  const toggle = (id: string) => {
    if (isSearching) return;
    setManuallyOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/25">
          <HelpCircle size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Employer FAQ</h1>
        <p className="page-subtitle">
          A reference for employers, advisors, and attorneys evaluating the
          Kennion Program. The questions below are the ones we hear most often.
        </p>
      </div>

      {/* Table of contents */}
      {!isSearching && (
        <nav
          aria-label="Sections"
          className="card mb-5 p-3 animate-fade-in-up stagger-1"
        >
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {sections.map((section, sIdx) => {
              const id = `part-${sIdx + 1}`;
              const [partLabel, ...titleRest] = section.title.split(" · ");
              const titleText = titleRest.join(" · ");
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      if (typeof window !== "undefined") {
                        window.history.replaceState(null, "", `#${id}`);
                      }
                    }
                  }}
                  className="group flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors hover:bg-slate-50"
                >
                  <span className="flex h-6 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:bg-blue-50 group-hover:text-[var(--kennion-blue)]">
                    {partLabel}
                  </span>
                  <span className="truncate text-[13px] font-medium text-slate-600 group-hover:text-[var(--kennion-navy)]">
                    {titleText}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>
      )}

      {/* Search */}
      <div className="mb-6 animate-fade-in-up stagger-1">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            placeholder="Search FAQs…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-[14px] text-[var(--kennion-navy)] shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:shadow-md focus:ring-2 focus:ring-blue-100"
            aria-label="Search FAQs"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={14} strokeWidth={2.2} />
            </button>
          )}
        </div>
        {isSearching && (
          <p className="mt-2 px-1 text-[12px] text-slate-500">
            {matchedCount === 0
              ? `No matches`
              : `Showing ${matchedCount} of ${totalQuestionCount} questions`}
          </p>
        )}
      </div>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 px-5 py-8 text-center">
          <p className="text-[14px] font-semibold text-[var(--kennion-navy)]">
            No FAQs match &ldquo;{query}&rdquo;.
          </p>
          <p className="text-[13px] text-slate-500">
            Try a broader term, or reach out and we&rsquo;ll answer directly.
          </p>
          <a
            href="mailto:hunter@kennion.com"
            className="mt-1 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-[var(--kennion-blue)] shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50"
          >
            <Mail size={14} strokeWidth={2} />
            hunter@kennion.com
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          {filteredSections.map((section) => (
            <section
              key={section.sectionIndex}
              id={`part-${section.sectionIndex + 1}`}
              className="scroll-mt-20"
            >
              <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2.5">
                {section.items.map((item) => {
                  const id = `${section.sectionIndex}-${item.itemIndex}`;
                  const open = isOpen(id);
                  return (
                    <div key={id} className="card overflow-hidden p-0">
                      <button
                        onClick={() => toggle(id)}
                        disabled={isSearching}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors enabled:hover:bg-slate-50 disabled:cursor-default"
                        aria-expanded={open}
                      >
                        <span className="text-[14px] font-semibold leading-snug text-[var(--kennion-navy)]">
                          {item.question}
                        </span>
                        {!isSearching && (
                          <ChevronDown
                            size={18}
                            strokeWidth={2}
                            className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                              open ? "rotate-180 text-blue-500" : ""
                            }`}
                          />
                        )}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-slate-100 px-4 py-4">
                            <p className="whitespace-pre-line text-[13px] leading-relaxed text-slate-600">
                              {renderInline(item.answer, id)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Contact footer */}
      <div className="divider" />
      <div className="animate-fade-in-up stagger-2">
        <PhoneContact
          number="(205) 641-0469"
          label="Hunter Shepherd, President"
          sublabel="Kennion Benefit Advisors · hunter@kennion.com"
          gradient="from-blue-600 to-indigo-500"
          shadow="shadow-indigo-500/20"
        />
      </div>
    </div>
  );
}
