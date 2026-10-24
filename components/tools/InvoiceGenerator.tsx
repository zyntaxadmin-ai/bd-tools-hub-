"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Printer } from "lucide-react";
import { useTr } from "@/lib/lang";
import { Item, calcInvoice, money } from "@/lib/invoice";

const KEY = "bdtoolshub-invoice-seller-v1";
const CURRENCIES = ["Tk", "৳", "$", "€", "£", "SAR", "INR"];
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const p2 = (n: number) => String(n).padStart(2, "0");
const PRINT_CSS = `@page { margin: 12mm; }
@media print { body * { visibility: hidden !important; } #invoice-print, #invoice-print * { visibility: visible !important; } #invoice-print { position: absolute; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; } }
@media print {
  html, body { background: #fff !important; }
  body :not(#invoice-print):not(#invoice-print *):not(:has(#invoice-print)) { display: none !important; }
  body :has(#invoice-print) { border: 0 !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; background: transparent !important; max-width: none !important; }
  #invoice-print { position: static !important; }
}`;

export default function InvoiceGenerator() {
  const tr = useTr();
  const nextId = useRef(2);
  const [loaded, setLoaded] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerAddr, setSellerAddr] = useState("");
  const [sellerContact, setSellerContact] = useState("");
  const [currency, setCurrency] = useState("Tk");
  const [clientName, setClientName] = useState("");
  const [clientAddr, setClientAddr] = useState("");
  const [invNo, setInvNo] = useState("INV-001");
  const [invDate, setInvDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<Item[]>([{ id: 1, desc: "", qty: "1", price: "" }]);
  const [vat, setVat] = useState("");
  const [discount, setDiscount] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const o = JSON.parse(raw);
        if (typeof o?.name === "string") setSellerName(o.name.slice(0, 80));
        if (typeof o?.addr === "string") setSellerAddr(o.addr.slice(0, 200));
        if (typeof o?.contact === "string") setSellerContact(o.contact.slice(0, 120));
        if (typeof o?.currency === "string" && CURRENCIES.includes(o.currency)) setCurrency(o.currency);
      }
    } catch { /* ignore */ }
    const d = new Date();
    setInvDate(`${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify({ name: sellerName, addr: sellerAddr, contact: sellerContact, currency })); } catch { /* ignore */ }
  }, [loaded, sellerName, sellerAddr, sellerContact, currency]);

  const upd = (id: number, f: "desc" | "qty" | "price", v: string) => setItems(items.map((i) => (i.id === id ? { ...i, [f]: v } : i)));
  const addItem = () => { if (items.length < 50) setItems([...items, { id: nextId.current++, desc: "", qty: "1", price: "" }]); };
  const delItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const c = calcInvoice(items, vat, discount);
  const cur = (n: number) => `${currency} ${money(n)}`;
  const errText = c.error === "item" ? tr("প্রতিটি আইটেমে পরিমাণ ০ এর বেশি এবং দাম সঠিক দিন", "Each item needs a quantity above 0 and a valid price")
    : c.error === "vat" ? tr("ভ্যাট ০ থেকে ১০০% এর মধ্যে দিন", "VAT must be between 0 and 100%")
    : c.error === "discount" ? tr("ছাড় ০ থেকে সাবটোটালের মধ্যে দিন", "Discount must be between 0 and the subtotal") : "";
  const lbl = "text-xs text-slate-500";

  return (
    <div className="space-y-6">
      <style>{PRINT_CSS}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <h3 className="font-semibold text-sm dark:text-white">{tr("আপনার তথ্য (প্রেরক)", "Your details (seller)")}</h3>
          <div><label className={lbl}>{tr("নাম / প্রতিষ্ঠান", "Name / business")}</label><input value={sellerName} onChange={(e) => setSellerName(e.target.value)} maxLength={80} className={input} /></div>
          <div><label className={lbl}>{tr("ঠিকানা", "Address")}</label><textarea value={sellerAddr} onChange={(e) => setSellerAddr(e.target.value)} rows={2} maxLength={200} className={`${input} resize-none`} /></div>
          <div><label className={lbl}>{tr("ফোন / ইমেইল", "Phone / email")}</label><input value={sellerContact} onChange={(e) => setSellerContact(e.target.value)} maxLength={120} className={input} /></div>
        </div>
        <div className="space-y-3 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
          <h3 className="font-semibold text-sm dark:text-white">{tr("গ্রাহকের তথ্য", "Client details")}</h3>
          <div><label className={lbl}>{tr("নাম / প্রতিষ্ঠান", "Name / business")}</label><input value={clientName} onChange={(e) => setClientName(e.target.value)} maxLength={80} className={input} /></div>
          <div><label className={lbl}>{tr("ঠিকানা", "Address")}</label><textarea value={clientAddr} onChange={(e) => setClientAddr(e.target.value)} rows={2} maxLength={200} className={`${input} resize-none`} /></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div><label className={lbl}>{tr("ইনভয়েস নং", "Invoice no.")}</label><input value={invNo} onChange={(e) => setInvNo(e.target.value)} maxLength={30} className={input} /></div>
        <div><label className={lbl}>{tr("তারিখ", "Date")}</label><input type="date" value={invDate} onChange={(e) => setInvDate(e.target.value)} className={input} /></div>
        <div><label className={lbl}>{tr("পরিশোধের শেষ তারিখ", "Due date")}</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={input} /></div>
        <div><label className={lbl}>{tr("মুদ্রা", "Currency")}</label><select value={currency} onChange={(e) => setCurrency(e.target.value)} className={input}>{CURRENCIES.map((x) => <option key={x} value={x}>{x}</option>)}</select></div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-sm dark:text-white">{tr("আইটেম", "Items")}</h3>
        {items.map((it) => (
          <div key={it.id} className="grid grid-cols-[1fr_64px_88px_auto] gap-2 items-end">
            <input value={it.desc} onChange={(e) => upd(it.id, "desc", e.target.value)} placeholder={tr("বিবরণ", "Description")} maxLength={120} className={input} />
            <input type="number" inputMode="decimal" value={it.qty} onChange={(e) => upd(it.id, "qty", e.target.value)} placeholder={tr("পরিমাণ", "Qty")} className={input} />
            <input type="number" inputMode="decimal" value={it.price} onChange={(e) => upd(it.id, "price", e.target.value)} placeholder={tr("দাম", "Price")} className={input} />
            <button onClick={() => delItem(it.id)} disabled={items.length === 1} aria-label={tr("মুছুন", "Remove")} className="p-3 mb-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={addItem} className="w-full py-2.5 border border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> {tr("আইটেম যোগ করুন", "Add item")}</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>{tr("ভ্যাট (%)", "VAT (%)")}</label><input type="number" inputMode="decimal" value={vat} onChange={(e) => setVat(e.target.value)} placeholder="0" className={input} /></div>
        <div><label className={lbl}>{tr("ছাড় (টাকা)", "Discount (amount)")}</label><input type="number" inputMode="decimal" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0" className={input} /></div>
      </div>
      <div><label className={lbl}>{tr("নোট / পেমেন্টের তথ্য (ঐচ্ছিক)", "Notes / payment details (optional)")}</label><textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={300} className={`${input} resize-none`} /></div>
      {errText && <p className="text-sm text-red-500">{errText}</p>}

      <div id="invoice-print" className="bg-white text-slate-900 border border-slate-300 rounded-xl p-5 sm:p-8 shadow-sm">
        <div className="flex justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <p className="text-2xl font-bold tracking-wide">{tr("ইনভয়েস", "INVOICE")}</p>
            <p className="text-sm text-slate-600 break-words">{invNo}</p>
          </div>
          <div className="text-sm text-right min-w-0">
            <p className="font-semibold break-words">{sellerName || tr("আপনার নাম", "Your name")}</p>
            <p className="whitespace-pre-line text-slate-600 break-words">{sellerAddr}</p>
            <p className="text-slate-600 break-words">{sellerContact}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div className="min-w-0">
            <p className="text-xs uppercase text-slate-500">{tr("গ্রাহক", "Bill to")}</p>
            <p className="font-semibold break-words">{clientName || "-"}</p>
            <p className="whitespace-pre-line text-slate-600 break-words">{clientAddr}</p>
          </div>
          <div className="text-right">
            <p><span className="text-slate-500">{tr("তারিখ", "Date")}:</span> {invDate || "-"}</p>
            <p><span className="text-slate-500">{tr("শেষ তারিখ", "Due")}:</span> {dueDate || "-"}</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm min-w-[420px]">
            <thead><tr className="border-b-2 border-slate-300 text-left"><th className="py-2">{tr("বিবরণ", "Description")}</th><th className="py-2 text-right">{tr("পরিমাণ", "Qty")}</th><th className="py-2 text-right">{tr("দাম", "Price")}</th><th className="py-2 text-right">{tr("মোট", "Amount")}</th></tr></thead>
            <tbody>
              {c.rows.length === 0 ? (
                <tr><td colSpan={4} className="py-4 text-center text-slate-400">{tr("আইটেম যোগ করুন", "Add items above")}</td></tr>
              ) : c.rows.map((r, i) => (
                <tr key={i} className="border-b border-slate-200"><td className="py-2 break-words">{r.desc || "-"}</td><td className="py-2 text-right">{r.qty}</td><td className="py-2 text-right">{money(r.price)}</td><td className="py-2 text-right">{money(r.total)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 ml-auto w-full sm:w-64 text-sm space-y-1">
          <div className="flex justify-between"><span>{tr("সাবটোটাল", "Subtotal")}</span><span>{cur(c.subtotal)}</span></div>
          {c.discount > 0 && <div className="flex justify-between"><span>{tr("ছাড়", "Discount")}</span><span>- {cur(c.discount)}</span></div>}
          {c.vatAmt > 0 && <div className="flex justify-between"><span>{tr("ভ্যাট", "VAT")} ({vat}%)</span><span>{cur(c.vatAmt)}</span></div>}
          <div className="flex justify-between font-bold text-base border-t-2 border-slate-300 pt-2"><span>{tr("সর্বমোট", "Total")}</span><span>{cur(c.total)}</span></div>
        </div>
        {notes && <p className="mt-6 text-sm text-slate-600 whitespace-pre-line break-words"><span className="font-semibold text-slate-900">{tr("নোট", "Notes")}:</span> {notes}</p>}
      </div>

      <button onClick={() => window.print()} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Printer className="w-4 h-4" /> {tr("প্রিন্ট / PDF হিসেবে সেভ করুন", "Print / Save as PDF")}</button>
      <p className="text-xs text-slate-500">{tr("প্রিন্ট উইন্ডোতে \"Save as PDF\" বেছে নিলে PDF ফাইল পাবেন। আপনার তথ্য কোথাও পাঠানো হয় না; শুধু প্রেরকের তথ্য ও মুদ্রা পরের বার সুবিধার জন্য এই ব্রাউজারে সেভ থাকে।", "Choose \"Save as PDF\" in the print window to get a PDF file. Your details are not sent anywhere; only the seller details and currency are remembered in this browser for next time.")}</p>
    </div>
  );
}
