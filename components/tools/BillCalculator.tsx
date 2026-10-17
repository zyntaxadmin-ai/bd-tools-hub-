"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const tk = (n: number) => `${(Math.round(n * 100) / 100).toLocaleString("en-IN")} টাকা`;

export default function BillCalculator() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("2");
  const [vat, setVat] = useState("");
  const [tip, setTip] = useState("");

  const b = parseFloat(bill);
  const n = parseFloat(people);
  const vp = vat === "" ? 0 : parseFloat(vat);
  const tp = tip === "" ? 0 : parseFloat(tip);

  let error = "";
  let result: { vatAmt: number; tipAmt: number; total: number; each: number } | null = null;
  if (bill !== "") {
    if (isNaN(b) || b <= 0) error = "বিলের পরিমাণ ০ এর বেশি দিন";
    else if (isNaN(n) || !Number.isInteger(n) || n < 1 || n > 1000) error = "মানুষের সংখ্যা ১ বা তার বেশি পূর্ণসংখ্যা দিন";
    else if (isNaN(vp) || isNaN(tp) || vp < 0 || tp < 0 || vp > 100 || tp > 100) error = "VAT ও টিপ ০ থেকে ১০০% এর মধ্যে দিন";
    else {
      const vatAmt = (b * vp) / 100;
      const tipAmt = (b * tp) / 100;
      const total = b + vatAmt + tipAmt;
      result = { vatAmt, tipAmt, total, each: total / n };
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">মোট বিল (টাকা)</label>
        <input type="number" inputMode="decimal" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="যেমন: 2400" className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">কতজন ভাগ করবেন</label>
        <input type="number" inputMode="numeric" value={people} onChange={(e) => setPeople(e.target.value)} className={input} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">VAT/সার্ভিস চার্জ (%)</label>
          <input type="number" inputMode="decimal" value={vat} onChange={(e) => setVat(e.target.value)} placeholder="ঐচ্ছিক" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">টিপ (%)</label>
          <input type="number" inputMode="decimal" value={tip} onChange={(e) => setTip(e.target.value)} placeholder="ঐচ্ছিক" className={input} />
        </div>
      </div>
      <button onClick={() => { setBill(""); setPeople("2"); setVat(""); setTip(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {result && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-xl p-5 text-center">
            <p className="text-sm opacity-80">জনপ্রতি</p>
            <p className="text-3xl font-bold">{tk(result.each)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm space-y-2 dark:text-slate-200">
            <div className="flex justify-between"><span>বিল</span><span>{tk(b)}</span></div>
            <div className="flex justify-between"><span>VAT/সার্ভিস চার্জ</span><span>{tk(result.vatAmt)}</span></div>
            <div className="flex justify-between"><span>টিপ</span><span>{tk(result.tipAmt)}</span></div>
            <div className="flex justify-between font-bold border-t border-slate-200 dark:border-slate-700 pt-2"><span>সর্বমোট</span><span>{tk(result.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
