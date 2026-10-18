"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const PRESETS = [
  { id: "sms-en", label: "SMS (ইংরেজি) ১৬০", max: 160 },
  { id: "sms-bn", label: "SMS (বাংলা) ৭০", max: 70 },
  { id: "x", label: "X পোস্ট ২৮০", max: 280 },
  { id: "title", label: "SEO Title ~৬০", max: 60 },
  { id: "meta", label: "Meta Description ~১৬০", max: 160 },
  { id: "bio", label: "Instagram Bio ১৫০", max: 150 },
  { id: "none", label: "লিমিট নেই", max: 0 },
];

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [preset, setPreset] = useState("none");

  const withSpaces = text.length;
  const noSpaces = text.replace(/\s/g, "").length;
  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
  const max = PRESETS.find((p) => p.id === preset)?.max ?? 0;
  const pct = max > 0 ? Math.min(100, (withSpaces / max) * 100) : 0;
  const over = max > 0 && withSpaces > max;
  const bar = over ? "bg-red-500" : pct >= 90 ? "bg-amber-500" : "bg-emerald-500";

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="এখানে লেখা টাইপ বা পেস্ট করুন..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{withSpaces}</p><p className="text-[11px] text-slate-500">স্পেসসহ</p></div>
        <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3"><p className="text-xl font-bold text-violet-600">{noSpaces}</p><p className="text-[11px] text-slate-500">স্পেস ছাড়া</p></div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3"><p className="text-xl font-bold text-emerald-600">{lines}</p><p className="text-[11px] text-slate-500">লাইন</p></div>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">লিমিট চেক করুন</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => setPreset(p.id)} className={`px-3 py-1.5 rounded-full border text-xs ${preset === p.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{p.label}</button>
          ))}
        </div>
      </div>
      {max > 0 && (
        <div>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className={`h-full ${bar}`} style={{ width: `${pct}%` }} /></div>
          <p className={`text-sm mt-2 ${over ? "text-red-600" : "text-slate-600 dark:text-slate-400"}`}>
            {over ? `${withSpaces - max} অক্ষর বেশি হয়েছে (${withSpaces}/${max})` : `${max - withSpaces} অক্ষর বাকি (${withSpaces}/${max})`}
          </p>
        </div>
      )}
      <button onClick={() => setText("")} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Clear</button>
      <p className="text-xs text-slate-500">প্ল্যাটফর্মভেদে গণনা সামান্য আলাদা হতে পারে (যেমন ইমোজি বা লিংকের হিসাব)। SEO Title ও Description এ Google মূলত পিক্সেল দেখে ছাঁটে, তাই সংখ্যাটি আনুমানিক।</p>
    </div>
  );
}
