export interface MarginInput {
  salesPrice: number;
  cogs: number;
  shippingCost: number;
  packagingCost: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
}

export const defaultMarginInput: MarginInput = {
  salesPrice: 39.99,
  cogs: 8.5,
  shippingCost: 4.5,
  packagingCost: 1.0,
  paymentFeePercent: 2.9,
  paymentFeeFixed: 0.3,
};

export interface UnitEconomics {
  paymentFeeAmount: number;
  totalCostPerUnit: number;
  grossProfitPerUnit: number;
  grossMarginPercent: number;
}

export function calculateUnitEconomics(input: MarginInput): UnitEconomics {
  const paymentFeeAmount = input.salesPrice * (input.paymentFeePercent / 100) + input.paymentFeeFixed;
  const totalCostPerUnit = input.cogs + input.shippingCost + input.packagingCost + paymentFeeAmount;
  const grossProfitPerUnit = input.salesPrice - totalCostPerUnit;
  const grossMarginPercent = input.salesPrice > 0 ? (grossProfitPerUnit / input.salesPrice) * 100 : 0;

  return { paymentFeeAmount, totalCostPerUnit, grossProfitPerUnit, grossMarginPercent };
}

export interface MatrixRow {
  targetMarginPercent: number;
  achievable: boolean;
  maxAdSpendPerSale: number;
  requiredRoas: number | null;
}

/** Default margin scenarios shown in the matrix: break-even, then three profit targets. */
export const marginTargets = [0, 10, 20, 30];

export function buildMarginMatrix(input: MarginInput): MatrixRow[] {
  const { grossProfitPerUnit } = calculateUnitEconomics(input);

  return marginTargets.map((targetMarginPercent) => {
    const requiredProfit = input.salesPrice * (targetMarginPercent / 100);
    const maxAdSpendPerSale = grossProfitPerUnit - requiredProfit;
    const achievable = maxAdSpendPerSale > 0;
    const requiredRoas = achievable ? input.salesPrice / maxAdSpendPerSale : null;

    return { targetMarginPercent, achievable, maxAdSpendPerSale, requiredRoas };
  });
}
