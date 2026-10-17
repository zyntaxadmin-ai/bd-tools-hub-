"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { parseYMD, utcMs, diffYMD, birthdayAt, fmtDate } from "@/lib/dateCalc";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function GovtJobAgeCalculator() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const b = parseYMD(dob), t = parseYMD(asOf);
  const max = parseInt(maxAge, 10);
  let error = "";
  let res: { y: number; m: number; d: number; ok: boolean; last: Date; gapDays: number } | null = null;

  if (b && t && maxAge !== "") {
    if (isNaN(max) || max < 1 || max > 100) error = "সর্বোচ্চ বয়স ১ থেকে ১০০ বছরের মধ্যে দিন";
    else if (utcMs(t) < utcMs(b)) error = "জন্ম তারিখ বয়স গণনার তারিখের পরে হতে পারে না";
    else {
      const age = diffYMD(b, t);
      const lastYmd = birthdayAt(b, max); // শেষ যে দিন পর্যন্ত বয়স সীমার মধ্যে থাকে
      const lastMs = utcMs(lastYmd);
      res = { y: age.y, m: age.m, d: age.d, ok: utcMs(t) <= lastMs, last: new Date(lastMs), gapDays: Math.round(Math.abs(lastMs - utcMs(t)) / 86400000) };
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">আপনার জন্ম তারিখ</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">বয়স গণনার তারিখ (বিজ্ঞপ্তিতে যা দেওয়া আছে)</label>
        <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">সর্বোচ্চ বয়স (বছর)</label>
        <input type="number" inputMode="numeric" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} placeholder="বিজ্ঞপ্তি দেখে লিখুন" className={input} />
      </div>
      <button onClick={() => { setDob(""); setAsOf(""); setMaxAge(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {res && (
        <div className={`rounded-xl p-5 border ${res.ok ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900" : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"}`}>
          <p className="text-sm text-slate-500">ওই তারিখে আপনার বয়স</p>
          <p className="text-2xl font-bold dark:text-white">{res.y} বছর {res.m} মাস {res.d} দিন</p>
          <p className={`mt-2 font-semibold ${res.ok ? "text-emerald-600" : "text-red-600"}`}>{res.ok ? "বয়সের সীমার মধ্যে আছেন" : "বয়সের সীমা পেরিয়ে গেছে"}</p>
          <p className="text-xs text-slate-500 mt-2">
            {res.ok ? `আপনি ${fmtDate(res.last)} পর্যন্ত যোগ্য থাকতেন (আরও ${res.gapDays} দিন)।` : `${fmtDate(res.last)} এর পর বয়স সীমা অতিক্রম করে (${res.gapDays} দিন আগে)।`}
          </p>
        </div>
      )}
      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">বয়সসীমা, গণনার তারিখ ও কোটা চাকরির বিজ্ঞপ্তি ভেদে আলাদা। এই টুল শুধু আনুমানিক হিসাব দেয়, তাই চূড়ান্ত সিদ্ধান্তের আগে অফিসিয়াল বিজ্ঞপ্তি দেখে নিশ্চিত হোন।</p>
    </div>
  );
}
