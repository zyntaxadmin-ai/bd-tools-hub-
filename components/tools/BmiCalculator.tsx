"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function BmiCalculator() {
  const tr = useTr();
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"cm" | "ft">("cm");
  const [cm, setCm] = useState("");
  const [feet, setFeet] = useState("");
  const [inch, setInch] = useState("");

  const w = parseFloat(weight);
  const heightCm = unit === "cm" ? parseFloat(cm) : (parseFloat(feet || "0") * 12 + parseFloat(inch || "0")) * 2.54;
  const hasInput = weight !== "" && (unit === "cm" ? cm !== "" : feet !== "" || inch !== "");

  let error = "";
  let bmi: number | null = null;
  if (hasInput) {
    if (isNaN(w) || isNaN(heightCm)) error = tr("সঠিক সংখ্যা লিখুন", "Enter valid numbers");
    else if (w < 2 || w > 500) error = tr("ওজন ২ থেকে ৫০০ কেজির মধ্যে দিন", "Weight must be between 2 and 500 kg");
    else if (heightCm < 50 || heightCm > 250) error = tr("উচ্চতা ৫০ থেকে ২৫০ সেমির মধ্যে দিন", "Height must be between 50 and 250 cm");
    else {
      const m = heightCm / 100;
      bmi = w / (m * m);
    }
  }

  let category = "", badge = "";
  if (bmi !== null) {
    if (bmi < 18.5) { category = tr("কম ওজন", "Underweight"); badge = "bg-blue-500"; }
    else if (bmi < 25) { category = tr("স্বাভাবিক", "Normal"); badge = "bg-emerald-500"; }
    else if (bmi < 30) { category = tr("বেশি ওজন", "Overweight"); badge = "bg-amber-500"; }
    else { category = tr("স্থূলতা", "Obese"); badge = "bg-red-500"; }
  }
  const m2 = (heightCm / 100) * (heightCm / 100);
  const pos = bmi !== null ? Math.min(100, Math.max(0, ((bmi - 10) / 30) * 100)) : 0;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("ওজন (কেজি)", "Weight (kg)")}</label>
        <input type="number" inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={tr("যেমন: 65", "e.g. 65")} className={input} />
      </div>
      <div className="flex gap-2">
        <button onClick={() => setUnit("cm")} className={`flex-1 py-2 rounded-xl border text-sm ${unit === "cm" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("সেমি", "cm")}</button>
        <button onClick={() => setUnit("ft")} className={`flex-1 py-2 rounded-xl border text-sm ${unit === "ft" ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("ফুট + ইঞ্চি", "Feet + inches")}</button>
      </div>
      {unit === "cm" ? (
        <input type="number" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} placeholder={tr("উচ্চতা (সেমি) যেমন: 170", "Height (cm), e.g. 170")} className={input} />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <input type="number" inputMode="decimal" value={feet} onChange={(e) => setFeet(e.target.value)} placeholder={tr("ফুট", "Feet")} className={input} />
          <input type="number" inputMode="decimal" value={inch} onChange={(e) => setInch(e.target.value)} placeholder={tr("ইঞ্চি", "Inches")} className={input} />
        </div>
      )}
      <button onClick={() => { setWeight(""); setCm(""); setFeet(""); setInch(""); }} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {bmi !== null && (
        <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-500">{tr("আপনার BMI", "Your BMI")}</p>
          <p className="text-4xl font-bold dark:text-white">{bmi.toFixed(1)}</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${badge}`}>{category}</span>
          <div className="relative h-2 rounded-full mt-4 bg-gradient-to-r from-blue-500 via-emerald-500 via-60% to-red-500">
            <div style={{ left: `${pos}%` }} className="absolute -top-1 w-1.5 h-4 bg-slate-900 dark:bg-white rounded -translate-x-1/2" />
          </div>
          <p className="text-xs text-slate-500 mt-3">{tr("আপনার উচ্চতায় স্বাভাবিক ওজন:", "Normal weight for your height:")} {(18.5 * m2).toFixed(1)} – {(24.9 * m2).toFixed(1)} {tr("কেজি", "kg")}</p>
        </div>
      )}
      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">{tr("এটি আনুমানিক হিসাব, ডাক্তারের পরামর্শের বিকল্প নয়। শিশু, গর্ভবতী নারী ও খেলোয়াড়দের ক্ষেত্রে BMI সঠিক ফলাফল নাও দিতে পারে।", "This is an estimate and not a substitute for medical advice. BMI may not be accurate for children, pregnant women and athletes.")}</p>
    </div>
  );
}
