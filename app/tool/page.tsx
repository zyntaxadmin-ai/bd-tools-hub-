import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import JsonLd from "@/components/JsonLd";
import AgeCalculator from "@/components/tools/AgeCalculator";
import GpaCalculator from "@/components/tools/GpaCalculator";
import BkashCalculator from "@/components/tools/BkashCalculator";
import WordCounter from "@/components/tools/WordCounter";
import { tools, categories } from "@/data/tools";
import { siteConfig } from "@/lib/seo";

type Entry = {
  component: React.ComponentType;
  title: string;
  desc: string;
  howTo: string[];
  faqs: { q: string; a: string }[];
};

// ADD NEW TOOLS HERE (also add slug to lib/live.ts)
const TOOL_REGISTRY: Record<string, Entry> = {
  "age-calculator": {
    component: AgeCalculator,
    title: "Age Calculator",
    desc: "জন্ম তারিখ দিয়ে নিখুঁত বয়স বের করুন - বছর, মাস, দিন, মোট দিন ও পরবর্তী জন্মদিন সহ।",
    howTo: ["আপনার জন্ম তারিখ সিলেক্ট করুন", "Calculate বাটনে ক্লিক করুন", "বছর, মাস, দিন ও মোট দিন দেখুন"],
    faqs: [
      { q: "Leap year কি হিসাব হয়?", a: "হ্যাঁ, লিপ ইয়ার ধরেই হিসাব করা হয়।" },
      { q: "ভবিষ্যতের তারিখ দিলে কি হবে?", a: "Error দেখাবে - জন্ম তারিখ ভবিষ্যতে হতে পারে না।" },
    ],
  },
  "gpa-calculator-bd": {
    component: GpaCalculator,
    title: "GPA Calculator BD",
    desc: "SSC/HSC গ্রেড দিয়ে GPA নির্ণয় করুন। কোনো বিষয়ে F থাকলে Fail দেখাবে।",
    howTo: ["৫টি বিষয়ের গ্রেড সিলেক্ট করুন", "Calculate GPA তে ক্লিক করুন", "৫.০০ এর মধ্যে ফলাফল দেখুন"],
    faqs: [
      { q: "কোনো বিষয়ে F থাকলে?", a: "GPA 0.00 দেখাবে এবং Fail status আসবে।" },
      { q: "এটা কি অফিসিয়াল রেজাল্ট?", a: "না, এটি শুধু আনুমানিক হিসাবের জন্য। অফিসিয়াল রেজাল্ট বোর্ড থেকে দেখুন।" },
    ],
  },
  "bkash-calculator": {
    component: BkashCalculator,
    title: "bKash Charge Calculator",
    desc: "bKash Cash Out ও Send Money চার্জ হিসাব করুন সহজে।",
    howTo: ["টাকার পরিমাণ লিখুন", "Cash Out বা Send Money সিলেক্ট করুন", "চার্জ ও মোট টাকা দেখুন"],
    faqs: [
      { q: "চার্জ কি সবসময় একই?", a: "না, bKash যেকোনো সময় চার্জ পরিবর্তন করতে পারে। অফিসিয়াল চার্ট দেখে নিশ্চিত হোন।" },
      { q: "1000 টাকায় Cash Out চার্জ কত?", a: "এই ক্যালকুলেটরে 18.5 টাকা ধরা হয়েছে।" },
    ],
  },
  "word-counter": {
    component: WordCounter,
    title: "Word Counter",
    desc: "শব্দ, অক্ষর, বাক্য ও প্যারাগ্রাফ গণনা করুন - টাইপ করার সাথে সাথে।",
    howTo: ["Textarea তে লেখা পেস্ট করুন", "Live count দেখুন", "Clear করে নতুন লেখা দিন"],
    faqs: [
      { q: "Reading time কিভাবে হিসাব হয়?", a: "প্রতি মিনিটে ২০০ শব্দ ধরে।" },
      { q: "বাংলা লেখা কাউন্ট হয়?", a: "হ্যাঁ, বাংলা ও ইংরেজি দুটোই।" },
    ],
  },
};

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
