'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  direction: 'rtl' | 'ltr';
  t: (key: string, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ur');

  const direction: 'rtl' | 'ltr' = currentLanguage === 'en' ? 'ltr' : 'rtl';

  // Load persisted preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('app_language') as Language;
    if (saved === 'ur' || saved === 'en' || saved === 'ar') {
      setCurrentLanguage(saved);
    }
  }, []);

  // Sync HTML attributes whenever language changes
  useEffect(() => {
    localStorage.setItem('app_language', currentLanguage);
    const dir = currentLanguage === 'en' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', dir);
  }, [currentLanguage]);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  // Build t() as a stable callback that closes over currentLanguage
  const t = useCallback(
    (key: string, variables?: Record<string, string>): string => {
      const [namespace, path] = key.includes(':')
        ? key.split(':')
        : ['common', key];

      const ns = (translations[currentLanguage] as any)[namespace];
      if (!ns) return key;

      const value = path.split('.').reduce((obj: any, part: string) => {
        return obj !== null && obj !== undefined ? obj[part] : undefined;
      }, ns);

      if (typeof value !== 'string') return key;

      if (variables) {
        return Object.entries(variables).reduce(
          (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), v),
          value
        );
      }
      return value;
    },
    [currentLanguage]
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
