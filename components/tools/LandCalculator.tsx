"use client";
import { useState } from "react";
import { MapPinned, Copy, RotateCcw } from "lucide-react";

const SQFT_PER_SHATANGSHO = 435.6;
const SQFT_PER_ACRE = 43560;
const SQFT_PER_SQM = 10.7639;

export default function LandCalculator() {
  const [kathaSqft, setKathaSqft] = useState("720");
  const [inputVal, setInputVal] = useState("");
  const [inputUnit, setInputUnit] = useState("shatak");
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [copied, setCopied] = useState("");
  const kathaVal = Number(kathaSqft) > 0 ? Number(kathaSqft) : 720;
  const bighaVal = kathaVal * 20;
  const units = [
    {value:"shatak",label:"শতাংশ / শতক"},{value:"katha",label:"কাঠা"},{value:"bigha",label:"বিঘা"},
    {value:"acre",label:"একর"},{value:"sqft",label:"বর্গফুট"},{value:"sqm",label:"বর্গমিটার"},
    {value:"gonda",label:"গণ্ডা"},{value:"chatak",label:"ছটাক"}
  ];
  const toSqft = (val:number, unit:string) => {
    switch(unit) {
      case "shatak": return val * SQFT_PER_SHATANGSHO;
      case "katha": return val * kathaVal;
      case "bigha": return val * bighaVal;
      case "acre": return val * SQFT_PER_ACRE;
      case "sqm": return val * SQFT_PER_SQM;
      case "gonda": return val * (kathaVal/4);
      case "chatak": return val * (kathaVal/16);
      default: return val;
    }
  };
  const valNum = Number(inputVal);
  const sqft = inputVal.trim() !== "" && Number.isFinite(valNum) ? toSqft(valNum,inputUnit) : 0;
  const results = sqft > 0 ? {
    shatak:sqft/SQFT_PER_SHATANGSHO,katha:sqft/kathaVal,bigha:sqft/bighaVal,acre:sqft/SQFT_PER_ACRE,
    sqft,sqm:sqft/SQFT_PER_SQM,gonda:sqft/(kathaVal/4),chatak:sqft/(kathaVal/16)
  } : null;
  const areaFromDim = (Number(len)||0) * (Number(wid)||0);
  const copy = async (text:string,key:string) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); window.setTimeout(()=>setCopied(""),1500); }
    catch { setCopied("error"); }
  };
  const reset = () => {setInputVal("");setLen("");setWid("");setCopied("");};
  return <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
    <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><MapPinned className="text-indigo-600"/> জমির মাপ ক্যালকুলেটর</h2>
    <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-800 dark:text-amber-200">স্থানীয় হিসাবে কাঠা, বিঘা, গণ্ডা ও ছটাকের মাপ ভিন্ন হতে পারে। এখানে ১ কাঠা = {kathaVal} বর্গফুট ধরে হিসাব করা হচ্ছে।</div>
    <div><label className="text-sm dark:text-slate-300">১ কাঠা কত বর্গফুট?</label><input value={kathaSqft} onChange={e=>setKathaSqft(e.target.value)} type="number" min="1" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white"/></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label className="text-sm dark:text-slate-300">জমির পরিমাণ</label><input value={inputVal} onChange={e=>setInputVal(e.target.value)} type="number" inputMode="decimal" placeholder="যেমন: 5" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white"/></div><div><label className="text-sm dark:text-slate-300">একক</label><select value={inputUnit} onChange={e=>setInputUnit(e.target.value)} className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white">{units.map(u=><option key={u.value} value={u.value}>{u.label}</option>)}</select></div></div>
    {results && <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{units.map(u=><div key={u.value} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 p-3"><p className="text-xs text-slate-500 dark:text-slate-300">{u.label}</p><p className="font-bold text-indigo-600 dark:text-indigo-400 break-words">{results[u.value as keyof typeof results].toLocaleString("en-BD",{maximumFractionDigits:4})}</p><button onClick={()=>copy(String(results[u.value as keyof typeof results]),u.value)} className="mt-2 text-xs text-indigo-600 flex items-center gap-1"><Copy size={12}/>{copied===u.value?"কপি হয়েছে":copied==="error"?"কপি হয়নি":"কপি"}</button></div>)}</div>}
    <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3"><h3 className="font-semibold dark:text-white">দৈর্ঘ্য × প্রস্থ থেকে ক্ষেত্রফল</h3><div className="grid grid-cols-2 gap-3"><div><label className="text-sm dark:text-slate-300">দৈর্ঘ্য (ফুট)</label><input value={len} onChange={e=>setLen(e.target.value)} type="number" inputMode="decimal" placeholder="দৈর্ঘ্য" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white"/></div><div><label className="text-sm dark:text-slate-300">প্রস্থ (ফুট)</label><input value={wid} onChange={e=>setWid(e.target.value)} type="number" inputMode="decimal" placeholder="প্রস্থ" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white"/></div></div>{areaFromDim>0 && <p className="rounded-lg bg-indigo-50 dark:bg-indigo-900/20 p-3 text-indigo-700 dark:text-indigo-300">ক্ষেত্রফল: <strong>{areaFromDim.toLocaleString("en-BD",{maximumFractionDigits:2})} বর্গফুট</strong> ≈ {(areaFromDim/SQFT_PER_SHATANGSHO).toFixed(3)} শতাংশ</p>}</div>
    <button onClick={reset} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:text-white flex items-center gap-1"><RotateCcw size={16}/> Reset</button>
  </div>;
}
