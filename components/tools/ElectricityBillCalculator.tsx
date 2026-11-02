"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// NOTE: Tariffs change. Check your latest bill and the BERC order, then edit the numbers below.
// Residential (LT-A) tariff from the BERC order of 3 June 2026 (effective June 2026 billing).
// BERC withdrew the hike for the lifeline (0-50) and first (0-75) slabs on 4 June 2026, so those two keep the old rates 4.63 and 5.26.
// Demand charge and VAT come from published calculators and can differ on your bill, so the demand rate is editable in the tool.
const TARIFF_NOTE = { bn: "জুন ২০২৬ বিলিং থেকে কার্যকর", en: "effective from the June 2026 billing month" };
const LIFELINE_LIMIT = 50; // if total units are 50 or fewer, all units use the lifeline rate
const LIFELINE_RATE = 4.63;
const SLABS: { upTo: number; rate: number }[] = [
  { upTo: 75, rate: 5.26 },
  { upTo: 200, rate: 8.5 },
  { upTo: 300, rate: 9.1 },
  { upTo: 400, rate: 9.62 },
  { upTo: 600, rate: 15.01 },
  { upTo: Infinity, rate: 17.35 },
];
const DEFAULT_DEMAND_PER_KW = 42;
const VAT_RATE = 0.05;

type Line = { label: string; units: number; rate: number; amount: number };
export type Bill = { lines: Line[]; energy: number; demand: number; vat: number; total: number };

const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function computeBill(units: number, kw: number, demandPerKw: number): Bill {
  const lines: Line[] = [];
  if (units <= LIFELINE_LIMIT) {
    if (units > 0) lines.push({ label: `1-${LIFELINE_LIMIT}`, units, rate: LIFELINE_RATE, amount: r2(units * LIFELINE_RATE) });
  } else {
    let prev = 0;
    for (const s of SLABS) {
      if (units <= prev) break;
      const inSlab = Math.min(units, s.upTo) - prev;
      const label = s.upTo === Infinity ? `${prev + 1}+` : `${prev + 1}-${s.upTo}`;
      lines.push({ label, units: r2(inSlab), rate: s.rate, amount: r2(inSlab * s.rate) });
      prev = s.upTo;
    }
  }
  const energy = r2(lines.reduce((a, l) => a + l.amount, 0));
  const demand = r2(kw * demandPerKw);
  const vat = r2((energy + demand) * VAT_RATE);
  return { lines, energy, demand, vat, total: r2(energy + demand + vat) };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ElectricityBillCalculator() {
  const tr = useTr();
  const [units, setUnits] = useState("");
  const [kw, setKw] = useState("1");
  const [demand, setDemand] = useState(String(DEFAULT_DEMAND_PER_KW));
  const [bill, setBill] = useState<Bill | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const u = parseFloat(units), k = parseFloat(kw), d = parseFloat(demand);
    if (units === "" || isNaN(u) || u < 0 || u > 100000) return setError(tr("ইউনিট ০ থেকে ১,০০,০০০ এর মধ্যে লিখুন", "Enter units between 0 and 100,000"));
    if (isNaN(k) || k <= 0 || k > 100) return setError(tr("অনুমোদিত লোড (kW) ০ এর বেশি ও ১০০ এর কম লিখুন", "Enter a sanctioned load (kW) above 0 and up to 100"));
    if (isNaN(d) || d < 0 || d > 1000) return setError(tr("ডিমান্ড চার্জ ০ থেকে ১০০০ এর মধ্যে লিখুন", "Enter a demand charge between 0 and 1000"));
    setBill(computeBill(u, k, d));
  };
  const reset = () => { setUnits(""); setKw("1"); setDemand(String(DEFAULT_DEMAND_PER_KW)); setBill(null); setError(""); };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("মাসের ব্যবহৃত ইউনিট (kWh)", "Units used in the month (kWh)")}</label>
          <input type="number" inputMode="decimal" value={units} onChange={(e) => setUnits(e.target.value)} placeholder="e.g. 200" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("অনুমোদিত লোড (kW)", "Sanctioned load (kW)")}</label>
          <input type="number" inputMode="decimal" value={kw} onChange={(e) => setKw(e.target.value)} className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium dark:text-slate-200">{tr("ডিমান্ড চার্জ প্রতি kW (টাকা)", "Demand charge per kW (taka)")}</label>
          <input type="number" inputMode="decimal" value={demand} onChange={(e) => setDemand(e.target.value)} className={input} />
          <p className="text-xs text-slate-500 mt-1">{tr("আপনার বিলে ডিমান্ড চার্জ আলাদা হলে এখানে সেটি লিখুন।", "If the demand charge on your bill is different, type it here.")}</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("বিল হিসাব করুন", "Calculate Bill")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {bill && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-3">
          <div className="space-y-1.5">
            {bill.lines.map((l) => (
              <div key={l.label} className="flex justify-between text-sm dark:text-white">
                <span className="text-slate-600 dark:text-slate-400">{l.label} {tr("ইউনিট", "units")}: {l.units} × {l.rate}</span>
                <span className="font-medium">{money(l.amount)}</span>
              </div>
            ))}
          </div>
          <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("বিদ্যুতের মূল্য", "Energy charge")}</span><span className="font-semibold">{money(bill.energy)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("ডিমান্ড চার্জ", "Demand charge")}</span><span className="font-semibold">{money(bill.demand)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("ভ্যাট (৫%)", "VAT (5%)")}</span><span className="font-semibold">{money(bill.vat)}</span></div>
          <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("মোট বিল", "Total bill")}</span><span className="text-indigo-600">{money(bill.total)} {tr("টাকা", "taka")}</span></div>
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr(`এটি আবাসিক (LT-A) গ্রাহকের আনুমানিক বিল, বিইআরসির ঘোষিত রেট অনুযায়ী (${TARIFF_NOTE.bn})। ৫০ ইউনিট বা কম হলে সব ইউনিট লাইফলাইন রেটে ধরা হয়।`, `This is an estimate for a residential (LT-A) customer using the rates announced by BERC (${TARIFF_NOTE.en}). If you use 50 units or fewer, all units are charged at the lifeline rate.`)}</p>
        <p>{tr("মিটার ভাড়া, বকেয়া, দেরির জরিমানা ও রিবেট এখানে ধরা হয়নি। আপনার প্রকৃত বিল ডিস্কো, ডিপিডিসি, পল্লী বিদ্যুৎ বা সংশ্লিষ্ট অফিসের বিল অনুযায়ী হবে।", "Meter rent, arrears, late fees and rebates are not included. Your actual bill is whatever your distribution company (DESCO, DPDC, Palli Bidyut and others) issues.")}</p>
      </div>
    </div>
  );
}
