function byteLength(str: string): number {
  return new TextEncoder().encode(str).length;
}

/** UTF-8-safe base64 encoding — plain btoa() breaks on SVGs containing non-Latin1 characters. */
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

/** Light-touch cleanup: strips XML prolog, doctype, comments, and inter-tag whitespace. */
export function cleanSvg(raw: string): string {
  return raw
    .replace(/<\?xml[^>]*\?>/gi, "")
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>\s+</g, "><")
    .trim();
}

export function isLikelySvg(content: string): boolean {
  return /<svg[\s>]/i.test(content);
}

export interface SvgConversionResult {
  originalSize: number;
  finalSize: number;
  encodedSize: number;
  cleanedSvg: string;
  base64DataUri: string;
  urlEncodedDataUri: string;
  cssSnippet: string;
  imgSnippet: string;
}

export function convertSvg(raw: string, minify: boolean): SvgConversionResult {
  const cleaned = minify ? cleanSvg(raw) : raw.trim();
  const base64 = utf8ToBase64(cleaned);
  const base64DataUri = `data:image/svg+xml;base64,${base64}`;
  const urlEncodedDataUri = `data:image/svg+xml,${encodeURIComponent(cleaned)}`;

  return {
    originalSize: byteLength(raw),
    finalSize: byteLength(cleaned),
    encodedSize: byteLength(base64DataUri),
    cleanedSvg: cleaned,
    base64DataUri,
    urlEncodedDataUri,
    cssSnippet: `background-image: url("${base64DataUri}");`,
    imgSnippet: `<img src="${base64DataUri}" alt="" />`,
  };
}

export const sampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>`;
