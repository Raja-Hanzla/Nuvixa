interface LogicalLine {
  indent: number;
  content: string;
  lineNo: number;
}

function stripComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inSingle) {
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '"' && line[i - 1] !== "\\") inDouble = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "#") return line.slice(0, i);
  }
  return line;
}

function preprocess(text: string): LogicalLine[] {
  const rawLines = text.split(/\r?\n/);
  const result: LogicalLine[] = [];
  rawLines.forEach((raw, idx) => {
    if (/^\s*(---|\.\.\.)\s*$/.test(raw)) return;
    const withoutComment = stripComment(raw).replace(/\s+$/, "");
    const normalized = withoutComment.replace(/\t/g, "  ");
    if (normalized.trim() === "") return;
    const indentMatch = /^(\s*)/.exec(normalized);
    const indent = indentMatch ? indentMatch[1].length : 0;
    result.push({ indent, content: normalized.trim(), lineNo: idx + 1 });
  });
  return result;
}

function findTopLevelColon(content: string): number {
  let inSingle = false;
  let inDouble = false;
  let depth = 0;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (inSingle) {
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '"' && content[i - 1] !== "\\") inDouble = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "[" || ch === "{") {
      depth++;
      continue;
    }
    if (ch === "]" || ch === "}") {
      depth--;
      continue;
    }
    if (ch === ":" && depth === 0) {
      const next = content[i + 1];
      if (next === undefined || next === " " || next === "\t") return i;
    }
  }
  return -1;
}

function unescapeDoubleQuoted(str: string): string {
  return str.replace(/\\(.)/g, (_, ch: string) => {
    switch (ch) {
      case "n":
        return "\n";
      case "t":
        return "\t";
      case '"':
        return '"';
      case "\\":
        return "\\";
      default:
        return ch;
    }
  });
}

function parseKeyToken(rawKey: string): string {
  const trimmed = rawKey.trim();
  if (trimmed.length >= 2 && trimmed[0] === '"' && trimmed.endsWith('"')) {
    return unescapeDoubleQuoted(trimmed.slice(1, -1));
  }
  if (trimmed.length >= 2 && trimmed[0] === "'" && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parseScalar(rawText: string): unknown {
  const text = rawText.trim();
  if (text === "") return null;
  if (text.length >= 2 && text[0] === '"' && text.endsWith('"')) return unescapeDoubleQuoted(text.slice(1, -1));
  if (text.length >= 2 && text[0] === "'" && text.endsWith("'")) return text.slice(1, -1).replace(/''/g, "'");
  if (text === "null" || text === "Null" || text === "NULL" || text === "~") return null;
  if (text === "true" || text === "True" || text === "TRUE") return true;
  if (text === "false" || text === "False" || text === "FALSE") return false;
  if (/^-?\d+$/.test(text)) return parseInt(text, 10);
  if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(text) || /^-?\d+[eE][+-]?\d+$/.test(text)) return parseFloat(text);
  return text;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let current = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inSingle) {
      current += ch;
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      current += ch;
      if (ch === '"' && text[i - 1] !== "\\") inDouble = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      current += ch;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      current += ch;
      continue;
    }
    if (ch === "[" || ch === "{") {
      depth++;
      current += ch;
      continue;
    }
    if (ch === "]" || ch === "}") {
      depth--;
      current += ch;
      continue;
    }
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim() !== "" || parts.length > 0) parts.push(current);
  return parts.map((p) => p.trim()).filter((p) => p.length > 0);
}

function parseScalarOrFlow(text: string): unknown {
  const trimmed = text.trim();
  if (trimmed === "[]") return [];
  if (trimmed === "{}") return {};
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return splitTopLevel(trimmed.slice(1, -1)).map((part) => parseScalarOrFlow(part));
  }
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    const obj: Record<string, unknown> = {};
    for (const part of splitTopLevel(trimmed.slice(1, -1))) {
      const idx = findTopLevelColon(part);
      if (idx === -1) continue;
      obj[parseKeyToken(part.slice(0, idx))] = parseScalarOrFlow(part.slice(idx + 1));
    }
    return obj;
  }
  return parseScalar(trimmed);
}

function isDashLine(content: string): boolean {
  return content === "-" || content.startsWith("- ");
}

function parseBlock(lines: LogicalLine[], startIdx: number): { value: unknown; nextIdx: number } {
  if (startIdx >= lines.length) return { value: null, nextIdx: startIdx };
  const indent = lines[startIdx].indent;
  if (isDashLine(lines[startIdx].content)) return parseSequence(lines, startIdx, indent);
  return parseMapping(lines, startIdx, indent);
}

function parseSequence(lines: LogicalLine[], startIdx: number, indent: number): { value: unknown; nextIdx: number } {
  const arr: unknown[] = [];
  let i = startIdx;
  while (i < lines.length && lines[i].indent === indent && isDashLine(lines[i].content)) {
    const rest = lines[i].content === "-" ? "" : lines[i].content.slice(2);
    if (rest.trim() === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const { value, nextIdx } = parseBlock(lines, i + 1);
        arr.push(value);
        i = nextIdx;
      } else {
        arr.push(null);
        i++;
      }
    } else if (findTopLevelColon(rest) !== -1 && !rest.trim().startsWith("[") && !rest.trim().startsWith("{")) {
      // Inline mapping start, e.g. "- name: Ada" possibly followed by more-indented sibling keys.
      const virtualIndent = indent + 2;
      const syntheticLines: LogicalLine[] = [{ indent: virtualIndent, content: rest, lineNo: lines[i].lineNo }];
      let j = i + 1;
      while (j < lines.length && lines[j].indent >= virtualIndent) {
        syntheticLines.push({ ...lines[j], indent: lines[j].indent });
        j++;
      }
      const { value } = parseMapping(syntheticLines, 0, virtualIndent);
      arr.push(value);
      i = j;
    } else {
      arr.push(parseScalarOrFlow(rest));
      i++;
    }
  }
  return { value: arr, nextIdx: i };
}

function parseMapping(lines: LogicalLine[], startIdx: number, indent: number): { value: unknown; nextIdx: number } {
  const obj: Record<string, unknown> = {};
  let i = startIdx;
  while (i < lines.length && lines[i].indent === indent && !isDashLine(lines[i].content)) {
    const line = lines[i];
    const colonIdx = findTopLevelColon(line.content);
    if (colonIdx === -1) {
      i++;
      continue;
    }
    const key = parseKeyToken(line.content.slice(0, colonIdx));
    const rawValue = line.content.slice(colonIdx + 1).trim();
    if (rawValue === "") {
      if (i + 1 < lines.length && lines[i + 1].indent > indent) {
        const { value, nextIdx } = parseBlock(lines, i + 1);
        obj[key] = value;
        i = nextIdx;
      } else {
        obj[key] = null;
        i++;
      }
    } else {
      obj[key] = parseScalarOrFlow(rawValue);
      i++;
    }
  }
  return { value: obj, nextIdx: i };
}

export interface YamlParseResult {
  success: boolean;
  value?: unknown;
  error?: string;
}

/** Parses a practical subset of YAML (block + flow mappings/sequences, common scalar types) into a JS value. */
export function parseYaml(text: string): YamlParseResult {
  try {
    const lines = preprocess(text);
    if (lines.length === 0) return { success: true, value: null };
    const { value } = parseBlock(lines, 0);
    return { success: true, value };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Failed to parse YAML." };
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function needsQuoting(str: string): boolean {
  if (str === "") return true;
  if (/^\s|\s$/.test(str)) return true;
  if (str.includes(": ") || str.endsWith(":") || / #/.test(str) || str.startsWith("#")) return true;
  if (/^[-?:,[\]{}#&*!|>'"%@`]/.test(str)) return true;
  if (/^(true|false|null|~|yes|no|on|off)$/i.test(str)) return true;
  if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(str)) return true;
  if (/^\d+(:\d+)+$/.test(str)) return true;
  if (/[\n\t]/.test(str)) return true;
  return false;
}

function scalarToYaml(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  const str = String(value);
  return needsQuoting(str) ? JSON.stringify(str) : str;
}

function stringifyArray(arr: unknown[], indent: number): string {
  if (arr.length === 0) return "[]";
  const pad = "  ".repeat(indent);
  const lines: string[] = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      if (item.length === 0) {
        lines.push(`${pad}- []`);
      } else {
        const nestedLines = stringifyArray(item, indent + 1).split("\n");
        lines.push(`${pad}- ${nestedLines[0].trimStart()}`);
        for (let k = 1; k < nestedLines.length; k++) lines.push(nestedLines[k]);
      }
    } else if (isPlainObject(item)) {
      const keys = Object.keys(item);
      if (keys.length === 0) {
        lines.push(`${pad}- {}`);
      } else {
        const nestedLines = stringifyObject(item, indent + 1).split("\n");
        lines.push(`${pad}- ${nestedLines[0].trimStart()}`);
        for (let k = 1; k < nestedLines.length; k++) lines.push(nestedLines[k]);
      }
    } else {
      lines.push(`${pad}- ${scalarToYaml(item)}`);
    }
  }
  return lines.join("\n");
}

function stringifyObject(obj: Record<string, unknown>, indent: number): string {
  const keys = Object.keys(obj);
  if (keys.length === 0) return "{}";
  const pad = "  ".repeat(indent);
  const lines: string[] = [];
  for (const key of keys) {
    const value = obj[key];
    const keyStr = needsQuoting(key) ? JSON.stringify(key) : key;
    if (Array.isArray(value)) {
      if (value.length === 0) lines.push(`${pad}${keyStr}: []`);
      else {
        lines.push(`${pad}${keyStr}:`);
        lines.push(stringifyArray(value, indent + 1));
      }
    } else if (isPlainObject(value)) {
      const nestedKeys = Object.keys(value);
      if (nestedKeys.length === 0) lines.push(`${pad}${keyStr}: {}`);
      else {
        lines.push(`${pad}${keyStr}:`);
        lines.push(stringifyObject(value, indent + 1));
      }
    } else {
      lines.push(`${pad}${keyStr}: ${scalarToYaml(value)}`);
    }
  }
  return lines.join("\n");
}

/** Serializes a JS value (from JSON.parse) into clean, 2-space-indented block YAML. */
export function stringifyYaml(value: unknown): string {
  if (Array.isArray(value)) return stringifyArray(value, 0);
  if (isPlainObject(value)) return stringifyObject(value, 0);
  return scalarToYaml(value);
}

export interface ConversionResult {
  success: boolean;
  output: string;
  error?: string;
}

export function yamlToJson(yamlText: string): ConversionResult {
  if (!yamlText.trim()) return { success: true, output: "" };
  const result = parseYaml(yamlText);
  if (!result.success) return { success: false, output: "", error: result.error ?? "Invalid YAML." };
  return { success: true, output: JSON.stringify(result.value, null, 2) };
}

export function jsonToYaml(jsonText: string): ConversionResult {
  if (!jsonText.trim()) return { success: true, output: "" };
  try {
    const value = JSON.parse(jsonText);
    return { success: true, output: stringifyYaml(value) };
  } catch (err) {
    return { success: false, output: "", error: err instanceof Error ? err.message : "Invalid JSON." };
  }
}

export const sampleYaml = `name: nuvixa-api
version: 1.4.2
debug: false
database:
  host: db.internal
  port: 5432
  ssl: true
tags:
  - production
  - api
  - v1
maintainers:
  - name: Ada
    email: ada@example.com
  - name: Grace
    email: grace@example.com
`;
