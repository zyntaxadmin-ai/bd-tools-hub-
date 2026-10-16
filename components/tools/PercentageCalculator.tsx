"use client";
import { useState } from "react";
import { Percent, RotateCcw } from "lucide-react";

type Mode = "a" | "b" | "c" | "d";
type SubMode = "add" | "sub";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("a");
  const [subMode, setSubMode] = useState<SubMode>("add");
  const [x, setX] = useState("");
  const [y, setY] = useState("");

  const numX = Number(x);
  const numY = Number(y);
  const hasValues = x.trim() !== "" && y.trim() !== "" &&
    Number.isFinite(numX) && Number.isFinite(numY);
  let result: number | null = null;
  let formula = "";
  let resultLabel = "";
  let error = "";

  if (hasValues) {
    if (mode === "a") {
      result = (numX * numY) / 100;
      formula = `${numX} × ${numY} ÷ 100 = ${result.toFixed(2)}`;
      resultLabel = `${numX} এর ${numY}% = ${result.toFixed(2)}`;
    } else if (mode === "b") {
      if (numY === 0) error = "০ দিয়ে ভাগ করা যাবে না";
      else {
        result = (numX / numY) * 100;
        formula = `${numX} ÷ ${numY} × 100 = ${result.toFixed(2)}%`;
        resultLabel = `${numX} হলো ${numY} এর ${result.toFixed(2)}%`;
      }
    } else if (mode === "c") {
      if (numX === 0) error = "আগের মান ০ হলে পরিবর্তন বের করা যায় না";
      else {
        result = ((numY - numX) / numX) * 100;
        formula = `(${numY} - ${numX}) ÷ ${numX} × 100 = ${result.toFixed(2)}%`;
        resultLabel = `${Math.abs(result).toFixed(2)}% ${result >= 0 ? "বৃদ্ধি" : "হ্রাস"}`;
      }
    } else {
      const change = (numX * numY) / 100;
      result = subMode === "add" ? numX + change : numX - change;
      formula = `${numX} ${subMode === "add" ? "+" : "-"} (${numX} × ${numY} ÷ 100) = ${result.toFixed(2)}`;
      resultLabel = `${numX} এর সাথে ${numY}% ${subMode === "add" ? "যোগ" : "বিয়োগ"} = ${result.toFixed(2)}`;
    }
  }

  const reset = () => { setX(""); setY(""); };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><Percent className="text-indigo-600" /> শতকরা ক্যালকুলেটর</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {([{id:"a",label:"X এর Y%"},{id:"b",label:"X, Y এর কত %"},{id:"c",label:"% পরিবর্তন"},{id:"d",label:"যোগ/বিয়োগ"}] as const).map(m =>
          <button key={m.id} onClick={() => setMode(m.id)} className={`p-2 rounded-lg text-sm border ${mode===m.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-slate-700 dark:text-white border-slate-200 dark:border-slate-600"}`}>{m.label}</button>
        )}
      </div>
      {mode === "d" && <div className="flex gap-2">
        <button onClick={()=>setSubMode("add")} className={`flex-1 py-2 rounded-lg border text-sm ${subMode==="add" ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-600 text-indigo-600" : "border-slate-200 dark:border-slate-600 dark:text-white"}`}>যোগ (+)</button>
        <button onClick={()=>setSubMode("sub")} className={`flex-1 py-2 rounded-lg border text-sm ${subMode==="sub" ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-600 text-indigo-600" : "border-slate-200 dark:border-slate-600 dark:text-white"}`}>বিয়োগ (-)</button>
      </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="text-sm dark:text-slate-300">{mode==="b" ? "X (অংশ)" : mode==="c" ? "আগের মান (X)" : "মান X"}</label><input value={x} onChange={e=>setX(e.target.value)} inputMode="decimal" type="number" placeholder="যেমন: 200" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" /></div>
        <div><label className="text-sm dark:text-slate-300">{mode==="a" ? "Y (%)" : mode==="c" ? "পরের মান (Y)" : "মান Y"}</label><input value={y} onChange={e=>setY(e.target.value)} inputMode="decimal" type="number" placeholder="যেমন: 15" className="w-full mt-1 p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" /></div>
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{error}</p>}
      <button onClick={reset} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 dark:text-white flex items-center gap-1"><RotateCcw size={16}/> Reset</button>
      {result !== null && !error && <div className="bg-indigo-50 dark:bg-slate-700/50 rounded-xl p-4 border border-indigo-100 dark:border-slate-600"><p className="text-sm text-slate-600 dark:text-slate-300">ফলাফল</p><p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{resultLabel}</p><p className="text-sm mt-1 bg-white dark:bg-slate-800 inline-block px-2 py-1 rounded border dark:text-slate-200">Formula: {formula}</p></div>}
    </div>
  );
}
