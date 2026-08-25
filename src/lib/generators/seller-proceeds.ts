export interface SellerProceedsInput {
  salePrice: number;
  mortgagePayoff: number;
  agentCommissionPercent: number;
  transferTaxPercent: number;
  titleAndEscrowFees: number;
  sellerConcessions: number;
  repairCredits: number;
}

export const defaultSellerProceedsInput: SellerProceedsInput = {
  salePrice: 450000,
  mortgagePayoff: 210000,
  agentCommissionPercent: 5.5,
  transferTaxPercent: 0.5,
  titleAndEscrowFees: 2500,
  sellerConcessions: 3000,
  repairCredits: 1500,
};

export interface DeductionLine {
  label: string;
  amount: number;
}

export interface SellerProceedsResult {
  deductions: DeductionLine[];
  totalDeductions: number;
  netProceeds: number;
}

export function calculateSellerProceeds(input: SellerProceedsInput): SellerProceedsResult {
  const commissionAmount = input.salePrice * (input.agentCommissionPercent / 100);
  const transferTaxAmount = input.salePrice * (input.transferTaxPercent / 100);

  const deductions: DeductionLine[] = [
    { label: "Mortgage payoff", amount: input.mortgagePayoff },
    { label: `Agent commission (${input.agentCommissionPercent}%)`, amount: commissionAmount },
    { label: `Transfer tax (${input.transferTaxPercent}%)`, amount: transferTaxAmount },
    { label: "Title & escrow fees", amount: input.titleAndEscrowFees },
    { label: "Seller concessions to buyer", amount: input.sellerConcessions },
    { label: "Repair credits", amount: input.repairCredits },
  ];

  const totalDeductions = deductions.reduce((sum, d) => sum + d.amount, 0);
  const netProceeds = input.salePrice - totalDeductions;

  return { deductions, totalDeductions, netProceeds };
}
