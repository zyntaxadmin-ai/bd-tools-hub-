"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square, RotateCcw, Copy, Check } from "lucide-react";
import { useLang, useTr } from "@/lib/lang";
import { planSpeech, pickVoice, languagesFromVoices, baseLang, voiceId, fallbackLocale } from "@/lib/tts";
import { speakPlan, SynthLike, UtteranceLike } from "@/lib/ttsEngine";

type Status = "idle" | "speaking" | "paused";
const MAX = 5000;
const FIRST_CHUNK = 70;
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|TikTok|musical_ly|Snapchat|Line\/|MicroMessenger|Twitter/i;
const input = "w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none";

export default function TextToSpeech() {
  const tr = useTr();
  const { lang } = useLang();
  const [text, setText] = useState("");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [langSel, setLangSel] = useState("auto");
  const [voiceSel, setVoiceSel] = useState("auto");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [slow, setSlow] = useState(false);
  const [started, setStarted] = useState(false);
  const [canPause, setCanPause] = useState(true);
  const [inApp, setInApp] = useState(false);
  const [copied, setCopied] = useState(false);
  const speakerRef = useRef<{ stop(): void } | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setInApp(IN_APP.test(ua));
    setCanPause(!/Android/i.test(ua));
    if (!("speechSynthesis" in window) || !window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") { setSupported(false); return; }
    setSupported(true);
    const synth = window.speechSynthesis;
    const load = () => { const v = synth.getVoices(); setVoices(v); return v.length; };
    load();
    let tries = 0;
    const iv = setInterval(() => { tries++; if (load() > 0 || tries > 12) clearInterval(iv); }, 500);
    synth.addEventListener?.("voiceschanged", load);
    return () => { clearInterval(iv); synth.removeEventListener?.("voiceschanged", load); speakerRef.current?.stop(); synth.cancel(); };
  }, []);

  let dn: Intl.DisplayNames | null = null;
  try { dn = new Intl.DisplayNames([lang === "bn" ? "bn" : "en"], { type: "language" }); } catch { /* old browser */ }
  const langName = (c: string) => { try { return dn?.of(c) || c; } catch { return c; } };

  const chosen = voiceSel !== "auto" ? voices.find((v) => voiceId(v) === voiceSel) : undefined;
  const forced = chosen ? baseLang(chosen.lang) : langSel !== "auto" ? langSel : undefined;
  const plan = planSpeech(text.slice(0, MAX), { forceLang: forced, firstMax: FIRST_CHUNK });
  const langsInPlan = Array.from(new Set(plan.map((p) => p.lang)));
  const missing = chosen ? [] : langsInPlan.filter((l) => !pickVoice(voices, l));
  const installed = languagesFromVoices(voices);
  const voiceChoices = voices.filter((v) => langSel === "auto" || baseLang(v.lang) === langSel);
  const automaticVoice = langsInPlan.length === 1 ? pickVoice(voices, langsInPlan[0]) : undefined;
  const automaticLabel = langsInPlan.length === 1 && automaticVoice
    ? `${tr("স্বয়ংক্রিয়", "Automatic")} • ${langName(langsInPlan[0])}: ${automaticVoice.name} (${automaticVoice.lang})`
    : tr("স্বয়ংক্রিয় (লেখার ভাষা অনুযায়ী কণ্ঠ)", "Automatic (voice for detected language)");

  const speak = () => {
    speakerRef.current?.stop();
    setError(""); setSlow(false); setStarted(false);
    if (plan.length === 0) return;
    // Some browsers expose voices only after the page has loaded. Use their latest list.
    const latestVoices = window.speechSynthesis.getVoices();
    const availableVoices = latestVoices.length ? latestVoices : voices;
    if (latestVoices.length) setVoices(latestVoices);
    const playbackChosen = voiceSel !== "auto" ? availableVoices.find((v) => voiceId(v) === voiceSel) ?? chosen : undefined;
    setStatus("speaking");
    speakerRef.current = speakPlan(
      window.speechSynthesis as unknown as SynthLike,
      (item) => {
        const u = new SpeechSynthesisUtterance(item.text);
        const v = playbackChosen ?? pickVoice(availableVoices, item.lang);
        if (v) u.voice = v;
        u.lang = v ? v.lang : fallbackLocale(item.lang);
        u.rate = rate; u.pitch = pitch;
        return u as unknown as UtteranceLike;
      },
      plan,
      {
        onStart: () => { setSlow(false); setStarted(true); },
        onEnd: () => { setStatus("idle"); setStarted(false); },
        onError: (code) => { setStatus("idle"); setStarted(false); setError(code); },
        onSlow: () => setSlow(true),
      }
    );
  };
  const pause = () => { try { window.speechSynthesis.pause(); } catch { /* ignore */ } setStatus("paused"); };
  const resume = () => { try { window.speechSynthesis.resume(); } catch { /* ignore */ } setStatus("speaking"); };
  const stop = () => { speakerRef.current?.stop(); setStatus("idle"); setSlow(false); setStarted(false); };
  const copyLink = async () => { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };

  const errText = (code: string) => {
    if (code === "language-unavailable" || code === "voice-unavailable") return tr("এই ডিভাইসে এই ভাষার ভয়েস পাওয়া যাচ্ছে না। অন্য ভয়েস বা ভাষা বেছে নিন, অথবা ফোনের Text-to-speech সেটিংসে ভয়েস ইনস্টল করুন।", "This device does not have a voice for this language. Pick another voice or language, or install a voice in your phone's Text-to-speech settings.");
    if (code === "synthesis-failed" || code === "synthesis-unavailable" || code === "network") return tr("ভয়েস চালু করা যায়নি। অনলাইন ভয়েস হলে ইন্টারনেট দেখুন, অথবা অন্য (অফলাইন) ভয়েস বেছে নিন।", "The voice could not start. If it is an online voice, check your internet connection, or pick another (offline) voice.");
    if (code === "audio-busy" || code === "audio-hardware") return tr("অডিও ডিভাইস ব্যস্ত বা পাওয়া যাচ্ছে না। অন্য অ্যাপের শব্দ বন্ধ করে আবার চেষ্টা করুন।", "The audio device is busy or unavailable. Stop other apps playing sound and try again.");
    if (code === "not-allowed") return tr("ব্রাউজার শব্দ চালাতে দিচ্ছে না। পেজে একবার ট্যাপ করে আবার চেষ্টা করুন।", "The browser blocked audio. Tap the page once and try again.");
    if (code === "no-audio") return tr("কোনো শব্দ শুরু হয়নি। ফোনের ভলিউম ও সাইলেন্ট মোড দেখুন, অথবা অন্য ভয়েস বেছে নিন।", "No sound started. Check your volume and silent mode, or pick another voice.");
    return tr(`কথা বলা যায়নি (ত্রুটি: ${code})`, `Could not speak (error: ${code})`);
  };

  if (supported === false) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-500">{inApp
          ? tr("আপনি Instagram/Facebook এর মতো অ্যাপের ভেতরের ব্রাউজারে আছেন, সেখানে ভয়েস চলে না।", "You are in the built-in browser of an app like Instagram or Facebook, which does not support voice.")
          : tr("এই ব্রাউজারে Text to Speech সাপোর্ট নেই। Chrome বা Edge ব্যবহার করে দেখুন।", "Text to Speech is not supported in this browser. Try Chrome or Edge.")}</p>
        {inApp && (
          <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
            <p className="font-medium">{tr("কীভাবে ঠিক করবেন:", "How to fix it:")}</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>{tr("উপরের ডানে ⋯ (বা ⋮) মেনু চাপুন।", "Tap the ⋯ (or ⋮) menu at the top right.")}</li>
              <li>{tr("\"Open in browser\" বা \"Open in Chrome\" বেছে নিন।", "Choose \"Open in browser\" or \"Open in Chrome\".")}</li>
              <li>{tr("অথবা নিচের বাটনে লিংক কপি করে Chrome এ পেস্ট করুন।", "Or copy the link with the button below and paste it into Chrome.")}</li>
            </ol>
            <button onClick={copyLink} className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm flex items-center gap-1 dark:text-white">{copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied!</> : <><Copy className="w-4 h-4" /> {tr("লিংক কপি করুন", "Copy link")}</>}</button>
          </div>
        )}
      </div>
    );
  }

  const missingNames = missing.map(langName).join(", ");
  return (
    <div className="space-y-4">
      {inApp && (
        <p className="text-xs text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 rounded-xl p-3">{tr("আপনি অ্যাপের ভেতরের ব্রাউজারে আছেন। শব্দ না এলে Chrome এ খুলুন (⋯ → Open in browser)।", "You are in an app's built-in browser. If there is no sound, open this page in Chrome (⋯ → Open in browser).")}</p>
      )}
      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value.slice(0, MAX))} rows={7} placeholder={tr("এখানে যা শুনতে চান তা লিখুন বা পেস্ট করুন...", "Type or paste what you want to hear...")} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{text.trim() && langSel === "auto" && !chosen && langsInPlan.length > 0 ? `${tr("চেনা ভাষা", "Detected")}: ${langsInPlan.map(langName).join(", ")}` : ""}</span>
          <span>{text.length}/{MAX}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("ভাষা", "Language")}</label>
          <select value={langSel} onChange={(e) => { setLangSel(e.target.value); setVoiceSel("auto"); }} className={input}>
            <option value="auto">{tr("স্বয়ংক্রিয় (লেখা দেখে চিনবে)", "Automatic (detect from the text)")}</option>
            {installed.map((c) => <option key={c} value={c}>{langName(c)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium dark:text-slate-200">{tr("কণ্ঠ", "Voice")}</label>
          <select value={voiceSel} onChange={(e) => setVoiceSel(e.target.value)} className={input}>
            <option value="auto">{automaticLabel}</option>
            {voiceChoices.map((v) => <option key={voiceId(v)} value={voiceId(v)}>{v.name} ({v.lang}){v.localService === false ? ` • ${tr("অনলাইন", "online")}` : ""}</option>)}
          </select>
          {voiceSel === "auto" && langsInPlan.length > 0 && (
            <div className="mt-2 text-xs text-slate-500 space-y-1" aria-live="polite">
              {langsInPlan.map((c) => {
                const v = pickVoice(voices, c);
                return <p key={c}>{langName(c)}: {v
                  ? `${v.name} (${v.lang})${v.localService === false ? ` • ${tr("অনলাইন", "online")}` : ""}`
                  : tr("এই ভাষার কণ্ঠ তালিকায় নেই; ব্রাউজার বিকল্প কণ্ঠ ব্যবহার করতে পারে।", "No matching voice is listed; the browser may use a fallback voice.")}</p>;
              })}
            </div>
          )}
        </div>
      </div>

      {supported === true && voices.length === 0 && (
        <p className="text-sm text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 rounded-xl p-3">{tr("এই ব্রাউজার এখনো কোনো ভয়েস দেখাচ্ছে না (লোড হচ্ছে হতে পারে)। কিছুক্ষণ অপেক্ষা করুন; না এলে Chrome এ খুলুন।", "This browser is not listing any voices yet (they may still be loading). Wait a moment; if none appear, open this page in Chrome.")}</p>
      )}
      {voices.length > 0 && missing.length > 0 && (
        <p className="text-sm text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 rounded-xl p-3">{tr(
          `এই ডিভাইসের তালিকায় ${missingNames} ভয়েস নেই। তবুও পড়ার চেষ্টা করা হবে; কিছু না শুনলে বা উচ্চারণ ভুল হলে ফোনের সেটিংস → ভাষা → Text-to-speech থেকে ভয়েস ইনস্টল করুন।`,
          `${missingNames} ${missing.length > 1 ? "voices are" : "voice is"} not listed on this device. We will still try; if you hear nothing or the pronunciation is wrong, install the voice in Settings → Language → Text-to-speech.`)}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("গতি", "Speed")}: {rate.toFixed(1)}x</label><input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-600" /></div>
        <div><label className="text-sm font-medium dark:text-slate-200">{tr("সুর", "Pitch")}: {pitch.toFixed(1)}</label><input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full mt-2 accent-indigo-600" /></div>
      </div>

      <div className="flex gap-3">
        {status === "paused" ? (
          <button onClick={resume} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {tr("চালিয়ে যান", "Resume")}</button>
        ) : status === "speaking" && canPause ? (
          <button onClick={pause} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"><Pause className="w-4 h-4" /> {tr("থামান", "Pause")}</button>
        ) : status === "speaking" ? (
          <button disabled className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium opacity-70">{tr("পড়া হচ্ছে...", "Speaking...")}</button>
        ) : (
          <button onClick={speak} disabled={!text.trim()} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"><Play className="w-4 h-4" /> {tr("পড়ে শোনান", "Speak")}</button>
        )}
        <button onClick={stop} disabled={status === "idle"} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-1 dark:text-white disabled:opacity-40"><Square className="w-4 h-4" /> {tr("বন্ধ", "Stop")}</button>
        <button onClick={() => { stop(); setText(""); setError(""); }} aria-label={tr("মুছুন", "Clear")} className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"><RotateCcw className="w-4 h-4" /></button>
      </div>

      {status === "speaking" && !started && <p className="text-sm text-slate-500">{tr("ভয়েস তৈরি হচ্ছে... প্রথমবার কয়েক সেকেন্ড লাগতে পারে।", "Preparing the voice... the first time can take a few seconds.")}</p>}
      {slow && status === "speaking" && !started && <p className="text-sm text-amber-700 dark:text-amber-400">{tr("ভয়েস শুরু হতে একটু বেশি সময় নিচ্ছে। শব্দ না এলে ভলিউম ও সাইলেন্ট মোড দেখুন, অথবা \"অনলাইন\" লেখা নেই এমন (অফলাইন) কণ্ঠ বেছে নিন, সেগুলো দ্রুত শুরু হয়।", "The voice is taking longer than usual to start. If there is no sound, check your volume and silent mode, or pick a voice that is not marked \"online\" (offline voices start faster).")}</p>}
      {error && <p className="text-sm text-red-500">{errText(error)}</p>}

      <details className="text-xs text-slate-500">
        <summary className="cursor-pointer">{tr("ভয়েসের তথ্য (সমস্যা হলে দেখুন)", "Voice info (check this if something goes wrong)")}</summary>
        <p className="mt-2">{tr("এই ডিভাইসে ভয়েস", "Voices on this device")}: {voices.length}{installed.length > 0 ? ` (${installed.map((c) => `${c}: ${voices.filter((v) => baseLang(v.lang) === c).length}`).join(", ")})` : ""}</p>
      </details>

      <p className="text-xs text-slate-500">{tr("কণ্ঠ আপনার ডিভাইস ও ব্রাউজারের ভয়েসের উপর নির্ভর করে, তাই ফোনভেদে আলাদা শোনাবে। যেসব ভাষার ভয়েস আপনার ডিভাইসে ইনস্টল করা আছে, সেগুলোই চলবে। এখান থেকে অডিও ফাইল ডাউনলোড করা যায় না। লেখা কোথাও পাঠানো হয় না।", "The voice depends on your device and browser, so it sounds different on different phones. Only languages with a voice installed on your device will work. Audio files cannot be downloaded from here. Your text is never sent anywhere.")}</p>
    </div>
  );
}
