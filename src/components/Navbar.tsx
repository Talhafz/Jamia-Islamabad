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

  const handleLangSelect = (code: Language) => {
    setLanguage(code);
    setLangOpen(false);
    setMobileLangOpen(false);
    setIsOpen(false);
  };

  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.admissions'), path: '/admissions' },
    { name: t('navbar.admissionForm'), path: '/admission-form' },
    { name: t('navbar.programs'), path: '/programs' },
    { name: t('navbar.studentsDirectory'), path: '/students' },
    { name: t('navbar.faculty'), path: '/faculty' },
    { name: t('navbar.gallery'), path: '/gallery' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  const currentLangLabel = LANGUAGES.find(l => l.code === currentLanguage)?.label ?? 'اردو';
  const isHome = pathname === '/';
  const isDark = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none print:hidden ${
        isDark
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400 overflow-hidden p-[2px]">
              <img src="/assets/Logo.png" alt="Jamia Islamabad" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-sm tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                جامعہ اسلام آباد
              </span>
              <span className="text-emerald-500/80 text-[10px] font-mono font-bold tracking-wider leading-none mt-1">
                JAMIA ISLAMABAD
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-bold tracking-wide transition-all duration-200 hover:text-emerald-400 ${
                  pathname === link.path
                    ? 'text-emerald-400 border-b-2 border-emerald-500 pb-1'
                    : 'text-zinc-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">

            {/* ── Language Dropdown ── */}
            <div className="relative" ref={desktopLangRef}>
              <button
                id="lang-toggle-desktop"
                onClick={() => setLangOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                {currentLangLabel}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/admission-form"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold shadow-md transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              {t('navbar.applyNow')}
            </Link>
          </div>

          {/* Mobile: Globe Dropdown + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Language Dropdown — mirrors desktop design */}
            <div className="relative" ref={mobileLangRef}>
              <button
                id="lang-toggle-mobile"
                onClick={() => setMobileLangOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all duration-200"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                {currentLangLabel}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLangOpen && (
                <div className="absolute top-full mt-2 right-0 w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-2xl z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 absolute top-full left-0 right-0 p-4 shadow-xl flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                pathname === link.path
                  ? 'bg-emerald-950/50 text-emerald-400 border-l-4 border-emerald-500'
                  : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admission-form"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full py-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all text-center flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            {t('navbar.applyNow')}
          </Link>
        </div>
      )}
    </nav>
  );
}
