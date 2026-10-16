"use client";
import { useState, useEffect, useCallback } from "react";
import { KeyRound, Copy, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [num, setNum] = useState(true);
  const [sym, setSym] = useState(false);
  const [noConfusing, setNoConfusing] = useState(false);
  const [pass, setPass] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if(upper) chars += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if(lower) chars += "abcdefghijkmnpqrstuvwxyz";
    if(num) chars += "23456789";
    if(sym) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if(!upper) chars = chars.replace(/[A-Z]/g,"");
    if(noConfusing) chars = chars.replace(/[0OIl1]/g,"");
    if(!chars) { setPass(""); return; }
    if(!upper && !lower && !num && !sym) return;
    // crypto.getRandomValues use
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let p = "";
    for(let i=0; i<len; i++) p += chars[arr[i] % chars.length];
    setPass(p);
  }, [len, upper, lower, num, sym, noConfusing]);

  useEffect(()=>{ generate(); }, [generate]);

  const strength = len <12 ? "দুর্বল" : len <20 && (upper && lower && num) ? "মজবুত" : len>=20 ? "খুব মজবুত" : "মাঝারি";
  const color = len <12 ? "bg-red-500" : len <16 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white"><KeyRound className="text-indigo-600"/> পাসওয়ার্ড জেনারেটর</h2>
      
      <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg flex items-center gap-2 border dark:border-slate-700">
        <p className="flex-1 font-mono text-lg break-all dark:text-white">{pass || "একটি অপশন সিলেক্ট করুন"}</p>
        <button onClick={()=>{navigator.clipboard.writeText(pass); setCopied(true); setTimeout(()=>setCopied(false),1500)}} className="p-2 bg-indigo-600 text-white rounded-lg"><Copy size={18}/></button>
        <button onClick={generate} className="p-2 bg-white dark:bg-slate-700 border rounded-lg dark:text-white"><RefreshCw size={18}/></button>
      </div>
      {copied && <p className="text-xs text-green-600">Copied!</p>}
      
      <div>
        <label className="text-sm dark:text-white">দৈর্ঘ্য: {len}</label>
        <input type="range" min={8} max={64} value={len} onChange={e=>setLen(parseInt(e.target.value))} className="w-full accent-indigo-600" />
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1"><div className={`h-full rounded-full ${color}`} style={{width: `${(len/64)*100}%`}}></div></div>
        <p className="text-xs dark:text-slate-300">শক্তি: {strength}</p>
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm dark:text-white">
        <label className="flex gap-2 items-center"><input type="checkbox" checked={upper} onChange={e=>setUpper(e.target.checked)}/> UPPERCASE (A-Z)</label>
        <label className="flex gap-2 items-center"><input type="checkbox" checked={lower} onChange={e=>setLower(e.target.checked)}/> lowercase (a-z)</label>
        <label className="flex gap-2 items-center"><input type="checkbox" checked={num} onChange={e=>setNum(e.target.checked)}/> Number (0-9)</label>
        <label className="flex gap-2 items-center"><input type="checkbox" checked={sym} onChange={e=>setSym(e.target.checked)}/> Symbol (!@#)</label>
        <label className="flex gap-2 items-center"><input type="checkbox" checked={noConfusing} onChange={e=>setNoConfusing(e.target.checked)}/> confusing character বাদ (0/O/l/1)</label>
      </div>
      {(!upper && !lower && !num && !sym) && <p className="text-sm text-red-600">কমপক্ষে ১টি অপশন সিলেক্ট করুন</p>}
      <p className="text-xs text-slate-500 dark:text-slate-400 border p-2 rounded-lg">পাসওয়ার্ড আপনার ব্রাউজারেই তৈরি হয়, কোথাও সেভ বা পাঠানো হয় না।</p>
    </div>
  );
  }
