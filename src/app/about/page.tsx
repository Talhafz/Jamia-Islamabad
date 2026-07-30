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
function SectionHeading({ title, subtitle, dark = false }: { title: string; subtitle: string; dark?: boolean }) {
  return (
    <div className="text-center mb-10">
      <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-zinc-950'}`}>
        {title}
      </h2>
      <p className={`text-[10px] uppercase tracking-[0.18em] font-mono font-bold mt-2 ${dark ? 'text-emerald-400/70' : 'text-emerald-700/60'}`}>
        {subtitle}
      </p>
      <div className={`mx-auto mt-3 w-12 h-0.5 rounded-full ${dark ? 'bg-emerald-500/50' : 'bg-emerald-700/30'}`} />
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

// ─── Timeline colour map (one accent colour per milestone) ────────────────────
const TIMELINE_COLORS = [
  { dot: 'bg-amber-500', border: 'border-amber-500/30', year: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-700 border-amber-400/30' },
  { dot: 'bg-emerald-500', border: 'border-emerald-500/30', year: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-800 border-emerald-300/50' },
  { dot: 'bg-blue-500', border: 'border-blue-500/30', year: 'text-blue-600', badge: 'bg-blue-50 text-blue-800 border-blue-300/50' },
  { dot: 'bg-rose-500', border: 'border-rose-500/30', year: 'text-rose-600', badge: 'bg-rose-50 text-rose-800 border-rose-300/50' },
];

// ─── Department icon map ───────────────────────────────────────────────────────
const DEP_ICONS = [BookOpen, Gavel, Monitor, ShieldCheck];

// ─── Stat card data (icons & gradient) ────────────────────────────────────────
const STAT_META = [
  { icon: Building2, gradient: 'from-amber-500/10 to-amber-600/5', iconColor: 'text-amber-600', ring: 'ring-amber-400/30' },
  { icon: MapPin,    gradient: 'from-emerald-500/10 to-emerald-600/5', iconColor: 'text-emerald-600', ring: 'ring-emerald-400/30' },
  { icon: Users,     gradient: 'from-blue-500/10 to-blue-600/5', iconColor: 'text-blue-600', ring: 'ring-blue-400/30' },
  { icon: GraduationCap, gradient: 'from-rose-500/10 to-rose-600/5', iconColor: 'text-rose-600', ring: 'ring-rose-400/30' },
];

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
    { statKey: 'about:stats.card1.stat', labelKey: 'about:stats.card1.label', descKey: 'about:stats.card1.desc' },
    { statKey: 'about:stats.card2.stat', labelKey: 'about:stats.card2.label', descKey: 'about:stats.card2.desc' },
    { statKey: 'about:stats.card3.stat', labelKey: 'about:stats.card3.label', descKey: 'about:stats.card3.desc' },
    { statKey: 'about:stats.card4.stat', labelKey: 'about:stats.card4.label', descKey: 'about:stats.card4.desc' },
  ];

  const departments = [
    { titleKey: 'about:departments.dep1.title', descKey: 'about:departments.dep1.desc' },
    { titleKey: 'about:departments.dep2.title', descKey: 'about:departments.dep2.desc' },
    { titleKey: 'about:departments.dep3.title', descKey: 'about:departments.dep3.desc' },
    { titleKey: 'about:departments.dep4.title', descKey: 'about:departments.dep4.desc' },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-zinc-50">
      <PageBanner
        title={t('about:title')}
        description={t('about:description')}
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-20 select-none" dir={direction}>

        {/* ── Section 1: Vision & Mission ──────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { hKey: 'about:vision.title', dKey: 'about:vision.desc', accent: 'border-l-4 border-emerald-600' },
              { hKey: 'about:mission.title', dKey: 'about:mission.desc', accent: 'border-l-4 border-amber-500' },
            ].map(({ hKey, dKey, accent }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-sm flex flex-col gap-3 ${direction === 'rtl' ? 'border-r-4 border-l-0' : accent}`}
                style={direction === 'rtl' ? { borderRight: i === 0 ? '4px solid #059669' : '4px solid #F59E0B', borderLeft: 'none' } : {}}
              >
                <h2 className="text-lg font-bold text-emerald-950">{t(hKey)}</h2>
                <p className="text-zinc-600 text-xs leading-relaxed text-justify">{t(dKey)}</p>
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

          {/* Vertical spine timeline */}
          <div className="relative">
            {/* Connecting vertical line — hidden on mobile, visible md+ */}
            <div className={`hidden md:block absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-emerald-400 to-rose-400 opacity-30 ${direction === 'rtl' ? 'right-[calc(50%-1px)]' : 'left-[calc(50%-1px)]'}`} />

            <div className="flex flex-col gap-10">
              {timelineItems.map((item, i) => {
                const color = TIMELINE_COLORS[i];
                const isRight = i % 2 === 0;
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
                    {/* Card */}
                    <div className={`flex-1 bg-white border ${color.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}>
                      {/* Year badge */}
                      <span className={`inline-block mb-3 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full border ${color.badge}`}>
                        {t(item.yearKey)}
                      </span>
                      <h3 className={`font-bold text-sm text-zinc-900 mb-2 ${color.year}`}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed text-justify">
                        {t(item.descKey)}
                      </p>
                    </div>

                    {/* Centre dot */}
                    <div className={`hidden md:flex shrink-0 w-4 h-4 rounded-full border-2 border-white ring-2 ring-zinc-300 ${color.dot} shadow-md z-10`} />

                    {/* Spacer to push opposite side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Section 3: Institutional Stats ────────────────────────────────── */}
        <section className="rounded-3xl bg-emerald-950 text-white px-6 py-14 relative overflow-hidden shadow-2xl">
          {/* Decorative radial glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.10)_0%,transparent_55%)] pointer-events-none" />

          <SectionHeading
            title={t('about:stats.title')}
            subtitle={t('about:stats.subtitle')}
            dark
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {statCards.map((card, i) => {
              const meta = STAT_META[i];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative bg-gradient-to-br ${meta.gradient} border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Icon ring */}
                  <div className={`w-10 h-10 rounded-full bg-white/10 ring-1 ${meta.ring} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                  </div>

                  {/* Stat number */}
                  <div>
                    <p className="text-3xl font-extrabold text-white tracking-tight leading-none">
                      {t(card.statKey)}
                    </p>
                    <p className={`text-xs font-bold mt-1 ${meta.iconColor}`}>
                      {t(card.labelKey)}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-emerald-100/60 text-[11px] leading-relaxed border-t border-white/10 pt-3">
                    {t(card.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Section 4: Principal Biography ──────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 rounded-3xl bg-emerald-950 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1)_0%,transparent_60%)] pointer-events-none" />

            {/* Profile card */}
            <div className="lg:col-span-4 flex justify-center relative z-10">
              <div className="text-center p-6 border border-emerald-500/20 bg-zinc-950/50 rounded-xl max-w-xs relative shadow-2xl shadow-emerald-950/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute -top-3 left-6 px-2.5 py-1 bg-amber-500 text-zinc-950 text-[9px] font-extrabold tracking-widest uppercase rounded z-10">
                  {t('about:biography.profileLabel')}
                </div>
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-amber-400 bg-zinc-800 mx-auto mb-6 overflow-hidden flex items-center justify-center shadow-lg relative z-10">
                  <img src="/assets/doctor_sahib.jpeg" alt={t('about:biography.name')} className="w-full h-full object-cover object-top" />
                </div>
                <h4 className="text-amber-400 font-bold text-xs block mb-1 relative z-10">{t('about:biography.namePrefix')}</h4>
                <h3 className="text-white font-extrabold text-xl tracking-tight mb-3 leading-snug relative z-10">{t('about:biography.name')}</h3>
                <span className="text-sm font-medium text-emerald-100 block mt-3 pt-3 border-t border-emerald-500/30 leading-relaxed relative z-10">{t('about:biography.subtitle')}</span>
              </div>
            </div>

            {/* Bio text */}
            <div className="lg:col-span-8 flex flex-col gap-4 relative z-10">
              <h3 className="text-xl font-extrabold text-amber-400">{t('about:biography.heading')}</h3>
              <p className="text-emerald-100/80 text-xs leading-relaxed text-justify">{t('about:biography.desc1')}</p>
              <p className="text-emerald-100/80 text-xs leading-relaxed text-justify">{t('about:biography.desc2')}</p>
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
              const accents = [
                { icon: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-200 hover:border-emerald-400/50', top: 'bg-emerald-600' },
                { icon: 'bg-amber-100 text-amber-800', border: 'border-amber-200 hover:border-amber-400/50', top: 'bg-amber-500' },
                { icon: 'bg-blue-100 text-blue-800', border: 'border-blue-200 hover:border-blue-400/50', top: 'bg-blue-600' },
                { icon: 'bg-rose-100 text-rose-800', border: 'border-rose-200 hover:border-rose-400/50', top: 'bg-rose-600' },
              ];
              const a = accents[i];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  className={`group relative bg-white border ${a.border} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full ${a.top} opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`shrink-0 p-3 rounded-xl ${a.icon} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-zinc-900 font-bold text-sm leading-snug mt-1">{t(dep.titleKey)}</h3>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed text-justify">{t(dep.descKey)}</p>
                  </div>
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
            className="relative overflow-hidden rounded-3xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-8 sm:p-12 shadow-sm"
          >
            {/* Decorative icon */}
            <div className="absolute top-6 end-6 w-16 h-16 rounded-full bg-rose-100/60 flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>

            <SectionHeading
              title={t('about:welfare.title')}
              subtitle={t('about:welfare.subtitle')}
            />

            <p className="text-zinc-600 text-sm leading-[2.1] text-justify max-w-3xl mx-auto">
              {t('about:welfare.text')}
            </p>

            {/* Icon row */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: Heart, label: 'جلالیہ فری ڈسپنسری', color: 'text-rose-600 bg-rose-100' },
                { icon: TrendingUp, label: 'ہنگامی امداد و بحالی', color: 'text-amber-700 bg-amber-100' },
                { icon: Users, label: 'کمیونٹی آؤٹ ریچ', color: 'text-emerald-700 bg-emerald-100' },
              ].map(({ icon: Icon, label, color }, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-zinc-700 text-xs font-semibold">{label}</span>
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
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col gap-3 text-center items-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-emerald-50 text-emerald-800">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-zinc-950 font-bold text-sm">{t(val.titleKey)}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">{t(val.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
