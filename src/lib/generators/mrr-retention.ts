export interface MrrInput {
  startingMrr: number;
  newMrr: number;
  expansionMrr: number;
  contractionMrr: number;
  churnedMrr: number;
}

export const defaultMrrInput: MrrInput = {
  startingMrr: 100000,
  newMrr: 12000,
  expansionMrr: 8000,
  contractionMrr: 3000,
  churnedMrr: 5000,
};

export interface MrrResults {
  netNewMrr: number;
  endingMrr: number;
  growthRatePercent: number;
  nrrPercent: number;
  grrPercent: number;
  netChurnPercent: number;
  grossChurnPercent: number;
}

export function calculateMrrMetrics(input: MrrInput): MrrResults {
  const { startingMrr, newMrr, expansionMrr, contractionMrr, churnedMrr } = input;

  const netNewMrr = newMrr + expansionMrr - contractionMrr - churnedMrr;
  const endingMrr = startingMrr + netNewMrr;

  const safeStart = startingMrr > 0 ? startingMrr : 1;

  // NRR: revenue retained + expanded from the EXISTING customer base only — excludes new customers.
  const nrrPercent = ((startingMrr + expansionMrr - contractionMrr - churnedMrr) / safeStart) * 100;
  // GRR: same but ignores expansion upside — never exceeds 100%, a "worst case" retention view.
  const grrPercent = ((startingMrr - contractionMrr - churnedMrr) / safeStart) * 100;

  const netChurnPercent = ((churnedMrr + contractionMrr - expansionMrr) / safeStart) * 100;
  const grossChurnPercent = (churnedMrr / safeStart) * 100;
  const growthRatePercent = (netNewMrr / safeStart) * 100;

  return { netNewMrr, endingMrr, growthRatePercent, nrrPercent, grrPercent, netChurnPercent, grossChurnPercent };
}
