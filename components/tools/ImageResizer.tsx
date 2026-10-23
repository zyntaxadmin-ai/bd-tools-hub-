"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Download, RotateCcw } from "lucide-react";
import { fmtBytes, loadImage, canvasToBlob, downloadUrl, baseName, extFor, MAX_FILE_BYTES } from "@/lib/imageUtil";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const PRESETS = [
  { label: "পাসপোর্ট 413×531", w: 413, h: 531 },
  { label: "300×300", w: 300, h: 300 },
  { label: "600×600", w: 600, h: 600 },
  { label: "1280×720", w: 1280, h: 720 },
  { label: "1920×1080", w: 1920, h: 1080 },
];
const MAX_SIDE = 8000;

const EN: Record<string, string> = {
  "পাসপোর্ট 413×531": "Passport 413×531"
};

const ERR_EN: Record<string, string> = {
  "শুধু ছবি ফাইল দিন": "Please choose an image file",
  "ছবির সাইজ ২৫ MB এর বেশি": "The image is larger than 25 MB",
  "এই ছবিটি খোলা যায়নি": "This image could not be opened",
  "প্রস্থ ও উচ্চতা ১ বা তার বেশি দিন": "Width and height must be 1 or more",
  "রিসাইজ করা যায়নি": "Resize failed"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  const d325 = new RegExp("^প্রস্থ বা উচ্চতা (\\d+) px এর বেশি হতে পারবে না$").exec(m);
  if (d325) return "Width or height cannot exceed $1 px".replace("$1", d325[1]);
  return m;
}

export default function ImageResizer() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
  const tl = (x: string) => tr(x, EN[x] ?? x);
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [lock, setLock] = useState(true);
  const [fit, setFit] = useState<"crop" | "stretch">("crop");
  const [mime, setMime] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState<{ url: string; size: number; w: number; h: number; mime: string } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const urlRef = useRef("");

  const clearResult = () => { if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = ""; } setResult(null); };
  useEffect(() => () => { if (urlRef.current) URL.revokeObjectURL(urlRef.current); }, []);

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
      .then((i) => { if (cancelled) return; setImg(i); setW(String(i.naturalWidth)); setH(String(i.naturalHeight)); clearResult(); })
      .catch(() => { if (!cancelled) { setImg(null); setError("এই ছবিটি খোলা যায়নি"); } });
    return () => { cancelled = true; URL.revokeObjectURL(url); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onW = (v: string) => {
    setW(v);
    const n = parseInt(v, 10);
    if (lock && img && !isNaN(n) && n > 0) setH(String(Math.max(1, Math.round((n * img.naturalHeight) / img.naturalWidth))));
  };
  const onH = (v: string) => {
    setH(v);
    const n = parseInt(v, 10);
    if (lock && img && !isNaN(n) && n > 0) setW(String(Math.max(1, Math.round((n * img.naturalWidth) / img.naturalHeight))));
  };
  const applyPreset = (pw: number, ph: number) => { setLock(false); setFit("crop"); setW(String(pw)); setH(String(ph)); };

  const run = async () => {
    if (!img || !file) return;
    const W = parseInt(w, 10), H = parseInt(h, 10);
    if (isNaN(W) || isNaN(H) || W < 1 || H < 1) { setError("প্রস্থ ও উচ্চতা ১ বা তার বেশি দিন"); return; }
    if (W > MAX_SIDE || H > MAX_SIDE) { setError(`প্রস্থ বা উচ্চতা ${MAX_SIDE} px এর বেশি হতে পারবে না`); return; }
    setError(""); setBusy(true);
    const nw = img.naturalWidth, nh = img.naturalHeight;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d")!;
    if (mime === "image/jpeg") { ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, W, H); }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (fit === "crop" && !lock) {
      const scale = Math.max(W / nw, H / nh);
      const sw = W / scale, sh = H / scale;
      ctx.drawImage(img, (nw - sw) / 2, (nh - sh) / 2, sw, sh, 0, 0, W, H);
    } else {
      ctx.drawImage(img, 0, 0, W, H);
    }
    const blob = await canvasToBlob(c, mime, quality / 100);
    setBusy(false);
    if (!blob) { setError("রিসাইজ করা যায়নি"); return; }
    clearResult();
    const url = URL.createObjectURL(blob);
    urlRef.current = url;
    setResult({ url, size: blob.size, w: W, h: H, mime: blob.type || mime });
  };

  const reset = () => { setFile(null); setImg(null); setW(""); setH(""); setError(""); clearResult(); };

  return (
    <div className="space-y-4">
      <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-indigo-400 text-center dark:text-slate-200">
        <Upload className="w-6 h-6 text-indigo-600" />
        <span className="text-sm font-medium">{file ? file.name : tr("ছবি সিলেক্ট করতে ট্যাপ করুন", "Tap to select an image")}</span>
        <span className="text-xs text-slate-500">{img ? tr(`বর্তমান মাপ: ${img.naturalWidth} × ${img.naturalHeight} px, ${fmtBytes(file!.size)}`, `Current size: ${img.naturalWidth} × ${img.naturalHeight} px, ${fmtBytes(file!.size)}`) : tr("JPG, PNG, WebP (সর্বোচ্চ ২৫ MB)", "JPG, PNG, WebP (up to 25 MB)")}</span>
        <input type="file" accept="image/*" onChange={onPick} className="hidden" />
      </label>
      <p className="text-xs text-slate-500">{tr("আপনার ছবি কোথাও আপলোড হয় না। সব কাজ আপনার ফোন/ব্রাউজারেই হয়।", "Your image is not uploaded anywhere. Everything happens on your phone/browser.")}</p>
      {error && <p className="text-sm text-red-500">{E(error)}</p>}

      {img && (
        <>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={tl(p.label)} onClick={() => applyPreset(p.w, p.h)} className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs dark:text-white hover:bg-indigo-50 dark:hover:bg-slate-800">{tl(p.label)}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-sm font-medium dark:text-slate-200">{tr("প্রস্থ (px)", "Width (px)")}</label><input type="number" inputMode="numeric" value={w} onChange={(e) => onW(e.target.value)} className={input} /></div>
            <div><label className="text-sm font-medium dark:text-slate-200">{tr("উচ্চতা (px)", "Height (px)")}</label><input type="number" inputMode="numeric" value={h} onChange={(e) => onH(e.target.value)} className={input} /></div>
          </div>
          <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={lock} onChange={() => setLock(!lock)} className="w-4 h-4 accent-indigo-600" /> {tr("অনুপাত ঠিক রাখুন (lock)", "Keep aspect ratio (lock)")}</label>
          {!lock && (
            <div className="flex gap-2">
              <button onClick={() => setFit("crop")} className={`flex-1 py-2 rounded-xl border text-xs ${fit === "crop" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("মাঝখান থেকে কেটে ভরাট", "Crop to fill from the centre")}</button>
              <button onClick={() => setFit("stretch")} className={`flex-1 py-2 rounded-xl border text-xs ${fit === "stretch" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("টেনে ভরাট (বিকৃত হতে পারে)", "Stretch to fill (may distort)")}</button>
            </div>
          )}
          <div className="flex gap-2">
            {([["image/jpeg", "JPEG"], ["image/png", "PNG"], ["image/webp", "WebP"]] as const).map(([m, label]) => (
              <button key={m} onClick={() => setMime(m)} className={`flex-1 py-2 rounded-xl border text-sm ${mime === m ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{label}</button>
            ))}
          </div>
          {mime !== "image/png" && (
            <div>
              <label className="text-sm font-medium dark:text-slate-200">{tr("কোয়ালিটি:", "Quality:")} {quality}%</label>
              <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(parseInt(e.target.value, 10))} className="w-full mt-2 accent-indigo-600" />
            </div>
          )}
          <button onClick={run} disabled={busy} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-60">{busy ? tr("প্রসেস হচ্ছে...", "Processing...") : tr("রিসাইজ করুন", "Resize")}</button>
        </>
      )}

      {result && file && (
        <div className="space-y-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={result.url} alt={tr("রিসাইজ করা ছবি", "Resized image")} className="max-h-64 mx-auto rounded-lg border border-slate-200 dark:border-slate-700" />
          <p className="text-xs text-center text-slate-500">{result.w} × {result.h} px, {fmtBytes(result.size)}</p>
          <button onClick={() => downloadUrl(result.url, `${baseName(file.name)}-${result.w}x${result.h}.${extFor(result.mime)}`)} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> {tr("ডাউনলোড", "Download")}</button>
        </div>
      )}
      {file && <button onClick={reset} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("নতুন ছবি", "New image")}</button>}
    </div>
  );
}
