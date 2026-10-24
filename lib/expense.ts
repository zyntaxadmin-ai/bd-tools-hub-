export type Kind = "income" | "expense";
export type Entry = { id: string; type: Kind; amount: number; category: string; note: string; date: string };

export const EXPENSE_CATS = [
  { id: "food", bn: "খাবার", en: "Food" }, { id: "transport", bn: "যাতায়াত", en: "Transport" }, { id: "bills", bn: "বিল", en: "Bills" },
  { id: "rent", bn: "বাসা ভাড়া", en: "Rent" }, { id: "shopping", bn: "কেনাকাটা", en: "Shopping" }, { id: "health", bn: "স্বাস্থ্য", en: "Health" },
  { id: "education", bn: "শিক্ষা", en: "Education" }, { id: "mobile", bn: "মোবাইল/ইন্টারনেট", en: "Mobile/Internet" }, { id: "other", bn: "অন্যান্য", en: "Other" },
];
export const INCOME_CATS = [
  { id: "salary", bn: "বেতন", en: "Salary" }, { id: "business", bn: "ব্যবসা", en: "Business" }, { id: "gift", bn: "উপহার", en: "Gift" },
  { id: "other", bn: "অন্যান্য", en: "Other" },
];
export const MAX_ENTRIES = 2000;

export function parseAmount(s: string): number | null {
  if (s.trim() === "") return null;
  const n = Number(s);
  if (!isFinite(n) || n <= 0 || n > 1e9) return null;
  return Math.round(n * 100) / 100;
}

export function summarize(list: Entry[]) {
  let income = 0, expense = 0;
  for (const e of list) { if (e.type === "income") income += e.amount; else expense += e.amount; }
  income = Math.round(income * 100) / 100; expense = Math.round(expense * 100) / 100;
  return { income, expense, balance: Math.round((income - expense) * 100) / 100 };
}

export function byCategory(list: Entry[]): { id: string; total: number; pct: number }[] {
  const m = new Map<string, number>();
  let all = 0;
  for (const e of list) if (e.type === "expense") { m.set(e.category, (m.get(e.category) || 0) + e.amount); all += e.amount; }
  return Array.from(m, ([id, total]) => ({ id, total: Math.round(total * 100) / 100, pct: all ? Math.round((total / all) * 1000) / 10 : 0 }))
    .sort((a, b) => b.total - a.total);
}

export const monthOf = (date: string) => date.slice(0, 7);
export const filterMonth = (list: Entry[], month: string) => (month === "all" ? list : list.filter((e) => monthOf(e.date) === month));
export const monthsIn = (list: Entry[]) => Array.from(new Set(list.map((e) => monthOf(e.date)))).sort().reverse();

const csvCell = (v: string) => {
  let s = v;
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // stop spreadsheet formula injection
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
export function toCsv(list: Entry[]): string {
  const rows = ["date,type,category,amount,note", ...list.map((e) => [e.date, e.type, e.category, e.amount.toFixed(2), csvCell(e.note)].map((x, i) => (i === 4 ? x : csvCell(String(x)))).join(","))];
  return rows.join("\n");
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
export function sanitizeLoaded(raw: unknown): Entry[] {
  if (!Array.isArray(raw)) return [];
  const out: Entry[] = [];
  for (const x of raw) {
    if (!x || typeof x !== "object") continue;
    const e = x as Record<string, unknown>;
    if (typeof e.id !== "string" || (e.type !== "income" && e.type !== "expense") || typeof e.amount !== "number" || !isFinite(e.amount) || e.amount <= 0 ||
        typeof e.category !== "string" || typeof e.note !== "string" || typeof e.date !== "string" || !DATE_RE.test(e.date)) continue;
    out.push({ id: e.id, type: e.type, amount: e.amount, category: e.category.slice(0, 40), note: e.note.slice(0, 120), date: e.date });
    if (out.length >= MAX_ENTRIES) break;
  }
  return out;
}
