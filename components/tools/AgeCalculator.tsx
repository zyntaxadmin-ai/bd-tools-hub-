"use client";
import { useState } from "react";
import { RotateCcw, Calendar } from "lucide-react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<null | { y: number; m: number; d: number; totalDays: number; nextBirthday: number }>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!dob) return setError("জন্ম তারিখ সিলেক্ট করুন");
    const birth = new Date(dob);
    const today = new Date();
    if (birth > today) return setError("জন্ম তারিখ ভবিষ্যতে হতে পারে না");

    let y = today.getFullYear() - birth.getFullYear();
    let m = today.getMonth() - birth.getMonth();
    let d = today.getDate() - birth.getDate();
    if (d < 0) { m--; d += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < todayStart) nextBday.setFullYear(today.getFullYear() + 1);
    const nextBirthday = Math.round((nextBday.getTime() - todayStart.getTime()) / 86400000);

    setResult({ y, m, d, totalDays, nextBirthday });
  };
  const reset = () => { setDob(""); setResult(null); setError(""); };

  return (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">আপনার জন্ম তারিখ</label>
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().split("T")[0]} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
        <button onClick={calculate} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">Calculate</button>
        <button onClick={reset} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{result.y}</p><p className="text-xs text-slate-500">Years</p></div>
          <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-violet-600">{result.m}</p><p className="text-xs text-slate-500">Months</p></div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{result.d}</p><p className="text-xs text-slate-500">Days</p></div>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-amber-600">{result.totalDays}</p><p className="text-xs text-slate-500">Total Days</p></div>
          <div className="col-span-2 md:col-span-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2"><Calendar className="w-4 h-4" /> Next Birthday in {result.nextBirthday} days</div>
        </div>
      )}
    </div>
  );
}
