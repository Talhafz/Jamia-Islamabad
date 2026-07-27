'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Images, Search, X, MapPin, ZoomIn, LayoutGrid, Layers } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { GalleryLightbox } from '../../components/GalleryLightbox';
import { galleryItems, GalleryItem } from '../../constants/galleryData';
import { useLanguage } from '../../context/LanguageContext';

// ─── Category colour tokens ──────────────────────────────────────────────────
const CAT_TOKENS: Record<string, { pill: string; badge: string }> = {
  infrastructure: {
    pill: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
};

// ─── Framer variants ─────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.18 } },
};

// ─── Helper ──────────────────────────────────────────────────────────────────
function getLocalised(
  obj: { en: string; ur: string; ar: string },
  lang: string
): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

export default function GalleryPage() {
  const { t, currentLanguage, direction } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Infrastructure-only items (events are on the /events page)
  const infraItems = useMemo(
    () => galleryItems.filter((item) => item.category === 'infrastructure'),
    []
  );

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return infraItems.filter((item) => {
      if (!q) return true;
      const titleMatch = getLocalised(item.title, currentLanguage).toLowerCase().includes(q);
      const descMatch = getLocalised(item.desc, currentLanguage).toLowerCase().includes(q);
      return titleMatch || descMatch;
    });
  }, [searchQuery, currentLanguage, infraItems]);

  // ── Category counts ────────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: infraItems.length, infrastructure: infraItems.length };
    return counts;
  }, [infraItems]);

  // ── Lightbox helpers ───────────────────────────────────────────────────────
  const openLightbox = useCallback(
    (item: GalleryItem) => {
      const idx = filtered.findIndex((g) => g.id === item.id);
      setLightboxIndex(idx);
      setLightboxItem(item);
    },
    [filtered]
  );

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      const newIdx = (prev - 1 + filtered.length) % filtered.length;
      setLightboxItem(filtered[newIdx]);
      return newIdx;
    });
  }, [filtered]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      const newIdx = (prev + 1) % filtered.length;
      setLightboxItem(filtered[newIdx]);
      return newIdx;
    });
  }, [filtered]);

  // ─── Stats ─────────────────────────────────────────────────────────────────
  const stats = [
    { label: t('gallery:stats.totalPhotos'), value: infraItems.length, icon: Images },
    { label: t('gallery:stats.categories'), value: '1', icon: LayoutGrid },
    { label: t('gallery:stats.years'), value: '30+', icon: Layers },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-zinc-950 min-h-screen">
      {/* Lightbox */}
      <GalleryLightbox
        item={lightboxItem}
        currentIndex={lightboxIndex}
        totalCount={filtered.length}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />

      {/* Banner */}
      <PageBanner
        title={t('gallery:banner.title')}
        description={t('gallery:banner.desc')}
      />

      {/* ── Stats Strip ─────────────────────────────────────────────────────── */}
      <section className="w-full border-b border-white/5 bg-zinc-900/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 gap-4 text-center">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-white font-extrabold text-xl leading-none">{s.value}</p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Controls (search only) ────────────────────────────────────────── */}
      <section className="w-full sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search */}
          <div className="relative" dir={direction}>
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none ${direction === 'rtl' ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('gallery:search.placeholder')}
              className={`w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all ${direction === 'rtl' ? 'pr-9 pl-9' : 'pl-9 pr-9'}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors ${direction === 'rtl' ? 'left-3' : 'right-3'}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ─────────────────────────────────────────────────────── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Results info */}
        <div className="flex items-center justify-between mb-8" dir={direction}>
          <p className="text-zinc-500 text-xs font-bold">
            {t('gallery:search.showing')}{' '}
            <span className="text-emerald-400 font-extrabold">{filtered.length}</span>{' '}
            {t('gallery:search.of')}{' '}
            <span className="text-white">{infraItems.length}</span>{' '}
            {t('gallery:search.photos')}
          </p>
          <Camera className="w-4 h-4 text-zinc-700" />
        </div>

        {/* No results */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <Search className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-zinc-400 text-sm font-semibold">{t('gallery:search.noResults')}</p>
              <button
                onClick={() => { setSearchQuery(''); }}
                className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 text-xs font-bold transition-all"
              >
                Reset filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry-style CSS grid with varying row-spans */}
        <AnimatePresence mode="sync">
          {filtered.length > 0 && (
            <motion.div
              key={`grid-${searchQuery}`}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[220px]"
            >
              {filtered.map((item, idx) => {
                const title = getLocalised(item.title, currentLanguage);
                const desc = getLocalised(item.desc, currentLanguage);
                const token = CAT_TOKENS[item.category];
                // Featured images get a taller row span
                const isTall = item.featured && idx % 5 === 0;

                return (
                  <motion.article
                    key={item.id}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 shadow-lg shadow-black/30 ${
                      isTall ? 'sm:row-span-2' : 'row-span-1'
                    }`}
                    onClick={() => openLightbox(item)}
                    role="button"
                    aria-label={`Open photo: ${title}`}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
                  >
                    {/* Image */}
                    <img
                      src={item.src}
                      alt={title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Always-on gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                    {/* Hover glow tint */}
                    <div className="absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top-right: Category badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-sm ${
                          token?.badge ?? 'bg-zinc-700/60 text-zinc-300 border-zinc-600'
                        }`}
                      >
                        {t(`gallery:categories.${item.category}`)}
                      </span>
                    </div>

                    {/* Top-left: Featured indicator */}
                    {item.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm uppercase tracking-wider">
                          ★ Featured
                        </span>
                      </div>
                    )}

                    {/* Zoom overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bottom: title + desc + location */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 z-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300"
                      dir={direction}
                    >
                      <h3 className="text-white font-extrabold text-sm leading-snug mb-1 line-clamp-2 drop-shadow">
                        {title}
                      </h3>
                      <p className="text-zinc-400 text-[10px] leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {desc}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-emerald-400/80 text-[9px] font-bold font-mono">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">I-8/4 ISLAMABAD</span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
