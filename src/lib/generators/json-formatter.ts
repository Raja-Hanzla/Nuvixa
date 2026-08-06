export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ParseSuccess {
  success: true;
  value: JsonValue;
}

export interface ParseFailure {
  success: false;
  message: string;
  line: number | null;
  column: number | null;
}

export type ParseResult = ParseSuccess | ParseFailure;

function positionToLineColumn(input: string, position: number): { line: number; column: number } {
  const upToPosition = input.slice(0, position);
  const lines = upToPosition.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

export function parseJson(input: string): ParseResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, message: "Enter some JSON to validate.", line: null, column: null };
  }

  try {
    const value = JSON.parse(trimmed) as JsonValue;
    return { success: true, value };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON.";
    const positionMatch = message.match(/position (\d+)/);
    if (positionMatch) {
      const position = Number(positionMatch[1]);
      const { line, column } = positionToLineColumn(trimmed, position);
      return { success: false, message, line, column };
    }
    return { success: false, message, line: null, column: null };
  }
}

export function formatJson(value: JsonValue, indent = 2): string {
  return JSON.stringify(value, null, indent);
}

export function minifyJson(value: JsonValue): string {
  return JSON.stringify(value);
}

export function countKeys(value: JsonValue): number {
  if (value === null || typeof value !== "object") return 0;
  const entries = Array.isArray(value) ? value : Object.values(value);
  return entries.reduce<number>((count, item) => {
    const own = Array.isArray(value) ? 0 : 1;
    return count + own + countKeys(item as JsonValue);
  }, Array.isArray(value) ? 0 : Object.keys(value).length);
}

export function maxDepth(value: JsonValue): number {
  if (value === null || typeof value !== "object") return 0;
  const children = Array.isArray(value) ? value : Object.values(value);
  if (children.length === 0) return 1;
  return 1 + Math.max(...children.map((child) => maxDepth(child as JsonValue)));
}

export const sampleJson = `{
  "id": "usr_8842",
  "name": "Jordan Lee",
  "active": true,
  "roles": ["admin", "editor"],
  "address": {
    "city": "Austin",
    "zip": "78701"
  },
  "lastLogin": null
}`;
