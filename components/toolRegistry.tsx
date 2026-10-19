import AgeCalculator from "@/components/tools/AgeCalculator";
import GpaCalculator from "@/components/tools/GpaCalculator";
import BkashCalculator from "@/components/tools/BkashCalculator";
import WordCounter from "@/components/tools/WordCounter";
import PercentageCalculator from "@/components/tools/PercentageCalculator";
import BmiCalculator from "@/components/tools/BmiCalculator";
import EmiCalculator from "@/components/tools/EmiCalculator";
import LandCalculator from "@/components/tools/LandCalculator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import CaseConverter from "@/components/tools/CaseConverter";
import { TOOL_REGISTRY_B1 } from "@/components/toolRegistryB1";
import { TOOL_REGISTRY_B2 } from "@/components/toolRegistryB2";
import { TOOL_REGISTRY_B3 } from "@/components/toolRegistryB3";

export type Entry = {
  component: React.ComponentType;
  title: string;
  desc: string;
  howTo: string[];
  faqs: { q: string; a: string }[];
};

// নতুন টুল যোগ করতে: component বানান, এখানে entry দিন, আর lib/live.ts এ slug দিন।
export const TOOL_REGISTRY: Record<string, Entry> = {
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
  "percentage-calculator": {
    component: PercentageCalculator,
    title: "Percentage Calculator (শতকরা হিসাব)",
    desc: "শতকরা হিসাব এক ক্লিকে: X এর Y% কত, শতকরা বৃদ্ধি-হ্রাস, % যোগ-বিয়োগ। হিসাবের ধাপসহ।",
    howTo: ["উপরে থেকে হিসাবের ধরন সিলেক্ট করুন", "দুটি সংখ্যা লিখুন", "ফলাফল ও হিসাবের ধাপ দেখুন"],
    faqs: [
      { q: "শতকরা (percentage) বের করার সূত্র কী?", a: "অংশ ÷ মোট × ১০০। যেমন ৫০ এর ২০% = ৫০ × ২০ ÷ ১০০ = ১০।" },
      { q: "শতকরা বৃদ্ধি কীভাবে বের করব?", a: "(পরের মান − আগের মান) ÷ আগের মান × ১০০। ফল ঋণাত্মক হলে সেটি হ্রাস।" },
      { q: "২০০ এর ১৫% কত?", a: "২০০ × ১৫ ÷ ১০০ = ৩০।" },
    ],
  },
  "bmi-calculator": {
    component: BmiCalculator,
    title: "BMI Calculator (বিএমআই ক্যালকুলেটর)",
    desc: "ওজন ও উচ্চতা দিয়ে BMI বের করুন এবং আপনার উচ্চতায় স্বাভাবিক ওজনের সীমা জানুন।",
    howTo: ["ওজন কেজিতে লিখুন", "উচ্চতা সেমি বা ফুট-ইঞ্চিতে দিন", "BMI, ক্যাটাগরি ও স্বাভাবিক ওজনের সীমা দেখুন"],
    faqs: [
      { q: "BMI কীভাবে হিসাব হয়?", a: "ওজন (কেজি) ÷ উচ্চতা (মিটার) এর বর্গ।" },
      { q: "স্বাভাবিক BMI কত?", a: "WHO এর হিসাবে প্রাপ্তবয়স্কদের জন্য ১৮.৫ থেকে ২৪.৯।" },
      { q: "BMI কি সবার জন্য সঠিক?", a: "না। শিশু, গর্ভবতী নারী ও খেলোয়াড়দের ক্ষেত্রে সঠিক নাও হতে পারে। চিকিৎসকের পরামর্শ নিন।" },
    ],
  },
  "emi-calculator-bd": {
    component: EmiCalculator,
    title: "EMI Calculator (লোনের কিস্তি ক্যালকুলেটর)",
    desc: "লোনের পরিমাণ, সুদের হার ও মেয়াদ দিয়ে মাসিক কিস্তি, মোট সুদ ও পরিশোধের হিসাব করুন।",
    howTo: ["লোনের পরিমাণ লিখুন", "বার্ষিক সুদের হার ও মেয়াদ দিন", "মাসিক কিস্তি ও প্রথম ১২ মাসের তালিকা দেখুন"],
    faqs: [
      { q: "EMI কীভাবে হিসাব হয়?", a: "Reducing balance পদ্ধতিতে: EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)। এখানে r হলো মাসিক সুদের হার, n হলো মোট মাস।" },
      { q: "ব্যাংকের হিসাবের সাথে কি হুবহু মিলবে?", a: "প্রসেসিং ফি, ইনস্যুরেন্স বা ভিন্ন হিসাব পদ্ধতির কারণে সামান্য পার্থক্য হতে পারে। ব্যাংক থেকে নিশ্চিত হোন।" },
    ],
  },
  "land-calculator-bd": {
    component: LandCalculator,
    title: "জমির হিসাব (শতাংশ, কাঠা, বিঘা, একর)",
    desc: "শতাংশ, কাঠা, বিঘা, একর, বর্গফুট ও বর্গমিটারে জমির পরিমাণ এক জায়গায় রূপান্তর করুন।",
    howTo: ["জমির পরিমাণ লিখে একক সিলেক্ট করুন", "প্রয়োজনে ১ কাঠার বর্গফুট আপনার এলাকা অনুযায়ী বদলান", "সব এককে ফলাফল দেখুন বা কপি করুন"],
    faqs: [
      { q: "১ শতাংশ = কত বর্গফুট?", a: "১ শতাংশ = ৪৩৫.৬ বর্গফুট। ১০০ শতাংশে ১ একর (৪৩,৫৬০ বর্গফুট)।" },
      { q: "১ কাঠা কত বর্গফুট?", a: "সাধারণত ৭২০ বর্গফুট ধরা হয়, তবে এলাকাভেদে কাঠা ও বিঘার মাপ আলাদা। তাই আপনার এলাকার মাপ দিয়ে হিসাব করুন।" },
      { q: "১ বিঘা কত কাঠা?", a: "এই টুলে ১ বিঘা = ২০ কাঠা ধরা হয়েছে।" },
    ],
  },
  "password-generator": {
    component: PasswordGenerator,
    title: "Strong Password Generator",
    desc: "নিরাপদ ও শক্তিশালী র‍্যান্ডম পাসওয়ার্ড তৈরি করুন। আপনার ব্রাউজারেই তৈরি হয়, কোথাও সেভ হয় না।",
    howTo: ["পাসওয়ার্ডের দৈর্ঘ্য ঠিক করুন", "কোন ধরনের অক্ষর চান তা সিলেক্ট করুন", "Copy বাটনে ক্লিক করে ব্যবহার করুন"],
    faqs: [
      { q: "পাসওয়ার্ড কি কোথাও সেভ হয়?", a: "না। পাসওয়ার্ড আপনার ব্রাউজারেই তৈরি হয়, কোনো সার্ভারে পাঠানো হয় না।" },
      { q: "কত বড় পাসওয়ার্ড ভালো?", a: "কমপক্ষে ১২-১৬ অক্ষর, বড়-ছোট হাতের অক্ষর, সংখ্যা ও চিহ্ন মিশিয়ে।" },
    ],
  },
  "case-converter": {
    component: CaseConverter,
    title: "Case Converter",
    desc: "লেখাকে UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case ও kebab-case এ বদলান।",
    howTo: ["বক্সে আপনার লেখা পেস্ট করুন", "পছন্দের ফরম্যাটের বাটনে ক্লিক করুন", "Copy করে ব্যবহার করুন"],
    faqs: [
      { q: "বাংলা লেখায় কি কাজ করে?", a: "বাংলা অক্ষরে বড়-ছোট হাতের ভেদ নেই, তাই বাংলা লেখা অপরিবর্তিত থাকবে। ইংরেজি অংশ বদলাবে।" },
      { q: "Sentence case কী?", a: "বাক্যের প্রথম অক্ষর বড় হাতের এবং বাকি সব ছোট হাতের।" },
    ],
  },
  ...TOOL_REGISTRY_B1,
  ...TOOL_REGISTRY_B2,
  ...TOOL_REGISTRY_B3,
};
