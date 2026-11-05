"use client";
import { useRef, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";

// Common 4.00 letter-grade scale used by many Bangladeshi universities (UGC style).
// Percentage ranges differ between universities, so the table is labelled as typical.
const GRADES: { g: string; point: number; range: string }[] = [
  { g: "A+", point: 4.0, range: "80-100" },
  { g: "A", point: 3.75, range: "75-79" },
  { g: "A-", point: 3.5, range: "70-74" },
  { g: "B+", point: 3.25, range: "65-69" },
  { g: "B", point: 3.0, range: "60-64" },
  { g: "B-", point: 2.75, range: "55-59" },
  { g: "C+", point: 2.5, range: "50-54" },
  { g: "C", point: 2.25, range: "45-49" },
  { g: "D", point: 2.0, range: "40-44" },
  { g: "F", point: 0, range: "0-39" },
];

type Mode = "course" | "semester";
type CourseRow = { id: number; grade: string; credit: string };
type SemRow = { id: number; gpa: string; credit: string };

const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";
const fmt = (n: number) => n.toFixed(2);

export default function CgpaCalculator() {
  const tr = useTr();
  const nextId = useRef(10);
  const [mode, setMode] = useState<Mode>("course");

  // course-wise mode
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, grade: "", credit: "3" },
    { id: 2, grade: "", credit: "3" },
    { id: 3, grade: "", credit: "3" },
    { id: 4, grade: "", credit: "3" },
  ]);
  const [prevCgpa, setPrevCgpa] = useState("");
  const [prevCredits, setPrevCredits] = useState("");

  // semester mode
  const [scale, setScale] = useState<4 | 5>(4);
  const [sems, setSems] = useState<SemRow[]>([
    { id: 1, gpa: "", credit: "" },
    { id: 2, gpa: "", credit: "" },
    { id: 3, gpa: "", credit: "" },
  ]);

  const tab = (active: boolean) =>
    `flex-1 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"}`;

  // ---- course-wise calculation ----
  let courseError = "";
  let cPoints = 0, cCredits = 0, cUsed = 0;
  for (const r of courses) {
    if (r.grade === "" && (r.credit === "" || r.credit === "3")) continue; // untouched row
    if (r.grade === "") { courseError = tr("প্রতিটি কোর্সের গ্রেড সিলেক্ট করুন", "Select a grade for every course"); break; }
    const c = parseFloat(r.credit);
    if (isNaN(c) || c <= 0 || c > 20) { courseError = tr("কোর্সের ক্রেডিট ০ এর বেশি ও ২০ এর কম দিন", "Course credits must be above 0 and at most 20"); break; }
    const point = GRADES.find((x) => x.g === r.grade)!.point;
    cPoints += point * c; cCredits += c; cUsed++;
  }
  const semesterGpa = !courseError && cUsed > 0 ? cPoints / cCredits : null;

  let prevError = "";
  let pC = 0, pCr = 0;
  const hasPrev = prevCgpa !== "" || prevCredits !== "";
  if (hasPrev) {
    pC = parseFloat(prevCgpa); pCr = parseFloat(prevCredits);
    if (isNaN(pC) || isNaN(pCr)) prevError = tr("আগের CGPA ও ক্রেডিট দুটোই দিন", "Enter both your previous CGPA and credits");
    else if (pC < 0 || pC > 4) prevError = tr("আগের CGPA ০ থেকে ৪.০০ এর মধ্যে দিন", "Previous CGPA must be between 0 and 4.00");
    else if (pCr <= 0 || pCr > 400) prevError = tr("আগের ক্রেডিট ০ এর বেশি ও ৪০০ এর কম দিন", "Previous credits must be above 0 and at most 400");
  }
  const cumulative = semesterGpa !== null && hasPrev && !prevError ? (semesterGpa * cCredits + pC * pCr) / (cCredits + pCr) : null;
  const cumulativeCredits = cumulative !== null ? cCredits + pCr : 0;

  // ---- semester-wise calculation ----
  let semError = "";
  let sPoints = 0, sCredits = 0, sUsed = 0;
  for (const r of sems) {
    if (r.gpa === "" && r.credit === "") continue;
    const g = parseFloat(r.gpa), c = parseFloat(r.credit);
    if (r.gpa === "" || r.credit === "" || isNaN(g) || isNaN(c)) { semError = tr("প্রতিটি সেমিস্টারের GPA ও ক্রেডিট দুটোই দিন", "Enter both GPA and credits for every semester"); break; }
    if (g < 0 || g > scale) { semError = tr(`GPA ০ থেকে ${scale}.০০ এর মধ্যে দিন`, `GPA must be between 0 and ${scale}.00`); break; }
    if (c <= 0 || c > 200) { semError = tr("ক্রেডিট ০ এর বেশি এবং ২০০ এর কম দিন", "Credits must be above 0 and at most 200"); break; }
    sPoints += g * c; sCredits += c; sUsed++;
  }
  const semCgpa = !semError && sUsed > 0 ? sPoints / sCredits : null;

  const resetCourse = () => { setCourses(courses.map((r) => ({ ...r, grade: "", credit: "3" }))); setPrevCgpa(""); setPrevCredits(""); };
  const resetSem = () => setSems(sems.map((r) => ({ ...r, gpa: "", credit: "" })));

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 rounded-xl border border-slate-200 dark:border-slate-700" role="tablist">
        <button role="tab" aria-selected={mode === "course"} onClick={() => setMode("course")} className={tab(mode === "course")}>{tr("কোর্স অনুযায়ী (গ্রেড)", "By course (grades)")}</button>
        <button role="tab" aria-selected={mode === "semester"} onClick={() => setMode("semester")} className={tab(mode === "semester")}>{tr("সেমিস্টার GPA থেকে", "From semester GPA")}</button>
      </div>

      {mode === "course" ? (
        <>
          <p className="text-sm text-slate-500">{tr("৪.০০ স্কেলে এই সেমিস্টারের কোর্স, গ্রেড ও ক্রেডিট দিন।", "Enter this semester's courses with grade and credits on the 4.00 scale.")}</p>
          <div className="space-y-3">
            {courses.map((r, i) => (
              <div key={r.id} className="flex items-end gap-2">
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-slate-500">{tr("কোর্স", "Course")} {i + 1} {tr("গ্রেড", "grade")}</label>
                  <select value={r.grade} onChange={(e) => setCourses(courses.map((x) => (x.id === r.id ? { ...x, grade: e.target.value } : x)))} className={input}>
                    <option value="">{tr("গ্রেড বাছুন", "Select grade")}</option>
                    {GRADES.map((g) => <option key={g.g} value={g.g}>{g.g} ({g.point.toFixed(2)})</option>)}
                  </select>
                </div>
                <div className="w-24 sm:w-32">
                  <label className="text-xs text-slate-500">{tr("ক্রেডিট", "Credits")}</label>
                  <input type="number" inputMode="decimal" min="0" value={r.credit} onChange={(e) => setCourses(courses.map((x) => (x.id === r.id ? { ...x, credit: e.target.value } : x)))} className={input} />
                </div>
                <button onClick={() => setCourses(courses.filter((x) => x.id !== r.id))} disabled={courses.length === 1} aria-label={tr("মুছুন", "Remove")} className="p-3 mb-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCourses([...courses, { id: nextId.current++, grade: "", credit: "3" }])} className="flex-1 py-3 border border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> {tr("কোর্স যোগ করুন", "Add course")}</button>
            <button onClick={resetCourse} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
            <p className="text-sm font-medium dark:text-white">{tr("আগের CGPA যোগ করুন (ঐচ্ছিক)", "Add your previous CGPA (optional)")}</p>
            <p className="text-xs text-slate-500 mt-1">{tr("আগের সেমিস্টারগুলোর CGPA ও মোট ক্রেডিট দিলে নতুন CGPA বেরিয়ে আসবে।", "Enter your CGPA and total credits so far to see your updated CGPA.")}</p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="text-xs text-slate-500">{tr("আগের CGPA", "Previous CGPA")}</label>
                <input type="number" inputMode="decimal" value={prevCgpa} onChange={(e) => setPrevCgpa(e.target.value)} placeholder="e.g. 3.40" className={input} />
              </div>
              <div>
                <label className="text-xs text-slate-500">{tr("আগের মোট ক্রেডিট", "Previous credits")}</label>
                <input type="number" inputMode="decimal" value={prevCredits} onChange={(e) => setPrevCredits(e.target.value)} placeholder="e.g. 45" className={input} />
              </div>
            </div>
          </div>

          {(courseError || prevError) && <p className="text-sm text-red-500">{courseError || prevError}</p>}
          {semesterGpa !== null && (
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 text-center" aria-live="polite">
              <p className="text-sm text-slate-500">{tr("এই সেমিস্টারের GPA", "This semester's GPA")}</p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(semesterGpa)}</p>
              <p className="text-xs text-slate-500 mt-2">{tr(`${cUsed}টি কোর্স, মোট ক্রেডিট ${Math.round(cCredits * 100) / 100}`, `${cUsed} ${cUsed === 1 ? "course" : "courses"}, total credits ${Math.round(cCredits * 100) / 100}`)}</p>
              {cumulative !== null && (
                <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-900">
                  <p className="text-sm text-slate-500">{tr("নতুন CGPA", "Updated CGPA")}</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(cumulative)}</p>
                  <p className="text-xs text-slate-500 mt-1">{tr(`মোট ক্রেডিট ${Math.round(cumulativeCredits * 100) / 100}`, `Total credits ${Math.round(cumulativeCredits * 100) / 100}`)}</p>
                </div>
              )}
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold dark:text-white mb-2">{tr("গ্রেড পয়েন্ট টেবিল (৪.০০ স্কেল)", "Grade point table (4.00 scale)")}</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <tr>
                    <th className="px-4 py-2 font-medium">{tr("গ্রেড", "Grade")}</th>
                    <th className="px-4 py-2 font-medium">{tr("পয়েন্ট", "Point")}</th>
                    <th className="px-4 py-2 font-medium">{tr("সাধারণ নম্বর", "Typical marks")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 dark:text-slate-200">
                  {GRADES.map((g) => (
                    <tr key={g.g}><td className="px-4 py-2 font-medium">{g.g}</td><td className="px-4 py-2">{g.point.toFixed(2)}</td><td className="px-4 py-2">{g.range}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2">{tr("এটি বাংলাদেশের অনেক বিশ্ববিদ্যালয়ে প্রচলিত স্কেল। নম্বরের সীমা বিশ্ববিদ্যালয়ভেদে আলাদা হতে পারে, তাই নিজের বিশ্ববিদ্যালয়ের গ্রেডিং সিস্টেম মিলিয়ে নিন।", "This is a scale used by many universities in Bangladesh. Mark ranges can differ between universities, so check your own university's grading system.")}</p>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <button onClick={() => setScale(4)} className={`flex-1 py-2 rounded-xl border text-sm ${scale === 4 ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("৪.০০ স্কেল", "4.00 scale")}</button>
            <button onClick={() => setScale(5)} className={`flex-1 py-2 rounded-xl border text-sm ${scale === 5 ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`}>{tr("৫.০০ স্কেল", "5.00 scale")}</button>
          </div>
          <div className="space-y-3">
            {sems.map((r, i) => (
              <div key={r.id} className="flex items-end gap-2">
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-slate-500">{tr("সেমিস্টার", "Semester")} {i + 1} GPA</label>
                  <input type="number" inputMode="decimal" value={r.gpa} onChange={(e) => setSems(sems.map((x) => (x.id === r.id ? { ...x, gpa: e.target.value } : x)))} placeholder={tr("যেমন: 3.50", "e.g. 3.50")} className={input} />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs text-slate-500">{tr("মোট ক্রেডিট", "Total credits")}</label>
                  <input type="number" inputMode="decimal" value={r.credit} onChange={(e) => setSems(sems.map((x) => (x.id === r.id ? { ...x, credit: e.target.value } : x)))} placeholder={tr("যেমন: 18", "e.g. 18")} className={input} />
                </div>
                <button onClick={() => setSems(sems.filter((x) => x.id !== r.id))} disabled={sems.length === 1} aria-label={tr("মুছুন", "Remove")} className="p-3 mb-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSems([...sems, { id: nextId.current++, gpa: "", credit: "" }])} className="flex-1 py-3 border border-dashed border-indigo-400 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> {tr("সেমিস্টার যোগ করুন", "Add semester")}</button>
            <button onClick={resetSem} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
          </div>
          {semError && <p className="text-sm text-red-500">{semError}</p>}
          {semCgpa !== null && (
            <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-5 text-center" aria-live="polite">
              <p className="text-sm text-slate-500">{tr("আপনার CGPA", "Your CGPA")}</p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{fmt(semCgpa)}</p>
              <p className="text-xs text-slate-500 mt-2">{tr(`${sUsed}টি সেমিস্টার, মোট ক্রেডিট ${Math.round(sCredits * 100) / 100} (স্কেল ${scale}.00)`, `${sUsed} ${sUsed === 1 ? "semester" : "semesters"}, total credits ${Math.round(sCredits * 100) / 100} (scale ${scale}.00)`)}</p>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-slate-500 border border-slate-200 dark:border-slate-700 rounded-xl p-3">{tr("হিসাব: CGPA = Σ(গ্রেড পয়েন্ট বা সেমিস্টার GPA × ক্রেডিট) ÷ মোট ক্রেডিট। রিটেক ও ইমপ্রুভমেন্টের নিয়ম বিশ্ববিদ্যালয়ভেদে আলাদা, তাই অফিসিয়াল ফলাফল আপনার বিশ্ববিদ্যালয় থেকে দেখুন।", "How it works: CGPA = Σ(grade point or semester GPA × credits) ÷ total credits. Retake and improvement rules differ between universities, so check the official result with your university.")}</p>
    </div>
  );
}
