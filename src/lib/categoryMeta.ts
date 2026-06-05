import { Shield, Stethoscope, Eye, HeartPulse, type LucideIcon } from "lucide-react";

export type CategoryMeta = {
  icon: LucideIcon;
  color: string;
  gradient: string;
  shadow: string;
  bg: string;
};

/** Visual meta (icon + colors) per plan category. Shared by the plans list and detail pages. */
export const categoryMeta: Record<string, CategoryMeta> = {
  "Health Plans": { icon: Shield, color: "text-blue-600", gradient: "from-blue-600 to-blue-500", shadow: "shadow-blue-500/20", bg: "bg-blue-50" },
  "Dental Plans": { icon: Stethoscope, color: "text-indigo-600", gradient: "from-indigo-600 to-violet-500", shadow: "shadow-violet-500/20", bg: "bg-indigo-50" },
  "Vision Plans": { icon: Eye, color: "text-violet-600", gradient: "from-violet-600 to-purple-500", shadow: "shadow-purple-500/20", bg: "bg-violet-50" },
  "Supplemental": { icon: HeartPulse, color: "text-teal-600", gradient: "from-teal-600 to-emerald-500", shadow: "shadow-emerald-500/20", bg: "bg-teal-50" },
};

export const DEFAULT_CATEGORY_META: CategoryMeta = {
  icon: Shield,
  color: "text-slate-500",
  gradient: "from-slate-500 to-slate-400",
  shadow: "shadow-slate-500/20",
  bg: "bg-slate-50",
};

export function getCategoryMeta(category: string): CategoryMeta {
  return categoryMeta[category] ?? DEFAULT_CATEGORY_META;
}
