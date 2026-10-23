"use client";
import { useEffect, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { downloadUrl } from "@/lib/imageUtil";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const LEVELS: { id: "L" | "M" | "Q" | "H"; label: string }[] = [
  { id: "L", label: "L (৭%)" },
  { id: "M", label: "M (১৫%)" },
  { id: "Q", label: "Q (২৫%)" },
  { id: "H", label: "H (৩০%)" },
];

const EN: Record<string, string> = {
  "L (৭%)": "L (7%)",
  "M (১৫%)": "M (15%)",
  "Q (২৫%)": "Q (25%)",
  "H (৩০%)": "H (30%)"
};

const ERR_EN: Record<string, string> = {
  "লেখা অনেক বড়। ১৫০০ অক্ষরের মধ্যে দিন": "The text is too long. Keep it within 1500 characters",
  "QR বানানো যায়নি। লেখা ছোট করে আবার চেষ্টা করুন": "Could not create the QR. Shorten the text and try again"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  return m;
}

export default function QrCodeGenerator() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
  const tl = (x: string) => tr(x, EN[x] ?? x);
  const [text, setText] = useState("");
  const [size, setSize] = useState(400);
  const [ec, setEc] = useState<"L" | "M" | "Q" | "H">("M");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text.trim()) { setDataUrl(""); setError(""); return; }
    if (text.length > 1500) { setDataUrl(""); setError("লেখা অনেক বড়। ১৫০০ অক্ষরের মধ্যে দিন"); return; }
    let cancelled = false;
    (async () => {
      try {
        // লাইব্রেরি শুধু এই টুল খুললেই লোড হয়
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod: any = await import("qrcode");
        const QR = mod.default ?? mod;
        const url: string = await QR.toDataURL(text, { width: size, margin: 2, errorCorrectionLevel: ec, color: { dark: fg, light: bg } });
        if (!cancelled) { setDataUrl(url); setError(""); }
      } catch {
        if (!cancelled) { setDataUrl(""); setError("QR বানানো যায়নি। লেখা ছোট করে আবার চেষ্টা করুন"); }
      }
    })();
    return () => { cancelled = true; };
  }, [text, size, ec, fg, bg]);

  const reset = () => { setText(""); setSize(400); setEc("M"); setFg("#000000"); setBg("#ffffff"); };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("লিংক বা লেখা", "Link or text")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={tr("যেমন: https://bd-tools-hub.vercel.app", "e.g. https://bd-tools-hub.vercel.app")} className={`${input} resize-none`} />
        <p className="text-xs text-slate-500 text-right">{text.length}/1500</p>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("সাইজ:", "Size:")} {size} px</label>
        <input type="range" min={200} max={1000} step={50} value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} className="w-full mt-2 accent-indigo-600" />
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("ভুল সংশোধনের মাত্রা", "Error correction level")}</p>
        <div className="grid grid-cols-4 gap-2">
          {LEVELS.map((l) => (
            <button key={l.id} onClick={() => setEc(l.id)} className={`py-2 rounded-xl border text-xs ${ec === l.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tl(l.label)}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("QR এর রং", "QR colour")}</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-12 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1" />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("ব্যাকগ্রাউন্ড", "Background")}</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-12 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1" />
        </div>
      </div>
      <p className="text-xs text-slate-500">{tr("গাঢ় রঙ আর হালকা ব্যাকগ্রাউন্ড ব্যবহার করুন, নাহলে কিছু স্ক্যানারে পড়া নাও যেতে পারে।", "Use a dark colour on a light background, otherwise some scanners may not read the QR.")}</p>
      <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{E(error)}</p>}
      {dataUrl && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl} alt={tr("QR কোড", "QR code")} style={{ width: Math.min(size, 300) }} className="mx-auto max-w-full h-auto rounded-lg border border-slate-200 dark:border-slate-700" />
          <button onClick={() => downloadUrl(dataUrl, "qrcode.png")} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("PNG ডাউনলোড (", "PNG download (")}{size}×{size})</button>
        </div>
      )}
    </div>
  );
}
