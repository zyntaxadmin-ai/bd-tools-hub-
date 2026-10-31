// Loads pdf.js (Mozilla's PDF reader) from cdnjs on demand, only when a PDF tool needs it.
// The PDF itself is never uploaded: only the reader library is downloaded.
// Loading it from a CDN (instead of bundling it) keeps the site build simple and the main bundle small.
const VERSION = "3.11.174";
const BASE = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${VERSION}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
let loading: Promise<any> | null = null;

export function loadPdfJs(): Promise<any> {
  if (typeof window === "undefined") return Promise.reject(new Error("browser only"));
  const w = window as any;
  if (w.pdfjsLib) {
    w.pdfjsLib.GlobalWorkerOptions.workerSrc = `${BASE}/pdf.worker.min.js`;
    return Promise.resolve(w.pdfjsLib);
  }
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${BASE}/pdf.min.js`;
    s.async = true;
    s.onload = () => {
      const lib = (window as any).pdfjsLib;
      if (!lib) { loading = null; reject(new Error("pdfjs missing")); return; }
      lib.GlobalWorkerOptions.workerSrc = `${BASE}/pdf.worker.min.js`;
      resolve(lib);
    };
    s.onerror = () => { loading = null; s.remove(); reject(new Error("pdfjs load failed")); };
    document.head.appendChild(s);
  });
  return loading;
}

export type PdfOpenError = "password" | "load" | "bad";

// Opens a PDF from bytes. Throws an Error whose message is a PdfOpenError code.
export async function openPdf(bytes: Uint8Array): Promise<any> {
  let lib: any;
  try {
    lib = await loadPdfJs();
  } catch {
    throw new Error("load");
  }
  try {
    // pdf.js takes ownership of the buffer, so give it a copy
    return await lib.getDocument({ data: bytes.slice() }).promise;
  } catch (e: any) {
    if (e && e.name === "PasswordException") throw new Error("password");
    throw new Error("bad");
  }
}

const MAX_PIXELS = 16_000_000; // keeps phone memory in check

// Renders one page to a JPEG. `ptW`/`ptH` are the page size in PDF points (1/72 inch).
export async function renderPageJpeg(pdf: any, pageNumber: number, scale: number, quality: number) {
  const page = await pdf.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  let s = scale;
  if (base.width * s * base.height * s > MAX_PIXELS) s = Math.sqrt(MAX_PIXELS / (base.width * base.height));
  const vp = page.getViewport({ scale: s });
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(vp.width));
  canvas.height = Math.max(1, Math.floor(vp.height));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport: vp }).promise;
  const blob: Blob | null = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", quality));
  page.cleanup();
  const out = { blob, width: canvas.width, height: canvas.height, ptW: base.width, ptH: base.height };
  canvas.width = 0; canvas.height = 0; // free memory
  if (!blob) throw new Error("encode");
  return out as { blob: Blob; width: number; height: number; ptW: number; ptH: number };
}
