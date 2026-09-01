export interface RecordIssue {
  severity: "error" | "warning";
  message: string;
}

const LOOKUP_MECHANISMS = ["include", "a", "mx", "ptr", "exists"];

function isValidIpv4WithOptionalCidr(value: string): boolean {
  const [ip, cidr] = value.split("/");
  const octets = ip.split(".");
  if (octets.length !== 4) return false;
  if (!octets.every((o) => /^\d{1,3}$/.test(o) && Number(o) >= 0 && Number(o) <= 255)) return false;
  if (cidr !== undefined && (!/^\d{1,2}$/.test(cidr) || Number(cidr) < 0 || Number(cidr) > 32)) return false;
  return true;
}

export interface SpfAnalysis {
  isValid: boolean;
  issues: RecordIssue[];
  lookupCount: number;
  mechanisms: string[];
}

/** Validates against RFC 7208 — notably the hard 10-DNS-lookup limit in section 4.6.4. */
export function analyzeSpf(record: string): SpfAnalysis {
  const trimmed = record.trim();
  if (!trimmed) {
    return { isValid: false, issues: [{ severity: "error", message: "Record is empty." }], lookupCount: 0, mechanisms: [] };
  }

  const issues: RecordIssue[] = [];
  if (!trimmed.toLowerCase().startsWith("v=spf1")) {
    issues.push({ severity: "error", message: 'Record must start with "v=spf1".' });
  }

  const parts = trimmed.split(/\s+/).slice(1);
  let allCount = 0;
  let lookupCount = 0;
  const mechanisms: string[] = [];

  for (const part of parts) {
    mechanisms.push(part);
    const clean = part.replace(/^[+\-~?]/, "");
    const mechName = clean.split(":")[0].split("=")[0];

    if (mechName === "all") allCount++;
    if (LOOKUP_MECHANISMS.includes(mechName)) lookupCount++;

    if (mechName === "ptr") {
      issues.push({ severity: "warning", message: '"ptr" mechanism is deprecated and discouraged — consider removing it.' });
    }
    if (mechName === "ip4") {
      const ip = clean.split(":")[1];
      if (!ip || !isValidIpv4WithOptionalCidr(ip)) {
        issues.push({ severity: "error", message: `Invalid IPv4 value: "${ip ?? ""}"` });
      }
    }
    if (mechName === "include" && !clean.split(":")[1]) {
      issues.push({ severity: "error", message: '"include" mechanism is missing a domain.' });
    }
  }

  if (allCount === 0) {
    issues.push({
      severity: "warning",
      message: 'No "all" mechanism found — add one (e.g. "-all") to define a default policy for unlisted senders.',
    });
  } else if (allCount > 1) {
    issues.push({ severity: "error", message: `Found ${allCount} "all" mechanisms — there should be exactly one, at the end.` });
  }

  if (lookupCount > 10) {
    issues.push({
      severity: "error",
      message: `${lookupCount} DNS-lookup mechanisms found — SPF allows a maximum of 10 before returning a permanent error (RFC 7208).`,
    });
  } else if (lookupCount >= 8) {
    issues.push({ severity: "warning", message: `${lookupCount} of the 10 allowed DNS lookups are used — getting close to the limit.` });
  }

  if (trimmed.length > 255) {
    issues.push({
      severity: "warning",
      message: `Record is ${trimmed.length} characters — a single DNS TXT string is limited to 255 characters; longer records need to be split, which some senders handle inconsistently.`,
    });
  }

  return { isValid: !issues.some((i) => i.severity === "error"), issues, lookupCount, mechanisms };
}

export interface DkimAnalysis {
  isValid: boolean;
  issues: RecordIssue[];
  tags: Record<string, string>;
}

/** Validates against RFC 6376 tag=value; syntax. */
export function analyzeDkim(record: string): DkimAnalysis {
  const trimmed = record.trim();
  if (!trimmed) {
    return { isValid: false, issues: [{ severity: "error", message: "Record is empty." }], tags: {} };
  }

  const issues: RecordIssue[] = [];
  const tags: Record<string, string> = {};

  for (const segment of trimmed.split(";").map((s) => s.trim()).filter(Boolean)) {
    const eqIndex = segment.indexOf("=");
    if (eqIndex === -1) {
      issues.push({ severity: "error", message: `Malformed tag (missing "="): "${segment}"` });
      continue;
    }
    tags[segment.slice(0, eqIndex).trim()] = segment.slice(eqIndex + 1).trim();
  }

  if (tags.v && tags.v.toUpperCase() !== "DKIM1") {
    issues.push({ severity: "warning", message: `Unexpected version tag "v=${tags.v}" — expected "DKIM1".` });
  }

  if (!("p" in tags)) {
    issues.push({ severity: "error", message: 'Missing required "p=" tag (the public key).' });
  } else if (tags.p === "") {
    issues.push({ severity: "warning", message: 'Empty "p=" tag — this indicates the key has been intentionally revoked.' });
  } else if (!/^[A-Za-z0-9+/]+={0,2}$/.test(tags.p.replace(/\s/g, ""))) {
    issues.push({ severity: "error", message: '"p=" value doesn\'t look like valid base64 — check for stray characters or line breaks.' });
  }

  if (tags.k && !["rsa", "ed25519"].includes(tags.k.toLowerCase())) {
    issues.push({ severity: "warning", message: `Unusual key type "k=${tags.k}" — "rsa" and "ed25519" are the common values.` });
  }

  return { isValid: !issues.some((i) => i.severity === "error"), issues, tags };
}

export const sampleSpf = "v=spf1 include:_spf.google.com ip4:203.0.113.10 -all";
export const sampleDkim =
  "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7...";
