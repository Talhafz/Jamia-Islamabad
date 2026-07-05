import React from 'react';
import { BookOpen, Compass, Award, Star } from 'lucide-react';

export const metadata = {
  title: 'Academic Programs | Jamia Islamabad',
  description: 'Detailed curriculum and program guides for Dars-e-Nizami, Hifz, Tajweed, and Secondary School certifications.',
};

export default function ProgramsPage() {
  const courses = [
    {
      title: 'درس نظامی (Dars-e-Nizami)',
      focus: 'Theological Leadership',
      duration: '8 Years',
      desc: 'Our flagship theological program. Includes exhaustive studies in Arabic morphology (Sarf), Syntax (Nahw), Logic (Mantiq), Islamic Jurisprudence (Fiqh), Principles of Fiqh (Usul al-Fiqh), Quranic Exegesis (Tafsir), and Prophetic Narrations (Hadith). Graduates receive the Alimiyah degree, equivalent to a Master\'s in Islamic Studies.',
      icon: BookOpen,
    },
    {
      title: 'حفظ القرآن (Hifz-ul-Quran)',
      focus: 'Sacred Memorization',
      duration: '3 Years (Avg)',
      desc: 'Dedicated school for Quranic memorization. Combines daily revision tracking, correct Tajweed articulation, and character grooming. Under direct guidance of certified Qaris, students memorize the entire Quran with strong retention structures.',
      icon: Star,
    },
    {
      title: 'تجوید و قراءت (Tajweed-o-Qira\'at)',
      focus: 'Recitation Articulation',
      duration: '1 Year',
      desc: 'Specialized certificate program focusing on the pronunciation keys of classical Arabic script, linguistic sounds, and the different classical recitation methodologies (Qira\'at). Highly recommended for teachers and Quranic instructors.',
      icon: Compass,
    },
    {
      title: 'مٹرک / ایف اے (Matric/FA)',
      focus: 'Modern Schooling',
      duration: '2 Years each',
      desc: 'Federal/Provincial board affiliated sciences and humanities certificates. Run concurrently with our intermediate theological programs, allowing students to transition seamlessly into national universities or legal schools (LLB).',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Academic Offerings
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          Jamia Islamabad provides structured and certified pathways for both sacred and contemporary educational goals.
        </p>
      </div>

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
              <div className="flex-grow flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-150 pb-2">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-950">{c.title}</h2>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{c.focus}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono">
                    Duration: {c.duration}
                  </span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed text-justify">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
