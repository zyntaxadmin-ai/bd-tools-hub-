"use client";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";
import { CAT_I18N } from "@/lib/i18nData";
import { useLang } from "@/lib/lang";

export default function CategoryContent({ slug }: { slug: string }) {
  const { lang } = useLang();
  const c = categories.find((x) => x.slug === slug);
  if (!c) return null;
  const label = CAT_I18N[slug][lang];
  const list = tools.filter((t) => t.category === c.name);
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{label.name}</h1>
      <p className="text-slate-500 mt-1 mb-6">{label.desc}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((t) => <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />)}
      </div>
    </div>
  );
}
