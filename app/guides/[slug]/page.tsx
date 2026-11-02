import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import T from "@/components/T";
import { GUIDES, getGuide } from "@/lib/guides";
import { siteConfig } from "@/lib/seo";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  const canonical = `${siteConfig.url}/guides/${g.slug}`;
  return {
    title: g.title[0],
    description: g.desc[0],
    alternates: { canonical },
    openGraph: { title: g.title[0], description: g.desc[0], url: canonical, siteName: siteConfig.name, type: "article", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }] },
    twitter: { card: "summary_large_image", title: g.title[0], description: g.desc[0], images: ["/og-image.png"] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) return notFound();
  const url = `${siteConfig.url}/guides/${g.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title[0],
    description: g.desc[0],
    dateModified: g.updated,
    datePublished: g.updated,
    inLanguage: "bn",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faqs.map((f) => ({ "@type": "Question", name: f.q[0], acceptedAnswer: { "@type": "Answer", text: f.a[0] } })),
  };
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <nav className="text-sm text-slate-500 mb-4"><Link href="/guides" className="hover:text-indigo-600"><T bn="গাইড" en="Guides" /></Link></nav>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3"><T bn={g.title[0]} en={g.title[1]} /></h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6"><T bn={`সর্বশেষ আপডেট: ${g.updatedLabel[0]}`} en={`Last updated: ${g.updatedLabel[1]}`} /></p>

      <Link href={`/tool/${g.tool.slug}`} className="block rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 p-4 mb-8 hover:border-indigo-400 transition">
        <span className="text-sm text-slate-600 dark:text-slate-400"><T bn="নিজে হিসাব করে দেখুন" en="Try it yourself" />: </span>
        <span className="font-semibold text-indigo-600 dark:text-indigo-400"><T bn={g.tool.name[0]} en={g.tool.name[1]} /> →</span>
      </Link>

      <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-7">
        {g.sections.map((s, i) => (
          <section key={i} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white"><T bn={s.h[0]} en={s.h[1]} /></h2>
            {s.p.map((p, j) => <p key={j}><T bn={p[0]} en={p[1]} /></p>)}
          </section>
        ))}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white"><T bn="সাধারণ প্রশ্ন" en="Frequently asked questions" /></h2>
          {g.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-semibold text-slate-900 dark:text-white"><T bn={f.q[0]} en={f.q[1]} /></h3>
              <p><T bn={f.a[0]} en={f.a[1]} /></p>
            </div>
          ))}
        </section>
      </div>

      {others.length > 0 && (
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3"><T bn="আরও গাইড" en="More guides" /></h2>
          <ul className="space-y-2">
            {others.map((o) => (
              <li key={o.slug}><Link href={`/guides/${o.slug}`} className="text-indigo-600 dark:text-indigo-400 hover:underline"><T bn={o.title[0]} en={o.title[1]} /></Link></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
