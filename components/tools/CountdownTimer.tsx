"use client";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { splitDuration } from "@/lib/tz";

const KEY = "bdtoolshub-countdown-v1";
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function CountdownTimer() {
  const [name, setName] = useState("");
  const [when, setWhen] = useState("");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const o = JSON.parse(raw);
        if (typeof o?.name === "string") setName(o.name.slice(0, 80));
        if (typeof o?.when === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(o.when)) setWhen(o.when);
      }
    } catch { /* ignore */ }
    setNow(Date.now());
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (now === null) return;
    try { localStorage.setItem(KEY, JSON.stringify({ name, when })); } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, when]);

  const target = when ? new Date(when).getTime() : NaN;
  const valid = !isNaN(target) && now !== null;
  const diff = valid ? target - (now as number) : 0;
  const past = valid && diff <= 0;
  const t = splitDuration(diff);
  const boxes = [
    { v: t.d, l: "দিন" }, { v: t.h, l: "ঘণ্টা" }, { v: t.m, l: "মিনিট" }, { v: t.s, l: "সেকেন্ড" },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">ইভেন্টের নাম</label>
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="যেমন: পরীক্ষা, বিয়ে, ট্রিপ" className={input} />
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">তারিখ ও সময়</label>
        <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className={input} />
      </div>
      <button onClick={() => { setName(""); setWhen(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>

      {valid && (
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 text-center">
          {name && <p className="font-semibold dark:text-white mb-3 break-words">{name}</p>}
          <div className="grid grid-cols-4 gap-2">
            {boxes.map((b) => (
              <div key={b.l} className="bg-white dark:bg-slate-800 rounded-xl py-3">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">{b.v}</p>
                <p className="text-[11px] text-slate-500">{b.l}</p>
              </div>
            ))}
          </div>
          <p className={`text-sm mt-3 ${past ? "text-red-500" : "text-slate-600 dark:text-slate-400"}`}>{past ? "এই সময় পেরিয়ে গেছে (উপরে কত আগে তা দেখানো হচ্ছে)" : "বাকি আছে"}</p>
        </div>
      )}
      <p className="text-xs text-slate-500">ঈদ, রোজা বা ছুটির তারিখ প্রতি বছর বদলায়, তাই তারিখ নিজে সেট করুন। আপনার ইভেন্ট শুধু এই ব্রাউজারে সেভ থাকে।</p>
    </div>
  );
}
