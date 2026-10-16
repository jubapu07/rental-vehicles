"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DICTIONARY, Language } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof DICTIONARY["en"];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: DICTIONARY["en"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pravaas_lang") as Language;
      if (saved === "en" || saved === "hi") {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("pravaas_lang", lang);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: DICTIONARY[language] || DICTIONARY["en"],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
