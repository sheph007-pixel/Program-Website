/**
 * BenSync's partners for each benefit (BenSync is the benefits program and
 * platform powered by Kennion Benefit Advisors). The program runs
 * all year for every group: each employer picks one partner per benefit, so a
 * page lists every partner a group might have rather than one group's plans.
 * Websites and provider searches match the ones app.kennion.com (BenSync) uses.
 */

export const SCHEDULE_URL = "https://calendly.com/kennion-2027";
export const ENROLLMENT_PORTAL_URL = "https://goenroll.employeenavigator.com/";

export type PartnerLink = { label: string; href: string };

export type Partner = {
  name: string;
  /** Letter shown in the brand-coloured mark. */
  mark: string;
  color: string;
  facts: [string, string][];
  links: PartnerLink[];
};

export type Program = {
  slug: "medical" | "dental" | "vision" | "supplemental";
  /** The plan category these plans are stored under in the admin. */
  category: string;
  title: string;
  tagline: string;
  /** Shown under the title: one partner per group, or the program's partner. */
  partnerNote: string;
  partners: Partner[];
};

const GUARDIAN_SITE = "https://www.guardianlife.com/";

export const PROGRAMS: Program[] = [
  {
    slug: "medical",
    category: "Health Plans",
    title: "Medical",
    tagline: "Doctor visits and prescriptions. Options at every price point, paid pre-tax.",
    partnerNote: "Your Employer Chooses One of These Partners",
    partners: [
      {
        name: "UnitedHealthcare",
        mark: "U",
        color: "#002677",
        facts: [
          ["Network", "UnitedHealthcare Choice Plus"],
          ["Prescriptions", "OptumRx"],
          ["Plan Options", "Several Deductible Levels"],
        ],
        links: [
          { label: "Website", href: "https://www.welcometouhc.com/" },
          { label: "Find a Doctor", href: "https://findcare.guest.uhc.com/guest-plan-selection/plan-selection?planSelectionLob=EI&coverageType=M&chipValue=All" },
          { label: "Drug List", href: "https://www.optumrx.com/clientformulary/formulary.asp?var=EEUH2018&infoid=EEUH2018&page=&par=" },
        ],
      },
      {
        name: "Angle Health",
        mark: "A",
        color: "#5B3DF5",
        facts: [
          ["National Network", "Cigna PPO"],
          ["Prescriptions", "Angle Health Formulary"],
          ["Plan Options", "Several Deductible Levels"],
        ],
        links: [
          { label: "Website", href: "https://www.anglehealth.com/members" },
          { label: "Find a Doctor", href: "https://hcpdirectory.cigna.com/web/public/consumer/directory/search?consumerCode=HDC001" },
          { label: "Drug List", href: "https://formulary.anglehealth.com/" },
        ],
      },
      {
        name: "Gravie",
        mark: "G",
        color: "#F26B3A",
        facts: [
          ["National Network", "Cigna EPO, Cigna PPO"],
          ["Prescriptions", "Express Scripts"],
          ["Plan Options", "Several Deductible Levels"],
        ],
        links: [
          { label: "Website", href: "https://www.gravie.com/members/" },
          { label: "Find a Doctor", href: "https://hcpdirectory.cigna.com/web/public/consumer/directory/search?consumerCode=HDC001" },
          { label: "Drug List", href: "https://www.express-scripts.com/frontend/open-enrollment/gravie" },
        ],
      },
    ],
  },
  {
    slug: "dental",
    category: "Dental Plans",
    title: "Dental",
    tagline: "Cleanings, fillings and more, with plan options that include orthodontia.",
    partnerNote: "Program Partner",
    partners: [
      {
        name: "Guardian",
        mark: "G",
        color: "#0E7C86",
        facts: [
          ["Preventive Care", "Cleanings and Exams"],
          ["Basic and Major Care", "Fillings, Crowns and More"],
          ["Orthodontia", "On Select Plans"],
        ],
        links: [
          { label: "Website", href: GUARDIAN_SITE },
          { label: "Find a Dentist", href: "https://www.guardianlife.com/find-a-provider" },
        ],
      },
    ],
  },
  {
    slug: "vision",
    category: "Vision Plans",
    title: "Vision",
    tagline: "Eye exams, glasses and contacts, with a plan for every budget.",
    partnerNote: "Program Partner",
    partners: [
      {
        name: "VSP",
        mark: "V",
        color: "#00539B",
        facts: [
          ["Network", "VSP"],
          ["Eye Exams", "Yearly Exam"],
          ["Eyewear", "Frames, Lenses or Contacts Allowance"],
        ],
        links: [
          { label: "Website", href: "https://www.vsp.com/" },
          { label: "Find an Eye Doctor", href: "https://www.vsp.com/eye-doctor" },
        ],
      },
    ],
  },
  {
    slug: "supplemental",
    category: "Supplemental",
    title: "Supplemental",
    tagline: "Protect your family and your paycheck, with cash benefits paid straight to you.",
    partnerNote: "Program Partner",
    partners: [
      {
        name: "Guardian",
        mark: "G",
        color: "#0E7C86",
        facts: [
          ["Life and AD&D", "Coverage for You and Your Family"],
          ["Disability", "Income if You Cannot Work"],
          ["Accident", "Cash for Injuries and ER Visits"],
          ["Critical Illness", "Lump Sum for a Diagnosis"],
          ["Cancer", "Cash Toward Treatment Costs"],
          ["Hospital", "Cash for Hospital Stays"],
        ],
        links: [{ label: "Website", href: GUARDIAN_SITE }],
      },
    ],
  },
];

export function programBySlug(slug: string): Program {
  return PROGRAMS.find((p) => p.slug === slug) ?? PROGRAMS[0];
}

export function programByCategory(category: string): Program {
  return PROGRAMS.find((p) => p.category === category) ?? PROGRAMS[0];
}
