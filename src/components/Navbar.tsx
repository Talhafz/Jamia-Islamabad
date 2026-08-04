'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileCheck, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'ur', label: 'اردو' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

import { LogoBrand } from './LogoBrand';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Refs for language dropdown containers
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (desktopLangRef.current && !desktopLangRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileLangRef.current && !mobileLangRef.current.contains(e.target as Node)) {
        setMobileLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const handleLangSelect = React.useCallback((code: Language) => {
    setLanguage(code);
    setLangOpen(false);
    setMobileLangOpen(false);
    setIsOpen(false);
  }, [setLanguage]);

  const navLinks = React.useMemo(() => [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.admissionForm'), path: '/admission-form' },
    { name: t('navbar.programs'), path: '/programs' },
    { name: t('navbar.studentsDirectory'), path: '/students' },
    { name: t('navbar.faculty'), path: '/faculty' },
    { name: t('navbar.gallery'), path: '/gallery' },
    { name: t('navbar.events'), path: '/events' },
    { name: t('navbar.contact'), path: '/contact' },
  ], [t]);

  const currentLangLabel = LANGUAGES.find(l => l.code === currentLanguage)?.label ?? 'اردو';
  const isHome = pathname === '/';
  const isDark = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none print:hidden ${
        isDark
          ? 'bg-[var(--color-emerald-deep)]/95 backdrop-blur-md border-b border-[var(--color-emerald-mid)]/60 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-14">

          {/* Logo with explicit RTL direction to preserve Urdu character connections */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 me-4 lg:me-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm border-2 border-[var(--color-gold-primary)] bg-[var(--color-panel)] shadow-lg shadow-[var(--color-gold-primary)]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--color-gold-bright)] overflow-hidden p-[3px]">
              <img src="/assets/Logo.png" alt="Jamia Islamabad" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <LogoBrand size="sm" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 mx-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md transition-all duration-200 relative ${
                    currentLanguage === 'en'
                      ? 'text-xs xl:text-[13px] font-semibold tracking-wide'
                      : 'text-sm xl:text-base font-bold'
                  } ${
                    isActive
                      ? 'text-[var(--color-gold-primary)] font-bold bg-[var(--color-panel)] border-b-2 border-[var(--color-gold-primary)] shadow-sm'
                      : 'text-[var(--color-text-body)] hover:text-[var(--color-teal-accent)] hover:bg-[var(--color-panel)]/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3 ms-4 lg:ms-8 shrink-0">

            {/* ── Language Dropdown ── */}
            <div className="relative" ref={desktopLangRef}>
              <button
                id="lang-toggle-desktop"
                onClick={() => setLangOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--color-emerald-mid)] bg-[var(--color-panel)]/80 hover:bg-[var(--color-emerald-mid)] text-[var(--color-text-body)] hover:text-[var(--color-gold-bright)] text-xs font-bold transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                {currentLangLabel}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 rounded-sm border border-[var(--color-gold-muted)]/40 bg-[var(--color-panel)] p-1.5 shadow-2xl z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] font-bold'
                          : 'text-[var(--color-text-body)] hover:bg-[var(--color-emerald-mid)]/50 hover:text-[var(--color-teal-soft)]'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/admission-form"
              className="btn-primary-gold px-4 py-2 text-xs flex items-center gap-1.5 shadow-md"
            >
              <FileCheck className="w-3.5 h-3.5" />
              {t('navbar.applyNow')}
            </Link>
          </div>

          {/* Mobile: Globe Dropdown + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="relative" ref={mobileLangRef}>
              <button
                id="lang-toggle-mobile"
                onClick={() => setMobileLangOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--color-emerald-mid)] bg-[var(--color-panel)]/80 hover:bg-[var(--color-emerald-mid)] text-[var(--color-text-body)] text-xs font-bold transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                {currentLangLabel}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLangOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 rounded-sm border border-[var(--color-gold-muted)]/40 bg-[var(--color-panel)] p-1.5 shadow-2xl z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] font-bold'
                          : 'text-[var(--color-text-body)] hover:bg-[var(--color-emerald-mid)]/50 hover:text-[var(--color-teal-soft)]'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="p-2 rounded-lg text-[var(--color-text-body)] hover:text-white hover:bg-[var(--color-panel)] transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[var(--color-emerald-deep)] border-b border-[var(--color-emerald-mid)] absolute top-full left-0 right-0 p-4 shadow-xl flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                pathname === link.path
                  ? 'bg-[var(--color-panel)] text-[var(--color-gold-bright)] border-l-4 border-[var(--color-gold-primary)]'
                  : 'text-[var(--color-text-body)] hover:bg-[var(--color-panel)]/50 hover:text-[var(--color-teal-soft)]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admission-form"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full py-3 btn-primary-gold text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            {t('navbar.applyNow')}
          </Link>
        </div>
      )}
    </nav>
  );
}
