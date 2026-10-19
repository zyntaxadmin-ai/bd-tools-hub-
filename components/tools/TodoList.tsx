"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type Item = { id: string; text: string; done: boolean };
const KEY = "bdtoolshub-todos-v1";
const MAX_ITEMS = 200;
const input = "flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((x) => x && typeof x.id === "string" && typeof x.text === "string" && typeof x.done === "boolean").slice(0, MAX_ITEMS));
        }
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items, loaded]);

  const add = () => {
    const t = text.trim();
    if (!t) { setError("কাজের নাম লিখুন"); return; }
    if (items.length >= MAX_ITEMS) { setError(`সর্বোচ্চ ${MAX_ITEMS}টি কাজ রাখা যায়`); return; }
    setError("");
    setItems([{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text: t.slice(0, 200), done: false }, ...items]);
    setText("");
  };
  const toggle = (id: string) => setItems(items.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const remove = (id: string) => setItems(items.filter((i) => i.id !== id));
  const clearDone = () => setItems(items.filter((i) => !i.done));

  const left = items.filter((i) => !i.done).length;
  const shown = items.filter((i) => (filter === "all" ? true : filter === "active" ? !i.done : i.done));
  const tab = (on: boolean) => `flex-1 py-2 rounded-xl border text-sm ${on ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }} maxLength={200} placeholder="নতুন কাজ লিখুন..." className={input} />
        <button onClick={add} aria-label="যোগ করুন" className="px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><Plus className="w-5 h-5" /></button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button onClick={() => setFilter("all")} className={tab(filter === "all")}>সব</button>
        <button onClick={() => setFilter("active")} className={tab(filter === "active")}>বাকি</button>
        <button onClick={() => setFilter("done")} className={tab(filter === "done")}>শেষ</button>
      </div>
      {shown.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-6">{items.length === 0 ? "এখনো কোনো কাজ নেই। উপরে লিখে যোগ করুন।" : "এই তালিকায় কিছু নেই।"}</p>
      ) : (
        <ul className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
          {shown.map((i) => (
            <li key={i.id} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 first:rounded-t-xl last:rounded-b-xl">
              <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} className="w-5 h-5 accent-indigo-600 shrink-0" aria-label="সম্পন্ন" />
              <span className={`flex-1 min-w-0 break-words text-sm ${i.done ? "line-through text-slate-400" : "dark:text-white"}`}>{i.text}</span>
              <button onClick={() => remove(i.id)} aria-label="মুছুন" className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>{left}টি কাজ বাকি</span>
        {items.some((i) => i.done) && <button onClick={clearDone} className="text-red-500 underline">শেষ হওয়াগুলো মুছুন</button>}
      </div>
      <p className="text-xs text-slate-500">আপনার তালিকা শুধু এই ফোন/ব্রাউজারে সেভ থাকে, কোথাও পাঠানো হয় না। ব্রাউজারের ডেটা মুছলে তালিকাও মুছে যাবে।</p>
    </div>
  );
}
