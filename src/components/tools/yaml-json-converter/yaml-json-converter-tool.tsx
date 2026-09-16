"use client";

import * as React from "react";
import { RotateCcw, RefreshCw, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/tools/copy-button";
import { yamlToJson, jsonToYaml, sampleYaml } from "@/lib/generators/yaml-json-converter";

type Direction = "yamlToJson" | "jsonToYaml";

const sampleJson = JSON.stringify(
  {
    name: "nuvixa-api",
    version: "1.4.2",
    debug: false,
    database: { host: "db.internal", port: 5432, ssl: true },
    tags: ["production", "api", "v1"],
  },
  null,
  2
);

export function YamlJsonConverterTool() {
  const [direction, setDirection] = React.useState<Direction>("yamlToJson");
  const [yamlInput, setYamlInput] = React.useState(sampleYaml);
  const [jsonInput, setJsonInput] = React.useState(sampleJson);

  const result = direction === "yamlToJson" ? yamlToJson(yamlInput) : jsonToYaml(jsonInput);

  const inputLabel = direction === "yamlToJson" ? "YAML" : "JSON";
  const outputLabel = direction === "yamlToJson" ? "JSON" : "YAML";
  const inputValue = direction === "yamlToJson" ? yamlInput : jsonInput;
  const setInputValue = direction === "yamlToJson" ? setYamlInput : setJsonInput;

  function loadSample() {
    setYamlInput(sampleYaml);
    setJsonInput(sampleJson);
  }

  return (
    <div className="space-y-6">
      <Tabs value={direction} onValueChange={(v) => setDirection(v as Direction)}>
        <TabsList>
          <TabsTrigger value="yamlToJson">YAML → JSON</TabsTrigger>
          <TabsTrigger value="jsonToYaml">JSON → YAML</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{inputLabel}</CardTitle>
            <CardDescription>Paste or edit your {inputLabel} below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              rows={16}
              spellCheck={false}
              className="font-mono text-xs"
            />
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost" onClick={loadSample} className="text-muted-foreground">
                <RotateCcw className="h-4 w-4" />
                Load sample
              </Button>
              <Button variant="ghost" onClick={() => setInputValue("")} className="text-muted-foreground">
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" />
              {outputLabel}
            </CardTitle>
            <CardDescription>Updates instantly as you type.</CardDescription>
          </CardHeader>
          <CardContent>
            {!result.success ? (
              <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div>
                  <p className="text-sm font-medium text-destructive">Couldn&apos;t parse that {inputLabel}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{result.error}</p>
                </div>
              </div>
            ) : !result.output ? (
              <p className="rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-10 text-center text-sm text-muted-foreground">
                Paste some {inputLabel} on the left to see the converted {outputLabel}.
              </p>
            ) : (
              <>
                <pre className="max-h-[420px] overflow-auto rounded-lg border border-border bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground">
                  {result.output}
                </pre>
                <div className="mt-4">
                  <CopyButton getText={() => result.output} label={`Copy ${outputLabel}`} successMessage={`${outputLabel} copied`} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
