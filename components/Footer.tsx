"use client";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { categories } from "@/data/tools";
import { CAT_I18N } from "@/lib/i18nData";
import { useLang, useUI } from "@/lib/lang";
import AdSlot from "./AdSlot";

export default function Footer() {
  const { lang } = useLang();
  const ui = useUI();
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center"><Wrench className="w-4 h-4 text-white" /></div>
              <span className="font-bold text-slate-900 dark:text-white">BD Tools Hub</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{ui.footerTag}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">{ui.categories}</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {categories.map((c) => (
                <li key={c.slug}><Link href={`/category/${c.slug}`} className="hover:text-indigo-600">{CAT_I18N[c.slug][lang].name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">{ui.popular}</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/tool/bkash-calculator" className="hover:text-indigo-600">bKash Calculator</Link></li>
              <li><Link href="/tool/age-calculator" className="hover:text-indigo-600">Age Calculator</Link></li>
              <li><Link href="/tool/gpa-calculator-bd" className="hover:text-indigo-600">GPA Calculator</Link></li>
              <li><Link href="/tool/word-counter" className="hover:text-indigo-600">Word Counter</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">{ui.legal}</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy-policy" className="hover:text-indigo-600">{ui.privacy}</Link></li>
              <li><Link href="/about" className="hover:text-indigo-600">{ui.about}</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600">{ui.contact}</Link></li>
              <li><Link href="/disclaimer" className="hover:text-indigo-600">{ui.disclaimer}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8"><AdSlot label="Advertisement" /></div>
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} BD Tools Hub. {ui.rights}
        </div>
      </div>
    </footer>
  );
}
