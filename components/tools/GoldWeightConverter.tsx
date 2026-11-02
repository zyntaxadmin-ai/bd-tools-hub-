"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// Bangladesh jewellers' units: 1 vori = 16 ana, 1 ana = 6 roti, and 1 vori = 11.664 grams.
// So 1 roti = 0.1215 g and 1 ana = 0.729 g.
export const GRAM_PER_VORI = 11.664;
export const ROTI_PER_ANA = 6;
export const ANA_PER_VORI = 16;
const ROTI_PER_VORI = ROTI_PER_ANA * ANA_PER_VORI; // 96
const GRAM_PER_ROTI = GRAM_PER_VORI / ROTI_PER_VORI; // 0.1215

export const toGrams = (vori: number, ana: number, roti: number) => (vori * ROTI_PER_VORI + ana * ROTI_PER_ANA + roti) * GRAM_PER_ROTI;

// Splits grams into vori, ana and roti (roti rounded to 2 decimals, using whole hundredths to avoid float errors).
export function fromGrams(grams: number) {
  const hundredths = Math.round((grams / GRAM_PER_ROTI) * 100);
  const vori = Math.floor(hundredths / (ROTI_PER_VORI * 100));
  const rem = hundredths % (ROTI_PER_VORI * 100);
  const ana = Math.floor(rem / (ROTI_PER_ANA * 100));
  const roti = (rem % (ROTI_PER_ANA * 100)) / 100;
  return { vori, ana, roti };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const num = (n: number, d = 3) => n.toLocaleString("en-US", { maximumFractionDigits: d });
const money = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export default function GoldWeightConverter() {
  const tr = useTr();
  const [vori, setVori] = useState("");
  const [ana, setAna] = useState("");
  const [roti, setRoti] = useState("");
  const [grams, setGrams] = useState("");
  const [price, setPrice] = useState("");

  const v = parseFloat(vori) || 0, a = parseFloat(ana) || 0, r = parseFloat(roti) || 0;
  const anyVari = vori !== "" || ana !== "" || roti !== "";
  const badVari = anyVari && (v < 0 || a < 0 || r < 0 || a >= 100 || r >= 100 || v > 100000);
  const g1 = anyVari && !badVari ? toGrams(v, a, r) : NaN;

  const g = parseFloat(grams);
  const badG = grams !== "" && (isNaN(g) || g < 0 || g > 1000000);
  const split = grams !== "" && !badG ? fromGrams(g) : null;

  const p = parseFloat(price);
  const priceOk = price !== "" && !isNaN(p) && p >= 0;
  // total weight used for value: prefer the vori/ana/roti box, else the gram box
  const valueGrams = !isNaN(g1) ? g1 : split ? g : NaN;
  const value = priceOk && !isNaN(valueGrams) ? (valueGrams / GRAM_PER_VORI) * p : NaN;

  const reset = () => { setVori(""); setAna(""); setRoti(""); setGrams(""); setPrice(""); };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <p className="font-medium dark:text-white">{tr("ভরি-আনা-রতি থেকে গ্রাম", "Vori-ana-roti to grams")}</p>
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-xs text-slate-500">{tr("ভরি", "Vori")}</label><input type="number" inputMode="decimal" value={vori} onChange={(e) => setVori(e.target.value)} className={input} /></div>
          <div><label className="text-xs text-slate-500">{tr("আনা", "Ana")}</label><input type="number" inputMode="decimal" value={ana} onChange={(e) => setAna(e.target.value)} className={input} /></div>
          <div><label className="text-xs text-slate-500">{tr("রতি", "Roti")}</label><input type="number" inputMode="decimal" value={roti} onChange={(e) => setRoti(e.target.value)} className={input} /></div>
        </div>
        {badVari && <p className="text-sm text-red-500">{tr("সঠিক মান লিখুন (আনা ও রতি ১০০ এর কম, ঋণাত্মক নয়)", "Enter valid values (ana and roti below 100, not negative)")}</p>}
        {!isNaN(g1) && <p className="text-lg font-semibold text-indigo-600">{num(g1, 4)} {tr("গ্রাম", "grams")}</p>}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <p className="font-medium dark:text-white">{tr("গ্রাম থেকে ভরি-আনা-রতি", "Grams to vori-ana-roti")}</p>
        <div>
          <label className="text-xs text-slate-500">{tr("ওজন (গ্রাম)", "Weight (grams)")}</label>
          <input type="number" inputMode="decimal" value={grams} onChange={(e) => setGrams(e.target.value)} className={input} />
        </div>
        {badG && <p className="text-sm text-red-500">{tr("সঠিক ওজন লিখুন", "Enter a valid weight")}</p>}
        {split && <p className="text-lg font-semibold text-indigo-600">{split.vori} {tr("ভরি", "vori")} {split.ana} {tr("আনা", "ana")} {num(split.roti, 2)} {tr("রতি", "roti")}</p>}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
        <p className="font-medium dark:text-white">{tr("দাম হিসাব (ঐচ্ছিক)", "Price (optional)")}</p>
        <div>
          <label className="text-xs text-slate-500">{tr("প্রতি ভরির দাম (টাকা)", "Price per vori (taka)")}</label>
          <input type="number" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder={tr("আজকের দাম নিজে লিখুন", "Type today's price")} className={input} />
        </div>
        {!isNaN(value) && <p className="text-lg font-semibold text-indigo-600">{tr("মোট দাম", "Total value")}: {money(value)} {tr("টাকা", "taka")}</p>}
        <p className="text-xs text-slate-500">{tr("উপরের ঘরের ওজন ধরে দাম হিসাব হয়। সোনা বা রুপার আজকের দাম এই টুলে নেই, তাই আপনি নিজে লিখুন (বাজুসের দাম দেখুন)।", "The value uses the weight above. This tool does not have live gold or silver prices, so type the price yourself (check the BAJUS rate).")}</p>
      </div>

      <button onClick={reset} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white flex items-center gap-2"><RotateCcw className="w-4 h-4" />{tr("মুছুন", "Clear")}</button>
      <p className="text-xs text-slate-500">{tr("হিসাব: ১ ভরি = ১৬ আনা = ৯৬ রতি = ১১.৬৬৪ গ্রাম (১ আনা = ০.৭২৯ গ্রাম, ১ রতি = ০.১২১৫ গ্রাম)। সোনার ক্যারেট বা মজুরি ধরা হয়নি।", "Used: 1 vori = 16 ana = 96 roti = 11.664 grams (1 ana = 0.729 g, 1 roti = 0.1215 g). Gold purity (carat) and making charges are not included.")}</p>
    </div>
  );
}
