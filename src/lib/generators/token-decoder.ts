export type DecodedType = "jwt" | "saml" | "unknown";

function base64UrlDecode(segment: string): string {
  let base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function base64Decode(value: string): string {
  const binary = atob(value.trim());
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Lightweight regex-based XML pretty-printer — not a full parser, but sufficient for readability. */
function formatXml(xml: string): string {
  const PAD = "  ";
  let formatted = "";
  let indentLevel = 0;
  const withBreaks = xml.replace(/>\s*</g, ">\n<").trim();

  for (const rawLine of withBreaks.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    const isClosingTag = /^<\/[^>]+>$/.test(line);
    const isSelfClosing = /\/>$/.test(line) || /^<\?/.test(line) || /^<!/.test(line);
    const isOpeningTag = /^<[^/!?][^>]*[^/]>$/.test(line);

    if (isClosingTag) indentLevel = Math.max(indentLevel - 1, 0);
    formatted += PAD.repeat(indentLevel) + line + "\n";
    if (isOpeningTag && !isSelfClosing) indentLevel++;
  }

  return formatted.trim();
}

export function detectType(input: string): DecodedType {
  const trimmed = input.trim().replace(/\s/g, "");
  if (!trimmed) return "unknown";

  if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/.test(trimmed)) return "jwt";

  try {
    const decoded = base64Decode(trimmed);
    if (decoded.trim().startsWith("<")) return "saml";
  } catch {
    // not valid base64 — fall through
  }
  return "unknown";
}

export interface JwtClaims {
  [key: string]: unknown;
}

export interface JwtResult {
  headerJson: string;
  payloadJson: string;
  signature: string;
  payloadClaims: JwtClaims;
}

export function decodeJwt(token: string): JwtResult | null {
  const parts = token.trim().replace(/\s/g, "").split(".");
  if (parts.length < 2) return null;
  try {
    const headerObj = JSON.parse(base64UrlDecode(parts[0]));
    const payloadObj = JSON.parse(base64UrlDecode(parts[1]));
    return {
      headerJson: JSON.stringify(headerObj, null, 2),
      payloadJson: JSON.stringify(payloadObj, null, 2),
      signature: parts[2] || "",
      payloadClaims: payloadObj,
    };
  } catch {
    return null;
  }
}

export function decodeSaml(input: string): string | null {
  try {
    const xml = base64Decode(input.trim().replace(/\s/g, ""));
    if (!xml.trim().startsWith("<")) return null;
    return formatXml(xml);
  } catch {
    return null;
  }
}

/** Formats a Unix timestamp claim (exp, iat, nbf) as a readable date, if present and numeric. */
export function formatClaimTimestamp(value: unknown): string | null {
  if (typeof value !== "number") return null;
  const date = new Date(value * 1000);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

export const sampleJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfODg0MiIsIm5hbWUiOiJKb3JkYW4gTGVlIiwiaWF0IjoxNzM2ODAwMDAwLCJleHAiOjE3MzY4MDM2MDB9.dGhpc19pc19hX2Zha2Vfc2lnbmF0dXJl";
