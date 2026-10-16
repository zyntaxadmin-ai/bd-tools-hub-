"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

// NOTE: Rates change. Verify on bKash official site and edit the two constants below.
const CASHOUT_RATE = 0.0185; // 18.5 TK per 1000 (agent cash out)
const SEND_MONEY_FEE = 0;    // Set to current send money fee if applicable

export default function BkashCalculator() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"send" | "cashout">("cashout");
  const [result, setResult] = useState<null | { charge: number; total: number }>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) return setError("সঠিক টাকার পরিমাণ লিখুন");
    const charge = type === "send" ? SEND_MONEY_FEE : amt * CASHOUT_RATE;
    setResult({ charge: Number(charge.toFixed(2)), total: Number((amt + charge).toFixed(2)) });
  };
  const reset = () => { setAmount(""); setResult(null); setError(""); };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">Amount (BDT)</label>
          <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1000" className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">Transaction Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as "send" | "cashout")} className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white">
            <option value="cashout">Cash Out (18.5 TK / 1000)</option>
            <option value="send">Send Money</option>
          </select>
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <div className="flex gap-3 mt-4">
        <button onClick={calculate} className="flex-1 py-3 bg-[#E2136E] text-white rounded-xl font-medium hover:bg-[#c0105c]">Calculate Charge</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>
      {result && (
        <div className="mt-6 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900 rounded-xl p-5">
          <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">Amount</span><span className="font-semibold dark:text-white">{amount} TK</span></div>
          <div className="flex justify-between text-sm mt-2"><span className="text-slate-600 dark:text-slate-400">Charge</span><span className="font-semibold text-[#E2136E]">{result.charge} TK</span></div>
          <div className="h-px bg-pink-200 dark:bg-pink-900 my-3"></div>
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>Total</span><span className="text-[#E2136E]">{result.total} TK</span></div>
          <p className="text-xs text-slate-500 mt-2 text-center">চার্জ পরিবর্তন হতে পারে। অফিসিয়াল bKash চার্জ চার্ট দেখে নিশ্চিত হোন।</p>
        </div>
      )}
    </div>
  );
}
