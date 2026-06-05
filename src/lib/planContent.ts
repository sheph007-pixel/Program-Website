/**
 * Shared types + helpers for editable plan web-page content.
 *
 * A plan's benefit details are stored as a single JSON document on `Plan.contentJson`,
 * authored/edited in the admin panel and rendered on the public /plans/[id] page.
 * `Plan.contentStatus` gates visibility: "none" | "draft" | "published".
 */

export type PlanContentRow = { label: string; value: string };

export type PlanContentSection = {
  heading: string;
  body?: string;
  rows?: PlanContentRow[];
};

export type PlanContent = {
  title?: string; // optional display override; falls back to Plan.name
  keyFacts: PlanContentRow[];
  sections: PlanContentSection[];
  disclaimer?: string;
};

export type ContentStatus = "none" | "draft" | "published";

export const EMPTY_PLAN_CONTENT: PlanContent = {
  keyFacts: [],
  sections: [],
};

export function isPublished(status: string | null | undefined): boolean {
  return status === "published";
}

function cleanRows(input: unknown): PlanContentRow[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((r) => {
      const row = (r ?? {}) as Record<string, unknown>;
      return {
        label: typeof row.label === "string" ? row.label : "",
        value: typeof row.value === "string" ? row.value : "",
      };
    })
    .filter((r) => r.label.trim() !== "" || r.value.trim() !== "");
}

/**
 * Coerce arbitrary input (DB JSON or an editor payload) into a well-formed
 * PlanContent. Never throws — bad/missing fields become empty defaults.
 */
export function normalizePlanContent(input: unknown): PlanContent {
  const data = (input ?? {}) as Record<string, unknown>;

  const sections = Array.isArray(data.sections)
    ? data.sections
        .map((s) => {
          const sec = (s ?? {}) as Record<string, unknown>;
          const rows = cleanRows(sec.rows);
          const body = typeof sec.body === "string" ? sec.body : undefined;
          return {
            heading: typeof sec.heading === "string" ? sec.heading : "",
            ...(body && body.trim() !== "" ? { body } : {}),
            ...(rows.length ? { rows } : {}),
          } as PlanContentSection;
        })
        .filter((s) => s.heading.trim() !== "" || s.body || (s.rows && s.rows.length))
    : [];

  return {
    ...(typeof data.title === "string" && data.title.trim() !== ""
      ? { title: data.title }
      : {}),
    keyFacts: cleanRows(data.keyFacts),
    sections,
    ...(typeof data.disclaimer === "string" && data.disclaimer.trim() !== ""
      ? { disclaimer: data.disclaimer }
      : {}),
  };
}

/** True when the content has anything worth rendering. */
export function hasRenderableContent(content: PlanContent | null | undefined): boolean {
  if (!content) return false;
  return content.keyFacts.length > 0 || content.sections.length > 0;
}

// Marker for the legacy auto-generated draft disclaimer we no longer show.
const DRAFT_DISCLAIMER_MARKER = "auto-generated from the plan PDF";
// The BYTE program is discontinued — strip any reference to it from plan content.
const BYTE_RE = /\bbyte\b/i;

/** Strip footnote markers and fine-print references (*, †, ‡, ¹, "(1)", "[1]"). */
export function stripFootnotes(input: string): string {
  return input
    .replace(/[*†‡§¶◊]/g, "")
    .replace(/[¹²³⁰-₟]/g, "") // superscripts / subscripts
    .replace(/\s*\((?:\d{1,2}|[a-z])\)\s*$/i, "") // trailing (1) / (a)
    .replace(/\s*\[\d{1,2}\]\s*$/, "") // trailing [1]
    .replace(/\s{2,}/g, " ")
    .trim();
}

function scrubRow(r: PlanContentRow): PlanContentRow {
  return { label: stripFootnotes(r.label), value: stripFootnotes(r.value) };
}

function dropByteRows(rows: PlanContentRow[]): PlanContentRow[] {
  return rows.filter((r) => !BYTE_RE.test(r.label) && !BYTE_RE.test(r.value)).map(scrubRow);
}

/**
 * Remove content that should never be shown to members:
 *  - the legacy "Draft auto-generated…" disclaimer
 *  - any reference to the discontinued BYTE program
 * Applied on read (render + admin editor) and on extraction, so it takes effect
 * immediately without rewriting stored rows.
 */
export function scrubPlanContent(content: PlanContent): PlanContent {
  const keyFacts = dropByteRows(content.keyFacts);

  const sections = content.sections
    .filter((s) => !BYTE_RE.test(s.heading))
    .map((s) => {
      const rows = s.rows ? dropByteRows(s.rows) : undefined;
      let body = s.body;
      if (body && BYTE_RE.test(body)) {
        body = body
          .split(/\n+/)
          .filter((line) => !BYTE_RE.test(line))
          .join("\n")
          .trim();
      }
      return {
        heading: stripFootnotes(s.heading),
        ...(body ? { body } : {}),
        ...(rows && rows.length ? { rows } : {}),
      } as PlanContentSection;
    })
    .filter((s) => (s.rows && s.rows.length) || s.body);

  const disclaimer =
    content.disclaimer && content.disclaimer.includes(DRAFT_DISCLAIMER_MARKER)
      ? undefined
      : content.disclaimer;

  return {
    ...(content.title ? { title: content.title } : {}),
    keyFacts,
    sections,
    ...(disclaimer ? { disclaimer } : {}),
  };
}
