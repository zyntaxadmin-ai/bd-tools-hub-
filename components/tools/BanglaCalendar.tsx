"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, useTr } from "@/lib/lang";
import {
  MONTHS_BN, MONTHS_EN, GREG_MONTHS_BN, GREG_MONTHS_EN, WEEKDAYS_BN, WEEKDAYS_EN, WEEKDAYS_BN_SHORT, WEEKDAYS_EN_SHORT,
  toBangla, fromBangla, monthGrid, weekdayOf, seasonOf, toBnDigits, daysInGregMonth, monthLengths,
} from "@/lib/banglaDate";

type YM = { y: number; m: number };
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const p2 = (n: number) => String(n).padStart(2, "0");

export default function BanglaCalendar() {
  const tr = useTr();
  const { lang } = useLang();
  const [today, setToday] = useState<{ y: number; m: number; d: number } | null>(null);
  const [view, setView] = useState<YM | null>(null);
  const [mode, setMode] = useState<"g2b" | "b2g">("g2b");
  const [gDate, setGDate] = useState("");
  const [bYear, setBYear] = useState("");
  const [bMonth, setBMonth] = useState(0);
  const [bDay, setBDay] = useState("");

  useEffect(() => {
    const n = new Date();
    const t = { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
    setToday(t);
    setView({ y: t.y, m: t.m - 1 });
    setGDate(`${t.y}-${p2(t.m)}-${p2(t.d)}`);
    const b = toBangla(t.y, t.m, t.d);
    setBYear(String(b.year)); setBMonth(b.month); setBDay(String(b.day));
  }, []);

  const N = (n: number | string) => (lang === "bn" ? toBnDigits(n) : String(n));
  const bnMonth = (i: number) => tr(MONTHS_BN[i], MONTHS_EN[i]);
  const gMonth = (i: number) => tr(GREG_MONTHS_BN[i], GREG_MONTHS_EN[i]);
  const wd = (i: number) => tr(WEEKDAYS_BN[i], WEEKDAYS_EN[i]);
  const fmtB = (b: { year: number; month: number; day: number }) => `${N(b.day)} ${bnMonth(b.month)} ${N(b.year)}`;
  const fmtG = (y: number, m: number, d: number) => `${wd(weekdayOf(y, m, d))}, ${N(d)} ${gMonth(m - 1)} ${N(y)}`;

  const tb = today ? toBangla(today.y, today.m, today.d) : null;

  // header range of Bangla months covered by the viewed Gregorian month
  let range = "";
  if (view) {
    const a = toBangla(view.y, view.m + 1, 1), z = toBangla(view.y, view.m + 1, daysInGregMonth(view.y, view.m));
    range = a.month === z.month ? `${bnMonth(a.month)} ${N(a.year)}` : a.year === z.year ? `${bnMonth(a.month)} - ${bnMonth(z.month)} ${N(a.year)}` : `${bnMonth(a.month)} ${N(a.year)} - ${bnMonth(z.month)} ${N(z.year)}`;
  }
  const move = (delta: number) => {
    if (!view) return;
    const t = view.y * 12 + view.m + delta;
    const y = Math.floor(t / 12);
    if (y < 1900 || y > 2100) return;
    setView({ y, m: t - y * 12 });
  };

  // converters
  const gm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(gDate);
  let g2b = "", g2bErr = "";
  if (gDate !== "") {
    if (!gm) g2bErr = "bad";
    else {
      const y = +gm[1], m = +gm[2], d = +gm[3];
      if (y < 1900 || y > 2100) g2bErr = "range";
      else g2b = `${fmtB(toBangla(y, m, d))}, ${wd(weekdayOf(y, m, d))}`;
    }
  }
  let b2g = "", b2gErr = "";
  const by = parseInt(bYear, 10), bd = parseInt(bDay, 10);
  if (bYear !== "" && bDay !== "") {
    if (isNaN(by) || isNaN(bd) || by < 1307 || by > 1507) b2gErr = "range";
    else {
      const r = fromBangla(by, bMonth, bd);
      if (!r) b2gErr = `days:${monthLengths(by + 593)[bMonth]}`;
      else b2g = fmtG(r.y, r.m, r.d);
    }
  }
  const tab = (on: boolean) => `flex-1 py-2 rounded-xl border text-sm ${on ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center min-h-[130px]">
        {today && tb ? (
          <>
            <p className="text-sm opacity-80">{tr("আজকের তারিখ", "Today")}</p>
            <p className="text-3xl font-bold mt-1">{fmtB(tb)}</p>
            <p className="mt-1">{wd(weekdayOf(today.y, today.m, today.d))}</p>
            <p className="text-sm opacity-90 mt-2">{fmtG(today.y, today.m, today.d)}</p>
            <p className="text-xs opacity-80 mt-1">{tr("ঋতু", "Season")}: {tr(seasonOf(tb.month).bn, seasonOf(tb.month).en)}</p>
          </>
        ) : (
          <p className="text-sm opacity-80 pt-8">{tr("লোড হচ্ছে...", "Loading...")}</p>
        )}
      </div>

      {view && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => move(-1)} aria-label={tr("আগের মাস", "Previous month")} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white"><ChevronLeft className="w-4 h-4" /></button>
            <div className="text-center">
              <p className="font-semibold dark:text-white">{gMonth(view.m)} {N(view.y)}</p>
              <p className="text-xs text-slate-500">{range}</p>
            </div>
            <button onClick={() => move(1)} aria-label={tr("পরের মাস", "Next month")} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-slate-500 mb-1">
            {WEEKDAYS_BN_SHORT.map((s, i) => <div key={i}>{tr(s, WEEKDAYS_EN_SHORT[i])}</div>)}
          </div>
          <div className="space-y-1">
            {monthGrid(view.y, view.m).map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1">
                {week.map((c, ci) => {
                  if (!c) return <div key={ci} />;
                  const isToday = !!today && today.y === view.y && today.m === view.m + 1 && today.d === c.g;
                  return (
                    <div key={ci} className={`rounded-lg py-1.5 text-center ${isToday ? "bg-indigo-600 text-white" : ci === 5 ? "bg-red-50 dark:bg-red-950/20 dark:text-white" : "bg-slate-50 dark:bg-slate-800 dark:text-white"}`}>
                      <p className="text-sm font-semibold leading-tight">{N(c.g)}</p>
                      <p className={`text-[10px] leading-tight ${isToday ? "text-indigo-100" : "text-indigo-600 dark:text-indigo-400"}`}>{c.bn.day === 1 ? bnMonth(c.bn.month) : N(c.bn.day)}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">{tr("বড় সংখ্যা ইংরেজি তারিখ, নিচের ছোট সংখ্যা বাংলা তারিখ (মাসের ১ তারিখে মাসের নাম)। লাল ঘর শুক্রবার।", "Big number = Gregorian date, small number below = Bangla date (the month name shows on the 1st). Red cells are Fridays.")}</p>
        </div>
      )}

      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <h3 className="font-semibold text-sm dark:text-white">{tr("তারিখ রূপান্তর", "Date converter")}</h3>
        <div className="flex gap-2">
          <button onClick={() => setMode("g2b")} className={tab(mode === "g2b")}>{tr("ইংরেজি → বাংলা", "Gregorian → Bangla")}</button>
          <button onClick={() => setMode("b2g")} className={tab(mode === "b2g")}>{tr("বাংলা → ইংরেজি", "Bangla → Gregorian")}</button>
        </div>
        {mode === "g2b" ? (
          <div>
            <input type="date" value={gDate} onChange={(e) => setGDate(e.target.value)} min="1900-01-01" max="2100-12-31" className={input} />
            {g2bErr && <p className="text-sm text-red-500 mt-2">{g2bErr === "range" ? tr("১৯০০ থেকে ২১০০ সালের মধ্যে তারিখ দিন", "Enter a date between 1900 and 2100") : tr("সঠিক তারিখ দিন", "Enter a valid date")}</p>}
            {g2b && <p className="mt-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 font-semibold text-indigo-700 dark:text-indigo-300">{g2b}</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <input type="number" inputMode="numeric" value={bDay} onChange={(e) => setBDay(e.target.value)} placeholder={tr("তারিখ", "Day")} className={input} />
              <select value={bMonth} onChange={(e) => setBMonth(parseInt(e.target.value, 10))} className={input}>
                {MONTHS_BN.map((_, i) => <option key={i} value={i}>{bnMonth(i)}</option>)}
              </select>
              <input type="number" inputMode="numeric" value={bYear} onChange={(e) => setBYear(e.target.value)} placeholder={tr("সাল", "Year")} className={input} />
            </div>
            {b2gErr && <p className="text-sm text-red-500">{b2gErr === "range" ? tr("বঙ্গাব্দ ১৩০৭ থেকে ১৫০৭ এর মধ্যে দিন", "Enter a Bangla year between 1307 and 1507") : tr(`${bnMonth(bMonth)} মাসে এই বছর সর্বোচ্চ ${b2gErr.slice(5)} দিন`, `${bnMonth(bMonth)} has at most ${b2gErr.slice(5)} days in this year`)}</p>}
            {b2g && <p className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 font-semibold text-indigo-700 dark:text-indigo-300">{b2g}</p>}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500">{tr("এটি বাংলাদেশের সংশোধিত বাংলা পঞ্জিকার নিয়ম অনুযায়ী হিসাব করা (পহেলা বৈশাখ ১৪ এপ্রিল; বৈশাখ-আশ্বিন ৩১ দিন, কার্তিক-মাঘ ও চৈত্র ৩০ দিন, ফাল্গুন ২৯ দিন, অধিবর্ষে ৩০ দিন)। সরকারি ছুটি ও ধর্মীয় তারিখের জন্য অফিসিয়াল ক্যালেন্ডার দেখুন।", "Dates follow the revised Bangla calendar of Bangladesh (Pohela Boishakh on 14 April; Boishakh to Ashwin have 31 days, Kartik to Magh and Chaitra 30, Falgun 29, or 30 in a leap year). For public holidays and religious dates, check the official calendar.")}</p>
    </div>
  );
}
