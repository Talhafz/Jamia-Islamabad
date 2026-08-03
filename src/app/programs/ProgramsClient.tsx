'use client';
import React from 'react';
import { BookOpen, Compass, Award, Star } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';

export function ProgramsClient() {
  const { t, direction } = useLanguage();

  const courses = [
    {
      id: 'c1',
      icon: Compass,
    },
    {
      id: 'c2',
      icon: Star,
    },
    {
      id: 'c3',
      icon: BookOpen,
    },
    {
      id: 'c4',
      icon: BookOpen,
    },
    {
      id: 'c5',
      icon: Award,
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] min-h-screen">
      <PageBanner 
        title={t('programs:title')} 
        description={t('programs:description')} 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none" dir={direction}>
        {/* Program Details List */}
        <div className="flex flex-col gap-8">
          {courses.map((c, idx) => {
            const Icon = c.icon;
            const isGoldIcon = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className="card-standard flex flex-col md:flex-row gap-6 items-start shadow-xl"
              >
                <div className={`p-4 rounded-xl flex-shrink-0 ${
                  isGoldIcon
                    ? 'bg-[var(--color-gold-primary)]/12 text-[var(--color-gold-bright)] border border-[var(--color-gold-primary)]/20'
                    : 'bg-[var(--color-teal-accent)]/12 text-[var(--color-teal-soft)] border border-[var(--color-teal-accent)]/20'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-grow flex flex-col gap-4 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-emerald-mid)] pb-3">
                    <div>
                      <h2 className="text-xl font-extrabold text-[var(--color-gold-primary)]">{t(`programs:courses.${c.id}.title`)}</h2>
                      <span className="text-xs text-[var(--color-teal-soft)] font-bold tracking-wider">{t(`programs:courses.${c.id}.focus`)}</span>
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] border border-[var(--color-gold-muted)]/30 text-xs font-bold font-mono">
                      {t('programs:durationLabel')}: {t(`programs:courses.${c.id}.duration`)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify whitespace-pre-line">{t(`programs:courses.${c.id}.desc`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
