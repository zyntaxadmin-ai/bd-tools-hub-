"use client";
import { useState } from "react";
import { MapPinned, Copy } from "lucide-react";

export default function LandCalculator() {
  const [kathaSqft, setKathaSqft] = useState("720");
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState("shatak");
  const [len, setLen] = useState("");
  const [wid, setWid] = useState("");
  const [copied, setCopied] = useState("");

  const kathaVal = parseFloat(kathaSqft) || 720;
  const bighaVal = kathaVal * 20;
  const toSqft = (v:number, u:string) => {
    if(u==="shatak") return v * 435.6;
    if(u==="katha") return v * kathaVal;
    if(u==="bigha") return v * bighaVal;
    if(u==="acre") return v * 43560;
    if(u==="sqm") return v * 10.7639;
    if(u==="gonda") return v * (kathaVal/4);
    if(u==="chatak") return v * (kathaVal/16);
    return v;
  }
  const num = parseFloat(val);
  const sqft = !isNaN(num) ? toSqft(num, unit) : 0;
  const res = sqft > 0 ? {
    shatak: sqft / 435.6, katha: sqft / kathaVal, bigha: sqft / bighaVal,
    acre: sqft / 43560, sqft: sqft, sqm: sqft / 10.7639,
    gonda: sqft / (kathaVal/4), chatak: sqft / (kathaVal/16)
  } : null;
  
  const area = (parseFloat(len)||0) * (parseFloat(wid)||0);
  const copy = (t:string) => { navigator.clipboard.writeText(t); setCopied(t); setTimeout(()=>setCopied(""),1500)}

  const allUnits = [
    {k:"shatak", l:"শতাংশ"}, {k:"katha", l:"কাঠা"}, {k:"bigha", l:"বিঘা"},
    {k:"acre", l:"একর"}, {k:"sqft", l:"বর্গফুট"}, {k:"sqm", l:"বর্গমিটার"},
    {k:"gonda", l:"গণ্ডা"}, {k:"chatak", l:"ছটাক"},
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><MapPinned className="text-indigo-600"/> জমি ক্যালকুলেটর BD</h2>
      
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg text-sm dark:text-amber-200">
        <b>সতর্কতা:</b> কাঠা/বিঘার মাপ এলাকা ভেদে আলাদা। Dhaka তে 1 কাঠা=720 sqft, কিন্তু অনেক জায়গায় 1 কাঠা=1.65 শতাংশ। দলিল/সার্ভেয়ার দেখে নিশ্চিত হোন।
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs">1 কাঠা =</span>
          <input value={kathaSqft} onChange={e=>setKathaSqft(e.target.value)} inputMode="decimal" type="number" className="w-20 p-1.5 rounded border dark:bg-slate-900 dark:text-white" />
          <span className="text-xs">বর্গফুট</span>
          <select onChange={e=>setKathaSqft(e.target.value)} className="p-1.5 rounded border dark:bg-slate-900 text-xs">
            <option value="720">720 - Dhaka</option>
            <option value="718.74">718.74 - 1.65 শতাংশ</option>
            <option value="435.6">435.6 - 1 শতাংশ</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <input value={val} onChange={e=>setVal(e.target.value)} inputMode="decimal" type="number" placeholder="পরিমাণ" className="col-span-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white" />
        <select value={unit} onChange={e=>setUnit(e.target.value)} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white">
          {allUnits.map(u=><option key={u.k} value={u.k}>{u.l}</option>)}
        </select>
      </div>

      {res && (
        <div className="grid grid-cols-2 gap-2">
          {allUnits.map(u=>{
            const v = (res as any)[u.k].toFixed(4);
            return (
              <div key={u.k} className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 p-2.5 rounded-lg flex justify-between items-center">
                <div><p className="text-xs text-slate-500 dark:text-slate-400">{u.l}</p><p className="font-bold dark:text-white">{v}</p></div>
                <button onClick={()=>copy(v)} className="p-1.5 bg-white dark:bg-slate-600 rounded border"><Copy size={14}/></button>
              </div>
            )
          })}
          {copied && <p className="col-span-2 text-xs text-green-600 text-center">Copied!</p>}
        </div>
      )}

      <div className="border-t dark:border-slate-700 pt-4">
        <p className="font-semibold dark:text-white text-sm mb-2">দৈর্ঘ্য × প্রস্থ দিয়ে হিসাব (ফুট)</p>
        <div className="grid grid-cols-2 gap-2">
          <input value={len} onChange={e=>setLen(e.target.value)} inputMode="decimal" type="number" placeholder="দৈর্ঘ্য ফুট" className="p-2.5 rounded-lg border dark:bg-slate-900 dark:text-white" />
          <input value={wid} onChange={e=>setWid(e.target.value)} inputMode="decimal" type="number" placeholder="প্রস্থ ফুট" className="p-2.5 rounded-lg border dark:bg-slate-900 dark:text-white" />
        </div>
        {area>0 && <p className="mt-2 text-sm bg-indigo-50 dark:bg-slate-700 p-2 rounded text-center dark:text-white">এরিয়া: {area.toLocaleString("en-BD")} বর্গফুট = {(area/435.6).toFixed(2)} শতাংশ = {(area/kathaVal).toFixed(2)} কাঠা</p>}
      </div>
    </div>
  );
}
