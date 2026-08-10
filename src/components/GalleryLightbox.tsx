'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { GalleryItem } from '../constants/galleryData';
import { useLanguage } from '../context/LanguageContext';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  infrastructure: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  convocation: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  conferences: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  assemblies: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  rallies: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
};

export function GalleryLightbox({
  item,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const { t, currentLanguage, direction } = useLanguage();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') direction === 'ltr' ? onPrev() : onNext();
      if (e.key === 'ArrowRight') direction === 'ltr' ? onNext() : onPrev();
    },
    [onClose, onPrev, onNext, direction]
  );

  // Keyboard navigation — always active so arrow keys work immediately after opening
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Body scroll lock — ONLY when a lightbox item is actually open
  useEffect(() => {
    if (!item) {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      return;
    }

    const scrollY = window.scrollY;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = originalStyle;
      window.scrollTo(0, scrollY);
    };
  }, [item]);

  const getTitle = (g: GalleryItem) =>
    g.title[currentLanguage as keyof typeof g.title] || g.title.en;
  const getDesc = (g: GalleryItem) =>
    g.desc[currentLanguage as keyof typeof g.desc] || g.desc.en;

  const getCategoryLabel = (cat: string) => t(`gallery:categories.${cat}`);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Glassmorphism Backdrop */}
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl" />

          {/* Content wrapper — stop propagation so clicks inside don't close */}
          <motion.div
            key={`lightbox-${item.id}`}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-5xl max-h-[82vh] flex flex-col lg:flex-row bg-zinc-900/80 border border-white/10 rounded-[4px] overflow-hidden shadow-2xl shadow-black/60 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* IMAGE PANEL — fills all remaining space; acts as strict bounding box for image */}
            <div className="relative flex-1 min-h-[260px] lg:min-h-0 h-full bg-zinc-950 flex items-center justify-center overflow-hidden">
              <motion.img
                key={item.src}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={item.src}
                alt={getTitle(item)}
                className="w-full h-full object-contain"
              />

              {/* Gradient overlay for mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-transparent to-transparent lg:hidden" />

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label={t('gallery:lightbox.prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label={t('gallery:lightbox.next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-sm bg-black/40 hover:bg-black/70 border border-white/10 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Counter badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-sm bg-black/40 backdrop-blur-sm text-white/70 text-[11px] font-mono font-bold border border-white/10 select-none">
                {t('gallery:lightbox.photo')} {currentIndex + 1} / {totalCount}
              </div>
            </div>

            {/* INFO PANEL — static width, never shrinks when images change */}
            <div
              className="w-full lg:w-80 lg:shrink-0 flex flex-col gap-5 p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10"
              dir={direction}
            >
              {/* Close button */}
              <div className="flex justify-between items-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider border ${
                    CATEGORY_COLORS[item.category] || 'bg-zinc-700/40 text-zinc-300 border-zinc-600'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  {getCategoryLabel(item.category)}
                </span>
                <button
                  onClick={onClose}
                  aria-label={t('gallery:lightbox.close')}
                  className="w-8 h-8 rounded-sm bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <h2 className="text-white font-extrabold text-lg leading-snug tracking-tight">
                  {getTitle(item)}
                </h2>
                <p className="text-zinc-400 text-xs leading-relaxed">{getDesc(item)}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Location */}
              <div className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-600 mb-0.5">
                    {t('gallery:lightbox.location')}
                  </p>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.location}</p>
                </div>
              </div>

              {/* Navigation hints */}
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-600 font-mono select-none">
                <span>← {t('gallery:lightbox.prev')}</span>
                <span>{t('gallery:lightbox.next')} →</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
