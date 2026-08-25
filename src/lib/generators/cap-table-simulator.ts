export type RoundType = "safe" | "priced";

export interface SafeRoundInput {
  id: string;
  type: "safe";
  label: string;
  amount: number;
  cap: number;
  discount: number;
}

export interface PricedRoundInput {
  id: string;
  type: "priced";
  label: string;
  amount: number;
  preMoney: number;
  poolTopUpPercent: number;
}

export type RoundInput = SafeRoundInput | PricedRoundInput;

function randomId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function newSafeRound(index: number): SafeRoundInput {
  return {
    id: randomId(),
    type: "safe",
    label: `SAFE ${index}`,
    amount: 250000,
    cap: 5000000,
    discount: 20,
  };
}

export function newPricedRound(index: number): PricedRoundInput {
  return {
    id: randomId(),
    type: "priced",
    label: `Series ${String.fromCharCode(64 + index)}`,
    amount: 3000000,
    preMoney: 12000000,
    poolTopUpPercent: 10,
  };
}

export const FOUNDERS_LABEL = "Founders";
export const OPTION_POOL_LABEL = "Option Pool";

export interface Stakeholder {
  name: string;
  percent: number;
}

export interface RoundSnapshot {
  roundId: string;
  roundLabel: string;
  roundType: RoundType;
  investorPercentThisRound: number;
  poolAddedThisRound: number;
  stakeholders: Stakeholder[];
  founderPercent: number;
}

function dilute(table: Stakeholder[], newPercent: number): Stakeholder[] {
  const factor = 1 - newPercent / 100;
  return table.map((s) => ({ ...s, percent: s.percent * factor }));
}

function addOrMerge(table: Stakeholder[], name: string, percent: number): Stakeholder[] {
  const index = table.findIndex((s) => s.name === name);
  if (index >= 0) {
    const copy = [...table];
    copy[index] = { ...copy[index], percent: copy[index].percent + percent };
    return copy;
  }
  return [...table, { name, percent }];
}

/**
 * Simulates sequential dilution across SAFEs and priced rounds.
 *
 * Simplifications, stated plainly: SAFEs are modeled as converting immediately at their own
 * valuation cap (adjusted by discount, if any) rather than waiting for the next priced round —
 * a common simplification for quick modeling. Priced rounds correctly apply an option-pool
 * "shuffle" (pool dilutes existing holders before the new investor's percentage is calculated),
 * which is the detail most back-of-envelope calculators get wrong.
 */
export function simulateCapTable(rounds: RoundInput[]): RoundSnapshot[] {
  let table: Stakeholder[] = [{ name: FOUNDERS_LABEL, percent: 100 }];
  const snapshots: RoundSnapshot[] = [];

  for (const round of rounds) {
    let poolAddedThisRound = 0;
    let investorPercentThisRound = 0;
    const label = round.label.trim() || (round.type === "safe" ? "SAFE" : "Priced Round");

    if (round.type === "safe") {
      const effectiveCap = round.discount > 0 ? round.cap * (1 - round.discount / 100) : round.cap;
      investorPercentThisRound = effectiveCap > 0 ? Math.min((round.amount / effectiveCap) * 100, 100) : 0;
      table = dilute(table, investorPercentThisRound);
      table = addOrMerge(table, label, investorPercentThisRound);
    } else {
      if (round.poolTopUpPercent > 0) {
        poolAddedThisRound = round.poolTopUpPercent;
        table = dilute(table, poolAddedThisRound);
        table = addOrMerge(table, OPTION_POOL_LABEL, poolAddedThisRound);
      }
      const postMoney = round.preMoney + round.amount;
      investorPercentThisRound = postMoney > 0 ? (round.amount / postMoney) * 100 : 0;
      table = dilute(table, investorPercentThisRound);
      table = addOrMerge(table, label, investorPercentThisRound);
    }

    const founder = table.find((s) => s.name === FOUNDERS_LABEL);

    snapshots.push({
      roundId: round.id,
      roundLabel: label,
      roundType: round.type,
      investorPercentThisRound,
      poolAddedThisRound,
      stakeholders: table.map((s) => ({ ...s })),
      founderPercent: founder?.percent ?? 0,
    });
  }

  return snapshots;
}
