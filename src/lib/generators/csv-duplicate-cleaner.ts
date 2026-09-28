export interface CsvData {
  headers: string[];
  rows: string[][];
}

/** Parses CSV text (RFC-4180-ish: quoted fields, escaped "" quotes, commas/newlines inside quotes). */
export function parseCsv(text: string): CsvData {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const n = text.length;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  while (i < n) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (ch === ",") {
      pushField();
      i++;
      continue;
    }
    if (ch === "\r") {
      i++;
      continue;
    }
    if (ch === "\n") {
      pushRow();
      i++;
      continue;
    }
    field += ch;
    i++;
  }
  if (field !== "" || row.length > 0) pushRow();

  const nonEmpty = rows.filter((r) => !(r.length === 1 && r[0] === ""));
  if (nonEmpty.length === 0) return { headers: [], rows: [] };

  const [headers, ...dataRows] = nonEmpty;
  const width = headers.length;
  const normalized = dataRows.map((r) => {
    if (r.length === width) return r;
    if (r.length < width) return [...r, ...Array(width - r.length).fill("")];
    return r.slice(0, width);
  });

  return { headers, rows: normalized };
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function toCsvText(headers: string[], rows: string[][]): string {
  const lines = [headers, ...rows].map((r) => r.map(csvEscape).join(","));
  return lines.join("\n");
}

export interface DuplicateCheckResult {
  cleanedRows: string[][];
  duplicateRows: string[][];
  duplicateCount: number;
  totalRows: number;
}

/** Finds duplicate rows based on the given key column indexes, keeping the first occurrence of each. */
export function findDuplicates(rows: string[][], keyColumnIndexes: number[]): DuplicateCheckResult {
  const seen = new Set<string>();
  const cleanedRows: string[][] = [];
  const duplicateRows: string[][] = [];

  for (const row of rows) {
    const key = keyColumnIndexes.length > 0 ? keyColumnIndexes.map((idx) => row[idx] ?? "").join("\u0001") : row.join("\u0001");
    if (seen.has(key)) {
      duplicateRows.push(row);
    } else {
      seen.add(key);
      cleanedRows.push(row);
    }
  }

  return { cleanedRows, duplicateRows, duplicateCount: duplicateRows.length, totalRows: rows.length };
}

export const sampleCsv = `name,email,city
Ada Lovelace,ada@example.com,London
Grace Hopper,grace@example.com,New York
Ada Lovelace,ada@example.com,London
Alan Turing,alan@example.com,London
Grace Hopper,grace@example.com,Arlington
Ada Lovelace,ada.l@example.com,London`;
