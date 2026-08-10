'use client';

import React from 'react';
import { Users, GraduationCap, Award, Mail } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';

export default function FacultyPage() {
  const { t, direction } = useLanguage();

  const memberKeys = ['m1', 'm2', 'm3', 'm4'];
  const members = memberKeys.map((key) => ({
    name: t(`faculty:members.${key}.name`),
    title: t(`faculty:members.${key}.title`),
    dept: t(`faculty:members.${key}.dept`),
    qual: t(`faculty:members.${key}.qual`),
    bio: t(`faculty:members.${key}.bio`),
  }));

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] text-[var(--color-text-body)]" dir={direction}>
      <PageBanner 
        title={t('faculty:title')} 
        description={t('faculty:description')} 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {members.map((m, idx) => (
            <div 
              key={idx} 
              className="p-6 sm:p-7 rounded-[4px] card-standard flex flex-col justify-between gap-6 hover:border-[var(--color-gold-primary)] transition-all duration-300 h-full"
            >
              <div className="flex flex-col gap-4.5">
                
                {/* Name & Title Header */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col">
                    <h2 className="text-base sm:text-lg font-extrabold text-[var(--color-gold-bright)] leading-relaxed sm:leading-loose mb-2">
                      {m.name}
                    </h2>
                    <span className="text-xs text-[var(--color-teal-accent)] font-bold block mt-1.5 leading-relaxed">
                      {m.title}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-gold-primary)]/30 text-[var(--color-gold-primary)] flex items-center justify-center shrink-0 mt-1">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                {/* Department & Qualification Details Box */}
                <div className="text-xs text-[var(--color-text-body)] flex flex-col gap-2.5 mt-3 bg-[var(--color-emerald-deep)]/70 p-4 rounded-sm border border-[var(--color-emerald-mid)]/50">
                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[var(--color-teal-soft)] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[var(--color-gold-primary)]">{t('faculty:deptLabel')}:</strong> {m.dept}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[var(--color-gold-primary)] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="font-bold text-[var(--color-gold-primary)]">{t('faculty:qualLabel')}:</strong> {m.qual}
                    </span>
                  </div>
                </div>

                {/* Bio Paragraph */}
                <p className={`text-xs sm:text-[13px] text-[var(--color-text-body)] leading-loose sm:leading-[2] mt-3 ${direction === 'rtl' ? 'text-right' : 'text-justify'}`}>
                  {m.bio}
                </p>

              </div>

              {/* Card Footer */}
              <div className="border-t border-[var(--color-emerald-mid)]/40 pt-4 mt-3 flex justify-between items-center text-[10px] font-bold text-[var(--color-text-muted)] font-mono">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-teal-accent)] shrink-0" />
                  {t('faculty:contactLabel')}
                </span>
                <span>{t('faculty:brandLabel')}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
