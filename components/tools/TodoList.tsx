"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useTr } from "@/lib/lang";

type Item = { id: string; text: string; done: boolean };
const KEY = "bdtoolshub-todos-v1";
const MAX_ITEMS = 200;
const input = "flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

const ERR_EN: Record<string, string> = {
  "কাজের নাম লিখুন": "Enter a task name"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  const d533 = new RegExp("^সর্বোচ্চ (\\d+)টি কাজ রাখা যায়$").exec(m);
  if (d533) return "You can keep at most $1 tasks".replace("$1", d533[1]);
  return m;
}

export default function TodoList() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
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
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }} maxLength={200} placeholder={tr("নতুন কাজ লিখুন...", "Add a new task...")} className={input} />
        <button onClick={add} aria-label={tr("যোগ করুন", "Add")} className="px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"><Plus className="w-5 h-5" /></button>
      </div>
      {error && <p className="text-sm text-red-500">{E(error)}</p>}
      <div className="flex gap-2">
        <button onClick={() => setFilter("all")} className={tab(filter === "all")}>{tr("সব", "All")}</button>
        <button onClick={() => setFilter("active")} className={tab(filter === "active")}>{tr("বাকি", "Active")}</button>
        <button onClick={() => setFilter("done")} className={tab(filter === "done")}>{tr("শেষ", "Done")}</button>
      </div>
      {shown.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-6">{items.length === 0 ? tr("এখনো কোনো কাজ নেই। উপরে লিখে যোগ করুন।", "No tasks yet. Type above to add one.") : tr("এই তালিকায় কিছু নেই।", "Nothing in this list.")}</p>
      ) : (
        <ul className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800">
          {shown.map((i) => (
            <li key={i.id} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 first:rounded-t-xl last:rounded-b-xl">
              <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} className="w-5 h-5 accent-indigo-600 shrink-0" aria-label={tr("সম্পন্ন", "Done")} />
              <span className={`flex-1 min-w-0 break-words text-sm ${i.done ? "line-through text-slate-400" : "dark:text-white"}`}>{i.text}</span>
              <button onClick={() => remove(i.id)} aria-label={tr("মুছুন", "Delete")} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between items-center text-sm text-slate-500">
        <span>{tr(`${left}টি কাজ বাকি`, `${left} ${left === 1 ? "task" : "tasks"} left`)}</span>
        {items.some((i) => i.done) && <button onClick={clearDone} className="text-red-500 underline">{tr("শেষ হওয়াগুলো মুছুন", "Clear completed")}</button>}
      </div>
      <p className="text-xs text-slate-500">{tr("আপনার তালিকা শুধু এই ফোন/ব্রাউজারে সেভ থাকে, কোথাও পাঠানো হয় না। ব্রাউজারের ডেটা মুছলে তালিকাও মুছে যাবে।", "Your list is saved only on this phone/browser and is never sent anywhere. Clearing your browser data will also clear the list.")}</p>
    </div>
  );
}
