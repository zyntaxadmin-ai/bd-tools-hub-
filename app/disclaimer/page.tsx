import type { Metadata } from "next";

export const metadata: Metadata = {
title: "Disclaimer | BD Tools Hub",
description:
"BD Tools Hub-এর অনলাইন ক্যালকুলেটর ও ইউটিলিটির ফলাফল, নির্ভুলতা, আর্থিক হিসাব এবং তথ্য ব্যবহারের সীমাবদ্ধতা সম্পর্কে জানুন।",
alternates: {
canonical: "https://bd-tools-hub.vercel.app/disclaimer",
},
};

export default function Page() {
return (
<main className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
<h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
Disclaimer
</h1>

  <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
    সর্বশেষ আপডেট: ১৮ অক্টোবর, ২০২৬
  </p>

  <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-7">
    <p>
      BD Tools Hub-এ স্বাগতম। এই ওয়েবসাইটে দেওয়া ক্যালকুলেটর,
      শিক্ষাসংক্রান্ত টুল এবং অন্যান্য ইউটিলিটি সাধারণ তথ্য ও
      হিসাবের সুবিধার জন্য তৈরি করা হয়েছে। ওয়েবসাইট ব্যবহার করার
      আগে নিচের শর্ত ও সীমাবদ্ধতাগুলো পড়ে নিন।
    </p>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ১. ফলাফলের নির্ভুলতা
      </h2>
      <p>
        আমরা টুলগুলো সঠিক ও কার্যকর রাখার চেষ্টা করি। তবে ভুল
        ইনপুট, সূত্রের সীমাবদ্ধতা, পরিবর্তিত নিয়ম বা প্রযুক্তিগত
        সমস্যার কারণে ফলাফল ভুল বা অসম্পূর্ণ হতে পারে। প্রতিটি
        ফলাফলের সম্পূর্ণ নির্ভুলতা বা সব পরিস্থিতিতে উপযোগিতার
        নিশ্চয়তা দেওয়া হয় না।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ২. আর্থিক হিসাব ও চার্জ
      </h2>
      <p>
        bKash, Nagad, ব্যাংক, মোবাইল আর্থিক সেবা বা অন্যান্য
        প্রতিষ্ঠানের ফি, চার্জ, সুদ, সীমা ও নিয়ম পরিবর্তিত হতে
        পারে। কোনো হিসাব করার আগে সংশ্লিষ্ট প্রতিষ্ঠানের
        অফিসিয়াল ওয়েবসাইট বা প্রকাশিত শর্ত যাচাই করুন।
      </p>
      <p>
        BD Tools Hub কোনো আর্থিক প্রতিষ্ঠান নয় এবং আমাদের
        ক্যালকুলেটরের ফলাফলকে চূড়ান্ত আর্থিক সিদ্ধান্তের একমাত্র
        ভিত্তি হিসেবে ব্যবহার করা উচিত নয়।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৩. শিক্ষা ও অন্যান্য হিসাব
      </h2>
      <p>
        GPA, বয়স, তারিখ, শতাংশ বা অন্যান্য হিসাবের ফলাফল
        প্রদত্ত তথ্য এবং ব্যবহৃত সূত্রের ওপর নির্ভর করে।
        স্কুল, কলেজ, বিশ্ববিদ্যালয়, নিয়োগকারী বা সংশ্লিষ্ট
        কর্তৃপক্ষের নিজস্ব নিয়ম ভিন্ন হতে পারে। প্রয়োজন হলে
        তাদের অফিসিয়াল নিয়মের সঙ্গে ফলাফল মিলিয়ে নিন।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৪. পেশাদার বা সরকারি পরামর্শ নয়
      </h2>
      <p>
        এই ওয়েবসাইটের তথ্য আইনগত, চিকিৎসা, কর, আর্থিক বা
        অন্য কোনো পেশাদার পরামর্শের বিকল্প নয়। গুরুত্বপূর্ণ
        সিদ্ধান্তের আগে উপযুক্ত পেশাদার বা সংশ্লিষ্ট
        কর্তৃপক্ষের পরামর্শ নিন।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৫. সরকারি ও তৃতীয় পক্ষের সম্পর্ক
      </h2>
      <p>
        স্পষ্টভাবে উল্লেখ করা না থাকলে BD Tools Hub কোনো
        সরকারি সংস্থা, ব্যাংক, মোবাইল আর্থিক সেবা, শিক্ষা
        প্রতিষ্ঠান বা অন্য কোনো ব্র্যান্ডের সঙ্গে অনুমোদিত
        বা আনুষ্ঠানিকভাবে যুক্ত নয়। তৃতীয় পক্ষের নাম তাদের
        নিজস্ব পরিচয়ের জন্য উল্লেখ করা হতে পারে।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৬. বাহ্যিক লিংক
      </h2>
      <p>
        সুবিধার জন্য অন্য ওয়েবসাইটের লিংক দেওয়া হতে পারে।
        এসব ওয়েবসাইটের কনটেন্ট, নির্ভুলতা, নিরাপত্তা বা
        গোপনীয়তা নীতি আমাদের নিয়ন্ত্রণে নয়। বাহ্যিক সাইট
        ব্যবহার করার আগে তাদের শর্ত যাচাই করুন।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৭. ওয়েবসাইট ব্যবহারের দায়বদ্ধতা
      </h2>
      <p>
        ওয়েবসাইটের তথ্য ও ফলাফল যাচাই করে ব্যবহার করার
        দায়িত্ব ব্যবহারকারীর। প্রযোজ্য আইন দ্বারা অনুমোদিত
        সীমার মধ্যে, ওয়েবসাইটের তথ্য বা টুল ব্যবহারের
        ফলে সৃষ্ট ক্ষতির জন্য দায়বদ্ধতার পরিধি সীমিত থাকে।
        এই বক্তব্য কোনো আইনি অধিকার বাতিল করার উদ্দেশ্যে
        নয়, যেখানে আইন অনুযায়ী তা করা যায় না।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৮. Disclaimer-এর পরিবর্তন
      </h2>
      <p>
        ওয়েবসাইটের টুল, তথ্য বা কার্যক্রম পরিবর্তিত হলে
        এই Disclaimer হালনাগাদ করা হতে পারে। সর্বশেষ
        সংস্করণ এই পেজে প্রকাশ করা হবে।
      </p>
    </section>

    <section className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        ৯. যোগাযোগ
      </h2>
      <p>
        এই Disclaimer সম্পর্কে প্রশ্ন বা সংশোধনের পরামর্শ
        থাকলে আমাদের Contact পেজে যোগাযোগ করুন অথবা ইমেইল করুন:
      </p>
      <a
        href="mailto:bdtoolhudadmin@gmail.com"
        className="break-all font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        bdtoolhudadmin@gmail.com
      </a>
    </section>
  </div>
</main>

);
}
