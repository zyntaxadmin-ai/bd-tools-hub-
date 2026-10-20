"use client";
import { useLang } from "@/lib/lang";

// Shows the Bangla or English version of a block. Usable inside server pages.
export default function T({ bn, en }: { bn: React.ReactNode; en: React.ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : bn}</>;
}
