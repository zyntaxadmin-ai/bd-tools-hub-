"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun, Wrench } from "lucide-react";
import { useTheme } from "next-themes";
import LangToggle from "@/components/LangToggle";
import { useUI } from "@/lib/lang";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ui = useUI();
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px] gap-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[17px] tracking-tight text-slate-900 dark:text-white truncate">BD Tools Hub</span>
          </Link>
          <div className="flex items-center gap-2">
            <LangToggle />
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label={ui.themeToggle}
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-slate-200" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
