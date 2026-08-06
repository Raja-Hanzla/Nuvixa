export interface UtmInput {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export const defaultUtmInput: UtmInput = {
  url: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};

export interface UtmPreset {
  label: string;
  source: string;
  medium: string;
}

export const utmPresets: UtmPreset[] = [
  { label: "Google / CPC", source: "google", medium: "cpc" },
  { label: "Facebook / CPC", source: "facebook", medium: "cpc" },
  { label: "Instagram / Social", source: "instagram", medium: "social" },
  { label: "LinkedIn / Social", source: "linkedin", medium: "social" },
  { label: "Newsletter / Email", source: "newsletter", medium: "email" },
];

function ensureProtocol(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return trimmed;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Builds a full UTM-tagged URL, or null if the base URL isn't valid. */
export function buildUtmUrl(input: UtmInput): string | null {
  const base = ensureProtocol(input.url);
  if (!base) return null;

  let parsed: URL;
  try {
    parsed = new URL(base);
  } catch {
    return null;
  }

  const params: [string, string][] = [
    ["utm_source", input.source.trim()],
    ["utm_medium", input.medium.trim()],
    ["utm_campaign", input.campaign.trim()],
    ["utm_term", input.term.trim()],
    ["utm_content", input.content.trim()],
  ];

  for (const [key, value] of params) {
    if (value) parsed.searchParams.set(key, value);
  }

  return parsed.toString();
}

export interface SavedCampaign {
  id: string;
  label: string;
  url: string;
  createdAt: number;
}

export const UTM_STORAGE_KEY = "nuvixa:utm-campaigns";
