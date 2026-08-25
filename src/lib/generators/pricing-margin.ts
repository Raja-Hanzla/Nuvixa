export interface PricingInput {
  cogs: number;
  targetMarginPercent: number;
  adCpaTarget: number;
  paymentFeePercent: number;
  paymentFeeFixed: number;
}

export const defaultPricingInput: PricingInput = {
  cogs: 12,
  targetMarginPercent: 40,
  adCpaTarget: 8,
  paymentFeePercent: 2.9,
  paymentFeeFixed: 0.3,
};

export interface PricingResult {
  requiredPrice: number;
  paymentFeeAmount: number;
  netAfterCogsAndFees: number;
  netAfterAds: number;
  actualMarginPercent: number;
}

/**
 * Solves for the retail price needed to hit a target profit margin after COGS, payment
 * processing fees (percentage + fixed), and a target ad acquisition cost — all expressed
 * as a share of, or amount against, the final price.
 *
 * price = (cogs + adCpaTarget + fixedFee) / (1 - targetMargin% - paymentFee%)
 */
export function calculateRequiredPrice(input: PricingInput): PricingResult {
  const marginFraction = input.targetMarginPercent / 100;
  const feeFraction = input.paymentFeePercent / 100;
  const denominator = 1 - marginFraction - feeFraction;

  const requiredPrice =
    denominator > 0 ? (input.cogs + input.adCpaTarget + input.paymentFeeFixed) / denominator : 0;

  const paymentFeeAmount = requiredPrice * feeFraction + input.paymentFeeFixed;
  const netAfterCogsAndFees = requiredPrice - input.cogs - paymentFeeAmount;
  const netAfterAds = netAfterCogsAndFees - input.adCpaTarget;
  const actualMarginPercent = requiredPrice > 0 ? (netAfterAds / requiredPrice) * 100 : 0;

  return { requiredPrice, paymentFeeAmount, netAfterCogsAndFees, netAfterAds, actualMarginPercent };
}
