"use client";
import { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useTr } from "@/lib/lang";

// Daily reference rates from the free currency-api dataset (served by jsDelivr, with a Cloudflare Pages mirror).
// Rates are per 1 US dollar. Nothing the user types is sent anywhere.
const URLS = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
  "https://latest.currency-api.pages.dev/v1/currencies/usd.json",
];

const CURRENCIES: { code: string; bn: string; en: string }[] = [
  { code: "bdt", bn: "বাংলাদেশি টাকা", en: "Bangladeshi taka" },
  { code: "usd", bn: "মার্কিন ডলার", en: "US dollar" },
  { code: "sar", bn: "সৌদি রিয়াল", en: "Saudi riyal" },
  { code: "aed", bn: "UAE দিরহাম", en: "UAE dirham" },
  { code: "inr", bn: "ভারতীয় রুপি", en: "Indian rupee" },
  { code: "eur", bn: "ইউরো", en: "Euro" },
  { code: "gbp", bn: "ব্রিটিশ পাউন্ড", en: "British pound" },
  { code: "myr", bn: "মালয়েশিয়ান রিংগিত", en: "Malaysian ringgit" },
  { code: "sgd", bn: "সিঙ্গাপুর ডলার", en: "Singapore dollar" },
  { code: "cad", bn: "কানাডিয়ান ডলার", en: "Canadian dollar" },
  { code: "aud", bn: "অস্ট্রেলিয়ান ডলার", en: "Australian dollar" },
  { code: "jpy", bn: "জাপানি ইয়েন", en: "Japanese yen" },
];

type Data = { date: string; usd: Record<string, number> };

async function loadRates(): Promise<Data> {
  let last: unknown;
  for (const u of URLS) {
    try {
      const res = await fetch(u, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const j = await res.json();
      if (j && j.usd && typeof j.usd.bdt === "number") return { date: String(j.date || ""), usd: j.usd };
      throw new Error("bad data");
    } catch (e) { last = e; }
  }
  throw last;
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  const abs = Math.abs(n);
  const digits = abs >= 100 ? 2 : abs >= 1 ? 3 : 6;
  return n.toLocaleString("en-US", { maximumFractionDigits: digits });
}

export default function BdtCurrencyConverter() {
  const tr = useTr();
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("bdt");

  const load = () => {
    setState("loading");
    loadRates().then((d) => { setData(d); setState("ready"); }).catch(() => setState("error"));
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const list = data ? CURRENCIES.filter((c) => typeof data.usd[c.code] === "number") : CURRENCIES;
  const amt = parseFloat(amount);
  const rate = data ? data.usd[to] / data.usd[from] : NaN; // 1 unit of "from" in "to"
  const valid = !isNaN(amt) && amt >= 0 && data !== null && isFinite(rate);
  const result = valid ? amt * rate : NaN;
  const label = (code: string) => { const c = CURRENCIES.find((x) => x.code === code); return c ? `${code.toUpperCase()} - ${tr(c.bn, c.en)}` : code.toUpperCase(); };

  return (
    <div className="space-y-4">
      {state === "loading" && <p className="text-sm text-slate-500">{tr("আজকের রেট লোড হচ্ছে...", "Loading today's rates...")}</p>}
      {state === "error" && (
        <div className="space-y-2">
          <p className="text-sm text-red-500">{tr("রেট লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।", "Could not load the rates. Check your internet connection and try again.")}</p>
          <button onClick={load} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white">{tr("আবার চেষ্টা করুন", "Try again")}</button>
        </div>
      )}

      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("পরিমাণ", "Amount")}</label>
        <input type="number" inputMode="decimal" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} className={input} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("থেকে", "From")}</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className={input}>{list.map((c) => <option key={c.code} value={c.code}>{label(c.code)}</option>)}</select>
        </div>
        <button onClick={() => { setFrom(to); setTo(from); }} aria-label={tr("অদলবদল", "Swap")} className="p-3 mb-0.5 justify-self-center rotate-90 sm:rotate-0 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white"><ArrowLeftRight className="w-4 h-4" /></button>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("এতে", "To")}</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className={input}>{list.map((c) => <option key={c.code} value={c.code}>{label(c.code)}</option>)}</select>
        </div>
      </div>

      {state === "ready" && amount !== "" && !valid && <p className="text-sm text-red-500">{tr("সঠিক পরিমাণ লিখুন", "Enter a valid amount")}</p>}
      {valid && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">{fmt(amt)} {from.toUpperCase()} =</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1 break-all">{fmt(result)} {to.toUpperCase()}</p>
          <p className="text-xs text-slate-500 mt-3">1 {from.toUpperCase()} = {fmt(rate)} {to.toUpperCase()}</p>
        </div>
      )}

      <div className="text-xs text-slate-500 space-y-1">
        {data?.date && <p>{tr(`রেটের তারিখ: ${data.date}`, `Rate date: ${data.date}`)}</p>}
        <p>{tr("এটি দিনের শেষের মধ্যবর্তী (রেফারেন্স) রেট। ব্যাংক, এক্সচেঞ্জ হাউস বা মানি চেঞ্জারের কেনা-বেচার রেট আলাদা হয়, তাই লেনদেনের আগে তাদের রেট দেখে নিন।", "This is a daily mid-market (reference) rate. Banks, exchange houses and money changers use their own buying and selling rates, so check theirs before you transact.")}</p>
      </div>
    </div>
  );
}
