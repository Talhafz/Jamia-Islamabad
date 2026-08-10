'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Award,
  ChevronDown,
  ChevronRight,
  FileText,
  Quote,
  Sparkles,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Lazy-load ThreeCanvas — keeps Three.js off the critical JS path
const ThreeCanvasLazy = dynamic(
  () => import('../components/ThreeCanvas').then((m) => m.ThreeCanvas),
  { ssr: false, loading: () => null }
);

export default function Home() {
  const { t, currentLanguage } = useLanguage();
  const [isBioExpanded, setIsBioExpanded] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  const steps = [
    { title: t('home:process.step1.title'), desc: t('home:process.step1.desc'), icon: FileText },
    { title: t('home:process.step2.title'), desc: t('home:process.step2.desc'), icon: Award },
    { title: t('home:process.step3.title'), desc: t('home:process.step3.desc'), icon: Users },
  ];

  const scholarEndorsements = [
    {
      name: {
        ur: 'قیومِ زماں ، استاذ العلماء ، حضرت علامہ مولانا پیر سید محمد مظہر قیوم شاہ مشہدی رحمۃ اللہ علیہ',
        en: 'Hazrat Allama Maulana Pir Syed Muhammad Mazhar Qayyoom Shah Mashhadi (R.A.)',
        ar: 'قيوم الزمان أستاذ العلماء حضرت العلامة مولانا السید محمد مظہر قيوم شاہ المشہدي رحمه الله',
      },
      title: {
        ur: 'آستانہ عالیہ بھکھی شریف',
        en: 'Aastana Aalia Bhekkhi Sharif',
        ar: 'أستانة عالية بهكهي شريف',
      },
      quote: {
        ur: '”جامعہ اسلام آباد میرا اپنا جامعہ ہے ،اس میں بچوں کا داخلہ کراؤ۔“',
        en: '"Jamia Islamabad is my own Jamia; enroll your children here."',
        ar: '«جامعة إسلام آباد هي جامعتي الخاصة، فسجّلوا أبناءكم فيها.»',
      },
    },
    {
      name: {
        ur: 'شیخ الحدیث علامہ حافظ خادم حسین رضوی رحمۃ اللہ علیہ',
        en: 'Shaykh al-Hadith Allama Hafiz Khadim Hussain Rizvi (R.A.)',
        ar: 'شيخ الحديث العلامة الحافظ خادم حسين الرضوي رحمه الله',
      },
      title: {
        ur: 'مؤسس و امیر - تحریک لبیک پاکستان / شیخ الحدیث',
        en: 'Shaykh al-Hadith & Renowned Islamic Scholar',
        ar: 'شيخ الحديث وعالم إسلامي بارز',
      },
      quote: {
        ur: '”جامعہ اسلام آباد اہلسنت کی پناہ گاہ ہے ۔“',
        en: '"Jamia Islamabad is the sanctuary of Ahl-e-Sunnat."',
        ar: '«جامعة إسلام آباد هي ملاذ أهل السنة.»',
      },
    },
  ];

  const getReadBioLabel = () => {
    if (currentLanguage === 'ur') {
      return isBioExpanded ? 'مختصر کریں' : 'مکمل سوانح حیات پڑھیں';
    }
    if (currentLanguage === 'ar') {
      return isBioExpanded ? 'عرض أقل' : 'قراءة السيرة الذاتية كاملة';
    }
    return isBioExpanded ? 'Show Less' : 'Read Full Biography';
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_50%_35%,var(--color-emerald-mid)_0%,var(--color-emerald-deep)_45%,var(--color-emerald-bg)_85%)] bg-diagonal-pattern overflow-hidden py-16 md:py-24 select-none">
        <ThreeCanvasLazy />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(31,191,143,0.15)_0%,rgba(14,59,46,0.25)_50%,transparent_80%)] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5 max-w-4xl mx-auto"
          >
            {/* Logo Emblem */}
            <motion.div variants={itemVariants} className="flex justify-center mb-1">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border-2 border-[var(--color-gold-primary)] rounded-full bg-[var(--color-panel)]/80 p-1.5 shadow-xl shadow-[var(--color-gold-primary)]/15 overflow-hidden">
                <img src="/assets/Logo.png" alt="Jamia Islamabad Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
            </motion.div>

            {/* Vertical Stack matching Section 2 specification */}
            {/* 1. Small Eyebrow Label */}
            <motion.span
              variants={itemVariants}
              dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
              lang={currentLanguage}
              className={`text-[var(--color-teal-accent)] text-xs sm:text-sm font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full bg-[var(--color-panel)]/80 border border-[var(--color-teal-accent)]/30 shadow-sm ${
                currentLanguage === 'ur' || currentLanguage === 'ar' ? 'font-urdu' : ''
              }`}
            >
              {t('home:hero.eyebrow')}
            </motion.span>

            {/* 2. Primary Heading in Gold with soft glow */}
            <motion.h1
              variants={itemVariants}
              dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
              lang={currentLanguage}
              className={`${
                currentLanguage === 'en'
                  ? 'font-serif tracking-[0.12em] font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
                  : 'font-urdu font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.85]'
              } text-[var(--color-gold-primary)] [text-shadow:0_0_25px_rgba(212,160,23,0.30)] my-1`}
            >
              {t('home:hero.mainTitle')}
            </motion.h1>

            {/* 3. Thin 120px Gold-to-Teal Horizontal Divider Line */}
            <motion.div variants={itemVariants} className="w-[120px] h-[2px] bg-gradient-to-r from-[var(--color-gold-primary)] to-[var(--color-teal-accent)] rounded-full my-1" />

            {/* 4. Subtitle Supporting Text */}
            <motion.p
              variants={itemVariants}
              dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
              lang={currentLanguage}
              className={`${
                currentLanguage === 'en'
                  ? 'font-sans font-bold text-base sm:text-lg md:text-xl leading-relaxed tracking-wide'
                  : 'font-urdu font-extrabold text-lg sm:text-xl md:text-2xl leading-[1.85] tracking-wide'
              } text-[var(--color-teal-soft)]`}
            >
              {t('home:hero.tagline')}
            </motion.p>

            {/* 5. Short Tagline Paragraph in Body Text */}
            <motion.p
              variants={itemVariants}
              className="text-[var(--color-text-body)] text-sm sm:text-base max-w-[480px] leading-relaxed text-center"
            >
              {t('home:hero.description')}
            </motion.p>

            {/* 6. Two CTA Buttons Side-by-Side */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/admission-form"
                className="btn-primary-gold px-6 py-3 text-xs uppercase flex items-center gap-2 shadow-lg"
              >
                {t('home:hero.ctaApply')}
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="btn-secondary-teal px-6 py-3 text-xs uppercase flex items-center gap-2"
              >
                {t('home:hero.ctaExplore')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--color-text-muted)] select-none animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{t('home:scroll')}</span>
          <div className="w-1.5 h-3.5 border border-[var(--color-teal-accent)] rounded-full flex justify-center p-0.5">
            <div className="w-0.5 h-1 bg-[var(--color-teal-accent)] rounded-full" />
          </div>
        </div>
      </section>

      {/* PRINCIPAL SECTION */}
      <section className="w-full py-16 md:py-24 bg-[var(--color-panel)] select-none border-t border-[var(--color-emerald-mid)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Photo + Name & Titles (Photo column narrower ~40% / col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
              <div className="relative w-full max-w-md flex flex-col items-center">
                {/* Soft Mihrab / Arch-shaped Radial Glow behind figure (decorative depth, ~15-20% opacity) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[90%] rounded-t-full bg-[radial-gradient(ellipse_at_top,rgba(212,160,23,0.18)_0%,rgba(31,191,143,0.12)_50%,transparent_80%)] blur-2xl pointer-events-none" />

                {/* Background-removed Figure Image */}
                <img
                  src="/assets/doctor_sahib_transparent.png"
                  alt={t('about:biography.name')}
                  className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                />

                {/* Reused Hero Divider Line (exact same style & color) */}
                <div className="relative z-10 w-[120px] h-[2px] bg-gradient-to-r from-[var(--color-gold-primary)] to-[var(--color-teal-accent)] rounded-full my-4" />

                {/* Name + Titles directly on background with generous line spacing */}
                <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 py-2">
                  <span className="text-[var(--color-gold-primary)] text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em]">
                    {t('home:principal.label')}
                  </span>
                  <span className="text-[var(--color-teal-soft)] font-bold text-xs sm:text-sm leading-relaxed">
                    {t('about:biography.namePrefix')}
                  </span>
                  <h2 className="text-[var(--color-gold-bright)] font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-normal leading-relaxed sm:leading-[1.95] font-urdu px-2 text-center">
                    {t('about:biography.name')}
                  </h2>
                  <p className="text-[var(--color-text-body)] text-xs sm:text-sm font-medium leading-relaxed sm:leading-[1.85] font-urdu max-w-sm mt-1 px-2 text-center">
                    {t('about:biography.subtitle')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Biography Text + Collapsible Toggle + Poem (~60% / col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-[var(--color-text-body)]">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)] font-urdu leading-relaxed">
                {t('home:principal.title')}
              </h2>

              {/* Collapsible Biography Text Area (~4 lines default with CSS max-height transition) */}
              <div className="relative flex flex-col">
                <div
                  className={`flex flex-col gap-4 text-sm leading-relaxed sm:leading-[1.85] font-urdu text-justify transition-all duration-500 ease-in-out overflow-hidden ${
                    isBioExpanded ? 'max-h-[1200px]' : 'max-h-[140px]'
                  }`}
                >
                  <p>{t('home:principal.p1')}</p>
                  <p>{t('home:principal.p2')}</p>
                  <p>{t('home:principal.p3')}</p>
                  <p>{t('home:principal.p4')}</p>
                </div>

                {/* Bottom Fade-to-background gradient mask when collapsed */}
                {!isBioExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--color-panel)] to-transparent pointer-events-none transition-opacity duration-300" />
                )}
              </div>

              {/* Read Full Biography / Show Less Toggle Button (Fully Localized) */}
              <button
                onClick={() => setIsBioExpanded(prev => !prev)}
                className="self-start inline-flex items-center gap-2 text-[var(--color-gold-primary)] hover:text-[var(--color-gold-bright)] font-bold text-xs uppercase tracking-wider transition-colors duration-200 focus:outline-none group mt-1"
                aria-expanded={isBioExpanded}
              >
                <span className={currentLanguage === 'ur' || currentLanguage === 'ar' ? 'font-urdu text-sm' : ''}>
                  {getReadBioLabel()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-gold-primary)] group-hover:text-[var(--color-gold-bright)] transition-transform duration-300 ${
                    isBioExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Closing Couplet / Poem Block — ALWAYS VISIBLE OUTSIDE COLLAPSED AREA */}
              <div className="text-[var(--color-gold-bright)] font-urdu text-lg leading-relaxed text-center font-bold mt-2 bg-[var(--color-emerald-deep)]/80 border border-[var(--color-gold-muted)]/30 p-5 rounded-[4px] shadow-inner">
                {t('home:principal.poem').split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ADMISSION STEPPER SECTION */}
      <section className="w-full py-16 md:py-24 bg-[var(--color-panel)] select-none border-t border-[var(--color-emerald-mid)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">{t('home:process.title')}</h2>
            <p className="text-[var(--color-teal-accent)] text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-4 relative">
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-2/3 right-0 h-0.5 bg-[var(--color-emerald-mid)]" />
                  )}
                  <div className="w-14 h-14 rounded-sm border-2 border-[var(--color-gold-primary)] bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] flex items-center justify-center shadow-lg relative z-10">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-sm bg-[var(--color-maroon)] text-[var(--color-ivory)] font-bold text-[10px] flex items-center justify-center shadow-md">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[var(--color-gold-bright)] font-bold text-sm block mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-text-body)] text-xs leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <Link
              href="/admission-form"
              className="btn-primary-gold px-6 py-3 text-xs uppercase shadow-md transition-all duration-300"
            >
              {t('home:applyOnline')}
            </Link>
          </div>
        </div>
      </section>

      {/* ENDORSEMENTS: IN THE VIEW OF EMINENT SPIRITUAL MASTERS & ESTEEMED SCHOLARS */}
      <section className="w-full py-16 md:py-24 bg-[var(--color-emerald-bg)] select-none border-t border-[var(--color-emerald-mid)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2
              dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
              className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-gold-primary)] ${
                currentLanguage === 'en' ? 'font-serif tracking-normal' : 'font-urdu leading-[1.85] sm:leading-[2]'
              } py-1`}
            >
              {t('home:endorsements.title')}
            </h2>
            <p
              dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
              className={`text-[var(--color-teal-accent)] text-xs sm:text-sm mt-2 uppercase tracking-widest font-mono font-bold leading-relaxed px-2 ${
                currentLanguage === 'ur' || currentLanguage === 'ar' ? 'font-urdu' : ''
              }`}
            >
              {t('home:endorsements.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            {scholarEndorsements.map((scholar, idx) => {
              const langKey = (currentLanguage === 'ur' || currentLanguage === 'ar' || currentLanguage === 'en') ? currentLanguage : 'en';
              const nameText = scholar.name[langKey] || scholar.name.ur;
              const titleText = scholar.title[langKey] || scholar.title.ur;
              const quoteText = scholar.quote[langKey] || scholar.quote.ur;

              return (
                <div
                  key={idx}
                  className="bg-[var(--color-emerald-deep)]/90 border border-[var(--color-gold-muted)]/40 p-8 sm:p-10 rounded-[4px] shadow-2xl flex flex-col justify-between items-center text-center group hover:border-[var(--color-gold-primary)] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle Gold Corner Accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[var(--color-gold-primary)]/20 to-transparent pointer-events-none" />

                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-[var(--color-gold-primary)] opacity-50 mb-4" />

                  {/* Quote Statement */}
                  <p
                    dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
                    className={`text-[var(--color-gold-bright)] ${
                      currentLanguage === 'en' ? 'font-serif text-lg sm:text-xl leading-relaxed' : 'font-urdu text-xl sm:text-2xl leading-[2.2] sm:leading-[2.4]'
                    } font-bold text-center mb-6 py-2 px-2`}
                  >
                    {quoteText}
                  </p>

                  {/* Scholar Name & Title */}
                  <div className="w-full border-t border-[var(--color-emerald-mid)]/60 pt-4 flex flex-col items-center gap-1">
                    <h3
                      dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
                      className={`text-[var(--color-gold-primary)] ${
                        currentLanguage === 'en' ? 'font-bold text-base sm:text-lg' : 'font-urdu font-black text-base sm:text-xl leading-[1.95] sm:leading-[2.1]'
                      } text-center py-1`}
                    >
                      {nameText}
                    </h3>
                    <span
                      dir={currentLanguage === 'en' ? 'ltr' : 'rtl'}
                      className={`text-[var(--color-teal-soft)] text-xs sm:text-sm font-semibold tracking-wide text-center leading-relaxed py-0.5 ${
                        currentLanguage === 'ur' || currentLanguage === 'ar' ? 'font-urdu' : ''
                      }`}
                    >
                      {titleText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="w-full py-16 bg-[radial-gradient(ellipse_at_center,var(--color-emerald-deep)_0%,var(--color-emerald-bg)_80%)] border-t border-[var(--color-emerald-mid)] select-none text-[var(--color-ivory)] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <Sparkles className="w-10 h-10 text-[var(--color-gold-primary)] animate-pulse" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">
            {t('home:cta.title', { year: new Date().getFullYear().toString() })}
          </h2>
          <p className="text-[var(--color-text-body)] text-sm max-w-xl leading-relaxed">
            {t('home:cta.desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              href="/admission-form"
              className="btn-primary-gold px-6 py-3 text-xs uppercase shadow-lg"
            >
              {t('home:cta.btnApply')}
            </Link>
            <Link
              href="/contact"
              className="btn-secondary-teal px-6 py-3 text-xs uppercase"
            >
              {t('home:cta.btnContact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
