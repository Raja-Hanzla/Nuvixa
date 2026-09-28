export interface ExtractionResult {
  success: boolean;
  error?: string;
  columns: string[];
  rows: Record<string, string>[];
  totalLines: number;
  matchedLines: number;
}

function buildRegex(pattern: string, caseInsensitive: boolean): { regex: RegExp | null; error?: string } {
  if (!pattern.trim()) return { regex: null, error: "Enter a regular expression." };
  try {
    const flags = caseInsensitive ? "i" : "";
    return { regex: new RegExp(pattern, flags) };
  } catch (err) {
    return { regex: null, error: err instanceof Error ? err.message : "Invalid regular expression." };
  }
}

/** Extracts named/numbered capture groups from a regex against every non-empty line of input text. */
export function extractMatches(logText: string, pattern: string, caseInsensitive: boolean): ExtractionResult {
  const lines = logText.split(/\r?\n/).filter((line) => line.trim() !== "");

  if (lines.length === 0) {
    return { success: true, columns: [], rows: [], totalLines: 0, matchedLines: 0 };
  }

  const { regex, error } = buildRegex(pattern, caseInsensitive);
  if (!regex) {
    return { success: false, error, columns: [], rows: [], totalLines: lines.length, matchedLines: 0 };
  }

  const namedGroupNames = extractGroupNames(pattern);
  const rows: Record<string, string>[] = [];
  let matchedLines = 0;
  let maxNumberedGroups = 0;

  for (const line of lines) {
    const m = regex.exec(line);
    if (!m) continue;
    matchedLines++;

    if (namedGroupNames.length > 0 && m.groups) {
      const row: Record<string, string> = {};
      for (const name of namedGroupNames) row[name] = m.groups[name] ?? "";
      rows.push(row);
    } else if (m.length > 1) {
      maxNumberedGroups = Math.max(maxNumberedGroups, m.length - 1);
      const row: Record<string, string> = {};
      for (let i = 1; i < m.length; i++) row[`group${i}`] = m[i] ?? "";
      rows.push(row);
    } else {
      rows.push({ match: m[0] });
    }
  }

  let columns: string[];
  if (namedGroupNames.length > 0) columns = namedGroupNames;
  else if (maxNumberedGroups > 0) columns = Array.from({ length: maxNumberedGroups }, (_, i) => `group${i + 1}`);
  else columns = rows.length > 0 ? ["match"] : [];

  // Normalize rows so every row has every column (in case group counts varied across lines).
  const normalized = rows.map((row) => {
    const out: Record<string, string> = {};
    for (const col of columns) out[col] = row[col] ?? "";
    return out;
  });

  return { success: true, columns, rows: normalized, totalLines: lines.length, matchedLines };
}

function extractGroupNames(pattern: string): string[] {
  const names: string[] = [];
  const re = /\(\?<([a-zA-Z_$][a-zA-Z0-9_$]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(pattern)) !== null) names.push(m[1]);
  return names;
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function toCsv(columns: string[], rows: Record<string, string>[]): string {
  if (columns.length === 0) return "";
  const header = columns.map(csvEscape).join(",");
  const body = rows.map((row) => columns.map((col) => csvEscape(row[col] ?? "")).join(","));
  return [header, ...body].join("\n");
}

export function toJson(rows: Record<string, string>[]): string {
  return JSON.stringify(rows, null, 2);
}

export const sampleLogText = `127.0.0.1 - - [10/Oct/2023:13:55:36 -0700] "GET /index.html HTTP/1.1" 200 2326
192.168.1.5 - - [10/Oct/2023:13:56:02 -0700] "POST /api/login HTTP/1.1" 401 512
10.0.0.3 - - [10/Oct/2023:13:57:15 -0700] "GET /favicon.ico HTTP/1.1" 404 209
172.16.0.9 - - [10/Oct/2023:13:58:40 -0700] "GET /api/orders HTTP/1.1" 200 4820
127.0.0.1 - - [10/Oct/2023:13:59:02 -0700] "DELETE /api/orders/42 HTTP/1.1" 204 0`;

export const samplePattern =
  '^(?<ip>\\S+) \\S+ \\S+ \\[(?<timestamp>[^\\]]+)\\] "(?<method>\\S+) (?<path>\\S+) \\S+" (?<status>\\d+) (?<size>\\d+)$';
