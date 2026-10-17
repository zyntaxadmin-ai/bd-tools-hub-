"use client";
import { useState, useEffect, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "!@#$%^&*()-_=+[]{};:,.?",
};
const CONFUSING = /[0O1lI]/g;

function randInt(max: number) {
  // unbiased random integer in [0, max)
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, number: true, symbol: true, clean: false });
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [bits, setBits] = useState(0);

  const generate = useCallback(() => {
    const keys = (["upper", "lower", "number", "symbol"] as const).filter((k) => opts[k]);
    if (keys.length === 0) { setError("কমপক্ষে একটি অপশন সিলেক্ট করুন"); setPwd(""); setBits(0); return; }
    setError("");
    const pools = keys.map((k) => (opts.clean ? SETS[k].replace(CONFUSING, "") : SETS[k]));
    const all = pools.join("");
    const chars: string[] = pools.map((p) => p[randInt(p.length)]); // প্রতিটি ধরন থেকে অন্তত একটি
    while (chars.length < length) chars.push(all[randInt(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) { const j = randInt(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    setPwd(chars.slice(0, length).join(""));
    setBits(length * Math.log2(all.length));
    setCopied(false);
  }, [length, opts]);

  useEffect(() => { generate(); }, [generate]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(pwd); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };

  const strength = bits < 50 ? { t: "দুর্বল", c: "bg-red-500", w: "25%" } : bits < 80 ? { t: "মোটামুটি", c: "bg-amber-500", w: "55%" } : bits < 110 ? { t: "শক্তিশালী", c: "bg-emerald-500", w: "80%" } : { t: "খুব শক্তিশালী", c: "bg-emerald-600", w: "100%" };
  const toggle = (k: keyof typeof opts) => setOpts({ ...opts, [k]: !opts[k] });
  const labels: [keyof typeof opts, string][] = [["upper", "বড় হাতের (A-Z)"], ["lower", "ছোট হাতের (a-z)"], ["number", "সংখ্যা (0-9)"], ["symbol", "চিহ্ন (!@#$)"], ["clean", "বিভ্রান্তিকর অক্ষর বাদ (0, O, 1, l, I)"]];

  return (
    <div className="space-y-5">
      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
        <p className="font-mono text-lg break-all dark:text-white min-h-[28px]">{pwd}</p>
        {pwd && (
          <div className="mt-3">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div className={`h-full ${strength.c}`} style={{ width: strength.w }} /></div>
            <p className="text-xs text-slate-500 mt-1">শক্তি: {strength.t}</p>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button onClick={copy} disabled={!pwd} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
        <button onClick={generate} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 dark:text-white"><RefreshCw className="w-4 h-4" /> নতুন</button>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">দৈর্ঘ্য: {length}</label>
        <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full mt-2 accent-indigo-600" />
      </div>
      <div className="space-y-2">
        {labels.map(([k, label]) => (
          <label key={k} className="flex items-center gap-3 text-sm dark:text-slate-200">
            <input type="checkbox" checked={opts[k]} onChange={() => toggle(k)} className="w-4 h-4 accent-indigo-600" /> {label}
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <p className="text-xs text-slate-500">পাসওয়ার্ড আপনার ব্রাউজারেই তৈরি হয়। এটি কোথাও পাঠানো বা সেভ করা হয় না।</p>
    </div>
  );
}
