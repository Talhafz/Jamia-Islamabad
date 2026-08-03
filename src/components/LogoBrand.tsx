'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoBrandProps {
  /** 'sm' for Navbar, 'lg' for Footer */
  size?: 'sm' | 'lg';
}

export function LogoBrand({ size = 'sm' }: LogoBrandProps) {
  const { currentLanguage } = useLanguage();
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-3 select-none">
      {/* ── Vertical green divider line ────────────────────────────── */}
      <div
        className={`w-px self-stretch bg-gradient-to-b from-transparent via-emerald-500/70 to-transparent ${
          isLg ? 'min-h-[3.75rem]' : 'min-h-[2.75rem]'
        }`}
      />

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center gap-0.5">

        {/* ── Primary Heading — Amber / Gold ── */}
        {currentLanguage === 'ur' && (
          <span
            dir="rtl"
            lang="ur"
            className={`font-urdu font-extrabold text-amber-400 leading-[1.65] tracking-normal transition-colors group-hover:text-amber-300 text-center ${
              isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            جامعہ اسلام آباد
          </span>
        )}
        {currentLanguage === 'en' && (
          <span
            className={`font-serif font-bold text-amber-400 tracking-[0.12em] uppercase leading-tight transition-colors group-hover:text-amber-300 text-center ${
              isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
            }`}
          >
            JAMIA ISLAMABAD
          </span>
        )}
        {currentLanguage === 'ar' && (
          <span
            dir="rtl"
            lang="ar"
            className={`font-urdu font-extrabold text-amber-400 leading-[1.65] tracking-normal transition-colors group-hover:text-amber-300 text-center ${
              isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            جامعة إسلام آباد
          </span>
        )}

        {/* ── Secondary Subtitle — Emerald with Symmetrical Lines & •❅ Ornaments ── */}
        {currentLanguage === 'ur' && (
          <div className="flex items-center justify-center gap-1.5 w-full">
            <span className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span
              className={`font-serif uppercase tracking-[0.18em] font-semibold text-emerald-400/90 whitespace-nowrap ${
                isLg ? 'text-[11px]' : 'text-[9px]'
              }`}
            >
              Jamia Islamabad
            </span>
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span className="h-[1px] bg-gradient-to-l from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
          </div>
        )}

        {currentLanguage === 'en' && (
          <div className="flex items-center justify-center gap-1.5 w-full">
            <span className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span
              dir="rtl"
              lang="ur"
              className={`font-urdu font-semibold text-emerald-400/90 leading-[1.5] whitespace-nowrap ${
                isLg ? 'text-sm' : 'text-xs'
              }`}
            >
              جامعہ اسلام آباد
            </span>
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span className="h-[1px] bg-gradient-to-l from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
          </div>
        )}

        {currentLanguage === 'ar' && (
          <div className="flex items-center justify-center gap-1.5 w-full">
            <span className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span
              className={`font-serif uppercase tracking-[0.18em] font-semibold text-emerald-400/90 whitespace-nowrap ${
                isLg ? 'text-[11px]' : 'text-[9px]'
              }`}
            >
              Jamia Islamabad
            </span>
            <span className="text-amber-400/80 text-[7px] leading-none select-none">•❅</span>
            <span className="h-[1px] bg-gradient-to-l from-transparent via-emerald-500/40 to-emerald-500/70 flex-1 min-w-[12px]" />
          </div>
        )}

      </div>
    </div>
  );
}
