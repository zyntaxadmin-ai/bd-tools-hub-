"use client";
import { useState } from "react";
import { Activity, RotateCcw } from "lucide-react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"cm" | "ft">("cm");
  const [cm, setCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");
  const w = Number(weight);
  const heightM = unit === "cm"
    ? Number(cm) / 100
    : (((Number(feet) || 0) * 12 + (Number(inch) || 0)) * 0.0254);
  const validInput = weight.trim() !== "" &&
    (unit === "cm" ? cm.trim() !== "" : feet.trim() !== "" || inch.trim() !== "");
  let bmi: number | null = null;
  let category = "";
  let color = "";
  let error = "";

  if (validInput && Number.isFinite(w) && heightM > 0) {
    if (w < 2 || w > 500) error = "ওজন 2-500 কেজির মধ্যে দিন";
    else if (heightM * 100 < 50 || heightM * 100 > 250) error = "উচ্চতা 50-250 সেমির মধ্যে দিন";
    else {
      bmi = w / (heightM * heightM);
      if (bmi < 18.5) { category = "কম ওজন"; color = "bg-blue-500"; }
      else if (bmi < 25) { category = "স্বাভাবিক"; color = "bg-green-500"; }
      else if (bmi < 30) { category = "বেশি ওজন"; color = "bg-yellow-500"; }
      else { category = "স্থূলতা"; color = "bg-red-500"; }
    }
  }
  const low = heightM > 0 ? (18.5 * heightM * heightM).toFixed(1) : "-";
  const high = heightM > 0 ? (24.9 * heightM * heightM).toFixed(1) : "-";
  const bmiPercent = bmi ? Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100)) : 0;
  const reset = () => { setWeight(""); setCm(""); setFeet(""); setInch(""); };

  return <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
    <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Activity className="text-indigo-600"/> BMI ক্যালকুলেটর</h2>
    <div><label className="text-sm dark:text-slate-300">ওজন (কেজি)</label><input value={weight} onChange={e=>setWeight(e.target.value)} inputMode="decimal" type="number" placeholder="যেমন: 65" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none" /></div>
    <div className="flex gap-2"><button onClick={()=>setUnit("cm")} className={`flex-1 py-2 rounded-lg border text-sm ${unit==="cm" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-600 dark:text-white"}`}>সেমি (cm)</button><button onClick={()=>setUnit("ft")} className={`flex-1 py-2 rounded-lg border text-sm ${unit==="ft" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-600 dark:text-white"}`}>ফুট/ইঞ্চি</button></div>
    {unit==="cm" ? <input value={cm} onChange={e=>setCm(e.target.value)} inputMode="decimal" type="number" placeholder="উচ্চতা সেমি - যেমন: 170" className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/> : <div className="grid grid-cols-2 gap-3"><input value={feet} onChange={e=>setFeet(e.target.value)} inputMode="decimal" type="number" placeholder="ফুট" className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/><input value={inch} onChange={e=>setInch(e.target.value)} inputMode="decimal" type="number" placeholder="ইঞ্চি" className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none"/></div>}
    {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{error}</p>}
    <button onClick={reset} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:text-white flex items-center gap-1"><RotateCcw size={16}/> Reset</button>
    {bmi!==null && !error && <div className="space-y-3"><div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600 text-center"><p className="text-sm dark:text-slate-300">আপনার BMI</p><p className="text-3xl font-bold dark:text-white">{bmi.toFixed(2)}</p><span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${color}`}>{category}</span><div className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full mt-3 relative overflow-hidden"><div className="absolute h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500 w-full opacity-60"/><div style={{left:`${bmiPercent}%`}} className="absolute top-0 w-1 h-full bg-black dark:bg-white -translate-x-1/2"/></div><p className="text-xs mt-2 dark:text-slate-400">আপনার উচ্চতায় স্বাভাবিক ওজন: {low} - {high} কেজি</p></div><p className="text-xs text-slate-500 dark:text-slate-400 border p-2 rounded-lg">এটি আনুমানিক, ডাক্তারের পরামর্শের বিকল্প নয়। শিশু, গর্ভবতী ও খেলোয়াড়দের ক্ষেত্রে BMI ভিন্নভাবে মূল্যায়ন করা হয়।</p></div>}
  </div>;
}
