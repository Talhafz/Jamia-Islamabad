'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Language } from '../i18n/translations';

interface AdaptiveAuthButtonProps {
  currentLanguage: Language;
  onMobileClick?: () => void;
}

const ROLE_LABELS: Record<string, Record<Language, string>> = {
  ADMIN: {
    en: 'ADMIN',
    ur: 'ایڈمن',
    ar: 'مدير',
  },
  DIRECTOR: {
    en: 'DIRECTOR',
    ur: 'ڈائریکٹر',
    ar: 'ناظر',
  },
  DEAN: {
    en: 'DEAN',
    ur: 'ڈی ان',
    ar: 'عميد',
  },
  STUDENT: {
    en: 'STUDENT',
    ur: 'طالب علم',
    ar: 'طالب',
  },
  USER: {
    en: 'USER',
    ur: 'صارف',
    ar: 'مستخدم',
  },
};

export function AdaptiveAuthButton({ currentLanguage, onMobileClick }: AdaptiveAuthButtonProps) {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Labels per language
  const loginLabel =
    currentLanguage === 'ur'
      ? 'لاگ ان'
      : currentLanguage === 'ar'
      ? 'تسجيل الدخول'
      : 'Sign In';

  const logoutLabel =
    currentLanguage === 'ur'
      ? 'لاگ آؤٹ'
      : currentLanguage === 'ar'
      ? 'تسجيل الخروج'
      : 'Sign Out';

  // ── LOGGED OUT STATE ───────────────────────────────────────────────────────
  if (!session?.user) {
    return (
      <Link
        href="/login"
        onClick={onMobileClick}
        className="px-3 py-1.5 rounded-sm border border-[var(--color-gold-primary)]/50 bg-[var(--color-panel)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] text-[11px] xl:text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 leading-none shadow-sm whitespace-nowrap"
      >
        <User className="w-3.5 h-3.5 shrink-0 relative -top-[1px]" />
        <span className="leading-none">{loginLabel}</span>
      </Link>
    );
  }

  // ── LOGGED IN STATE ────────────────────────────────────────────────────────
  const rawRole = (session.user.role || 'USER').toUpperCase();
  const roleDisplay =
    ROLE_LABELS[rawRole]?.[currentLanguage] ||
    ROLE_LABELS[rawRole]?.en ||
    rawRole;

  const displayName = session.user.name || session.user.email || roleDisplay;

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* DESKTOP HOVER BUTTON (3-Language Adaptive Roles & Action Labels) */}
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="hidden [@media(hover:hover)]:flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--color-gold-primary)]/40 bg-[var(--color-panel)] hover:bg-red-950/60 hover:border-red-600/70 text-[var(--color-gold-bright)] hover:text-red-200 text-[11px] xl:text-xs font-extrabold transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap group leading-none"
        title={`${displayName} - Click to ${logoutLabel}`}
      >
        {/* Default State: User Icon + Localized Role */}
        <span className="flex items-center gap-1.5 group-hover:hidden">
          <User className="w-3.5 h-3.5 text-[var(--color-gold-primary)] shrink-0 relative -top-[1px]" />
          <span className={`leading-none ${currentLanguage === 'en' ? 'font-mono tracking-wider' : 'font-bold'}`}>
            {roleDisplay}
          </span>
        </span>

        {/* Hover State: LogOut Icon + Localized Logout Text */}
        <span className="hidden group-hover:flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5 text-red-400 shrink-0 relative -top-[1px]" />
          <span className="font-bold leading-none">{logoutLabel}</span>
        </span>
      </button>

      {/* TOUCH / MOBILE TAP BUTTON (3-Language Adaptive) */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="flex [@media(hover:hover)]:hidden items-center justify-center gap-1.5 px-3 py-1.5 rounded-sm border border-[var(--color-gold-primary)]/40 bg-[var(--color-panel)] text-[var(--color-gold-bright)] text-[11px] xl:text-xs font-extrabold transition-all shadow-sm whitespace-nowrap leading-none"
      >
        <User className="w-3.5 h-3.5 text-[var(--color-gold-primary)] shrink-0 relative -top-[1px]" />
        <span className={`leading-none ${currentLanguage === 'en' ? 'font-mono tracking-wider' : 'font-bold'}`}>
          {roleDisplay}
        </span>
        <ChevronDown className={`w-3 h-3 text-[var(--color-teal-accent)] transition-transform shrink-0 relative -top-[0.5px] ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Touch Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-44 rounded-sm border border-[var(--color-gold-muted)]/40 bg-[var(--color-panel)] p-2 shadow-2xl z-50 flex flex-col gap-2 animate-fade-in">
          <div className="px-2 py-1 border-b border-[var(--color-emerald-mid)]/50 flex flex-col">
            <span className="text-[11px] font-bold text-[var(--color-gold-bright)] truncate leading-tight">{displayName}</span>
            <span className="text-[10px] font-bold text-[var(--color-teal-accent)] mt-0.5">{roleDisplay}</span>
          </div>
          <button
            onClick={() => {
              setDropdownOpen(false);
              if (onMobileClick) onMobileClick();
              signOut({ callbackUrl: '/' });
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-sm bg-red-950/60 border border-red-800/60 hover:bg-red-900/80 text-red-200 text-xs font-bold transition-all leading-none"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400 shrink-0 relative -top-[1px]" />
            <span className="leading-none">{logoutLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
