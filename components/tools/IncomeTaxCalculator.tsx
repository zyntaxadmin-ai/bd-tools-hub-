"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// NOTE: Tax rules change every budget. Check the NBR site and edit these numbers.
// Source: Finance Act 2026 (individual taxpayers, income year 2026-27). Checked against several published summaries.
// - Tax-free limit for a general taxpayer: 4,00,000 (women, senior citizens, disabled and freedom fighters have higher limits, so the user can type their own).
// - After the limit: next 3,00,000 at 10%, next 4,00,000 at 15%, next 5,00,000 at 20%, next 20,00,000 at 25%, the rest at 30%.
// - Minimum tax 5,000 when income is above the limit (editable, new taxpayers are reported to pay 1,000).
// - Investment rebate: the lowest of 3% of taxable income, 10% of eligible investment, 7,50,000.
export const GENERAL_LIMIT = 400000;
export const SLABS: { width: number; rate: number }[] = [
  { width: 300000, rate: 0.10 },
  { width: 400000, rate: 0.15 },
  { width: 500000, rate: 0.20 },
  { width: 2000000, rate: 0.25 },
  { width: Infinity, rate: 0.30 },
];
export const DEFAULT_MIN_TAX = 5000;
const REBATE_INCOME_PCT = 0.03, REBATE_INVEST_PCT = 0.10, REBATE_CAP = 750000;

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export type TaxLine = { from: number; to: number; amount: number; rate: number; tax: number };
export type TaxResult = { taxable: number; limit: number; lines: TaxLine[]; gross: number; rebate: number; afterRebate: number; minApplied: boolean; net: number };

export function computeTax(taxable: number, limit: number, investment: number, minTax: number): TaxResult {
  const lines: TaxLine[] = [];
  let pos = limit; // income above the tax-free limit is taxed slab by slab
  let left = Math.max(0, taxable - limit);
  for (const s of SLABS) {
    if (left <= 0) break;
    const amount = Math.min(left, s.width);
    lines.push({ from: pos, to: pos + amount, amount, rate: s.rate, tax: r2(amount * s.rate) });
    pos += amount; left -= amount;
  }
  const gross = r2(lines.reduce((a, l) => a + l.tax, 0));
  if (taxable <= limit) return { taxable, limit, lines, gross: 0, rebate: 0, afterRebate: 0, minApplied: false, net: 0 };
  const rebate = r2(Math.min(taxable * REBATE_INCOME_PCT, investment * REBATE_INVEST_PCT, REBATE_CAP));
  const afterRebate = r2(Math.max(0, gross - rebate));
  const minApplied = afterRebate < minTax;
  return { taxable, limit, lines, gross, rebate, afterRebate, minApplied, net: minApplied ? minTax : afterRebate };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const whole = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export default function IncomeTaxCalculator() {
  const tr = useTr();
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState<"year" | "month">("year");
  const [exempt, setExempt] = useState("");
  const [who, setWho] = useState<"general" | "other">("general");
  const [otherLimit, setOtherLimit] = useState("");
  const [invest, setInvest] = useState("");
  const [minTax, setMinTax] = useState(String(DEFAULT_MIN_TAX));
  const [res, setRes] = useState<TaxResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const a = parseFloat(amount), ex = exempt === "" ? 0 : parseFloat(exempt), inv = invest === "" ? 0 : parseFloat(invest), mt = parseFloat(minTax);
    if (amount === "" || isNaN(a) || a < 0 || a > 1e11) return setError(tr("আয়ের পরিমাণ সঠিক লিখুন", "Enter a valid income amount"));
    if (isNaN(ex) || ex < 0 || isNaN(inv) || inv < 0 || isNaN(mt) || mt < 0) return setError(tr("সব ঘরে সঠিক (ঋণাত্মক নয়) সংখ্যা লিখুন", "Enter valid, non-negative numbers in every box"));
    let limit = GENERAL_LIMIT;
    if (who === "other") {
      const l = parseFloat(otherLimit);
      if (otherLimit === "" || isNaN(l) || l <= 0) return setError(tr("আপনার করমুক্ত আয়সীমা লিখুন", "Enter your tax-free income limit"));
      limit = l;
    }
    const annual = period === "month" ? a * 12 : a;
    const taxable = Math.max(0, annual - ex);
    setRes(computeTax(taxable, limit, inv, mt));
  };
  const reset = () => { setAmount(""); setExempt(""); setInvest(""); setOtherLimit(""); setMinTax(String(DEFAULT_MIN_TAX)); setWho("general"); setPeriod("year"); setRes(null); setError(""); };
  const clear = () => setRes(null);
  const tab = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("আপনার আয় (টাকা)", "Your income (taka)")}</label>
        <div className="flex gap-2 mt-1">
          <button onClick={() => { setPeriod("year"); clear(); }} className={tab(period === "year")}>{tr("বছরে", "Per year")}</button>
          <button onClick={() => { setPeriod("month"); clear(); }} className={tab(period === "month")}>{tr("মাসে", "Per month")}</button>
        </div>
        <input type="number" inputMode="decimal" value={amount} onChange={(e) => { setAmount(e.target.value); clear(); }} placeholder={period === "month" ? "e.g. 60000" : "e.g. 800000"} className={input} />
        <p className="text-xs text-slate-500 mt-1">{tr("মাসিক আয় দিলে ১২ দিয়ে গুণ করে বছরের আয় ধরা হবে। বোনাস থাকলে বছরের আয়ে যোগ করে \"বছরে\" বেছে লিখুন।", "A monthly amount is multiplied by 12. If you get bonuses, add them up and use \"Per year\".")}</p>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("করমুক্ত অংশ, বছরে (টাকা)", "Tax-exempt part, per year (taka)")}</label>
        <input type="number" inputMode="decimal" value={exempt} onChange={(e) => { setExempt(e.target.value); clear(); }} placeholder="0" className={input} />
        <p className="text-xs text-slate-500 mt-1">{tr("চাকরির কিছু ভাতা বা আয়ের অংশ করমুক্ত থাকে। এর পরিমাণ আপনার পে-স্লিপ বা কর পরামর্শকের কাছ থেকে জেনে এখানে লিখুন। না জানলে ফাঁকা রাখুন।", "Some allowances or income may be exempt. Get the amount from your payslip or a tax adviser. Leave it empty if you do not know.")}</p>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("করদাতার ধরন", "Taxpayer type")}</p>
        <div className="flex gap-2">
          <button onClick={() => { setWho("general"); clear(); }} className={tab(who === "general")}>{tr("সাধারণ (৪,০০,০০০)", "General (4,00,000)")}</button>
          <button onClick={() => { setWho("other"); clear(); }} className={tab(who === "other")}>{tr("অন্য (নিজে লিখব)", "Other (type my limit)")}</button>
        </div>
        {who === "other" && (
          <div className="mt-2">
            <label className="text-xs text-slate-500">{tr("আপনার করমুক্ত আয়সীমা (টাকা)", "Your tax-free limit (taka)")}</label>
            <input type="number" inputMode="decimal" value={otherLimit} onChange={(e) => { setOtherLimit(e.target.value); clear(); }} className={input} />
            <p className="text-xs text-slate-500 mt-1">{tr("নারী, ৬৫+ বয়সী, প্রতিবন্ধী, মুক্তিযোদ্ধা বা জুলাই যোদ্ধাদের সীমা বেশি। এনবিআর-এর ঘোষিত সংখ্যাটি এখানে লিখুন।", "Women, people aged 65+, people with disabilities, freedom fighters and July warriors have higher limits. Type the number announced by the NBR.")}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("কর রেয়াতের বিনিয়োগ (টাকা)", "Eligible investment (taka)")}</label>
          <input type="number" inputMode="decimal" value={invest} onChange={(e) => { setInvest(e.target.value); clear(); }} placeholder="0" className={input} />
          <p className="text-xs text-slate-500 mt-1">{tr("যেমন ডিপিএস, সঞ্চয়পত্র, জীবনবিমার প্রিমিয়াম। ঐচ্ছিক।", "For example DPS, savings certificates, life insurance premium. Optional.")}</p>
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("ন্যূনতম কর (টাকা)", "Minimum tax (taka)")}</label>
          <input type="number" inputMode="decimal" value={minTax} onChange={(e) => { setMinTax(e.target.value); clear(); }} className={input} />
          <p className="text-xs text-slate-500 mt-1">{tr("সাধারণত ৫,০০০। নতুন করদাতার ১,০০০ বলে জানা যায়, সেক্ষেত্রে বদলে নিন।", "Usually 5,000. New taxpayers are reported to pay 1,000, so change it if that applies.")}</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("আয়কর হিসাব করুন", "Calculate Tax")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {res && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("করযোগ্য আয় (বছরে)", "Taxable income (per year)")}</span><span className="font-semibold">{money(res.taxable)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("করমুক্ত সীমা", "Tax-free limit")}</span><span className="font-semibold">{money(res.limit)}</span></div>
          {res.net === 0 && res.taxable <= res.limit ? (
            <p className="text-center text-sm font-medium text-emerald-600 pt-2">{tr("আয় করমুক্ত সীমার মধ্যে, তাই কর দিতে হবে না।", "Income is within the tax-free limit, so no tax is due.")}</p>
          ) : (
            <>
              <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
              {res.lines.map((l, i) => (
                <div key={i} className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{whole(l.from)} - {whole(l.to)}: {whole(l.amount)} × {Math.round(l.rate * 100)}%</span><span>{money(l.tax)}</span>
                </div>
              ))}
              <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
              <div className="flex justify-between text-sm dark:text-white"><span>{tr("মোট কর (রেয়াতের আগে)", "Tax before rebate")}</span><span className="font-semibold">{money(res.gross)}</span></div>
              <div className="flex justify-between text-sm dark:text-white"><span>{tr("বিনিয়োগ রেয়াত", "Investment rebate")}</span><span className="font-semibold">- {money(res.rebate)}</span></div>
              {res.minApplied && <p className="text-xs text-amber-600">{tr("হিসাব করা কর ন্যূনতম করের কম, তাই ন্যূনতম কর ধরা হয়েছে।", "The calculated tax is below the minimum tax, so the minimum tax applies.")}</p>}
              <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
              <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("আয়কর (বছরে)", "Income tax (per year)")}</span><span className="text-indigo-600">{money(res.net)} {tr("টাকা", "taka")}</span></div>
              <div className="flex justify-between text-sm dark:text-white"><span>{tr("মাসে প্রায়", "About per month")}</span><span className="font-semibold">{money(res.net / 12)}</span></div>
              <div className="flex justify-between text-sm dark:text-white"><span>{tr("কর ÷ করযোগ্য আয়", "Tax ÷ taxable income")}</span><span className="font-semibold">{res.taxable > 0 ? ((res.net / res.taxable) * 100).toFixed(2) : "0.00"}%</span></div>
            </>
          )}
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("এটি ২০২৬-২৭ আয়বছরের ব্যক্তি করদাতার আনুমানিক হিসাব, ফাইনান্স অ্যাক্ট ২০২৬ অনুযায়ী। সারচার্জ, উৎসে কর কর্তন ও অন্যান্য বিশেষ ক্ষেত্র ধরা হয়নি।", "This is an estimate for an individual taxpayer for income year 2026-27 under the Finance Act 2026. Surcharge, tax deducted at source and special cases are not included.")}</p>
        <p>{tr("কর আইন প্রতি বাজেটে বদলায়। রিটার্ন জমার আগে nbr.gov.bd বা একজন কর পরামর্শকের সঙ্গে মিলিয়ে নিন।", "Tax rules change with every budget. Check nbr.gov.bd or a tax adviser before you file your return.")}</p>
      </div>
    </div>
  );
}
