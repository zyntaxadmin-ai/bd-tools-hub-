import type { Metadata } from "next";
export const metadata: Metadata = { title: "About Us" };
export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About Us</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>BD Tools Hub বাংলাদেশের মানুষের দৈনন্দিন হিসাব-নিকাশ সহজ করার জন্য তৈরি একটি ফ্রি অনলাইন টুলস প্ল্যাটফর্ম।</p>
        <p>আমাদের সব টুল আপনার ব্রাউজারেই চলে। আপনার দেওয়া তথ্য আমাদের সার্ভারে সংরক্ষণ করা হয় না।</p>
        <p>আমরা নিয়মিত নতুন টুল যোগ করছি। পরামর্শ থাকলে Contact পেজ থেকে জানান।</p>
      </div>
    </div>
  );
}
