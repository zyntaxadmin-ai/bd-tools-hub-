"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, loadImage, canvasToBlob, renderToCanvas, fitPixels, downloadUrl, MAX_FILE_BYTES } from "@/lib/imageUtil";
import { moveItem, pdfUrl, nextId } from "@/lib/pdfUtil";
import { useTr } from "@/lib/lang";
import OrderedFileList from "./OrderedFileList";

type Item = { id: string; file: File; thumb: string };
type PageMode = "a4" | "fit";
const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 24;
const MAX_IMAGES = 50;

export default function ImageToPdf() {
  const tr = useTr();
  const [items, setItems] = useState<Item[]>([]);
  const [mode, setMode] = useState<PageMode>("a4");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | { url: string; size: number; pages: number }>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => () => { urlsRef.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  const clearResult = () => {
    setResult((r) => { if (r) URL.revokeObjectURL(r.url); return null; });
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setError("");
    const next: Item[] = [];
    let skipped = 0;
    for (const f of files) {
      if (!f.type.startsWith("image/") || f.size > MAX_FILE_BYTES) { skipped++; continue; }
      const thumb = URL.createObjectURL(f);
      urlsRef.current.push(thumb);
      next.push({ id: nextId(), file: f, thumb });
    }
    setItems((prev) => {
      const room = MAX_IMAGES - prev.length;
      const take = next.slice(0, Math.max(0, room));
      next.slice(take.length).forEach((x) => URL.revokeObjectURL(x.thumb));
      if (next.length > take.length) skipped += next.length - take.length;
      if (skipped) setError(tr(`${skipped}টি ফাইল বাদ গেছে (ছবি নয়, ২৫ MB এর বেশি, বা সর্বোচ্চ ${MAX_IMAGES}টির বেশি)`, `${skipped} file(s) skipped (not an image, over 25 MB, or more than ${MAX_IMAGES})`));
      return [...prev, ...take];
    });
    clearResult();
  };

  const move = (i: number, d: -1 | 1) => { setItems((p) => moveItem(p, i, d)); clearResult(); };
  const remove = (i: number) => {
    setItems((p) => { URL.revokeObjectURL(p[i].thumb); return p.filter((_, k) => k !== i); });
    clearResult();
  };
  const reset = () => {
    items.forEach((x) => URL.revokeObjectURL(x.thumb));
    setItems([]); setError(""); clearResult();
  };

  const create = async () => {
    if (!items.length) return;
    setBusy(true); setError(""); clearResult();
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (const it of items) {
        const img = await loadImage(it.thumb);
        const w = img.naturalWidth, h = img.naturalHeight;
        if (!w || !h) throw new Error("size");
        const fit = fitPixels(w, h, 16_000_000);
        const canvas = renderToCanvas(img, fit.w, fit.h, true);
        const blob = await canvasToBlob(canvas, "image/jpeg", 0.92);
        if (!blob) throw new Error("encode");
        const jpg = await doc.embedJpg(new Uint8Array(await blob.arrayBuffer()));
        if (mode === "fit") {
          const pw = w * 0.75, ph = h * 0.75;
          const page = doc.addPage([pw, ph]);
          page.drawImage(jpg, { x: 0, y: 0, width: pw, height: ph });
        } else {
          const landscape = w > h;
          const pw = landscape ? A4.h : A4.w, ph = landscape ? A4.w : A4.h;
          const page = doc.addPage([pw, ph]);
          const scale = Math.min((pw - MARGIN * 2) / w, (ph - MARGIN * 2) / h);
          const dw = w * scale, dh = h * scale;
          page.drawImage(jpg, { x: (pw - dw) / 2, y: (ph - dh) / 2, width: dw, height: dh });
        }
      }
      const bytes = await doc.save();
      setResult({ url: pdfUrl(bytes), size: bytes.length, pages: items.length });
    } catch {
      setError(tr("PDF বানানো যায়নি। কোনো ছবি নষ্ট হতে পারে, সেটি বাদ দিয়ে আবার চেষ্টা করুন।", "Could not create the PDF. One of the images may be damaged, remove it and try again."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{tr("ছবি সিলেক্ট করতে ট্যাপ করুন (একাধিক হলে ভালো)", "Tap to select images (you can pick several)")}</span>
        <span className="text-xs text-slate-500">{tr(`JPG, PNG, WebP। প্রতিটি সর্বোচ্চ ২৫ MB, মোট সর্বোচ্চ ${MAX_IMAGES}টি`, `JPG, PNG, WebP. Up to 25 MB each, ${MAX_IMAGES} images max`)}</span>
        <input type="file" accept="image/*" multiple onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ছবি কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your images are not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {items.length > 0 && (
        <>
          <OrderedFileList
            items={items.map((x) => ({ id: x.id, name: x.file.name, sub: fmtBytes(x.file.size), thumb: x.thumb }))}
            onMove={move}
            onRemove={remove}
          />
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("পেজের মাপ", "Page size")}</p>
            <div className="flex gap-2">
              {([["a4", tr("A4 পেজ", "A4 page")], ["fit", tr("ছবির মাপে", "Fit to image")]] as [PageMode, string][]).map(([id, label]) => (
                <button key={id} onClick={() => { setMode(id); clearResult(); }} className={`flex-1 py-2.5 rounded-xl border text-sm ${mode === id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={create} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">
              {busy ? tr("PDF হচ্ছে...", "Creating PDF...") : tr("PDF বানান", "Create PDF")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {result && (
        <div className="space-y-3 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4">
          <p className="text-sm text-center dark:text-white">{tr(`${result.pages}টি পেজের PDF তৈরি, সাইজ ${fmtBytes(result.size)}`, `PDF ready: ${result.pages} page(s), ${fmtBytes(result.size)}`)}</p>
          <button onClick={() => downloadUrl(result.url, "images.pdf")} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("PDF ডাউনলোড", "Download PDF")}</button>
        </div>
      )}
    </div>
  );
}
