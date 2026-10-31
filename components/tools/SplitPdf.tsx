"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, downloadUrl } from "@/lib/imageUtil";
import { MAX_PDF_BYTES, MAX_SPLIT_FILES, isPdf, parseRanges, pdfBaseName, pdfUrl, readBytes } from "@/lib/pdfUtil";
import { useTr } from "@/lib/lang";

type Mode = "range" | "each";
type Out = { url: string; name: string; size: number; label: string };

export default function SplitPdf() {
  const tr = useTr();
  const [file, setFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState<Mode>("range");
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outs, setOuts] = useState<Out[]>([]);
  const urls = useRef<string[]>([]);

  const clearOuts = () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); urls.current = []; setOuts([]); };
  useEffect(() => () => { urls.current.forEach((u) => URL.revokeObjectURL(u)); }, []);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    clearOuts(); setError(""); setFile(null); setTotal(0); setRange("");
    if (!isPdf(f)) { setError(tr("শুধু PDF ফাইল দিন", "Please choose a PDF file")); return; }
    if (f.size > MAX_PDF_BYTES) { setError(tr("ফাইলের সাইজ ৫০ MB এর বেশি", "The file is larger than 50 MB")); return; }
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.load(await readBytes(f));
      setFile(f);
      setTotal(doc.getPageCount());
    } catch {
      setError(tr("PDF খোলা যায়নি। ফাইলটি পাসওয়ার্ড দেওয়া বা নষ্ট হতে পারে।", "Could not open this PDF. It may be password protected or damaged."));
    } finally {
      setBusy(false);
    }
  };

  const reset = () => { clearOuts(); setFile(null); setTotal(0); setRange(""); setError(""); };

  const split = async () => {
    if (!file) return;
    setError(""); clearOuts();
    let pageNums: number[];
    if (mode === "range") {
      const r = parseRanges(range, total);
      if (r.error) {
        const msg = {
          empty: tr("পেজ নম্বর লিখুন, যেমন 1-3, 5", "Enter the pages, for example 1-3, 5"),
          invalid: tr("ভুল ফরম্যাট। এভাবে লিখুন: 1-3, 5, 8-10", "Invalid format. Write it like: 1-3, 5, 8-10"),
          range: tr(`পেজ নম্বর ১ থেকে ${total} এর মধ্যে হতে হবে`, `Page numbers must be between 1 and ${total}`),
          order: tr("রেঞ্জের শুরু শেষের চেয়ে বড় হতে পারে না, যেমন 5-3 ভুল", "A range cannot start after it ends, e.g. 5-3 is wrong"),
        }[r.error];
        setError(msg);
        return;
      }
      pageNums = r.pages;
    } else {
      if (total > MAX_SPLIT_FILES) {
        setError(tr(`একটি একটি করে আলাদা করতে হলে PDF এ সর্বোচ্চ ${MAX_SPLIT_FILES}টি পেজ থাকতে পারে। "পেজ রেঞ্জ" ব্যবহার করুন।`, `Separate pages work for PDFs up to ${MAX_SPLIT_FILES} pages. Use "Page range" instead.`));
        return;
      }
      pageNums = Array.from({ length: total }, (_, i) => i + 1);
    }
    setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await readBytes(file));
      const base = pdfBaseName(file.name);
      const made: Out[] = [];
      const make = async (nums: number[], name: string, label: string) => {
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, nums.map((n) => n - 1));
        copied.forEach((p) => out.addPage(p));
        const bytes = await out.save();
        const url = pdfUrl(bytes);
        urls.current.push(url);
        made.push({ url, name, size: bytes.length, label });
      };
      if (mode === "range") await make(pageNums, `${base}-pages.pdf`, tr(`${pageNums.length}টি পেজ`, `${pageNums.length} page(s)`));
      else for (const n of pageNums) await make([n], `${base}-page-${n}.pdf`, tr(`পেজ ${n}`, `Page ${n}`));
      setOuts(made);
    } catch {
      setError(tr("PDF আলাদা করা যায়নি। আবার চেষ্টা করুন।", "Could not split the PDF. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const tab = (m: Mode) => `flex-1 py-2.5 rounded-xl border text-sm ${mode === m ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("PDF সিলেক্ট করতে ট্যাপ করুন", "Tap to select a PDF")}</span>
        <span className="text-xs text-slate-500">{file ? tr(`${total}টি পেজ, ${fmtBytes(file.size)}`, `${total} page(s), ${fmtBytes(file.size)}`) : tr("সর্বোচ্চ ৫০ MB", "Up to 50 MB")}</span>
        <input type="file" accept="application/pdf,.pdf" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ফাইল কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your file is not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {busy && !file && <p className="text-sm text-slate-500">{tr("ফাইল পড়া হচ্ছে...", "Reading the file...")}</p>}

      {file && (
        <>
          <div className="flex gap-2">
            <button onClick={() => { setMode("range"); clearOuts(); }} className={tab("range")}>{tr("পেজ রেঞ্জ", "Page range")}</button>
            <button onClick={() => { setMode("each"); clearOuts(); }} className={tab("each")}>{tr("প্রতি পেজ আলাদা", "Each page separately")}</button>
          </div>
          {mode === "range" ? (
            <div>
              <label className="text-sm font-medium dark:text-slate-200">{tr(`কোন পেজগুলো রাখবেন? (১ থেকে ${total})`, `Which pages to keep? (1 to ${total})`)}</label>
              <input value={range} onChange={(e) => setRange(e.target.value)} placeholder="1-3, 5, 8-10" className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              <p className="text-xs text-slate-500 mt-1">{tr("এই পেজগুলো নিয়ে একটি নতুন PDF হবে।", "These pages become one new PDF.")}</p>
            </div>
          ) : (
            <p className="text-xs text-slate-500">{tr(`প্রতিটি পেজ আলাদা PDF হবে, তারপর একটি একটি করে ডাউনলোড করবেন (সর্বোচ্চ ${MAX_SPLIT_FILES} পেজ)।`, `Every page becomes its own PDF and you download them one by one (up to ${MAX_SPLIT_FILES} pages).`)}</p>
          )}
          <div className="flex gap-3">
            <button onClick={split} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">
              {busy ? tr("প্রসেস হচ্ছে...", "Processing...") : tr("PDF আলাদা করুন", "Split PDF")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {outs.length > 0 && (
        <ul className="space-y-2">
          {outs.map((o) => (
            <li key={o.name} className="flex items-center gap-3 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate dark:text-white">{o.name}</p>
                <p className="text-xs text-slate-500">{o.label}, {fmtBytes(o.size)}</p>
              </div>
              <button onClick={() => downloadUrl(o.url, o.name)} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
