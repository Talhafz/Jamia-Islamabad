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
    <section className="relative w-full flex items-center justify-center bg-zinc-950 overflow-hidden pt-36 pb-16 select-none -mt-20 border-b border-emerald-950/40">
      <ThreeCanvas variant="subtle" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.18)_0%,transparent_75%)] pointer-events-none" />
      
      {/* Decorative ambient subtle lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-3">
        
        {/* Breadcrumb Trail */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-medium text-zinc-400 backdrop-blur-sm"
          dir={direction}
        >
          <Link href="/" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <Home className="w-3 h-3 text-emerald-500" />
            <span>{t('navbar.home')}</span>
          </Link>
          <ChevronRight className={`w-3 h-3 text-zinc-600 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          <span className="text-emerald-400 font-bold">{title}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-relaxed py-1 drop-shadow-sm"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
            className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
