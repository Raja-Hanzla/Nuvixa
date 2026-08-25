export interface DowntimeInput {
  hourlyTransactions: number;
  avgOrderValue: number;
  conversionImpactPercent: number;
  employeesIdled: number;
  avgHourlyWage: number;
  outageMinutes: number;
}

export const defaultDowntimeInput: DowntimeInput = {
  hourlyTransactions: 240,
  avgOrderValue: 85,
  conversionImpactPercent: 100,
  employeesIdled: 12,
  avgHourlyWage: 35,
  outageMinutes: 45,
};

export interface DowntimeResult {
  revenueLossPerHour: number;
  laborCostPerHour: number;
  totalCostPerHour: number;
  outageHours: number;
  totalRevenueLoss: number;
  totalLaborCost: number;
  totalCost: number;
  costPerMinute: number;
}

export function calculateDowntimeCost(input: DowntimeInput): DowntimeResult {
  const revenueLossPerHour =
    input.hourlyTransactions * input.avgOrderValue * (input.conversionImpactPercent / 100);
  const laborCostPerHour = input.employeesIdled * input.avgHourlyWage;
  const totalCostPerHour = revenueLossPerHour + laborCostPerHour;

  const outageHours = input.outageMinutes / 60;
  const totalRevenueLoss = revenueLossPerHour * outageHours;
  const totalLaborCost = laborCostPerHour * outageHours;
  const totalCost = totalRevenueLoss + totalLaborCost;
  const costPerMinute = totalCostPerHour / 60;

  return {
    revenueLossPerHour,
    laborCostPerHour,
    totalCostPerHour,
    outageHours,
    totalRevenueLoss,
    totalLaborCost,
    totalCost,
    costPerMinute,
  };
}
