'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  ChevronRight,
  Compass,
  FileText,
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
  const { t } = useLanguage();

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

  const programs = [
    {
      title: t('home:programs.c1.title'),
      desc: t('home:programs.c1.desc'),
      duration: t('programs:courses.c1.duration'),
      icon: Compass,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: t('home:programs.c2.title'),
      desc: t('home:programs.c2.desc'),
      duration: t('programs:courses.c2.duration'),
      icon: Sparkles,
      color: 'from-amber-500/10 to-amber-600/10',
    },
    {
      title: t('home:programs.c3.title'),
      desc: t('home:programs.c3.desc'),
      duration: t('programs:courses.c3.duration'),
      icon: BookOpen,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: t('home:programs.c4.title'),
      desc: t('home:programs.c4.desc'),
      duration: t('programs:courses.c4.duration'),
      icon: BookOpen,
      color: 'from-amber-500/10 to-amber-600/10',
    },
    {
      title: t('home:programs.c5.title'),
      desc: t('home:programs.c5.desc'),
      duration: t('programs:courses.c5.duration'),
      icon: Award,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
  ];

  const steps = [
    { title: t('home:process.step1.title'), desc: t('home:process.step1.desc'), icon: FileText },
    { title: t('home:process.step2.title'), desc: t('home:process.step2.desc'), icon: Award },
    { title: t('home:process.step3.title'), desc: t('home:process.step3.desc'), icon: Users },
  ];

  const testimonials = [
    { text: t('home:testimonials.t1'), author: t('home:testimonials.t1Author'), role: t('home:testimonials.t1Role') },
    { text: t('home:testimonials.t2'), author: t('home:testimonials.t2Author'), role: t('home:testimonials.t2Role') },
    { text: t('home:testimonials.t3'), author: t('home:testimonials.t3Author'), role: t('home:testimonials.t3Role') },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,var(--color-emerald-deep)_0%,var(--color-emerald-bg)_75%)] bg-diagonal-pattern overflow-hidden py-16 md:py-24 select-none -mt-20">
        <ThreeCanvasLazy />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,59,46,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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
              className="text-[var(--color-teal-accent)] text-xs font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-[var(--color-panel)]/80 border border-[var(--color-teal-accent)]/30"
            >
              اسلام آباد ایجوکیشن اینڈ ریلیف فاؤنڈیشن
            </motion.span>

            {/* 2. Primary Urdu Heading in Gold with soft glow */}
            <motion.h1
              variants={itemVariants}
              dir="rtl"
              lang="ur"
              className="font-urdu font-black text-[var(--color-gold-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.85] [text-shadow:0_0_25px_rgba(212,160,23,0.30)] my-1"
            >
              جامعہ اسلام آباد
            </motion.h1>

            {/* 3. Thin 120px Gold-to-Teal Horizontal Divider Line */}
            <motion.div variants={itemVariants} className="w-[120px] h-[2px] bg-gradient-to-r from-[var(--color-gold-primary)] to-[var(--color-teal-accent)] rounded-full my-1" />

            {/* 4. English / Subtitle Supporting Text */}
            <motion.p
              variants={itemVariants}
              dir="rtl"
              lang="ur"
              className="font-urdu font-extrabold text-[var(--color-teal-soft)] text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide"
            >
              وفاقی دارالحکومت میں دینی و عصری تعلیم کا عظیم مرکز
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Stamp Card Frame with Maroon Accent */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 rounded-2xl border border-[var(--color-gold-muted)]/40 bg-[var(--color-emerald-deep)] text-center max-w-sm shadow-2xl">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--color-maroon)] text-[var(--color-ivory)] text-[9px] font-bold tracking-widest uppercase rounded shadow-md">
                  {t('home:principal.label')}
                </div>
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[var(--color-gold-primary)] bg-[var(--color-panel)] mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-xl">
                  <img src="/assets/doctor_sahib.jpeg" alt={t('about:biography.name')} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-[var(--color-teal-soft)] font-bold text-sm block mb-1">{t('about:biography.namePrefix')}</h3>
                <h2 className="text-[var(--color-gold-bright)] font-extrabold text-2xl tracking-tight mb-3 leading-snug">{t('about:biography.name')}</h2>
                <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed mb-4 font-medium border-t border-[var(--color-emerald-mid)] pt-3">
                  {t('about:biography.subtitle')}
                </p>
                <div className="border-t border-[var(--color-emerald-mid)] pt-3 flex justify-between items-center text-[10px] font-bold text-[var(--color-gold-muted)]">
                  <span>ESTABLISHED 1992</span>
                  <span>ISLAMABAD, PAKISTAN</span>
                </div>
              </div>
            </div>

            {/* Introduction message */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-[var(--color-text-body)]">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">
                {t('home:principal.title')}
              </h2>
              <p className="text-[var(--color-text-body)] text-sm leading-relaxed text-justify">
                {t('home:principal.p1')}
              </p>
              <p className="text-[var(--color-text-body)] text-sm leading-relaxed text-justify">
                {t('home:principal.p2')}
              </p>
              <p className="text-[var(--color-text-body)] text-sm leading-relaxed text-justify">
                {t('home:principal.p3')}
              </p>
              <p className="text-[var(--color-text-body)] text-sm leading-relaxed text-justify">
                {t('home:principal.p4')}
              </p>
              <div className="text-[var(--color-gold-bright)] font-urdu text-lg leading-relaxed text-center font-bold my-4 bg-[var(--color-emerald-deep)]/80 border border-[var(--color-gold-muted)]/30 p-5 rounded-xl shadow-inner">
                {t('home:principal.poem').split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section className="w-full py-16 md:py-24 bg-[var(--color-emerald-bg)] select-none border-t border-[var(--color-emerald-mid)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">{t('home:programs.title')}</h2>
            <p className="text-[var(--color-teal-accent)] text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="bg-[var(--color-panel)] rounded-2xl border border-[var(--color-emerald-mid)] p-6 flex flex-col justify-between items-start gap-4 hover:border-[var(--color-gold-primary)] hover:-translate-y-1 transition-all duration-300 text-left shadow-lg"
                >
                  <div className="flex flex-col gap-3">
                    <div className="p-3 rounded-xl bg-[var(--color-emerald-deep)] text-[var(--color-teal-accent)] border border-[var(--color-teal-accent)]/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[var(--color-gold-bright)] font-extrabold text-sm block mb-1">
                        {prog.title}
                      </h3>
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-[var(--color-emerald-deep)] text-[var(--color-teal-soft)] text-[10px] font-bold font-mono border border-[var(--color-teal-accent)]/20">
                        {prog.duration}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-body)] text-xs leading-relaxed">{prog.desc}</p>
                  </div>
                  <Link
                    href="/programs"
                    className="text-[var(--color-gold-primary)] hover:text-[var(--color-gold-bright)] font-bold text-xs flex items-center gap-0.5 mt-2"
                  >
                    {t('home:viewDetails')}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
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
                  <div className="w-14 h-14 rounded-full border-2 border-[var(--color-gold-primary)] bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] flex items-center justify-center shadow-lg relative z-10">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-maroon)] text-[var(--color-ivory)] font-bold text-[10px] flex items-center justify-center shadow-md">
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

      {/* TESTIMONIALS */}
      <section className="w-full py-16 md:py-24 bg-[var(--color-emerald-bg)] select-none border-t border-[var(--color-emerald-mid)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">{t('home:testimonials.title')}</h2>
            <p className="text-[var(--color-teal-accent)] text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t_item, idx) => (
              <div key={idx} className="rounded-2xl p-6 border border-[var(--color-emerald-mid)] bg-[var(--color-panel)] text-left flex flex-col justify-between gap-4 shadow-md hover:border-[var(--color-gold-primary)] transition-all duration-300">
                <p className="text-[var(--color-text-body)] italic text-xs leading-relaxed">
                  &ldquo;{t_item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-emerald-deep)] border border-[var(--color-teal-accent)]/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[var(--color-teal-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-[var(--color-gold-bright)] font-bold text-xs leading-none">{t_item.author}</h4>
                    <span className="text-[10px] text-[var(--color-text-muted)] mt-1 block">{t_item.role}</span>
                  </div>
                </div>
              </div>
            ))}
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
