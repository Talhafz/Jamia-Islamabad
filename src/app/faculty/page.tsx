import React from 'react';
import { Users, GraduationCap, Award, Mail } from 'lucide-react';

import { PageBanner } from '../../components/PageBanner';

export const metadata = {
  title: 'Faculty Profiles | Jamia Islamabad',
  description: 'Meet the qualified scholars and educators directing our Dars-e-Nizami and modern academic departments.',
};

export default function FacultyPage() {
  const members = [
    {
      name: 'Eminent Islamic Scholar & Educationist, Professor Dr. Mufti Muhammad Zafar Iqbal Jalali',
      title: 'Principal & Shaykh al-Hadith, Jamia Islamabad | Chancellor, IIUP | Chairman, IERF',
      dept: 'Hadith Studies & Administration',
      qual: 'PhD in Islamic Studies, Alimiyah (Gold Medalist)',
      bio: 'Leading scholar with over 30 years of research and teaching experience in Hadith syntax, logic, and Islamic law.',
    },
    {
      name: 'Mufti Ahmad Raza Qadri',
      title: 'Senior Mufti & Lecturer',
      dept: 'Fiqh & Islamic Jurisprudence',
      qual: 'Takhassus fil-Ifta (Mufti Course), MA Islamic Studies',
      bio: 'Directs the Fatwa and legal inquiry center, lecturing on Islamic commercial contracts and jurisprudence principles.',
    },
    {
      name: 'Qari Muhammad Bilal Siddique',
      title: 'Head Qari',
      dept: 'Hifz & Tajweed School',
      qual: 'Sanad of Tajweed and Qira\'at (Ashara), Hafiz-ul-Quran',
      bio: 'Supervises correct sound articulation, Qaida instruction, and structured revision timelines for memorization cycles.',
    },
    {
      name: 'Professor Shabbir Ahmed',
      title: 'Senior Instructor',
      dept: 'Modern Secondary Schooling',
      qual: 'MSc Mathematics, BEd',
      bio: 'Coordinates board-affiliated science classes, ensuring secondary students meet federal matric and college standards.',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] text-[var(--color-text-body)]">
      <PageBanner 
        title="Our Faculty & Scholars" 
        description="Our academic leadership consists of certified academicians and traditional theologians dedicated to educational rigor." 
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-[4px] card-standard flex flex-col justify-between gap-5 hover:border-[var(--color-gold-primary)] transition-all duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-base font-extrabold text-[var(--color-gold-bright)]">{m.name}</h2>
                    <span className="text-[10px] text-[var(--color-teal-accent)] font-extrabold uppercase block mt-0.5">{m.title}</span>
                  </div>
                  <div className="w-10 h-10 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-gold-primary)]/30 text-[var(--color-gold-primary)] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-xs text-[var(--color-text-body)] flex flex-col gap-1.5 mt-2 bg-[var(--color-emerald-deep)]/70 p-3.5 rounded-sm border border-[var(--color-emerald-mid)]/40">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[var(--color-teal-soft)]" />
                    <span><strong>Department:</strong> {m.dept}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[var(--color-gold-primary)]" />
                    <span><strong>Qualification:</strong> {m.qual}</span>
                  </div>
                </div>

                <p className="text-[var(--color-text-body)] text-xs leading-relaxed mt-2 text-justify">
                  {m.bio}
                </p>
              </div>

              <div className="border-t border-[var(--color-emerald-mid)]/40 pt-3 flex justify-between items-center text-[10px] font-bold text-[var(--color-text-muted)] font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                  info@jamiaislamabad.net
                </span>
                <span>JAMIA ISLAMABAD</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
