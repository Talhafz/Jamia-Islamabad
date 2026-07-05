'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  direction: 'rtl' | 'ltr';
  t: (key: string, variables?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to 'ur' (Urdu) as requested
  const [currentLanguage, setLanguageState] = useState<Language>('ur');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  // Load language from localStorage on client mount
  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && (savedLang === 'ur' || savedLang === 'en' || savedLang === 'ar')) {
      setLanguageState(savedLang);
      setDirection(savedLang === 'en' ? 'ltr' : 'rtl');
    }
  }, []);

  // Update HTML attributes and save preference on change
  useEffect(() => {
    localStorage.setItem('app_language', currentLanguage);
    setDirection(currentLanguage === 'en' ? 'ltr' : 'rtl');
    
    // Dynamically update document attributes for proper RTL/LTR rendering
    document.documentElement.setAttribute('lang', currentLanguage);
    document.documentElement.setAttribute('dir', currentLanguage === 'en' ? 'ltr' : 'rtl');
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation resolver with namespace support (e.g. 'home:hero.title')
  const t = (key: string, variables?: Record<string, string>): string => {
    const [namespace, path] = key.includes(':') ? key.split(':') : ['common', key];
    
    const langTranslations = translations[currentLanguage];
    const nsTranslations = (langTranslations as any)[namespace];
    
    if (!nsTranslations) {
      // Fallback to common if namespace doesn't exist
      return key;
    }

    // Resolve nested path (e.g., 'hero.title')
    const parts = path.split('.');
    let value: any = nsTranslations;
    
    for (const part of parts) {
      if (value === undefined || value === null) {
        // Fallback to English if Urdu key is missing, or return the key
        const enFallback = (translations['en'] as any)[namespace];
        if (enFallback) {
          let fallbackVal = enFallback;
          for (const fbPart of parts) {
            if (fallbackVal === undefined || fallbackVal === null) break;
            fallbackVal = fallbackVal[fbPart];
          }
          if (typeof fallbackVal === 'string') {
            value = fallbackVal;
            break;
          }
        }
        return key;
      }
      value = value[part];
    }

    if (typeof value !== 'string') {
      return key;
    }

    // Variable interpolation
    if (variables) {
      let result = value;
      for (const [varName, varVal] of Object.entries(variables)) {
        result = result.replace(new RegExp(`{${varName}}`, 'g'), varVal);
      }
      return result;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, direction, t }}>
      <div style={{ direction }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
