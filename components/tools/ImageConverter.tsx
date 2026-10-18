"use client";
import { useEffect, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, loadImage, canvasToBlob, renderToCanvas, fitPixels, downloadUrl, baseName, extFor, MAX_FILE_BYTES } from "@/lib/imageUtil";

type Mime = "image/jpeg" | "image/png" | "image/webp";
const FORMATS: { id: Mime; label: string }[] = [
  { id: "image/jpeg", label: "JPG" },
  { id: "image/png", label: "PNG" },
  { id: "image/webp", label: "WebP" },
];

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [target, setTarget] = useState<Mime>("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<{ url: string; size: number; mime: string; scaled: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("শুধু ছবি ফাইল দিন"); return; }
    if (f.size > MAX_FILE_BYTES) { setError("ছবির সাইজ ২৫ MB এর বেশি"); return; }
    setError("");
    setFile(f);
  };

  useEffect(() => {
    if (!file) { setImg(null); return; }
    let cancelled = false;
    const url = URL.createObjectURL(file);
    loadImage(url)
      .then((i) => { if (!cancelled) setImg(i); })
      .catch(() => { if (!cancelled) { setImg(null); setError("এই ছবিটি খোলা যায়নি"); } });
    return () => { cancelled = true; URL.revokeObjectURL(url); };
  }, [file]);

  useEffect(() => {
    if (!img) { setResult(null); return; }
    let cancelled = false;
    let url = "";
    (async () => {
      setBusy(true);
      const w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { setError("ছবির মাপ জানা যায়নি"); setBusy(false); return; }
      const fit = fitPixels(w, h);
      const c = renderToCanvas(img, fit.w, fit.h, target === "image/jpeg");
      const blob = await canvasToBlob(c, target, quality / 100);
      if (cancelled) return;
      if (!blob) { setError("রূপান্তর করা যায়নি"); setBusy(false); return; }
      url = URL.createObjectURL(blob);
      setError("");
      setResult({ url, size: blob.size, mime: blob.type || target, scaled: fit.scaled });
      setBusy(false);
    })();
    return () => { cancelled = true; if (url) URL.revokeObjectURL(url); };
  }, [img, target, quality]);

  const reset = () => { setFile(null); setImg(null); setResult(null); setError(""); };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : "ছবি সিলেক্ট করতে ট্যাপ করুন"}</span>
        <span className="text-xs text-slate-500">{file ? `${file.type || "ছবি"}, ${fmtBytes(file.size)}` : "JPG, PNG, WebP (সর্বোচ্চ ২৫ MB)"}</span>
        <input type="file" accept="image/*" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">আপনার ছবি কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।</p>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {img && (
        <>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-2">কোন ফরম্যাটে বদলাবেন?</p>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button key={f.id} onClick={() => setTarget(f.id)} className={`flex-1 py-2.5 rounded-xl border text-sm ${target === f.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{f.label}</button>
              ))}
            </div>
          </div>
          {target !== "image/png" && (
            <div>
              <label className="text-sm font-medium dark:text-slate-200">কোয়ালিটি: {quality}%</label>
              <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value, 10))} className="w-full mt-2 accent-indigo-600" />
            </div>
          )}
          {target === "image/jpeg" && <p className="text-xs text-slate-500">JPG স্বচ্ছতা (transparent) সাপোর্ট করে না, তাই স্বচ্ছ অংশ সাদা হয়ে যাবে।</p>}
        </>
      )}

      {busy && <p className="text-sm text-slate-500">প্রসেস হচ্ছে...</p>}
      {result && file && (
        <div className="space-y-3">
          {result.mime !== target && <p className="text-xs text-amber-600">আপনার ব্রাউজার এই ফরম্যাট সাপোর্ট করে না, তাই {extFor(result.mime).toUpperCase()} হিসেবে সেভ হবে।</p>}
          {result.scaled && <p className="text-xs text-amber-600">ছবিটি খুব বড় ছিল, তাই ফোনের মেমোরির জন্য মাপ কিছুটা ছোট করা হয়েছে।</p>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt="রূপান্তর করা ছবি" className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-700" />
          <p className="text-xs text-center text-slate-500">নতুন সাইজ: {fmtBytes(result.size)}</p>
          <button onClick={() => downloadUrl(result.url, `${baseName(file.name)}.${extFor(result.mime)}`)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> ডাউনলোড</button>
        </div>
      )}
      {file && <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> নতুন ছবি</button>}
    </div>
  );
}
