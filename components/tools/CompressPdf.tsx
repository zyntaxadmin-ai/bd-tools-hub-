"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, downloadUrl } from "@/lib/imageUtil";
import { MAX_PDF_BYTES, isPdf, pdfBaseName, pdfUrl, readBytes } from "@/lib/pdfUtil";
import { openPdf, renderPageJpeg } from "@/lib/pdfjs";
import { useTr } from "@/lib/lang";

const MAX_PAGES = 60;
type Level = "light" | "balanced" | "strong";
// scale 1 = 72 dpi. Balanced is about 108 dpi, which is fine for reading scanned pages.
const LEVELS: Record<Level, { scale: number; quality: number }> = {
  light: { scale: 2, quality: 0.8 },
  balanced: { scale: 1.5, quality: 0.65 },
  strong: { scale: 1.2, quality: 0.5 },
};

export default function CompressPdf() {
  const tr = useTr();
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState(0);
  const [level, setLevel] = useState<Level>("balanced");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | { url: string; size: number }>(null);
  const pdfRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const urlRef = useRef("");

  const clearResult = () => { if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = ""; } setResult(null); };
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); pdfRef.current?.destroy?.(); }, []);

  const openError = (code: string) =>
    code === "password" ? tr("PDF এ পাসওয়ার্ড দেওয়া আছে, তাই খোলা যায়নি।", "This PDF is password protected, so it could not be opened.")
    : code === "load" ? tr("PDF পড়ার টুল লোড হয়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", "The PDF reader could not be loaded. Check your internet connection and try again.")
    : tr("PDF খোলা যায়নি। ফাইলটি নষ্ট হতে পারে।", "Could not open this PDF. The file may be damaged.");

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    clearResult(); setError(""); setFile(null); setPages(0);
    pdfRef.current?.destroy?.(); pdfRef.current = null;
    if (!isPdf(f)) { setError(tr("শুধু PDF ফাইল দিন", "Please choose a PDF file")); return; }
    if (f.size > MAX_PDF_BYTES) { setError(tr("ফাইলের সাইজ ৫০ MB এর বেশি", "The file is larger than 50 MB")); return; }
    setBusy(true); setProgress(tr("ফাইল পড়া হচ্ছে...", "Reading the file..."));
    try {
      const pdf = await openPdf(await readBytes(f));
      if (pdf.numPages > MAX_PAGES) {
        setError(tr(`এই টুলে সর্বোচ্চ ${MAX_PAGES} পেজের PDF কম্প্রেস করা যায়। আগে Split PDF দিয়ে ভাগ করে নিন।`, `This tool handles PDFs up to ${MAX_PAGES} pages. Split the PDF first with Split PDF.`));
        pdf.destroy?.();
        return;
      }
      pdfRef.current = pdf;
      setFile(f);
      setPages(pdf.numPages);
    } catch (err) {
      setError(openError((err as Error).message));
    } finally {
      setBusy(false); setProgress("");
    }
  };

  const reset = () => { clearResult(); setFile(null); setPages(0); setError(""); pdfRef.current?.destroy?.(); pdfRef.current = null; };

  const compress = async () => {
    const pdf = pdfRef.current;
    if (!file || !pdf) return;
    setError(""); clearResult(); setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      const { scale, quality } = LEVELS[level];
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(tr(`পেজ ${i}/${pdf.numPages} হচ্ছে...`, `Page ${i}/${pdf.numPages}...`));
        const r = await renderPageJpeg(pdf, i, scale, quality);
        const img = await out.embedJpg(new Uint8Array(await r.blob.arrayBuffer()));
        const page = out.addPage([r.ptW, r.ptH]); // keep the original page size
        page.drawImage(img, { x: 0, y: 0, width: r.ptW, height: r.ptH });
      }
      const bytes = await out.save();
      const url = pdfUrl(bytes);
      urlRef.current = url;
      setResult({ url, size: bytes.length });
    } catch {
      setError(tr("কম্প্রেস করা যায়নি। \"শক্তিশালী\" বা কম পেজ বেছে আবার চেষ্টা করুন।", "Could not compress. Try the Strong level or fewer pages."));
    } finally {
      setBusy(false); setProgress("");
    }
  };

  const tab = (l: Level) => `flex-1 py-2.5 rounded-xl border text-sm ${level === l ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const smaller = result && file ? result.size < file.size : false;
  const saved = result && file ? Math.round((1 - result.size / file.size) * 100) : 0;

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("PDF সিলেক্ট করতে ট্যাপ করুন", "Tap to select a PDF")}</span>
        <span className="text-xs text-slate-500">{file ? tr(`${pages}টি পেজ, ${fmtBytes(file.size)}`, `${pages} page(s), ${fmtBytes(file.size)}`) : tr(`সর্বোচ্চ ৫০ MB ও ${MAX_PAGES} পেজ`, `Up to 50 MB and ${MAX_PAGES} pages`)}</span>
        <input type="file" accept="application/pdf,.pdf" onChange={onPick} className="hidden" />
      </label>
      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন/ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়।", "Your PDF is not uploaded anywhere, everything happens on your phone/browser. Only the PDF reader library is loaded once from the internet.")}</p>
        <p className="text-amber-600">{tr("সতর্কতা: প্রতিটি পেজ ছবিতে বদলে নতুন PDF হয়, তাই লেখা সিলেক্ট, কপি বা সার্চ করা যাবে না। স্ক্যান করা বা ছবির PDF এর জন্য এটি ভালো কাজ করে।", "Note: every page is turned into an image to build the new PDF, so text can no longer be selected, copied or searched. It works best for scanned or image-based PDFs.")}</p>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {busy && progress && <p className="text-sm text-slate-500">{progress}</p>}

      {file && (
        <>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("কতটা ছোট করবেন", "Compression level")}</p>
            <div className="flex gap-2">
              <button onClick={() => { setLevel("light"); clearResult(); }} className={tab("light")}>{tr("হালকা", "Light")}</button>
              <button onClick={() => { setLevel("balanced"); clearResult(); }} className={tab("balanced")}>{tr("মাঝারি", "Balanced")}</button>
              <button onClick={() => { setLevel("strong"); clearResult(); }} className={tab("strong")}>{tr("শক্তিশালী", "Strong")}</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={compress} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">
              {busy ? tr("কম্প্রেস হচ্ছে...", "Compressing...") : tr("PDF কম্প্রেস করুন", "Compress PDF")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {result && file && (
        <div className="space-y-3 border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-4">
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("আগে", "Before")}</span><span className="font-semibold">{fmtBytes(file.size)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("পরে", "After")}</span><span className="font-semibold">{fmtBytes(result.size)}</span></div>
          {smaller ? (
            <>
              <p className="text-sm text-center text-emerald-600 font-medium">{tr(`${saved}% ছোট হয়েছে`, `${saved}% smaller`)}</p>
              <button onClick={() => downloadUrl(result.url, `${pdfBaseName(file.name)}-compressed.pdf`)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("PDF ডাউনলোড", "Download PDF")}</button>
            </>
          ) : (
            <p className="text-sm text-center text-amber-600">{tr("নতুন ফাইল মূল ফাইলের চেয়ে ছোট হয়নি। আপনার PDF সম্ভবত আগে থেকেই ছোট বা লেখা-ভিত্তিক, তাই মূল ফাইলটিই রাখুন। \"শক্তিশালী\" বেছে আবার চেষ্টা করতে পারেন।", "The new file is not smaller than the original. Your PDF is probably already small or text-based, so keep the original. You can try the Strong level.")}</p>
          )}
        </div>
      )}
    </div>
  );
}
