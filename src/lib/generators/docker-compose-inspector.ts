import { parseYaml, stringifyYaml } from "./yaml-json-converter";

export interface ComposeIssue {
  severity: "error" | "warning" | "info";
  message: string;
}

export interface ComposeInspection {
  valid: boolean;
  issues: ComposeIssue[];
  services: string[];
  topLevelKeys: string[];
  formatted: string | null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkIndentation(raw: string): ComposeIssue[] {
  const issues: ComposeIssue[] = [];
  const lines = raw.split(/\r?\n/);
  const deltas = new Set<number>();
  let prevIndent = 0;
  let sawTab = false;

  for (const line of lines) {
    if (/^\s*\t/.test(line) || /\t/.test(line.match(/^\s*/)?.[0] ?? "")) sawTab = true;
    const withoutComment = line.replace(/#.*/, "");
    const trimmed = withoutComment.trim();
    if (trimmed === "") continue;
    const indent = withoutComment.match(/^ */)?.[0].length ?? 0;
    if (indent > prevIndent) deltas.add(indent - prevIndent);
    prevIndent = indent;
  }

  if (sawTab) {
    issues.push({
      severity: "error",
      message: "Tab characters found in the indentation — YAML requires spaces, not tabs. Compose will fail to parse this file.",
    });
  }
  if (deltas.size > 1) {
    const steps = Array.from(deltas).sort((a, b) => a - b).join(", ");
    issues.push({
      severity: "warning",
      message: `Inconsistent indentation step sizes detected (found ${steps}-space steps) — pick one width, 2 spaces is conventional, and use it throughout.`,
    });
  }

  return issues;
}

const LEGACY_SERVICE_KEYS = new Set(["links", "volumes_from", "extends"]);

/** Parses and inspects a docker-compose.yml file for common structural and syntax issues. */
export function inspectCompose(raw: string): ComposeInspection {
  const issues: ComposeIssue[] = [];

  if (!raw.trim()) {
    return { valid: true, issues: [], services: [], topLevelKeys: [], formatted: null };
  }

  issues.push(...checkIndentation(raw));

  const parsed = parseYaml(raw);
  if (!parsed.success || !isPlainObject(parsed.value)) {
    issues.push({ severity: "error", message: parsed.error ?? "Couldn't parse this as valid YAML." });
    return { valid: false, issues, services: [], topLevelKeys: [], formatted: null };
  }

  const value = parsed.value;
  const topLevelKeys = Object.keys(value);

  if ("version" in value) {
    issues.push({
      severity: "warning",
      message: `Top-level "version: ${JSON.stringify(value.version)}" is deprecated in the Compose Specification — it can be safely removed. Modern Compose infers the schema automatically.`,
    });
  }

  if (!("services" in value) || !isPlainObject(value.services)) {
    issues.push({ severity: "error", message: "No services section found — a Compose file needs at least one service defined." });
    return { valid: false, issues, services: [], topLevelKeys, formatted: stringifyYaml(value) };
  }

  const servicesObj = value.services as Record<string, unknown>;
  const services = Object.keys(servicesObj);

  if (services.length === 0) {
    issues.push({ severity: "warning", message: "The services section is empty — nothing will actually run." });
  }

  for (const name of services) {
    const service = servicesObj[name];
    if (!isPlainObject(service)) {
      issues.push({ severity: "error", message: `Service "${name}" isn't a valid mapping — check its indentation.` });
      continue;
    }
    if (!("image" in service) && !("build" in service)) {
      issues.push({
        severity: "warning",
        message: `Service "${name}" has neither image nor build set — Compose won't know what to run for it.`,
      });
    }
    for (const key of Object.keys(service)) {
      if (LEGACY_SERVICE_KEYS.has(key)) {
        issues.push({
          severity: "info",
          message: `Service "${name}" uses the legacy "${key}" key — on modern Compose, a shared user-defined network usually replaces it.`,
        });
      }
    }
  }

  if (isPlainObject(value.networks)) {
    for (const netName of Object.keys(value.networks)) {
      const net = value.networks[netName];
      if (isPlainObject(net) && "driver" in net && net.driver === "") {
        issues.push({ severity: "warning", message: `Network "${netName}" has an empty driver value.` });
      }
    }
  }

  return {
    valid: !issues.some((i) => i.severity === "error"),
    issues,
    services,
    topLevelKeys,
    formatted: stringifyYaml(value),
  };
}

export const sampleCompose = `version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    depends_on:
      - api
    links:
      - api

  api:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - ./api:/app
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: pass
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
`;
