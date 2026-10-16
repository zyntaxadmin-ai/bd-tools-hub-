"use client";
import { useState } from "react";
import { CaseSensitive, Copy, Trash2 } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toTitle = (s:string) => s.replace(/\w\S*/g, w=> w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
  const toSentence = (s:string) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c=> c.toUpperCase());
  const toCamel = (s:string) => s.replace(/[^a-zA-Z0-9]+(.)/g, (_,c)=> c.toUpperCase()).replace(/^[A-Z]/, c=>c.toLowerCase());
  const toSnake = (s:string) => s.trim().replace(/\s+/g,"_").replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  const toKebab = (s:string) => s.trim().replace(/\s+/g,"-").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  const toAlt = (s:string) => s.split("").map((c,i)=> i%2==0 ? c.toLowerCase() : c.toUpperCase()).join("");

  const set = (t:string) => setText(t);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),1500)}

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><CaseSensitive className="text-indigo-600"/> Case Converter</h2>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="এখানে লেখা পেস্ট করুন... Bangla লেখায় কোন পরিবর্তন হবে না।" rows={6} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white outline-none" />
      <p className="text-xs dark:text-slate-400">{text.length} characters, {text.trim() ? text.trim().split(/\s+/).length : 0} words</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button onClick={()=>set(text.toUpperCase())} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">UPPERCASE</button>
        <button onClick={()=>set(text.toLowerCase())} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">lowercase</button>
        <button onClick={()=>set(toTitle(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">Title Case</button>
        <button onClick={()=>set(toSentence(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">Sentence case</button>
        <button onClick={()=>set(toCamel(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">camelCase</button>
        <button onClick={()=>set(toSnake(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">snake_case</button>
        <button onClick={()=>set(toKebab(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">kebab-case</button>
        <button onClick={()=>set(toAlt(text))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 dark:text-white border text-sm">aLtErNaTiNg</button>
      </div>
      <div className="flex gap-2">
        <button onClick={copy} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg flex justify-center gap-1"><Copy size={16}/> {copied ? "Copied!" : "Copy"}</button>
        <button onClick={()=>setText("")} className="px-4 py-2 border rounded-lg dark:text-white flex gap-1"><Trash2 size={16}/> Clear</button>
      </div>
    </div>
  );
    }
