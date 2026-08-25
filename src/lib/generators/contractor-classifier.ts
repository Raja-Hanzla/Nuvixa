export type FactorCategory = "behavioral" | "financial" | "relationship";

export interface ClassificationFactor {
  id: string;
  category: FactorCategory;
  /** Phrased so that "true" (checked) indicates an employee-like characteristic. */
  label: string;
}

export const factorCategoryLabels: Record<FactorCategory, string> = {
  behavioral: "Behavioral control",
  financial: "Financial control",
  relationship: "Relationship of the parties",
};

export const classificationFactors: ClassificationFactor[] = [
  { id: "hours", category: "behavioral", label: "Company sets specific hours the worker must work" },
  { id: "training", category: "behavioral", label: "Company provides training on how to do the job" },
  { id: "tools", category: "behavioral", label: "Company provides the tools or equipment used" },
  { id: "location", category: "behavioral", label: "Work must be performed at the company's location" },
  { id: "supervision", category: "behavioral", label: "Company directly supervises day-to-day work" },
  { id: "expenses", category: "financial", label: "Worker has few or no unreimbursed business expenses" },
  { id: "multiple_clients", category: "financial", label: "Worker does not work for other clients simultaneously" },
  { id: "regular_wage", category: "financial", label: "Worker is paid a regular wage or salary, not per-project" },
  { id: "profit_loss", category: "financial", label: "Worker has no real opportunity for profit or loss" },
  { id: "written_contract", category: "relationship", label: "There's no written contract specifying contractor status" },
  { id: "benefits", category: "relationship", label: "Worker receives employee-style benefits (health insurance, PTO)" },
  { id: "indefinite", category: "relationship", label: "The relationship is expected to be ongoing, not project-based" },
  { id: "core_business", category: "relationship", label: "Worker's services are a key part of the company's regular business" },
];

export interface ClassificationResult {
  checkedCount: number;
  totalCount: number;
  riskPercent: number;
  riskBand: "Low" | "Moderate" | "High" | "Very High";
  categoryBreakdown: Record<FactorCategory, { checked: number; total: number }>;
}

export function evaluateClassification(checked: Set<string>): ClassificationResult {
  const totalCount = classificationFactors.length;
  const checkedCount = classificationFactors.filter((f) => checked.has(f.id)).length;
  const riskPercent = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  let riskBand: ClassificationResult["riskBand"];
  if (riskPercent <= 25) riskBand = "Low";
  else if (riskPercent <= 50) riskBand = "Moderate";
  else if (riskPercent <= 75) riskBand = "High";
  else riskBand = "Very High";

  const categoryBreakdown = {} as ClassificationResult["categoryBreakdown"];
  (["behavioral", "financial", "relationship"] as FactorCategory[]).forEach((cat) => {
    const factorsInCat = classificationFactors.filter((f) => f.category === cat);
    categoryBreakdown[cat] = {
      checked: factorsInCat.filter((f) => checked.has(f.id)).length,
      total: factorsInCat.length,
    };
  });

  return { checkedCount, totalCount, riskPercent, riskBand, categoryBreakdown };
}
