"use client";
import { useEffect, useRef, useState } from "react";
import { Camera, Copy, Check, ImageUp, RotateCcw, ExternalLink } from "lucide-react";
import { useTr } from "@/lib/lang";
import { classifyScan } from "@/lib/scan";
import { fitPixels, loadImage, MAX_FILE_BYTES } from "@/lib/imageUtil";

type Status = "idle" | "starting" | "scanning";
type Err = "" | "denied" | "nocam" | "unsupported" | "fail" | "noqr" | "badfile" | "bigfile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadJsQR(): Promise<(d: Uint8ClampedArray, w: number, h: number, o?: any) => { data: string } | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: any = await import("jsqr");
  return mod.default ?? mod;
}

export default function QrScanner() {
  const tr = useTr();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const [err, setErr] = useState<Err>("");
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef(0);
  const aliveRef = useRef(false);

  const stop = () => {
    aliveRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus("idle");
  };
  useEffect(() => () => { aliveRef.current = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); streamRef.current?.getTracks().forEach((t) => t.stop()); }, []);

  const start = async () => {
    setErr(""); setResult(""); setCopied(false);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) { setErr("unsupported"); return; }
    setStatus("starting");
    try {
      const jsQR = await loadJsQR();
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      streamRef.current = stream;
      const v = videoRef.current;
      if (!v) { stream.getTracks().forEach((t) => t.stop()); setStatus("idle"); return; }
      v.srcObject = stream;
      v.setAttribute("playsinline", "true");
      await v.play();
      aliveRef.current = true;
      setStatus("scanning");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      let last = 0;
      const tick = (t: number) => {
        if (!aliveRef.current) return;
        rafRef.current = requestAnimationFrame(tick);
        if (t - last < 120 || !ctx || v.readyState < 2 || !v.videoWidth) return;
        last = t;
        const scale = Math.min(1, 640 / v.videoWidth);
        canvas.width = Math.round(v.videoWidth * scale); canvas.height = Math.round(v.videoHeight * scale);
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
        if (code && code.data) {
          setResult(code.data);
          try { navigator.vibrate?.(80); } catch { /* ignore */ }
          stop();
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      stop();
      const name = (e as { name?: string })?.name;
      setErr(name === "NotAllowedError" || name === "SecurityError" ? "denied" : name === "NotFoundError" || name === "OverconstrainedError" ? "nocam" : "fail");
    }
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setErr(""); setResult(""); setCopied(false);
    if (!f.type.startsWith("image/")) { setErr("badfile"); return; }
    if (f.size > MAX_FILE_BYTES) { setErr("bigfile"); return; }
    const url = URL.createObjectURL(f);
    try {
      const [jsQR, img] = await Promise.all([loadJsQR(), loadImage(url)]);
      const fit = fitPixels(img.naturalWidth, img.naturalHeight, 4_000_000);
      const canvas = document.createElement("canvas");
      canvas.width = fit.w; canvas.height = fit.h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, fit.w, fit.h);
      const d = ctx.getImageData(0, 0, fit.w, fit.h);
      const code = jsQR(d.data, d.width, d.height, { inversionAttempts: "attemptBoth" });
      if (code && code.data) setResult(code.data); else setErr("noqr");
    } catch { setErr("badfile"); } finally { URL.revokeObjectURL(url); }
  };

  const copy = async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };
  const info = result ? classifyScan(result) : null;
  const errText: Record<string, string> = {
    denied: tr("ক্যামেরার অনুমতি দেওয়া হয়নি। ব্রাউজারের সেটিংস থেকে এই সাইটে ক্যামেরা চালু করুন।", "Camera permission was denied. Allow the camera for this site in your browser settings."),
    nocam: tr("কোনো ক্যামেরা পাওয়া যায়নি।", "No camera was found."),
    unsupported: tr("এই ব্রাউজারে ক্যামেরা সাপোর্ট নেই। নিচে থেকে QR এর ছবি আপলোড করুন।", "Camera is not supported in this browser. Upload a photo of the QR code instead."),
    fail: tr("ক্যামেরা চালু করা যায়নি। অন্য অ্যাপ ক্যামেরা ব্যবহার করছে কিনা দেখুন।", "Could not start the camera. Check whether another app is using it."),
    noqr: tr("এই ছবিতে কোনো QR কোড পাওয়া যায়নি। স্পষ্ট ও কাছের ছবি দিন।", "No QR code was found in this image. Try a clearer, closer photo."),
    badfile: tr("ছবিটি পড়া যায়নি। JPG বা PNG ছবি দিন।", "The image could not be read. Use a JPG or PNG image."),
    bigfile: tr("ছবির সাইজ ২৫ MB এর বেশি।", "The image is larger than 25 MB."),
  };

  return (
    <div className="space-y-4">
      <div className={`relative rounded-xl overflow-hidden bg-slate-900 ${status === "idle" ? "hidden" : ""}`}>
        <video ref={videoRef} muted playsInline className="w-full max-h-80 object-cover" />
        {status === "scanning" && <div className="absolute inset-6 border-2 border-white/80 rounded-xl pointer-events-none" />}
        {status === "starting" && <p className="absolute inset-0 flex items-center justify-center text-white text-sm">{tr("ক্যামেরা চালু হচ্ছে...", "Starting the camera...")}</p>}
      </div>

      {status === "idle" ? (
        <button onClick={start} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Camera className="w-4 h-4" /> {result ? tr("আবার স্ক্যান করুন", "Scan again") : tr("ক্যামেরা চালু করুন", "Start camera")}</button>
      ) : (
        <button onClick={stop} className="w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white">{tr("বন্ধ করুন", "Stop")}</button>
      )}
      {status === "scanning" && <p className="text-sm text-center text-slate-500">{tr("QR কোডটি ফ্রেমের ভেতরে ধরুন", "Hold the QR code inside the frame")}</p>}

      <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-3 cursor-pointer text-sm dark:text-slate-200 hover:border-indigo-400">
        <ImageUp className="w-4 h-4 text-indigo-600" /> {tr("অথবা QR এর ছবি আপলোড করুন", "Or upload a photo of a QR code")}
        <input type="file" accept="image/*" onChange={onFile} className="hidden" />
      </label>

      {err && <p className="text-sm text-red-500">{errText[err]}</p>}

      {result && info && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 space-y-3">
          <p className="text-xs text-slate-500">{info.kind === "url" ? tr("লিংক পাওয়া গেছে", "Link found") : tr("লেখা পাওয়া গেছে", "Text found")}</p>
          <p className="font-mono text-sm break-all dark:text-white">{result}</p>
          {info.kind === "url" && (
            <p className="text-xs text-amber-700 dark:text-amber-400">{tr("লিংকে ঢোকার আগে ঠিকানাটি ভালোভাবে দেখুন। অচেনা QR কোড থেকে ক্ষতিকর সাইটে যাওয়া যেতে পারে।", "Check the address before opening it. An unknown QR code can lead to a harmful site.")}</p>
          )}
          <div className="flex gap-2 flex-wrap">
            {info.kind === "url" && info.href && (
              <a href={info.href} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm flex items-center gap-1"><ExternalLink className="w-4 h-4" /> {tr("লিংক খুলুন", "Open link")}</a>
            )}
            <button onClick={copy} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm flex items-center gap-1 dark:text-white">{copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}</button>
            <button onClick={() => { setResult(""); setErr(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> {tr("মুছুন", "Clear")}</button>
          </div>
        </div>
      )}
      <p className="text-xs text-slate-500">{tr("ক্যামেরার ছবি শুধু আপনার ফোনেই প্রসেস হয়, কোথাও পাঠানো বা সেভ করা হয় না। ক্যামেরা চালাতে HTTPS সাইট ও আপনার অনুমতি লাগে।", "Camera images are processed only on your phone and are never sent or saved. The camera needs an HTTPS site and your permission.")}</p>
    </div>
  );
}
