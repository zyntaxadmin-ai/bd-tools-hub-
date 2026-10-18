"use client";
import { useEffect, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { generateLorem, LoremKind } from "@/lib/lorem";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const KINDS: { id: LoremKind; label: string; max: number }[] = [
  { id: "paragraphs", label: "প্যারাগ্রাফ", max: 50 },
  { id: "sentences", label: "বাক্য", max: 200 },
  { id: "words", label: "শব্দ", max: 2000 },
];

export default function LoremIpsumGenerator() {
  const [kind, setKind] = useState<LoremKind>("paragraphs");
  const [count, setCount] = useState("3");
  const [start, setStart] = useState(true);
  const [out, setOut] = useState("");
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const max = KINDS.find((k) => k.id === kind)!.max;
  const n = parseInt(count, 10);
  const error = count === "" || isNaN(n) || n < 1 || n > max ? `১ থেকে ${max} এর মধ্যে সংখ্যা দিন` : "";

  // র‍্যান্ডম লেখা শুধু ক্লায়েন্টে তৈরি হয় (hydration mismatch এড়াতে)
  useEffect(() => {
    if (error) { setOut(""); return; }
    setOut(generateLorem(kind, n, start));
    setCopied(false);
  }, [kind, n, start, seed, error]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {KINDS.map((k) => (
          <button key={k.id} onClick={() => setKind(k.id)} className={`flex-1 py-2 rounded-xl border text-sm ${kind === k.id ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{k.label}</button>
        ))}
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">কতগুলো?</label>
        <input type="number" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} className={input} />
      </div>
      <label className="flex items-center gap-3 text-sm dark:text-slate-200"><input type="checkbox" checked={start} onChange={() => setStart(!start)} className="w-4 h-4 accent-indigo-600" /> &quot;Lorem ipsum dolor sit amet&quot; দিয়ে শুরু করুন</label>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-3">
        <button onClick={copy} disabled={!out} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
        <button onClick={() => setSeed(seed + 1)} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 dark:text-white"><RefreshCw className="w-4 h-4" /> নতুন</button>
      </div>
      {out && <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm leading-relaxed dark:text-slate-200 whitespace-pre-line max-h-96 overflow-y-auto">{out}</div>}
    </div>
  );
}
