export type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export const changeFreqOptions: ChangeFreq[] = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];

export interface SitemapEntry {
  id: string;
  url: string;
  lastmod: string;
  changefreq: ChangeFreq;
  priority: number;
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/** Heuristic: shallower URLs (closer to the root) get higher priority and more frequent change assumptions. */
export function autoAssign(url: string): { changefreq: ChangeFreq; priority: number } {
  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return { changefreq: "weekly", priority: 1.0 };
    if (segments.length === 1) return { changefreq: "weekly", priority: 0.8 };
    if (segments.length === 2) return { changefreq: "monthly", priority: 0.6 };
    return { changefreq: "monthly", priority: 0.5 };
  } catch {
    return { changefreq: "monthly", priority: 0.5 };
  }
}

export function newEntryFromUrl(url: string): SitemapEntry {
  const auto = autoAssign(url);
  return { id: randomId(), url: url.trim(), lastmod: today(), ...auto };
}

export function parseUrlList(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(entries: SitemapEntry[]): string {
  const validEntries = entries.filter((e) => isValidUrl(e.url));
  const blocks = validEntries.map(
    (e) =>
      `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blocks.join("\n")}\n</urlset>`;
}

export const sampleUrls = ["https://example.com/", "https://example.com/pricing", "https://example.com/blog/how-it-works"].join(
  "\n"
);
