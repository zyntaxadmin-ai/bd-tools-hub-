"use client";
import MfsChargeCalculator, { MfsOption } from "./MfsChargeCalculator";

// NOTE: Rates change. Verify in the Upay app and edit here. Last checked: Oct 2026 (only one public source found, see README).
const OPTIONS: MfsOption[] = [
  { id: "agent", bn: "এজেন্ট ক্যাশ আউট", en: "Agent cash out", per1000: 14 },
  { id: "ucb-atm", bn: "ইউসিবি ব্যাংক এটিএম", en: "UCB Bank ATM", per1000: 8 },
];

export default function UpayCalculator() {
  return (
    <MfsChargeCalculator
      provider="Upay"
      options={OPTIONS}
      theme={{ button: "bg-[#0A6EBD] hover:bg-[#08599a]", accent: "text-[#0A6EBD]", box: "bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900", ring: "focus:ring-sky-500" }}
      sendNote={{
        bn: "Upay নম্বরে সেন্ড মানি সাধারণত ফ্রি। তবে নিয়ম বদলাতে পারে, তাই অ্যাপে দেখে নিন।",
        en: "Send money to another Upay number is usually free, but rules can change, so check in the app.",
      }}
    />
  );
}
