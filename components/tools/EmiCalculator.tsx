"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const num0 = (n: number) => Math.round(n).toLocaleString("en-IN");

export default function EmiCalculator() {
  const tr = useTr();
  const tk = (n: number) => `${num0(n)} ${tr("টাকা", "taka")}`;
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
    if (isNaN(P) || isNaN(R) || isNaN(D)) error = tr("সঠিক সংখ্যা লিখুন", "Enter valid numbers");
    else if (P <= 0) error = tr("লোনের পরিমাণ ০ এর বেশি দিন", "Loan amount must be above 0");
    else if (R < 0 || R > 50) error = tr("সুদের হার ০ থেকে ৫০% এর মধ্যে দিন", "Interest rate must be between 0 and 50%");
    else if (n < 1 || n > 600) error = tr("মেয়াদ ১ মাস থেকে ৫০ বছরের মধ্যে দিন", "Tenure must be between 1 month and 50 years");
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
        <label className="text-sm font-medium dark:text-slate-200">{tr("লোনের পরিমাণ (টাকা)", "Loan amount (taka)")}</label>
        <input type="number" inputMode="decimal" value={p} onChange={(e) => setP(e.target.value)} placeholder={tr("যেমন: 500000", "e.g. 500000")} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("বার্ষিক সুদের হার (%)", "Annual interest rate (%)")}</label>
        <input type="number" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} placeholder={tr("যেমন: 9.5", "e.g. 9.5")} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("মেয়াদ", "Tenure")}</label>
        <div className="flex gap-2 mt-1">
          <input type="number" inputMode="decimal" value={dur} onChange={(e) => setDur(e.target.value)} placeholder={unit === "year" ? tr("বছর", "Years") : tr("মাস", "Months")} className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
          <button onClick={() => setUnit("year")} className={`px-4 rounded-xl border text-sm ${unit === "year" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("বছর", "Years")}</button>
          <button onClick={() => setUnit("month")} className={`px-4 rounded-xl border text-sm ${unit === "month" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("মাস", "Months")}</button>
        </div>
      </div>
      <button onClick={() => { setP(""); setRate(""); setDur(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {ok && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-indigo-600 text-white rounded-xl p-4 text-center"><p className="text-xs opacity-80">{tr("মাসিক কিস্তি (EMI)", "Monthly instalment (EMI)")}</p><p className="text-lg font-bold mt-1">{tk(emi)}</p></div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center dark:text-white"><p className="text-xs text-slate-500">{tr("মোট সুদ", "Total interest")}</p><p className="text-lg font-bold mt-1">{tk(interest)}</p></div>
            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center dark:text-white"><p className="text-xs text-slate-500">{tr("মোট পরিশোধ", "Total repayment")}</p><p className="text-lg font-bold mt-1">{tk(total)}</p></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm dark:text-white mb-2">{tr(`প্রথম ${rows.length} মাসের তালিকা`, `First ${rows.length} months`)}</h3>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-sm min-w-[460px]">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white"><tr><th className="p-2">{tr("মাস", "Month")}</th><th className="p-2">{tr("আসল", "Principal")}</th><th className="p-2">{tr("সুদ", "Interest")}</th><th className="p-2">{tr("বাকি", "Balance")}</th></tr></thead>
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
          <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">{tr("এটি আনুমানিক হিসাব (reducing balance পদ্ধতি)। ব্যাংকের প্রসেসিং ফি ও অন্যান্য চার্জ আলাদা হতে পারে, তাই ব্যাংকের কাছ থেকে নিশ্চিত হোন।", "This is an estimate (reducing balance method). Bank processing fees and other charges may differ, so confirm with your bank.")}</p>
        </div>
      )}
    </div>
  );
}
