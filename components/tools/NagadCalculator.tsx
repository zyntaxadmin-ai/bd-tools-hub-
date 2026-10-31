"use client";
import MfsChargeCalculator, { MfsOption } from "./MfsChargeCalculator";

// NOTE: Rates change. Verify in the Nagad app and edit here. Last checked: Oct 2026 (public sources disagree, see README).
const OPTIONS: MfsOption[] = [
  { id: "agent", bn: "এজেন্ট ক্যাশ আউট", en: "Agent cash out", per1000: 14.9 },
  { id: "atm", bn: "এটিএম ক্যাশ আউট", en: "ATM cash out", per1000: 14.9 },
];

export default function NagadCalculator() {
  return (
    <MfsChargeCalculator
      provider="Nagad"
      options={OPTIONS}
      theme={{ button: "bg-[#EC1C24] hover:bg-[#c8151c]", accent: "text-[#EC1C24]", box: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900", ring: "focus:ring-red-500" }}
      sendNote={{
        bn: "সেন্ড মানির চার্জ এখানে ধরা হয়নি, কারণ তা অ্যাপ ও অফারভেদে বদলায়। নিজের রেট জানা থাকলে \"নিজে রেট দিন\" ব্যবহার করুন।",
        en: "Send money fees are not included because they vary by app and offer. If you know your rate, use \"Enter my own rate\".",
      }}
    />
  );
}
