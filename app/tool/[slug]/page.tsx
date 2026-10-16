import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolLayout from "@/components/ToolLayout";
import JsonLd from "@/components/JsonLd";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import BmiCalculator from "@/components/tools/BmiCalculator";
import EmiCalculator from "@/components/tools/EmiCalculator";
import LandCalculator from "@/components/tools/LandCalculator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import CaseConverter from "@/components/tools/CaseConverter";
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
    
    "percentage-calculator": { component: PercentageCalculator, title: "Percentage Calculator - শতকরা হিসাব", desc: "X এর Y% কত, শতকরা বৃদ্ধি/হ্রাস সহজে বের করুন।", howTo: ["মোড সিলেক্ট করুন", "X ও Y মান লিখুন", "ফলাফল ও ফর্মুলা দেখুন"], faqs: [{q:"শতকরার ফর্মুলা কি?", a:"(অংশ ÷ মোট) × 100"}, {q:"% বৃদ্ধি কিভাবে বের করে?", a:"(নতুন-পুরাতন) ÷ পুরাতন × 100"}, {q:"100 এর 20% কত?", a:"100 × 20 ÷ 100 = 20"}] },
"bmi-calculator": { component: BmiCalculator, title: "BMI Calculator - বিএমআই হিসাব", desc: "ওজন ও উচ্চতা দিয়ে BMI বের করুন ও স্বাভাবিক ওজন জানুন।", howTo: ["ওজন (kg) দিন", "উচ্চতা cm বা ফুট-ইঞ্চিতে দিন", "BMI ও ক্যাটাগরি দেখুন"], faqs: [{q:"BMI ফর্মুলা কি?", a:"ওজন(kg) ÷ উচ্চতা(m)²"}, {q:"স্বাভাবিক BMI কত?", a:"18.5 - 24.9"}, {q:"BMI কি সবার জন্য সঠিক?", a:"না, বাচ্চা, গর্ভবতী ও খেলোয়াড়দের জন্য সঠিক নয়"}] },
"emi-calculator-bd": { component: EmiCalculator, title: "EMI Calculator BD - লোন কিস্তি হিসাব", desc: "লোনের মাসিক কিস্তি, মোট সুদ ও মোট পরিশোধ হিসাব করুন।", howTo: ["লোনের পরিমাণ দিন", "সুদের হার ও মেয়াদ দিন", "EMI ও 12 মাসের চার্ট দেখুন"], faqs: [{q:"EMI ফর্মুলা কি?", a:"P×r×(1+r)^n ÷ ((1+r)^n -1)"}, {q:"সুদ 0% হলে?", a:"EMI = আসল ÷ মাস"}, {q:"এটা কি ব্যাংকের ফাইনাল EMI?", a:"না, এটি আনুমানিক"}] },
"land-calculator-bd": { component: LandCalculator, title: "Land Calculator BD - জমি মাপার হিসাব", desc: "শতাংশ, কাঠা, বিঘা, একর, বর্গফুট একসাথে হিসাব করুন।", howTo: ["যেকোনো এক এককে পরিমাণ দিন", "কাঠার মান 720 ঠিক আছে কিনা দেখুন", "সব এককে ফলাফল দেখুন"], faqs: [{q:"1 শতাংশ = কত বর্গফুট?", a:"435.6 বর্গফুট"}, {q:"1 কাঠা = কত শতাংশ?", a:"Dhaka তে 720 sqft = 1.65 শতাংশ"}, {q:"1 বিঘা = কত কাঠা?", a:"20 কাঠা"}] },
"password-generator": { component: PasswordGenerator, title: "Password Generator - নিরাপদ পাসওয়ার্ড", desc: "মজবুত ও নিরাপদ পাসওয়ার্ড তৈরি করুন, ব্রাউজারেই কাজ করে।", howTo: ["দৈর্ঘ্য সিলেক্ট করুন", "কি কি থাকবে টিক দিন", "Generate ও Copy করুন"], faqs: [{q:"পাসওয়ার্ড কি সেভ হয়?", a:"না, 100% client-side"}, {q:"কোনটা নিরাপদ?", a:"16+ অক্ষর, বড়-ছোট, সংখ্যা ও চিহ্ন মিশানো"}, {q:"Math.random ব্যবহার হয়?", a:"না, crypto.getRandomValues"}] },
"case-converter": { component: CaseConverter, title: "Case Converter - লেখার কেস পরিবর্তন", desc: "UPPER, lower, Title, camelCase সহ 8 ধরনের কেসে রূপান্তর করুন।", howTo: ["লেখা পেস্ট করুন", "যেকোনো কেস বাটনে ক্লিক করুন", "Copy করুন"], faqs: [{q:"Bangla লেখার কি হবে?", a:"অপরিবর্তিত থাকবে"}, {q:"Sentence case কি?", a:"প্রথম অক্ষর ও . ! ? এর পরের অক্ষর বড় হাতের"}, {q:"snake_case কি?", a:"শব্দগুলো _ দিয়ে যুক্ত"}] },
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
