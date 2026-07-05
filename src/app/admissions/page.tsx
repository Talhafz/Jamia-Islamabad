'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, ClipboardList, Coins, CalendarDays, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdmissionsPage() {
  const { t } = useLanguage();

  const reqDocs = [
    t('admissions:documents.doc1'),
    t('admissions:documents.doc2'),
    t('admissions:documents.doc3'),
    t('admissions:documents.doc4'),
    t('admissions:documents.doc5'),
  ];

  const timeline = [
    { date: t('admissions:calendar.timeline1'), title: t('admissions:calendar.timeline1Title'), desc: t('admissions:calendar.timeline1Desc') },
    { date: t('admissions:calendar.timeline2'), title: t('admissions:calendar.timeline2Title'), desc: t('admissions:calendar.timeline2Desc') },
    { date: t('admissions:calendar.timeline3'), title: t('admissions:calendar.timeline3Title'), desc: t('admissions:calendar.timeline3Desc') },
    { date: t('admissions:calendar.timeline4'), title: t('admissions:calendar.timeline4Title'), desc: t('admissions:calendar.timeline4Desc') },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none">
          {t('admissions:title')}
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          {t('admissions:description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Requirements & Eligibility */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">{t('admissions:eligibility.title')}</h3>
          </div>
          <div className="text-xs text-zinc-650 flex flex-col gap-3">
            <p className="leading-relaxed">
              <strong>{t('admissions:eligibility.generalTitle')}</strong> {t('admissions:eligibility.generalDesc')}
            </p>
            <p className="leading-relaxed">
              <strong>{t('admissions:eligibility.darsTitle')}</strong> {t('admissions:eligibility.darsDesc')}
            </p>
            <p className="leading-relaxed">
              <strong>{t('admissions:eligibility.hifzTitle')}</strong> {t('admissions:eligibility.hifzDesc')}
            </p>
            <p className="leading-relaxed">
              <strong>{t('admissions:eligibility.conductTitle')}</strong> {t('admissions:eligibility.conductDesc')}
            </p>
          </div>
        </div>

        {/* Required Documents */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">{t('admissions:documents.title')}</h3>
          </div>
          <ul className="list-disc pl-5 flex flex-col gap-2.5 text-xs text-zinc-650 font-medium">
            {reqDocs.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-5 mb-12">
        <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
          <Coins className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold">{t('admissions:fees.title')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse text-zinc-800">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-bold">
              <tr>
                <th className="p-3">{t('admissions:fees.program')}</th>
                <th className="p-3">{t('admissions:fees.admission')}</th>
                <th className="p-3">{t('admissions:fees.monthly')}</th>
                <th className="p-3">{t('admissions:fees.exam')}</th>
                <th className="p-3">{t('admissions:fees.hostel')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="p-3 font-bold">درس نظامی (Dars-e-Nizami)</td>
                <td className="p-3 font-mono font-semibold">PKR 5,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,500</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">حفظ القرآن (Hifz-ul-Quran)</td>
                <td className="p-3 font-mono font-semibold">PKR 3,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 800</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">تجوید و قراءت (Tajweed-o-Qira&apos;at)</td>
                <td className="p-3 font-bold">PKR 3,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 800</td>
                <td className="p-3 font-mono font-semibold">N/A</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">مٹرک / ایف اے (Matric/FA)</td>
                <td className="p-3 font-mono font-semibold">Board Rates</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
                <td className="p-3 font-mono font-semibold">Board Rates</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-zinc-400 font-bold">
          {t('admissions:fees.note')}
        </p>
      </div>

      {/* Admissions Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        <div className="md:col-span-8 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">{t('admissions:calendar.title')}</h3>
          </div>
          
          <div className="flex flex-col gap-4 text-xs">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-24 font-bold font-mono text-emerald-700 shrink-0">{item.date}</div>
                <div>
                  <strong className="block text-zinc-950">{item.title}</strong>
                  <span className="text-zinc-500">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Application Panel */}
        <div className="md:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex flex-col gap-4 shadow-xl">
          <h3 className="text-base font-bold text-amber-400">{t('admissions:enroll.title')}</h3>
          <p className="text-emerald-100/80 text-xs leading-relaxed">
            {t('admissions:enroll.desc')}
          </p>
          <Link
            href="/admission-form"
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold text-xs text-center shadow-md transition-all duration-300 flex items-center justify-center gap-1"
          >
            {t('navbar.applyNow')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
