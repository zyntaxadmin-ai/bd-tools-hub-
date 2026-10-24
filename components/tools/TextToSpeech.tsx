"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, RotateCcw } from "lucide-react";
import { useTr } from "@/lib/lang";
import { chunkText, hasBangla } from "@/lib/tts";

type Status = "idle" | "speaking" | "paused";
const MAX = 5000;
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function TextToSpeech() {
  const tr = useTr();
  const [text, setText] = useState("");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("auto");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const keepRef = useRef<SpeechSynthesisUtterance[]>([]); // keep references so the browser does not drop them

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { setSupported(false); return; }
    setSupported(true);
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => { window.speechSynthesis.removeEventListener("voiceschanged", load); window.speechSynthesis.cancel(); };
  }, []);

  const bnVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("bn"));
  const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const otherVoices = voices.filter((v) => !bnVoices.includes(v) && !enVoices.includes(v));
  const needBn = hasBangla(text);
  const noBnVoice = supported === true && voices.length > 0 && needBn && bnVoices.length === 0 && voiceURI === "auto";

  const pick = (chunk: string): { voice?: SpeechSynthesisVoice; lang: string } => {
    if (voiceURI !== "auto") { const v = voices.find((x) => x.voiceURI === voiceURI); if (v) return { voice: v, lang: v.lang }; }
    const bn = hasBangla(chunk);
    const v = voices.find((x) => x.lang.toLowerCase().startsWith(bn ? "bn" : "en"));
    return { voice: v, lang: v ? v.lang : bn ? "bn-BD" : "en-US" };
  };

  const speak = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const chunks = chunkText(text.slice(0, MAX));
    if (chunks.length === 0) return;
    keepRef.current = chunks.map((c, i) => {
      const u = new SpeechSynthesisUtterance(c);
      const p = pick(c);
      if (p.voice) u.voice = p.voice;
      u.lang = p.lang; u.rate = rate; u.pitch = pitch;
      if (i === chunks.length - 1) u.onend = () => setStatus("idle");
      u.onerror = (ev) => { if (ev.error !== "interrupted" && ev.error !== "canceled") setStatus("idle"); };
      return u;
    });
    setStatus("speaking");
    keepRef.current.forEach((u) => synth.speak(u));
  };
  const pause = () => { window.speechSynthesis.pause(); setStatus("paused"); };
  const resume = () => { window.speechSynthesis.resume(); setStatus("speaking"); };
  const stop = () => { window.speechSynthesis.cancel(); setStatus("idle"); };

  if (supported === false) {
    return <p className="text-sm text-red-500">{tr("এই ব্রাউজারে Text to Speech সাপোর্ট নেই। Chrome বা Edge ব্যবহার করে দেখুন।", "Text to Speech is not supported in this browser. Try Chrome or Edge.")}</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, MAX))} rows={7} placeholder={tr("এখানে যা শুনতে চান তা লিখুন বা পেস্ট করুন...", "Type or paste what you want to hear...")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        <p className="text-xs text-slate-500 text-right">{text.length}/{MAX}</p>
      </div>
      <div>
        <label className="text-sm font-medium dark:text-slate-200">{tr("কণ্ঠ", "Voice")}</label>
        <select value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)} className={input}>
          <option value="auto">{tr("স্বয়ংক্রিয় (লেখার ভাষা অনুযায়ী)", "Automatic (by text language)")}</option>
          {bnVoices.length > 0 && <optgroup label={tr("বাংলা", "Bangla")}>{bnVoices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}</optgroup>}
          {enVoices.length > 0 && <optgroup label={tr("ইংরেজি", "English")}>{enVoices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}</optgroup>}
          {otherVoices.length > 0 && <optgroup label={tr("অন্যান্য", "Other")}>{otherVoices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>)}</optgroup>}
        </select>
      </div>
      {noBnVoice && (
        <p className="text-sm text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 rounded-xl p-3">{tr("আপনার ডিভাইসে বাংলা কণ্ঠ পাওয়া যায়নি, তাই বাংলা লেখা ঠিকভাবে পড়া নাও হতে পারে। ফোনের সেটিংস → ভাষা → Text-to-speech থেকে বাংলা ভয়েস ইনস্টল করুন।", "No Bangla voice was found on your device, so Bangla text may not be read correctly. Install a Bangla voice in Settings → Language → Text-to-speech.")}</p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("গতি", "Speed")}: {rate.toFixed(1)}x</label><input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-600" /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("সুর", "Pitch")}: {pitch.toFixed(1)}</label><input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-600" /></div>
      </div>
      <div className="flex gap-3">
        {status === "paused" ? (
          <button onClick={resume} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {tr("চালিয়ে যান", "Resume")}</button>
        ) : status === "speaking" ? (
          <button onClick={pause} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Pause className="w-4 h-4" /> {tr("থামান", "Pause")}</button>
        ) : (
          <button onClick={speak} disabled={!text.trim()} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {tr("পড়ে শোনান", "Speak")}</button>
        )}
        <button onClick={stop} disabled={status === "idle"} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white disabled:opacity-40"><Square className="w-4 h-4" /> {tr("বন্ধ", "Stop")}</button>
        <button onClick={() => { stop(); setText(""); }} aria-label={tr("মুছুন", "Clear")} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>
      <p className="text-xs text-slate-500">{tr("কণ্ঠ আপনার ডিভাইস ও ব্রাউজারের ভয়েসের উপর নির্ভর করে, তাই ফোনভেদে আলাদা শোনাবে। এখান থেকে অডিও ফাইল ডাউনলোড করা যায় না। লেখা কোথাও পাঠানো হয় না।", "The voice depends on your device and browser, so it sounds different on different phones. Audio files cannot be downloaded from here. Your text is never sent anywhere.")}</p>
    </div>
  );
}
