// Import the implementation directly (not the package index) to avoid pdf-parse's
// module-load behavior of reading a bundled test PDF. v1 is pure JS (no native
// deps), so it traces cleanly into the Next standalone / Alpine Docker build.
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import type { PlanContent, PlanContentRow, PlanContentSection } from "./planContent";

const DRAFT_DISCLAIMER =
  "Draft auto-generated from the plan PDF. Verify all figures against the official Summary of Benefits before publishing.";

const MAX_KEY_FACTS = 12;
const MAX_SECTIONS = 14;
const MAX_ROWS_PER_SECTION = 30;

/** Extract raw text from PDF bytes using pdf-parse (Node-only, pure JS). */
export async function extractPdfText(data: Buffer | Uint8Array): Promise<string> {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const result = await pdfParse(buffer);
  return result.text || "";
}

function titleCase(s: string): string {
  const t = s.trim().replace(/\s+/g, " ");
  // Leave already-mixed/acronym text mostly alone; only fix ALL CAPS words.
  return t
    .split(" ")
    .map((w) =>
      w.length > 2 && w === w.toUpperCase() && /[A-Z]/.test(w)
        ? w.charAt(0) + w.slice(1).toLowerCase()
        : w
    )
    .join(" ");
}

// A clear monetary / percentage / zero value token at the end of a line.
const VALUE_TOKEN = /(\$[\d,]+(?:\.\d{1,2})?|\d{1,3}%|\$0|\bNo charge\b|\bNot covered\b|\bN\/A\b)/i;

/** A heading: short, mostly letters, no value token, Title-case or ALL CAPS. */
function isHeading(line: string): boolean {
  if (line.length < 3 || line.length > 60) return false;
  if (VALUE_TOKEN.test(line)) return false;
  if (/[.:;]$/.test(line)) return false;
  const letters = line.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return false;
  const isAllCaps = line === line.toUpperCase() && /[A-Z]{3,}/.test(line);
  const isTitleish = /^[A-Z][A-Za-z]/.test(line) && line.split(" ").length <= 6;
  return isAllCaps || isTitleish;
}

/** Split "Label .... value" where value is a money/percent token, or 2+ space gap. */
function splitLabelValue(line: string): PlanContentRow | null {
  const vm = line.match(VALUE_TOKEN);
  if (vm && vm.index !== undefined && vm.index > 0) {
    const label = line.slice(0, vm.index).replace(/[.\s]+$/, "").trim();
    const value = line.slice(vm.index).trim();
    if (label.length >= 2 && label.length <= 80 && value.length <= 60) {
      return { label: titleCase(label), value };
    }
  }
  // Fallback: split on a run of 2+ spaces / dot-leaders / tab
  const gap = line.split(/\s{2,}|\.{2,}|\t/).map((p) => p.trim()).filter(Boolean);
  if (gap.length === 2 && gap[0].length >= 2 && gap[0].length <= 80 && gap[1].length <= 60) {
    return { label: titleCase(gap[0]), value: gap[1] };
  }
  return null;
}

function dedupRows(rows: PlanContentRow[]): PlanContentRow[] {
  const seen = new Set<string>();
  const out: PlanContentRow[] = [];
  for (const r of rows) {
    const key = `${r.label.toLowerCase()}|${r.value.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

/**
 * Best-effort, conservative parse of raw PDF text into a draft PlanContent.
 * A bad parse yields a small/empty draft (not garbage); the admin cleans it up.
 */
export function parsePlanContent(rawText: string, planName: string): PlanContent {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.replace(/ /g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const keyFacts: PlanContentRow[] = [];
  const sections: PlanContentSection[] = [];
  let current: PlanContentSection | null = null;

  for (const line of lines) {
    if (isHeading(line)) {
      current = { heading: titleCase(line), rows: [] };
      sections.push(current);
      continue;
    }
    const row = splitLabelValue(line);
    if (!row) continue;

    // Collect prominent money/percent facts for the "at a glance" grid.
    if (keyFacts.length < MAX_KEY_FACTS && /^\$|%$|^\$0$/.test(row.value)) {
      keyFacts.push(row);
    }
    if (current) current.rows!.push(row);
  }

  const cleanedSections = sections
    .map((s) => ({ ...s, rows: dedupRows(s.rows ?? []).slice(0, MAX_ROWS_PER_SECTION) }))
    .filter((s) => (s.rows?.length ?? 0) > 0)
    .slice(0, MAX_SECTIONS);

  return {
    title: planName,
    keyFacts: dedupRows(keyFacts).slice(0, MAX_KEY_FACTS),
    sections: cleanedSections,
    disclaimer: DRAFT_DISCLAIMER,
  };
}

/** Convenience: bytes → draft PlanContent. Never throws; returns empty draft on failure. */
export async function extractPlanContent(
  data: Buffer | Uint8Array,
  planName: string
): Promise<PlanContent> {
  try {
    const text = await extractPdfText(data);
    return parsePlanContent(text, planName);
  } catch {
    return {
      title: planName,
      keyFacts: [],
      sections: [],
      disclaimer: DRAFT_DISCLAIMER,
    };
  }
}
