"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface Props { name: string; slug: string; description: string; iconName: string; }

export default function ToolCard({ name, slug, description, iconName }: Props) {
  const Icon = ((Icons as any)[iconName] || Icons.Calculator) as React.ComponentType<{ className?: string }>;
  return (
    <Link href={slug} className="group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300"
      >
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{name}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{description}</p>
      </motion.div>
    </Link>
  );
}
