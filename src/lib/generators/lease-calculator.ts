export interface LeaseInput {
  squareFootage: number;
  baseRentPerSqft: number;
  nnnPerSqft: number;
  baseEscalationPercent: number;
  nnnEscalationPercent: number;
  leaseTermYears: number;
}

export const defaultLeaseInput: LeaseInput = {
  squareFootage: 2500,
  baseRentPerSqft: 28,
  nnnPerSqft: 9,
  baseEscalationPercent: 3,
  nnnEscalationPercent: 2,
  leaseTermYears: 5,
};

export interface LeaseYearRow {
  year: number;
  baseRentPerSqft: number;
  nnnPerSqft: number;
  totalPerSqft: number;
  annualTotal: number;
  monthlyTotal: number;
}

/** Builds a year-by-year rent roll, applying compounding annual escalation to base rent and NNN separately. */
export function buildRentRoll(input: LeaseInput): LeaseYearRow[] {
  const years = Math.max(Math.round(input.leaseTermYears), 1);
  const rows: LeaseYearRow[] = [];

  for (let year = 1; year <= years; year++) {
    const baseFactor = Math.pow(1 + input.baseEscalationPercent / 100, year - 1);
    const nnnFactor = Math.pow(1 + input.nnnEscalationPercent / 100, year - 1);

    const baseRentPerSqft = input.baseRentPerSqft * baseFactor;
    const nnnPerSqft = input.nnnPerSqft * nnnFactor;
    const totalPerSqft = baseRentPerSqft + nnnPerSqft;
    const annualTotal = totalPerSqft * input.squareFootage;
    const monthlyTotal = annualTotal / 12;

    rows.push({ year, baseRentPerSqft, nnnPerSqft, totalPerSqft, annualTotal, monthlyTotal });
  }

  return rows;
}
