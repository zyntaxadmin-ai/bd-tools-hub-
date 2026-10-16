import type { Metadata } from "next";
export const metadata: Metadata = { title: "Disclaimer" };
export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Disclaimer</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>এই ওয়েবসাইটের টুলগুলো শুধুমাত্র সাধারণ তথ্য ও আনুমানিক হিসাবের জন্য। ফলাফলের সম্পূর্ণ নির্ভুলতার নিশ্চয়তা দেওয়া হয় না।</p>
        <p>bKash, Nagad সহ যেকোনো ফি বা চার্জ পরিবর্তনশীল। সিদ্ধান্ত নেওয়ার আগে সংশ্লিষ্ট প্রতিষ্ঠানের অফিসিয়াল তথ্য যাচাই করুন।</p>
        <p>এই সাইট কোনো সরকারি বা আর্থিক প্রতিষ্ঠানের সাথে যুক্ত নয়।</p>
      </div>
    </div>
  );
}
