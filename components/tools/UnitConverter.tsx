"use client";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type Unit = { id: string; label: string; f: number };
type Cat = { id: string; label: string; units: Unit[] };

const CATS: Cat[] = [
  { id: "length", label: "দৈর্ঘ্য", units: [
    { id: "mm", label: "মিলিমিটার (mm)", f: 0.001 }, { id: "cm", label: "সেন্টিমিটার (cm)", f: 0.01 },
    { id: "m", label: "মিটার (m)", f: 1 }, { id: "km", label: "কিলোমিটার (km)", f: 1000 },
    { id: "in", label: "ইঞ্চি (inch)", f: 0.0254 }, { id: "ft", label: "ফুট (feet)", f: 0.3048 },
    { id: "yd", label: "গজ (yard)", f: 0.9144 }, { id: "mi", label: "মাইল (mile)", f: 1609.344 },
  ] },
  { id: "weight", label: "ওজন", units: [
    { id: "mg", label: "মিলিগ্রাম (mg)", f: 0.000001 }, { id: "g", label: "গ্রাম (g)", f: 0.001 },
    { id: "kg", label: "কেজি (kg)", f: 1 }, { id: "t", label: "মেট্রিক টন", f: 1000 },
    { id: "lb", label: "পাউন্ড (lb)", f: 0.45359237 }, { id: "oz", label: "আউন্স (oz)", f: 0.028349523125 },
  ] },
  { id: "temp", label: "তাপমাত্রা", units: [
    { id: "c", label: "সেলসিয়াস (°C)", f: 1 }, { id: "f", label: "ফারেনহাইট (°F)", f: 1 }, { id: "k", label: "কেলভিন (K)", f: 1 },
  ] },
  { id: "area", label: "ক্ষেত্রফল", units: [
    { id: "sqm", label: "বর্গমিটার", f: 1 }, { id: "sqft", label: "বর্গফুট", f: 0.09290304 },
    { id: "sqyd", label: "বর্গগজ", f: 0.83612736 }, { id: "shatak", label: "শতাংশ", f: 40.468564224 },
    { id: "acre", label: "একর", f: 4046.8564224 }, { id: "ha", label: "হেক্টর", f: 10000 }, { id: "sqkm", label: "বর্গকিলোমিটার", f: 1000000 },
  ] },
  { id: "volume", label: "আয়তন", units: [
    { id: "ml", label: "মিলিলিটার (ml)", f: 0.001 }, { id: "l", label: "লিটার (L)", f: 1 },
    { id: "m3", label: "ঘনমিটার (m³)", f: 1000 }, { id: "gal", label: "গ্যালন (US)", f: 3.785411784 },
    { id: "floz", label: "ফ্লুইড আউন্স (US)", f: 0.0295735295625 }, { id: "cup", label: "কাপ (US)", f: 0.2365882365 },
  ] },
  { id: "speed", label: "গতি", units: [
    { id: "ms", label: "মিটার/সেকেন্ড", f: 1 }, { id: "kmh", label: "কিমি/ঘণ্টা", f: 1 / 3.6 },
    { id: "mph", label: "মাইল/ঘণ্টা", f: 0.44704 }, { id: "kn", label: "নট", f: 1852 / 3600 },
  ] },
  { id: "data", label: "ডেটা সাইজ", units: [
    { id: "bit", label: "বিট", f: 0.125 }, { id: "B", label: "বাইট (B)", f: 1 },
    { id: "KB", label: "কিলোবাইট (KB)", f: 1024 }, { id: "MB", label: "মেগাবাইট (MB)", f: 1024 ** 2 },
    { id: "GB", label: "গিগাবাইট (GB)", f: 1024 ** 3 }, { id: "TB", label: "টেরাবাইট (TB)", f: 1024 ** 4 },
  ] },
];

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const fmt = (n: number) => Number(n.toPrecision(10)).toLocaleString("en-US", { maximumFractionDigits: 10 });

function convert(cat: string, from: Unit, to: Unit, v: number): number | string {
  if (cat === "temp") {
    const c = from.id === "c" ? v : from.id === "f" ? ((v - 32) * 5) / 9 : v - 273.15;
    if (c < -273.15) return "পরম শূন্য (-273.15°C) এর নিচে তাপমাত্রা হয় না";
    return to.id === "c" ? c : to.id === "f" ? (c * 9) / 5 + 32 : c + 273.15;
  }
  return (v * from.f) / to.f;
}

export default function UnitConverter() {
  const [catId, setCatId] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [val, setVal] = useState("1");

  const cat = CATS.find((c) => c.id === catId)!;
  const fromU = cat.units.find((u) => u.id === from) || cat.units[0];
  const toU = cat.units.find((u) => u.id === to) || cat.units[1];

  const changeCat = (id: string) => {
    const c = CATS.find((x) => x.id === id)!;
    setCatId(id); setFrom(c.units[0].id); setTo(c.units[1].id);
  };

  const v = parseFloat(val);
  const res = val !== "" && !isNaN(v) ? convert(catId, fromU, toU, v) : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c.id} onClick={() => changeCat(c.id)} className={`px-3 py-2 rounded-xl border text-sm ${catId === c.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{c.label}</button>
        ))}
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">মান</label>
        <input type="number" inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} placeholder="যেমন: 10" className={input} />
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
        <div className="min-w-0">
          <label className="text-xs text-slate-500">থেকে</label>
          <select value={fromU.id} onChange={(e) => setFrom(e.target.value)} className={input}>
            {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
        <button onClick={() => { setFrom(toU.id); setTo(fromU.id); }} aria-label="অদলবদল" className="p-3 mb-0.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white"><ArrowLeftRight className="w-4 h-4" /></button>
        <div className="min-w-0">
          <label className="text-xs text-slate-500">এ</label>
          <select value={toU.id} onChange={(e) => setTo(e.target.value)} className={input}>
            {cat.units.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>
      {typeof res === "string" && <p className="text-sm text-red-500">{res}</p>}
      {typeof res === "number" && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5">
          <p className="text-xs text-slate-500">ফলাফল</p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1 break-words">{fmt(v)} {fromU.label} = {fmt(res)} {toU.label}</p>
        </div>
      )}
      {catId === "data" && <p className="text-xs text-slate-500">এখানে ১ KB = ১০২৪ বাইট ধরা হয়েছে।</p>}
    </div>
  );
}
