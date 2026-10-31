// Browser-side PDF helpers. Nothing is uploaded anywhere.
export const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50 MB per file
export const MAX_SPLIT_FILES = 100; // "each page separately" is limited to this many pages

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function toEnDigits(s: string): string {
  return s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

export type RangeResult = { pages: number[]; error?: undefined } | { pages?: undefined; error: "empty" | "invalid" | "range" | "order" };

// "1-3, 5, 8-10" -> [1,2,3,5,8,9,10] (1-based, duplicates removed, order kept)
export function parseRanges(input: string, total: number): RangeResult {
  const text = toEnDigits(input).replace(/\s+/g, "");
  if (!text) return { error: "empty" };
  const seen = new Set<number>();
  const pages: number[] = [];
  for (const token of text.split(",")) {
    if (!token) return { error: "invalid" };
    const m = /^(\d+)(?:-(\d+))?$/.exec(token);
    if (!m) return { error: "invalid" };
    const a = parseInt(m[1], 10);
    const b = m[2] ? parseInt(m[2], 10) : a;
    if (a < 1 || b < 1 || a > total || b > total) return { error: "range" };
    if (a > b) return { error: "order" };
    for (let p = a; p <= b; p++) {
      if (!seen.has(p)) { seen.add(p); pages.push(p); }
    }
  }
  return { pages };
}

export function moveItem<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const to = index + dir;
  if (to < 0 || to >= arr.length) return arr;
  const copy = arr.slice();
  [copy[index], copy[to]] = [copy[to], copy[index]];
  return copy;
}

export function pdfUrl(bytes: Uint8Array): string {
  const copy = new Uint8Array(bytes); // plain ArrayBuffer-backed copy for Blob
  return URL.createObjectURL(new Blob([copy], { type: "application/pdf" }));
}

export const isPdf = (f: File) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);

export async function readBytes(f: File): Promise<Uint8Array> {
  return new Uint8Array(await f.arrayBuffer());
}

let idCounter = 0;
export const nextId = () => `f${++idCounter}`;

export const pdfBaseName = (name: string) => name.replace(/\.[^.]+$/, "") || "file";
