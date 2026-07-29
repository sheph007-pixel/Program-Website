export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const sections: FaqSection[] = [
  {
    title: "Part I · The Big Picture",
    items: [
      {
        question: `Why does the Kennion Program exist? Why not just buy a standard plan from Blue Cross, UnitedHealthcare, Cigna, or Aetna?`,
        answer: `The traditional carrier-network model has not been sustainable for small and mid-sized employers at the cost trajectory premiums have been on. The Kaiser Family Foundation now tracks the average family premium above $25,000, with annual increases consistently running in the high single digits. Larger employers have already responded: about two-thirds of American workers are now in self-funded plans, where the employer funds claims directly and buys insurance only against the worst years. What used to require a benefits department of its own has become the mainstream approach. The Kennion Program brings that same self-funded structure to small and mid-sized employers who were previously locked out of it.`,
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
        answer: `Honestly, there is some learning curve. A reference-based-pricing plan asks employees and providers to do a few things differently than a traditional Blue Cross, UnitedHealthcare, Cigna, or Aetna plan. A small minority of providers will need a phone call before the appointment to understand how the plan pays, and our concierge team handles that on the member's behalf. The tradeoff is cost and sustainability. Traditional carrier plans are familiar, but the premium trajectory for small and mid-sized employers has become untenable. The Kennion Program asks for a small adjustment in exchange for permanent cost relief.`,
      },
      {
        question: `If reference-based pricing is so good, why isn't everyone doing it?`,
        answer: `Reference-based pricing is now a major and growing segment of the small and mid-sized employer market, used by multiple national programs alongside ours. The traditional carrier-network model is what most small employers have been on for decades, and switching is a deliberate choice that takes time. Familiarity is a powerful reason to stay put, even when the underlying economics are deteriorating. But the trend is one-way. As carrier premium increases compound year after year, more employers are moving to programs structured like this one.`,
      },
      {
        question: `Do we have a choice? Could we stay with our current carrier plan?`,
        answer: `Of course. Every employer has a choice between sticking with the traditional carrier-network model and moving to a self-funded, reference-based-pricing structure like the Kennion Program. We are not trying to be Blue Cross. We are the alternative for employers who have decided that traditional carrier plans no longer fit their economics. If a traditional plan still works for your group financially, that may be the right call. If it does not, this is the alternative built for that situation.`,
      },
    ],
  },
  {
    title: "Part II · Why Networks Stopped Working",
    items: [
      {
        question: `Networks have been the standard for decades. Why doesn't the model work anymore?`,
        answer: `Networks were introduced in the 1970s and sold as the answer to rising healthcare costs. The promise was simple: carriers would negotiate discounts with providers, employers and members would stay inside the network, and everyone would save. For a while it worked. The math fell apart as healthcare consolidation accelerated. Hospital systems merged, gained pricing power, and started negotiating up rather than down. Carriers passed those increases through, and the "network discount" became a discount off a sticker price nobody actually pays. Today, networks have not just failed to contain costs. They have become the single largest driver of the cost growth they were supposed to solve. Reference-based pricing flips the equation: the plan pays every provider a fair, transparent rate built on a public Medicare benchmark, so the carrier's network is no longer the gatekeeper and the carrier's pricing leverage no longer determines what the employer pays.`,
      },
      {
        question: `What about employee brand recognition? Most employees want a plan name they have heard of.`,
        answer: `This is the most common concern, and it is a fair one. Employees are used to seeing Blue Cross or UnitedHealthcare on the ID card because that is what they have always seen. The brand does not actually do anything for them at the point of care. A provider does not give better care because the card has a recognized logo, and a claim is not paid any differently. What the brand provides is the feeling of certainty, and the Kennion Program replaces that feeling with real infrastructure. A concierge team handles every provider question. A Paytient card every employee carries turns any office visit into a 100% reimbursed event. Direct facility pre-pay handles the rare case where a hospital wants money up front. None of those tools exist on a traditional carrier plan. The honest tradeoff is a familiar logo for a stronger support system, and employers who make the switch consistently report that the support system is what their employees actually wanted in the first place.`,
      },
      {
        question: `What changed that makes this model work for small and mid-sized employers now?`,
        answer: `For decades, reference-based pricing was a Fortune 500 idea. The structure made sense but small and mid-sized employers did not have the staff or infrastructure to run it. What changed is that the supporting tools have caught up. Modern third-party administrators like EBPA and HealthEZ handle claims at scale. A concierge layer like HealthJoy fields every member question and absorbs provider-side friction. Paytient turns out-of-pocket exposure into a zero-interest, fully reimbursed event. Apta Cash solves the facility pre-pay problem. MedOne handles prescriptions on a pass-through basis. The Kennion Program ties them together so a small or mid-sized employer can run the same kind of structure that the Fortune 500 has been running for years.`,
      },
      {
        question: `Are larger employers and major carriers moving in this direction too?`,
        answer: `Yes, and the movement has been accelerating for years. About two-thirds of American workers are now in self-funded plans (Kaiser Family Foundation Employer Health Benefits Survey), and self-funded designs are the default approach for any employer large enough to support one. The largest national carriers have all built or acquired third-party administration arms because the traditional fully insured network plan has stopped growing as a product category outside the very largest groups. Independent TPAs run reference-based and self-funded plans covering hundreds of thousands of members nationwide. Large name-brand employers moved their own workforces onto the same structural model years ago. The Kennion Program brings that architecture to small and mid-sized employers, packaged with the concierge and member-support layer that makes it work without requiring an internal benefits department.`,
      },
    ],
  },
  {
    title: "Part III · How the Program Is Structured",
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
        answer: `Yes. The program operates two captives, domiciled in Alabama and Vermont, which are two of the most established captive insurance domiciles in the United States. Both are managed by Strategic Risk Solutions (the largest independent captive manager in the world), audited annually by an independent firm, and in good standing with their state insurance departments. Kennion is a recipient of the Strategic Risk Solutions Captivator Award.`,
      },
    ],
  },
  {
    title: "Part IV · Provider Access",
    items: [
      {
        question: `Does the plan use a Blue Cross, UnitedHealthcare, Cigna, or Aetna network?`,
        answer: `No. The plan does not operate inside a carrier-branded provider network in any state. It uses reference-based pricing, which means it pays any provider a fair, consistent rate built on a public Medicare benchmark, the same way regardless of who the provider is.`,
      },
      {
        question: `Who actually administers the plan? Is that a network?`,
        answer: `The Kennion Program is administered by one of two third-party administrators, depending on the group: EBPA (part of Cobalt Benefits Group, headquartered in Vermont) at cobaltbenefitsgroup.com, or HealthEZ at healthez.com. Both are established TPAs that process self-funded plans for hundreds of thousands of members combined. Neither is a provider network. Their role is claims administration, eligibility verification, and ID-card services. Prescriptions for every group run through MedOne (medone-rx.com) on a pass-through basis. Same program model and member experience regardless of which TPA your group is on.`,
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
        answer: `ID cards carry the plan administrator's branding (EBPA or HealthEZ, depending on the group) and the relevant payer information rather than "Kennion." Eligibility verification and claims submission run through that administrator in the same way a provider would handle any other self-funded plan.`,
      },
    ],
  },
  {
    title: "Part V · Day-to-Day Member Experience",
    items: [
      {
        question: `What does it actually look like when an employee goes to see a doctor?`,
        answer: `The day-to-day experience is straightforward. The employee calls any licensed provider they want, books the appointment, and presents their plan ID card the same way they would on any other plan. The plan administrator (EBPA or HealthEZ, depending on the group) handles the claim, and the employee pays only the deductible, copay, and coinsurance the plan calls for. The vast majority of provider offices handle the plan this way without any extra step.\n\nIf an office has not seen the plan before and wants to ask questions first, our concierge team calls the billing office on the member's behalf before the appointment and walks them through how the plan pays. That resolves most questions in minutes.\n\nFor the rare case where a provider would rather be paid up front, every member carries a Paytient card that covers the visit at the time of service at zero interest. The member submits the receipt and the plan reimburses 100%, which makes that office visit free. For larger procedures where a hospital or facility asks for payment in advance, the plan pre-pays through Apta Cash so the member is never the one blocked at the door.`,
      },
      {
        question: `How does the concierge work?`,
        answer: `Every member has a concierge available through the HealthJoy app or a phone call for any plan question. A real person helps find a provider, schedule the appointment, work through a confusing bill, or call a provider's billing office on the member's behalf. If a provider has not seen the plan before, our team proactively reaches out to the billing office to explain how the plan pays before the appointment.`,
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
        question: `What is Apta Cash?`,
        answer: `For elective procedures where a hospital or provider asks for payment up front before scheduling, the plan can pre-pay the procedure through the program's Apta Cash arrangement, so a difficult billing office never blocks care from happening.`,
      },
      {
        question: `What if a provider sends a balance bill?`,
        answer: `Balance billing is rare with reference-based pricing. Industry data and our experience since 2013 put it at well under one percent of claims. When it does happen, the employee has full backing: they forward the bill to Kennion or HealthJoy and our team takes it from there, engaging the provider directly and resolving the dispute on the employee's behalf. The employee should not pay a disputed balance without guidance from us. Since 2013, 100 percent of balance-billing issues that have arisen have been resolved by our team.`,
      },
    ],
  },
  {
    title: "Part VI · Prescriptions",
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
    title: "Part VII · Renewals and Rate Stability",
    items: [
      {
        question: `What do renewals typically look like?`,
        answer: `Renewals on the health plan have consistently come in well below the broader fully insured market trend, which Kaiser and PwC have placed in the high single digits annually. Recent renewal cycles have come in flat or below quoted carrier trend, and across the program's track record since 2013 renewals have averaged meaningfully below the small-group market. The captive structure is what smooths out the spikes that would otherwise hit a traditional renewal in a heavy claims year.`,
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
    title: "Part VIII · The Company Behind It",
    items: [
      {
        question: `How long has Kennion been operating?`,
        answer: `Kennion Benefit Advisors traces back to 1969, when the firm's founder, Hal Shepherd, began practicing in employee benefits. Several related benefits and insurance firms operated under his leadership over the following decades before being brought together into what is today Kennion Benefit Advisors. The captive program itself dates to 2013 and has run under the same architecture ever since. Across that history the program has served hundreds of employer groups and thousands of covered employees.`,
      },
      {
        question: `Who are the program's partners?`,
        answer: `Every layer is run by a firm with national scale. Captives are managed by Strategic Risk Solutions, the largest independent captive manager in the world, engaged with Kennion since the program's inception in 2013. Day-to-day plan administration runs through one of two third-party administrators depending on the group: EBPA (part of Cobalt Benefits Group, a Vermont-headquartered TPA serving more than 200,000 members nationally, at cobaltbenefitsgroup.com) or HealthEZ (a national TPA at healthez.com). Prescriptions for every group run through MedOne (medone-rx.com) on a pass-through basis. Life and supplemental coverage is fully insured through Guardian, a company that has been in business for more than 150 years. Vision runs through VSP, the largest vision carrier in the country.`,
      },
      {
        question: `Is Kennion licensed?`,
        answer: `Both Kennion Benefit Advisors and Hunter Shepherd, President (National Producer Number 16406853), are licensed insurance professionals where appropriate and in good standing. The captives that underpin the Kennion Program are domiciled in Alabama and Vermont and regulated by those states. The plans and programs themselves meet all applicable state and federal requirements, and the program has been in continuous operation since 2013.`,
      },
    ],
  },
  {
    title: "Part IX · The Agreement",
    items: [
      {
        question: `What is the contract term?`,
        answer: `One year, running January 1 through December 31, with the option to renew. Everything that governs the plan is in writing. The participation agreement, the stop-loss policy, and its certificate lay out how the plan is funded, how claims are paid, what is covered, and how a group renews or leaves.`,
      },
      {
        question: `What are our options if we need to exit mid-year? Is there an early-termination penalty?`,
        answer: `Either party may terminate the stop-loss policy with thirty days' written notice. There is no separate early-termination penalty above that. Premium and association dues that have already accrued through the termination date remain payable. Claims incurred while you were covered continue to be paid under the policy that was in force at the time, during its four-year run-out period. The agreement is not auto-renewing; a new application is signed each year for the following year.`,
      },
    ],
  },
  {
    title: "Part X · Implementation",
    items: [
      {
        question: `How are the plan options presented in our proposal?`,
        answer: `Your proposal shows real, underwritten rates by tier (EE Only, EE + Child, EE + Spouse, EE + Family) for every available plan, calculated against the actual census you provided. A Compare Plan Details view opens a side-by-side grid with the full benefit breakdown: deductibles, out-of-pocket maximums, copays, coinsurance, HSA compatibility, and the cost split between employer and employee. Medical, dental, vision, and supplemental are tabbed separately so you can review each coverage line independently. Most groups review two or three plan combinations side by side before selecting the structure that fits their employee mix and cost goals.`,
      },
      {
        question: `Can we implement mid-year, or do we need to wait for our current plan to expire?`,
        answer: `Mid-year implementation is straightforward. The standard timeline from an accepted proposal to an effective date is two to four weeks. Most groups choose a January 1 start to align with the calendar-year renewal cycle, but off-cycle starts are routine and can be timed to match any current carrier expiration date with no gap in coverage. A group whose current plan expires mid-year (including a July 1 expiration) can transition directly into the Kennion Program on that date.`,
      },
      {
        question: `How do we communicate the plan to employees during enrollment so they feel comfortable?`,
        answer: `The first questions employees ask come at enrollment, not at the doctor's office: "who is this plan administrator, how does this work, what about my current doctor?" Kennion's onboarding approach is built to answer those questions directly before the plan ever goes live.\n\nPre-enrollment meetings introduce the plan structure, the ID card, the concierge, and the Paytient card in plain language. Member materials show the card, name the support number, and walk through what happens when an employee sees a doctor. The concierge team is available to employees before the effective date, so anyone who wants to ask about a specific provider gets a real-person answer in advance. Every employee carries a simple message into any office: this is major medical coverage, the card shows the administrator and the support number, and the administrator handles provider questions the same way any other self-funded plan does.\n\nOnce employees use the plan once or twice and see that visits get covered, providers file claims, and the support team picks up the phone, the day-to-day experience speaks for itself. Existing Kennion groups consistently describe that arc.`,
      },
    ],
  },
];
