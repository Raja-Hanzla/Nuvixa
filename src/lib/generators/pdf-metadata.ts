const POINTS_PER_INCH = 72;

export type Orientation = "portrait" | "landscape" | "square";

export interface PageSizeGroup {
  widthPt: number;
  heightPt: number;
  widthIn: number;
  heightIn: number;
  aspectRatio: number;
  orientation: Orientation;
  count: number;
}

export interface PdfInspection {
  valid: boolean;
  error?: string;
  fileSizeBytes: number;
  pageCount: number;
  detectedBoxCount: number;
  sizeGroups: PageSizeGroup[];
  colorSpaces: string[];
  mayBeIncomplete: boolean;
}

/** Converts raw bytes to a Latin-1 string, chunked so huge files don't overflow the call stack. */
function bytesToLatin1String(bytes: Uint8Array): string {
  let result = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    result += String.fromCharCode(...chunk);
  }
  return result;
}

function groupSizes(rawBoxes: { widthPt: number; heightPt: number }[]): PageSizeGroup[] {
  const map = new Map<string, PageSizeGroup>();
  for (const box of rawBoxes) {
    const key = `${Math.round(box.widthPt)}x${Math.round(box.heightPt)}`;
    const existing = map.get(key);
    if (existing) {
      existing.count++;
      continue;
    }
    const orientation: Orientation =
      Math.abs(box.widthPt - box.heightPt) < 1 ? "square" : box.widthPt > box.heightPt ? "landscape" : "portrait";
    map.set(key, {
      widthPt: box.widthPt,
      heightPt: box.heightPt,
      widthIn: box.widthPt / POINTS_PER_INCH,
      heightIn: box.heightPt / POINTS_PER_INCH,
      aspectRatio: box.widthPt / box.heightPt,
      orientation,
      count: 1,
    });
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

/**
 * Extracts page count, page dimensions, and color space hints from raw PDF bytes by scanning for
 * PDF dictionary keywords directly — page and MediaBox dictionaries are always plain ASCII in a
 * PDF even when content streams are compressed, so this works without a full PDF parser. The one
 * real gap: PDF 1.5+ files that bundle objects into compressed Object Streams can hide page
 * dictionaries from a plain-text scan entirely, so that case is detected and flagged explicitly
 * rather than silently under-counting.
 */
export function inspectPdfBytes(bytes: Uint8Array): PdfInspection {
  const fileSizeBytes = bytes.length;

  const headerBytes = bytes.subarray(0, Math.min(8, bytes.length));
  const header = bytesToLatin1String(headerBytes);
  if (!header.startsWith("%PDF-")) {
    return {
      valid: false,
      error: "This doesn't look like a PDF file — it's missing the %PDF- header.",
      fileSizeBytes,
      pageCount: 0,
      detectedBoxCount: 0,
      sizeGroups: [],
      colorSpaces: [],
      mayBeIncomplete: false,
    };
  }

  const text = bytesToLatin1String(bytes);
  const mayBeIncomplete = /\/ObjStm\b/.test(text);

  const pageTypeMatches = text.match(/\/Type\s*\/Page(?!s)\b/g) ?? [];
  const pageCount = pageTypeMatches.length;

  const mediaBoxRegex = /\/MediaBox\s*\[\s*(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s*\]/g;
  const rawBoxes: { widthPt: number; heightPt: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = mediaBoxRegex.exec(text)) !== null) {
    const x0 = parseFloat(m[1]);
    const y0 = parseFloat(m[2]);
    const x1 = parseFloat(m[3]);
    const y1 = parseFloat(m[4]);
    const widthPt = Math.abs(x1 - x0);
    const heightPt = Math.abs(y1 - y0);
    if (widthPt > 0 && heightPt > 0) rawBoxes.push({ widthPt, heightPt });
  }

  const colorSpaceNames = ["DeviceRGB", "DeviceCMYK", "DeviceGray", "ICCBased", "Indexed", "Separation", "CalRGB", "CalGray", "Lab"];
  const colorSpaces = colorSpaceNames.filter((name) => new RegExp(`/${name}\\b`).test(text));

  return {
    valid: true,
    fileSizeBytes,
    pageCount: pageCount || rawBoxes.length,
    detectedBoxCount: rawBoxes.length,
    sizeGroups: groupSizes(rawBoxes),
    colorSpaces,
    mayBeIncomplete,
  };
}
