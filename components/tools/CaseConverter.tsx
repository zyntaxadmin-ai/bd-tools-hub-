"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

const words = (s: string) => s.match(/[\p{L}\p{N}]+/gu) || [];
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

const CONVERTERS: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: "upper", label: "UPPERCASE", fn: (s) => s.toUpperCase() },
  { id: "lower", label: "lowercase", fn: (s) => s.toLowerCase() },
  { id: "title", label: "Title Case", fn: (s) => s.toLowerCase().replace(/(^|[\s\-_(])(\p{L})/gu, (_, a, b) => a + b.toUpperCase()) },
  { id: "sentence", label: "Sentence case", fn: (s) => s.toLowerCase().replace(/(^\s*|[.!?।]\s+)(\p{L})/gu, (_, a, b) => a + b.toUpperCase()) },
  { id: "camel", label: "camelCase", fn: (s) => words(s).map((w, i) => (i === 0 ? w.toLowerCase() : cap(w))).join("") },
  { id: "snake", label: "snake_case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", fn: (s) => words(s).map((w) => w.toLowerCase()).join("-") },
  { id: "alt", label: "aLtErNaTiNg", fn: (s) => { let i = 0; return Array.from(s).map((c) => (/\p{L}/u.test(c) ? (i++ % 2 === 0 ? c.toLowerCase() : c.toUpperCase()) : c)).join(""); } },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const apply = (fn: (s: string) => string) => { setText(fn(text)); setCopied(false); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={7} placeholder="এখানে আপনার লেখা পেস্ট করুন..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
      <div className="flex justify-between text-xs text-slate-500"><span>{text.length} অক্ষর</span><span>{words(text).length} শব্দ</span></div>
      <div className="grid grid-cols-2 gap-2">
        {CONVERTERS.map((c) => (
          <button key={c.id} onClick={() => apply(c.fn)} disabled={!text} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 dark:text-white disabled:opacity-50">{c.label}</button>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={copy} disabled={!text} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
        <button onClick={() => { setText(""); setCopied(false); }} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Clear</button>
      </div>
      <p className="text-xs text-slate-500">বাংলা অক্ষরে বড়/ছোট হাতের ভেদ নেই, তাই বাংলা লেখা অপরিবর্তিত থাকবে।</p>
    </div>
  );
}
