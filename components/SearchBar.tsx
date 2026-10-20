"use client";
import { Search, X } from "lucide-react";

interface Props { value: string; onChange: (val: string) => void; placeholder?: string; clearLabel?: string; }

export default function SearchBar({ value, onChange, placeholder = "Search tools...", clearLabel = "Clear" }: Props) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-4 text-[15px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
      {value && (
        <button onClick={() => onChange("")} aria-label={clearLabel} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
          <X className="w-4 h-4 text-slate-500" />
        </button>
      )}
    </div>
  );
}
