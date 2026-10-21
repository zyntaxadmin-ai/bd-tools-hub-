"use client";
import { useRef, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

type Row = { id: number; gpa: string; credit: string };
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function CgpaCalculator() {
  const tr = useTr();
  const nextId = useRef(4);
  const [scale, setScale] = useState<4 | 5>(4);
  const [rows, setRows] = useState<Row[]>([
    { id: 1, gpa: "", credit: "" },
    { id: 2, gpa: "", credit: "" },
    { id: 3, gpa: "", credit: "" },
  ]);

  const update = (id: number, field: "gpa" | "credit", value: string) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  const add = () => setRows([...rows, { id: nextId.current++, gpa: "", credit: "" }]);
  const remove = (id: number) => setRows(rows.filter((r) => r.id !== id));
  const reset = () => setRows(rows.map((r) => ({ ...r, gpa: "", credit: "" })));

  let error = "";
  let points = 0, credits = 0, used = 0;
  for (const r of rows) {
    if (r.gpa === "" && r.credit === "") continue;
    const g = parseFloat(r.gpa), c = parseFloat(r.credit);
    if (r.gpa === "" || r.credit === "" || isNaN(g) || isNaN(c)) { error = tr("প্রতিটি সেমিস্টারের GPA ও ক্রেডিট দুটোই দিন", "Enter both GPA and credits for every semester"); break; }
    if (g < 0 || g > scale) { error = tr(`GPA ০ থেকে ${scale}.০০ এর মধ্যে দিন`, `GPA must be between 0 and ${scale}.00`); break; }
    if (c <= 0 || c > 200) { error = tr("ক্রেডিট ০ এর বেশি এবং ২০০ এর কম দিন", "Credits must be above 0 and at most 200"); break; }
    points += g * c; credits += c; used++;
  }
  const cgpa = !error && used > 0 ? points / credits : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setScale(4)} className={`flex-1 py-2 rounded-xl border text-sm ${scale === 4 ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("৪.০০ স্কেল", "4.00 scale")}</button>
        <button onClick={() => setScale(5)} className={`flex-1 py-2 rounded-xl border text-sm ${scale === 5 ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("৫.০০ স্কেল", "5.00 scale")}</button>
      </div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={r.id} className="flex items-end gap-2">
            <div className="flex-1 min-w-0">
              <label className="text-xs text-slate-500">{tr("সেমিস্টার", "Semester")} {i + 1} GPA</label>
              <input type="number" inputMode="decimal" value={r.gpa} onChange={(e) => update(r.id, "gpa", e.target.value)} placeholder={tr("যেমন: 3.50", "e.g. 3.50")} className={input} />
            </div>
            <div className="flex-1 min-w-0">
              <label className="text-xs text-slate-500">{tr("মোট ক্রেডিট", "Total credits")}</label>
              <input type="number" inputMode="decimal" value={r.credit} onChange={(e) => update(r.id, "credit", e.target.value)} placeholder={tr("যেমন: 18", "e.g. 18")} className={input} />
            </div>
            <button onClick={() => remove(r.id)} disabled={rows.length === 1} aria-label={tr("মুছুন", "Remove")} className="p-3 mb-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={add} className="flex-1 py-3 border border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> {tr("সেমিস্টার যোগ করুন", "Add semester")}</button>
        <button onClick={reset} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {cgpa !== null && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-500">{tr("আপনার CGPA", "Your CGPA")}</p>
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{cgpa.toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-2">{tr(`${used}টি সেমিস্টার, মোট ক্রেডিট ${Math.round(credits * 100) / 100} (স্কেল ${scale}.00)`, `${used} ${used === 1 ? "semester" : "semesters"}, total credits ${Math.round(credits * 100) / 100} (scale ${scale}.00)`)}</p>
        </div>
      )}
      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">{tr("হিসাব: CGPA = Σ(সেমিস্টার GPA × ক্রেডিট) ÷ মোট ক্রেডিট। বিশ্ববিদ্যালয়ভেদে গ্রেডিং নিয়ম আলাদা হতে পারে, তাই অফিসিয়াল ফলাফল আপনার বিশ্ববিদ্যালয় থেকে দেখুন।", "How it works: CGPA = Σ(semester GPA × credits) ÷ total credits. Grading rules differ between universities, so check the official result with your university.")}</p>
    </div>
  );
}
