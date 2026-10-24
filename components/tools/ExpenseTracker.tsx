"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, Download, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";
import { Kind, Entry, EXPENSE_CATS, INCOME_CATS, MAX_ENTRIES, parseAmount, summarize, byCategory, filterMonth, monthsIn, toCsv, sanitizeLoaded } from "@/lib/expense";
import { GREG_MONTHS_BN, GREG_MONTHS_EN } from "@/lib/banglaDate";

const KEY = "bdtoolshub-expenses-v1";
type Err = "" | "amount" | "date" | "limit";
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const p2 = (n: number) => String(n).padStart(2, "0");

export default function ExpenseTracker() {
  const tr = useTr();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [kind, setKind] = useState<Kind>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("all");
  const [err, setErr] = useState<Err>("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setEntries(sanitizeLoaded(JSON.parse(raw)));
    } catch { /* ignore */ }
    const d = new Date();
    setDate(`${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(entries)); } catch { /* ignore */ }
  }, [entries, loaded]);

  const cats = kind === "expense" ? EXPENSE_CATS : INCOME_CATS;
  const catLabel = (k: Kind, id: string) => {
    const c = (k === "expense" ? EXPENSE_CATS : INCOME_CATS).find((x) => x.id === id);
    return c ? tr(c.bn, c.en) : id;
  };
  const taka = (n: number) => `${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })} ${tr("টাকা", "taka")}`;
  const monthLabel = (m: string) => {
    if (m === "all") return tr("সব সময়", "All time");
    const [y, mm] = m.split("-");
    const i = parseInt(mm, 10) - 1;
    return `${tr(GREG_MONTHS_BN[i], GREG_MONTHS_EN[i])} ${y}`;
  };

  const add = () => {
    const a = parseAmount(amount);
    if (a === null) { setErr("amount"); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { setErr("date"); return; }
    if (entries.length >= MAX_ENTRIES) { setErr("limit"); return; }
    setErr("");
    setEntries([{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, type: kind, amount: a, category, note: note.trim().slice(0, 120), date }, ...entries]);
    setAmount(""); setNote("");
  };
  const remove = (id: string) => setEntries(entries.filter((e) => e.id !== id));
  const switchKind = (k: Kind) => { setKind(k); setCategory((k === "expense" ? EXPENSE_CATS : INCOME_CATS)[0].id); };

  const shown = filterMonth(entries, month).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1));
  const sum = summarize(shown);
  const cat = byCategory(shown);
  const months = monthsIn(entries);

  const exportCsv = () => {
    const blob = new Blob(["\uFEFF" + toCsv(shown)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `expenses-${month}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const clearAll = () => {
    if (!confirmClear) { setConfirmClear(true); return; }
    setEntries([]); setConfirmClear(false);
  };

  const errText = err === "amount" ? tr("সঠিক টাকার পরিমাণ লিখুন (০ এর বেশি)", "Enter a valid amount (above 0)")
    : err === "date" ? tr("তারিখ সিলেক্ট করুন", "Select a date")
    : err === "limit" ? tr(`সর্বোচ্চ ${MAX_ENTRIES}টি এন্ট্রি রাখা যায়`, `You can keep at most ${MAX_ENTRIES} entries`) : "";
  const tab = (on: boolean, color: string) => `flex-1 py-2 rounded-xl border text-sm ${on ? `${color} text-white border-transparent` : "border-slate-200 dark:border-slate-700 dark:text-white"}`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3"><p className="text-[11px] text-slate-500">{tr("আয়", "Income")}</p><p className="font-bold text-emerald-600 text-sm break-words">{taka(sum.income)}</p></div>
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-3"><p className="text-[11px] text-slate-500">{tr("খরচ", "Expense")}</p><p className="font-bold text-red-600 text-sm break-words">{taka(sum.expense)}</p></div>
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3"><p className="text-[11px] text-slate-500">{tr("ব্যালেন্স", "Balance")}</p><p className={`font-bold text-sm break-words ${sum.balance < 0 ? "text-red-600" : "text-indigo-600 dark:text-indigo-400"}`}>{taka(sum.balance)}</p></div>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
        <div className="flex gap-2">
          <button onClick={() => switchKind("expense")} className={tab(kind === "expense", "bg-red-500")}>{tr("খরচ", "Expense")}</button>
          <button onClick={() => switchKind("income")} className={tab(kind === "income", "bg-emerald-600")}>{tr("আয়", "Income")}</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs text-slate-500">{tr("টাকার পরিমাণ", "Amount")}</label><input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }} placeholder={tr("যেমন: 250", "e.g. 250")} className={input} /></div>
          <div><label className="text-xs text-slate-500">{tr("তারিখ", "Date")}</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-500">{tr("ক্যাটাগরি", "Category")}</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
              {cats.map((c) => <option key={c.id} value={c.id}>{tr(c.bn, c.en)}</option>)}
            </select>
          </div>
          <div><label className="text-xs text-slate-500">{tr("নোট (ঐচ্ছিক)", "Note (optional)")}</label><input value={note} onChange={(e) => setNote(e.target.value)} maxLength={120} className={input} /></div>
        </div>
        {errText && <p className="text-sm text-red-500">{errText}</p>}
        <button onClick={add} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> {tr("যোগ করুন", "Add")}</button>
      </div>

      <div className="flex gap-2 items-center">
        <select value={month} onChange={(e) => setMonth(e.target.value)} aria-label={tr("মাস", "Month")} className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm dark:text-white">
          <option value="all">{monthLabel("all")}</option>
          {months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
        </select>
        <button onClick={exportCsv} disabled={shown.length === 0} className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm flex items-center gap-1 dark:text-white disabled:opacity-40"><Download className="w-4 h-4" /> CSV</button>
      </div>

      {cat.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold dark:text-white">{tr("খরচের ভাগ", "Where the money went")}</h3>
          {cat.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between text-xs dark:text-slate-300"><span>{catLabel("expense", c.id)}</span><span>{taka(c.total)} ({c.pct}%)</span></div>
              <div className="h-2 rounded bg-slate-100 dark:bg-slate-700"><div className="h-full rounded bg-red-400" style={{ width: `${c.pct}%` }} /></div>
            </div>
          ))}
        </div>
      )}

      {shown.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">{entries.length === 0 ? tr("এখনো কোনো হিসাব নেই। উপরে যোগ করুন।", "No entries yet. Add one above.") : tr("এই মাসে কোনো হিসাব নেই।", "No entries for this month.")}</p>
      ) : (
        <ul className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
          {shown.map((e) => (
            <li key={e.id} className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium dark:text-white">{catLabel(e.type, e.category)} <span className="text-xs text-slate-400 font-normal">{e.date}</span></p>
                {e.note && <p className="text-xs text-slate-500 break-words">{e.note}</p>}
              </div>
              <span className={`text-sm font-semibold shrink-0 ${e.type === "income" ? "text-emerald-600" : "text-red-600"}`}>{e.type === "income" ? "+" : "-"}{e.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
              <button onClick={() => remove(e.id)} aria-label={tr("মুছুন", "Delete")} className="p-1.5 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
      )}

      {entries.length > 0 && (
        <button onClick={clearAll} className={`px-4 py-2.5 border rounded-xl text-sm flex items-center gap-1 ${confirmClear ? "bg-red-600 text-white border-red-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>
          <RotateCcw className="w-4 h-4" /> {confirmClear ? tr("নিশ্চিত? আবার ট্যাপ করুন, সব মুছে যাবে", "Sure? Tap again to delete everything") : tr("সব হিসাব মুছুন", "Delete all entries")}
        </button>
      )}
      <p className="text-xs text-slate-500">{tr("আপনার হিসাব শুধু এই ফোন/ব্রাউজারে সেভ থাকে, কোথাও পাঠানো হয় না। ব্রাউজারের ডেটা মুছলে হিসাবও মুছে যাবে, তাই দরকারে CSV ডাউনলোড করে রাখুন।", "Your entries are saved only on this phone/browser and are never sent anywhere. Clearing your browser data will delete them, so download a CSV if you want a backup.")}</p>
    </div>
  );
}
