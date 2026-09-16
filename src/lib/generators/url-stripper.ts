export interface UrlParam {
  key: string;
  value: string;
  isTracking: boolean;
}

export interface ParsedUrl {
  valid: boolean;
  params: UrlParam[];
}

const TRACKING_PREFIXES = ["utm_"];

/** Common tracking / attribution query params from ad platforms, email tools, and social apps. */
const TRACKING_EXACT = new Set([
  "fbclid",
  "gclid",
  "gclsrc",
  "dclid",
  "msclkid",
  "yclid",
  "twclid",
  "ttclid",
  "igshid",
  "igsh",
  "mc_eid",
  "mc_cid",
  "_hsenc",
  "_hsmi",
  "hsctatracking",
  "ref_src",
  "ref_url",
  "wbraid",
  "gbraid",
  "vero_id",
  "vero_conv",
  "icid",
  "cmpid",
  "spm",
  "si",
  "mkt_tok",
  "oly_anon_id",
  "oly_enc_id",
  "soc_src",
  "soc_trk",
]);

export function isTrackingParam(key: string): boolean {
  const lower = key.toLowerCase();
  if (TRACKING_PREFIXES.some((prefix) => lower.startsWith(prefix))) return true;
  return TRACKING_EXACT.has(lower);
}

function ensureProtocol(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return trimmed;
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function toUrl(rawUrl: string): URL | null {
  const withProtocol = ensureProtocol(rawUrl);
  if (!withProtocol) return null;
  try {
    return new URL(withProtocol);
  } catch {
    return null;
  }
}

/** Parses a URL and lists its query params, flagging which look like tracking params. */
export function parseUrl(rawUrl: string): ParsedUrl {
  const parsed = toUrl(rawUrl);
  if (!parsed) return { valid: false, params: [] };

  const params: UrlParam[] = [];
  parsed.searchParams.forEach((value, key) => {
    params.push({ key, value, isTracking: isTrackingParam(key) });
  });

  return { valid: true, params };
}

/** Rebuilds the URL with the given param keys removed. Returns null if the URL isn't valid. */
export function buildCleanUrl(rawUrl: string, removedKeys: Set<string>): string | null {
  const parsed = toUrl(rawUrl);
  if (!parsed) return null;

  for (const key of Array.from(parsed.searchParams.keys())) {
    if (removedKeys.has(key)) parsed.searchParams.delete(key);
  }

  return parsed.toString();
}

export const sampleTrackedUrl =
  "https://www.example.com/products/running-shoes?utm_source=newsletter&utm_medium=email&utm_campaign=spring_sale&fbclid=IwAR123abcDEF&color=blue&size=10";
