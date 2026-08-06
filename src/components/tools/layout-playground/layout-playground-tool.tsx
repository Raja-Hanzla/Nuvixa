"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  buildFlexCss,
  buildGridCss,
  defaultFlexConfig,
  defaultGridConfig,
  flexDirectionOptions,
  justifyContentOptions,
  alignItemsOptions,
  flexWrapOptions,
  gridAlignOptions,
  previewColor,
  type FlexConfig,
  type GridConfig,
} from "@/lib/generators/layout-playground";

type Mode = "flex" | "grid";

export function LayoutPlaygroundTool() {
  const [mode, setMode] = React.useState<Mode>("flex");
  const [flex, setFlex] = React.useState<FlexConfig>(defaultFlexConfig);
  const [grid, setGrid] = React.useState<GridConfig>(defaultGridConfig);

  function updateFlex<K extends keyof FlexConfig>(key: K, value: FlexConfig[K]) {
    setFlex((prev) => ({ ...prev, [key]: value }));
  }
  function updateGrid<K extends keyof GridConfig>(key: K, value: GridConfig[K]) {
    setGrid((prev) => ({ ...prev, [key]: value }));
  }

  const itemCount = mode === "flex" ? flex.itemCount : grid.itemCount;
  const css = mode === "flex" ? buildFlexCss(flex) : buildGridCss(grid);

  const containerStyle: React.CSSProperties =
    mode === "flex"
      ? {
          display: "flex",
          flexDirection: flex.direction,
          justifyContent: flex.justify,
          alignItems: flex.align,
          flexWrap: flex.wrap,
          gap: `${flex.gap}px`,
        }
      : {
          display: "grid",
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          gap: `${grid.gap}px`,
          justifyItems: grid.justifyItems,
          alignItems: grid.alignItems,
        };

  return (
    <div className="space-y-6">
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
        <TabsList>
          <TabsTrigger value="flex">Flexbox</TabsTrigger>
          <TabsTrigger value="grid">Grid</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Every change updates the preview instantly.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {mode === "flex" ? (
              <>
                <SelectField
                  label="flex-direction"
                  value={flex.direction}
                  options={flexDirectionOptions}
                  onChange={(v) => updateFlex("direction", v as FlexConfig["direction"])}
                />
                <SelectField
                  label="justify-content"
                  value={flex.justify}
                  options={justifyContentOptions}
                  onChange={(v) => updateFlex("justify", v as FlexConfig["justify"])}
                />
                <SelectField
                  label="align-items"
                  value={flex.align}
                  options={alignItemsOptions}
                  onChange={(v) => updateFlex("align", v as FlexConfig["align"])}
                />
                <SelectField
                  label="flex-wrap"
                  value={flex.wrap}
                  options={flexWrapOptions}
                  onChange={(v) => updateFlex("wrap", v as FlexConfig["wrap"])}
                />
                <SliderField label="gap" value={flex.gap} min={0} max={48} unit="px" onChange={(v) => updateFlex("gap", v)} />
                <SliderField
                  label="items"
                  value={flex.itemCount}
                  min={1}
                  max={12}
                  onChange={(v) => updateFlex("itemCount", v)}
                />
              </>
            ) : (
              <>
                <SliderField
                  label="columns"
                  value={grid.columns}
                  min={1}
                  max={6}
                  onChange={(v) => updateGrid("columns", v)}
                />
                <SliderField label="rows" value={grid.rows} min={1} max={4} onChange={(v) => updateGrid("rows", v)} />
                <SliderField label="gap" value={grid.gap} min={0} max={48} unit="px" onChange={(v) => updateGrid("gap", v)} />
                <SelectField
                  label="justify-items"
                  value={grid.justifyItems}
                  options={gridAlignOptions}
                  onChange={(v) => updateGrid("justifyItems", v as GridConfig["justifyItems"])}
                />
                <SelectField
                  label="align-items"
                  value={grid.alignItems}
                  options={gridAlignOptions}
                  onChange={(v) => updateGrid("alignItems", v as GridConfig["alignItems"])}
                />
                <SliderField
                  label="items"
                  value={grid.itemCount}
                  min={1}
                  max={16}
                  onChange={(v) => updateGrid("itemCount", v)}
                />
              </>
            )}
          </CardContent>
        </Card>

        {/* Preview + CSS output */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[280px] rounded-lg border border-border bg-secondary/30 p-4">
                <div style={containerStyle} className="min-h-[248px] w-full">
                  {Array.from({ length: itemCount }, (_, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: previewColor(i) }}
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md text-sm font-semibold text-white/90 shadow-sm"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
              <CardDescription>Copy this straight into your stylesheet.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg border border-border bg-secondary/40 p-4 font-mono text-sm text-foreground">
                {css}
              </pre>
              <div className="mt-4">
                <CopyButton getText={() => css} label="Copy CSS" successMessage="CSS copied" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="font-mono text-xs">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="font-mono text-xs">{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}
