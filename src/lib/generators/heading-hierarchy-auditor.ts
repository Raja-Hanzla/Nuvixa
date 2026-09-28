export interface HeadingNode {
  level: number;
  text: string;
  index: number;
}

export interface HeadingIssue {
  severity: "error" | "warning" | "info";
  message: string;
}

export interface HeadingAuditResult {
  headings: HeadingNode[];
  issues: HeadingIssue[];
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(str: string): string {
  return str.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (match, ent: string) => {
    if (ent[0] === "#") {
      const isHex = ent[1] === "x" || ent[1] === "X";
      const code = parseInt(isHex ? ent.slice(2) : ent.slice(1), isHex ? 16 : 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[ent] ?? match;
  });
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/** Extracts every h1–h6 tag from raw HTML source, in document order, with tags stripped from the heading text. */
export function extractHeadings(html: string): HeadingNode[] {
  const regex = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings: HeadingNode[] = [];
  let m: RegExpExecArray | null;
  let index = 0;
  while ((m = regex.exec(html)) !== null) {
    const level = parseInt(m[1], 10);
    const text = decodeEntities(stripTags(m[2])).replace(/\s+/g, " ").trim();
    headings.push({ level, text, index: index++ });
  }
  return headings;
}

export function auditHeadings(headings: HeadingNode[]): HeadingIssue[] {
  const issues: HeadingIssue[] = [];

  if (headings.length === 0) {
    issues.push({ severity: "warning", message: "No heading tags (H1–H6) found in this HTML." });
    return issues;
  }

  const h1Count = headings.filter((h) => h.level === 1).length;
  if (h1Count === 0) {
    issues.push({ severity: "warning", message: "No H1 found — most pages should have exactly one top-level heading." });
  } else if (h1Count > 1) {
    issues.push({ severity: "info", message: `${h1Count} H1 tags found — most SEO guidance recommends just one per page.` });
  }

  let prevLevel = 0;
  headings.forEach((h, i) => {
    if (h.text === "") {
      issues.push({ severity: "error", message: `Heading #${i + 1} (H${h.level}) has no text content.` });
    }
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      issues.push({
        severity: "error",
        message: `Level skipped: H${prevLevel} is followed directly by H${h.level}${h.text ? ` ("${h.text}")` : ""} — H${prevLevel + 1} was skipped.`,
      });
    }
    prevLevel = h.level;
  });

  return issues;
}

export function auditHtml(html: string): HeadingAuditResult {
  const headings = extractHeadings(html);
  return { headings, issues: auditHeadings(headings) };
}

export const sampleHeadingHtml = `<h1>The Complete Guide to Sourdough Bread</h1>
<p>Everything you need to bake your first loaf.</p>

<h2>Getting Started</h2>
<p>What you'll need before day one.</p>

<h4>Choosing Your Flour</h4>
<p>Bread flour vs all-purpose, explained.</p>

<h2>The Fermentation Process</h2>
<h3>Bulk Fermentation</h3>
<p>Why timing matters more than the clock.</p>
<h3></h3>

<h2>Baking Day</h2>
<h3>Shaping</h3>
<h3>Scoring and Baking</h3>`;
