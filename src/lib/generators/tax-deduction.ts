function randomId(): string {
  return Math.random().toString(36).slice(2, 9);
}

export interface MileagePeriod {
  label: string;
  startDate: string;
  endDate: string;
  ratePerMile: number;
}

/**
 * IRS standard business mileage rates. The IRS made a rare mid-year adjustment in 2026
 * (effective July 1) due to rising fuel prices — most calculators miss this and apply one
 * flat rate to the whole year, which under- or over-states deductions for mileage logged
 * across both halves. Update this table when the IRS publishes new rates.
 */
export const mileageRatePeriods: MileagePeriod[] = [
  { label: "2025", startDate: "2025-01-01", endDate: "2025-12-31", ratePerMile: 0.7 },
  { label: "2026 (Jan 1 – Jun 30)", startDate: "2026-01-01", endDate: "2026-06-30", ratePerMile: 0.725 },
  { label: "2026 (Jul 1 – Dec 31)", startDate: "2026-07-01", endDate: "2026-12-31", ratePerMile: 0.76 },
];

export function getMileageRate(dateStr: string): number {
  const period = mileageRatePeriods.find((p) => dateStr >= p.startDate && dateStr <= p.endDate);
  if (period) return period.ratePerMile;
  return mileageRatePeriods[mileageRatePeriods.length - 1].ratePerMile;
}

export interface MileageEntry {
  id: string;
  date: string;
  miles: number;
  purpose: string;
}

export function newMileageEntry(): MileageEntry {
  return { id: randomId(), date: new Date().toISOString().slice(0, 10), miles: 0, purpose: "" };
}

export type ExpenseCategory =
  | "home_office"
  | "software"
  | "equipment"
  | "marketing"
  | "professional_services"
  | "travel"
  | "meals"
  | "insurance"
  | "other";

export const expenseCategoryLabels: Record<ExpenseCategory, string> = {
  home_office: "Home office / utilities",
  software: "Software & subscriptions",
  equipment: "Equipment & supplies",
  marketing: "Marketing & advertising",
  professional_services: "Professional services (legal, accounting)",
  travel: "Travel (flights, hotels)",
  meals: "Business meals (50% deductible)",
  insurance: "Business insurance",
  other: "Other business expense",
};

/** IRS generally limits business meal deductions to 50%; other ordinary business expenses are fully deductible. */
export const expenseDeductiblePercent: Record<ExpenseCategory, number> = {
  home_office: 100,
  software: 100,
  equipment: 100,
  marketing: 100,
  professional_services: 100,
  travel: 100,
  meals: 50,
  insurance: 100,
  other: 100,
};

export interface ExpenseEntry {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
}

export function newExpenseEntry(): ExpenseEntry {
  return { id: randomId(), category: "software", description: "", amount: 0 };
}

export function calculateMileageDeduction(entries: MileageEntry[]): number {
  return entries.reduce((sum, e) => sum + (Number(e.miles) || 0) * getMileageRate(e.date), 0);
}

export function calculateExpenseDeduction(entries: ExpenseEntry[]): number {
  return entries.reduce(
    (sum, e) => sum + (Number(e.amount) || 0) * (expenseDeductiblePercent[e.category] / 100),
    0
  );
}
