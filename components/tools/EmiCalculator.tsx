"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const tk = (n: number) => `${Math.round(n).toLocaleString("en-IN")} টাকা`;

export default function EmiCalculator() {
  const [p, setP] = useState("");
  const [rate, setRate] = useState("");
  const [dur, setDur] = useState("");
  const [unit, setUnit] = useState<"year" | "month">("year");

  const P = parseFloat(p);
  const R = parseFloat(rate);
  const D = parseFloat(dur);
  const n = unit === "year" ? D * 12 : D;
  const hasInput = p !== "" && rate !== "" && dur !== "";

  let error = "";
  let emi = 0, total = 0, interest = 0;
  let ok = false;
  const rows: { m: number; princ: number; int: number; bal: number }[] = [];

  if (hasInput) {
    if (isNaN(P) || isNaN(R) || isNaN(D)) error = "সঠিক সংখ্যা লিখুন";
    else if (P <= 0) error = "লোনের পরিমাণ ০ এর বেশি দিন";
    else if (R < 0 || R > 50) error = "সুদের হার ০ থেকে ৫০% এর মধ্যে দিন";
    else if (n < 1 || n > 600) error = "মেয়াদ ১ মাস থেকে ৫০ বছরের মধ্যে দিন";
    else {
      const r = R / 12 / 100;
      emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      total = emi * n;
      interest = total - P;
      ok = true;
      let bal = P;
      for (let i = 1; i <= Math.min(12, Math.floor(n)); i++) {
        const it = bal * r;
        const pr = emi - it;
        bal = Math.max(0, bal - pr);
        rows.push({ m: i, princ: pr, int: it, bal });
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">লোনের পরিমাণ (টাকা)</label>
        <input type="number" inputMode="decimal" value={p} onChange={(e) => setP(e.target.value)} placeholder="যেমন: 500000" className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">বার্ষিক সুদের হার (%)</label>
        <input type="number" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="যেমন: 9.5" className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">মেয়াদ</label>
        <div className="flex gap-2 mt-1">
          <input type="number" inputMode="decimal" value={dur} onChange={(e) => setDur(e.target.value)} placeholder={unit === "year" ? "বছর" : "মাস"} className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button onClick={() => setUnit("year")} className={`px-4 rounded-xl border text-sm ${unit === "year" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>বছর</button>
          <button onClick={() => setUnit("month")} className={`px-4 rounded-xl border text-sm ${unit === "month" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>মাস</button>
        </div>
      </div>
      <button onClick={() => { setP(""); setRate(""); setDur(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {ok && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-indigo-600 text-white rounded-xl p-4 text-center"><p className="text-xs opacity-80">মাসিক কিস্তি (EMI)</p><p className="text-lg font-bold mt-1">{tk(emi)}</p></div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center dark:text-white"><p className="text-xs text-slate-500">মোট সুদ</p><p className="text-lg font-bold mt-1">{tk(interest)}</p></div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center dark:text-white"><p className="text-xs text-slate-500">মোট পরিশোধ</p><p className="text-lg font-bold mt-1">{tk(total)}</p></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm dark:text-white mb-2">প্রথম {rows.length} মাসের তালিকা</h3>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-sm min-w-[460px]">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white"><tr><th className="p-2">মাস</th><th className="p-2">আসল</th><th className="p-2">সুদ</th><th className="p-2">বাকি</th></tr></thead>
                <tbody className="dark:text-slate-200">
                  {rows.map((r) => (
                    <tr key={r.m} className="border-t border-slate-200 dark:border-slate-700 text-center">
                      <td className="p-2">{r.m}</td>
                      <td className="p-2">{Math.round(r.princ).toLocaleString("en-IN")}</td>
                      <td className="p-2">{Math.round(r.int).toLocaleString("en-IN")}</td>
                      <td className="p-2">{Math.round(r.bal).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">এটি আনুমানিক হিসাব (reducing balance পদ্ধতি)। ব্যাংকের প্রসেসিং ফি ও অন্যান্য চার্জ আলাদা হতে পারে, তাই ব্যাংকের কাছ থেকে নিশ্চিত হোন।</p>
        </div>
      )}
    </div>
  );
}
