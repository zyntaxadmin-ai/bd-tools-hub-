"use client";
import { useLang } from "@/lib/lang";
import { UI } from "@/lib/i18nData";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  const on = "bg-indigo-600 text-white";
  const off = "text-slate-500 dark:text-slate-400";
  return (
    <button
      onClick={() => setLang(lang === "bn" ? "en" : "bn")}
      aria-label={UI[lang].langToggle}
      className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5 text-xs font-semibold"
    >
      <span className={`px-2.5 py-1.5 rounded-full ${lang === "bn" ? on : off}`}>বাং</span>
      <span className={`px-2.5 py-1.5 rounded-full ${lang === "en" ? on : off}`}>EN</span>
    </button>
  );
}
