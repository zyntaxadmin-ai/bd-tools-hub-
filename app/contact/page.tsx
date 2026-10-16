import type { Metadata } from "next";
export const metadata: Metadata = { title: "Contact" };
export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact</h1>
      <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>যেকোনো প্রশ্ন, পরামর্শ বা সমস্যার জন্য ইমেইল করুন:</p>
        <p className="font-semibold text-indigo-600">contact@yourdomain.com</p>
        <p className="text-sm">(deploy এর পর এই ইমেইল ঠিকানাটি আপনার আসল ইমেইল দিয়ে বদলে নিন: app/contact/page.tsx)</p>
      </div>
    </div>
  );
}
