'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.programs'), path: '/programs' },
    { name: t('navbar.admissions'), path: '/admissions' },
    { name: t('navbar.admissionForm'), path: '/admission-form' },
    { name: t('navbar.studentsDirectory'), path: '/students' },
  ];

  const resources = [
    { name: t('navbar.gallery'), path: '/gallery' },
    { name: t('navbar.faculty'), path: '/faculty' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs select-none print:hidden">
      
      {/* Primary Footer Panels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-emerald-500/50 bg-emerald-950/40 flex items-center justify-center overflow-hidden p-[2px]">
                <img src="/assets/Logo.png" alt="Jamia Islamabad Logo" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-base tracking-tight leading-none">
                  جامعہ اسلام آباد
                </span>
                <span className="text-emerald-500/80 text-[10px] font-mono font-bold tracking-wider leading-none mt-1">
                  JAMIA ISLAMABAD
                </span>
              </div>
            </Link>
            <p className="text-zinc-500 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://facebook.com/Jamiaislamabaad" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase border-l-2 border-emerald-600 pl-2">
              {t('footer.quickLinks')}
            </h4>
            <div className="flex flex-col gap-2.5 font-medium">
              {quickLinks.map((link) => (
                <Link key={link.path} href={link.path} className="hover:text-emerald-400 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal / Resources */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase border-l-2 border-emerald-600 pl-2">
              Resources
            </h4>
            <div className="flex flex-col gap-2.5 font-medium">
              {resources.map((link) => (
                <Link key={link.path} href={link.path} className="hover:text-emerald-400 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase border-l-2 border-emerald-600 pl-2">
              {t('footer.contactUs')}
            </h4>
            <div className="flex flex-col gap-3 font-semibold text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                <span>
                  Adjacent Central Jamia Masjid Noor-e-Madina, Street No. B-85, I-8/4, Islamabad, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="font-mono">+92 51 4864 945</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="font-mono">info@jamiaislamabad.net</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer copyright bar */}
      <div className="bg-zinc-950 border-t border-zinc-900 py-6 text-center select-none text-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-wider font-mono">
          <span>
            {t('footer.rights', { year: new Date().getFullYear().toString() })}
          </span>
          <span className="flex items-center gap-1">
            Engineered for Jamia Islamabad EMS
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
          </span>
        </div>
      </div>

    </footer>
  );
}
