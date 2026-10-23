"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

// 1 শতাংশ = 435.6 sq ft, 1 একর = 43,560 sq ft (100 শতাংশ), 1 বর্গমিটার = 10.7639 sq ft
// কাঠা ও বিঘার মাপ এলাকাভেদে আলাদা, তাই কাঠা (বর্গফুট) ইউজার বদলাতে পারবে। 1 বিঘা = 20 কাঠা, 1 কাঠা = 16 ছটাক।
function units(katha: number) {
  return [
    { id: "shatak", label: "শতাংশ", sqft: 435.6 },
    { id: "katha", label: "কাঠা", sqft: katha },
    { id: "bigha", label: "বিঘা", sqft: katha * 20 },
    { id: "acre", label: "একর", sqft: 43560 },
    { id: "chatak", label: "ছটাক", sqft: katha / 16 },
    { id: "sqft", label: "বর্গফুট", sqft: 1 },
    { id: "sqm", label: "বর্গমিটার", sqft: 10.7639 },
  ];
}
const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 4 });

const EN: Record<string, string> = {
  "শতাংশ": "Shatak (decimal)",
  "কাঠা": "Katha",
  "বিঘা": "Bigha",
  "একর": "Acre",
  "ছটাক": "Chatak",
  "বর্গফুট": "Square feet",
  "বর্গমিটার": "Square metres"
};

export default function LandCalculator() {
  const tr = useTr();
  const tl = (x: string) => tr(x, EN[x] ?? x);
  const [kathaStr, setKathaStr] = useState("720");
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState("shatak");
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [copied, setCopied] = useState("");

  const kParsed = parseFloat(kathaStr);
  const katha = !isNaN(kParsed) && kParsed > 0 ? kParsed : 720;
  const list = units(katha);
  const v = parseFloat(val);
  const base = list.find((u) => u.id === unit)!;
  const totalSqft = !isNaN(v) && v >= 0 && val !== "" ? v * base.sqft : null;

  const L = parseFloat(len), W = parseFloat(wid);
  const areaSqft = !isNaN(L) && !isNaN(W) && L > 0 && W > 0 ? L * W : null;

  const copy = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("পরিমাণ", "Amount")}</label>
          <input type="number" inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} placeholder={tr("যেমন: 5", "e.g. 5")} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("একক", "Unit")}</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)} className={input}>
            {list.map((u) => <option key={u.id} value={u.id}>{tl(u.label)}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("১ কাঠা = কত বর্গফুট? (আপনার এলাকা অনুযায়ী)", "How many square feet is 1 katha? (for your area)")}</label>
        <input type="number" inputMode="decimal" value={kathaStr} onChange={(e) => setKathaStr(e.target.value)} className={input} />
        <p className="text-xs text-slate-500 mt-1">{tr("সাধারণ মাপ ৭২০ বর্গফুট। এলাকাভেদে আলাদা হতে পারে, দলিল বা সার্ভেয়ার দেখে নিশ্চিত হোন।", "The usual size is 720 square feet. It can differ by area, so confirm with your deed or surveyor.")}</p>
      </div>
      <button onClick={() => { setVal(""); setLen(""); setWid(""); setKathaStr("720"); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>

      {totalSqft !== null && (
        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          {list.map((u) => {
            const out = fmt(totalSqft / u.sqft);
            return (
              <div key={u.id} className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-400">{tl(u.label)}</span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold dark:text-white">{out}</span>
                  <button onClick={() => copy(u.id, out)} aria-label="Copy" className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white">
                    {copied === u.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="border-t border-slate-200 dark:border-slate-700 pt-5">
        <h3 className="font-semibold text-sm dark:text-white">{tr("দৈর্ঘ্য × প্রস্থ থেকে জমির আয়তন (ফুটে)", "Land area from length × width (in feet)")}</h3>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <input type="number" inputMode="decimal" value={len} onChange={(e) => setLen(e.target.value)} placeholder={tr("দৈর্ঘ্য (ফুট)", "Length (feet)")} className={input} />
          <input type="number" inputMode="decimal" value={wid} onChange={(e) => setWid(e.target.value)} placeholder={tr("প্রস্থ (ফুট)", "Width (feet)")} className={input} />
        </div>
        {areaSqft !== null && (
          <div className="mt-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-sm dark:text-slate-200">
            <p>{tr("আয়তন:", "Area:")} <b>{fmt(areaSqft)} {tr("বর্গফুট", "square feet")}</b> = <b>{fmt(areaSqft / 435.6)} {tr("শতাংশ", "shatak")}</b> = <b>{fmt(areaSqft / katha)} {tr("কাঠা", "katha")}</b></p>
            <button onClick={() => { setVal(String(areaSqft)); setUnit("sqft"); }} className="mt-2 text-indigo-600 dark:text-indigo-400 underline">{tr("উপরে রূপান্তর করুন", "Use it in the converter above")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
