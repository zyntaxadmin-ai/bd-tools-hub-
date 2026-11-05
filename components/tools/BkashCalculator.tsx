"use client";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// NOTE: Rates change. Verify on the bKash official site / app and edit the numbers below. Last checked: Oct 2026.
const AGENT_PER_1000 = 18.5; // 1.85% agent cash out (bKash app and *247#)
const ATM_PER_1000 = 14.9;   // cash out from partner bank ATMs
const SEND_PER_1000 = 0;     // Send Money is assumed free; above limits or other transfers a charge can apply

const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000];
const TABLE_AMOUNTS = [500, 1000, 2000, 3000, 5000, 10000, 20000];

type Mode = "charge" | "balance";
type Kind = "agent" | "atm" | "send" | "custom";

// en-US formatting on purpose, so the server and the browser print the same text.
const fmt = (n: number) => Number(n.toFixed(2)).toLocaleString("en-US");

export default function BkashCalculator() {
  const tr = useTr();
  const [mode, setMode] = useState<Mode>("charge");
  const [kind, setKind] = useState<Kind>("agent");
  const [custom, setCustom] = useState("");
  const [amount, setAmount] = useState("");

  // Charge per 1,000 taka for the selected type (NaN when a custom rate is missing or out of range).
  const per1000 = useMemo(() => {
    if (kind === "agent") return AGENT_PER_1000;
    if (kind === "atm") return ATM_PER_1000;
    if (kind === "send") return SEND_PER_1000;
    const r = parseFloat(custom);
    return custom !== "" && isFinite(r) && r >= 0 && r <= 100 ? r : NaN;
  }, [kind, custom]);

  const customInvalid = kind === "custom" && custom !== "" && isNaN(per1000);
  const amt = parseFloat(amount);
  const amountOk = amount !== "" && isFinite(amt) && amt > 0;

  const result = useMemo(() => {
    if (!amountOk || isNaN(per1000)) return null;
    if (mode === "charge") {
      const charge = (amt * per1000) / 1000;
      return { cash: amt, charge, total: amt + charge, left: 0 };
    }
    // balance mode: the charge is taken on top of the cash, so cash + cash * rate <= balance
    const cash = Math.floor((amt * 1000) / (1000 + per1000));
    const charge = (cash * per1000) / 1000;
    return { cash, charge, total: cash + charge, left: amt - cash - charge };
  }, [amountOk, amt, per1000, mode]);

  const reset = () => { setAmount(""); setCustom(""); };

  const field = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none";
  const tab = (active: boolean) =>
    `flex-1 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-[#E2136E] text-white" : "text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-950/20"}`;

  const tableRate = isNaN(per1000) ? AGENT_PER_1000 : per1000;

  return (
    <div>
      <div className="flex gap-1 p-1 rounded-xl border border-slate-200 dark:border-slate-700 mb-4" role="tablist">
        <button role="tab" aria-selected={mode === "charge"} onClick={() => setMode("charge")} className={tab(mode === "charge")}>
          {tr("চার্জ কত কাটবে", "Find the charge")}
        </button>
        <button role="tab" aria-selected={mode === "balance"} onClick={() => setMode("balance")} className={tab(mode === "balance")}>
          {tr("ব্যালেন্স থেকে কত তোলা যাবে", "Cash out from my balance")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bkash-amount" className="text-sm font-medium dark:text-slate-200">
            {mode === "charge" ? tr("ক্যাশ আউটের টাকা (BDT)", "Cash out amount (BDT)") : tr("আপনার bKash ব্যালেন্স (BDT)", "Your bKash balance (BDT)")}
          </label>
          <input id="bkash-amount" type="number" inputMode="decimal" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 5000" className={field} />
        </div>
        <div>
          <label htmlFor="bkash-kind" className="text-sm font-medium dark:text-slate-200">{tr("লেনদেনের ধরন", "Transaction type")}</label>
          <select id="bkash-kind" value={kind} onChange={(e) => setKind(e.target.value as Kind)} className={field}>
            <option value="agent">{tr("এজেন্ট ক্যাশ আউট", "Agent cash out")} ({AGENT_PER_1000} TK / 1000)</option>
            <option value="atm">{tr("এটিএম ক্যাশ আউট", "ATM cash out")} ({ATM_PER_1000} TK / 1000)</option>
            <option value="send">{tr("Send Money (চার্জ ০ ধরা)", "Send Money (charge assumed 0)")}</option>
            <option value="custom">{tr("নিজে রেট দিন (প্রিয় এজেন্ট, অফার)", "Enter my own rate (Priyo agent, offers)")}</option>
          </select>
        </div>
        {kind === "custom" && (
          <div className="sm:col-span-2">
            <label htmlFor="bkash-custom" className="text-sm font-medium dark:text-slate-200">{tr("প্রতি ১০০০ টাকায় চার্জ (TK)", "Charge per 1,000 taka (TK)")}</label>
            <input id="bkash-custom" type="number" inputMode="decimal" min="0" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. 14.9" className={field} />
            {customInvalid && <p className="text-sm text-red-500 mt-2">{tr("০ থেকে ১০০ এর মধ্যে সঠিক রেট লিখুন", "Enter a valid rate between 0 and 100")}</p>}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {QUICK_AMOUNTS.map((q) => (
          <button key={q} type="button" onClick={() => setAmount(String(q))} className="px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-400 hover:text-[#E2136E]">
            {q.toLocaleString("en-US")}
          </button>
        ))}
        <button onClick={reset} aria-label="Reset" className="ml-auto px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full dark:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
      </div>

      {amount !== "" && !amountOk && <p className="text-sm text-red-500 mt-3">{tr("সঠিক টাকার পরিমাণ লিখুন", "Enter a valid amount in taka")}</p>}

      {result && (
        <div className="mt-6 bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900 rounded-xl p-5" aria-live="polite">
          {mode === "balance" && (
            <div className="flex justify-between text-sm"><span className="text-slate-600 dark:text-slate-400">{tr("আপনার ব্যালেন্স", "Your balance")}</span><span className="font-semibold dark:text-white">{fmt(amt)} TK</span></div>
          )}
          <div className={`flex justify-between text-sm ${mode === "balance" ? "mt-2" : ""}`}>
            <span className="text-slate-600 dark:text-slate-400">{mode === "balance" ? tr("সর্বোচ্চ তোলা যাবে (নগদ হাতে)", "Most you can cash out (in hand)") : tr("ক্যাশ আউটের টাকা", "Cash out amount")}</span>
            <span className="font-semibold dark:text-white">{fmt(result.cash)} TK</span>
          </div>
          <div className="flex justify-between text-sm mt-2"><span className="text-slate-600 dark:text-slate-400">{tr("চার্জ", "Charge")} ({fmt(per1000)} TK / 1000)</span><span className="font-semibold text-[#E2136E]">{fmt(result.charge)} TK</span></div>
          <div className="h-px bg-pink-200 dark:bg-pink-900 my-3"></div>
          <div className="flex justify-between font-bold text-lg dark:text-white"><span>{tr("মোট কাটবে", "Total deducted")}</span><span className="text-[#E2136E]">{fmt(result.total)} TK</span></div>
          {mode === "balance" && (
            <p className="text-xs text-slate-500 mt-2 text-center">{tr(`ব্যালেন্সে বাকি থাকবে প্রায় ${fmt(result.left)} টাকা।`, `About ${fmt(result.left)} taka stays in your balance.`)}</p>
          )}
          <p className="text-xs text-slate-500 mt-2 text-center">{tr("চার্জ পরিবর্তন হতে পারে। অফিসিয়াল bKash চার্জ চার্ট দেখে নিশ্চিত হোন।", "Charges may change. Confirm with the official bKash charge chart.")}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-sm font-semibold dark:text-white mb-2">{tr(`কত টাকায় কত চার্জ (প্রতি ১০০০ টাকায় ${fmt(tableRate)})`, `Charge at common amounts (${fmt(tableRate)} per 1,000)`)}</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <th className="px-4 py-2 font-medium">{tr("ক্যাশ আউট", "Cash out")}</th>
                <th className="px-4 py-2 font-medium">{tr("চার্জ", "Charge")}</th>
                <th className="px-4 py-2 font-medium">{tr("মোট কাটবে", "Total deducted")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 dark:text-slate-200">
              {TABLE_AMOUNTS.map((a) => {
                const c = (a * tableRate) / 1000;
                return (
                  <tr key={a}>
                    <td className="px-4 py-2">{fmt(a)} TK</td>
                    <td className="px-4 py-2 text-[#E2136E] font-medium">{fmt(c)} TK</td>
                    <td className="px-4 py-2">{fmt(a + c)} TK</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-4">{tr("Cash Out রেট (এজেন্ট ও এটিএম) শেষ দেখা হয়েছে অক্টোবর ২০২৬-এ। Send Money-তে এই টুল চার্জ ০ ধরে, সীমা ছাড়ালে বা অন্য ধরনের লেনদেনে চার্জ লাগতে পারে।", "The Cash Out rates (agent and ATM) were last checked in October 2026. For Send Money this tool assumes a charge of 0. A charge can apply above limits or for other kinds of transfer.")}</p>
    </div>
  );
}
