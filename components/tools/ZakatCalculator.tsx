"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// Nisab: 7.5 vori of gold or 52.5 vori of silver (1 vori = 11.664 g, so 87.48 g gold or 612.36 g silver). Zakat rate: 2.5%.
// Prices change every day, so the user types the current price per vori.
export const GOLD_NISAB_VORI = 7.5;
export const SILVER_NISAB_VORI = 52.5;
export const ZAKAT_RATE = 0.025;
type Basis = "silver" | "gold";

export type ZakatResult = { nisab: number; assets: number; debts: number; net: number; due: boolean; zakat: number };

export function computeZakat(assets: number[], debts: number, pricePerVori: number, basis: Basis): ZakatResult {
  const nisab = (basis === "gold" ? GOLD_NISAB_VORI : SILVER_NISAB_VORI) * pricePerVori;
  const total = assets.reduce((a, b) => a + b, 0);
  const net = Math.max(0, total - debts);
  const due = net >= nisab && nisab > 0;
  return { nisab, assets: total, debts, net, due, zakat: due ? Math.round(net * ZAKAT_RATE * 100) / 100 : 0 };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ZakatCalculator() {
  const tr = useTr();
  const [basis, setBasis] = useState<Basis>("silver");
  const [price, setPrice] = useState("");
  const [f, setF] = useState({ cash: "", gold: "", silver: "", business: "", owed: "", other: "", debts: "" });
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [error, setError] = useState("");

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setResult(null); };
  const num = (s: string) => (s === "" ? 0 : parseFloat(s));

  const calculate = () => {
    setError("");
    const p = parseFloat(price);
    if (price === "" || isNaN(p) || p <= 0) return setError(tr("আগে নিসাবের জন্য আজকের ভরির দাম লিখুন", "First enter today's price per vori for the nisab"));
    const vals = [f.cash, f.gold, f.silver, f.business, f.owed, f.other, f.debts].map(num);
    if (vals.some((x) => isNaN(x) || x < 0 || x > 1e12)) return setError(tr("সব ঘরে সঠিক (ঋণাত্মক নয়) সংখ্যা লিখুন", "Enter valid, non-negative numbers in every box"));
    setResult(computeZakat(vals.slice(0, 6), vals[6], p, basis));
  };
  const reset = () => { setF({ cash: "", gold: "", silver: "", business: "", owed: "", other: "", debts: "" }); setPrice(""); setResult(null); setError(""); };

  const tab = (a: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${a ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
  const field = (k: keyof typeof f, bn: string, en: string) => (
    <div key={k}>
      <label className="text-sm font-medium dark:text-slate-200">{tr(bn, en)}</label>
      <input type="number" inputMode="decimal" value={f[k]} onChange={set(k)} placeholder="0" className={input} />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-sm font-medium dark:text-slate-200">{tr("নিসাব কীসের ভিত্তিতে ধরবেন", "Nisab based on")}</p>
        <div className="flex gap-2">
          <button onClick={() => { setBasis("silver"); setResult(null); }} className={tab(basis === "silver")}>{tr("রুপা (৫২.৫ ভরি)", "Silver (52.5 vori)")}</button>
          <button onClick={() => { setBasis("gold"); setResult(null); }} className={tab(basis === "gold")}>{tr("সোনা (৭.৫ ভরি)", "Gold (7.5 vori)")}</button>
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{basis === "silver" ? tr("আজকের রুপার দাম, প্রতি ভরি (টাকা)", "Today's silver price per vori (taka)") : tr("আজকের সোনার দাম, প্রতি ভরি (টাকা)", "Today's gold price per vori (taka)")}</label>
          <input type="number" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setResult(null); }} className={input} />
          <p className="text-xs text-slate-500 mt-1">{tr("দাম রোজ বদলায়, তাই বাজুসের আজকের দাম দেখে নিজে লিখুন।", "Prices change daily, so type today's BAJUS price yourself.")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field("cash", "নগদ টাকা ও ব্যাংকে জমা (টাকা)", "Cash and bank savings (taka)")}
        {field("gold", "সোনার বাজার মূল্য (টাকা)", "Market value of gold (taka)")}
        {field("silver", "রুপার বাজার মূল্য (টাকা)", "Market value of silver (taka)")}
        {field("business", "ব্যবসার পণ্য ও মজুত (টাকা)", "Business goods and stock (taka)")}
        {field("owed", "অন্যের কাছে পাওনা, ফেরত পাওয়ার মতো (টাকা)", "Money owed to you, likely to be repaid (taka)")}
        {field("other", "অন্যান্য সঞ্চয় ও বিনিয়োগ (টাকা)", "Other savings and investments (taka)")}
        <div className="sm:col-span-2">{field("debts", "বাদ দেওয়ার ঋণ বা দেনা (টাকা)", "Debts to subtract (taka)")}</div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">{tr("যাকাত হিসাব করুন", "Calculate Zakat")}</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {result && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 space-y-2">
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("মোট সম্পদ", "Total wealth")}</span><span className="font-semibold">{money(result.assets)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("ঋণ বাদ", "Debts")}</span><span className="font-semibold">- {money(result.debts)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("নিট সম্পদ", "Net wealth")}</span><span className="font-semibold">{money(result.net)}</span></div>
          <div className="flex justify-between text-sm dark:text-white"><span>{tr("নিসাব", "Nisab")}</span><span className="font-semibold">{money(result.nisab)}</span></div>
          <div className="h-px bg-indigo-200 dark:bg-indigo-900" />
          {result.due ? (
            <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("যাকাত (২.৫%)", "Zakat (2.5%)")}</span><span className="text-indigo-600">{money(result.zakat)} {tr("টাকা", "taka")}</span></div>
          ) : (
            <p className="text-center text-sm font-medium text-amber-600">{tr("নিট সম্পদ নিসাবের কম, তাই এই হিসাবে যাকাত ফরজ হয় না।", "Net wealth is below the nisab, so zakat is not due on this calculation.")}</p>
          )}
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr("সাধারণ নিয়ম: নিট সম্পদ নিসাব পরিমাণ হলে এবং এক চান্দ্র বছর আপনার কাছে থাকলে ২.৫% যাকাত দিতে হয়। ১ ভরি = ১১.৬৬৪ গ্রাম ধরা হয়েছে।", "General rule: if your net wealth reaches the nisab and you have held it for one lunar year, 2.5% is due. 1 vori is taken as 11.664 grams.")}</p>
        <p>{tr("রুপা না সোনা দিয়ে নিসাব ধরবেন, তা নিয়ে আলিমদের মত আছে। এই টুল একটি সাধারণ হিসাব, ফতোয়া নয়। নিশ্চিত হতে আপনার স্থানীয় আলিম বা ইসলামী প্রতিষ্ঠানের সঙ্গে কথা বলুন।", "Scholars differ on whether to use silver or gold for the nisab. This tool gives a general calculation, not a religious ruling. To be sure, ask your local scholar or an Islamic institution.")}</p>
      </div>
    </div>
  );
}
