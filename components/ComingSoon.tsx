"use client";
import Link from "next/link";
import { useUI } from "@/lib/lang";

export default function ComingSoon({ name }: { name: string }) {
  const ui = useUI();
  return (
    <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{name}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{ui.soon}</p>
      <Link href="/" className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium">{ui.backHome}</Link>
    </div>
  );
}
