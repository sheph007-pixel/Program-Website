/** The plan categories, each with its own page and sidebar tab. */
export const PLAN_CATEGORIES = [
  { slug: "medical", category: "Health Plans", label: "Medical" },
  { slug: "dental", category: "Dental Plans", label: "Dental" },
  { slug: "vision", category: "Vision Plans", label: "Vision" },
  { slug: "supplemental", category: "Supplemental", label: "Supplemental" },
] as const;

export type PlanCategoryInfo = (typeof PLAN_CATEGORIES)[number];

/** The page for a plan category ("Health Plans" goes to /medical). */
export function categoryPage(category: string): PlanCategoryInfo {
  return PLAN_CATEGORIES.find((c) => c.category === category) ?? PLAN_CATEGORIES[0];
}
