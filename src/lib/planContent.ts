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
