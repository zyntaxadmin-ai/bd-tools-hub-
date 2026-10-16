"use client";
import { useState } from "react";
import { Banknote, RotateCcw } from "lucide-react";

export default function EmiCalculator() {
  const [p, setP] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");
  const [durUnit, setDurUnit] = useState<"month" | "year">("year");
  const [submitted, setSubmitted] = useState(false);
  const principal = Number(p), annualRate = Number(rate), durVal = Number(duration);
  const n = durUnit === "year" ? durVal * 12 : durVal;
  const error = submitted
    ? (!p.trim() || !rate.trim() || !duration.trim()) ? "সব ঘর পূরণ করুন"
    : principal <= 0 ? "লোনের পরিমাণ সঠিক দিন"
    : annualRate < 0 || annualRate > 50 ? "সুদের হার 0-50% এর মধ্যে দিন"
    : n <= 0 || !Number.isInteger(n) ? "মেয়াদ পূর্ণ মাস হিসেবে দিন" : ""
    : "";
  let emi: number | null = null, totalPay = 0, totalInterest = 0;
  const valid = p.trim() !== "" && rate.trim() !== "" && duration.trim() !== "" &&
    Number.isFinite(principal) && Number.isFinite(annualRate) && Number.isFinite(n) &&
    principal > 0 && annualRate >= 0 && annualRate <= 50 && n > 0 && Number.isInteger(n);
  if (valid) {
    const r = annualRate / 12 / 100;
    emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    totalPay = emi * n;
    totalInterest = totalPay - principal;
  }
  const fmt = (num: number) => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(num);
  const rows: {month:number;emi:number;princ:number;interest:number;bal:number}[] = [];
  if (emi !== null && !error) {
    let bal = principal; const r = annualRate / 12 / 100;
    for (let i=1; i<=Math.min(12,n); i++) {
      const interest = bal*r; const princ = emi-interest; bal -= princ;
      rows.push({month:i,emi,princ,interest,bal:Math.max(0,bal)});
    }
  }
  const reset = () => { setP(""); setRate(""); setDuration(""); setSubmitted(false); };
  return <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
    <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Banknote className="text-indigo-600"/> EMI ক্যালকুলেটর</h2>
    <div className="space-y-3">
      <div><label className="text-sm dark:text-slate-300">লোনের পরিমাণ (TK)</label><input value={p} onChange={e=>{setP(e.target.value);setSubmitted(false);}} inputMode="decimal" type="number" placeholder="যেমন: 500000" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/></div>
      <div><label className="text-sm dark:text-slate-300">বার্ষিক সুদের হার (%)</label><input value={rate} onChange={e=>{setRate(e.target.value);setSubmitted(false);}} inputMode="decimal" type="number" placeholder="যেমন: 9.5" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/></div>
      <div><label className="text-sm dark:text-slate-300">মেয়াদ</label><div className="flex gap-2 mt-1"><input value={duration} onChange={e=>{setDuration(e.target.value);setSubmitted(false);}} inputMode="decimal" type="number" placeholder={durUnit==="year"?"বছর":"মাস"} className="flex-1 min-w-0 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/><button onClick={()=>{setDurUnit("year");setSubmitted(false);}} className={`px-4 rounded-lg border text-sm ${durUnit==="year"?"bg-indigo-600 text-white border-indigo-600":"border-slate-200 dark:border-slate-600 dark:text-white"}`}>বছর</button><button onClick={()=>{setDurUnit("month");setSubmitted(false);}} className={`px-4 rounded-lg border text-sm ${durUnit==="month"?"bg-indigo-600 text-white border-indigo-600":"border-slate-200 dark:border-slate-600 dark:text-white"}`}>মাস</button></div></div>
    </div>
    {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{error}</p>}
    <div className="flex gap-2"><button onClick={()=>setSubmitted(true)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">হিসাব করুন</button><button onClick={reset} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:text-white flex items-center gap-1"><RotateCcw size={16}/> Reset</button></div>
    {emi!==null && !error && <div className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-3"><div className="bg-indigo-600 text-white rounded-xl p-4 text-center"><p className="text-sm opacity-80">মাসিক EMI</p><p className="text-xl font-bold">{fmt(emi)}</p></div><div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 text-center dark:text-white"><p className="text-sm opacity-70">মোট সুদ</p><p className="text-lg font-bold">{fmt(totalInterest)}</p></div><div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl p-4 text-center dark:text-white"><p className="text-sm opacity-70">মোট পরিশোধ</p><p className="text-lg font-bold">{fmt(totalPay)}</p></div></div>
    {rows.length>0 && <div><h3 className="font-semibold dark:text-white mb-2">প্রথম 12 মাসের তালিকা</h3><div className="overflow-x-auto border border-slate-200 dark:border-slate-600 rounded-lg"><table className="w-full text-sm min-w-[500px]"><thead className="bg-slate-100 dark:bg-slate-700 dark:text-white"><tr>{["মাস","EMI","আসল","সুদ","বাকি"].map(h=><th key={h} className="p-2">{h}</th>)}</tr></thead><tbody className="dark:text-slate-200">{rows.map(row=><tr key={row.month} className="border-t dark:border-slate-600 text-center"><td className="p-2">{row.month}</td><td className="p-2">{Math.round(row.emi).toLocaleString("en-BD")}</td><td className="p-2">{Math.round(row.princ).toLocaleString("en-BD")}</td><td className="p-2">{Math.round(row.interest).toLocaleString("en-BD")}</td><td className="p-2">{Math.round(row.bal).toLocaleString("en-BD")}</td></tr>)}</tbody></table></div></div>}
    <p className="text-xs text-slate-500 dark:text-slate-400 border p-2 rounded-lg">এটি আনুমানিক হিসাব। ব্যাংকের প্রসেসিং ফি/চার্জ আলাদা হতে পারে।</p></div>}
  </div>;
}
