"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JsonValue } from "@/lib/generators/json-formatter";

function valueClass(value: JsonValue): string {
  if (value === null) return "text-muted-foreground";
  switch (typeof value) {
    case "string":
      return "text-success";
    case "number":
      return "text-primary";
    case "boolean":
      return "text-spark";
    default:
      return "text-foreground";
  }
}

function displayValue(value: JsonValue): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  return String(value);
}

export function JsonTreeNode({
  label,
  value,
  depth,
}: {
  label: string | null;
  value: JsonValue;
  depth: number;
}) {
  const isContainer = value !== null && typeof value === "object";
  const [expanded, setExpanded] = React.useState(depth < 2);

  if (!isContainer) {
    return (
      <div className="flex items-baseline gap-1.5 py-0.5 font-mono text-sm">
        {label !== null && <span className="text-foreground">{label}:</span>}
        <span className={valueClass(value)}>{displayValue(value)}</span>
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries: [string, JsonValue][] = isArray
    ? (value as JsonValue[]).map((v, i) => [String(i), v])
    : Object.entries(value as Record<string, JsonValue>);

  return (
    <div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 py-0.5 font-mono text-sm hover:bg-accent/50 rounded"
      >
        <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform", expanded && "rotate-90")} />
        {label !== null && <span className="text-foreground">{label}:</span>}
        <span className="text-muted-foreground">
          {isArray ? `Array(${entries.length})` : `Object(${entries.length})`}
        </span>
      </button>
      {expanded && (
        <div className="ml-2.5 border-l border-border pl-3.5">
          {entries.length === 0 ? (
            <p className="py-0.5 font-mono text-xs text-muted-foreground">empty</p>
          ) : (
            entries.map(([key, childValue]) => (
              <JsonTreeNode
                key={key}
                label={isArray ? null : key}
                value={childValue}
                depth={depth + 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
