'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, TranslationKey } from '@/lib/translations';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('herbchain-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguageState(savedLanguage);
      // Update the HTML lang attribute
      if (typeof document !== 'undefined') {
        document.documentElement.lang = savedLanguage === 'hi' ? 'hi' : 'en';
      }
    }
  }, []);

  // Save language preference to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('herbchain-language', newLanguage);
    
    // Update the HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage === 'hi' ? 'hi' : 'en';
    }
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
