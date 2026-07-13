import React from 'react';
import { Camera, Image as ImageIcon, MapPin } from 'lucide-react';

import { PageBanner } from '../../components/PageBanner';

export const metadata = {
  title: 'Campus Gallery | Jamia Islamabad',
  description: 'Explore photographs of the Jamia Islamabad campus, classes, libraries, and graduation ceremonies.',
};

export default function GalleryPage() {
  const images = [
    { title: 'Central Jamia Masjid', desc: 'Nourishing souls through daily assemblies.', cat: 'Infrastructure', color: 'from-emerald-800 to-emerald-950' },
    { title: 'Classical Arabic Library', desc: 'Home to rare manuscript translations and logic books.', cat: 'Academics', color: 'from-zinc-800 to-zinc-950' },
    { title: 'Primary Hifz Classroom', desc: 'Students engaging in memorization exercises.', cat: 'Life', color: 'from-emerald-700 to-emerald-900' },
    { title: 'Graduation Ceremony (Dastar-Bandi)', desc: 'Graduates receiving traditional turbans.', cat: 'Events', color: 'from-amber-600 to-amber-900' },
    { title: 'Modern IT Laboratory', desc: 'Equipped workstations for secondary board courses.', cat: 'Infrastructure', color: 'from-emerald-900 to-zinc-900' },
    { title: 'Study Circles (Halaqah)', desc: 'Informal discussions on grammar under trees.', cat: 'Life', color: 'from-zinc-900 to-amber-900' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner 
        title="Campus Gallery" 
        description="Take a visual tour through our learning spaces, campus infrastructure, and student events." 
      />

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br border border-zinc-200/80 shadow-md flex flex-col justify-end p-6 text-white hover:shadow-xl transition-all duration-350"
            >
              {/* Styled gradient card acting as photo placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${img.color} opacity-90 group-hover:opacity-95 transition-opacity duration-300 z-0`} />
              
              {/* Visual Icon Grid */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/60 z-10">
                <Camera className="w-4 h-4" />
              </div>

              <div className="relative z-10 flex flex-col gap-1.5 select-none">
                <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider w-max select-none">
                  {img.cat}
                </span>
                <h3 className="text-sm font-extrabold tracking-tight mt-1">{img.title}</h3>
                <p className="text-white/70 text-[10px] leading-relaxed">{img.desc}</p>
                
                <div className="flex items-center gap-1 text-white/50 text-[9px] font-bold mt-2 font-mono">
                  <MapPin className="w-3 h-3" />
                  I-8/4 ISLAMABAD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
