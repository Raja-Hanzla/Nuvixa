export interface SerpLimits {
  idealMax: number;
  hardMax: number;
}

/** Rough, widely-cited character budgets before Google typically truncates with an ellipsis. */
export const titleLimits: SerpLimits = { idealMax: 55, hardMax: 60 };
export const descriptionLimits: SerpLimits = { idealMax: 150, hardMax: 160 };

export type LimitStatus = "good" | "warn" | "over";

export function getLimitStatus(length: number, limits: SerpLimits): LimitStatus {
  if (length > limits.hardMax) return "over";
  if (length > limits.idealMax) return "warn";
  return "good";
}

export interface ParsedUrl {
  domain: string;
  breadcrumb: string;
}

/** Turns a raw URL into a Google-style "domain › path › segments" breadcrumb. */
export function parseDisplayUrl(rawUrl: string): ParsedUrl {
  const trimmed = rawUrl.trim();
  if (!trimmed) return { domain: "example.com", breadcrumb: "example.com" };

  const cleaned = trimmed.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  const [domain, ...pathParts] = cleaned.split("/").filter(Boolean);
  const path = pathParts.map((part) => part.replace(/[-_]/g, " ")).filter(Boolean);
  const breadcrumb = [domain, ...path].join(" \u203a ");

  return { domain: domain || "example.com", breadcrumb };
}

/** Builds a short synthesized snippet for the simulated AI Overview card. */
export function buildAioSnippet(title: string, description: string): string {
  const source = description.trim() || title.trim();
  if (!source) return "Your title and description will appear here as a synthesized answer snippet.";
  const trimmed = source.length > 220 ? `${source.slice(0, 217).trimEnd()}\u2026` : source;
  return trimmed;
}

export const defaultSerpForm = {
  title: "10 Best Project Management Tools for Remote Teams in 2026",
  description:
    "Compare the top project management platforms for distributed teams — pricing, integrations, and which tool fits your workflow best.",
  url: "https://example.com/blog/best-project-management-tools",
};