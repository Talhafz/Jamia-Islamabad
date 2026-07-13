'use client';

import React from 'react';
import Link from 'next/link';
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
import { ThreeCanvas } from '../components/ThreeCanvas';
import { useLanguage } from '../context/LanguageContext';

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
      title: t('home:programs.dars.title'),
      desc: t('home:programs.dars.desc'),
      duration: '8 Years',
      icon: BookOpen,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: t('home:programs.hifz.title'),
      desc: t('home:programs.hifz.desc'),
      duration: '3 Years (Avg)',
      icon: Sparkles,
      color: 'from-amber-500/10 to-amber-600/10',
    },
    {
      title: t('home:programs.tajweed.title'),
      desc: t('home:programs.tajweed.desc'),
      duration: '1 Year',
      icon: Compass,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: t('home:programs.matricFa.title'),
      desc: t('home:programs.matricFa.desc'),
      duration: '2 Years each',
      icon: Award,
      color: 'from-amber-500/10 to-amber-600/10',
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
      <section className="relative w-full min-h-[100vh] flex items-center justify-center bg-zinc-950 overflow-hidden pt-36 pb-16 select-none -mt-20">
        <ThreeCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div variants={itemVariants} className="flex justify-center mb-1">
              <div className="relative w-28 h-28 flex items-center justify-center border-2 border-emerald-500/60 rounded-full bg-emerald-950/40 p-2 shadow-lg shadow-emerald-500/10 overflow-hidden">
                <img src="/assets/Logo.png" alt="Jamia Islamabad Logo" className="w-full h-full object-contain drop-shadow-md animate-pulse-slow" />
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none max-w-4xl"
            >
              <span className="font-urdu text-emerald-400 block text-4xl sm:text-5xl mb-3">
                {t('home:hero.subtitle')}
              </span>
              {t('home:hero.title')}
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed"
            >
              {t('home:hero.description')}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/admission-form"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
              >
                {t('home:hero.ctaApply')}
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold border border-zinc-800 transition-all duration-300"
              >
                {t('home:hero.ctaExplore')}
              </Link>
              <Link
                href="/admissions"
                className="px-6 py-3 rounded-full bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all duration-300"
              >
                {t('home:hero.ctaRequirements')}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 select-none animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{t('home:scroll')}</span>
          <div className="w-1.5 h-3.5 border border-zinc-500 rounded-full flex justify-center p-0.5">
            <div className="w-0.5 h-1 bg-zinc-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* PRINCIPAL SECTION */}
      <section className="w-full py-16 md:py-24 bg-white select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Stamp Card Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 rounded-2xl border border-red-500/30 bg-red-50/10 text-center max-w-sm shadow-xl shadow-red-500/5">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-red-600 text-white text-[9px] font-bold tracking-widest uppercase rounded">
                  {t('home:principal.label')}
                </div>
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-red-500/40 bg-zinc-100 mx-auto mb-6 flex items-center justify-center overflow-hidden shadow-lg">
                  <img src="/assets/doctor_sahib.jpeg" alt={t('about:biography.name')} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-red-700 font-bold text-sm block mb-1">{t('about:biography.namePrefix')}</h3>
                <h2 className="text-zinc-950 font-extrabold text-2xl tracking-tight mb-3 leading-snug">{t('about:biography.name')}</h2>
                <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium border-t border-red-100 pt-3">
                  {t('about:biography.subtitle')}
                </p>
                <div className="border-t border-red-100 pt-3 flex justify-between items-center text-[10px] font-bold text-red-800">
                  <span>ESTABLISHED 1992</span>
                  <span>ISLAMABAD, PAKISTAN</span>
                </div>
              </div>
            </div>

            {/* Introduction message */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-800">
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                {t('home:principal.title')}
              </h2>
              <p className="text-zinc-650 text-sm leading-relaxed text-justify">
                {t('home:principal.desc1')}
              </p>
              <p className="text-zinc-650 text-sm leading-relaxed text-justify">
                {t('home:principal.desc2')}
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-700 font-bold text-xs group"
                >
                  {t('home:principal.readMore')}
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">{t('home:programs.title')}</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200/80 p-6 flex flex-col justify-between items-start gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
                >
                  <div className="flex flex-col gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${prog.color} text-emerald-700`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-zinc-950 font-extrabold text-sm block mb-1">
                        {prog.title}
                      </h3>
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] font-bold font-mono">
                        {prog.duration}
                      </span>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed">{prog.desc}</p>
                  </div>
                  <Link
                    href="/programs"
                    className="text-emerald-800 hover:text-emerald-700 font-bold text-xs flex items-center gap-0.5 mt-2"
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
      <section className="w-full py-16 md:py-24 bg-white select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">{t('home:process.title')}</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-4 relative">
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-2/3 right-0 h-0.5 bg-zinc-100" />
                  )}
                  <div className="w-14 h-14 rounded-full border border-emerald-500/30 bg-emerald-50/50 text-emerald-800 flex items-center justify-center shadow-md relative z-10">
                    <Icon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-zinc-950 font-bold text-sm block mb-1">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xs mx-auto">
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
              className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold shadow-md transition-all duration-300"
            >
              {t('home:applyOnline')}
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">{t('home:testimonials.title')}</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              {t('home:testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t_item, idx) => (
              <div key={idx} className="rounded-2xl p-6 border border-zinc-200 bg-white text-left flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-zinc-650 italic text-xs leading-relaxed">
                  &ldquo;{t_item.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                    <Users className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-zinc-950 font-bold text-xs leading-none">{t_item.author}</h4>
                    <span className="text-[10px] text-zinc-500 mt-1 block">{t_item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="w-full py-16 bg-gradient-to-r from-emerald-850 to-emerald-950 select-none text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('home:cta.title', { year: new Date().getFullYear().toString() })}
          </h2>
          <p className="text-emerald-100/70 text-sm max-w-xl leading-relaxed">
            {t('home:cta.desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              href="/admission-form"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-xs shadow-md transition-all duration-300"
            >
              {t('home:cta.btnApply')}
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-xs transition-all duration-300"
            >
              {t('home:cta.btnContact')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
