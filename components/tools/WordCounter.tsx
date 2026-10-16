"use client";
import { useState, useMemo } from "react";
import { RotateCcw } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const t = text.trim();
    const words = t ? t.split(/\s+/).length : 0;
    return {
      words,
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, "").length,
      sentences: t ? (text.match(/[.!?।]+/g) || []).length : 0,
      paragraphs: t ? text.split(/\n+/).filter((p) => p.trim()).length : 0,
      readingTime: Math.ceil(words / 200),
    };
  }, [text]);

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="এখানে আপনার লেখা পেস্ট করুন..." rows={7} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-slate-500">{stats.words} words</p>
        <button onClick={() => setText("")} className="text-xs px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1 dark:text-white"><RotateCcw className="w-3 h-3" /> Clear</button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-5">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No Space", value: stats.charsNoSpace },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Read Time", value: `${stats.readingTime} min` },
        ].map((s) => (
          <div key={s.label} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center border border-slate-100 dark:border-slate-700">
            <p className="text-lg font-bold text-indigo-600">{s.value}</p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
