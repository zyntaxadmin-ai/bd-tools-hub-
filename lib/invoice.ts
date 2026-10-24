export type Item = { id: number; desc: string; qty: string; price: string };
export type Calc = {
  rows: { desc: string; qty: number; price: number; total: number }[];
  subtotal: number; discount: number; vatAmt: number; total: number; error: "" | "item" | "vat" | "discount";
};
const r2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const num = (s: string) => (s.trim() === "" ? NaN : Number(s));

export function calcInvoice(items: Item[], vatPct: string, discount: string): Calc {
  const rows: Calc["rows"] = [];
  let error: Calc["error"] = "";
  for (const it of items) {
    if (it.desc.trim() === "" && it.qty.trim() === "" && it.price.trim() === "") continue; // empty row
    const qty = num(it.qty), price = num(it.price);
    if (!isFinite(qty) || !isFinite(price) || qty <= 0 || price < 0 || qty > 1e7 || price > 1e9) { error = "item"; continue; }
    rows.push({ desc: it.desc.trim(), qty, price, total: r2(qty * price) });
  }
  const subtotal = r2(rows.reduce((a, r) => a + r.total, 0));
  const v = vatPct.trim() === "" ? 0 : Number(vatPct);
  const d = discount.trim() === "" ? 0 : Number(discount);
  if (!isFinite(v) || v < 0 || v > 100) error = error || "vat";
  if (!isFinite(d) || d < 0 || d > subtotal) error = error || "discount";
  const disc = isFinite(d) && d >= 0 && d <= subtotal ? r2(d) : 0;
  const vatRate = isFinite(v) && v >= 0 && v <= 100 ? v : 0;
  const vatAmt = r2((subtotal - disc) * vatRate / 100);
  return { rows, subtotal, discount: disc, vatAmt, total: r2(subtotal - disc + vatAmt), error };
}
export const money = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
