'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Compass, 
  FileText, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { ThreeCanvas } from '../components/ThreeCanvas';

export default function Home() {
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
      title: 'درس نظامی (Dars-e-Nizami)',
      desc: 'Comprehensive 8-year course in Classical Islamic Theology, Arabic Grammar, Jurisprudence (Fiqh), and Hadith Literature.',
      duration: '8 Years',
      icon: BookOpen,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: 'حفظ القرآن (Hifz-ul-Quran)',
      desc: 'Structured Quran memorization curriculum taught by experienced Qaris with emphasis on correct pronunciation and revision.',
      duration: '3 Years (Avg)',
      icon: Sparkles,
      color: 'from-amber-500/10 to-amber-600/10',
    },
    {
      title: 'تجوید و قراءت (Tajweed-o-Qira\'at)',
      desc: 'Specialized certification course in the classical rules of Quranic recitation and reading methodologies.',
      duration: '1 Year',
      icon: Compass,
      color: 'from-emerald-500/10 to-emerald-600/10',
    },
    {
      title: 'مٹرک / ایف اے (Matric/FA)',
      desc: 'Board-affiliated science and arts education running concurrently with secondary Islamic theological courses.',
      duration: '2 Years each',
      icon: Award,
      color: 'from-amber-500/10 to-amber-600/10',
    },
  ];

  const steps = [
    { title: 'Fill Online Form', desc: 'Navigate to the digital admission form page, input personal & guardian details, and upload documents.', icon: FileText },
    { title: 'Print & Sign Form', desc: 'Download the filled digital replica, print it on A4 paper, and secure student and guardian signatures.', icon: Award },
    { title: 'Submit & Test', desc: 'Bring the form with educational documents to the admin office for a verification interview.', icon: Users },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center bg-zinc-950 overflow-hidden pt-36 pb-16 select-none -mt-20">
        <ThreeCanvas />
        
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            {/* Islamic Star Calligraphy Frame mockup */}
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
                جامعہ اسلام آباد
              </span>
              Empowering Minds, Nurturing Souls
            </motion.h1>

            <motion.p 
              variants={itemVariants} 
              className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed"
            >
              Where classical Islamic theological studies blend seamlessly with modern secondary education, fostering ethical leadership and academic brilliance under the guidance of Dr. Mufti Muhammad Zafar Iqbal Jalali.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/admission-form"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-1.5"
              >
                Apply Online (داخلہ فارم)
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/programs"
                className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-bold border border-zinc-800 transition-all duration-300"
              >
                Explore Programs
              </Link>
              <Link
                href="/admissions"
                className="px-6 py-3 rounded-full bg-emerald-950/30 hover:bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all duration-300"
              >
                Admission Requirements
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 select-none animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-mono font-bold">Scroll</span>
          <div className="w-1.5 h-3.5 border border-zinc-500 rounded-full flex justify-center p-0.5">
            <div className="w-0.5 h-1 bg-zinc-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* PRINCIPAL SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full py-16 md:py-24 bg-white select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Stamp Card Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-6 rounded-2xl border border-red-500/30 bg-red-50/10 text-center max-w-sm shadow-xl shadow-red-500/5">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-red-600 text-white text-[9px] font-bold tracking-widest uppercase rounded">
                  Principal & Founder
                </div>
                <div className="w-24 h-24 rounded-full border-2 border-red-500/40 bg-zinc-100 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {/* Mock profile image holder with high styling */}
                  <Users className="w-12 h-12 text-red-500/30" />
                </div>
                <h3 className="text-red-700 font-extrabold text-lg block mb-0.5">پروفیسر ڈاکٹر مفتی</h3>
                <h2 className="text-zinc-950 font-extrabold text-2xl tracking-tight mb-2">محمد ظفر اقبال جلالی</h2>
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  Sheikh-ul-Hadith, Ustad-ul-Asatiza, and a leading Islamic academician dedicated to modeling modern platforms for holistic moral and theological education.
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
                Preserving Sacred Knowledge, Shaping Future Leaders
              </h2>
              <p className="text-zinc-650 text-sm leading-relaxed text-justify">
                Jamia Islamabad is a beacon of Islamic learning, established to nurture scholarly intelligence alongside practical modern competencies. In a rapidly changing world, our curriculum provides students with a solid foundation in the Islamic sciences (Hadith, Tafseer, Fiqh, Arabic Calligraphy) coupled with formal board education.
              </p>
              <p className="text-zinc-650 text-sm leading-relaxed text-justify">
                Through this Education Management System, we streamline our admissions, academic performance, and student tracking, moving towards a modern digital workspace while remaining grounded in our fundamental values.
              </p>
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-700 font-bold text-xs group"
                >
                  Read More About Our Mission
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ACADEMIC PROGRAMS */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">Academic Pathways</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              Programs Offered / شعبہ جات
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
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* ADMISSION STEPPER SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full py-16 md:py-24 bg-white select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">How to Apply</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              Admission Process Stepper
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-4 relative">
                  {/* Arrow separators for desktop */}
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
              Fill Out Admission Form
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TESTIMONIALS */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full py-16 md:py-24 bg-zinc-50 select-none border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">Student & Parent Success</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest font-mono font-bold">
              Testimonials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-zinc-200 text-left flex flex-col justify-between gap-4">
              <p className="text-zinc-650 italic text-xs leading-relaxed">
                "The dual pathway matric system at Jamia Islamabad let my son continue Quranic specialization without putting his school certifications on hold. Highly recommended for parents who want both education tracks."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Users className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-zinc-950 font-bold text-xs leading-none">Muhammad Aslam</h4>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Parent of Muhammad Ali</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-zinc-200 text-left flex flex-col justify-between gap-4">
              <p className="text-zinc-650 italic text-xs leading-relaxed">
                "Under Mufti Zafar Iqbal's guidance, study circles are deep, rigorous, and inspiring. Classical grammar and Arabic syntax are taught at a very high standard, helping me gain solid command."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Users className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-zinc-950 font-bold text-xs leading-none">Anas Khan</h4>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Alim Graduate (2025)</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-zinc-200 text-left flex flex-col justify-between gap-4">
              <p className="text-zinc-650 italic text-xs leading-relaxed">
                "The environment at Jamia is extremely respectful and focused. Tutors push students to exhibit excellence in daily character traits. It is much more than simple academics, it is tarbiyah."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Users className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-zinc-950 font-bold text-xs leading-none">Bilal Ahmad</h4>
                  <span className="text-[10px] text-zinc-500 mt-1 block">Hifz Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CALL-TO-ACTION */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full py-16 bg-gradient-to-r from-emerald-850 to-emerald-950 select-none text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Admissions are Open for academic session {new Date().getFullYear()}
          </h2>
          <p className="text-emerald-100/70 text-sm max-w-xl leading-relaxed">
            Secure your seat today by filling out our digital admission application. Print it out and submit it physically to the administrator to initialize your academic records.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link
              href="/admission-form"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-xs shadow-md transition-all duration-300"
            >
              Start Application Form
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-xs transition-all duration-300"
            >
              Contact Admin Office
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
