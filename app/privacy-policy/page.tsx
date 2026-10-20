import type { Metadata } from "next";
import T from "@/components/T";
import { CONTACT_EMAIL, toBnDigits } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BD Tools Hub কীভাবে ব্যবহারকারীর তথ্য, cookies, analytics এবং third-party advertising সম্পর্কিত গোপনীয়তা পরিচালনা করে তা জানুন।",
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

type Sec = { h: [string, string]; p: [string, string][]; extra?: React.ReactNode; email?: boolean };

const sections: Sec[] = [
  {
    h: ["আমাদের টুল কীভাবে কাজ করে", "How our tools work"],
    p: [
      ["আমাদের যেসব টুল ব্রাউজারেই কাজ করে, সেগুলোতে দেওয়া তথ্য সাধারণত আপনার ডিভাইসেই প্রক্রিয়াকৃত হয়। এসব টুলের ক্ষেত্রে ইনপুট আমাদের সার্ভারে পাঠানো হয় না। তবে ওয়েবসাইটের সব ফিচার বা তৃতীয় পক্ষের সেবা একইভাবে কাজ করে—এমন নিশ্চয়তা নেই।", "For the tools that work in your browser, the information you enter is generally processed on your own device. For these tools, the input is not sent to our servers. However, there is no guarantee that every feature of the website or every third-party service works the same way."],
    ],
  },
  {
    h: ["আমরা কোন তথ্য পেতে পারি", "What information we may receive"],
    p: [
      ["ওয়েবসাইট ব্যবহার করার সময় ব্রাউজার, ডিভাইস, পরিদর্শিত পেজ, আনুমানিক ব্যবহারসংক্রান্ত পরিসংখ্যান এবং প্রযুক্তিগত লগের মতো কিছু তথ্য ওয়েব হোস্টিং বা তৃতীয় পক্ষের সেবা দ্বারা প্রক্রিয়াকৃত হতে পারে।", "While you use the website, some information such as your browser, device, pages visited, approximate usage statistics and technical logs may be processed by the web hosting or third-party services."],
      ["আপনি ইমেইলে যোগাযোগ করলে আপনার পাঠানো ইমেইল ঠিকানা ও বার্তার তথ্য উত্তর দেওয়ার জন্য ব্যবহার করা হতে পারে। আমরা প্রয়োজনের অতিরিক্ত ব্যক্তিগত তথ্য পাঠানো থেকে বিরত থাকতে অনুরোধ করছি।", "If you contact us by email, the email address and message you send may be used to reply to you. We ask you not to send personal information beyond what is necessary."],
    ],
  },
  {
    h: ["ব্রাউজারে সংরক্ষণ (Local storage)", "Browser storage (local storage)"],
    p: [
      ["কিছু টুল (যেমন To-Do List ও Countdown Timer) এবং আপনার পছন্দের ভাষা শুধু আপনার ব্রাউজারে (local storage) সংরক্ষিত হয়। এই তথ্য আমাদের সার্ভারে পাঠানো হয় না এবং ব্রাউজারের ডেটা মুছলে মুছে যায়।", "Some tools (such as the To-Do List and Countdown Timer) and your language preference are saved only in your browser (local storage). This information is not sent to our servers and is removed if you clear your browser data."],
    ],
  },
  {
    h: ["Cookies ও বিজ্ঞাপন", "Cookies and advertising"],
    p: [
      ["ওয়েবসাইটের কার্যকারিতা, পরিসংখ্যান বা বিজ্ঞাপন প্রদর্শনের জন্য cookies অথবা অনুরূপ প্রযুক্তি ব্যবহার করা হতে পারে, যদি সংশ্লিষ্ট সেবা চালু থাকে।", "Cookies or similar technologies may be used for the website's functionality, statistics or to show ads, if the relevant services are enabled."],
      ["Google AdSense বা অন্য কোনো বিজ্ঞাপন সেবা ব্যবহার করা হলে, সংশ্লিষ্ট সেবাদাতা তাদের নীতি অনুযায়ী cookies, IP address, ব্রাউজার বা বিজ্ঞাপন-সম্পর্কিত তথ্য প্রক্রিয়াকরণ করতে পারে। ব্যক্তিগতকৃত বিজ্ঞাপন ও cookies সম্পর্কে বিস্তারিত জানতে সংশ্লিষ্ট সেবাদাতার গোপনীয়তা সেটিংস ও নীতি দেখুন।", "If Google AdSense or any other advertising service is used, the service provider may process cookies, IP addresses, browser or ad-related information according to its own policies. To learn more about personalised ads and cookies, see the privacy settings and policies of the relevant provider."],
    ],
    extra: (
      <p>
        <T
          bn={<>Google সহ তৃতীয় পক্ষের বিজ্ঞাপনদাতারা আপনার আগের ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে cookies ব্যবহার করতে পারে। আপনি <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Ads Settings</a> থেকে ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে পারেন।</>}
          en={<>Third-party advertisers, including Google, may use cookies to show ads based on your previous visits. You can turn off personalised ads in <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">Google Ads Settings</a>.</>}
        />
      </p>
    ),
  },
  {
    h: ["Analytics ও ওয়েবসাইটের নিরাপত্তা", "Analytics and website security"],
    p: [
      ["ওয়েবসাইটের ব্যবহার বোঝা, কার্যকারিতা উন্নত করা এবং প্রযুক্তিগত সমস্যা শনাক্ত করার জন্য analytics বা hosting-সংক্রান্ত তথ্য ব্যবহার করা হতে পারে, যদি এসব সেবা চালু থাকে।", "Analytics or hosting-related information may be used to understand how the website is used, improve its performance and identify technical problems, if these services are enabled."],
    ],
  },
  {
    h: ["তৃতীয় পক্ষের সেবা ও লিংক", "Third-party services and links"],
    p: [
      ["ওয়েবসাইটে তৃতীয় পক্ষের সেবা বা ওয়েবসাইটের লিংক থাকতে পারে। এসব সেবার তথ্য সংগ্রহ, cookies এবং গোপনীয়তা-সংক্রান্ত কার্যক্রম তাদের নিজস্ব নীতির অধীন। কোনো বাহ্যিক লিংক ব্যবহারের আগে সংশ্লিষ্ট নীতি পর্যালোচনা করুন।", "The website may contain third-party services or links to other websites. The data collection, cookies and privacy practices of these services are governed by their own policies. Review the relevant policy before using any external link."],
    ],
  },
  {
    h: ["শিশুদের গোপনীয়তা", "Children's privacy"],
    p: [
      ["আমাদের ওয়েবসাইট সাধারণ ব্যবহারকারীদের জন্য তৈরি। অভিভাবকের অনুমতি ও প্রযোজ্য আইন মেনে শিশুদের অনলাইন গোপনীয়তা রক্ষা করা উচিত। কোনো ব্যক্তিগত তথ্য ভুলবশত পাঠানো হলে আমাদের সঙ্গে যোগাযোগ করুন।", "Our website is made for general users. Children's online privacy should be protected with parental permission and in line with applicable law. If any personal information is sent by mistake, please contact us."],
    ],
  },
  {
    h: ["নীতির পরিবর্তন", "Changes to this policy"],
    p: [
      ["ওয়েবসাইটের ফিচার, ব্যবহৃত সেবা বা প্রযোজ্য নিয়ম পরিবর্তিত হলে এই Privacy Policy হালনাগাদ করা হতে পারে। পরিবর্তনগুলো এই পেজে প্রকাশ করা হবে।", "If the website's features, services used or applicable rules change, this Privacy Policy may be updated. Changes will be published on this page."],
    ],
  },
  {
    h: ["যোগাযোগ", "Contact"],
    p: [
      ["Privacy Policy সম্পর্কে প্রশ্ন থাকলে আমাদের Contact পেজ ব্যবহার করুন অথবা ইমেইল করুন:", "If you have questions about this Privacy Policy, use our Contact page or email:"],
    ],
    email: true,
  },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Privacy Policy</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        <T bn="সর্বশেষ আপডেট: ২০ অক্টোবর, ২০২৬" en="Last updated: 20 October 2026" />
      </p>
      <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-7">
        <p><T bn="BD Tools Hub-এ আপনাকে স্বাগতম। আপনার গোপনীয়তা রক্ষা করা আমাদের কাছে গুরুত্বপূর্ণ। এই নীতিতে আমাদের ওয়েবসাইট ব্যবহার করার সময় তথ্য কীভাবে প্রক্রিয়াকৃত হতে পারে, তা ব্যাখ্যা করা হয়েছে।" en="Welcome to BD Tools Hub. Protecting your privacy is important to us. This policy explains how information may be processed when you use our website." /></p>
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
