"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { buildMetaTags, isHttpUrl, MetaFields } from "@/lib/metaTags";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const EMPTY: MetaFields = { title: "", description: "", keywords: "", author: "", canonical: "", ogImage: "", siteName: "", robotsIndex: true, robotsFollow: true };

function Count({ n, ideal }: { n: number; ideal: number }) {
  const cls = n === 0 ? "text-slate-500" : n > ideal ? "text-red-500" : "text-emerald-600";
  return <span className={`text-xs ${cls}`}>{n}/{ideal}</span>;
}

export default function MetaTagGenerator() {
  const [f, setF] = useState<MetaFields>(EMPTY);
  const [copied, setCopied] = useState(false);
  const set = <K extends keyof MetaFields>(k: K, v: MetaFields[K]) => setF({ ...f, [k]: v });
  const out = buildMetaTags(f);
  const badCanon = f.canonical.trim() !== "" && !isHttpUrl(f.canonical);
  const badImg = f.ogImage.trim() !== "" && !isHttpUrl(f.ogImage);

  const copy = async () => {
    try { await navigator.clipboard.writeText(out); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between"><label className="text-sm font-medium dark:text-slate-200">পেজ টাইটেল</label><Count n={f.title.length} ideal={60} /></div>
        <input value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="যেমন: Age Calculator - বয়স হিসাব করুন" className={input} />
      </div>
      <div>
        <div className="flex justify-between"><label className="text-sm font-medium dark:text-slate-200">Meta Description</label><Count n={f.description.length} ideal={160} /></div>
        <textarea value={f.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="পেজ সম্পর্কে ১-২ লাইনের বিবরণ" className={`${input} resize-none`} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">Keywords (কমা দিয়ে, ঐচ্ছিক)</label>
        <input value={f.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="age calculator, বয়স" className={input} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="text-sm font-medium dark:text-slate-200">লেখক (Author)</label><input value={f.author} onChange={(e) => set("author", e.target.value)} className={input} /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">সাইটের নাম</label><input value={f.siteName} onChange={(e) => set("siteName", e.target.value)} className={input} /></div>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">Canonical / পেজের URL</label>
        <input value={f.canonical} onChange={(e) => set("canonical", e.target.value)} placeholder="https://example.com/page" className={input} />
        {badCanon && <p className="text-xs text-red-500 mt-1">https:// দিয়ে শুরু হওয়া পূর্ণ URL দিন</p>}
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">Open Graph ছবির URL (ঐচ্ছিক)</label>
        <input value={f.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://example.com/image.jpg" className={input} />
        {badImg && <p className="text-xs text-red-500 mt-1">https:// দিয়ে শুরু হওয়া পূর্ণ URL দিন</p>}
      </div>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm dark:text-slate-200"><input type="checkbox" checked={f.robotsIndex} onChange={() => set("robotsIndex", !f.robotsIndex)} className="w-4 h-4 accent-indigo-600" /> Google এ index করুক</label>
        <label className="flex items-center gap-2 text-sm dark:text-slate-200"><input type="checkbox" checked={f.robotsFollow} onChange={() => set("robotsFollow", !f.robotsFollow)} className="w-4 h-4 accent-indigo-600" /> লিংক follow করুক</label>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">আপনার HTML কোড</p>
        <pre className="bg-slate-900 text-slate-100 text-xs rounded-xl p-4 overflow-x-auto whitespace-pre">{out}</pre>
      </div>
      <div className="flex gap-3">
        <button onClick={copy} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
          {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
        </button>
        <button onClick={() => setF(EMPTY)} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      <p className="text-xs text-slate-500">কোডটি আপনার পেজের &lt;head&gt; এর ভেতরে বসান (Blogger এ Theme → Edit HTML)। প্রতিটি পেজের টাইটেল ও ডেসক্রিপশন আলাদা রাখুন। টাইটেল ও ডেসক্রিপশনের দৈর্ঘ্য আনুমানিক সীমা, Google পিক্সেল দেখে ছাঁটে।</p>
    </div>
  );
}
