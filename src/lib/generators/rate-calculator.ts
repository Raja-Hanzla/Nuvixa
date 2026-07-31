export interface RateFormState {
  currency: string;
  desiredAnnualIncome: number;
  annualExpenses: number;
  workWeeksPerYear: number;
  hoursPerWeek: number;
  billablePercentage: number;
  profitMargin: number;
  projectHours: number;
  clientName: string;
  projectName: string;
}

export const defaultRateForm: RateFormState = {
  currency: "USD",
  desiredAnnualIncome: 75000,
  annualExpenses: 8000,
  workWeeksPerYear: 48,
  hoursPerWeek: 35,
  billablePercentage: 70,
  profitMargin: 15,
  projectHours: 20,
  clientName: "",
  projectName: "",
};

export interface RateResults {
  totalWorkingHours: number;
  billableHours: number;
  baseIncomeNeeded: number;
  incomeWithMargin: number;
  hourlyRate: number;
  hoursPerDay: number;
  dayRate: number;
  weeklyRate: number;
  projectQuote: number;
}

export function calculateRate(form: RateFormState): RateResults {
  const totalWorkingHours = Math.max(form.workWeeksPerYear, 0) * Math.max(form.hoursPerWeek, 0);
  const billableHours = totalWorkingHours * (Math.min(Math.max(form.billablePercentage, 0), 100) / 100);
  const baseIncomeNeeded = Math.max(form.desiredAnnualIncome, 0) + Math.max(form.annualExpenses, 0);
  const incomeWithMargin = baseIncomeNeeded * (1 + Math.max(form.profitMargin, 0) / 100);

  const hourlyRate = billableHours > 0 ? incomeWithMargin / billableHours : 0;
  const hoursPerDay = form.hoursPerWeek > 0 ? form.hoursPerWeek / 5 : 8;
  const dayRate = hourlyRate * hoursPerDay;
  const weeklyRate = hourlyRate * form.hoursPerWeek;
  const projectQuote = hourlyRate * Math.max(form.projectHours, 0);

  return {
    totalWorkingHours,
    billableHours,
    baseIncomeNeeded,
    incomeWithMargin,
    hourlyRate,
    hoursPerDay,
    dayRate,
    weeklyRate,
    projectQuote,
  };
}
