export type DiffGranularity = "line" | "word" | "char";
export type DiffOpType = "equal" | "add" | "remove";

export interface DiffToken {
  type: DiffOpType;
  value: string;
}

export interface DiffResult {
  granularity: DiffGranularity;
  tokens: DiffToken[];
  added: number;
  removed: number;
  totalLinesA: number;
  totalLinesB: number;
  truncated: boolean;
}

function tokenize(text: string, granularity: DiffGranularity): string[] {
  if (granularity === "line") return text.split(/\r?\n/);
  if (granularity === "char") return Array.from(text);
  return text.match(/\S+|\s+/g) ?? [];
}

/** Caps the DP table size so pasting very large text doesn't hang the browser tab. */
const MAX_CELLS = 2_500_000;

function lcsDiff(a: string[], b: string[]): { ops: DiffToken[]; truncated: boolean } {
  const n = a.length;
  const m = b.length;

  if (n * m > MAX_CELLS) {
    const ops: DiffToken[] = [];
    if (n) ops.push({ type: "remove", value: a.join("") });
    if (m) ops.push({ type: "add", value: b.join("") });
    return { ops, truncated: true };
  }

  const dp: Uint32Array[] = new Array(n + 1);
  for (let i = 0; i <= n; i++) dp[i] = new Uint32Array(m + 1);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: "equal", value: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "remove", value: a[i] });
      i++;
    } else {
      ops.push({ type: "add", value: b[j] });
      j++;
    }
  }
  while (i < n) {
    ops.push({ type: "remove", value: a[i] });
    i++;
  }
  while (j < m) {
    ops.push({ type: "add", value: b[j] });
    j++;
  }

  return { ops, truncated: false };
}

function mergeConsecutive(ops: DiffToken[]): DiffToken[] {
  const merged: DiffToken[] = [];
  for (const op of ops) {
    const last = merged[merged.length - 1];
    if (last && last.type === op.type) last.value += op.value;
    else merged.push({ ...op });
  }
  return merged;
}

/** Diffs two blocks of text at the given granularity, returning display tokens and add/remove counts. */
export function computeDiff(a: string, b: string, granularity: DiffGranularity): DiffResult {
  const linesA = a.split(/\r?\n/);
  const linesB = b.split(/\r?\n/);

  const tokensA = tokenize(a, granularity);
  const tokensB = tokenize(b, granularity);
  const { ops, truncated } = lcsDiff(tokensA, tokensB);
  const tokens = granularity === "line" ? ops : mergeConsecutive(ops);

  let added = 0;
  let removed = 0;
  for (const op of ops) {
    if (op.type === "add") added++;
    else if (op.type === "remove") removed++;
  }

  return {
    granularity,
    tokens,
    added,
    removed,
    totalLinesA: linesA.length,
    totalLinesB: linesB.length,
    truncated,
  };
}

export const sampleTextA = `Nuvixa is a collection of free tools for everyday work.
Every tool runs entirely in your browser, so nothing you type is ever sent to a server.
There's no sign-up, no usage limit, and no premium tier hiding the good stuff.
New tools ship every week across developer, marketing, and finance categories.`;

export const sampleTextB = `Nuvixa is a growing collection of free tools for everyday work and life.
Every tool runs entirely in your browser, so nothing you type is ever sent to a server or stored.
There's no sign-up and no premium tier hiding the good stuff.
New tools ship every week across developer, marketing, finance, and productivity categories.
Feedback is always welcome if there's a tool you keep wishing existed.`;
