"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

export type MfsOption = { id: string; bn: string; en: string; per1000: number };
export type MfsTheme = { button: string; accent: string; box: string; ring: string };

// Shared calculator for mobile financial services. Each provider file passes its own rates.
export default function MfsChargeCalculator({
  provider,
  options,
  theme,
  sendNote,
}: {
  provider: string;
  options: MfsOption[];
  theme: MfsTheme;
  sendNote: { bn: string; en: string };
}) {
  const tr = useTr();
  const [amount, setAmount] = useState("");
  const [optId, setOptId] = useState(options[0].id);
  const [custom, setCustom] = useState("");
  const [result, setResult] = useState<null | { amt: number; charge: number; total: number; per1000: number }>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) return setError(tr("সঠিক টাকার পরিমাণ লিখুন", "Enter a valid amount in taka"));
    let per1000: number;
    if (optId === "custom") {
      per1000 = parseFloat(custom);
      if (!custom || isNaN(per1000) || per1000 < 0 || per1000 > 100)
        return setError(tr("প্রতি ১০০০ টাকায় সঠিক চার্জ লিখুন (০ থেকে ১০০)", "Enter a valid charge per 1,000 taka (0 to 100)"));
    } else {
      per1000 = options.find((o) => o.id === optId)!.per1000;
    }
    const charge = (amt * per1000) / 1000;
    setResult({ amt, charge: Number(charge.toFixed(2)), total: Number((amt + charge).toFixed(2)), per1000 });
  };
  const reset = () => { setAmount(""); setCustom(""); setResult(null); setError(""); };
  const field = `w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 ${theme.ring} outline-none`;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("টাকার পরিমাণ (BDT)", "Amount (BDT)")}</label>
          <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1000" className={field} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("ক্যাশ আউটের ধরন", "Cash out type")}</label>
          <select value={optId} onChange={(e) => setOptId(e.target.value)} className={field}>
            {options.map((o) => (
              <option key={o.id} value={o.id}>{tr(o.bn, o.en)} ({o.per1000} TK / 1000)</option>
            ))}
            <option value="custom">{tr("নিজে রেট দিন", "Enter my own rate")}</option>
          </select>
        </div>
        {optId === "custom" && (
          <div className="sm:col-span-2">
            <label className="text-sm font-medium dark:text-slate-200">{tr("প্রতি ১০০০ টাকায় চার্জ (TK)", "Charge per 1,000 taka (TK)")}</label>
            <input type="number" inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 14.9" className={field} />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <div className="flex gap-3 mt-4">
        <button onClick={calculate} className={`flex-1 py-3 text-white rounded-xl font-medium ${theme.button}`}>{tr("চার্জ হিসাব করুন", "Calculate Charge")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>
      {result && (
        <div className={`mt-6 border rounded-xl p-5 ${theme.box}`}>
          <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{tr("টাকার পরিমাণ", "Amount")}</span><span className="font-semibold dark:text-white">{result.amt} TK</span></div>
          <div className="flex justify-between text-sm mt-2"><span className="text-slate-600 dark:text-slate-400">{tr("চার্জ", "Charge")} ({result.per1000} TK / 1000)</span><span className={`font-semibold ${theme.accent}`}>{result.charge} TK</span></div>
          <div className="h-px bg-slate-200 dark:bg-slate-700 my-3"></div>
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("মোট কাটবে", "Total deducted")}</span><span className={theme.accent}>{result.total} TK</span></div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            {tr(
              `চার্জ পরিবর্তন হতে পারে। অফিসিয়াল ${provider} অ্যাপ বা চার্জ চার্ট দেখে নিশ্চিত হোন।`,
              `Charges may change. Confirm in the official ${provider} app or charge chart.`
            )}
          </p>
        </div>
      )}
      <p className="text-xs text-slate-500 mt-4">{tr(sendNote.bn, sendNote.en)}</p>
    </div>
  );
}
