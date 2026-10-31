"use client";
import { ArrowUp, ArrowDown, X } from "lucide-react";
import { useTr } from "@/lib/lang";

export type OrderedItem = { id: string; name: string; sub: string; thumb?: string };

// Shared list with move up / move down / remove buttons (used by Image to PDF and Merge PDF)
export default function OrderedFileList({
  items,
  onMove,
  onRemove,
}: {
  items: OrderedItem[];
  onMove: (index: number, dir: -1 | 1) => void;
  onRemove: (index: number) => void;
}) {
  const tr = useTr();
  const btn = "p-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:text-white disabled:opacity-30";
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={it.id} className="flex items-center gap-3 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <span className="w-6 text-center text-xs text-slate-500">{i + 1}</span>
          {it.thumb && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.thumb} alt="" className="w-10 h-10 object-cover rounded-md" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate dark:text-white">{it.name}</p>
            <p className="text-xs text-slate-500">{it.sub}</p>
          </div>
          <button type="button" onClick={() => onMove(i, -1)} disabled={i === 0} aria-label={tr("উপরে নিন", "Move up")} className={btn}><ArrowUp className="w-4 h-4" /></button>
          <button type="button" onClick={() => onMove(i, 1)} disabled={i === items.length - 1} aria-label={tr("নিচে নিন", "Move down")} className={btn}><ArrowDown className="w-4 h-4" /></button>
          <button type="button" onClick={() => onRemove(i)} aria-label={tr("বাদ দিন", "Remove")} className={btn}><X className="w-4 h-4" /></button>
        </li>
      ))}
    </ul>
  );
}
