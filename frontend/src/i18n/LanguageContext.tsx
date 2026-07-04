"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { translations, type Language } from "./translations";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LanguageContextType {
  /** Current active language */
  lang: Language;
  /** Switch to a different language (persists to localStorage) */
  setLang: (lang: Language) => void;
  /** Translate a key using dot notation — e.g. t("nav.discover") */
  t: (key: string) => string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LanguageContext = createContext<LanguageContextType | null>(null);

const LANG_KEY = "99tolet-language";
const VALID_LANGS: Language[] = ["en", "hi", "hinglish"];

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Hydrate language preference from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_KEY) as Language | null;
      if (stored && VALID_LANGS.includes(stored)) {
        setLangState(stored);
        applyHtmlLang(stored);
      }
    } catch {
      // localStorage unavailable (SSR / incognito) — keep default
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_KEY, newLang);
    } catch {
      // silently ignore
    }
    applyHtmlLang(newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[lang];
      for (const k of keys) {
        value = value?.[k];
      }
      return typeof value === "string" ? value : key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * Access the language context.
 *
 * @example
 * ```tsx
 * const { lang, setLang, t } = useLanguage();
 * return <h1>{t("hero.headline1")}</h1>;
 * ```
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}

/**
 * Convenience alias — same as useLanguage but named for familiarity with
 * i18n libraries.
 */
export const useTranslation = useLanguage;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function applyHtmlLang(lang: Language) {
  if (typeof document !== "undefined") {
    document.documentElement.lang =
      lang === "hi" ? "hi" : lang === "hinglish" ? "hi-Latn" : "en";
  }
}
