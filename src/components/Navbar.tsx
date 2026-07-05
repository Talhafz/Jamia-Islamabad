'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileCheck, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { currentLanguage, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const languages = [
    { code: 'ur' as Language, name: 'اردو' },
    { code: 'en' as Language, name: 'English' },
    { code: 'ar' as Language, name: 'العربية' },
  ];

  const currentLangLabel = languages.find(l => l.code === currentLanguage)?.name || 'Urdu';

  const isHome = pathname === '/';
  const isDarkBg = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none print:hidden ${
        isDarkBg 
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-emerald-400 overflow-hidden p-[2px]">
              <img src="/assets/Logo.png" alt="Jamia Islamabad Logo" className="w-full h-full object-contain drop-shadow-md" />
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
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xs font-bold tracking-wide transition-all duration-200 hover:text-emerald-400 ${
                    isActive 
                      ? 'text-emerald-400 border-b-2 border-emerald-500 pb-1' 
                      : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Panel (Language Switcher & CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-all duration-250 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentLangLabel}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-xl animate-fade-in">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left rounded-lg text-xs font-semibold transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/admission-form"
              className="px-4.5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg hover:shadow-emerald-950/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5" />
              {t('navbar.applyNow')}
            </Link>
          </div>

          {/* Mobile Menu & Language Toggle Panel */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Quick Language Toggle Icon for Mobile */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none transition-all duration-200"
              >
                <Globe className="w-5 h-5 text-emerald-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl border border-zinc-800 bg-zinc-950 p-1 shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                      }`}
                    >
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 absolute top-full left-0 right-0 p-4 shadow-xl flex flex-col gap-3 animate-fade-in select-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-emerald-950/50 text-emerald-400 border-l-4 border-emerald-500' 
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
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
