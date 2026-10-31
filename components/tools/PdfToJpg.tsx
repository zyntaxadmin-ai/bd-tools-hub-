"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, downloadUrl } from "@/lib/imageUtil";
import { MAX_PDF_BYTES, isPdf, parseRanges, pdfBaseName, readBytes } from "@/lib/pdfUtil";
import { openPdf, renderPageJpeg } from "@/lib/pdfjs";
import { useTr } from "@/lib/lang";

const MAX_PAGES_OUT = 50;
type Quality = "normal" | "high";
const SCALES: Record<Quality, number> = { normal: 1.5, high: 2.5 };
type Out = { page: number; url: string; name: string; size: number; w: number; h: number };

export default function PdfToJpg() {
  const tr = useTr();
  const [file, setFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);
  const [range, setRange] = useState("");
  const [quality, setQuality] = useState<Quality>("normal");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [outs, setOuts] = useState<Out[]>([]);
  const urls = useRef<string[]>([]);
  const pdfRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  const clearOuts = () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); urls.current = []; setOuts([]); };
  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); pdfRef.current?.destroy?.(); }, []);

  const openError = (code: string) =>
    code === "password" ? tr("PDF এ পাসওয়ার্ড দেওয়া আছে, তাই খোলা যায়নি।", "This PDF is password protected, so it could not be opened.")
    : code === "load" ? tr("PDF পড়ার টুল লোড হয়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", "The PDF reader could not be loaded. Check your internet connection and try again.")
    : tr("PDF খোলা যায়নি। ফাইলটি নষ্ট হতে পারে।", "Could not open this PDF. The file may be damaged.");

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    clearOuts(); setError(""); setFile(null); setTotal(0); setRange("");
    pdfRef.current?.destroy?.(); pdfRef.current = null;
    if (!isPdf(f)) { setError(tr("শুধু PDF ফাইল দিন", "Please choose a PDF file")); return; }
    if (f.size > MAX_PDF_BYTES) { setError(tr("ফাইলের সাইজ ৫০ MB এর বেশি", "The file is larger than 50 MB")); return; }
    setBusy(true); setProgress(tr("ফাইল পড়া হচ্ছে...", "Reading the file..."));
    try {
      const pdf = await openPdf(await readBytes(f));
      pdfRef.current = pdf;
      setFile(f);
      setTotal(pdf.numPages);
    } catch (err) {
      setError(openError((err as Error).message));
    } finally {
      setBusy(false); setProgress("");
    }
  };

  const reset = () => {
    clearOuts(); setFile(null); setTotal(0); setRange(""); setError("");
    pdfRef.current?.destroy?.(); pdfRef.current = null;
  };

  const convert = async () => {
    const pdf = pdfRef.current;
    if (!file || !pdf) return;
    setError(""); clearOuts();
    let pages: number[];
    if (range.trim()) {
      const r = parseRanges(range, total);
      if (r.error) {
        setError({
          empty: "",
          invalid: tr("ভুল ফরম্যাট। এভাবে লিখুন: 1-3, 5, 8-10", "Invalid format. Write it like: 1-3, 5, 8-10"),
          range: tr(`পেজ নম্বর ১ থেকে ${total} এর মধ্যে হতে হবে`, `Page numbers must be between 1 and ${total}`),
          order: tr("রেঞ্জের শুরু শেষের চেয়ে বড় হতে পারে না, যেমন 5-3 ভুল", "A range cannot start after it ends, e.g. 5-3 is wrong"),
        }[r.error]);
        return;
      }
      pages = r.pages;
    } else {
      pages = Array.from({ length: total }, (_, i) => i + 1);
    }
    if (pages.length > MAX_PAGES_OUT) {
      setError(tr(`একবারে সর্বোচ্চ ${MAX_PAGES_OUT}টি পেজ ছবি করা যায়। উপরের বক্সে পেজ রেঞ্জ লিখুন, যেমন 1-${MAX_PAGES_OUT}।`, `You can convert up to ${MAX_PAGES_OUT} pages at a time. Type a page range above, for example 1-${MAX_PAGES_OUT}.`));
      return;
    }
    setBusy(true);
    try {
      const base = pdfBaseName(file.name);
      const made: Out[] = [];
      for (let i = 0; i < pages.length; i++) {
        setProgress(tr(`পেজ ${pages[i]} হচ্ছে (${i + 1}/${pages.length})...`, `Converting page ${pages[i]} (${i + 1}/${pages.length})...`));
        const r = await renderPageJpeg(pdf, pages[i], SCALES[quality], 0.9);
        const url = URL.createObjectURL(r.blob);
        urls.current.push(url);
        made.push({ page: pages[i], url, name: `${base}-page-${pages[i]}.jpg`, size: r.blob.size, w: r.width, h: r.height });
        setOuts([...made]);
      }
    } catch {
      setError(tr("ছবি বানাতে সমস্যা হয়েছে। কম পেজ বা সাধারণ মান বেছে আবার চেষ্টা করুন।", "Something went wrong while making the images. Try fewer pages or the normal quality."));
    } finally {
      setBusy(false); setProgress("");
    }
  };

  const tab = (q: Quality) => `flex-1 py-2.5 rounded-xl border text-sm ${quality === q ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("PDF সিলেক্ট করতে ট্যাপ করুন", "Tap to select a PDF")}</span>
        <span className="text-xs text-slate-500">{file ? tr(`${total}টি পেজ, ${fmtBytes(file.size)}`, `${total} page(s), ${fmtBytes(file.size)}`) : tr("সর্বোচ্চ ৫০ MB", "Up to 50 MB")}</span>
        <input type="file" accept="application/pdf,.pdf" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার PDF কোথাও আপলোড হয় না, সব কাজ আপনার ফোন/ব্রাউজারেই হয়। শুধু PDF পড়ার টুলটি ইন্টারনেট থেকে একবার লোড হয়।", "Your PDF is not uploaded anywhere, everything happens on your phone/browser. Only the PDF reader library is loaded once from the internet.")}</p>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {busy && progress && <p className="text-sm text-slate-500">{progress}</p>}

      {file && (
        <>
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr(`কোন পেজগুলো? (খালি রাখলে সব, ১ থেকে ${total})`, `Which pages? (leave empty for all, 1 to ${total})`)}</label>
            <input value={range} onChange={(e) => setRange(e.target.value)} placeholder="1-3, 5" className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("ছবির মান", "Image quality")}</p>
            <div className="flex gap-2">
              <button onClick={() => setQuality("normal")} className={tab("normal")}>{tr("সাধারণ (ছোট ফাইল)", "Normal (smaller)")}</button>
              <button onClick={() => setQuality("high")} className={tab("high")}>{tr("উচ্চ (বড় ও স্পষ্ট)", "High (larger, sharper)")}</button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={convert} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">
              {busy ? tr("প্রসেস হচ্ছে...", "Processing...") : tr("JPG বানান", "Convert to JPG")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {outs.length > 0 && (
        <ul className="space-y-2">
          {outs.map((o) => (
            <li key={o.name} className="flex items-center gap-3 p-2 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.url} alt={tr(`পেজ ${o.page}`, `Page ${o.page}`)} className="w-12 h-16 object-cover rounded-md border border-slate-200 dark:border-slate-700" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">{o.name}</p>
                <p className="text-xs text-slate-500">{o.w} × {o.h} px, {fmtBytes(o.size)}</p>
              </div>
              <button onClick={() => downloadUrl(o.url, o.name)} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
