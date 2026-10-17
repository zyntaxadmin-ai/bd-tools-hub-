
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Md Rohan Islam | BD Tools Hub",
  description:
    "Md Rohan Islam, founder and developer of BD Tools Hub. Discover free online calculators, educational tools and everyday utilities for Bangladesh.",
  alternates: {
    canonical: "https://bd-tools-hub.vercel.app/about",
  },
};

export default function Page() {
  return (
    <main className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        About BD Tools Hub
      </h1>

      <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          BD Tools Hub বাংলাদেশের শিক্ষার্থী, চাকরিপ্রার্থী,
          পেশাজীবী এবং সাধারণ মানুষের দৈনন্দিন হিসাব ও অনলাইন
          কাজ সহজ করার জন্য তৈরি একটি বিনামূল্যের অনলাইন
          টুলস প্ল্যাটফর্ম।
        </p>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Md Rohan Islam
          </h2>
          <p className="font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            Founder &amp; Developer
          </p>
          <p>
            আমি BD Tools Hub-এর প্রতিষ্ঠাতা ও ডেভেলপার।
            আমার লক্ষ্য হলো বাংলাদেশের মানুষের জন্য বিনামূল্যে,
            সহজে ব্যবহারযোগ্য এবং কার্যকর ওয়েব টুল তৈরি করা।
          </p>
          <p className="mt-3">
            এখানে ক্যালকুলেটর, শিক্ষাসংক্রান্ত টুল, আর্থিক হিসাব
            এবং প্রয়োজনীয় অনলাইন ইউটিলিটি এক জায়গায় তুলে ধরার
            চেষ্টা করছি। ব্যবহারকারীদের সময় বাঁচানো, সঠিক ফলাফল
            পেতে সহায়তা করা এবং সহজ ডিজিটাল অভিজ্ঞতা নিশ্চিত
            করাই আমার প্রধান উদ্দেশ্য।
          </p>

          <a
            href="https://github.com/zyntaxadmin-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            GitHub Profile →
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Our Mission
          </h2>
          <p>
            আমাদের লক্ষ্য প্রয়োজনীয় অনলাইন টুলগুলো সহজে
            ব্যবহারযোগ্য করে তোলা। প্রতিটি টুলের ফলাফল
            ব্যবহার করার আগে প্রাসঙ্গিক সূত্র, শর্ত ও
            সীমাবদ্ধতা যাচাই করার পরামর্শ দেওয়া হয়।
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Contact
          </h2>
          <p>
            কোনো প্রশ্ন, পরামর্শ বা সমস্যা জানাতে ইমেইল করুন:
          </p>
          <a
            href="mailto:bdtoolhudadmin@gmail.com"
            className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            bdtoolhudadmin@gmail.com
          </a>
        </section>
      </div>
    </main>
  );
}
