"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

type Mode = "a" | "b" | "c" | "d";
type Tr = (bn: string, en: string) => string;

const MODES: { id: Mode; bn: string; en: string }[] = [
  { id: "a", bn: "X এর Y% কত", en: "Y% of X" },
  { id: "b", bn: "X হলো Y এর কত %", en: "X is what % of Y" },
  { id: "c", bn: "% বৃদ্ধি/হ্রাস", en: "% increase/decrease" },
  { id: "d", bn: "% যোগ/বিয়োগ", en: "Add/subtract %" },
];
const LABELS: Record<Mode, [[string, string], [string, string]]> = {
  a: [["সংখ্যা (X)", "Number (X)"], ["শতকরা (Y%)", "Percentage (Y%)"]],
  b: [["অংশ (X)", "Part (X)"], ["মোট (Y)", "Total (Y)"]],
  c: [["আগের মান", "Old value"], ["পরের মান", "New value"]],
  d: [["সংখ্যা (X)", "Number (X)"], ["শতকরা (Y%)", "Percentage (Y%)"]],
};
const f2 = (n: number) => String(Math.round(n * 100) / 100);
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

function compute(mode: Mode, sub: "add" | "sub", xs: string, ys: string, tr: Tr): { error?: string; label?: string; formula?: string } | null {
  if (xs === "" || ys === "") return null;
  const x = parseFloat(xs);
  const y = parseFloat(ys);
  if (isNaN(x) || isNaN(y)) return { error: tr("সঠিক সংখ্যা লিখুন", "Enter valid numbers") };
  if (mode === "a") {
    const r = (x * y) / 100;
    return { label: tr(`${f2(x)} এর ${f2(y)}% = ${f2(r)}`, `${f2(y)}% of ${f2(x)} = ${f2(r)}`), formula: `${f2(x)} × ${f2(y)} ÷ 100 = ${f2(r)}` };
  }
  if (mode === "b") {
    if (y === 0) return { error: tr("০ দিয়ে ভাগ করা যায় না", "Cannot divide by 0") };
    const r = (x / y) * 100;
    return { label: tr(`${f2(x)} হলো ${f2(y)} এর ${f2(r)}%`, `${f2(x)} is ${f2(r)}% of ${f2(y)}`), formula: `${f2(x)} ÷ ${f2(y)} × 100 = ${f2(r)}%` };
  }
  if (mode === "c") {
    if (x === 0) return { error: tr("আগের মান ০ হলে শতকরা পরিবর্তন বের করা যায় না", "Percentage change cannot be found when the old value is 0") };
    const r = ((y - x) / x) * 100;
    return {
      label: `${f2(Math.abs(r))}% ${r >= 0 ? tr("বৃদ্ধি", "increase") : tr("হ্রাস", "decrease")}`,
      formula: `(${f2(y)} − ${f2(x)}) ÷ ${f2(x)} × 100 = ${f2(r)}%`,
    };
  }
  const change = (x * y) / 100;
  const r = sub === "add" ? x + change : x - change;
  return {
    label: tr(
      `${f2(x)} এর সাথে ${f2(y)}% ${sub === "add" ? "যোগ" : "বিয়োগ"} = ${f2(r)}`,
      `${f2(x)} ${sub === "add" ? "plus" : "minus"} ${f2(y)}% = ${f2(r)}`
    ),
    formula: `${f2(x)} ${sub === "add" ? "+" : "−"} (${f2(x)} × ${f2(y)} ÷ 100) = ${f2(r)}`,
  };
}

export default function PercentageCalculator() {
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("a");
  const [sub, setSub] = useState<"add" | "sub">("add");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const out = compute(mode, sub, x, y, tr);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`px-3 py-2.5 rounded-xl text-sm border ${mode === m.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr(m.bn, m.en)}</button>
        ))}
      </div>
      {mode === "d" && (
        <div className="flex gap-2">
          <button onClick={() => setSub("add")} className={`flex-1 py-2 rounded-xl border text-sm ${sub === "add" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("যোগ (+)", "Add (+)")}</button>
          <button onClick={() => setSub("sub")} className={`flex-1 py-2 rounded-xl border text-sm ${sub === "sub" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("বিয়োগ (−)", "Subtract (−)")}</button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr(...LABELS[mode][0])}</label>
          <input type="number" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} placeholder={tr("যেমন: 200", "e.g. 200")} className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr(...LABELS[mode][1])}</label>
          <input type="number" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} placeholder={tr("যেমন: 15", "e.g. 15")} className={input} />
        </div>
      </div>
      <button onClick={() => { setX(""); setY(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {out?.error && <p className="text-sm text-red-500">{out.error}</p>}
      {out?.label && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5">
          <p className="text-xs text-slate-500">{tr("ফলাফল", "Result")}</p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{out.label}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 break-words">{tr("হিসাব: ", "Working: ")}{out.formula}</p>
        </div>
      )}
    </div>
  );
}
