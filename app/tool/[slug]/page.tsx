import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import JsonLd from "@/components/JsonLd";
import { TOOL_REGISTRY } from "@/components/toolRegistry";
import { tools, categories } from "@/data/tools";
import { siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug.replace("/tool/", "") }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = tools.find((t) => t.slug === `/tool/${params.slug}`);
  if (!tool) return {};
  const entry = TOOL_REGISTRY[params.slug];
  const title = `${tool.name} - Free Online Tool`;
  const description = (entry ? entry.desc : tool.description).slice(0, 155);
  const canonical = `${siteConfig.url}/tool/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, type: "website" },
    robots: entry ? undefined : { index: false, follow: true },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === `/tool/${params.slug}`);
  if (!tool) return notFound();
  const entry = TOOL_REGISTRY[params.slug];

  if (!entry) {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">এই টুলটি শীঘ্রই আসছে। Coming soon!</p>
        <Link href="/" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium">Home এ ফিরুন</Link>
      </div>
    );
  }

  const cat = categories.find((c) => c.name === tool.category)!;
  const Component = entry.component;
  return (
    <>
      <JsonLd toolName={entry.title} description={entry.desc} url={`${siteConfig.url}/tool/${params.slug}`} faqs={entry.faqs} />
      <ToolLayout title={entry.title} description={entry.desc} category={tool.category} categorySlug={cat.slug} slug={tool.slug} howToSteps={entry.howTo} faqs={entry.faqs}>
        <Component />
      </ToolLayout>
    </>
  );
  }
                          
