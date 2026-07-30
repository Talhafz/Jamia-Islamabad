'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, flatTranslations } from '../i18n/translations';

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

  // O(1) constant-time translation lookup callback with English fallback & fast interpolation
  const t = useCallback(
    (key: string, variables?: Record<string, string>): string => {
      const activeDict = flatTranslations[currentLanguage];
      const enDict = flatTranslations['en'];

      let value = activeDict?.[key] ?? enDict?.[key];

      if (!value && !key.includes(':')) {
        const commonKey = `common:${key}`;
        value = activeDict?.[commonKey] ?? enDict?.[commonKey];
      }

      if (typeof value !== 'string') return key;

      if (variables) {
        let interpolated = value;
        for (const k in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, k)) {
            interpolated = interpolated.replaceAll(`{${k}}`, variables[k]);
          }
        }
        return interpolated;
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
