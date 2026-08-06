export interface CampaignInput {
  adSpend: number;
  impressions: number;
  ctr: number;
  conversionRate: number;
  aov: number;
}

export const defaultCampaignInput: CampaignInput = {
  adSpend: 1000,
  impressions: 250000,
  ctr: 1.2,
  conversionRate: 2.5,
  aov: 65,
};

export interface CampaignResults {
  cpm: number;
  clicks: number;
  cpc: number;
  conversions: number;
  cpa: number;
  revenue: number;
  roas: number;
  roiPercent: number;
}

export function calculateCampaign(input: CampaignInput): CampaignResults {
  const adSpend = Math.max(input.adSpend, 0);
  const impressions = Math.max(input.impressions, 0);
  const ctr = Math.max(input.ctr, 0);
  const conversionRate = Math.max(input.conversionRate, 0);
  const aov = Math.max(input.aov, 0);

  const cpm = impressions > 0 ? (adSpend / impressions) * 1000 : 0;
  const clicks = impressions * (ctr / 100);
  const cpc = clicks > 0 ? adSpend / clicks : 0;
  const conversions = clicks * (conversionRate / 100);
  const cpa = conversions > 0 ? adSpend / conversions : 0;
  const revenue = conversions * aov;
  const roas = adSpend > 0 ? revenue / adSpend : 0;
  const roiPercent = adSpend > 0 ? ((revenue - adSpend) / adSpend) * 100 : 0;

  return { cpm, clicks, cpc, conversions, cpa, revenue, roas, roiPercent };
}
