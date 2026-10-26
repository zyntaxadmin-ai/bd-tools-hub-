// ---------- sentence splitting / chunking (no regex lookbehind: works on older Safari too) ----------
export function splitSentences(text: string): string[] {
  const parts = text.replace(/\r/g, "").match(/[^।.!?\n]+[।.!?\n]*|[।.!?\n]+/g) || [];
  return parts.map((s) => s.trim()).filter(Boolean);
}

// Split text into chunks (Chrome stops long utterances). Sentences end with । . ! ? or a new line.
export function chunkText(text: string, max = 180): string[] {
  const sentences = splitSentences(text);
  const out: string[] = [];
  let cur = "";
  const push = (s: string) => { if (s) out.push(s); };
  for (const s of sentences) {
    if (s.length > max) {
      push(cur); cur = "";
      let rest = s;
      while (rest.length > max) {
        let cut = rest.lastIndexOf(" ", max);
        if (cut < max * 0.4) cut = max;
        push(rest.slice(0, cut).trim());
        rest = rest.slice(cut).trim();
      }
      cur = rest;
    } else if ((cur + " " + s).trim().length <= max) {
      cur = (cur + " " + s).trim();
    } else {
      push(cur); cur = s;
    }
  }
  push(cur);
  return out;
}
export const hasBangla = (t: string) => /[\u0980-\u09FF]/.test(t);

// ---------- script / language detection ----------
// Note: the danda "।" (U+0964) is shared by Bangla and Hindi, so it is excluded from the Hindi range.
const SCRIPTS: [string, RegExp][] = [
  ["bn", /[\u0980-\u09FF]/g], ["hi", /[\u0900-\u0963\u0966-\u097F]/g], ["pa", /[\u0A00-\u0A7F]/g], ["gu", /[\u0A80-\u0AFF]/g],
  ["ta", /[\u0B80-\u0BFF]/g], ["te", /[\u0C00-\u0C7F]/g], ["kn", /[\u0C80-\u0CFF]/g], ["ml", /[\u0D00-\u0D7F]/g],
  ["th", /[\u0E00-\u0E7F]/g], ["ar", /[\u0600-\u06FF\u0750-\u077F]/g], ["he", /[\u0590-\u05FF]/g], ["ru", /[\u0400-\u04FF]/g],
  ["el", /[\u0370-\u03FF]/g], ["ko", /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/g], ["ja", /[\u3040-\u30FF]/g], ["zh", /[\u4E00-\u9FFF]/g],
  ["latin", /[A-Za-z\u00C0-\u024F]/g],
];
// dominant script of a text: a language code, "latin", or "" when there are no letters (digits only)
export function detectScript(s: string): string {
  let best = "", bestN = 0;
  for (const [code, re] of SCRIPTS) {
    const n = (s.match(re) || []).length;
    if (n > bestN) { best = code; bestN = n; }
  }
  if (best === "zh" && /[\u3040-\u30FF]/.test(s)) return "ja"; // kana + Han = Japanese
  return best;
}

export type PlanItem = { text: string; lang: string };
// Turn text into speakable pieces, each with the language to read it in.
// forceLang: read everything in this language. latinLang: language for Latin-script text (default English).
// cut the start of a text into a short head (at a comma/sentence/space boundary) and the rest
export function splitHead(text: string, firstMax: number): [string, string] {
  if (text.length <= firstMax) return [text, ""];
  const win = text.slice(0, firstMax + 1);
  const min = Math.floor(firstMax * 0.4);
  let cut = -1;
  for (let i = win.length - 1; i >= min; i--) { if (",;:।.!?\u060C\u3001\uFF0C".includes(win[i])) { cut = i + 1; break; } }
  if (cut < 0) { const sp = win.lastIndexOf(" "); cut = sp >= min ? sp : firstMax; }
  return [text.slice(0, cut).trim(), text.slice(cut).trim()];
}

// firstMax: make the FIRST piece short so the voice starts speaking sooner (the rest is queued behind it).
export function planSpeech(text: string, o: { forceLang?: string; latinLang?: string; max?: number; firstMax?: number } = {}): PlanItem[] {
  const max = o.max ?? 180, latin = o.latinLang ?? "en";
  const merged: PlanItem[] = [];
  let prev = o.forceLang ?? latin;
  for (const s of splitSentences(text)) {
    let lang: string;
    if (o.forceLang) lang = o.forceLang;
    else { const d = detectScript(s); lang = d === "" ? prev : d === "latin" ? latin : d; }
    prev = lang;
    const last = merged[merged.length - 1];
    if (last && last.lang === lang && (last.text + " " + s).length <= max) last.text += " " + s;
    else merged.push({ text: s, lang });
  }
  const out: PlanItem[] = [];
  for (const it of merged) for (const c of chunkText(it.text, max)) out.push({ text: c, lang: it.lang });
  if (o.firstMax && out.length && out[0].text.length > o.firstMax) {
    const [head, tail] = splitHead(out[0].text, o.firstMax);
    const lang = out[0].lang;
    out.splice(0, 1, ...(tail ? [{ text: head, lang }, { text: tail, lang }] : [{ text: head, lang }]));
  }
  return out;
}

// ---------- voices ----------
export type VoiceLike = { name: string; lang: string; voiceURI?: string; localService?: boolean; default?: boolean };
export const normLang = (l: string) => l.replace(/_/g, "-").toLowerCase();
export const baseLang = (l: string) => normLang(l).split("-")[0];
export const voiceId = (v: VoiceLike) => `${v.name}|${v.lang}`; // voiceURI is not unique on every device
const LOCALE: Record<string, string> = {
  en: "en-US", bn: "bn-BD", hi: "hi-IN", ar: "ar-SA", ur: "ur-PK", ta: "ta-IN", te: "te-IN", kn: "kn-IN", ml: "ml-IN", gu: "gu-IN", pa: "pa-IN",
  th: "th-TH", he: "he-IL", ru: "ru-RU", el: "el-GR", ko: "ko-KR", ja: "ja-JP", zh: "zh-CN",
};
export const fallbackLocale = (lang: string) => LOCALE[lang] ?? lang;

// voices for a language, best first: preferred locale, then offline (local) voices, then the browser default
export function rankVoices<T extends VoiceLike>(voices: T[], lang: string): T[] {
  const b = baseLang(lang), pref = (LOCALE[b] || "").toLowerCase();
  return voices
    .map((v, i) => ({ v, i }))
    .filter(({ v }) => baseLang(v.lang) === b)
    .map(({ v, i }) => ({ v, i, score: (normLang(v.lang) === pref ? 4 : 0) + (v.localService ? 2 : 0) + (v.default ? 1 : 0) }))
    .sort((a, c) => c.score - a.score || a.i - c.i)
    .map((x) => x.v);
}
export const pickVoice = <T extends VoiceLike>(voices: T[], lang: string): T | undefined => rankVoices(voices, lang)[0];
export const languagesFromVoices = (voices: VoiceLike[]): string[] => Array.from(new Set(voices.map((v) => baseLang(v.lang)).filter(Boolean))).sort();
