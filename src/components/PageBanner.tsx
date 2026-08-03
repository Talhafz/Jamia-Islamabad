'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ThreeCanvas = dynamic(
  () => import('./ThreeCanvas').then((m) => m.ThreeCanvas),
  {
    ssr: false,
    loading: () => null,
  }
);

interface PageBannerProps {
  title: string;
  description: string;
}

export function PageBanner({ title, description }: PageBannerProps) {
  const pathname = usePathname();
  const { direction, t } = useLanguage();

  return (
    <section className="relative w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--color-emerald-deep)_0%,var(--color-emerald-bg)_80%)] bg-diagonal-pattern overflow-hidden pt-36 pb-16 select-none -mt-20 border-b border-[var(--color-emerald-mid)]">
      <ThreeCanvas variant="subtle" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,59,46,0.25)_0%,transparent_75%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-3">
        
        {/* Breadcrumb Trail */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/30 text-[11px] font-medium text-[var(--color-text-body)] backdrop-blur-sm shadow-md"
          dir={direction}
        >
          <Link href="/" className="flex items-center gap-1 hover:text-[var(--color-teal-accent)] transition-colors">
            <Home className="w-3 h-3 text-[var(--color-teal-accent)]" />
            <span>{t('navbar.home')}</span>
          </Link>
          <ChevronRight className={`w-3 h-3 text-[var(--color-gold-muted)] ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          <span className="text-[var(--color-gold-bright)] font-bold">{title}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-3xl md:text-5xl font-extrabold text-[var(--color-gold-primary)] tracking-tight leading-relaxed py-1 [text-shadow:0_0_20px_rgba(212,160,23,0.25)]"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
            className="text-[var(--color-teal-soft)] text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
