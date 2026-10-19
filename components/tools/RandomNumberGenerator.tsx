"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { randomNumbers, secureInt } from "@/lib/rand";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const tab = (on: boolean) => `flex-1 py-2 rounded-xl border text-sm ${on ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
const LIMIT = 1_000_000_000;

function NumberMode() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [unique, setUnique] = useState(false);
  const [sort, setSort] = useState(false);
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const a = Number(min), b = Number(max), c = Number(count);
    if (min === "" || max === "" || count === "" || [a, b, c].some((x) => !Number.isInteger(x))) { setError("সবগুলো ঘরে পূর্ণসংখ্যা দিন"); return; }
    if (Math.abs(a) > LIMIT || Math.abs(b) > LIMIT) { setError("সংখ্যা ১০০ কোটির মধ্যে দিন"); return; }
    if (a > b) { setError("সর্বনিম্ন সংখ্যা সর্বোচ্চ সংখ্যার চেয়ে বড় হতে পারে না"); return; }
    if (c < 1 || c > 1000) { setError("কতগুলো সংখ্যা: ১ থেকে ১০০০ এর মধ্যে দিন"); return; }
    if (unique && c > b - a + 1) { setError(`এই সীমায় ইউনিক সংখ্যা সর্বোচ্চ ${b - a + 1}টি পাওয়া যায়`); return; }
    setError(""); setCopied(false);
    const r = randomNumbers(a, b, c, unique);
    setResult(sort ? r.sort((x, y) => x - y) : r);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(result.join(", ")); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium dark:text-slate-200">সর্বনিম্ন</label><input type="number" inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value)} className={input} /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">সর্বোচ্চ</label><input type="number" inputMode="numeric" value={max} onChange={(e) => setMax(e.target.value)} className={input} /></div>
      </div>
      <div><label className="text-sm font-medium dark:text-slate-200">কতগুলো সংখ্যা</label><input type="number" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} className={input} /></div>
      <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={unique} onChange={() => setUnique(!unique)} className="w-4 h-4 accent-indigo-600" /> প্রতিটি সংখ্যা আলাদা হবে (পুনরাবৃত্তি নয়)</label>
      <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={sort} onChange={() => setSort(!sort)} className="w-4 h-4 accent-indigo-600" /> ছোট থেকে বড় সাজান</label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button onClick={generate} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4" /> সংখ্যা বানান</button>
      {result.length > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 flex flex-wrap gap-2 max-h-64 overflow-y-auto">
            {result.map((n, i) => <span key={i} className={`px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 font-mono font-semibold text-indigo-600 dark:text-indigo-400 ${result.length === 1 ? "text-3xl w-full text-center py-4" : "text-sm"}`}>{n}</span>)}
          </div>
          <button onClick={copy} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 dark:text-white">{copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied!</> : <><Copy className="w-4 h-4" /> সব কপি করুন</>}</button>
        </div>
      )}
    </div>
  );
}

function CoinMode() {
  const [last, setLast] = useState<"head" | "tail" | null>(null);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const flip = () => {
    const r = secureInt(2) === 0 ? "head" : "tail";
    setLast(r);
    if (r === "head") setHeads(heads + 1); else setTails(tails + 1);
  };
  return (
    <div className="space-y-4 text-center">
      <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center text-xl font-bold border-4 ${last === "head" ? "bg-amber-100 border-amber-400 text-amber-700" : last === "tail" ? "bg-slate-100 border-slate-400 text-slate-700" : "bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700"}`}>
        {last === "head" ? "হেড" : last === "tail" ? "টেল" : "?"}
      </div>
      <button onClick={flip} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">টস করুন</button>
      <div className="grid grid-cols-2 gap-3 text-sm dark:text-slate-200">
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">হেড: <b>{heads}</b></div>
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">টেল: <b>{tails}</b></div>
      </div>
      {(heads + tails > 0) && <button onClick={() => { setHeads(0); setTails(0); setLast(null); }} className="text-sm text-slate-500 underline">গণনা মুছুন</button>}
    </div>
  );
}

function DiceMode() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const [rolls, setRolls] = useState<number[]>([]);
  const roll = () => setRolls(Array.from({ length: count }, () => secureInt(sides) + 1));
  const sum = rolls.reduce((a, b) => a + b, 0);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">পাশ (sides)</label>
          <select value={sides} onChange={(e) => { setSides(parseInt(e.target.value, 10)); setRolls([]); }} className={input}>
            {[4, 6, 8, 10, 12, 20, 100].map((s) => <option key={s} value={s}>D{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">কয়টি ডাইস</label>
          <select value={count} onChange={(e) => { setCount(parseInt(e.target.value, 10)); setRolls([]); }} className={input}>
            {[1, 2, 3, 4, 5, 6, 8, 10].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <button onClick={roll} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">ডাইস গড়ান</button>
      {rolls.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {rolls.map((r, i) => <span key={i} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-xl font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700">{r}</span>)}
          </div>
          {rolls.length > 1 && <p className="mt-3 text-sm dark:text-slate-200">মোট: <b>{sum}</b></p>}
        </div>
      )}
    </div>
  );
}

export default function RandomNumberGenerator() {
  const [mode, setMode] = useState<"num" | "coin" | "dice">("num");
  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button onClick={() => setMode("num")} className={tab(mode === "num")}>সংখ্যা</button>
        <button onClick={() => setMode("coin")} className={tab(mode === "coin")}>কয়েন টস</button>
        <button onClick={() => setMode("dice")} className={tab(mode === "dice")}>ডাইস</button>
      </div>
      {mode === "num" ? <NumberMode /> : mode === "coin" ? <CoinMode /> : <DiceMode />}
      <p className="text-xs text-slate-500">ফলাফল আপনার ব্রাউজারের নিরাপদ র‍্যান্ডম জেনারেটর (crypto) দিয়ে তৈরি হয়।</p>
    </div>
  );
}
