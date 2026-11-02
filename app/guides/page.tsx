import type { Metadata } from "next";
import Link from "next/link";
import T from "@/components/T";
import { GUIDES } from "@/lib/guides";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "গাইড ও নিয়ম - Guides",
  description: "ক্যাশ আউট চার্জ, GPA, আয়কর, বিদ্যুৎ বিলসহ নানা হিসাব কীভাবে করবেন, উদাহরণসহ সহজ বাংলা গাইড। BD Tools Flow।",
  alternates: { canonical: `${siteConfig.url}/guides` },
};

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3"><T bn="গাইড" en="Guides" /></h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8"><T bn="হিসাব-নিকাশের নিয়ম উদাহরণসহ সহজ ভাষায়। প্রতিটি গাইডের সঙ্গে সংশ্লিষ্ট ফ্রি টুলের লিংক আছে।" en="How calculations work, in simple language with examples. Each guide links to the matching free tool." /></p>
      <div className="space-y-4">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="block rounded-xl border border-slate-200 dark:border-slate-700 p-5 hover:border-indigo-400 transition">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white"><T bn={g.title[0]} en={g.title[1]} /></h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1"><T bn={g.desc[0]} en={g.desc[1]} /></p>
            <p className="text-xs text-slate-500 mt-2"><T bn={`আপডেট: ${g.updatedLabel[0]}`} en={`Updated: ${g.updatedLabel[1]}`} /></p>
          </Link>
        ))}
      </div>
    </div>
  );
}
