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
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] min-h-screen">

      {/* ── Banner ──────────────────────────────────────────────────────────── */}
      <div className="w-full print:hidden">
        <PageBanner
          title={t('admissions:title')}
          description={t('admissions:description')}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — ADMISSION REQUIREMENTS
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none print:hidden">

        {/* Requirements & Eligibility + Documents */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">

          {/* Eligibility */}
          <div className="md:col-span-6 card-standard flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)] pb-3">
              <ClipboardList className="w-5 h-5 text-[var(--color-teal-accent)]" />
              <h3 className="text-base font-bold">{t('admissions:eligibility.title')}</h3>
            </div>
            <div className="text-xs sm:text-sm text-[var(--color-text-body)] flex flex-col gap-3">
              <p className="leading-relaxed">
                <strong className="text-[var(--color-gold-bright)]">{t('admissions:eligibility.generalTitle')}</strong> {t('admissions:eligibility.generalDesc')}
              </p>
              <p className="leading-relaxed">
                <strong className="text-[var(--color-gold-bright)]">{t('admissions:eligibility.darsTitle')}</strong> {t('admissions:eligibility.darsDesc')}
              </p>
              <p className="leading-relaxed">
                <strong className="text-[var(--color-gold-bright)]">{t('admissions:eligibility.hifzTitle')}</strong> {t('admissions:eligibility.hifzDesc')}
              </p>
              <p className="leading-relaxed">
                <strong className="text-[var(--color-gold-bright)]">{t('admissions:eligibility.conductTitle')}</strong> {t('admissions:eligibility.conductDesc')}
              </p>
            </div>
          </div>

          {/* Required Documents */}
          <div className="md:col-span-6 card-standard flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)] pb-3">
              <FileCheck className="w-5 h-5 text-[var(--color-teal-accent)]" />
              <h3 className="text-base font-bold">{t('admissions:documents.title')}</h3>
            </div>
            <ul className="list-disc pl-5 flex flex-col gap-2.5 text-xs sm:text-sm text-[var(--color-text-body)] font-medium">
              {reqDocs.map((doc, idx) => (
                <li key={idx}>{doc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="card-standard flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)] pb-3">
            <Coins className="w-5 h-5 text-[var(--color-teal-accent)]" />
            <h3 className="text-base font-bold">{t('admissions:fees.title')}</h3>
          </div>

          {/* Hero fee cards */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="flex-1 rounded-xl bg-[var(--color-emerald-deep)] border border-[var(--color-gold-muted)]/40 text-[var(--color-ivory)] p-6 flex flex-col gap-2 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(31,191,143,0.15)_0%,transparent_60%)] pointer-events-none" />
              <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--color-teal-soft)] relative z-10">{t('admissions:fees.oneTimeLabel')}</span>
              <span className="text-4xl font-extrabold text-[var(--color-gold-bright)] font-mono relative z-10" dir="ltr">{t('admissions:fees.admissionAmount')}</span>
              <span className="text-[var(--color-text-body)] text-xs font-semibold relative z-10">{t('admissions:fees.admissionDesc')}</span>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-[var(--color-gold-primary)]/20 border border-[var(--color-gold-muted)]/40 text-[var(--color-gold-bright)] text-[10px] font-extrabold px-2.5 py-1 rounded-full w-fit relative z-10">
                ✦ {t('admissions:fees.admissionBadge')}
              </div>
            </div>

            <div className="flex-1 rounded-xl bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)] p-6 flex flex-col justify-center gap-2">
              <span className="text-xs font-extrabold text-[var(--color-teal-soft)] uppercase tracking-widest">{t('admissions:fees.otherFeesLabel')}</span>
              <span className="text-4xl font-extrabold text-[var(--color-gold-bright)] font-mono" dir="ltr">PKR 0</span>
              <span className="text-[var(--color-text-body)] text-xs font-semibold">{t('admissions:fees.otherFeesDesc')}</span>
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
              <div key={item.labelKey} className="rounded-xl border border-[var(--color-emerald-mid)] bg-[var(--color-emerald-deep)] p-4 flex flex-col items-center gap-1.5 text-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-bold text-[var(--color-teal-soft)] uppercase tracking-wide">{t(item.labelKey)}</span>
                <span className="text-[var(--color-gold-bright)] font-extrabold text-sm">{t('admissions:fees.freeLabel')}</span>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-[var(--color-text-muted)] font-bold border-t border-[var(--color-emerald-mid)] pt-3">
            {t('admissions:fees.note')}
          </p>
        </div>

        {/* Admissions Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 card-standard flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)] pb-3">
              <CalendarDays className="w-5 h-5 text-[var(--color-teal-accent)]" />
              <h3 className="text-base font-bold">{t('admissions:calendar.title')}</h3>
            </div>
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-28 font-bold font-mono text-[var(--color-gold-bright)] shrink-0">{item.date}</div>
                  <div>
                    <strong className="block text-[var(--color-gold-primary)]">{item.title}</strong>
                    <span className="text-[var(--color-text-body)]">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ready to apply callout */}
          <div className="md:col-span-4 card-standard border-l-4 border-l-[var(--color-gold-primary)] flex flex-col gap-4 shadow-xl">
            <h3 className="text-base font-bold text-[var(--color-gold-primary)]">{t('admissions:enroll.title')}</h3>
            <p className="text-[var(--color-text-body)] text-xs leading-relaxed">
              {t('admissions:enroll.desc')}
            </p>
            <button
              onClick={() => document.getElementById('admission-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary-gold w-full mt-2 py-3 rounded-lg font-extrabold text-xs text-center shadow-md flex items-center justify-center gap-1"
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
        className="w-full bg-[var(--color-emerald-bg)] border-t-2 border-[var(--color-gold-primary)] print:border-none"
      >
        {/* Section header — hidden when printing */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 print:hidden text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/30 text-[var(--color-gold-primary)]">
              <PenLine className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[var(--color-gold-primary)]">
              داخلہ فارم &nbsp;<span className="text-[var(--color-teal-soft)] font-mono text-base">(Admission Form)</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-teal-soft)] leading-relaxed max-w-2xl">
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
