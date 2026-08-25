export type CspDirectiveKey =
  | "default-src"
  | "script-src"
  | "style-src"
  | "img-src"
  | "font-src"
  | "connect-src"
  | "frame-src"
  | "media-src"
  | "object-src";

export const cspDirectiveLabels: Record<CspDirectiveKey, string> = {
  "default-src": "default-src (fallback for all types)",
  "script-src": "script-src (JavaScript)",
  "style-src": "style-src (CSS)",
  "img-src": "img-src (images)",
  "font-src": "font-src (web fonts)",
  "connect-src": "connect-src (fetch/XHR/WebSocket)",
  "frame-src": "frame-src (iframes)",
  "media-src": "media-src (audio/video)",
  "object-src": "object-src (plugins/embeds)",
};

export const cspDirectiveOrder: CspDirectiveKey[] = [
  "default-src",
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "connect-src",
  "frame-src",
  "media-src",
  "object-src",
];

export type SourceKeyword = "'self'" | "'none'" | "'unsafe-inline'" | "'unsafe-eval'" | "data:" | "https:";

export const sourceKeywordOptions: { value: SourceKeyword; label: string; caution?: boolean }[] = [
  { value: "'self'", label: "'self' — same origin only" },
  { value: "'none'", label: "'none' — block entirely" },
  { value: "data:", label: "data: — inline data URIs" },
  { value: "https:", label: "https: — any HTTPS origin" },
  { value: "'unsafe-inline'", label: "'unsafe-inline' — allow inline code", caution: true },
  { value: "'unsafe-eval'", label: "'unsafe-eval' — allow eval()", caution: true },
];

export interface DirectiveConfig {
  keywords: SourceKeyword[];
  customDomains: string;
}

export type CspConfig = Record<CspDirectiveKey, DirectiveConfig>;

export function defaultCspConfig(): CspConfig {
  const config = {} as CspConfig;
  for (const key of cspDirectiveOrder) {
    config[key] = { keywords: key === "default-src" ? ["'self'"] : [], customDomains: "" };
  }
  config["script-src"] = { keywords: ["'self'"], customDomains: "" };
  config["style-src"] = { keywords: ["'self'"], customDomains: "" };
  config["img-src"] = { keywords: ["'self'", "data:"], customDomains: "" };
  config["font-src"] = { keywords: ["'self'"], customDomains: "" };
  config["connect-src"] = { keywords: ["'self'"], customDomains: "" };
  config["object-src"] = { keywords: ["'none'"], customDomains: "" };
  return config;
}

function parseCustomDomains(raw: string): string[] {
  return raw
    .split(/[\s,]+/)
    .map((d) => d.trim())
    .filter(Boolean);
}

export interface CspWarning {
  directive: CspDirectiveKey;
  message: string;
}

export function buildCspHeader(config: CspConfig): { header: string; warnings: CspWarning[] } {
  const parts: string[] = [];
  const warnings: CspWarning[] = [];

  for (const key of cspDirectiveOrder) {
    const directive = config[key];
    const domains = parseCustomDomains(directive.customDomains);
    const sources = [...directive.keywords, ...domains];
    if (sources.length === 0) continue;

    if (directive.keywords.includes("'unsafe-inline'")) {
      warnings.push({ directive: key, message: `${key} allows 'unsafe-inline' — this significantly weakens XSS protection.` });
    }
    if (directive.keywords.includes("'unsafe-eval'")) {
      warnings.push({ directive: key, message: `${key} allows 'unsafe-eval' — avoid unless a dependency truly requires it.` });
    }
    if (directive.keywords.includes("'none'") && sources.length > 1) {
      warnings.push({ directive: key, message: `${key} combines 'none' with other sources — 'none' should be used alone.` });
    }

    parts.push(`${key} ${sources.join(" ")}`);
  }

  return { header: parts.join("; ") + (parts.length ? ";" : ""), warnings };
}
