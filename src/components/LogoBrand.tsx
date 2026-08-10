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

  // ──────────────────────────────────────────────────────────────
  // Luxury Islamic Rosette (SVG)
  // Used instead of Unicode ornaments
  // ──────────────────────────────────────────────────────────────
  const LuxuryRosette = () => (
    <svg
      width={isLg ? 12 : 10}
      height={isLg ? 12 : 10}
      viewBox="0 0 24 24"
      className="shrink-0 drop-shadow-[0_0_3px_rgba(232,185,61,0.30)]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rosetteGold" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#F7D66B" />
          <stop offset="55%" stopColor="#E8B93D" />
          <stop offset="100%" stopColor="#D4A017" />
        </radialGradient>
      </defs>

      <g fill="url(#rosetteGold)">
        <path d="M12 2 L13.8 8.2 L12 10 L10.2 8.2 Z" />
        <path d="M22 12 L15.8 13.8 L14 12 L15.8 10.2 Z" />
        <path d="M12 22 L10.2 15.8 L12 14 L13.8 15.8 Z" />
        <path d="M2 12 L8.2 10.2 L10 12 L8.2 13.8 Z" />

        <path d="M18.6 5.4 L15.4 9 L13.9 8.4 L15 6.9 Z" />
        <path d="M18.6 18.6 L15 17.1 L13.9 15.6 L15.4 15 Z" />
        <path d="M5.4 18.6 L9 15 L10.5 15.6 L9.4 17.1 Z" />
        <path d="M5.4 5.4 L9.4 6.9 L10.5 8.4 L9 9 Z" />

        <circle cx="12" cy="12" r="2.1" fill="#F8E7A2" />
      </g>
    </svg>
  );

  // ──────────────────────────────────────────────────────────────
  // Luxury Divider
  // Rosette + Premium Gold Gradient Line
  // ──────────────────────────────────────────────────────────────
  const LuxuryDivider = ({
    side,
  }: {
    side: 'left' | 'right';
  }) => (
    <div className="flex items-center shrink-0 select-none">
      {side === 'left' && (
        <>
          <LuxuryRosette />

          <div
            className={`
              -ml-px
              h-px
              ${isLg ? 'w-10' : 'w-6 sm:w-8'}
              bg-gradient-to-r
              from-[#E8B93D]
              via-[#D4A017]
              to-transparent
              shadow-[0_0_6px_rgba(232,185,61,0.28)]
            `}
          />
        </>
      )}

      {side === 'right' && (
        <>
          <div
            className={`
              -mr-px
              h-px
              ${isLg ? 'w-10' : 'w-6 sm:w-8'}
              bg-gradient-to-l
              from-[#E8B93D]
              via-[#D4A017]
              to-transparent
              shadow-[0_0_6px_rgba(232,185,61,0.28)]
            `}
          />

          <LuxuryRosette />
        </>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-3 select-none">
      {/* ── Vertical green divider ──────────────────────────────────── */}
      <div
        className={`w-px self-stretch bg-gradient-to-b from-transparent via-emerald-500/70 to-transparent ${isLg ? 'min-h-[3.75rem]' : 'min-h-[2.75rem]'
          }`}
      />

      {/* ── Text block ───────────────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-2.5">

        {/* ── PRIMARY HEADING ── */}

        {currentLanguage === 'ur' && (
          <span
            dir="rtl"
            lang="ur"
            className={`font-urdu font-extrabold text-amber-400 leading-[1.65] tracking-normal transition-colors group-hover:text-amber-300 text-center -translate-y-0.5 ${isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
              }`}
          >
            جامعہ اسلام آباد
          </span>
        )}

        {currentLanguage === 'en' && (
          <span
            className={`font-serif font-bold text-amber-400 tracking-[0.12em] uppercase leading-tight transition-colors group-hover:text-amber-300 text-center -translate-y-0.5 ${isLg ? 'text-xl sm:text-2xl' : 'text-sm lg:text-base xl:text-lg'
              }`}
          >
            JAMIA ISLAMABAD
          </span>
        )}

        {currentLanguage === 'ar' && (
          <span
            dir="rtl"
            lang="ar"
            className={`font-urdu font-extrabold text-amber-400 leading-[1.65] tracking-normal transition-colors group-hover:text-amber-300 text-center -translate-y-0.5 ${isLg ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
              }`}
          >
            جامعة إسلام آباد
          </span>
        )}

        {/* PART 2 CONTINUES FROM HERE */}
        {/* ── SECONDARY SUBTITLE ───────────────────────────────────── */}

        {/* URDU */}
        {currentLanguage === 'ur' && (
          <div className="flex items-center justify-center" dir="ltr">
            <LuxuryDivider side="left" />

            <span
              className={`font-latin-force uppercase tracking-[0.18em] font-semibold text-emerald-400/90 whitespace-nowrap mx-1.5 ${isLg ? 'text-[10px]' : 'text-[8px]'
                }`}
            >
              JAMIA ISLAMABAD
            </span>

            <LuxuryDivider side="right" />
          </div>
        )}

        {/* ENGLISH */}
        {currentLanguage === 'en' && (
          <div className="flex items-center justify-center" dir="ltr">
            <LuxuryDivider side="left" />

            <span
              dir="rtl"
              lang="ur"
              className={`font-urdu font-semibold text-emerald-400/90 leading-[1.5] whitespace-nowrap mx-1.5 ${isLg ? 'text-sm' : 'text-xs'
                }`}
            >
              جامعہ اسلام آباد
            </span>

            <LuxuryDivider side="right" />
          </div>
        )}

        {/* ARABIC */}
        {currentLanguage === 'ar' && (
          <div className="flex items-center justify-center" dir="ltr">
            <LuxuryDivider side="left" />

            <span
              className={`font-latin-force uppercase tracking-[0.18em] font-semibold text-emerald-400/90 whitespace-nowrap mx-1.5 ${isLg ? 'text-[10px]' : 'text-[8px]'
                }`}
            >
              JAMIA ISLAMABAD
            </span>

            <LuxuryDivider side="right" />
          </div>
        )}
      </div>
    </div>
  );
}
