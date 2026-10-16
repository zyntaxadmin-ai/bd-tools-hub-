import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ। টুলগুলোতে আপনি যে তথ্য দেন তা আপনার ব্রাউজারেই প্রক্রিয়া হয়, আমাদের সার্ভারে পাঠানো হয় না।</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white pt-2">Cookies ও বিজ্ঞাপন</h2>
        <p>এই সাইটে Google AdSense এর মতো তৃতীয় পক্ষের বিজ্ঞাপন সেবা ব্যবহার করা হতে পারে। Google ও তাদের অংশীদাররা আপনার পূর্ববর্তী ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে কুকি ব্যবহার করতে পারে।</p>
        <p>আপনি Google Ads Settings থেকে ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে পারেন।</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white pt-2">Analytics</h2>
        <p>সাইটের কার্যকারিতা বুঝতে আমরা বেনামী ট্রাফিক তথ্য ব্যবহার করতে পারি।</p>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white pt-2">যোগাযোগ</h2>
        <p>এই নীতি নিয়ে প্রশ্ন থাকলে Contact পেজে যোগাযোগ করুন।</p>
      </div>
    </div>
  );
}
