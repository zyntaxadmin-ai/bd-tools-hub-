"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { parseYMD, utcMs, diffYMD, addToDate, fmtDate } from "@/lib/dateCalc";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const tab = (on: boolean) => `flex-1 py-2 rounded-xl border text-sm ${on ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

export default function DateDifference() {
  const tr = useTr();
  const [mode, setMode] = useState<"diff" | "add">("diff");
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [base, setBase] = useState("");
  const [sign, setSign] = useState<1 | -1>(1);
  const [yy, setYy] = useState("");
  const [mm, setMm] = useState("");
  const [dd, setDd] = useState("");

  // difference
  const a = parseYMD(d1), b = parseYMD(d2);
  let diff: ReturnType<typeof diffYMD> | null = null;
  if (a && b) diff = utcMs(a) <= utcMs(b) ? diffYMD(a, b) : diffYMD(b, a);

  // add / subtract
  const bs = parseYMD(base);
  const Y = yy === "" ? 0 : parseInt(yy, 10), M = mm === "" ? 0 : parseInt(mm, 10), D = dd === "" ? 0 : parseInt(dd, 10);
  let addError = "";
  let target: Date | null = null;
  if (bs && (yy !== "" || mm !== "" || dd !== "")) {
    if ([Y, M, D].some((x) => isNaN(x) || x < 0) || Y > 500 || M > 6000 || D > 200000) addError = tr("০ বা ধনাত্মক পূর্ণসংখ্যা দিন", "Enter 0 or a positive whole number");
    else target = addToDate(bs, Y, M, D, sign);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode("diff")} className={tab(mode === "diff")}>{tr("দুই তারিখের পার্থক্য", "Difference between dates")}</button>
        <button onClick={() => setMode("add")} className={tab(mode === "add")}>{tr("দিন যোগ/বিয়োগ", "Add/subtract days")}</button>
      </div>

      {mode === "diff" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium dark:text-slate-200">{tr("শুরুর তারিখ", "Start date")}</label><input type="date" value={d1} onChange={(e) => setD1(e.target.value)} className={input} /></div>
            <div><label className="text-sm font-medium dark:text-slate-200">{tr("শেষের তারিখ", "End date")}</label><input type="date" value={d2} onChange={(e) => setD2(e.target.value)} className={input} /></div>
          </div>
          <button onClick={() => { setD1(""); setD2(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
          {diff && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{diff.y}</p><p className="text-xs text-slate-500">{tr("বছর", "Years")}</p></div>
                <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-violet-600">{diff.m}</p><p className="text-xs text-slate-500">{tr("মাস", "Months")}</p></div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{diff.d}</p><p className="text-xs text-slate-500">{tr("দিন", "Days")}</p></div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm dark:text-slate-200 space-y-1">
                <p>{tr("মোট দিন:", "Total days:")} <b>{diff.totalDays.toLocaleString("en-IN")}</b></p>
                <p>{tr("মোট সপ্তাহ:", "Total weeks:")} <b>{Math.floor(diff.totalDays / 7)}</b> {tr("সপ্তাহ", "weeks")} <b>{diff.totalDays % 7}</b> {tr("দিন", "days")}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div><label className="text-sm font-medium dark:text-slate-200">{tr("শুরুর তারিখ", "Start date")}</label><input type="date" value={base} onChange={(e) => setBase(e.target.value)} className={input} /></div>
          <div className="flex gap-2">
            <button onClick={() => setSign(1)} className={tab(sign === 1)}>{tr("যোগ (+)", "Add (+)")}</button>
            <button onClick={() => setSign(-1)} className={tab(sign === -1)}>{tr("বিয়োগ (−)", "Subtract (−)")}</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input type="number" inputMode="numeric" value={yy} onChange={(e) => setYy(e.target.value)} placeholder={tr("বছর", "Years")} className={input} />
            <input type="number" inputMode="numeric" value={mm} onChange={(e) => setMm(e.target.value)} placeholder={tr("মাস", "Months")} className={input} />
            <input type="number" inputMode="numeric" value={dd} onChange={(e) => setDd(e.target.value)} placeholder={tr("দিন", "Days")} className={input} />
          </div>
          <button onClick={() => { setBase(""); setYy(""); setMm(""); setDd(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
          {addError && <p className="text-sm text-red-500">{addError}</p>}
          {target && (
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5">
              <p className="text-xs text-slate-500">{tr("ফলাফল তারিখ", "Resulting date")}</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{fmtDate(target)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
