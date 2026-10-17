"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Mode = "a" | "b" | "c" | "d";
const MODES: { id: Mode; label: string }[] = [
  { id: "a", label: "X এর Y% কত" },
  { id: "b", label: "X হলো Y এর কত %" },
  { id: "c", label: "% বৃদ্ধি/হ্রাস" },
  { id: "d", label: "% যোগ/বিয়োগ" },
];
const LABELS: Record<Mode, [string, string]> = {
  a: ["সংখ্যা (X)", "শতকরা (Y%)"],
  b: ["অংশ (X)", "মোট (Y)"],
  c: ["আগের মান", "পরের মান"],
  d: ["সংখ্যা (X)", "শতকরা (Y%)"],
};
const f2 = (n: number) => String(Math.round(n * 100) / 100);
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

function compute(mode: Mode, sub: "add" | "sub", xs: string, ys: string): { error?: string; label?: string; formula?: string } | null {
  if (xs === "" || ys === "") return null;
  const x = parseFloat(xs);
  const y = parseFloat(ys);
  if (isNaN(x) || isNaN(y)) return { error: "সঠিক সংখ্যা লিখুন" };
  if (mode === "a") {
    const r = (x * y) / 100;
    return { label: `${f2(x)} এর ${f2(y)}% = ${f2(r)}`, formula: `${f2(x)} × ${f2(y)} ÷ 100 = ${f2(r)}` };
  }
  if (mode === "b") {
    if (y === 0) return { error: "০ দিয়ে ভাগ করা যায় না" };
    const r = (x / y) * 100;
    return { label: `${f2(x)} হলো ${f2(y)} এর ${f2(r)}%`, formula: `${f2(x)} ÷ ${f2(y)} × 100 = ${f2(r)}%` };
  }
  if (mode === "c") {
    if (x === 0) return { error: "আগের মান ০ হলে শতকরা পরিবর্তন বের করা যায় না" };
    const r = ((y - x) / x) * 100;
    return {
      label: `${f2(Math.abs(r))}% ${r >= 0 ? "বৃদ্ধি" : "হ্রাস"}`,
      formula: `(${f2(y)} − ${f2(x)}) ÷ ${f2(x)} × 100 = ${f2(r)}%`,
    };
  }
  const change = (x * y) / 100;
  const r = sub === "add" ? x + change : x - change;
  return {
    label: `${f2(x)} এর সাথে ${f2(y)}% ${sub === "add" ? "যোগ" : "বিয়োগ"} = ${f2(r)}`,
    formula: `${f2(x)} ${sub === "add" ? "+" : "−"} (${f2(x)} × ${f2(y)} ÷ 100) = ${f2(r)}`,
  };
}

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("a");
  const [sub, setSub] = useState<"add" | "sub">("add");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const out = compute(mode, sub, x, y);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)} className={`px-3 py-2.5 rounded-xl text-sm border ${mode === m.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{m.label}</button>
        ))}
      </div>
      {mode === "d" && (
        <div className="flex gap-2">
          <button onClick={() => setSub("add")} className={`flex-1 py-2 rounded-xl border text-sm ${sub === "add" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>যোগ (+)</button>
          <button onClick={() => setSub("sub")} className={`flex-1 py-2 rounded-xl border text-sm ${sub === "sub" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>বিয়োগ (−)</button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{LABELS[mode][0]}</label>
          <input type="number" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} placeholder="যেমন: 200" className={input} />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{LABELS[mode][1]}</label>
          <input type="number" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} placeholder="যেমন: 15" className={input} />
        </div>
      </div>
      <button onClick={() => { setX(""); setY(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {out?.error && <p className="text-sm text-red-500">{out.error}</p>}
      {out?.label && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5">
          <p className="text-xs text-slate-500">ফলাফল</p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{out.label}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 break-words">হিসাব: {out.formula}</p>
        </div>
      )}
    </div>
  );
}
