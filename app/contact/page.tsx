import type { Metadata } from "next";
import T from "@/components/T";
import { CONTACT_EMAIL } from "@/lib/site";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact BD Tools Hub by email or connect with us on Instagram, Facebook, and TikTok.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

const socialLinks = [
  { name: "Instagram", username: "rohan3prime", url: "https://www.instagram.com/rohan3prime/" },
  { name: "Facebook", username: "rohan3prime", url: "https://www.facebook.com/rohan3prime" },
  { name: "TikTok", username: "rohan3prime", url: "https://www.tiktok.com/@rohan3prime" },
];

export default function Page() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h1>

      <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          <T
            bn="BD Tools Hub সম্পর্কে কোনো প্রশ্ন, পরামর্শ বা প্রযুক্তিগত সমস্যার জন্য ইমেইল অথবা সোশ্যাল মিডিয়ায় যোগাযোগ করুন।"
            en="For any question, suggestion or technical problem about BD Tools Hub, contact us by email or on social media."
          />
        </p>

        <section className="rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Email Support</h2>
          <p className="mb-3"><T bn="ইমেইল:" en="Email:" /></p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="break-all font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Connect With Us</h2>
          <div className="space-y-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{social.name}</p>
                  <p className="text-sm">{social.username}</p>
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">Visit Profile →</span>
              </a>
            ))}
          </div>
        </section>

        <p className="text-sm">
          <T
            bn="কোনো সমস্যা জানালে সংশ্লিষ্ট টুলের নাম ও সমস্যার বিবরণ উল্লেখ করুন। পাসওয়ার্ড বা OTP শেয়ার করবেন না।"
            en="When reporting a problem, mention the name of the tool and describe the problem. Do not share passwords or OTPs."
          />
        </p>
      </div>
    </div>
  );
}
