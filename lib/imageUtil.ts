// Browser-only image helpers (canvas). Nothing is uploaded anywhere.
export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB

export function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1048576).toFixed(2)} MB`;
}

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("ছবি লোড করা যায়নি"));
    img.src = url;
  });
}

export function canvasToBlob(c: HTMLCanvasElement, type: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => c.toBlob(resolve, type, quality));
}

export function renderToCanvas(img: HTMLImageElement, w: number, h: number, whiteBg: boolean): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  if (whiteBg) { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h); }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);
  return c;
}

// Very large images are scaled down to stay within phone memory limits
export function fitPixels(w: number, h: number, maxPixels = 25_000_000): { w: number; h: number; scaled: boolean } {
  if (w * h <= maxPixels) return { w, h, scaled: false };
  const s = Math.sqrt(maxPixels / (w * h));
  return { w: Math.max(1, Math.floor(w * s)), h: Math.max(1, Math.floor(h * s)), scaled: true };
}

export function downloadUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export const baseName = (name: string) => name.replace(/\.[^.]+$/, "") || "image";
export const extFor = (mime: string) => (mime === "image/jpeg" ? "jpg" : mime === "image/png" ? "png" : "webp");
