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
    <div className="w-full flex flex-col items-center">
      <PageBanner 
        title={t('programs:title')} 
        description={t('programs:description')} 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none" dir={direction}>
        {/* Program Details List */}
        <div className="flex flex-col gap-10">
          {courses.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div 
                key={idx} 
                className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col md:flex-row gap-6 items-start hover:shadow-lg transition-all duration-300"
              >
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 flex-shrink-0">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-grow flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-150 pb-2">
                    <div>
                      <h2 className="text-lg font-bold text-zinc-950">{t(`programs:courses.${c.id}.title`)}</h2>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{t(`programs:courses.${c.id}.focus`)}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono">
                      {t('programs:durationLabel')}: {t(`programs:courses.${c.id}.duration`)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-zinc-600 text-sm leading-relaxed text-justify whitespace-pre-line">{t(`programs:courses.${c.id}.desc`)}</p>
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
