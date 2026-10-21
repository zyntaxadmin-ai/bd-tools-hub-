"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const grades = [
  { label: "A+ (80-100)", value: 5.0 },
  { label: "A (70-79)", value: 4.0 },
  { label: "A- (60-69)", value: 3.5 },
  { label: "B (50-59)", value: 3.0 },
  { label: "C (40-49)", value: 2.0 },
  { label: "D (33-39)", value: 1.0 },
  { label: "F (0-32) - Fail", value: 0.0 },
];

export default function GpaCalculator() {
  const tr = useTr();
  const [subjects, setSubjects] = useState<number[]>([5, 5, 5, 5, 5]);
  const [gpa, setGpa] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const calculate = () => {
    if (subjects.includes(0)) { setGpa("0.00"); setStatus(tr("Fail - এক বা একাধিক বিষয়ে F", "Fail - F in one or more subjects")); return; }
    const result = (subjects.reduce((a, b) => a + b, 0) / subjects.length).toFixed(2);
    setGpa(result);
    setStatus(Number(result) >= 5 ? "Golden A+ !" : Number(result) >= 4 ? "Excellent" : "Good");
  };
  const reset = () => { setSubjects([5, 5, 5, 5, 5]); setGpa(null); setStatus(""); };

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">{tr("৫টি বিষয়ের গ্রেড সিলেক্ট করুন (Simple average)", "Select the grade for each of the 5 subjects (simple average)")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {subjects.map((val, i) => (
          <div key={i}>
            <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Subject {i + 1}</label>
            <select value={val} onChange={(e) => { const c = [...subjects]; c[i] = parseFloat(e.target.value); setSubjects(c); }} className="w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm dark:text-white">
              {grades.map((g) => <option key={g.label} value={g.value}>{g.label}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={calculate} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Calculate GPA</button>
        <button onClick={reset} aria-label="Reset" className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>
      {gpa && (
        <div className={`mt-6 rounded-xl p-6 text-center border ${gpa === "0.00" ? "bg-red-50 border-red-200 dark:bg-red-950/20" : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20"}`}>
          <p className="text-sm text-slate-500">Your GPA</p>
          <p className={`text-4xl font-bold ${gpa === "0.00" ? "text-red-600" : "text-emerald-600"}`}>{gpa}</p>
          <p className="text-sm font-medium mt-1 text-slate-700 dark:text-slate-300">{status}</p>
          <p className="text-xs text-slate-500 mt-1">Out of 5.00</p>
        </div>
      )}
    </div>
  );
}
