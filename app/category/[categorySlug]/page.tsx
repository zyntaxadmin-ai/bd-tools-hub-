import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryContent from "@/components/CategoryContent";
import { categories } from "@/data/tools";

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
  return <CategoryContent slug={c.slug} />;
}
