"use client";
import { useState, useMemo } from "react";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import SiteJsonLd from "@/components/SiteJsonLd";
import { tools, categories } from "@/data/tools";
import { ShieldCheck, Zap, Users, Sparkles } from "lucide-react";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [search]);

  const features = [
    { icon: Zap, title: "Lightning Fast", text: "ব্রাউজারেই চলে, কোনো অপেক্ষা নেই" },
    { icon: ShieldCheck, title: "Private", text: "আপনার ডাটা সার্ভারে যায় না" },
    { icon: Users, title: "No Signup", text: "লগইন ছাড়াই ফ্রি ব্যবহার" },
    { icon: Sparkles, title: "100% Free", text: "সব টুল সম্পূর্ণ ফ্রি" },
  ];

  return (
    <div>
      <section className="px-4 pt-14 pb-10 text-center bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950/20">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          Free Online Tools <span className="text-indigo-600">for Bangladesh</span>
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Age, GPA, bKash charge, Word Counter — সব হিসাব এক জায়গায়। Fast, Free & No Signup.</p>
        <div className="mt-8 px-1"><SearchBar value={search} onChange={setSearch} /></div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {!search.trim() && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {features.map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-center">
                <f.icon className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{f.title}</p>
                <p className="text-xs text-slate-500 mt-1">{f.text}</p>
              </div>
            ))}
          </section>
        )}

        {search.trim() ? (
          <section>
            <h2 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">{filtered.length} টি টুল পাওয়া গেছে</h2>
            {filtered.length === 0 ? (
              <p className="text-slate-500">কিছু পাওয়া যায়নি। অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন।</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((t) => <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />)}
              </div>
            )}
          </section>
        ) : (
          categories.map((c) => (
            <section key={c.slug} id={c.slug} className="mb-12 scroll-mt-20">
              <h2 className="font-bold text-xl text-slate-900 dark:text-white">{c.name}</h2>
              <p className="text-sm text-slate-500 mb-4">{c.desc}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tools.filter((t) => t.category === c.name).map((t) => (
                  <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />
                ))}
              </div>
               <SiteJsonLd />-
            </section>
          ))
        )}
      </div>
    </div>
  );
}
