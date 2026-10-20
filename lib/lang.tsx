"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Lang, UI } from "@/lib/i18nData";

const KEY = "bdtoolshub-lang";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "bn", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn"); // default Bangla (same on server and first paint)

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s === "en" || s === "bn") setLangState(s);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
export function useUI() {
  const { lang } = useLang();
  return UI[lang];
}
