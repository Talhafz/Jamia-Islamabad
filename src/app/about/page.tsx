'use client';

import React from 'react';
import {
  BookOpen,
  Compass,
  Award,
  MapPin,
  Gavel,
  Monitor,
  ShieldCheck,
  Heart,
  TrendingUp,
  GraduationCap,
  Building2,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { PageBanner } from '../../components/PageBanner';

// ─── Reusable section heading ──────────────────────────────────────────────────
function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10 select-none">
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-gold-primary)]">
        {title}
      </h2>
      <p className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold mt-2 text-[var(--color-teal-soft)]">
        {subtitle}
      </p>
      <div className="mx-auto mt-3 w-16 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-gold-primary)] to-[var(--color-teal-accent)]" />
    </div>
  );
}

// ─── Framer variants ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 24 },
  },
};

// ─── Department icon map ───────────────────────────────────────────────────────
const DEP_ICONS = [BookOpen, Gavel, Monitor, ShieldCheck];

export default function AboutPage() {
  const { t, direction } = useLanguage();

  // ── Data arrays derived from translation keys ───────────────────────────────
  const coreValues = [
    { titleKey: 'about:coreValues.rigorTitle', descKey: 'about:coreValues.rigorDesc', icon: BookOpen },
    { titleKey: 'about:coreValues.tarbiyahTitle', descKey: 'about:coreValues.tarbiyahDesc', icon: Compass },
    { titleKey: 'about:coreValues.leadershipTitle', descKey: 'about:coreValues.leadershipDesc', icon: Award },
  ];

  const timelineItems = [
    { yearKey: 'about:timeline.item1.year', titleKey: 'about:timeline.item1.title', descKey: 'about:timeline.item1.desc' },
    { yearKey: 'about:timeline.item2.year', titleKey: 'about:timeline.item2.title', descKey: 'about:timeline.item2.desc' },
    { yearKey: 'about:timeline.item3.year', titleKey: 'about:timeline.item3.title', descKey: 'about:timeline.item3.desc' },
    { yearKey: 'about:timeline.item4.year', titleKey: 'about:timeline.item4.title', descKey: 'about:timeline.item4.desc' },
  ];

  const statCards = [
    { statKey: 'about:stats.card1.stat', labelKey: 'about:stats.card1.label', descKey: 'about:stats.card1.desc', icon: Building2 },
    { statKey: 'about:stats.card2.stat', labelKey: 'about:stats.card2.label', descKey: 'about:stats.card2.desc', icon: MapPin },
    { statKey: 'about:stats.card3.stat', labelKey: 'about:stats.card3.label', descKey: 'about:stats.card3.desc', icon: Users },
    { statKey: 'about:stats.card4.stat', labelKey: 'about:stats.card4.label', descKey: 'about:stats.card4.desc', icon: GraduationCap },
  ];

  const departments = [
    { titleKey: 'about:departments.dep1.title', descKey: 'about:departments.dep1.desc' },
    { titleKey: 'about:departments.dep2.title', descKey: 'about:departments.dep2.desc' },
    { titleKey: 'about:departments.dep3.title', descKey: 'about:departments.dep3.desc' },
    { titleKey: 'about:departments.dep4.title', descKey: 'about:departments.dep4.desc' },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[var(--color-emerald-bg)]">
      <PageBanner
        title={t('about:title')}
        description={t('about:description')}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-20 select-none" dir={direction}>

        {/* ── Section 1: Vision & Mission ──────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { hKey: 'about:vision.title', dKey: 'about:vision.desc', isGold: false },
              { hKey: 'about:mission.title', dKey: 'about:mission.desc', isGold: true },
            ].map(({ hKey, dKey, isGold }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`card-standard flex flex-col gap-3 ${
                  direction === 'rtl'
                    ? isGold ? 'border-r-4 border-r-[var(--color-gold-primary)]' : 'border-r-4 border-r-[var(--color-teal-accent)]'
                    : isGold ? 'border-l-4 border-l-[var(--color-gold-primary)]' : 'border-l-4 border-l-[var(--color-teal-accent)]'
                }`}
              >
                <h2 className="text-lg font-bold text-[var(--color-gold-primary)]">{t(hKey)}</h2>
                <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify">{t(dKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Historical Timeline ───────────────────────────────── */}
        <section>
          <SectionHeading
            title={t('about:timeline.title')}
            subtitle={t('about:timeline.subtitle')}
          />

          <div className="relative">
            {/* Connecting vertical line */}
            <div className={`hidden md:block absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-gold-primary)] via-[var(--color-teal-accent)] to-[var(--color-gold-primary)] opacity-40 ${direction === 'rtl' ? 'right-[calc(50%-1px)]' : 'left-[calc(50%-1px)]'}`} />

            <div className="flex flex-col gap-10">
              {timelineItems.map((item, i) => {
                const isRight = i % 2 === 0;
                const isGoldDot = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      direction === 'ltr'
                        ? isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                        : isRight ? 'md:flex-row-reverse' : 'md:flex-row'
                    }`}
                  >
                    {/* Card with 4px left border */}
                    <div className="flex-1 card-standard border-l-4 border-l-[var(--color-gold-muted)]">
                      {/* Year badge */}
                      <span className="inline-block mb-3 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest rounded-full bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] border border-[var(--color-gold-muted)]/40 shadow-sm">
                        {t(item.yearKey)}
                      </span>
                      <h3 className="font-bold text-base text-[var(--color-gold-primary)] mb-2">
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify">
                        {t(item.descKey)}
                      </p>
                    </div>

                    {/* Centre dot: alternating gold and teal */}
                    <div className={`hidden md:flex shrink-0 w-5 h-5 rounded-full border-2 border-[var(--color-panel)] shadow-md z-10 ${
                      isGoldDot ? 'bg-[var(--color-gold-primary)] ring-2 ring-[var(--color-gold-bright)]/40' : 'bg-[var(--color-teal-accent)] ring-2 ring-[var(--color-teal-soft)]/40'
                    }`} />

                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Institutional Stats ────────────────────────────────── */}
        <section className="rounded-3xl bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)] text-[var(--color-ivory)] px-6 py-14 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,191,143,0.12)_0%,transparent_70%)] pointer-events-none" />

          <SectionHeading
            title={t('about:stats.title')}
            subtitle={t('about:stats.subtitle')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {statCards.map((card, i) => {
              const Icon = card.icon;
              const isGoldCircle = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative bg-[var(--color-panel)] border border-[var(--color-teal-accent)]/15 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm hover:border-[var(--color-gold-primary)] transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  {/* Icon circle: alternating 12% gold or 12% teal */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    isGoldCircle ? 'bg-[var(--color-gold-primary)]/12 text-[var(--color-gold-bright)]' : 'bg-[var(--color-teal-accent)]/12 text-[var(--color-teal-soft)]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Uniform Gold Bright Stat Number */}
                  <div>
                    <p className="text-3xl font-black text-[var(--color-gold-bright)] tracking-tight leading-none">
                      {t(card.statKey)}
                    </p>
                    <p className="text-xs font-bold mt-1.5 text-[var(--color-teal-soft)]">
                      {t(card.labelKey)}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--color-text-body)] text-[11px] leading-relaxed border-t border-[var(--color-emerald-mid)]/60 pt-3">
                    {t(card.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Section 4: Principal Biography ──────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 rounded-3xl bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 text-[var(--color-ivory)] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.08)_0%,transparent_60%)] pointer-events-none" />

            {/* Profile card with gradient gold ring */}
            <div className="lg:col-span-4 flex justify-center relative z-10">
              <div className="text-center p-6 border border-[var(--color-gold-muted)]/30 bg-[var(--color-emerald-deep)] rounded-2xl max-w-xs relative shadow-2xl backdrop-blur-sm">
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--color-maroon)] text-[var(--color-ivory)] text-[9px] font-extrabold tracking-widest uppercase rounded shadow-md">
                  {t('about:biography.profileLabel')}
                </div>
                {/* Photo ring: 135deg gold gradient ring */}
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px] bg-gradient-to-br from-[var(--color-gold-muted)] to-[var(--color-gold-bright)] shadow-xl shadow-[var(--color-gold-primary)]/20 mx-auto mb-6 overflow-hidden flex items-center justify-center">
                  <img src="/assets/doctor_sahib.jpeg" alt={t('about:biography.name')} className="w-full h-full object-cover object-top rounded-full" />
                </div>
                <h4 className="text-[var(--color-teal-soft)] font-bold text-xs block mb-1">{t('about:biography.namePrefix')}</h4>
                <h3 className="text-[var(--color-gold-bright)] font-extrabold text-xl tracking-tight mb-3 leading-snug">{t('about:biography.name')}</h3>
                <span className="text-xs font-medium text-[var(--color-text-body)] block mt-3 pt-3 border-t border-[var(--color-emerald-mid)] leading-relaxed">{t('about:biography.subtitle')}</span>
              </div>
            </div>

            {/* Bio text */}
            <div className="lg:col-span-8 flex flex-col gap-4 relative z-10">
              <h3 className="text-xl font-extrabold text-[var(--color-gold-primary)]">{t('about:biography.heading')}</h3>
              <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify">{t('about:biography.desc1')}</p>
              <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify">{t('about:biography.desc2')}</p>
            </div>
          </div>
        </section>

        {/* ── Section 5: Specialized Departments ──────────────────────────── */}
        <section>
          <SectionHeading
            title={t('about:departments.title')}
            subtitle={t('about:departments.subtitle')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {departments.map((dep, i) => {
              const Icon = DEP_ICONS[i];
              const isGoldAccent = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className="card-standard flex flex-col gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 p-3 rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                      isGoldAccent
                        ? 'bg-[var(--color-gold-primary)]/12 text-[var(--color-gold-bright)] border border-[var(--color-gold-primary)]/20'
                        : 'bg-[var(--color-teal-accent)]/12 text-[var(--color-teal-soft)] border border-[var(--color-teal-accent)]/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-[var(--color-gold-primary)] font-bold text-sm leading-snug mt-1">{t(dep.titleKey)}</h3>
                  </div>
                  <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-relaxed text-justify">{t(dep.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Section 6: Welfare & Social Services ────────────────────────── */}
        <section>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-gold-muted)]/30 bg-[var(--color-panel)] p-8 sm:p-12 shadow-xl"
          >
            <div className="absolute top-6 end-6 w-14 h-14 rounded-full bg-[var(--color-emerald-deep)] border border-[var(--color-teal-accent)]/30 flex items-center justify-center">
              <Heart className="w-7 h-7 text-[var(--color-teal-accent)]" />
            </div>

            <SectionHeading
              title={t('about:welfare.title')}
              subtitle={t('about:welfare.subtitle')}
            />

            <p className="text-[var(--color-text-body)] text-xs sm:text-sm leading-[2] text-justify max-w-3xl mx-auto">
              {t('about:welfare.text')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Heart, label: 'جلالیہ فری ڈسپنسری', isGold: false },
                { icon: TrendingUp, label: 'ہنگامی امداد و بحالی', isGold: true },
                { icon: Users, label: 'کمیونٹی آؤٹ ریچ', isGold: false },
              ].map(({ icon: Icon, label, isGold }, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isGold ? 'bg-[var(--color-gold-primary)]/15 text-[var(--color-gold-bright)]' : 'bg-[var(--color-teal-accent)]/15 text-[var(--color-teal-soft)]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[var(--color-text-body)] text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Section 7: Core Values ────────────────────────────────────────── */}
        <section>
          <SectionHeading
            title={t('about:coreValues.title')}
            subtitle={t('about:coreValues.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              const isGoldCircle = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="card-standard flex flex-col gap-3 text-center items-center"
                >
                  <div className={`p-3.5 rounded-full ${
                    isGoldCircle ? 'bg-[var(--color-gold-primary)]/12 text-[var(--color-gold-bright)]' : 'bg-[var(--color-teal-accent)]/12 text-[var(--color-teal-soft)]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[var(--color-gold-primary)] font-bold text-sm">{t(val.titleKey)}</h3>
                  <p className="text-[var(--color-text-body)] text-xs leading-relaxed max-w-xs">{t(val.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
