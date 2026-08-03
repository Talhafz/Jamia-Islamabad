'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Tag, Search, ChevronRight, Award, Mic2, Users, Flag } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { galleryItems, GalleryItem } from '../../constants/galleryData';
import { useLanguage } from '../../context/LanguageContext';

// ── Only the event-related categories (not infrastructure) ────────────────────
const EVENT_CATEGORIES = [
  { id: 'all', icon: null },
  { id: 'convocation', icon: Award },
  { id: 'conferences', icon: Mic2 },
  { id: 'assemblies', icon: Users },
  { id: 'rallies', icon: Flag },
] as const;

type EventCategoryId = typeof EVENT_CATEGORIES[number]['id'];

// ── Category colour tokens ─────────────────────────────────────────────────────
const CAT_TOKENS: Record<string, { pill: string; badge: string; accent: string; glow: string }> = {
  convocation: {
    pill: 'border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20',
    badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    accent: 'from-amber-500/20 to-amber-600/5',
    glow: 'group-hover:shadow-amber-500/20',
  },
  conferences: {
    pill: 'border-blue-500/40 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20',
    badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    accent: 'from-blue-500/20 to-blue-600/5',
    glow: 'group-hover:shadow-blue-500/20',
  },
  assemblies: {
    pill: 'border-purple-500/40 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
    badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    accent: 'from-purple-500/20 to-purple-600/5',
    glow: 'group-hover:shadow-purple-500/20',
  },
  rallies: {
    pill: 'border-rose-500/40 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20',
    badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    accent: 'from-rose-500/20 to-rose-600/5',
    glow: 'group-hover:shadow-rose-500/20',
  },
};

const DEFAULT_TOKEN = {
  pill: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
  badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  accent: 'from-emerald-500/20 to-emerald-600/5',
  glow: 'group-hover:shadow-emerald-500/20',
};

function getToken(cat: string) {
  return CAT_TOKENS[cat] ?? DEFAULT_TOKEN;
}

// ── i18n helper ───────────────────────────────────────────────────────────────
function getLoc(obj: { en: string; ur: string; ar: string }, lang: string): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

// ── Framer variants ───────────────────────────────────────────────────────────
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 220, damping: 24 },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.16 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 32 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring' as const, stiffness: 280, damping: 26 },
  },
  exit: { opacity: 0, scale: 0.94, y: 24, transition: { duration: 0.2 } },
};

// ── Event Detail Modal (Rendered via Portal directly to document.body) ────────
function EventModal({
  item,
  onClose,
  lang,
  dir,
  t,
}: {
  item: GalleryItem;
  onClose: () => void;
  lang: string;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}) {
  const [mounted, setMounted] = useState(false);
  const token = getToken(item.category);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      key="events-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
    >
      {/* Semi-transparent Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Centered Viewport Card Container */}
      <motion.div
        key="events-modal-card"
        variants={modalVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative z-10 w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
        dir={dir}
      >
        {/* Image Header — Responsive Fixed Height */}
        <div className="relative w-full h-44 sm:h-64 md:h-72 shrink-0 overflow-hidden bg-zinc-950">
          <img
            src={item.src}
            alt={getLoc(item.title, lang)}
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={t('events:close')}
            className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-700/80 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 backdrop-blur-md z-20 shadow-lg`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category Badge */}
          <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-10`}>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${token.badge}`}>
              <Tag className="w-3 h-3" />
              {t(`events:categories.${item.category}`)}
            </span>
          </div>
        </div>

        {/* Vertically Scrollable Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto flex-1">
          <h2 className="text-white font-extrabold text-lg sm:text-2xl leading-tight tracking-tight">
            {getLoc(item.title, lang)}
          </h2>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {getLoc(item.desc, lang)}
          </p>

          {/* Meta Details Row */}
          <div className="flex flex-wrap gap-4 pt-3 mt-auto border-t border-zinc-800/80">
            {item.location && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.location}</span>
              </div>
            )}
            {item.date && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.date}</span>
              </div>
            )}
          </div>

          {/* Close Action */}
          <button
            onClick={onClose}
            className="self-end mt-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all duration-200 shadow-md border border-emerald-500/50"
          >
            {t('events:close')}
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function EventsPage() {
  const { t, currentLanguage, direction } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<EventCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);

  // Filter to only event items (exclude infrastructure)
  const eventItems = useMemo(
    () => galleryItems.filter((item) => item.category !== 'infrastructure'),
    []
  );

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return eventItems.filter((item) => {
      const catMatch = activeCategory === 'all' || item.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        getLoc(item.title, currentLanguage).toLowerCase().includes(q) ||
        getLoc(item.desc, currentLanguage).toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery, currentLanguage, eventItems]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: eventItems.length };
    eventItems.forEach((g) => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [eventItems]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* Banner */}
        <PageBanner
          title={t('events:banner.title')}
          description={t('events:banner.description')}
        />

        {/* ── Controls ────────────────────────────────────────────────────── */}
        <section className="w-full bg-white/90 backdrop-blur-xl border-b border-zinc-200 sticky top-14 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {EVENT_CATEGORIES.map(({ id, icon: Icon }) => {
                const isActive = activeCategory === id;
                const count = categoryCounts[id] ?? 0;
                const token = id !== 'all' ? getToken(id) : null;
                return (
                  <button
                    key={id}
                    id={`events-cat-${id}`}
                    onClick={() => setActiveCategory(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? id === 'all'
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                          : `${token!.pill} border-opacity-100 shadow-md`
                        : id === 'all'
                        ? 'border-zinc-300 bg-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                        : `border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100`
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {t(`events:categories.${id}`)}
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
              <input
                id="events-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('events:search')}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 placeholder-zinc-400 text-xs font-medium focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200"
              />
            </div>
          </div>
        </section>

        {/* ── Events Grid ─────────────────────────────────────────────────── */}
        <section className="w-full flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 gap-4 text-zinc-600">
                <Search className="w-10 h-10 opacity-40" />
                <p className="text-sm font-medium">{t('events:noResults')}</p>
              </div>
            ) : (
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                variants={gridVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((item) => {
                    const token = getToken(item.category);
                    const title = getLoc(item.title, currentLanguage);
                    return (
                      <motion.article
                        key={item.id}
                        layout
                        variants={cardVariants}
                        exit="exit"
                        className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 shadow-lg hover:shadow-2xl ${token.glow} transition-all duration-300 hover:-translate-y-1`}
                        onClick={() => setSelectedEvent(item)}
                        id={`event-card-${item.id}`}
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full h-44 overflow-hidden">
                          <img
                            src={item.src}
                            alt={title}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-t ${token.accent} via-transparent to-transparent opacity-80`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${token.badge}`}>
                              <Tag className="w-2.5 h-2.5" />
                              {t(`events:categories.${item.category}`)}
                            </span>
                          </div>

                          {/* Featured star */}
                          {item.featured && (
                            <div className="absolute top-3 right-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                                ★
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="flex flex-col p-5 gap-3">
                          <h3 className="text-white font-bold text-sm leading-loose group-hover:text-emerald-400 transition-colors duration-200">
                            {title}
                          </h3>

                          {item.location && (
                            <div className="flex items-start gap-1.5 text-zinc-500 text-[11px] font-medium">
                              <MapPin className="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item.location}</span>
                            </div>
                          )}

                          {/* Click-to-read CTA */}
                          <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between mt-2">
                            <span className="text-emerald-500/80 text-[11px] font-bold group-hover:text-emerald-400 transition-colors duration-200 flex items-center gap-1">
                              {t('events:viewDetails')}
                              <ChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                            </span>
                            <span className="w-7 h-7 rounded-full bg-zinc-800 group-hover:bg-emerald-900/40 flex items-center justify-center transition-colors duration-200">
                              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-200" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            key="event-modal"
            item={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            lang={currentLanguage}
            dir={direction}
            t={t}
          />
        )}
      </AnimatePresence>
    </>
  );
}
