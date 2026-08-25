export interface PhoneticVariant {
  label: string;
  value: string;
}

interface SubRule {
  pattern: RegExp;
  replacement: string;
  label: string;
}

const phoneticRules: SubRule[] = [
  { pattern: /ph/gi, replacement: "f", label: "ph → f" },
  { pattern: /ck/gi, replacement: "k", label: "ck → k" },
  { pattern: /c(?=[aou])/gi, replacement: "k", label: "hard c → k" },
  { pattern: /c(?=[ei])/gi, replacement: "s", label: "soft c → s" },
  { pattern: /x/gi, replacement: "ks", label: "x → ks" },
  { pattern: /qu/gi, replacement: "kw", label: "qu → kw" },
  { pattern: /z/gi, replacement: "s", label: "z → s" },
  { pattern: /s/gi, replacement: "z", label: "s → z" },
  { pattern: /y/gi, replacement: "i", label: "y → i" },
  { pattern: /k/gi, replacement: "c", label: "k → c" },
  { pattern: /(.)\1/g, replacement: "$1", label: "double letters → single" },
];

export function generatePhoneticVariants(name: string): PhoneticVariant[] {
  const trimmed = name.trim();
  if (!trimmed) return [];
  const seen = new Set<string>([trimmed.toLowerCase()]);
  const variants: PhoneticVariant[] = [];

  for (const rule of phoneticRules) {
    const result = trimmed.replace(rule.pattern, rule.replacement);
    const key = result.toLowerCase();
    if (result !== trimmed && !seen.has(key)) {
      seen.add(key);
      variants.push({ label: rule.label, value: result });
    }
  }

  return variants;
}

const LOOKALIKE_MAP: Record<string, string> = { o: "0", i: "1", e: "3", a: "4", s: "5", t: "7" };

export function generateLookalikeVariants(name: string): PhoneticVariant[] {
  const trimmed = name.trim();
  if (!trimmed) return [];
  const variants: PhoneticVariant[] = [];

  const leet = trimmed
    .split("")
    .map((ch) => LOOKALIKE_MAP[ch.toLowerCase()] ?? ch)
    .join("");
  if (leet !== trimmed) variants.push({ label: "Number lookalikes", value: leet });

  // Adjacent-letter transpositions (capped to avoid overwhelming output on long names).
  const maxSwaps = Math.min(trimmed.length - 1, 5);
  for (let i = 0; i < maxSwaps; i++) {
    const chars = trimmed.split("");
    [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
    variants.push({ label: `Swapped letters ${i + 1}-${i + 2}`, value: chars.join("") });
  }

  // Single dropped-letter variants (capped).
  const maxDrops = Math.min(trimmed.length, 5);
  for (let i = 0; i < maxDrops; i++) {
    const dropped = trimmed.slice(0, i) + trimmed.slice(i + 1);
    if (dropped) variants.push({ label: `Missing letter ${i + 1}`, value: dropped });
  }

  return variants;
}

export interface WildcardTerm {
  label: string;
  value: string;
}

export function generateWildcardTerms(name: string): WildcardTerm[] {
  const trimmed = name.trim();
  if (!trimmed) return [];
  const terms: WildcardTerm[] = [
    { label: "Starts with (right truncation)", value: `${trimmed}*` },
    { label: "Ends with (left truncation)", value: `*${trimmed}` },
    { label: "Contains", value: `*${trimmed}*` },
  ];

  if (trimmed.length > 4) {
    const prefix = trimmed.slice(0, Math.ceil(trimmed.length / 2));
    terms.push({ label: "Root prefix", value: `${prefix}*` });
  }

  return terms;
}
