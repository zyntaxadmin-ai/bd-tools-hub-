"use client";
import { useEffect, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, loadImage, canvasToBlob, renderToCanvas, fitPixels, downloadUrl, baseName, extFor, MAX_FILE_BYTES } from "@/lib/imageUtil";
import { useTr } from "@/lib/lang";

type Mime = "image/jpeg" | "image/png" | "image/webp";
const FORMATS: { id: Mime; label: string }[] = [
  { id: "image/jpeg", label: "JPG" },
  { id: "image/png", label: "PNG" },
  { id: "image/webp", label: "WebP" },
];

const ERR_EN: Record<string, string> = {
  "এই ছবিটি খোলা যায়নি": "This image could not be opened",
  "ছবির মাপ জানা যায়নি": "Could not read the image size",
  "শুধু ছবি ফাইল দিন": "Please choose an image file",
  "ছবির সাইজ ২৫ MB এর বেশি": "The image is larger than 25 MB",
  "রূপান্তর করা যায়নি": "Conversion failed"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  return m;
}

export default function ImageConverter() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
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
        <span className="text-sm font-medium">{file ? file.name : tr("ছবি সিলেক্ট করতে ট্যাপ করুন", "Tap to select an image")}</span>
        <span className="text-xs text-slate-500">{file ? `${file.type || tr("ছবি", "Image")}, ${fmtBytes(file.size)}` : tr("JPG, PNG, WebP (সর্বোচ্চ ২৫ MB)", "JPG, PNG, WebP (up to 25 MB)")}</span>
        <input type="file" accept="image/*" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ছবি কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your image is not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{E(error)}</p>}

      {img && (
        <>
          <div>
            <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("কোন ফরম্যাটে বদলাবেন?", "Which format do you want?")}</p>
            <div className="flex gap-2">
              {FORMATS.map((f) => (
                <button key={f.id} onClick={() => setTarget(f.id)} className={`flex-1 py-2.5 rounded-xl border text-sm ${target === f.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{f.label}</button>
              ))}
            </div>
          </div>
          {target !== "image/png" && (
            <div>
              <label className="text-sm font-medium dark:text-slate-200">{tr("কোয়ালিটি:", "Quality:")} {quality}%</label>
              <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value, 10))} className="w-full mt-2 accent-indigo-600" />
            </div>
          )}
          {target === "image/jpeg" && <p className="text-xs text-slate-500">{tr("JPG স্বচ্ছতা (transparent) সাপোর্ট করে না, তাই স্বচ্ছ অংশ সাদা হয়ে যাবে।", "JPG does not support transparency, so transparent areas will turn white.")}</p>}
        </>
      )}

      {busy && <p className="text-sm text-slate-500">{tr("প্রসেস হচ্ছে...", "Processing...")}</p>}
      {result && file && (
        <div className="space-y-3">
          {result.mime !== target && <p className="text-xs text-amber-600">{tr(`আপনার ব্রাউজার এই ফরম্যাট সাপোর্ট করে না, তাই ${extFor(result.mime).toUpperCase()} হিসেবে সেভ হবে।`, `Your browser does not support this format, so it will be saved as ${extFor(result.mime).toUpperCase()}.`)}</p>}
          {result.scaled && <p className="text-xs text-amber-600">{tr("ছবিটি খুব বড় ছিল, তাই ফোনের মেমোরির জন্য মাপ কিছুটা ছোট করা হয়েছে।", "The image was very large, so its dimensions were reduced slightly to fit your phone's memory.")}</p>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt={tr("রূপান্তর করা ছবি", "Converted image")} className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-700" />
          <p className="text-xs text-center text-slate-500">{tr("নতুন সাইজ:", "New size:")} {fmtBytes(result.size)}</p>
          <button onClick={() => downloadUrl(result.url, `${baseName(file.name)}.${extFor(result.mime)}`)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
        </div>
      )}
      {file && <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("নতুন ছবি", "New image")}</button>}
    </div>
  );
}
