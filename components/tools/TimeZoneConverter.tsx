"use client";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { wallParts, zonedToInstant, offsetMinutes, fmtOffset, formatInZone } from "@/lib/tz";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const ZONES: { id: string; label: string }[] = [
  { id: "Asia/Dhaka", label: "বাংলাদেশ (ঢাকা)" },
  { id: "Europe/London", label: "যুক্তরাজ্য (লন্ডন)" },
  { id: "America/New_York", label: "যুক্তরাষ্ট্র - পূর্ব (নিউ ইয়র্ক)" },
  { id: "America/Los_Angeles", label: "যুক্তরাষ্ট্র - পশ্চিম (লস অ্যাঞ্জেলেস)" },
  { id: "Asia/Riyadh", label: "সৌদি আরব (রিয়াদ)" },
  { id: "Asia/Dubai", label: "সংযুক্ত আরব আমিরাত (দুবাই)" },
  { id: "Asia/Kuala_Lumpur", label: "মালয়েশিয়া (কুয়ালালামপুর)" },
  { id: "Asia/Singapore", label: "সিঙ্গাপুর" },
  { id: "Asia/Kolkata", label: "ভারত (কলকাতা)" },
  { id: "Asia/Tokyo", label: "জাপান (টোকিও)" },
  { id: "Australia/Sydney", label: "অস্ট্রেলিয়া (সিডনি)" },
];
const p2 = (n: number) => String(n).padStart(2, "0");

export default function TimeZoneConverter() {
  const [from, setFrom] = useState("Asia/Dhaka");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const setNow = (zone: string) => {
    const w = wallParts(Date.now(), zone);
    setDate(`${w.y}-${p2(w.mo)}-${p2(w.d)}`);
    setTime(`${p2(w.h)}:${p2(w.mi)}`);
  };
  useEffect(() => { setNow("Asia/Dhaka"); }, []);

  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const tm = /^(\d{2}):(\d{2})$/.exec(time);
  let instant: number | null = null;
  if (dm && tm) {
    try { instant = zonedToInstant(+dm[1], +dm[2], +dm[3], +tm[1], +tm[2], from); } catch { instant = null; }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">কোন দেশের সময় থেকে বদলাবেন</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={input}>
          {ZONES.map((z) => <option key={z.id} value={z.id}>{z.label}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="text-sm font-medium dark:text-slate-200">তারিখ</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">সময়</label><input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={input} /></div>
      </div>
      <button onClick={() => setNow(from)} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 dark:text-white"><Clock className="w-4 h-4" /> এখনকার সময় বসান</button>

      {instant !== null && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {ZONES.map((z) => (
            <div key={z.id} className={`px-4 py-3 ${z.id === from ? "bg-indigo-50 dark:bg-indigo-950/30" : "bg-white dark:bg-slate-800"}`}>
              <div className="flex justify-between gap-2 text-xs text-slate-500"><span>{z.label}</span><span>{fmtOffset(offsetMinutes(instant as number, z.id))}</span></div>
              <p className="font-semibold dark:text-white">{formatInZone(instant as number, z.id)}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-500">ডে-লাইট সেভিং (গ্রীষ্মকালীন সময়) ব্রাউজার নিজেই হিসাব করে। বাংলাদেশে এখন DST নেই (UTC+6)। DST পরিবর্তনের দিনের ঠিক ভোরের সময়গুলোতে ফলাফল এক ঘণ্টা আলাদা হতে পারে।</p>
    </div>
  );
}
