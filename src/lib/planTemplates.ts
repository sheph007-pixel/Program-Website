import type { PlanContent, PlanContentRow } from "./planContent";
import { stripFootnotes } from "./planContent";

/**
 * Standardized, consumer-facing plan templates per category. Every plan in a
 * category renders the SAME fields in the SAME order/grid, so Health plans all
 * look alike, Dental all alike, Vision all alike — the way major carriers
 * present plan summaries. Each plan only stores a flat { fieldId: value } map;
 * structure comes from the template.
 */

export type TemplateField = { id: string; label: string; highlight?: boolean };
export type TemplateSection = { id: string; heading: string; fields: TemplateField[] };
export type CategoryTemplate = { sections: TemplateSection[] };

export type PlanValues = Record<string, string>;

/** Shown where a standard field has no value entered yet. */
export const MISSING_VALUE = "Refer to plan documents";

export { stripFootnotes };

export const PLAN_TEMPLATES: Record<string, CategoryTemplate> = {
  "Health Plans": {
    sections: [
      {
        id: "cost-sharing",
        heading: "Cost Sharing",
        fields: [
          { id: "deductible_individual", label: "Deductible — Individual", highlight: true },
          { id: "deductible_family", label: "Deductible — Family" },
          { id: "oop_individual", label: "Out-of-Pocket Max — Individual", highlight: true },
          { id: "oop_family", label: "Out-of-Pocket Max — Family" },
          { id: "coinsurance", label: "Coinsurance", highlight: true },
        ],
      },
      {
        id: "doctor-visits",
        heading: "Doctor Visits",
        fields: [
          { id: "primary_care", label: "Primary Care Visit", highlight: true },
          { id: "specialist", label: "Specialist Visit", highlight: true },
          { id: "telehealth", label: "Telehealth / Virtual Visit" },
          { id: "preventive", label: "Preventive Care" },
          { id: "urgent_care", label: "Urgent Care" },
          { id: "emergency_room", label: "Emergency Room", highlight: true },
        ],
      },
      {
        id: "prescriptions",
        heading: "Prescription Drugs",
        fields: [
          { id: "rx_generic", label: "Generic" },
          { id: "rx_preferred", label: "Preferred Brand" },
          { id: "rx_nonpreferred", label: "Non-Preferred Brand" },
          { id: "rx_specialty", label: "Specialty" },
        ],
      },
      {
        id: "hospital",
        heading: "Hospital & Surgery",
        fields: [
          { id: "inpatient", label: "Inpatient Hospital" },
          { id: "outpatient", label: "Outpatient Surgery" },
        ],
      },
    ],
  },

  "Dental Plans": {
    sections: [
      {
        id: "maximums",
        heading: "Maximums & Deductible",
        fields: [
          { id: "annual_max", label: "Annual Maximum (per person)", highlight: true },
          { id: "deductible_individual", label: "Deductible — Individual", highlight: true },
          { id: "deductible_family", label: "Deductible — Family" },
        ],
      },
      {
        id: "coverage",
        heading: "What's Covered",
        fields: [
          { id: "preventive", label: "Preventive & Diagnostic (cleanings, exams)", highlight: true },
          { id: "basic", label: "Basic Services (fillings, extractions)", highlight: true },
          { id: "major", label: "Major Services (crowns, dentures)", highlight: true },
          { id: "orthodontia", label: "Orthodontia" },
          { id: "ortho_max", label: "Orthodontia Lifetime Maximum" },
        ],
      },
      {
        id: "details",
        heading: "Plan Details",
        fields: [
          { id: "waiting_periods", label: "Waiting Periods" },
          { id: "network", label: "Network" },
        ],
      },
    ],
  },

  "Vision Plans": {
    sections: [
      {
        id: "exam",
        heading: "Eye Exam",
        fields: [
          { id: "exam_copay", label: "Exam Copay", highlight: true },
          { id: "exam_frequency", label: "Exam Frequency" },
        ],
      },
      {
        id: "materials",
        heading: "Frames, Lenses & Contacts",
        fields: [
          { id: "frames_allowance", label: "Frames Allowance", highlight: true },
          { id: "frames_frequency", label: "Frames Frequency" },
          { id: "lenses", label: "Lenses (single / bifocal / progressive)", highlight: true },
          { id: "lenses_frequency", label: "Lenses Frequency" },
          { id: "contacts_allowance", label: "Contact Lens Allowance", highlight: true },
          { id: "contacts_frequency", label: "Contacts Frequency" },
        ],
      },
      {
        id: "details",
        heading: "Plan Details",
        fields: [{ id: "network", label: "Network" }],
      },
    ],
  },
};

export function getTemplate(category: string): CategoryTemplate | null {
  return PLAN_TEMPLATES[category] ?? null;
}

export function templateFields(template: CategoryTemplate): TemplateField[] {
  return template.sections.flatMap((s) => s.fields);
}

function clean(value: string | undefined): string {
  const t = value ? stripFootnotes(value) : "";
  return t || MISSING_VALUE;
}

/** Build the uniform render structure (key-facts grid + sections) for a category. */
export function renderFromTemplate(category: string, values: PlanValues): PlanContent {
  const template = getTemplate(category);
  if (!template) return { keyFacts: [], sections: [] };

  const keyFacts: PlanContentRow[] = templateFields(template)
    .filter((f) => f.highlight)
    .map((f) => ({ label: f.label, value: clean(values[f.id]) }));

  const sections = template.sections.map((s) => ({
    heading: s.heading,
    rows: s.fields.map((f) => ({ label: f.label, value: clean(values[f.id]) })),
  }));

  return { keyFacts, sections };
}

// ---- Best-effort pre-fill: map existing extracted content onto template fields ----

type Matcher = { inc: string[]; exc?: string[] };

const MATCHERS: Record<string, Record<string, Matcher[]>> = {
  "Health Plans": {
    deductible_individual: [
      { inc: ["deductible", "individual"] },
      { inc: ["deductible", "single"] },
      { inc: ["deductible", "employee only"] },
      { inc: ["deductible"], exc: ["family", "out of pocket", "lifetime"] },
    ],
    deductible_family: [{ inc: ["deductible", "family"] }],
    oop_individual: [
      { inc: ["out of pocket", "individual"] },
      { inc: ["out of pocket", "single"] },
      { inc: ["out of pocket", "employee only"] },
      { inc: ["out of pocket"], exc: ["family"] },
    ],
    oop_family: [{ inc: ["out of pocket", "family"] }],
    coinsurance: [{ inc: ["coinsurance"] }],
    primary_care: [{ inc: ["primary care"] }, { inc: ["pcp"] }, { inc: ["primary provider"] }],
    specialist: [{ inc: ["specialist"] }],
    telehealth: [{ inc: ["telehealth"] }, { inc: ["telemedicine"] }, { inc: ["virtual visit"] }, { inc: ["virtual care"] }],
    preventive: [{ inc: ["preventive"] }, { inc: ["preventative"] }, { inc: ["wellness"] }],
    urgent_care: [{ inc: ["urgent care"] }],
    emergency_room: [{ inc: ["emergency room"] }, { inc: ["emergency"] }],
    rx_generic: [{ inc: ["generic"] }],
    rx_preferred: [{ inc: ["preferred brand"], exc: ["non"] }, { inc: ["preferred"], exc: ["non"] }],
    rx_nonpreferred: [{ inc: ["non preferred"] }, { inc: ["nonpreferred"] }],
    rx_specialty: [{ inc: ["specialty"] }],
    inpatient: [{ inc: ["inpatient"] }],
    outpatient: [{ inc: ["outpatient"] }],
    network: [{ inc: ["network"] }],
  },
  "Dental Plans": {
    annual_max: [
      { inc: ["annual maximum"] },
      { inc: ["calendar year maximum"] },
      { inc: ["plan maximum"] },
      { inc: ["yearly maximum"] },
      { inc: ["maximum"], exc: ["lifetime", "out of pocket", "ortho"] },
    ],
    deductible_individual: [
      { inc: ["deductible", "individual"] },
      { inc: ["deductible", "single"] },
      { inc: ["deductible"], exc: ["family", "lifetime"] },
    ],
    deductible_family: [{ inc: ["deductible", "family"] }],
    preventive: [
      { inc: ["preventive"] },
      { inc: ["preventative"] },
      { inc: ["diagnostic"] },
      { inc: ["cleaning"] },
      { inc: ["type 1"] },
      { inc: ["class i"], exc: ["class ii", "class iii"] },
    ],
    basic: [{ inc: ["basic"] }, { inc: ["filling"] }, { inc: ["type 2"] }, { inc: ["class ii"], exc: ["class iii"] }],
    major: [{ inc: ["major"] }, { inc: ["crown"] }, { inc: ["type 3"] }, { inc: ["class iii"] }],
    orthodontia: [{ inc: ["orthodontia"], exc: ["maximum", "lifetime"] }, { inc: ["ortho"], exc: ["maximum", "lifetime"] }, { inc: ["braces"] }],
    ortho_max: [{ inc: ["ortho", "lifetime"] }, { inc: ["ortho", "maximum"] }, { inc: ["orthodontia", "maximum"] }],
    waiting_periods: [{ inc: ["waiting"] }],
    network: [{ inc: ["network"] }],
  },
  "Vision Plans": {
    exam_copay: [{ inc: ["exam", "copay"] }, { inc: ["eye exam"] }, { inc: ["exam"], exc: ["frequency", "every"] }],
    exam_frequency: [{ inc: ["exam", "frequency"] }, { inc: ["exam", "every"] }],
    frames_allowance: [{ inc: ["frame", "allowance"] }, { inc: ["frame"], exc: ["frequency", "every"] }],
    frames_frequency: [{ inc: ["frame", "frequency"] }, { inc: ["frame", "every"] }],
    lenses: [{ inc: ["lens"], exc: ["contact", "frequency", "every"] }, { inc: ["single vision"] }],
    lenses_frequency: [{ inc: ["lens", "frequency"] }, { inc: ["lens", "every"] }],
    contacts_allowance: [{ inc: ["contact", "allowance"] }, { inc: ["contact"], exc: ["frequency", "every"] }],
    contacts_frequency: [{ inc: ["contact", "frequency"] }, { inc: ["contact", "every"] }],
    network: [{ inc: ["network"] }, { inc: ["vsp"] }],
  },
};

function normLabel(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9%$ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function flattenRows(content: PlanContent): PlanContentRow[] {
  const rows: PlanContentRow[] = [...content.keyFacts];
  for (const s of content.sections) {
    if (s.rows) rows.push(...s.rows);
  }
  return rows;
}

/**
 * Best-effort: map a plan's existing extracted content onto the standard
 * template fields, so the structured editor opens pre-filled. Imperfect by
 * design — the admin verifies/corrects before publishing.
 */
export function prefillValues(category: string, content: PlanContent): PlanValues {
  const matchers = MATCHERS[category];
  if (!matchers) return {};
  const rows = flattenRows(content).map((r) => ({ label: normLabel(r.label), value: r.value }));
  const values: PlanValues = {};

  for (const [fieldId, groups] of Object.entries(matchers)) {
    for (const g of groups) {
      const row = rows.find(
        (r) => g.inc.every((k) => r.label.includes(k)) && !(g.exc ?? []).some((k) => r.label.includes(k))
      );
      if (row) {
        const v = stripFootnotes(row.value);
        if (v) {
          values[fieldId] = v;
          break;
        }
      }
    }
  }
  return values;
}

/** Read stored values for a templated plan, falling back to a pre-fill from legacy freeform content. */
export function resolveValues(category: string, contentJson: unknown, freeform: PlanContent): PlanValues {
  const data = (contentJson ?? {}) as { values?: unknown };
  if (data.values && typeof data.values === "object" && !Array.isArray(data.values)) {
    const out: PlanValues = {};
    for (const [k, v] of Object.entries(data.values as Record<string, unknown>)) {
      if (typeof v === "string") out[k] = v;
    }
    return out;
  }
  return prefillValues(category, freeform);
}

/** Keep only known template field values, trimmed. */
export function cleanValues(category: string, values: unknown): PlanValues {
  const template = getTemplate(category);
  if (!template) return {};
  const ids = new Set(templateFields(template).map((f) => f.id));
  const input = (values ?? {}) as Record<string, unknown>;
  const out: PlanValues = {};
  for (const id of ids) {
    const v = input[id];
    if (typeof v === "string" && v.trim()) out[id] = stripFootnotes(v.trim());
  }
  return out;
}
