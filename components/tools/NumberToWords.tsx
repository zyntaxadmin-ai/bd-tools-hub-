"use client";
import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// Bangla words for 0-99 (these are irregular, so a lookup table is the only safe way).
const BN = [
  "শূন্য","এক","দুই","তিন","চার","পাঁচ","ছয়","সাত","আট","নয়",
  "দশ","এগারো","বারো","তেরো","চৌদ্দ","পনেরো","ষোলো","সতেরো","আঠারো","উনিশ",
  "বিশ","একুশ","বাইশ","তেইশ","চব্বিশ","পঁচিশ","ছাব্বিশ","সাতাশ","আটাশ","ঊনত্রিশ",
  "ত্রিশ","একত্রিশ","বত্রিশ","তেত্রিশ","চৌত্রিশ","পঁয়ত্রিশ","ছত্রিশ","সাঁইত্রিশ","আটত্রিশ","ঊনচল্লিশ",
  "চল্লিশ","একচল্লিশ","বিয়াল্লিশ","তেতাল্লিশ","চুয়াল্লিশ","পঁয়তাল্লিশ","ছেচল্লিশ","সাতচল্লিশ","আটচল্লিশ","ঊনপঞ্চাশ",
  "পঞ্চাশ","একান্ন","বাহান্ন","তিপ্পান্ন","চুয়ান্ন","পঞ্চান্ন","ছাপ্পান্ন","সাতান্ন","আটান্ন","ঊনষাট",
  "ষাট","একষট্টি","বাষট্টি","তেষট্টি","চৌষট্টি","পঁয়ষট্টি","ছেষট্টি","সাতষট্টি","আটষট্টি","ঊনসত্তর",
  "সত্তর","একাত্তর","বাহাত্তর","তিয়াত্তর","চুয়াত্তর","পঁচাত্তর","ছিয়াত্তর","সাতাত্তর","আটাত্তর","ঊনআশি",
  "আশি","একাশি","বিরাশি","তিরাশি","চুরাশি","পঁচাশি","ছিয়াশি","সাতাশি","আটাশি","ঊননব্বই",
  "নব্বই","একানব্বই","বিরানব্বই","তিরানব্বই","চুরানব্বই","পঁচানব্বই","ছিয়ানব্বই","সাতানব্বই","আটানব্বই","নিরানব্বই",
];

// n is a whole number below 100 trillion (14 digits). Uses the lakh/crore system used in Bangladesh.
export function bnWords(n: number): string {
  if (n === 0) return BN[0];
  const parts: string[] = [];
  const koti = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const hajar = Math.floor(n / 1e3); n %= 1e3;
  const sho = Math.floor(n / 100); const rest = n % 100;
  if (koti) parts.push(bnWords(koti) + " কোটি");
  if (lakh) parts.push(BN[lakh] + " লাখ");
  if (hajar) parts.push(BN[hajar] + " হাজার");
  if (sho) parts.push(BN[sho] + "শ");
  if (rest) parts.push(BN[rest]);
  return parts.join(" ");
}

const ONES = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const TENS = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
const below100 = (n: number) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : ""));

export function enWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 1e7); n %= 1e7;
  const lakh = Math.floor(n / 1e5); n %= 1e5;
  const thousand = Math.floor(n / 1e3); n %= 1e3;
  const hundred = Math.floor(n / 100); const rest = n % 100;
  if (crore) parts.push(enWords(crore) + " Crore");
  if (lakh) parts.push(below100(lakh) + " Lakh");
  if (thousand) parts.push(below100(thousand) + " Thousand");
  if (hundred) parts.push(ONES[hundred] + " Hundred");
  if (rest) parts.push(below100(rest));
  return parts.join(" ");
}

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toAscii = (s: string) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d))).replace(/[,\s]/g, "");

export function convert(raw: string): { taka: number; paisa: number } | null {
  const s = toAscii(raw);
  if (!/^\d{1,14}(\.\d{1,2})?$/.test(s)) return null;
  const [t, p = ""] = s.split(".");
  return { taka: Number(t), paisa: Number((p + "00").slice(0, 2)) };
}

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function NumberToWords() {
  const tr = useTr();
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState("");

  const parsed = value.trim() === "" ? null : convert(value);
  const invalid = value.trim() !== "" && !parsed;

  const bn = parsed ? `${bnWords(parsed.taka)} টাকা${parsed.paisa ? " " + bnWords(parsed.paisa) + " পয়সা" : ""} মাত্র` : "";
  const en = parsed ? `${enWords(parsed.taka)} Taka${parsed.paisa ? " " + enWords(parsed.paisa) + " Paisa" : ""} Only` : "";

  const copy = async (text: string, key: string) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(""), 1500); } catch { /* clipboard not available */ }
  };

  const Box = ({ label, text, k }: { label: string; text: string; k: string }) => (
    <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <button onClick={() => copy(text, k)} className="text-xs flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
          {copied === k ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}{copied === k ? tr("কপি হয়েছে", "Copied") : tr("কপি", "Copy")}
        </button>
      </div>
      <p className="text-lg font-semibold dark:text-white break-words">{text}</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("টাকার পরিমাণ (সংখ্যায়)", "Amount in taka (numbers)")}</label>
        <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 12,34,567.50" className={input} />
        <p className="text-xs text-slate-500 mt-1">{tr("কমা, বাংলা অঙ্ক ও পয়সা (দশমিকের পর ২ ঘর) চলবে। সর্বোচ্চ ১৪ অঙ্ক।", "Commas, Bangla digits and paisa (2 decimal places) are accepted. Up to 14 digits.")}</p>
      </div>
      {invalid && <p className="text-sm text-red-500">{tr("সঠিক সংখ্যা লিখুন (শুধু অঙ্ক, দশমিকের পর সর্বোচ্চ ২ ঘর)", "Enter a valid number (digits only, at most 2 decimal places)")}</p>}
      {parsed && (
        <div className="space-y-3">
          <Box label={tr("বাংলায়", "In Bangla")} text={bn} k="bn" />
          <Box label={tr("ইংরেজিতে (লাখ-কোটি পদ্ধতি)", "In English (lakh-crore system)")} text={en} k="en" />
        </div>
      )}
      {value && <button onClick={() => setValue("")} className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white flex items-center gap-2"><RotateCcw className="w-4 h-4" />{tr("মুছুন", "Clear")}</button>}
      <p className="text-xs text-slate-500">{tr("চেক বা গুরুত্বপূর্ণ কাগজে লেখার আগে বানান একবার মিলিয়ে নিন।", "Check the spelling once before you write it on a cheque or an important document.")}</p>
    </div>
  );
}
