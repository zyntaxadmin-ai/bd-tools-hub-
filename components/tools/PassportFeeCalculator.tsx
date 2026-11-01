"use client";
import { useState } from "react";
import { useTr } from "@/lib/lang";

// NOTE: Fees change. Check https://www.epassport.gov.bd and edit this table.
// Source: published fee lists that quote the official portal's schedule "updated 12 July 2026". All amounts in BDT, 15% VAT included.
const FEES_UPDATED = { bn: "১২ জুলাই ২০২৬", en: "12 July 2026" };
type Pages = 48 | 64;
type Validity = 5 | 10;
type Delivery = "regular" | "express" | "super";

const FEES: Record<Pages, Record<Validity, Record<Delivery, number>>> = {
  48: {
    5: { regular: 4025, express: 6325, super: 8625 },
    10: { regular: 5750, express: 8050, super: 10350 },
  },
  64: {
    5: { regular: 6325, express: 8625, super: 12075 },
    10: { regular: 8050, express: 10350, super: 13800 },
  },
};

const DELIVERY: { id: Delivery; bn: string; en: string }[] = [
  { id: "regular", bn: "সাধারণ (Regular)", en: "Regular" },
  { id: "express", bn: "জরুরি (Express)", en: "Express" },
  { id: "super", bn: "অতি জরুরি (Super Express)", en: "Super Express" },
];

const fmt = (n: number) => n.toLocaleString("en-IN");

export default function PassportFeeCalculator() {
  const tr = useTr();
  const [pages, setPages] = useState<Pages>(48);
  const [validity, setValidity] = useState<Validity>(5);
  const [delivery, setDelivery] = useState<Delivery>("regular");

  const fee = FEES[pages][validity][delivery];
  const tab = (active: boolean) => `flex-1 py-2.5 rounded-xl border text-sm ${active ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("পাসপোর্টের পৃষ্ঠা", "Booklet pages")}</p>
        <div className="flex gap-2">
          {([48, 64] as Pages[]).map((p) => <button key={p} onClick={() => setPages(p)} className={tab(pages === p)}>{tr(`${p} পৃষ্ঠা`, `${p} pages`)}</button>)}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("মেয়াদ", "Validity")}</p>
        <div className="flex gap-2">
          {([5, 10] as Validity[]).map((v) => <button key={v} onClick={() => setValidity(v)} className={tab(validity === v)}>{tr(`${v} বছর`, `${v} years`)}</button>)}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr("ডেলিভারির ধরন", "Delivery type")}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {DELIVERY.map((d) => <button key={d.id} onClick={() => setDelivery(d.id)} className={tab(delivery === d.id)}>{tr(d.bn, d.en)}</button>)}
        </div>
      </div>

      <div className="rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-5 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">{tr("ই-পাসপোর্ট ফি (১৫% ভ্যাটসহ)", "e-Passport fee (15% VAT included)")}</p>
        <p className="text-3xl font-bold text-indigo-600 mt-1">{fmt(fee)} {tr("টাকা", "taka")}</p>
      </div>

      <div>
        <p className="text-sm font-medium dark:text-slate-200 mb-2">{tr(`${pages} পৃষ্ঠা, ${validity} বছর মেয়াদের সব ফি`, `All fees for ${pages} pages, ${validity} years`)}</p>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {DELIVERY.map((d) => (
            <div key={d.id} className={`flex justify-between px-4 py-2.5 text-sm ${d.id === delivery ? "bg-indigo-50 dark:bg-indigo-950/20 font-semibold" : ""} dark:text-white`}>
              <span>{tr(d.bn, d.en)}</span><span>{fmt(FEES[pages][validity][d.id])} {tr("টাকা", "taka")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 space-y-1">
        <p>{tr(`এই ফি তালিকা ${FEES_UPDATED.bn} তারিখের সরকারি তালিকা অনুযায়ী প্রকাশিত তথ্য থেকে নেওয়া। ফি বদলাতে পারে, তাই আবেদনের আগে অফিসিয়াল ওয়েবসাইট দেখে নিন।`, `This fee list comes from published information quoting the official schedule updated ${FEES_UPDATED.en}. Fees can change, so check the official website before you apply.`)}</p>
        <p>{tr("শিশু, নবায়ন, জরুরি পাসপোর্ট, বিদেশের দূতাবাস এবং বিশেষ ছাড়ের (যেমন NOC) ক্ষেত্রে ফি আলাদা হতে পারে। এই টুল সেগুলো ধরে না।", "Fees can differ for children, renewals, emergency passports, overseas missions and special concessions (such as NOC). This tool does not cover them.")}</p>
        <p><a href="https://www.epassport.gov.bd" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">{tr("অফিসিয়াল ই-পাসপোর্ট পোর্টাল (epassport.gov.bd)", "Official e-Passport portal (epassport.gov.bd)")}</a></p>
      </div>
    </div>
  );
}
