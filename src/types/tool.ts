import type { LucideIcon } from "lucide-react";

export type ToolCategory =
  | "business"
  | "productivity"
  | "developer"
  | "ai"
  | "finance"
  | "marketing" 
  | "utility";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Tool {
  /** Unique URL slug, e.g. "ooo-generator". Route lives at /tools/[slug]. */
  slug: string;
  /** Short display name shown on cards and in navigation. */
  name: string;
  /** One-line summary shown on tool cards and in metadata descriptions. */
  tagline: string;
  /** Longer description shown on the tool's own page. */
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  /** Marks a tool as newly added, shown as a badge on its card. */
  isNew?: boolean;
  /** Keywords used for search matching and SEO metadata. */
  keywords: string[];
  /** Numbered steps shown in the "How to use" section. */
  howTo: string[];
  faq: FaqItem[];
}

export const categoryLabels: Record<ToolCategory, string> = {
  business: "Business",
  productivity: "Productivity",
  developer: "Developer",
  ai: "AI",
  finance: "Finance",
  utility: "Utility",
  marketing: "Marketing",
};

/** One accent dot color per category — used instead of numbering, since categories aren't a sequence. */
export const categoryDot: Record<ToolCategory, string> = {
  business: "bg-signal",
  productivity: "bg-success",
  developer: "bg-violet-500",
  ai: "bg-spark",
  finance: "bg-emerald-500",
  utility: "bg-sky-500",
  marketing: "bg-rose-500",
};
