"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const PRESETS = [
  { id: "sms-en", label: "SMS (ইংরেজি) ১৬০", max: 160 },
  { id: "sms-bn", label: "SMS (বাংলা) ৭০", max: 70 },
  { id: "x", label: "X পোস্ট ২৮০", max: 280 },
  { id: "title", label: "SEO Title ~৬০", max: 60 },
  { id: "meta", label: "Meta Description ~১৬০", max: 160 },
  { id: "bio", label: "Instagram Bio ১৫০", max: 150 },
  { id: "none", label: "লিমিট নেই", max: 0 },
];

const EN: Record<string, string> = {
  "SMS (ইংরেজি) ১৬০": "SMS (English) 160",
  "SMS (বাংলা) ৭০": "SMS (Bangla) 70",
  "X পোস্ট ২৮০": "X post 280",
  "SEO Title ~৬০": "SEO Title ~60",
  "Meta Description ~১৬০": "Meta Description ~160",
  "Instagram Bio ১৫০": "Instagram Bio 150",
  "লিমিট নেই": "No limit"
};

export default function CharacterCounter() {
  const tr = useTr();
  const tl = (x: string) => tr(x, EN[x] ?? x);
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
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder={tr("এখানে লেখা টাইপ বা পেস্ট করুন...", "Type or paste your text here...")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{withSpaces}</p><p className="text-[11px] text-slate-500">{tr("স্পেসসহ", "With spaces")}</p></div>
        <div className="bg-violet-50 dark:bg-violet-950/30 rounded-xl p-3"><p className="text-xl font-bold text-violet-600">{noSpaces}</p><p className="text-[11px] text-slate-500">{tr("স্পেস ছাড়া", "Without spaces")}</p></div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3"><p className="text-xl font-bold text-emerald-600">{lines}</p><p className="text-[11px] text-slate-500">{tr("লাইন", "Lines")}</p></div>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("লিমিট চেক করুন", "Check a limit")}</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.id} onClick={() => setPreset(p.id)} className={`px-3 py-1.5 rounded-full border text-xs ${preset === p.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tl(p.label)}</button>
          ))}
        </div>
      </div>
      {max > 0 && (
        <div>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"><div className={`h-full ${bar}`} style={{ width: `${pct}%` }} /></div>
          <p className={`text-sm mt-2 ${over ? "text-red-600" : "text-slate-600 dark:text-slate-400"}`}>
            {over ? tr(`${withSpaces - max} অক্ষর বেশি হয়েছে (${withSpaces}/${max})`, `${withSpaces - max} characters over (${withSpaces}/${max})`) : tr(`${max - withSpaces} অক্ষর বাকি (${withSpaces}/${max})`, `${max - withSpaces} characters left (${withSpaces}/${max})`)}
          </p>
        </div>
      )}
      <button onClick={() => setText("")} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Clear</button>
      <p className="text-xs text-slate-500">{tr("প্ল্যাটফর্মভেদে গণনা সামান্য আলাদা হতে পারে (যেমন ইমোজি বা লিংকের হিসাব)। SEO Title ও Description এ Google মূলত পিক্সেল দেখে ছাঁটে, তাই সংখ্যাটি আনুমানিক।", "Counting may differ slightly between platforms (for example emoji or links). For SEO titles and descriptions Google truncates by pixel width, so the number is approximate.")}</p>
    </div>
  );
}
