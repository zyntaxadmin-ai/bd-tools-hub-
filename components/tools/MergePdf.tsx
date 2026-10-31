"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, downloadUrl } from "@/lib/imageUtil";
import { MAX_PDF_BYTES, isPdf, moveItem, nextId, pdfUrl, readBytes } from "@/lib/pdfUtil";
import { useTr } from "@/lib/lang";
import OrderedFileList from "./OrderedFileList";

type Item = { id: string; file: File };
const MAX_FILES = 20;

export default function MergePdf() {
  const tr = useTr();
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | { url: string; size: number; pages: number }>(null);
  const resultUrl = useRef("");

  useEffect(() => () => { if (resultUrl.current) URL.revokeObjectURL(resultUrl.current); }, []);

  const clearResult = () => {
    if (resultUrl.current) { URL.revokeObjectURL(resultUrl.current); resultUrl.current = ""; }
    setResult(null);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    let skipped = 0;
    const good = files.filter((f) => { const ok = isPdf(f) && f.size <= MAX_PDF_BYTES; if (!ok) skipped++; return ok; });
    setItems((prev) => {
      const take = good.slice(0, Math.max(0, MAX_FILES - prev.length));
      skipped += good.length - take.length;
      setError(skipped ? tr(`${skipped}টি ফাইল বাদ গেছে (PDF নয়, ৫০ MB এর বেশি, বা সর্বোচ্চ ${MAX_FILES}টির বেশি)`, `${skipped} file(s) skipped (not a PDF, over 50 MB, or more than ${MAX_FILES})`) : "");
      return [...prev, ...take.map((f) => ({ id: nextId(), file: f }))];
    });
    clearResult();
  };

  const move = (i: number, d: -1 | 1) => { setItems((p) => moveItem(p, i, d)); clearResult(); };
  const remove = (i: number) => { setItems((p) => p.filter((_, k) => k !== i)); clearResult(); };
  const reset = () => { setItems([]); setError(""); clearResult(); };

  const merge = async () => {
    if (items.length < 2) { setError(tr("কমপক্ষে ২টি PDF দিন", "Add at least 2 PDFs")); return; }
    setBusy(true); setError(""); clearResult();
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const it of items) {
        let src;
        try {
          src = await PDFDocument.load(await readBytes(it.file));
        } catch {
          setError(tr(`"${it.file.name}" খোলা যায়নি। ফাইলটি পাসওয়ার্ড দেওয়া বা নষ্ট হতে পারে। সেটি বাদ দিয়ে আবার চেষ্টা করুন।`, `Could not open "${it.file.name}". It may be password protected or damaged. Remove it and try again.`));
          setBusy(false);
          return;
        }
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      const url = pdfUrl(bytes);
      resultUrl.current = url;
      setResult({ url, size: bytes.length, pages: out.getPageCount() });
    } catch {
      setError(tr("PDF জোড়া লাগানো যায়নি। আবার চেষ্টা করুন।", "Could not merge the PDFs. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{tr("PDF সিলেক্ট করতে ট্যাপ করুন (একাধিক)", "Tap to select PDFs (several)")}</span>
        <span className="text-xs text-slate-500">{tr(`প্রতিটি সর্বোচ্চ ৫০ MB, মোট সর্বোচ্চ ${MAX_FILES}টি`, `Up to 50 MB each, ${MAX_FILES} files max`)}</span>
        <input type="file" accept="application/pdf,.pdf" multiple onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ফাইল কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your files are not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {items.length > 0 && (
        <>
          <p className="text-xs text-slate-500">{tr("তীর বাটন দিয়ে ক্রম ঠিক করুন। উপরেরটি প্রথমে বসবে।", "Use the arrows to set the order. The top file comes first.")}</p>
          <OrderedFileList items={items.map((x) => ({ id: x.id, name: x.file.name, sub: fmtBytes(x.file.size) }))} onMove={move} onRemove={remove} />
          <div className="flex gap-3">
            <button onClick={merge} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">
              {busy ? tr("জোড়া লাগছে...", "Merging...") : tr("PDF জোড়া দিন", "Merge PDFs")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {result && (
        <div className="space-y-3 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4">
          <p className="text-sm text-center dark:text-white">{tr(`মোট ${result.pages}টি পেজ, সাইজ ${fmtBytes(result.size)}`, `${result.pages} pages in total, ${fmtBytes(result.size)}`)}</p>
          <button onClick={() => downloadUrl(result.url, "merged.pdf")} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("PDF ডাউনলোড", "Download PDF")}</button>
        </div>
      )}
    </div>
  );
}
