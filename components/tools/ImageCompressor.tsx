"use client";
import { useEffect, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, loadImage, canvasToBlob, renderToCanvas, fitPixels, downloadUrl, baseName, MAX_FILE_BYTES } from "@/lib/imageUtil";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
type Result = { url: string; size: number; w: number; h: number; scaled: boolean; realMime: string };

const ERR_EN: Record<string, string> = {
  "এই ছবিটি খোলা যায়নি": "This image could not be opened",
  "ছবির মাপ জানা যায়নি": "Could not read the image size",
  "শুধু ছবি ফাইল (JPG, PNG, WebP) দিন": "Please choose an image file (JPG, PNG, WebP)",
  "ছবির সাইজ ২৫ MB এর বেশি, ছোট ছবি দিন": "The image is larger than 25 MB. Please choose a smaller one",
  "কম্প্রেস করা যায়নি": "Compression failed"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  return m;
}

export default function ImageCompressor() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<"jpeg" | "webp">("jpeg");
  const [maxW, setMaxW] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) { setError("শুধু ছবি ফাইল (JPG, PNG, WebP) দিন"); return; }
    if (f.size > MAX_FILE_BYTES) { setError("ছবির সাইজ ২৫ MB এর বেশি, ছোট ছবি দিন"); return; }
    setError("");
    setFile(f);
  };

  // load image
  useEffect(() => {
    if (!file) { setImg(null); return; }
    let cancelled = false;
    const url = URL.createObjectURL(file);
    loadImage(url)
      .then((i) => { if (!cancelled) setImg(i); })
      .catch(() => { if (!cancelled) { setImg(null); setError("এই ছবিটি খোলা যায়নি"); } });
    return () => { cancelled = true; URL.revokeObjectURL(url); };
  }, [file]);

  // compress
  useEffect(() => {
    if (!img) { setResult(null); return; }
    let cancelled = false;
    let url = "";
    (async () => {
      setBusy(true);
      let w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { setError("ছবির মাপ জানা যায়নি"); setBusy(false); return; }
      const mw = parseInt(maxW, 10);
      if (!isNaN(mw) && mw > 0 && mw < w) { h = Math.round((h * mw) / w); w = mw; }
      const fit = fitPixels(w, h);
      const mime = format === "jpeg" ? "image/jpeg" : "image/webp";
      const c = renderToCanvas(img, fit.w, fit.h, format === "jpeg");
      const blob = await canvasToBlob(c, mime, quality / 100);
      if (cancelled) return;
      if (!blob) { setError("কম্প্রেস করা যায়নি"); setBusy(false); return; }
      url = URL.createObjectURL(blob);
      setError("");
      setResult({ url, size: blob.size, w: fit.w, h: fit.h, scaled: fit.scaled, realMime: blob.type });
      setBusy(false);
    })();
    return () => { cancelled = true; if (url) URL.revokeObjectURL(url); };
  }, [img, quality, format, maxW]);

  const reset = () => { setFile(null); setImg(null); setResult(null); setMaxW(""); setError(""); };
  const saving = file && result ? ((1 - result.size / file.size) * 100) : 0;
  const ext = result && result.realMime === "image/jpeg" ? "jpg" : result && result.realMime === "image/webp" ? "webp" : "png";

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("ছবি সিলেক্ট করতে ট্যাপ করুন", "Tap to select an image")}</span>
        <span className="text-xs text-slate-500">{tr("JPG, PNG, WebP (সর্বোচ্চ ২৫ MB)", "JPG, PNG, WebP (up to 25 MB)")}</span>
        <input type="file" accept="image/*" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ছবি কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your image is not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{E(error)}</p>}

      {img && (
        <>
          <div className="flex gap-2">
            <button onClick={() => setFormat("jpeg")} className={`flex-1 py-2 rounded-xl border text-sm ${format === "jpeg" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>JPEG</button>
            <button onClick={() => setFormat("webp")} className={`flex-1 py-2 rounded-xl border text-sm ${format === "webp" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>WebP</button>
          </div>
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr("কোয়ালিটি:", "Quality:")} {quality}%</label>
            <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value, 10))} className="w-full mt-2 accent-indigo-600" />
          </div>
          <div>
            <label className="text-sm font-medium dark:text-slate-200">{tr("সর্বোচ্চ প্রস্থ (px, ঐচ্ছিক)", "Maximum width (px, optional)")}</label>
            <input type="number" inputMode="numeric" value={maxW} onChange={(e) => setMaxW(e.target.value)} placeholder={tr(`বর্তমান: ${img.naturalWidth}`, `Current: ${img.naturalWidth}`)} className={input} />
          </div>
        </>
      )}

      {busy && <p className="text-sm text-slate-500">{tr("প্রসেস হচ্ছে...", "Processing...")}</p>}
      {result && file && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3"><p className="text-xs text-slate-500">{tr("আগে", "Before")}</p><p className="font-bold dark:text-white">{fmtBytes(file.size)}</p></div>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-xs text-slate-500">{tr("পরে", "After")}</p><p className="font-bold text-indigo-600 dark:text-indigo-400">{fmtBytes(result.size)}</p></div>
            <div className={`rounded-xl p-3 ${saving >= 0 ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-red-50 dark:bg-red-950/20"}`}><p className="text-xs text-slate-500">{tr("সাশ্রয়", "Saved")}</p><p className={`font-bold ${saving >= 0 ? "text-emerald-600" : "text-red-600"}`}>{saving.toFixed(0)}%</p></div>
          </div>
          {saving < 0 && <p className="text-xs text-amber-600">{tr("ছবিটি আগে থেকেই ছোট বা কম্প্রেসড, তাই সাইজ বাড়ছে। কোয়ালিটি কমিয়ে দেখুন।", "The image is already small or compressed, so the size increases. Try lowering the quality.")}</p>}
          {result.scaled && <p className="text-xs text-amber-600">{tr("ছবিটি খুব বড় ছিল, তাই ফোনের মেমোরির জন্য মাপ কিছুটা ছোট করা হয়েছে।", "The image was very large, so its dimensions were reduced slightly to fit your phone's memory.")}</p>}
          {result.realMime !== (format === "jpeg" ? "image/jpeg" : "image/webp") && <p className="text-xs text-amber-600">{tr(`আপনার ব্রাউজার ${format.toUpperCase()} সাপোর্ট করে না, তাই PNG হিসেবে সেভ হবে।`, `Your browser does not support ${format.toUpperCase()}, so it will be saved as PNG.`)}</p>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt={tr("কম্প্রেস করা ছবি", "Compressed image")} className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-700" />
          <p className="text-xs text-center text-slate-500">{result.w} × {result.h} px</p>
          <button onClick={() => downloadUrl(result.url, `${baseName(file.name)}-compressed.${ext}`)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
        </div>
      )}
      {file && <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("নতুন ছবি", "New image")}</button>}
    </div>
  );
}
