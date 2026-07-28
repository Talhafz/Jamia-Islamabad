'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ZoomIn } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { GalleryLightbox } from '../../components/GalleryLightbox';
import { galleryItems, GalleryItem } from '../../constants/galleryData';
import { useLanguage } from '../../context/LanguageContext';

// ─── Category colour tokens ──────────────────────────────────────────────────
const CAT_TOKENS: Record<string, { badge: string }> = {
  infrastructure: {
    badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
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

  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Infrastructure-only items (events are on the /events page)
  const infraItems = useMemo(
    () => galleryItems.filter((item) => item.category === 'infrastructure'),
    []
  );

  // ── Lightbox helpers ───────────────────────────────────────────────────────
  const openLightbox = useCallback(
    (item: GalleryItem) => {
      const idx = infraItems.findIndex((g) => g.id === item.id);
      setLightboxIndex(idx);
      setLightboxItem(item);
    },
    [infraItems]
  );

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      const newIdx = (prev - 1 + infraItems.length) % infraItems.length;
      setLightboxItem(infraItems[newIdx]);
      return newIdx;
    });
  }, [infraItems]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      const newIdx = (prev + 1) % infraItems.length;
      setLightboxItem(infraItems[newIdx]);
      return newIdx;
    });
  }, [infraItems]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Lightbox */}
      <GalleryLightbox
        item={lightboxItem}
        currentIndex={lightboxIndex}
        totalCount={infraItems.length}
        onClose={closeLightbox}
        onPrev={prevLightbox}
        onNext={nextLightbox}
      />

      {/* Banner */}
      <PageBanner
        title={t('gallery:banner.title')}
        description={t('gallery:banner.desc')}
      />

      {/* ── Gallery Grid ─────────────────────────────────────────────────────── */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Masonry-style CSS grid with varying row-spans */}
        <AnimatePresence mode="sync">
          {infraItems.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[220px]"
            >
              {infraItems.map((item, idx) => {
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
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 shadow-lg shadow-black/10 ${
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
