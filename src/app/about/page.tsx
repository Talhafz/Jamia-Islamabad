'use client';

import React from 'react';
import { BookOpen, Compass, Award, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import { PageBanner } from '../../components/PageBanner';

export default function AboutPage() {
  const { t } = useLanguage();

  const coreValues = [
    { titleKey: 'about:coreValues.rigorTitle', descKey: 'about:coreValues.rigorDesc', icon: BookOpen },
    { titleKey: 'about:coreValues.tarbiyahTitle', descKey: 'about:coreValues.tarbiyahDesc', icon: Compass },
    { titleKey: 'about:coreValues.leadershipTitle', descKey: 'about:coreValues.leadershipDesc', icon: Award },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner 
        title={t('about:title')} 
        description={t('about:description')} 
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        
        {/* Vision & Mission grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-3">
            <h2 className="text-lg font-bold text-emerald-950 border-l-2 border-emerald-700 pl-2">
              {t('about:vision.title')}
            </h2>
            <p className="text-zinc-600 text-xs leading-relaxed text-justify">
              {t('about:vision.desc')}
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-3">
            <h2 className="text-lg font-bold text-emerald-950 border-l-2 border-emerald-700 pl-2">
              {t('about:mission.title')}
            </h2>
            <p className="text-zinc-600 text-xs leading-relaxed text-justify">
              {t('about:mission.desc')}
            </p>
          </div>
        </div>

        {/* Biographical Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 p-8 rounded-2xl bg-emerald-950 text-white shadow-xl relative overflow-hidden">
          {/* Subtle texture for the biographical container itself to match hero */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="lg:col-span-4 flex justify-center relative z-10">
            <div className="text-center p-6 border border-emerald-500/20 bg-zinc-950/50 rounded-xl max-w-xs relative shadow-2xl shadow-emerald-950/50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute -top-3 left-6 px-2.5 py-1 bg-amber-500 text-zinc-950 text-[9px] font-extrabold tracking-widest uppercase rounded z-10">
                {t('about:biography.profileLabel')}
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-amber-400 bg-zinc-800 mx-auto mb-6 overflow-hidden flex items-center justify-center shadow-lg relative z-10">
                <img src="/assets/doctor_sahib.jpeg" alt={t('about:biography.name')} className="w-full h-full object-cover object-top" />
              </div>
              <h4 className="text-amber-400 font-bold text-sm block mb-1 relative z-10">{t('about:biography.namePrefix')}</h4>
              <h3 className="text-white font-extrabold text-2xl tracking-tight mb-3 leading-snug relative z-10">{t('about:biography.name')}</h3>
              <span className="text-sm font-medium text-emerald-100 block mt-3 pt-3 border-t border-emerald-500/30 leading-relaxed relative z-10">{t('about:biography.subtitle')}</span>
            </div>
          </div>

        <div className="lg:col-span-8 flex flex-col gap-4">
          <h3 className="text-xl font-extrabold text-amber-400">{t('about:biography.heading')}</h3>
          <p className="text-emerald-100/80 text-xs leading-relaxed text-justify">
            {t('about:biography.desc1')}
          </p>
          <p className="text-emerald-100/80 text-xs leading-relaxed text-justify">
            {t('about:biography.desc2')}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-zinc-950">{t('about:coreValues.title')}</h2>
          <p className="text-zinc-500 text-[10px] tracking-widest uppercase font-mono font-bold mt-1">
            {t('about:coreValues.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-3 text-center items-center shadow-sm">
                <div className="p-3 rounded-full bg-emerald-50 text-emerald-800">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-zinc-950 font-bold text-sm">{t(val.titleKey)}</h3>
                <p className="text-zinc-550 text-xs leading-relaxed max-w-xs">{t(val.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>

      </div>
    </div>
  );
}
