"use client";
import { useState } from "react";
import { evaluate, fmtResult } from "@/lib/sciEval";
import { errEn } from "@/lib/sciErrEn";
import { useTr } from "@/lib/lang";

type Btn = { label: string; ins?: string; act?: "C" | "BACK" | "EQ"; cls?: string };
const op = "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300";
const fn = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm";
const num = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white";

const ROWS: Btn[][] = [
  [{ label: "sin", ins: "sin(", cls: fn }, { label: "cos", ins: "cos(", cls: fn }, { label: "tan", ins: "tan(", cls: fn }, { label: "log", ins: "log(", cls: fn }, { label: "ln", ins: "ln(", cls: fn }],
  [{ label: "sin⁻¹", ins: "asin(", cls: fn }, { label: "cos⁻¹", ins: "acos(", cls: fn }, { label: "tan⁻¹", ins: "atan(", cls: fn }, { label: "√", ins: "√(", cls: fn }, { label: "x²", ins: "^2", cls: fn }],
  [{ label: "π", ins: "π", cls: fn }, { label: "e", ins: "e", cls: fn }, { label: "xʸ", ins: "^", cls: fn }, { label: "n!", ins: "!", cls: fn }, { label: "%", ins: "%", cls: fn }],
  [{ label: "(", ins: "(", cls: op }, { label: ")", ins: ")", cls: op }, { label: "Ans", ins: "ans", cls: op }, { label: "C", act: "C", cls: "bg-red-50 dark:bg-red-950/30 text-red-600" }, { label: "⌫", act: "BACK", cls: "bg-red-50 dark:bg-red-950/30 text-red-600" }],
  [{ label: "7", ins: "7", cls: num }, { label: "8", ins: "8", cls: num }, { label: "9", ins: "9", cls: num }, { label: "÷", ins: "÷", cls: op }, { label: "×", ins: "×", cls: op }],
  [{ label: "4", ins: "4", cls: num }, { label: "5", ins: "5", cls: num }, { label: "6", ins: "6", cls: num }, { label: "−", ins: "-", cls: op }, { label: "+", ins: "+", cls: op }],
  [{ label: "1", ins: "1", cls: num }, { label: "2", ins: "2", cls: num }, { label: "3", ins: "3", cls: num }, { label: "0", ins: "0", cls: num }, { label: ".", ins: ".", cls: num }],
];

export default function ScientificCalculator() {
  const tr = useTr();
  const [expr, setExpr] = useState("");
  const [deg, setDeg] = useState(true);
  const [ans, setAns] = useState(0);
  const [error, setError] = useState("");

  let preview: string | null = null;
  if (expr.trim() !== "") {
    try { preview = fmtResult(evaluate(expr, deg, ans)); } catch { preview = null; }
  }

  const press = (b: Btn) => {
    setError("");
    if (b.act === "C") { setExpr(""); return; }
    if (b.act === "BACK") { setExpr(expr.replace(/(?:asin|acos|atan|sin|cos|tan|log|ln|√)\($|[\s\S]$/, "")); return; }
    if (b.ins) setExpr(expr + b.ins);
  };
  const equals = () => {
    try {
      const r = evaluate(expr, deg, ans);
      setAns(r);
      setExpr(fmtResult(r));
      setError("");
    } catch (e) {
      setError(e instanceof Error ? tr(e.message, errEn(e.message)) : tr("হিসাব করা যায়নি", "Could not calculate"));
    }
  };

  return (
    <div className="space-y-3 max-w-md mx-auto">
      <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3">
        <input
          value={expr}
          onChange={(e) => { setExpr(e.target.value); setError(""); }}
          onKeyDown={(e) => { if (e.key === "Enter") equals(); }}
          inputMode="none"
          placeholder="0"
          aria-label={tr("এক্সপ্রেশন", "Expression")}
          className="w-full bg-transparent text-right text-2xl font-mono dark:text-white outline-none"
        />
        <p className="text-right text-sm text-slate-500 min-h-[20px] font-mono break-all">{preview !== null && preview !== expr ? `= ${preview}` : ""}</p>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-between items-center">
        <button onClick={() => setDeg(!deg)} className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs dark:text-white">{deg ? tr("Deg (ডিগ্রি)", "Deg (degrees)") : tr("Rad (রেডিয়ান)", "Rad (radians)")}</button>
        <span className="text-xs text-slate-500">{tr("ক্লিক করে বদলান", "Tap to switch")}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {ROWS.flat().map((b, i) => (
          <button key={i} onClick={() => press(b)} className={`h-12 rounded-xl font-medium active:scale-95 transition ${b.cls}`}>{b.label}</button>
        ))}
      </div>
      <button onClick={equals} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700">=</button>
    </div>
  );
}
