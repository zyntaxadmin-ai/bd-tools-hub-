"use client";
import MfsChargeCalculator, { MfsOption } from "./MfsChargeCalculator";

// NOTE: Rates change. Verify in the Rocket app and edit here. Last checked: Oct 2026 (public sources disagree, see README).
const OPTIONS: MfsOption[] = [
  { id: "agent", bn: "এজেন্ট ক্যাশ আউট", en: "Agent cash out", per1000: 18 },
  { id: "dbbl-atm", bn: "ডাচ-বাংলা ব্যাংক এটিএম", en: "Dutch-Bangla Bank ATM", per1000: 10 },
];

export default function RocketCalculator() {
  return (
    <MfsChargeCalculator
      provider="Rocket"
      options={OPTIONS}
      theme={{ button: "bg-[#8C3494] hover:bg-[#722a79]", accent: "text-[#8C3494]", box: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900", ring: "focus:ring-purple-500" }}
      sendNote={{
        bn: "Rocket থেকে Rocket এ সেন্ড মানি সাধারণত ফ্রি। তবে নিয়ম বদলাতে পারে, তাই অ্যাপে দেখে নিন।",
        en: "Rocket to Rocket send money is usually free, but rules can change, so check in the app.",
      }}
    />
  );
}
