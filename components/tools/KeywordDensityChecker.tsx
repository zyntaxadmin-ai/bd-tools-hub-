"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { analyze } from "@/lib/keywords";
import { useTr } from "@/lib/lang";

export default function KeywordDensityChecker() {
  const tr = useTr();
  const [text, setText] = useState("");
  const [n, setN] = useState<1 | 2 | 3>(1);
  const [skipShort, setSkipShort] = useState(true);
  const [skipStop, setSkipStop] = useState(true);

  const res = text.trim() ? analyze(text, n, skipShort, skipStop) : null;
  const rows = res ? res.rows.slice(0, 20) : [];
  const maxCount = rows.length ? rows[0].count : 1;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder={tr("আপনার আর্টিকেল বা লেখা এখানে পেস্ট করুন (বাংলা ও ইংরেজি দুটোই চলবে)...", "Paste your article or text here (Bangla and English both work)...")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
      <div className="flex gap-2">
        {([1, 2, 3] as const).map((v) => (
          <button key={v} onClick={() => setN(v)} className={`flex-1 py-2 rounded-xl border text-sm ${n === v ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{v} {tr("শব্দ", v === 1 ? "word" : "words")}</button>
        ))}
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={skipShort} onChange={() => setSkipShort(!skipShort)} className="w-4 h-4 accent-indigo-600" /> {tr("ছোট শব্দ (২ অক্ষর বা কম) বাদ দিন", "Ignore short words (2 characters or fewer)")}</label>
        <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={skipStop} onChange={() => setSkipStop(!skipStop)} className="w-4 h-4 accent-indigo-600" /> {tr("সাধারণ শব্দ (the, and, এবং, এই...) বাদ দিন", "Ignore common words (the, and, is... and common Bangla words)")}</label>
      </div>
      <button onClick={() => setText("")} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Clear</button>

      {res && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{res.total}</p><p className="text-xs text-slate-500">{tr("মোট শব্দ", "Total words")}</p></div>
            <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3"><p className="text-xl font-bold text-violet-600">{res.unique}</p><p className="text-xs text-slate-500">{tr("ইউনিক শব্দ", "Unique words")}</p></div>
          </div>
          {rows.length === 0 ? (
            <p className="text-sm text-slate-500">{tr("কোনো কীওয়ার্ড পাওয়া যায়নি। ফিল্টার বন্ধ করে বা বড় লেখা দিয়ে দেখুন।", "No keywords found. Turn off the filters or use a longer text.")}</p>
          ) : (
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
              <table className="w-full text-sm min-w-[360px]">
                <thead className="bg-slate-100 dark:bg-slate-800 dark:text-white"><tr><th className="p-2 text-left">{tr("কীওয়ার্ড", "Keyword")}</th><th className="p-2">{tr("বার", "Count")}</th><th className="p-2">{tr("ঘনত্ব", "Density")}</th></tr></thead>
                <tbody className="dark:text-slate-200">
                  {rows.map((r) => (
                    <tr key={r.phrase} className="border-t border-slate-200 dark:border-slate-700">
                      <td className="p-2">
                        <div className="font-medium break-words">{r.phrase}</div>
                        <div className="h-1.5 mt-1 rounded bg-slate-100 dark:bg-slate-700"><div className="h-full rounded bg-indigo-500" style={{ width: `${(r.count / maxCount) * 100}%` }} /></div>
                      </td>
                      <td className="p-2 text-center">{r.count}</td>
                      <td className="p-2 text-center">{r.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-slate-500">{tr("ঘনত্ব = কীওয়ার্ড কতবার এসেছে ÷ মোট শব্দ × ১০০। একটি কীওয়ার্ড বারবার ঠেসে দেওয়া (keyword stuffing) এড়িয়ে স্বাভাবিকভাবে লিখুন।", "Density = times the keyword appears ÷ total words × 100. Write naturally and avoid keyword stuffing (repeating a keyword unnaturally).")}</p>
        </div>
      )}
    </div>
  );
}
