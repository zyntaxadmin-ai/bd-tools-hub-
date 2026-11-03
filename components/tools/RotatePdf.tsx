"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw, RotateCw } from "lucide-react";
import { fmtBytes, downloadUrl } from "@/lib/imageUtil";
import { MAX_PDF_BYTES, isPdf, parseRanges, pdfBaseName, pdfUrl, readBytes } from "@/lib/pdfUtil";
import { useTr } from "@/lib/lang";

type Scope = "all" | "range";
type Out = { url: string; name: string; size: number };

const ANGLES: { value: number; bn: string; en: string }[] = [
  { value: 90, bn: "ডানে ৯০°", en: "Right 90°" },
  { value: 270, bn: "বামে ৯০°", en: "Left 90°" },
  { value: 180, bn: "১৮০°", en: "180°" },
];

export default function RotatePdf() {
  const tr = useTr();
  const [file, setFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);
  const [angle, setAngle] = useState(90);
  const [scope, setScope] = useState<Scope>("all");
  const [range, setRange] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [out, setOut] = useState<Out | null>(null);
  const urlRef = useRef<string>("");

  const clearOut = () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); urlRef.current = ""; setOut(null); };
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    clearOut(); setError(""); setFile(null); setTotal(0); setRange("");
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

  const reset = () => { clearOut(); setFile(null); setTotal(0); setRange(""); setError(""); };

  const rotate = async () => {
    if (!file) return;
    setError(""); clearOut();
    let targets: Set<number> | null = null; // null means all pages
    if (scope === "range") {
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
      targets = new Set(r.pages);
    }
    setBusy(true);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const doc = await PDFDocument.load(await readBytes(file));
      doc.getPages().forEach((page, i) => {
        if (targets && !targets.has(i + 1)) return;
        const next = (((page.getRotation().angle + angle) % 360) + 360) % 360;
        page.setRotation(degrees(next));
      });
      const bytes = await doc.save();
      const url = pdfUrl(bytes);
      urlRef.current = url;
      setOut({ url, name: `${pdfBaseName(file.name)}-rotated.pdf`, size: bytes.length });
    } catch {
      setError(tr("PDF ঘোরানো যায়নি। আবার চেষ্টা করুন।", "Could not rotate the PDF. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const tab = (active: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${active ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("PDF সিলেক্ট করতে ট্যাপ করুন", "Tap to select a PDF")}</span>
        <span className="text-xs text-slate-500">{file ? tr(`${total}টি পেজ, ${fmtBytes(file.size)}`, `${total} page(s), ${fmtBytes(file.size)}`) : tr("সর্বোচ্চ ৫০ MB", "Up to 50 MB")}</span>
        <input type="file" accept="application/pdf,.pdf" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ফাইল কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your file is not uploaded anywhere. Everything happens on your phone or browser.")}</p>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {busy && !file && <p className="text-sm text-slate-500">{tr("ফাইল পড়া হচ্ছে...", "Reading the file...")}</p>}

      {file && (
        <>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-1">{tr("কত ডিগ্রি ঘোরাবেন?", "How far to rotate?")}</p>
            <div className="flex gap-2">
              {ANGLES.map((a) => (
                <button key={a.value} onClick={() => { setAngle(a.value); clearOut(); }} className={tab(angle === a.value)}>{tr(a.bn, a.en)}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-1">{tr("কোন পেজ?", "Which pages?")}</p>
            <div className="flex gap-2">
              <button onClick={() => { setScope("all"); clearOut(); }} className={tab(scope === "all")}>{tr("সব পেজ", "All pages")}</button>
              <button onClick={() => { setScope("range"); clearOut(); }} className={tab(scope === "range")}>{tr("নির্দিষ্ট পেজ", "Chosen pages")}</button>
            </div>
            {scope === "range" && (
              <div className="mt-3">
                <input value={range} onChange={(e) => setRange(e.target.value)} placeholder="1-3, 5, 8-10" aria-label={tr(`পেজ নম্বর (১ থেকে ${total})`, `Page numbers (1 to ${total})`)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                <p className="text-xs text-slate-500 mt-1">{tr(`শুধু এই পেজগুলো ঘুরবে (১ থেকে ${total})। বাকি পেজ যেমন আছে তেমনই থাকবে।`, `Only these pages are rotated (1 to ${total}). The other pages stay as they are.`)}</p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={rotate} disabled={busy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60 flex items-center justify-center gap-2">
              <RotateCw className="w-4 h-4" /> {busy ? tr("প্রসেস হচ্ছে...", "Processing...") : tr("PDF ঘোরান", "Rotate PDF")}
            </button>
            <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </>
      )}

      {out && (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate dark:text-white">{out.name}</p>
            <p className="text-xs text-slate-500">{fmtBytes(out.size)}</p>
          </div>
          <button onClick={() => downloadUrl(out.url, out.name)} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-indigo-700"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
        </div>
      )}
    </div>
  );
}
