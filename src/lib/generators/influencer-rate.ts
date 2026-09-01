export type Niche = "finance_tech" | "beauty_fashion" | "fitness_health" | "gaming" | "food" | "lifestyle_general";
export type DeliverableFormat =
  | "ig_feed_post"
  | "ig_story"
  | "ig_reel"
  | "tiktok_video"
  | "youtube_dedicated"
  | "youtube_integration";

export const deliverableBaseRates: Record<DeliverableFormat, { label: string; ratePer1000: number }> = {
  ig_feed_post: { label: "Instagram feed post", ratePer1000: 10 },
  ig_story: { label: "Instagram Story (3-5 frame set)", ratePer1000: 5 },
  ig_reel: { label: "Instagram Reel", ratePer1000: 12 },
  tiktok_video: { label: "TikTok video", ratePer1000: 8 },
  youtube_dedicated: { label: "YouTube dedicated video", ratePer1000: 20 },
  youtube_integration: { label: "YouTube integration (60-90s mention)", ratePer1000: 10 },
};

export const nicheMultipliers: Record<Niche, { label: string; multiplier: number }> = {
  finance_tech: { label: "Finance, B2B, or Tech", multiplier: 1.5 },
  beauty_fashion: { label: "Beauty or Fashion", multiplier: 1.1 },
  fitness_health: { label: "Fitness or Health", multiplier: 1.0 },
  gaming: { label: "Gaming", multiplier: 0.9 },
  food: { label: "Food", multiplier: 0.9 },
  lifestyle_general: { label: "Lifestyle / General", multiplier: 1.0 },
};

function getFollowerTier(followers: number): { label: string; benchmarkEngagement: number } {
  if (followers < 10000) return { label: "Nano (under 10K)", benchmarkEngagement: 6 };
  if (followers < 100000) return { label: "Micro (10K-100K)", benchmarkEngagement: 3 };
  if (followers < 500000) return { label: "Mid-tier (100K-500K)", benchmarkEngagement: 2 };
  return { label: "Macro/Mega (500K+)", benchmarkEngagement: 1 };
}

export interface RateInput {
  followers: number;
  engagementRate: number;
  niche: Niche;
  format: DeliverableFormat;
  numberOfDeliverables: number;
  includeUsageRights: boolean;
  includeExclusivity: boolean;
}

export const defaultRateInput: RateInput = {
  followers: 25000,
  engagementRate: 3.5,
  niche: "lifestyle_general",
  format: "ig_reel",
  numberOfDeliverables: 1,
  includeUsageRights: false,
  includeExclusivity: false,
};

export interface RateResult {
  tierLabel: string;
  benchmarkEngagement: number;
  engagementAdjustment: number;
  perDeliverableRate: number;
  usageRightsAddOn: number;
  exclusivityAddOn: number;
  subtotal: number;
  volumeDiscountPercent: number;
  totalPackagePrice: number;
  isGiftedRange: boolean;
}

export function calculateInfluencerRate(input: RateInput): RateResult {
  const format = deliverableBaseRates[input.format];
  const niche = nicheMultipliers[input.niche];
  const tier = getFollowerTier(input.followers);

  const baseRate = (input.followers / 1000) * format.ratePer1000 * niche.multiplier;

  const rawAdjustment = tier.benchmarkEngagement > 0 ? input.engagementRate / tier.benchmarkEngagement : 1;
  // Cap extreme outliers so a single unusually viral or unusually quiet post doesn't distort the estimate.
  const engagementAdjustment = Math.min(Math.max(rawAdjustment, 0.5), 2.5);

  const perDeliverableRate = baseRate * engagementAdjustment;
  const usageRightsAddOn = input.includeUsageRights ? perDeliverableRate * 0.75 : 0;
  const exclusivityAddOn = input.includeExclusivity ? perDeliverableRate * 0.25 : 0;

  const rateWithAddOns = perDeliverableRate + usageRightsAddOn + exclusivityAddOn;
  const count = Math.max(input.numberOfDeliverables, 1);
  const subtotal = rateWithAddOns * count;

  let volumeDiscountPercent = 0;
  if (count >= 6) volumeDiscountPercent = 15;
  else if (count >= 3) volumeDiscountPercent = 10;

  const totalPackagePrice = subtotal * (1 - volumeDiscountPercent / 100);

  return {
    tierLabel: tier.label,
    benchmarkEngagement: tier.benchmarkEngagement,
    engagementAdjustment,
    perDeliverableRate,
    usageRightsAddOn,
    exclusivityAddOn,
    subtotal,
    volumeDiscountPercent,
    totalPackagePrice,
    isGiftedRange: input.followers < 10000,
  };
}
