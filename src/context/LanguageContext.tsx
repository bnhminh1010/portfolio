"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, dictionaries, Dictionary } from "../i18n/dictionaries";

interface LanguageContextType {
  language: Language;
  t: (section: keyof Dictionary, key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load preference from local storage on mount
    const savedLang = localStorage.getItem("lang") as Language | null;
    if (savedLang === "en" || savedLang === "vi") {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "vi" : "en";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    // Update HTML lang attribute for accessibility and SEO
    document.documentElement.lang = newLang;
  };

  const t = (section: keyof Dictionary, key: string): string => {
    // Basic nested key access, assumes section exists and key exists within it
    const dict = dictionaries[language];
    // @ts-ignore
    return dict[section]?.[key] || key;
  };

  if (!mounted) {
    // Prevent hydration mismatch by rendering default initially
    return (
      <LanguageContext.Provider value={{ language: "en", t, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
