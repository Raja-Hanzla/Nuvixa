export interface LeaseVsBuyInput {
  equipmentCost: number;
  usefulLifeYears: number;
  taxRatePercent: number;
  monthlyLeasePayment: number;
  analysisPeriodYears: number;
  discountRatePercent: number;
}

export const defaultLeaseVsBuyInput: LeaseVsBuyInput = {
  equipmentCost: 120000,
  usefulLifeYears: 5,
  taxRatePercent: 25,
  monthlyLeasePayment: 2400,
  analysisPeriodYears: 5,
  discountRatePercent: 8,
};

export interface YearRow {
  year: number;
  buyCashFlow: number;
  buyCumulative: number;
  leaseCashFlow: number;
  leaseCumulative: number;
}

export interface LeaseVsBuyResult {
  rows: YearRow[];
  buyNpv: number;
  leaseNpv: number;
  cheaperOption: "buy" | "lease" | "tie";
  npvDifference: number;
}

export function calculateLeaseVsBuy(input: LeaseVsBuyInput): LeaseVsBuyResult {
  const years = Math.max(Math.round(input.analysisPeriodYears), 1);
  const annualDepreciation = input.usefulLifeYears > 0 ? input.equipmentCost / input.usefulLifeYears : 0;
  const depreciationTaxShield = annualDepreciation * (input.taxRatePercent / 100);
  const annualLease = input.monthlyLeasePayment * 12;
  const leaseTaxShield = annualLease * (input.taxRatePercent / 100);
  const afterTaxLeaseCost = annualLease - leaseTaxShield;
  const discountRate = input.discountRatePercent / 100;

  const rows: YearRow[] = [];
  let buyCumulative = -input.equipmentCost;
  let leaseCumulative = 0;
  let buyNpv = -input.equipmentCost;
  let leaseNpv = 0;

  rows.push({ year: 0, buyCashFlow: -input.equipmentCost, buyCumulative, leaseCashFlow: 0, leaseCumulative });

  for (let year = 1; year <= years; year++) {
    const buyCashFlow = year <= input.usefulLifeYears ? depreciationTaxShield : 0;
    const leaseCashFlow = -afterTaxLeaseCost;

    buyCumulative += buyCashFlow;
    leaseCumulative += leaseCashFlow;

    const discountFactor = Math.pow(1 + discountRate, year);
    buyNpv += buyCashFlow / discountFactor;
    leaseNpv += leaseCashFlow / discountFactor;

    rows.push({ year, buyCashFlow, buyCumulative, leaseCashFlow, leaseCumulative });
  }

  const npvDifference = buyNpv - leaseNpv;
  const cheaperOption = Math.abs(npvDifference) < 1 ? "tie" : npvDifference > 0 ? "buy" : "lease";

  return { rows, buyNpv, leaseNpv, cheaperOption, npvDifference };
}
