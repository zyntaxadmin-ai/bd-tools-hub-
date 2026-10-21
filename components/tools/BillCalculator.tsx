"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const num2 = (n: number) => (Math.round(n * 100) / 100).toLocaleString("en-IN");

export default function BillCalculator() {
  const tr = useTr();
  const tk = (n: number) => `${num2(n)} ${tr("টাকা", "taka")}`;
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
    if (isNaN(b) || b <= 0) error = tr("বিলের পরিমাণ ০ এর বেশি দিন", "Enter a bill amount above 0");
    else if (isNaN(n) || !Number.isInteger(n) || n < 1 || n > 1000) error = tr("মানুষের সংখ্যা ১ বা তার বেশি পূর্ণসংখ্যা দিন", "Enter a whole number of people, 1 or more");
    else if (isNaN(vp) || isNaN(tp) || vp < 0 || tp < 0 || vp > 100 || tp > 100) error = tr("VAT ও টিপ ০ থেকে ১০০% এর মধ্যে দিন", "VAT and tip must be between 0 and 100%");
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
        <label className="text-sm font-medium dark:text-slate-200">{tr("মোট বিল (টাকা)", "Total bill (taka)")}</label>
        <input type="number" inputMode="decimal" value={bill} onChange={(e) => setBill(e.target.value)} placeholder={tr("যেমন: 2400", "e.g. 2400")} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("কতজন ভাগ করবেন", "Number of people sharing")}</label>
        <input type="number" inputMode="numeric" value={people} onChange={(e) => setPeople(e.target.value)} className={input} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("VAT/সার্ভিস চার্জ (%)", "VAT/service charge (%)")}</label>
          <input type="number" inputMode="decimal" value={vat} onChange={(e) => setVat(e.target.value)} placeholder={tr("ঐচ্ছিক", "Optional")} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("টিপ (%)", "Tip (%)")}</label>
          <input type="number" inputMode="decimal" value={tip} onChange={(e) => setTip(e.target.value)} placeholder={tr("ঐচ্ছিক", "Optional")} className={input} />
        </div>
      </div>
      <button onClick={() => { setBill(""); setPeople("2"); setVat(""); setTip(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {result && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-xl p-5 text-center">
            <p className="text-sm opacity-80">{tr("জনপ্রতি", "Per person")}</p>
            <p className="text-3xl font-bold">{tk(result.each)}</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm space-y-2 dark:text-slate-200">
            <div className="flex justify-between"><span>{tr("বিল", "Bill")}</span><span>{tk(b)}</span></div>
            <div className="flex justify-between"><span>{tr("VAT/সার্ভিস চার্জ", "VAT/service charge")}</span><span>{tk(result.vatAmt)}</span></div>
            <div className="flex justify-between"><span>{tr("টিপ", "Tip")}</span><span>{tk(result.tipAmt)}</span></div>
            <div className="flex justify-between font-bold border-t border-slate-200 dark:border-slate-700 pt-2"><span>{tr("সর্বমোট", "Grand total")}</span><span>{tk(result.total)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
