'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';
import { FACULTY_MEMBERS, FacultyMember } from '../../constants/facultyData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase, 
  UserCheck, 
  X, 
  Sparkles, 
  ShieldCheck,
  Building2,
  FileText,
  Globe
} from 'lucide-react';

export default function FacultyPage() {
  const { currentLanguage, direction } = useLanguage();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>('zafar-iqbal-jalali');

  const tier1Members = FACULTY_MEMBERS.filter((m) => m.tier === 1);
  const tier2Members = FACULTY_MEMBERS.filter((m) => m.tier === 2);
  const tier3Members = FACULTY_MEMBERS.filter((m) => m.tier === 3);

  const selectedMember = FACULTY_MEMBERS.find((m) => m.id === selectedMemberId) || null;

  const handleMemberClick = (id: string) => {
    setSelectedMemberId((prev) => (prev === id ? null : id));
  };

  // Helper getters for data-driven localization fallback
  const getDisplayName = (m: FacultyMember) => {
    if (currentLanguage === 'en' && m.nameEn) return m.nameEn;
    return m.name;
  };

  const getDisplayDesignation = (m: FacultyMember) => {
    if (currentLanguage === 'en' && m.designationEn) return m.designationEn;
    return m.designation;
  };

  const getDisplayBio = (m: FacultyMember) => {
    if (currentLanguage === 'en' && m.bioEn) return m.bioEn;
    return m.bio;
  };

  // Check if member is using Urdu fallback when English mode is active
  const isUsingUrduFallback = (m: FacultyMember) => {
    return currentLanguage === 'en' && !m.nameEn && !m.designationEn && !m.bioEn;
  };

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)] text-[var(--color-text-body)] min-h-screen select-none" dir={direction}>
      {/* Hero Page Banner */}
      <PageBanner
        title={direction === 'rtl' ? 'اساتذہ و شیوخ جامعہ اسلام آباد' : 'Our Faculty & Scholars'}
        description={
          direction === 'rtl'
            ? 'جامعہ اسلام آباد کے ممتاز اساتذہ، شیوخ الحدیث، اور محققین کا تعلیمی و علمی شجرہ'
            : 'Academic hierarchy and profile tree of the faculty and scholars at Jamia Islamabad'
        }
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col gap-14">
        
        {/* ── DESKTOP & TABLET HIERARCHY TREE VIEW ───────────────────────────── */}
        <div className="flex flex-col items-center w-full gap-10 relative">
          
          {/* TIER 1: PRINCIPAL / CHIEF SCHOLAR (TOP CENTERED NODE) */}
          <div className="flex flex-col items-center relative z-10">
            {tier1Members.map((member) => {
              const isSelected = selectedMemberId === member.id;
              const hasFallback = isUsingUrduFallback(member);
              return (
                <div key={member.id} className="flex flex-col items-center group">
                  <button
                    onClick={() => handleMemberClick(member.id)}
                    className={`relative p-2 rounded-full transition-all duration-300 transform group-hover:scale-105 cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-[var(--color-gold-primary)] ring-offset-4 ring-offset-[var(--color-emerald-bg)] shadow-[0_0_40px_rgba(212,160,23,0.55)]'
                        : 'hover:shadow-[0_0_25px_rgba(212,160,23,0.35)]'
                    }`}
                  >
                    {/* SCALED UP PHOTO: Tier 1 (160px - 208px) */}
                    <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[var(--color-gold-primary)] bg-[var(--color-emerald-deep)] relative shadow-2xl">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={getDisplayName(member)}
                          fill
                          className="object-cover object-top"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)]">
                          <GraduationCap className="w-20 h-20" />
                        </div>
                      )}
                    </div>
                    
                    {/* Crown / Principal Badge */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--color-gold-primary)] text-[var(--color-emerald-deep)] p-2 rounded-full shadow-lg border border-amber-200">
                      <Sparkles className="w-5 h-5 fill-current" />
                    </div>
                  </button>

                  <div className="mt-4 text-center flex flex-col items-center max-w-md px-2">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-gold-bright)] font-urdu leading-relaxed">
                        {getDisplayName(member)}
                      </h2>
                      {hasFallback && (
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-amber-950/70 border border-amber-500/50 text-amber-300 text-[10px] font-mono font-bold inline-flex items-center gap-1 shadow-sm shrink-0" title="Official Urdu profile — English translation pending">
                          <Globe className="w-3 h-3 text-amber-400" />
                          <span>UR</span>
                        </span>
                      )}
                    </div>
                    <span className="mt-1.5 px-3.5 py-1 rounded-full bg-[var(--color-gold-primary)]/20 border border-[var(--color-gold-primary)]/50 text-[var(--color-gold-bright)] text-xs sm:text-sm font-bold leading-relaxed">
                      {getDisplayDesignation(member)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONNECTOR LINE: Tier 1 -> Tier 2 */}
          <div className="hidden md:flex flex-col items-center w-full my-2">
            <div className="w-0.5 h-10 bg-gradient-to-b from-[var(--color-gold-primary)] to-[var(--color-gold-muted)]" />
            <div className="w-3/4 h-0.5 bg-[var(--color-gold-muted)]/60 relative">
              <div className="absolute top-0 left-0 w-0.5 h-8 bg-[var(--color-gold-muted)]/60" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-[var(--color-gold-muted)]/60" />
              <div className="absolute top-0 right-0 w-0.5 h-8 bg-[var(--color-gold-muted)]/60" />
            </div>
          </div>

          {/* TIER 2: DIRECTORS & SENIOR LECTURERS (3 NODES) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 w-full pt-4 md:pt-0 relative z-10">
            {tier2Members.map((member) => {
              const isSelected = selectedMemberId === member.id;
              const hasFallback = isUsingUrduFallback(member);
              return (
                <div key={member.id} className="flex flex-col items-center group">
                  <button
                    onClick={() => handleMemberClick(member.id)}
                    className={`relative p-1.5 rounded-full transition-all duration-300 transform group-hover:scale-105 cursor-pointer ${
                      isSelected
                        ? 'ring-4 ring-[var(--color-gold-primary)] ring-offset-2 ring-offset-[var(--color-emerald-bg)] shadow-[0_0_30px_rgba(212,160,23,0.45)]'
                        : 'hover:shadow-[0_0_20px_rgba(31,191,143,0.35)]'
                    }`}
                  >
                    {/* SCALED UP PHOTO: Tier 2 (112px - 160px) */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-3 border-[var(--color-gold-primary)] bg-[var(--color-emerald-deep)] relative shadow-xl">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={getDisplayName(member)}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)]">
                          <UserCheck className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                  </button>

                  <div className="mt-3 text-center flex flex-col items-center max-w-xs px-2">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--color-gold-bright)] leading-relaxed">
                        {getDisplayName(member)}
                      </h3>
                      {hasFallback && (
                        <span className="px-1.5 py-0.5 rounded-[2px] bg-amber-950/70 border border-amber-500/50 text-amber-300 text-[9px] font-mono font-bold inline-flex items-center gap-1 shadow-sm shrink-0" title="Official Urdu profile — English translation pending">
                          <Globe className="w-2.5 h-2.5 text-amber-400" />
                          <span>UR</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-[13px] text-[var(--color-teal-accent)] font-semibold mt-1 leading-relaxed">
                      {getDisplayDesignation(member)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONNECTOR LINE: Tier 2 -> Tier 3 */}
          <div className="hidden md:flex flex-col items-center w-full my-4">
            <div className="w-0.5 h-10 bg-gradient-to-b from-[var(--color-gold-muted)]/80 to-[var(--color-emerald-mid)]" />
            <div className="w-11/12 h-0.5 bg-[var(--color-emerald-mid)]/60" />
            <div className="w-0.5 h-8 bg-[var(--color-emerald-mid)]/60" />
          </div>

          {/* TIER 3: LECTURERS & RESEARCH SCHOLARS (11 NODES) */}
          <div className="w-full pt-4">
            <div className="text-center mb-8">
              <span className="px-4 py-1.5 rounded-sm bg-[var(--color-panel)] border border-[var(--color-emerald-mid)] text-xs font-bold text-[var(--color-teal-accent)] uppercase tracking-wider shadow-md">
                {direction === 'rtl' ? 'مدرسین، اساتذہ کرام اور محققین' : 'Faculty Lecturers & Researchers'}
              </span>
            </div>

            {/* EXPANDED GRID WITH SPACIOUS VERTICAL ROW GAP (gap-y-10 sm:gap-y-12) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 justify-items-center">
              {tier3Members.map((member) => {
                const isSelected = selectedMemberId === member.id;
                const hasFallback = isUsingUrduFallback(member);
                return (
                  <div key={member.id} className="flex flex-col items-center group w-full">
                    <button
                      onClick={() => handleMemberClick(member.id)}
                      className={`relative p-1 rounded-full transition-all duration-300 transform group-hover:scale-105 cursor-pointer ${
                        isSelected
                          ? 'ring-4 ring-[var(--color-gold-primary)] ring-offset-2 ring-offset-[var(--color-emerald-bg)] shadow-[0_0_25px_rgba(212,160,23,0.5)]'
                          : 'hover:shadow-[0_0_18px_rgba(31,191,143,0.4)]'
                      }`}
                    >
                      {/* SCALED UP PHOTO: Tier 3 (96px - 112px) */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[var(--color-gold-muted)]/80 bg-[var(--color-emerald-deep)] relative shadow-lg">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={getDisplayName(member)}
                            fill
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-emerald-deep)] text-[var(--color-gold-muted)] p-1 text-center">
                            <GraduationCap className="w-9 h-9 text-[var(--color-teal-accent)]" />
                          </div>
                        )}
                      </div>
                    </button>

                    {/* NODE LABELS: UN-CRAMPED LEADING-RELAXED TYPOGRAPHY FOR LONG NAMES & MULTI-LINE TITLES */}
                    <div className="mt-3 text-center flex flex-col items-center w-full px-1 gap-1">
                      <div className="flex items-center justify-center gap-1 flex-wrap w-full">
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--color-gold-bright)] leading-relaxed font-urdu">
                          {getDisplayName(member)}
                        </h4>
                        {hasFallback && (
                          <span className="px-1 py-0.2 rounded-[2px] bg-amber-950/70 border border-amber-500/50 text-amber-300 text-[8px] font-mono font-bold inline-flex items-center gap-0.5 shadow-sm shrink-0" title="Official Urdu profile — English translation pending">
                            <Globe className="w-2 h-2 text-amber-400" />
                            <span>UR</span>
                          </span>
                        )}
                      </div>
                      
                      <span className="text-[11px] sm:text-xs text-[var(--color-text-muted)] font-medium leading-relaxed font-urdu text-center w-full">
                        {getDisplayDesignation(member)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── EXPANDABLE DETAIL PANEL ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {selectedMember && (
            <motion.div
              key={selectedMember.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="w-full rounded-[4px] card-standard border-2 border-[var(--color-gold-primary)]/60 shadow-2xl p-6 sm:p-8 bg-gradient-to-br from-[var(--color-emerald-deep)] via-[var(--color-panel)] to-[var(--color-emerald-deep)] relative overflow-hidden"
            >
              {/* Background Accent Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-gold-primary)]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMemberId(null)}
                className="absolute top-4 left-4 rtl:left-auto rtl:right-4 p-2 rounded-full bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)] text-[var(--color-text-body)] hover:text-white hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-emerald-deep)] transition-all cursor-pointer z-10"
                title="بند کریں (Close)"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                {/* Member Avatar Header */}
                <div className="flex flex-col items-center text-center shrink-0 w-full md:w-60 gap-3">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[var(--color-gold-primary)] bg-[var(--color-emerald-deep)] relative shadow-xl">
                    {selectedMember.photo ? (
                      <Image
                        src={selectedMember.photo}
                        alt={getDisplayName(selectedMember)}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)]">
                        <GraduationCap className="w-16 h-16" />
                        <span className="text-[10px] font-bold text-[var(--color-teal-accent)] mt-1">جامعہ اسلام آباد</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[var(--color-gold-bright)] font-urdu leading-relaxed">
                      {getDisplayName(selectedMember)}
                    </h3>
                    <span className="text-xs sm:text-sm text-[var(--color-teal-accent)] font-bold mt-1 leading-relaxed">
                      {getDisplayDesignation(selectedMember)}
                    </span>
                    {selectedMember.experience && (
                      <span className="mt-2 px-3 py-0.5 rounded-full bg-[var(--color-gold-primary)]/20 border border-[var(--color-gold-primary)]/40 text-[var(--color-gold-bright)] text-xs font-bold font-mono">
                        تجربہ: {selectedMember.experience}
                      </span>
                    )}
                  </div>
                </div>

                {/* Detail Content */}
                <div className="flex-1 flex flex-col gap-5 w-full text-xs sm:text-sm text-[var(--color-text-body)]">
                  
                  {/* Language Fallback Notice Banner (Data-driven) */}
                  {isUsingUrduFallback(selectedMember) && (
                    <div className="p-3 rounded-sm bg-amber-950/50 border border-amber-500/40 text-amber-300 text-xs font-medium flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Official Urdu profile displayed — English translation pending</span>
                    </div>
                  )}

                  {/* Additional Roles (e.g. Dr. Zafar) */}
                  {((currentLanguage === 'en' && selectedMember.additionalRolesEn) || selectedMember.additionalRoles) && (
                    <div className="flex flex-col gap-2 p-4 rounded-sm bg-[var(--color-emerald-deep)]/80 border border-[var(--color-gold-primary)]/30">
                      <span className="text-xs font-bold text-[var(--color-gold-primary)] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[var(--color-teal-accent)]" />
                        <span>دیگر اہم منصب و ذمہ داریاں (Additional Roles & Offices)</span>
                      </span>
                      <ul className="flex flex-col gap-1.5 pr-2 pl-2">
                        {((currentLanguage === 'en' && selectedMember.additionalRolesEn) || selectedMember.additionalRoles || []).map((role, idx) => (
                          <li key={idx} className="text-xs text-[var(--color-text-body)] flex items-start gap-2 leading-relaxed">
                            <span className="text-[var(--color-gold-bright)] font-bold">•</span>
                            <span>{role}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Department & Qualifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {((currentLanguage === 'en' && selectedMember.departmentEn) || selectedMember.department) && (
                      <div className="p-3.5 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/60 flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                          <span>شعبہ (Department):</span>
                        </span>
                        <span className="text-xs font-semibold leading-relaxed text-[var(--color-text-body)]">
                          {(currentLanguage === 'en' && selectedMember.departmentEn) || selectedMember.department}
                        </span>
                      </div>
                    )}

                    {((currentLanguage === 'en' && selectedMember.qualificationsEn) || selectedMember.qualifications) && (
                      <div className="p-3.5 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/60 flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                          <span>تعلیمی قابلیت (Qualifications):</span>
                        </span>
                        <span className="text-xs font-semibold leading-relaxed text-[var(--color-text-body)]">
                          {(currentLanguage === 'en' && selectedMember.qualificationsEn) || selectedMember.qualifications}
                        </span>
                      </div>
                    )}

                    {selectedMember.religiousEducation && (
                      <div className="p-3.5 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/60 flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                          <span>دینی تعلیم:</span>
                        </span>
                        <span className="text-xs font-semibold leading-relaxed text-[var(--color-text-body)]">
                          {selectedMember.religiousEducation}
                        </span>
                      </div>
                    )}

                    {selectedMember.secularEducation && (
                      <div className="p-3.5 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/60 flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                          <span>عصری تعلیم:</span>
                        </span>
                        <span className="text-xs font-semibold leading-relaxed text-[var(--color-text-body)]">
                          {selectedMember.secularEducation}
                        </span>
                      </div>
                    )}

                    {selectedMember.currentServices && (
                      <div className="p-3.5 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/60 flex flex-col gap-1 sm:col-span-2">
                        <span className="text-[11px] font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                          <span>موجودہ خدمات (Current Services):</span>
                        </span>
                        <span className="text-xs font-semibold leading-relaxed text-[var(--color-text-body)]">
                          {selectedMember.currentServices}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bio Paragraph */}
                  {getDisplayBio(selectedMember) && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-emerald-mid)]/50">
                      <span className="text-xs font-bold text-[var(--color-gold-primary)] flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[var(--color-teal-accent)]" />
                        <span>تفصیلی تعارفی خاکہ (Academic Profile & Bio)</span>
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--color-text-body)] leading-relaxed sm:leading-loose text-justify font-urdu">
                        {getDisplayBio(selectedMember)}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
