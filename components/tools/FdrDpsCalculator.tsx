"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

type Mode = "fdr" | "dps";
type Comp = "quarterly" | "monthly" | "half" | "yearly" | "simple";
const PER_YEAR: Record<Exclude<Comp, "simple">, number> = { quarterly: 4, monthly: 12, half: 2, yearly: 1 };

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export type Result = { deposited: number; interest: number; tax: number; netInterest: number; maturity: number };

// FDR: one lump sum. Compound interest A = P(1 + r/n)^(n*t); "simple" pays interest only on the original amount.
export function computeFdr(principal: number, ratePct: number, months: number, comp: Comp, taxPct: number): Result {
  const t = months / 12, r = ratePct / 100;
  const amount = comp === "simple" ? principal * (1 + r * t) : principal * Math.pow(1 + r / PER_YEAR[comp], PER_YEAR[comp] * t);
  const interest = r2(amount - principal);
  const tax = r2(interest * (taxPct / 100));
  return { deposited: principal, interest, tax, netInterest: r2(interest - tax), maturity: r2(principal + interest - tax) };
}

// DPS: a fixed installment at the start of every month, interest compounded monthly at rate/12.
export function computeDps(monthly: number, ratePct: number, months: number, taxPct: number): Result {
  const i = ratePct / 100 / 12;
  let bal = 0;
  for (let k = 0; k < months; k++) bal = (bal + monthly) * (1 + i);
  const deposited = monthly * months;
  const interest = r2(bal - deposited);
  const tax = r2(interest * (taxPct / 100));
  return { deposited, interest, tax, netInterest: r2(interest - tax), maturity: r2(deposited + interest - tax) };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function FdrDpsCalculator() {
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("fdr");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("12");
  const [comp, setComp] = useState<Comp>("quarterly");
  const [tax, setTax] = useState("10");
  const [res, setRes] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const a = parseFloat(amount), r = parseFloat(rate), m = parseInt(months, 10), t = parseFloat(tax);
    if (amount === "" || isNaN(a) || a <= 0 || a > 1e11) return setError(mode === "fdr" ? tr("জমার পরিমাণ সঠিক লিখুন", "Enter a valid deposit amount") : tr("মাসিক কিস্তির পরিমাণ সঠিক লিখুন", "Enter a valid monthly installment"));
    if (rate === "" || isNaN(r) || r < 0 || r > 100) return setError(tr("সুদের হার ০ থেকে ১০০ এর মধ্যে লিখুন", "Enter an interest rate between 0 and 100"));
    if (isNaN(m) || m < 1 || m > 600) return setError(tr("মেয়াদ ১ থেকে ৬০০ মাসের মধ্যে লিখুন", "Enter a term between 1 and 600 months"));
    if (isNaN(t) || t < 0 || t > 100) return setError(tr("উৎসে করের হার সঠিক লিখুন", "Enter a valid source-tax rate"));
    setRes(mode === "fdr" ? computeFdr(a, r, m, comp, t) : computeDps(a, r, m, t));
  };
  const reset = () => { setAmount(""); setRate(""); setMonths("12"); setComp("quarterly"); setTax("10"); setRes(null); setError(""); };
  const clear = () => setRes(null);
  const tab = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => { setMode("fdr"); clear(); }} className={tab(mode === "fdr")}>FDR</button>
        <button onClick={() => { setMode("dps"); clear(); }} className={tab(mode === "dps")}>DPS</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{mode === "fdr" ? tr("জমার পরিমাণ (টাকা)", "Deposit amount (taka)") : tr("মাসিক কিস্তি (টাকা)", "Monthly installment (taka)")}</label>
          <input type="number" inputMode="decimal" value={amount} onChange={(e) => { setAmount(e.target.value); clear(); }} placeholder={mode === "fdr" ? "e.g. 100000" : "e.g. 5000"} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("সুদের হার (বছরে %)", "Interest rate (% per year)")}</label>
          <input type="number" inputMode="decimal" value={rate} onChange={(e) => { setRate(e.target.value); clear(); }} placeholder="e.g. 8" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("মেয়াদ (মাস)", "Term (months)")}</label>
          <input type="number" inputMode="numeric" value={months} onChange={(e) => { setMonths(e.target.value); clear(); }} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("সুদ থেকে উৎসে কর", "Tax on interest (at source)")}</label>
          <select value={tax} onChange={(e) => { setTax(e.target.value); clear(); }} className={input}>
            <option value="10">{tr("১০% (TIN আছে)", "10% (with TIN)")}</option>
            <option value="15">{tr("১৫% (TIN নেই)", "15% (without TIN)")}</option>
            <option value="0">{tr("০% (কর ছাড়া)", "0% (no tax)")}</option>
          </select>
        </div>
        {mode === "fdr" && (
          <div className="sm:col-span-2">
            <label className="text-sm font-medium dark:text-slate-200">{tr("সুদ কীভাবে যোগ হয়", "How interest is added")}</label>
            <select value={comp} onChange={(e) => { setComp(e.target.value as Comp); clear(); }} className={input}>
              <option value="quarterly">{tr("ত্রৈমাসিক চক্রবৃদ্ধি (বেশিরভাগ ব্যাংক)", "Quarterly compounding (most banks)")}</option>
              <option value="monthly">{tr("মাসিক চক্রবৃদ্ধি", "Monthly compounding")}</option>
              <option value="half">{tr("ষান্মাসিক চক্রবৃদ্ধি", "Half-yearly compounding")}</option>
              <option value="yearly">{tr("বার্ষিক চক্রবৃদ্ধি", "Yearly compounding")}</option>
              <option value="simple">{tr("সরল সুদ (শুধু আসলের ওপর)", "Simple interest (on the original amount only)")}</option>
            </select>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("হিসাব করুন", "Calculate")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {res && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("মোট জমা", "Total deposited")}</span><span className="font-semibold">{money(res.deposited)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("মোট সুদ", "Total interest")}</span><span className="font-semibold">{money(res.interest)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("উৎসে কর", "Tax at source")}</span><span className="font-semibold">- {money(res.tax)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("কর বাদে সুদ", "Interest after tax")}</span><span className="font-semibold">{money(res.netInterest)}</span></div>
          <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("মেয়াদ শেষে পাবেন", "You get at maturity")}</span><span className="text-indigo-600">{money(res.maturity)} {tr("টাকা", "taka")}</span></div>
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("এটি আনুমানিক হিসাব। ব্যাংকভেদে সুদ যোগের নিয়ম আলাদা হতে পারে। FDR এ আবগারি শুল্ক এবং ব্যাংকের অন্যান্য চার্জ ধরা হয়নি। DPS এ প্রতি মাসের শুরুতে কিস্তি জমা ও মাসিক চক্রবৃদ্ধি ধরা হয়েছে।", "This is an estimate. Banks can add interest in different ways. Excise duty on FDR and other bank charges are not included. For DPS, each installment is taken at the start of the month with monthly compounding.")}</p>
        <p>{tr("উৎসে কর সাধারণত TIN থাকলে ১০% এবং না থাকলে ১৫%। আপনার ব্যাংকের হার দেখে নিন।", "Source tax is generally 10% with a TIN and 15% without. Check your bank's rate.")}</p>
      </div>
    </div>
  );
}
