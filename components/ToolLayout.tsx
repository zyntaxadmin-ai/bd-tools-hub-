import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import ToolCard from "./ToolCard";
import AdSlot from "./AdSlot";
import { tools } from "@/data/tools";
import { LIVE_SLUGS } from "@/lib/live";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  slug: string;
  children: React.ReactNode;
  howToSteps: string[];
  faqs: { q: string; a: string }[];
}

export default function ToolLayout({ title, description, category, categorySlug, slug, children, howToSteps, faqs }: ToolLayoutProps) {
  const related = tools
    .filter((t) => t.category === category && t.slug !== slug && LIVE_SLUGS.includes(t.slug.replace("/tool/", "")))
    .slice(0, 4);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <Link href="/" className="hover:text-indigo-600 flex items-center gap-1"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/category/${categorySlug}`} className="hover:text-indigo-600">{category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-white font-medium">{title}</span>
      </nav>

      <div className="text-center mb-6">
        <h1 className="text-[28px] md:text-[36px] font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-[15px] leading-relaxed">{description}</p>
      </div>

      <AdSlot label="Advertisement" />

      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 md:p-8">{children}</div>

      <div className="mt-6"><AdSlot label="Advertisement" /></div>

      <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">How to Use {title}?</h2>
        <ol className="space-y-3">
          {howToSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((f, i) => (
            <details key={i} className="py-3 group">
              <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-medium text-slate-900 dark:text-white">
                {f.q}
                <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform" />
              </summary>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((t) => (
              <ToolCard key={t.id} name={t.name} slug={t.slug} description={t.description} iconName={t.icon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
