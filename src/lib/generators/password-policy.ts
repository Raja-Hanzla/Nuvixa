export type ComplianceFramework = "soc2" | "iso27001" | "hipaa" | "pcidss" | "gdpr" | "nist80063b";

export interface FrameworkBaseline {
  key: ComplianceFramework;
  label: string;
  minLength: number;
  requireUpper: boolean;
  requireLower: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  /** null = no mandated periodic rotation interval */
  maxAgeDays: number | null;
  historyCount: number;
  lockoutThreshold: number;
  mfaRequired: boolean;
  screenBreached: boolean;
  note: string;
}

/**
 * These are common, widely-cited industry baselines associated with each framework —
 * not verbatim requirements from the standards themselves. Most of these frameworks
 * (SOC 2, ISO 27001, HIPAA, GDPR) don't mandate exact numbers; they require a
 * "reasonable" or "appropriate" policy, which auditors evaluate contextually.
 */
export const frameworkBaselines: Record<ComplianceFramework, FrameworkBaseline> = {
  soc2: {
    key: "soc2",
    label: "SOC 2",
    minLength: 12,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: true,
    maxAgeDays: 90,
    historyCount: 4,
    lockoutThreshold: 5,
    mfaRequired: true,
    screenBreached: false,
    note: "SOC 2 doesn't mandate exact numbers — auditors evaluate whether your policy is reasonable for your risk profile. This reflects a common baseline auditors typically accept.",
  },
  iso27001: {
    key: "iso27001",
    label: "ISO 27001",
    minLength: 12,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: true,
    maxAgeDays: 90,
    historyCount: 4,
    lockoutThreshold: 5,
    mfaRequired: true,
    screenBreached: false,
    note: "ISO 27001 requires documented access control management without prescribing exact numbers — this reflects common practice among certified organizations.",
  },
  hipaa: {
    key: "hipaa",
    label: "HIPAA",
    minLength: 8,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: false,
    maxAgeDays: 90,
    historyCount: 3,
    lockoutThreshold: 5,
    mfaRequired: true,
    screenBreached: false,
    note: "HIPAA's Security Rule treats password specifics as \"addressable\" rather than fixed — covered entities set their own reasonable standard, shown here as a common baseline.",
  },
  pcidss: {
    key: "pcidss",
    label: "PCI DSS",
    minLength: 12,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: true,
    maxAgeDays: 90,
    historyCount: 4,
    lockoutThreshold: 6,
    mfaRequired: true,
    screenBreached: false,
    note: "PCI DSS is the most numerically explicit of these standards, with defined minimums for length, history, and lockout attempts.",
  },
  gdpr: {
    key: "gdpr",
    label: "GDPR",
    minLength: 10,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSpecial: false,
    maxAgeDays: null,
    historyCount: 2,
    lockoutThreshold: 10,
    mfaRequired: true,
    screenBreached: false,
    note: "GDPR requires \"appropriate\" technical measures without specifying password rules directly — this reflects a reasonable, defensible baseline.",
  },
  nist80063b: {
    key: "nist80063b",
    label: "NIST 800-63B",
    minLength: 8,
    requireUpper: false,
    requireLower: false,
    requireNumber: false,
    requireSpecial: false,
    maxAgeDays: null,
    historyCount: 1,
    lockoutThreshold: 10,
    mfaRequired: true,
    screenBreached: true,
    note: "NIST's modern guidance deliberately drops forced complexity and periodic rotation in favor of length and breached-password screening.",
  },
};

export const frameworkOrder: ComplianceFramework[] = [
  "soc2",
  "iso27001",
  "hipaa",
  "pcidss",
  "gdpr",
  "nist80063b",
];

export interface CombinedPolicy {
  frameworks: ComplianceFramework[];
  minLength: number;
  requireUpper: boolean;
  requireLower: boolean;
  requireNumber: boolean;
  requireSpecial: boolean;
  maxAgeDays: number | null;
  historyCount: number;
  lockoutThreshold: number;
  mfaRequired: boolean;
  screenBreached: boolean;
}

/** Combines selected frameworks by taking the strictest requirement on each dimension. */
export function combinePolicies(selected: ComplianceFramework[]): CombinedPolicy | null {
  if (selected.length === 0) return null;
  const baselines = selected.map((key) => frameworkBaselines[key]);
  const numericAges = baselines.map((b) => b.maxAgeDays).filter((v): v is number => v !== null);

  return {
    frameworks: selected,
    minLength: Math.max(...baselines.map((b) => b.minLength)),
    requireUpper: baselines.some((b) => b.requireUpper),
    requireLower: baselines.some((b) => b.requireLower),
    requireNumber: baselines.some((b) => b.requireNumber),
    requireSpecial: baselines.some((b) => b.requireSpecial),
    maxAgeDays: numericAges.length > 0 ? Math.min(...numericAges) : null,
    historyCount: Math.max(...baselines.map((b) => b.historyCount)),
    lockoutThreshold: Math.min(...baselines.map((b) => b.lockoutThreshold)),
    mfaRequired: baselines.some((b) => b.mfaRequired),
    screenBreached: baselines.some((b) => b.screenBreached),
  };
}

export function buildPolicyText(policy: CombinedPolicy, companyName: string): string {
  const frameworkLabels = policy.frameworks.map((f) => frameworkBaselines[f].label).join(", ");

  const composition = [
    policy.requireUpper && "at least one uppercase letter",
    policy.requireLower && "at least one lowercase letter",
    policy.requireNumber && "at least one number",
    policy.requireSpecial && "at least one special character",
  ].filter((v): v is string => Boolean(v));

  const rules: string[] = [
    `Minimum length: ${policy.minLength} characters`,
    composition.length > 0 ? `Must include: ${composition.join(", ")}` : "No mandated character composition rules",
    policy.maxAgeDays
      ? `Maximum password age: ${policy.maxAgeDays} days`
      : "No mandatory rotation interval — rotate only if compromise is suspected",
    `Password history: may not reuse the last ${policy.historyCount} password(s)`,
    `Account lockout: after ${policy.lockoutThreshold} consecutive failed login attempts`,
  ];

  if (policy.mfaRequired) rules.push("Multi-factor authentication (MFA) is required for all accounts");
  if (policy.screenBreached) rules.push("New passwords must be screened against known breached-password lists");

  return [
    `${companyName || "[Company Name]"} — Password Policy`,
    `Baseline aligned with: ${frameworkLabels}`,
    "",
    ...rules.map((rule) => `- ${rule}`),
    "",
    "Note: this is a starting-point draft generated from common industry baselines, not a certified",
    "or legally-reviewed policy. Have your compliance officer, security lead, or auditor review and",
    "adapt it — actual requirements depend on your auditor's assessment of your specific environment.",
  ].join("\n");
}
