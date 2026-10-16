import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import { tools, categories } from "@/data/tools";

export function generateStaticParams() {
  return categories.map((c) => ({ categorySlug: c.slug }));
}

export function generateMetadata({ params }: { params: { categorySlug: string } }): Metadata {
  const c = categories.find((x) => x.slug === params.categorySlug);
  return c ? { title: `${c.name} Tools`, description: `${c.name} - ${c.desc}. ফ্রি অনলাইন টুলস।` } : {};
}

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const c = categories.find((x) => x.slug === params.categorySlug);
  if (!c) return notFound();
  const list = tools.filter((t) => t.category === c.name);
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{c.name}</h1>
      <p className="text-slate-500 mt-1 mb-6">{c.desc}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((t) => <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />)}
      </div>
    </div>
  );
}
