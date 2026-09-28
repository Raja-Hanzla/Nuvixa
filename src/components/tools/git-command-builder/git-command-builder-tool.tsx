"use client";

import * as React from "react";
import { GitBranch } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/tools/copy-button";
import { gitScenarios, gitScenarioCategories } from "@/lib/generators/git-command-builder";
import { cn } from "@/lib/utils";

export function GitCommandBuilderTool() {
  const [selectedId, setSelectedId] = React.useState(gitScenarios[0].id);
  const [values, setValues] = React.useState<Record<string, string>>({});

  const scenario = gitScenarios.find((s) => s.id === selectedId) ?? gitScenarios[0];
  const command = scenario.build(values);

  function selectScenario(id: string) {
    setSelectedId(id);
    setValues({});
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>What do you need to do?</CardTitle>
          <CardDescription>Pick a scenario — the exact command builds itself.</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[560px] space-y-5 overflow-auto">
          {gitScenarioCategories.map((category) => (
            <div key={category} className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{category}</p>
              <div className="space-y-1">
                {gitScenarios
                  .filter((s) => s.category === category)
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => selectScenario(s.id)}
                      className={cn(
                        "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                        s.id === selectedId
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-secondary/20 text-foreground hover:bg-secondary/40"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-primary" />
            {scenario.label}
          </CardTitle>
          <CardDescription>{scenario.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {scenario.params.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {scenario.params.map((param) => (
                <div key={param.key} className="space-y-1.5">
                  <Label htmlFor={`git-${param.key}`}>{param.label}</Label>
                  <Input
                    id={`git-${param.key}`}
                    value={values[param.key] ?? ""}
                    onChange={(e) => setValues((prev) => ({ ...prev, [param.key]: e.target.value }))}
                    placeholder={param.placeholder}
                    className="font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Command</p>
            <pre className="overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-sm leading-relaxed text-foreground">
              {command}
            </pre>
            <CopyButton getText={() => command} label="Copy command" successMessage="Command copied" />
          </div>

          {scenario.note && (
            <p className="rounded-lg border border-border bg-secondary/20 p-3 text-xs text-muted-foreground">
              {scenario.note}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
