export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parses #rgb, #rrggbb (with or without #) into an RGB triple. Returns null if invalid. */
export function parseHexColor(hex: string): Rgb | null {
  const cleaned = hex.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(cleaned)) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  }
  if (/^[0-9a-f]{6}$/i.test(cleaned)) {
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** WCAG relative luminance, per the official formula (not a simplified approximation). */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const rLin = channelToLinear(r);
  const gLin = channelToLinear(g);
  const bLin = channelToLinear(b);
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/** WCAG contrast ratio between two colors, ranging from 1 (no contrast) to 21 (max contrast). */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const lumA = relativeLuminance(a);
  const lumB = relativeLuminance(b);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG's definition of "large text": 24px+ at any weight, or 18.66px+ (~14pt) when bold. */
export function isLargeText(fontSizePx: number, isBold: boolean): boolean {
  return fontSizePx >= 24 || (isBold && fontSizePx >= 18.66);
}

export interface WcagResult {
  ratio: number;
  large: boolean;
  aaThreshold: number;
  aaaThreshold: number;
  passesAA: boolean;
  passesAAA: boolean;
}

export function evaluateWcag(textColor: Rgb, backgroundColor: Rgb, fontSizePx: number, isBold: boolean): WcagResult {
  const ratio = contrastRatio(textColor, backgroundColor);
  const large = isLargeText(fontSizePx, isBold);
  const aaThreshold = large ? 3 : 4.5;
  const aaaThreshold = large ? 4.5 : 7;

  return {
    ratio,
    large,
    aaThreshold,
    aaaThreshold,
    passesAA: ratio >= aaThreshold,
    passesAAA: ratio >= aaaThreshold,
  };
}

export const fontFamilyOptions = [
  { label: "Sans-serif", value: "ui-sans-serif, system-ui, sans-serif" },
  { label: "Serif", value: "ui-serif, Georgia, serif" },
  { label: "Monospace", value: "ui-monospace, 'Courier New', monospace" },
];

export const defaultCheckerState = {
  textColor: "#1a1a2e",
  backgroundColor: "#ffffff",
  fontFamily: fontFamilyOptions[0].value,
  fontSize: 16,
  bold: false,
};
