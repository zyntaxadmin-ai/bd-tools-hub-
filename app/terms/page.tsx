import type { Metadata } from "next";
import T from "@/components/T";
import { CONTACT_EMAIL, toBnDigits } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "BD Tools Flow ওয়েবসাইট ও টুল ব্যবহারের শর্তাবলি: ব্যবহারের নিয়ম, মালিকানা, দায়বদ্ধতার সীমা এবং বিজ্ঞাপন সম্পর্কে জানুন।",
  alternates: { canonical: `${siteConfig.url}/terms` },
};

type Sec = { h: [string, string]; p: [string, string][]; email?: boolean };

const sections: Sec[] = [
  {
    h: ["শর্তাবলি গ্রহণ", "Acceptance of these terms"],
    p: [
      ["BD Tools Flow ওয়েবসাইট ব্যবহার করলে আপনি এই শর্তাবলি মেনে নিচ্ছেন বলে ধরা হবে। শর্তগুলোর সঙ্গে একমত না হলে অনুগ্রহ করে ওয়েবসাইটটি ব্যবহার করবেন না।", "By using the BD Tools Flow website you agree to these terms. If you do not agree with them, please do not use the website."],
    ],
  },
  {
    h: ["আমাদের সেবা", "Our service"],
    p: [
      ["BD Tools Flow বিনামূল্যে অনলাইন ক্যালকুলেটর ও ইউটিলিটি টুল দেয়, যেমন বয়স, GPA, চার্জ হিসাব, ছবি ও PDF সংক্রান্ত টুল। কোনো টুলের জন্য সাইন-আপ বা পেমেন্ট লাগে না। আমরা যেকোনো সময় টুল যোগ, পরিবর্তন বা বন্ধ করতে পারি।", "BD Tools Flow provides free online calculators and utility tools, such as age, GPA, charge calculation, and image and PDF tools. No sign-up or payment is needed for any tool. We may add, change or remove tools at any time."],
    ],
  },
  {
    h: ["ব্যবহারের নিয়ম", "Acceptable use"],
    p: [
      ["আপনি ওয়েবসাইটটি শুধু বৈধ উদ্দেশ্যে ব্যবহার করবেন। আপনি ওয়েবসাইট বা এর সার্ভারের ক্ষতি করবেন না, স্বয়ংক্রিয় উপায়ে অতিরিক্ত অনুরোধ পাঠিয়ে সেবা ব্যাহত করবেন না, নিরাপত্তা ব্যবস্থা এড়ানোর চেষ্টা করবেন না, এবং টুল ব্যবহার করে আইনবিরোধী বা অন্যের ক্ষতিকর কাজ করবেন না।", "You will use the website only for lawful purposes. You will not harm the website or its servers, disrupt the service by sending excessive automated requests, try to bypass security measures, or use the tools for anything unlawful or harmful to others."],
    ],
  },
  {
    h: ["আপনার ফাইল ও তথ্য", "Your files and data"],
    p: [
      ["ছবি ও PDF টুলের কাজ আপনার ব্রাউজারেই হয়, ফাইল আমাদের সার্ভারে আপলোড করা হয় না। আপনি যে ফাইল ব্যবহার করেন তার অধিকার বা অনুমতি আপনার আছে কিনা, তা নিশ্চিত করার দায়িত্ব আপনার। কীভাবে তথ্য ব্যবহৃত হয় তা আমাদের প্রাইভেসি পলিসিতে আছে।", "The image and PDF tools work inside your browser and files are not uploaded to our servers. It is your responsibility to make sure you have the right or permission to use the files you choose. How information is handled is explained in our Privacy Policy."],
    ],
  },
  {
    h: ["ফলাফলের নির্ভুলতা", "Accuracy of results"],
    p: [
      ["টুলের ফলাফল আনুমানিক ও সাধারণ তথ্যের জন্য। বিশেষ করে bKash, Nagad, Rocket বা Upay-এর চার্জ, সরকারি ফি ও নিয়ম যেকোনো সময় বদলাতে পারে। গুরুত্বপূর্ণ সিদ্ধান্তের আগে অফিসিয়াল উৎস থেকে যাচাই করুন। বিস্তারিত আমাদের Disclaimer পেজে আছে।", "Tool results are estimates and for general information. In particular, the charges of bKash, Nagad, Rocket or Upay, and government fees and rules, can change at any time. Verify with the official source before important decisions. More detail is on our Disclaimer page."],
    ],
  },
  {
    h: ["মেধাসম্পদ", "Intellectual property"],
    p: [
      ["ওয়েবসাইটের ডিজাইন, লেখা, লোগো ও সোর্স কোড BD Tools Flow-এর। ব্যক্তিগত ও অবাণিজ্যিক কাজে টুল ব্যবহার করা যাবে। আমাদের অনুমতি ছাড়া ওয়েবসাইটের কনটেন্ট কপি করে নিজের নামে প্রকাশ বা বিক্রি করা যাবে না। তৃতীয় পক্ষের নাম ও ব্র্যান্ড তাদের নিজ নিজ মালিকের সম্পত্তি।", "The website's design, text, logo and source code belong to BD Tools Flow. You may use the tools for personal and non-commercial work. You may not copy the website's content and publish or sell it as your own without our permission. Third-party names and brands belong to their respective owners."],
    ],
  },
  {
    h: ["বিজ্ঞাপন", "Advertising"],
    p: [
      ["ওয়েবসাইটে Google AdSense বা অন্য বিজ্ঞাপন সেবার বিজ্ঞাপন দেখানো হতে পারে। বিজ্ঞাপনদাতার পণ্য, সেবা বা ওয়েবসাইটের জন্য আমরা দায়ী নই। বিজ্ঞাপনে ক্লিক করা বা না করা সম্পূর্ণ আপনার সিদ্ধান্ত।", "The website may show ads from Google AdSense or other advertising services. We are not responsible for advertisers' products, services or websites. Whether to click an ad is entirely your decision."],
    ],
  },
  {
    h: ["বাহ্যিক লিংক", "External links"],
    p: [
      ["ওয়েবসাইটে অন্য সাইটের লিংক থাকতে পারে। সেসব সাইটের কনটেন্ট বা নীতির ওপর আমাদের নিয়ন্ত্রণ নেই।", "The website may contain links to other sites. We have no control over the content or policies of those sites."],
    ],
  },
  {
    h: ["কোনো নিশ্চয়তা নেই", "No warranties"],
    p: [
      ["ওয়েবসাইট ও টুল যেমন আছে তেমনভাবে (\"as is\") দেওয়া হয়। এটি সবসময় নিরবচ্ছিন্ন, ত্রুটিহীন বা সব ডিভাইসে সমানভাবে কাজ করবে, এমন নিশ্চয়তা আমরা দিই না।", "The website and tools are provided \"as is\". We do not guarantee that they will always be uninterrupted, error free, or work equally on every device."],
    ],
  },
  {
    h: ["দায়বদ্ধতার সীমা", "Limitation of liability"],
    p: [
      ["প্রযোজ্য আইন যতটুকু অনুমতি দেয়, ওয়েবসাইট বা টুল ব্যবহারের ফলে হওয়া কোনো ক্ষতি, ভুল ফলাফল বা তথ্য হারানোর জন্য BD Tools Flow দায়ী থাকবে না। এই বক্তব্য এমন কোনো আইনি অধিকার বাতিল করে না, যা আইন অনুযায়ী বাতিল করা যায় না।", "To the extent allowed by applicable law, BD Tools Flow is not liable for any loss, incorrect result or loss of data arising from use of the website or tools. This statement does not remove any legal right that cannot be removed by law."],
    ],
  },
  {
    h: ["ব্যবহার বন্ধ করা", "Suspension"],
    p: [
      ["এই শর্ত ভাঙা হলে বা ওয়েবসাইটের নিরাপত্তা ঝুঁকিতে পড়লে আমরা কারও ব্যবহার সীমিত বা বন্ধ করতে পারি।", "If these terms are broken or the website's security is at risk, we may limit or block someone's access."],
    ],
  },
  {
    h: ["প্রযোজ্য আইন", "Governing law"],
    p: [
      ["এই শর্তাবলি বাংলাদেশের প্রযোজ্য আইন অনুযায়ী ব্যাখ্যা করা হবে।", "These terms are interpreted under the applicable laws of Bangladesh."],
    ],
  },
  {
    h: ["শর্তাবলির পরিবর্তন", "Changes to these terms"],
    p: [
      ["আমরা সময়ে সময়ে এই শর্তাবলি হালনাগাদ করতে পারি। সর্বশেষ সংস্করণ এই পেজে প্রকাশ করা হবে। পরিবর্তনের পরও ওয়েবসাইট ব্যবহার করলে নতুন শর্ত মেনে নেওয়া হয়েছে বলে ধরা হবে।", "We may update these terms from time to time. The latest version will be published on this page. If you keep using the website after a change, you are taken to accept the new terms."],
    ],
  },
  {
    h: ["যোগাযোগ", "Contact"],
    p: [
      ["এই শর্তাবলি সম্পর্কে প্রশ্ন থাকলে আমাদের Contact পেজে যোগাযোগ করুন অথবা ইমেইল করুন:", "If you have questions about these terms, contact us on our Contact page or email:"],
    ],
    email: true,
  },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Terms and Conditions</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <T bn="সর্বশেষ আপডেট: ৩১ অক্টোবর, ২০২৬" en="Last updated: 31 October 2026" />
      </p>
      <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-7">
        <p><T bn="BD Tools Flow-এ স্বাগতম। এই পেজে ওয়েবসাইট ও এর টুল ব্যবহারের শর্তাবলি দেওয়া হয়েছে। ব্যবহারের আগে অনুগ্রহ করে মনোযোগ দিয়ে পড়ুন।" en="Welcome to BD Tools Flow. This page sets out the terms for using the website and its tools. Please read it carefully before use." /></p>
        {sections.map((s, i) => (
          <section key={i} className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              <T bn={`${toBnDigits(i + 1)}. ${s.h[0]}`} en={`${i + 1}. ${s.h[1]}`} />
            </h2>
            {s.p.map((p, j) => (
              <p key={j}><T bn={p[0]} en={p[1]} /></p>
            ))}
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
