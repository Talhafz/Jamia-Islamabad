'use client';

import React from 'react';
import { FileCheck, ClipboardList, Coins, CalendarDays, ChevronRight, PenLine } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageBanner } from '../../components/PageBanner';
import { AdmissionFormContainer } from '../../features/admission-form/components/AdmissionFormContainer';

export default function AdmissionFormPage() {
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
    <div className="w-full flex flex-col items-center">

      {/* ── Banner ──────────────────────────────────────────────────────────── */}
      <div className="w-full print:hidden">
        <PageBanner
          title={t('admissions:title')}
          description={t('admissions:description')}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — ADMISSION REQUIREMENTS
          (formerly the standalone /admissions page)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none print:hidden">

        {/* Requirements & Eligibility + Documents */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">

          {/* Eligibility */}
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
        <div className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-3">
            <Coins className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">{t('admissions:fees.title')}</h3>
          </div>

          {/* Hero fee cards */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="flex-1 rounded-xl bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-6 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2)_0%,transparent_60%)] pointer-events-none" />
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-400 relative z-10">{t('admissions:fees.oneTimeLabel')}</span>
              <span className="text-4xl font-extrabold text-white font-mono relative z-10" dir="ltr">{t('admissions:fees.admissionAmount')}</span>
              <span className="text-emerald-100/80 text-xs font-semibold relative z-10">{t('admissions:fees.admissionDesc')}</span>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full w-fit relative z-10">
                ✦ {t('admissions:fees.admissionBadge')}
              </div>
            </div>

            <div className="flex-1 rounded-xl bg-zinc-50 border border-zinc-200 p-6 flex flex-col justify-center gap-2">
              <span className="text-xs font-extrabold text-zinc-500 uppercase tracking-widest">{t('admissions:fees.otherFeesLabel')}</span>
              <span className="text-4xl font-extrabold text-emerald-700 font-mono" dir="ltr">PKR 0</span>
              <span className="text-zinc-500 text-xs font-semibold">{t('admissions:fees.otherFeesDesc')}</span>
            </div>
          </div>

          {/* Free benefits grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { labelKey: 'admissions:fees.benefit1', icon: '📚' },
              { labelKey: 'admissions:fees.benefit2', icon: '🍽️' },
              { labelKey: 'admissions:fees.benefit3', icon: '🏠' },
              { labelKey: 'admissions:fees.benefit4', icon: '📋' },
            ].map((item) => (
              <div key={item.labelKey} className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 flex flex-col items-center gap-1.5 text-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">{t(item.labelKey)}</span>
                <span className="text-emerald-700 font-extrabold text-sm">{t('admissions:fees.freeLabel')}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-zinc-400 font-bold border-t border-zinc-100 pt-3">
            {t('admissions:fees.note')}
          </p>
        </div>

        {/* Admissions Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
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

          {/* Ready to apply callout */}
          <div className="md:col-span-4 p-6 rounded-2xl bg-emerald-950 text-white flex flex-col gap-4 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />
            <h3 className="text-base font-bold text-amber-400 relative z-10">{t('admissions:enroll.title')}</h3>
            <p className="text-emerald-100/80 text-xs leading-relaxed relative z-10">
              {t('admissions:enroll.desc')}
            </p>
            {/* Scroll down to the form */}
            <button
              onClick={() => document.getElementById('admission-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full mt-2 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold text-xs text-center shadow-md transition-all duration-300 flex items-center justify-center gap-1 relative z-10"
            >
              {t('navbar.applyNow')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — THE ADMISSION FORM
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        id="admission-form-section"
        className="w-full bg-zinc-100 border-t-4 border-emerald-600 print:border-none"
      >
        {/* Section header — hidden when printing */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 print:hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-600 text-white">
              <PenLine className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-zinc-950">
              داخلہ فارم &nbsp;<span className="text-emerald-700 font-mono text-base">(Admission Form)</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
            براہ کرم فارم کو احتیاط سے پر کریں۔ تمام لازمی فیلڈز کو پُر کریں اور ڈیجیٹل دستخط اپلوڈ کریں۔ فارم جمع کرنے کے بعد، آپ پی ڈی ایف ڈاؤن لوڈ یا پرنٹ کر سکتے ہیں۔
          </p>
        </div>

        {/* Form container */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AdmissionFormContainer />
        </div>
      </div>

    </div>
  );
}
