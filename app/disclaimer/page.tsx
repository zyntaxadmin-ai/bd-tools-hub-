import type { Metadata } from "next";
import T from "@/components/T";
import { CONTACT_EMAIL, toBnDigits } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "BD Tools Flow-এর অনলাইন ক্যালকুলেটর ও ইউটিলিটির ফলাফল, নির্ভুলতা, আর্থিক হিসাব এবং তথ্য ব্যবহারের সীমাবদ্ধতা সম্পর্কে জানুন।",
  alternates: { canonical: `${siteConfig.url}/disclaimer` },
};

type Sec = { h: [string, string]; p: [string, string][]; extra?: React.ReactNode; email?: boolean };

const sections: Sec[] = [
  {
    h: ["ফলাফলের নির্ভুলতা", "Accuracy of results"],
    p: [
      ["আমরা টুলগুলো সঠিক ও কার্যকর রাখার চেষ্টা করি। তবে ভুল ইনপুট, সূত্রের সীমাবদ্ধতা, পরিবর্তিত নিয়ম বা প্রযুক্তিগত সমস্যার কারণে ফলাফল ভুল বা অসম্পূর্ণ হতে পারে। প্রতিটি ফলাফলের সম্পূর্ণ নির্ভুলতা বা সব পরিস্থিতিতে উপযোগিতার নিশ্চয়তা দেওয়া হয় না।", "We try to keep our tools accurate and useful. However, results may be wrong or incomplete because of incorrect input, limitations of formulas, changed rules or technical problems. We do not guarantee the complete accuracy of every result or its suitability in every situation."],
    ],
  },
  {
    h: ["আর্থিক হিসাব ও চার্জ", "Financial calculations and charges"],
    p: [
      ["bKash, Nagad, ব্যাংক, মোবাইল আর্থিক সেবা বা অন্যান্য প্রতিষ্ঠানের ফি, চার্জ, সুদ, সীমা ও নিয়ম পরিবর্তিত হতে পারে। কোনো হিসাব করার আগে সংশ্লিষ্ট প্রতিষ্ঠানের অফিসিয়াল ওয়েবসাইট বা প্রকাশিত শর্ত যাচাই করুন।", "Fees, charges, interest, limits and rules of bKash, Nagad, banks, mobile financial services or other organisations may change. Before making any calculation, check the official website or published terms of the organisation concerned."],
      ["BD Tools Flow কোনো আর্থিক প্রতিষ্ঠান নয় এবং আমাদের ক্যালকুলেটরের ফলাফলকে চূড়ান্ত আর্থিক সিদ্ধান্তের একমাত্র ভিত্তি হিসেবে ব্যবহার করা উচিত নয়।", "BD Tools Flow is not a financial institution, and the results of our calculators should not be used as the sole basis for final financial decisions."],
    ],
  },
  {
    h: ["শিক্ষা ও অন্যান্য হিসাব", "Education and other calculations"],
    p: [
      ["GPA, বয়স, তারিখ, শতাংশ বা অন্যান্য হিসাবের ফলাফল প্রদত্ত তথ্য এবং ব্যবহৃত সূত্রের ওপর নির্ভর করে। স্কুল, কলেজ, বিশ্ববিদ্যালয়, নিয়োগকারী বা সংশ্লিষ্ট কর্তৃপক্ষের নিজস্ব নিয়ম ভিন্ন হতে পারে। প্রয়োজন হলে তাদের অফিসিয়াল নিয়মের সঙ্গে ফলাফল মিলিয়ে নিন।", "Results for GPA, age, dates, percentages and other calculations depend on the information provided and the formulas used. Schools, colleges, universities, employers or the relevant authorities may have different rules of their own. If needed, compare the result with their official rules."],
    ],
  },
  {
    h: ["পেশাদার বা সরকারি পরামর্শ নয়", "Not professional or official advice"],
    p: [
      ["এই ওয়েবসাইটের তথ্য আইনগত, চিকিৎসা, কর, আর্থিক বা অন্য কোনো পেশাদার পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ সিদ্ধান্তের আগে উপযুক্ত পেশাদার বা সংশ্লিষ্ট কর্তৃপক্ষের পরামর্শ নিন।", "The information on this website is not a substitute for legal, medical, tax, financial or any other professional advice. Seek advice from a suitable professional or the relevant authority before important decisions."],
    ],
  },
  {
    h: ["সরকারি ও তৃতীয় পক্ষের সম্পর্ক", "Government and third-party relationships"],
    p: [
      ["স্পষ্টভাবে উল্লেখ করা না থাকলে BD Tools Flow কোনো সরকারি সংস্থা, ব্যাংক, মোবাইল আর্থিক সেবা, শিক্ষা প্রতিষ্ঠান বা অন্য কোনো ব্র্যান্ডের সঙ্গে অনুমোদিত বা আনুষ্ঠানিকভাবে যুক্ত নয়। তৃতীয় পক্ষের নাম তাদের নিজস্ব পরিচয়ের জন্য উল্লেখ করা হতে পারে।", "Unless clearly stated otherwise, BD Tools Flow is not approved by, or officially affiliated with, any government body, bank, mobile financial service, educational institution or any other brand. Names of third parties may be mentioned only to identify them."],
    ],
  },
  {
    h: ["বাহ্যিক লিংক", "External links"],
    p: [
      ["সুবিধার জন্য অন্য ওয়েবসাইটের লিংক দেওয়া হতে পারে। এসব ওয়েবসাইটের কনটেন্ট, নির্ভুলতা, নিরাপত্তা বা গোপনীয়তা নীতি আমাদের নিয়ন্ত্রণে নয়। বাহ্যিক সাইট ব্যবহার করার আগে তাদের শর্ত যাচাই করুন।", "Links to other websites may be provided for convenience. The content, accuracy, security or privacy policies of those websites are not under our control. Check their terms before using an external site."],
    ],
  },
  {
    h: ["ওয়েবসাইট ব্যবহারের দায়বদ্ধতা", "Responsibility for using the website"],
    p: [
      ["ওয়েবসাইটের তথ্য ও ফলাফল যাচাই করে ব্যবহার করার দায়িত্ব ব্যবহারকারীর। প্রযোজ্য আইন দ্বারা অনুমোদিত সীমার মধ্যে, ওয়েবসাইটের তথ্য বা টুল ব্যবহারের ফলে সৃষ্ট ক্ষতির জন্য দায়বদ্ধতার পরিধি সীমিত থাকে। এই বক্তব্য কোনো আইনি অধিকার বাতিল করার উদ্দেশ্যে নয়, যেখানে আইন অনুযায়ী তা করা যায় না।", "It is the user's responsibility to verify the information and results of this website before using them. To the extent permitted by applicable law, our liability for any loss arising from the use of the website's information or tools is limited. This statement is not intended to waive any legal right where the law does not allow it."],
    ],
  },
  {
    h: ["Disclaimer-এর পরিবর্তন", "Changes to this Disclaimer"],
    p: [
      ["ওয়েবসাইটের টুল, তথ্য বা কার্যক্রম পরিবর্তিত হলে এই Disclaimer হালনাগাদ করা হতে পারে। সর্বশেষ সংস্করণ এই পেজে প্রকাশ করা হবে।", "If the tools, information or activities of the website change, this Disclaimer may be updated. The latest version will be published on this page."],
    ],
  },
  {
    h: ["যোগাযোগ", "Contact"],
    p: [
      ["এই Disclaimer সম্পর্কে প্রশ্ন বা সংশোধনের পরামর্শ থাকলে আমাদের Contact পেজে যোগাযোগ করুন অথবা ইমেইল করুন:", "If you have questions about this Disclaimer or suggestions for correction, contact us on our Contact page or email:"],
    ],
    email: true,
  },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Disclaimer</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <T bn="সর্বশেষ আপডেট: ১৮ অক্টোবর, ২০২৬" en="Last updated: 18 October 2026" />
      </p>
      <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-7">
        <p><T bn="BD Tools Flow-এ স্বাগতম। এই ওয়েবসাইটে দেওয়া ক্যালকুলেটর, শিক্ষাসংক্রান্ত টুল এবং অন্যান্য ইউটিলিটি সাধারণ তথ্য ও হিসাবের সুবিধার জন্য তৈরি করা হয়েছে। ওয়েবসাইট ব্যবহার করার আগে নিচের শর্ত ও সীমাবদ্ধতাগুলো পড়ে নিন।" en="Welcome to BD Tools Flow. The calculators, educational tools and other utilities on this website are provided for general information and convenience in calculations. Please read the terms and limitations below before using the website." /></p>
        {sections.map((s, i) => (
          <section key={i} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              <T bn={`${toBnDigits(i + 1)}. ${s.h[0]}`} en={`${i + 1}. ${s.h[1]}`} />
            </h2>
            {s.p.map((p, j) => (
              <p key={j}><T bn={p[0]} en={p[1]} /></p>
            ))}
            {s.extra}
            {s.email && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                {CONTACT_EMAIL}
              </a>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
