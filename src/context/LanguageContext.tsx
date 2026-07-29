"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { Language } from "@/data/portfolio";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const storageKey = "portfolio-language";

function readLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(storageKey);
  return saved === "vi" ? "vi" : "en";
}

function subscribeToLanguage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("portfolio-language-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("portfolio-language-change", onStoreChange);
  };
}

function getServerLanguage(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, readLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage: () => {
          window.localStorage.setItem(storageKey, language === "en" ? "vi" : "en");
          window.dispatchEvent(new Event("portfolio-language-change"));
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
