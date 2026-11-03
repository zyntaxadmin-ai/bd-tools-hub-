"use client";
import { useState, useMemo } from "react";
import ToolCard from "@/components/ToolCard";
import SiteJsonLd from "@/components/SiteJsonLd";
import SearchBar from "@/components/SearchBar";
import { tools, categories } from "@/data/tools";
import { CAT_I18N, DESC_EN } from "@/lib/i18nData";
import { useLang, useUI } from "@/lib/lang";
import { ShieldCheck, Zap, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

const ICONS = [Zap, ShieldCheck, Users, Sparkles];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { lang } = useLang();
  const ui = useUI();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((t) => {
      const en = (DESC_EN[t.slug.replace("/tool/", "")] || "").toLowerCase();
      const cat = CAT_I18N[categories.find((c) => c.name === t.category)!.slug];
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        en.includes(q) ||
        t.category.toLowerCase().includes(q) ||
        cat.bn.name.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <div>
      <SiteJsonLd />
      <section className="px-4 pt-14 pb-10 text-center bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950/20">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          {ui.heroA} <span className="text-indigo-600">{ui.heroB}</span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">{ui.heroSub}</p>
        <div className="mt-8 px-1"><SearchBar value={search} onChange={setSearch} placeholder={ui.searchPh} clearLabel={ui.clear} /></div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {!search.trim() && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {ui.features.map((f, i) => {
              const Icon = ICONS[i];
              return (
                <div key={f.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
                  <Icon className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{f.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{f.text}</p>
                </div>
              );
            })}
          </section>
        )}

        {search.trim() ? (
          <section>
            <h2 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">{ui.found(filtered.length)}</h2>
            {filtered.length === 0 ? (
              <p className="text-slate-500">{ui.none}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((t) => <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />)}
              </div>
            )}
          </section>
        ) : (
          categories.map((c) => (
            <section key={c.slug} id={c.slug} className="mb-12 scroll-mt-20">
              <h2 className="font-bold text-xl text-slate-900 dark:text-white">{CAT_I18N[c.slug][lang].name}</h2>
              <p className="text-sm text-slate-500 mb-4">{CAT_I18N[c.slug][lang].desc}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tools.filter((t) => t.category === c.name).map((t) => (
                  <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />
                ))}
              </div>
            </section>
          ))
        )}

        {!search.trim() && (
          <section className="mb-12" id="guides">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="font-bold text-xl text-slate-900 dark:text-white">{ui.guides}</h2>
                <p className="text-sm text-slate-500">{lang === "en" ? "How calculations work, with examples" : "হিসাবের নিয়ম উদাহরণসহ"}</p>
              </div>
              <Link href="/guides" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">{lang === "en" ? "All guides" : "সব গাইড"}</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GUIDES.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-indigo-400 transition">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">{lang === "en" ? g.title[1] : g.title[0]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
