'use client';

import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
  description: string;
}

export function PageBanner({ title, description }: PageBannerProps) {
  return (
    <section className="relative w-full flex items-center justify-center bg-zinc-950 overflow-hidden pt-36 pb-16 select-none -mt-20">
      <ThreeCanvas variant="subtle" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(4,120,87,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
            className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
