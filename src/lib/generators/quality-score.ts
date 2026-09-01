export type ComponentRating = "below" | "average" | "above";

export interface ComponentRatings {
  expectedCtr: ComponentRating;
  landingPageExperience: ComponentRating;
  adRelevance: ComponentRating;
}

export const ratingLabels: Record<ComponentRating, string> = {
  below: "Below average",
  average: "Average",
  above: "Above average",
};

export const defaultRatings: ComponentRatings = {
  expectedCtr: "average",
  landingPageExperience: "average",
  adRelevance: "average",
};

const ratingScore: Record<ComponentRating, number> = { below: 3, average: 6, above: 9 };

/**
 * Illustrative component weights based on third-party analysis of real accounts (not officially
 * published by Google, which discloses that Expected CTR is weighted most heavily but not by how much).
 */
const WEIGHTS = { expectedCtr: 0.39, landingPageExperience: 0.39, adRelevance: 0.22 };

export function estimateQualityScore(ratings: ComponentRatings): number {
  const raw =
    ratingScore[ratings.expectedCtr] * WEIGHTS.expectedCtr +
    ratingScore[ratings.landingPageExperience] * WEIGHTS.landingPageExperience +
    ratingScore[ratings.adRelevance] * WEIGHTS.adRelevance;
  return Math.max(1, Math.min(10, Math.round(raw)));
}

/**
 * Google's documented Ad Rank formula is (simplified): Ad Rank = Max CPC bid x Quality Score.
 * For two advertisers achieving the same Ad Rank, their required bids are inversely proportional
 * to their Quality Scores. This models relative CPC against a Quality Score of 5 (commonly cited
 * as the historical account-wide average, and as the "neutral point" in Quality Score literature).
 */
const BASELINE_QS = 5;

export function cpcMultiplier(qualityScore: number): number {
  return BASELINE_QS / qualityScore;
}

export function cpcPercentChange(qualityScore: number): number {
  return (cpcMultiplier(qualityScore) - 1) * 100;
}

export function projectedCpc(currentCpc: number, currentQs: number, targetQs: number): number {
  if (currentQs <= 0) return currentCpc;
  return currentCpc * (currentQs / targetQs);
}

export const qualityScoreScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
