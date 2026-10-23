"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { parseHex, rgbToHex, rgbToHsl } from "@/lib/colorUtil";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono";

export default function ColorPicker() {
  const tr = useTr();
  const [hex, setHex] = useState("#4F46E5");
  const [typed, setTyped] = useState("#4F46E5");
  const [copied, setCopied] = useState("");

  const rgb = parseHex(typed);
  const valid = rgb !== null;
  const cur = rgb ?? parseHex(hex)!;
  const hexOut = rgbToHex(cur);
  const hsl = rgbToHsl(cur);
  const rows = [
    { id: "hex", label: "HEX", value: hexOut },
    { id: "rgb", label: "RGB", value: `rgb(${cur.r}, ${cur.g}, ${cur.b})` },
    { id: "hsl", label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ];

  const onNative = (v: string) => { setHex(v); setTyped(v.toUpperCase()); };
  const onTyped = (v: string) => {
    setTyped(v);
    const p = parseHex(v);
    if (p) setHex(rgbToHex(p));
  };
  const copy = async (id: string, text: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(""), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <div className="h-32 rounded-xl border border-slate-200 dark:border-slate-700" style={{ backgroundColor: hexOut }} />
      <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("রং বাছুন", "Pick a colour")}</label>
          <input type="color" value={hex.toLowerCase()} onChange={(e) => onNative(e.target.value)} className="block w-20 h-12 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1" />
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("অথবা HEX কোড লিখুন", "Or type a HEX code")}</label>
          <input value={typed} onChange={(e) => onTyped(e.target.value)} placeholder="#4F46E5" className={input} />
        </div>
      </div>
      {!valid && <p className="text-sm text-red-500">{tr("সঠিক HEX কোড দিন (যেমন #4F46E5 বা #FFF)", "Enter a valid HEX code (for example #4F46E5 or #FFF)")}</p>}
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
            <div className="min-w-0">
              <p className="text-xs text-slate-500">{r.label}</p>
              <p className="font-mono text-sm dark:text-white break-all">{r.value}</p>
            </div>
            <button onClick={() => copy(r.id, r.value)} aria-label={tr(`${r.label} কপি`, `Copy ${r.label}`)} className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-white shrink-0">
              {copied === r.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
