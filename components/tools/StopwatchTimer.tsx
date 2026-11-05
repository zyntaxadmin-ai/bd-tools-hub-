"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Flag, Maximize, Minimize } from "lucide-react";
import { useTr } from "@/lib/lang";

const input = "w-full mt-1 px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-center";
const tab = (on: boolean) => `flex-1 py-2 rounded-xl border text-sm ${on ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 dark:border-slate-700 dark:text-white"}`;
const p2 = (n: number) => String(n).padStart(2, "0");

function fmtSw(ms: number) {
  const cs = Math.floor(ms / 10) % 100;
  const t = Math.floor(ms / 1000);
  const s = t % 60, m = Math.floor(t / 60) % 60, h = Math.floor(t / 3600);
  return `${h > 0 ? p2(h) + ":" : ""}${p2(m)}:${p2(s)}.${p2(cs)}`;
}
function fmtTimer(ms: number) {
  const t = Math.ceil(ms / 1000);
  return `${p2(Math.floor(t / 3600))}:${p2(Math.floor(t / 60) % 60)}:${p2(t % 60)}`;
}

const ERR_EN: Record<string, string> = {
  "০ বা ধনাত্মক পূর্ণসংখ্যা দিন": "Enter 0 or a positive whole number",
  "সময় ০ এর বেশি দিন": "Time must be more than 0",
  "সর্বোচ্চ ৯৯ ঘণ্টা": "Maximum 99 hours"
};

function errEn(m: string): string {
  if (ERR_EN[m]) return ERR_EN[m];
  return m;
}

function Stopwatch() {
  const tr = useTr();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<{ n: number; split: number; total: number }[]>([]);
  const startRef = useRef(0);
  const baseRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(baseRef.current + Date.now() - startRef.current), 30);
    return () => clearInterval(id);
  }, [running]);

  const start = () => { startRef.current = Date.now(); setRunning(true); };
  const pause = () => { baseRef.current += Date.now() - startRef.current; setElapsed(baseRef.current); setRunning(false); };
  const reset = () => { baseRef.current = 0; setElapsed(0); setLaps([]); setRunning(false); };
  const lap = () => {
    const prev = laps.length ? laps[0].total : 0;
    setLaps([{ n: laps.length + 1, split: elapsed - prev, total: elapsed }, ...laps]);
  };

  // Keyboard shortcuts: Space = start/pause, L = lap, R = reset. Handlers are read from a ref so the listener is added only once.
  const actions = useRef({ running, start, pause, lap, reset });
  actions.current = { running, start, pause, lap, reset };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t?.isContentEditable) return;
      const a = actions.current;
      if (e.code === "Space") {
        if (tag === "BUTTON") return; // the focused button handles Space itself
        e.preventDefault();
        if (a.running) a.pause(); else a.start();
      } else if (e.key === "l" || e.key === "L") {
        if (a.running) a.lap();
      } else if (e.key === "r" || e.key === "R") {
        a.reset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-center text-5xl sm:text-7xl font-mono font-bold dark:text-white tabular-nums">{fmtSw(elapsed)}</p>
      <div className="flex gap-3">
        {running ? (
          <button onClick={pause} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Pause className="w-4 h-4" /> Pause</button>
        ) : (
          <button onClick={start} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {elapsed > 0 ? "Resume" : "Start"}</button>
        )}
        <button onClick={lap} disabled={!running} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white disabled:opacity-40"><Flag className="w-4 h-4" /> Lap</button>
        <button onClick={reset} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
          {laps.map((l) => (
            <div key={l.n} className="flex justify-between px-4 py-2 text-sm font-mono dark:text-slate-200"><span>Lap {l.n}</span><span>{fmtSw(l.split)}</span><span className="text-slate-500">{fmtSw(l.total)}</span></div>
          ))}
        </div>
      )}
      <p className="hidden sm:block text-xs text-center text-slate-500">{tr("শর্টকাট: Space = Start/Pause, L = Lap, R = Reset", "Shortcuts: Space = Start/Pause, L = Lap, R = Reset")}</p>
    </div>
  );
}

function Timer() {
  const tr = useTr();
  const E = (m: string) => tr(m, errEn(m));
  const [h, setH] = useState("");
  const [m, setM] = useState("5");
  const [s, setS] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "paused" | "done">("idle");
  const [remaining, setRemaining] = useState(0);
  const [error, setError] = useState("");
  const endRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const beep = () => {
    try {
      const ctx = audioRef.current;
      if (ctx) {
        for (let i = 0; i < 3; i++) {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
          const t0 = ctx.currentTime + i * 0.5;
          g.gain.setValueAtTime(0.2, t0); g.gain.setValueAtTime(0, t0 + 0.3);
          o.start(t0); o.stop(t0 + 0.35);
        }
      }
      if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate([300, 150, 300, 150, 300]);
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => {
      const rem = endRef.current - Date.now();
      if (rem <= 0) { setRemaining(0); setStatus("done"); beep(); }
      else setRemaining(rem);
    }, 100);
    return () => clearInterval(id);
  }, [status]);

  const total = ((parseInt(h || "0", 10) || 0) * 3600 + (parseInt(m || "0", 10) || 0) * 60 + (parseInt(s || "0", 10) || 0)) * 1000;

  const start = () => {
    if (!audioRef.current) {
      try {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AC) audioRef.current = new AC();
      } catch { /* ignore */ }
    }
    if (audioRef.current?.state === "suspended") audioRef.current.resume().catch(() => {});
    let ms = remaining;
    if (status === "idle" || status === "done") {
      const nums = [h, m, s].map((x) => (x === "" ? 0 : Number(x)));
      if (nums.some((x) => !Number.isInteger(x) || x < 0)) { setError("০ বা ধনাত্মক পূর্ণসংখ্যা দিন"); return; }
      if (total <= 0) { setError("সময় ০ এর বেশি দিন"); return; }
      if (total > 99 * 3600 * 1000) { setError("সর্বোচ্চ ৯৯ ঘণ্টা"); return; }
      ms = total;
    }
    setError("");
    endRef.current = Date.now() + ms;
    setRemaining(ms);
    setStatus("running");
  };
  const pause = () => { setRemaining(Math.max(0, endRef.current - Date.now())); setStatus("paused"); };
  const reset = () => { setStatus("idle"); setRemaining(0); setError(""); };

  const setPreset = (mins: number) => {
    setH(mins >= 60 ? String(Math.floor(mins / 60)) : "");
    setM(mins % 60 ? String(mins % 60) : "");
    setS("");
    setError("");
  };

  const showInputs = status === "idle" || status === "done";
  return (
    <div className="space-y-4">
      {showInputs && (
        <div className="flex flex-wrap gap-2">
          {[1, 5, 10, 15, 30, 60].map((mins) => (
            <button key={mins} type="button" onClick={() => setPreset(mins)} className="px-3 py-1.5 text-xs rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600">
              {mins >= 60 ? tr("১ ঘণ্টা", "1 hour") : tr(`${mins} মিনিট`, `${mins} min`)}
            </button>
          ))}
        </div>
      )}
      {showInputs ? (
        <div className="grid grid-cols-3 gap-3">
          <div><label className="text-xs text-slate-500">{tr("ঘণ্টা", "Hours")}</label><input type="number" inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="0" className={input} /></div>
          <div><label className="text-xs text-slate-500">{tr("মিনিট", "Minutes")}</label><input type="number" inputMode="numeric" value={m} onChange={(e) => setM(e.target.value)} placeholder="0" className={input} /></div>
          <div><label className="text-xs text-slate-500">{tr("সেকেন্ড", "Seconds")}</label><input type="number" inputMode="numeric" value={s} onChange={(e) => setS(e.target.value)} placeholder="0" className={input} /></div>
        </div>
      ) : (
        <p className="text-center text-5xl font-mono font-bold dark:text-white tabular-nums">{fmtTimer(remaining)}</p>
      )}
      {status === "done" && <p className="text-center text-lg font-bold text-red-500">{tr("সময় শেষ!", "Time's up!")}</p>}
      {error && <p className="text-sm text-red-500">{E(error)}</p>}
      <div className="flex gap-3">
        {status === "running" ? (
          <button onClick={pause} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Pause className="w-4 h-4" /> Pause</button>
        ) : (
          <button onClick={start} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {status === "paused" ? "Resume" : "Start"}</button>
        )}
        <button onClick={reset} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      <p className="text-xs text-slate-500">{tr("সময় শেষে বিপ শব্দ হয় ও ফোন কাঁপে (ব্রাউজার সাপোর্ট করলে)। টাইমার চলাকালীন পেজটি খোলা রাখুন, স্ক্রিন লক বা ট্যাব বন্ধ করলে শব্দ নাও হতে পারে।", "A beep sounds and your phone vibrates when time is up (if your browser supports it). Keep this page open while the timer runs, because a locked screen or closed tab may stop the sound.")}</p>
    </div>
  );
}

export default function StopwatchTimer() {
  const tr = useTr();
  const [mode, setMode] = useState<"sw" | "timer">("sw");
  const boxRef = useRef<HTMLDivElement>(null);
  const [fs, setFs] = useState(false);
  const [fsOk, setFsOk] = useState(false);

  useEffect(() => {
    setFsOk(typeof document !== "undefined" && !!document.documentElement.requestFullscreen);
    const onChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFs = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else boxRef.current?.requestFullscreen().catch(() => {});
    } catch { /* ignore */ }
  };

  return (
    <div ref={boxRef} className={fs ? "bg-white dark:bg-slate-900 p-6 sm:p-12 flex flex-col justify-center min-h-screen space-y-5" : "space-y-5"}>
      <div className="flex gap-2">
        <button onClick={() => setMode("sw")} className={tab(mode === "sw")}>{tr("স্টপওয়াচ", "Stopwatch")}</button>
        <button onClick={() => setMode("timer")} className={tab(mode === "timer")}>{tr("কাউন্টডাউন টাইমার", "Countdown timer")}</button>
        {fsOk && (
          <button onClick={toggleFs} aria-label={fs ? tr("ফুলস্ক্রিন বন্ধ করুন", "Exit full screen") : tr("ফুলস্ক্রিন", "Full screen")} className="px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600">
            {fs ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        )}
      </div>
      {mode === "sw" ? <Stopwatch /> : <Timer />}
    </div>
  );
}
