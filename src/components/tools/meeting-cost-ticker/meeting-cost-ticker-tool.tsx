"use client";

import * as React from "react";
import { Play, Pause, RotateCcw, Users, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/tools/copy-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currencies, currencySymbol } from "@/lib/generators/invoice";
import {
  calculateMeetingCost,
  costPerHour,
  costPerMinute,
  defaultMeetingCostInput,
  formatDuration,
  type MeetingCostInput,
} from "@/lib/generators/meeting-cost";
import { cn, formatCurrency } from "@/lib/utils";

export function MeetingCostTickerTool() {
  const [input, setInput] = React.useState<MeetingCostInput>(defaultMeetingCostInput);
  const [currency, setCurrency] = React.useState("USD");
  const [isRunning, setIsRunning] = React.useState(false);
  const [baseElapsedMs, setBaseElapsedMs] = React.useState(0);
  const [, setTick] = React.useState(0);
  const startedAtRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(id);
  }, [isRunning]);

  const elapsedMs =
    baseElapsedMs + (isRunning && startedAtRef.current ? Date.now() - startedAtRef.current : 0);

  function handleStart() {
    if (isRunning) return;
    startedAtRef.current = Date.now();
    setIsRunning(true);
  }

  function handlePause() {
    if (!isRunning) return;
    setBaseElapsedMs((prev) => prev + (startedAtRef.current ? Date.now() - startedAtRef.current : 0));
    startedAtRef.current = null;
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    startedAtRef.current = null;
    setBaseElapsedMs(0);
  }

  function update<K extends keyof MeetingCostInput>(key: K, value: MeetingCostInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const cost = calculateMeetingCost(input, elapsedMs);
  const symbol = currencySymbol(currency);
  const formattedCost = formatCurrency(cost, currency);
  const [wholePart, centsPart] = formattedCost.split(".");

  function summaryText() {
    return [
      `Meeting cost so far: ${formattedCost}`,
      `Duration: ${formatDuration(elapsedMs)}`,
      `${input.attendees} people at ${formatCurrency(input.hourlyWage, currency)}/hr avg`,
      `Burn rate: ${formatCurrency(costPerMinute(input), currency)}/min`,
    ].join("\n");
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      {/* Live ticker */}
      <div className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-border bg-foreground shadow-lg">
          <div className="flex flex-col items-center px-6 py-14 text-center">
            <span className="rounded-full border border-background/15 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-background/60">
              {isRunning ? "Meeting in progress" : baseElapsedMs > 0 ? "Paused" : "Ready to start"}
            </span>

            <p className="mt-6 whitespace-nowrap font-mono text-5xl font-bold tracking-tight text-background sm:text-6xl md:text-7xl">
              {wholePart}
              {centsPart && (
                <span className="text-background/50 text-3xl sm:text-4xl md:text-5xl">.{centsPart}</span>
              )}
            </p>

            <p className="mt-3 font-mono text-sm text-background/60">
              {formatDuration(elapsedMs)} elapsed &middot; {formatCurrency(costPerMinute(input), currency)}/min burn rate
            </p>

            <div className="mt-8 flex items-center gap-3">
              {!isRunning ? (
                <Button size="lg" onClick={handleStart} className="min-w-32">
                  <Play className="h-4 w-4" />
                  {baseElapsedMs > 0 ? "Resume" : "Start meeting"}
                </Button>
              ) : (
                <Button size="lg" variant="secondary" onClick={handlePause} className="min-w-32">
                  <Pause className="h-4 w-4" />
                  Pause
                </Button>
              )}
              <Button size="lg" variant="ghost" onClick={handleReset} className="text-background/70 hover:bg-background/10 hover:text-background">
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label="Per minute" value={formatCurrency(costPerMinute(input), currency)} />
          <Stat label="Per hour" value={formatCurrency(costPerHour(input), currency)} />
          <Stat label="Attendees" value={String(input.attendees)} className="hidden sm:flex" />
        </div>

        <div className="mt-4">
          <CopyButton getText={summaryText} label="Copy summary" successMessage="Meeting summary copied" className="w-full sm:w-auto" />
        </div>
      </div>

      {/* Setup */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Meeting setup</CardTitle>
            <CardDescription>Adjust these any time, even mid-meeting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="mc-attendees" className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                Number of attendees
              </Label>
              <Input
                id="mc-attendees"
                type="number"
                min={1}
                value={input.attendees}
                onChange={(e) => update("attendees", Number(e.target.value))}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mc-wage" className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                Average hourly wage ({symbol})
              </Label>
              <Input
                id="mc-wage"
                type="number"
                min={0}
                step="0.01"
                value={input.hourlyWage}
                onChange={(e) => update("hourlyWage", Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                A rough blended average across everyone in the room works fine.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mc-currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="mc-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-border bg-card px-4 py-3", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="mono-nums font-display text-lg font-semibold text-foreground">{value}</span>
    </div>
  );
}
