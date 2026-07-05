'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const items: FaqItem[] = [
    {
      q: 'How does the online draft autosave work?',
      a: 'As you type into the admission form fields, the state automatically registers and writes to browser localStorage. If you refresh or close the tab, your details will be retrieved when you open it again, as long as you do not click the success submit button or clear your cache.',
    },
    {
      q: 'What is the printable twin layout?',
      a: 'Jamia Islamabad requires a physical paper copy for record file registration. Our print preview system formats your details directly into a pixel-perfect twin of our scanned physical 2-page document. By pressing print, you can download a direct PDF/A4 representation ready for manual signatures.',
    },
    {
      q: 'Are scholarship/fee concessions available?',
      a: 'Yes. Deserving students, orphans, and those in financial need can apply for fee concessions. The admin council evaluates applications during interviews and grants tuition waivers or subsidizes dining/boarding.',
    },
    {
      q: 'Is hostel boarding accommodation available?',
      a: 'Yes, boarding facilities are available at our I-8/4 campus for male students enrolled in Dars-e-Nizami or Hifz cycles. Rooms include shared dining, water, laundry spaces, and strict night supervision.',
    },
    {
      q: 'What uniform is mandatory for students?',
      a: 'All students are required to wear white shalwar kameez, a white head cap, and a black waistcoat during study hours and assemblies. Colored dress or casual shirts are strictly restricted on campus.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Frequently Asked Questions
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          Quickly inspect answers regarding our admission procedures, boarding guidelines, and portal capabilities.
        </p>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-white border border-zinc-200/85 shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex justify-between items-center text-left text-zinc-950 hover:text-emerald-800 transition-colors"
              >
                <span className="text-xs font-extrabold flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {item.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                )}
              </button>

              {isOpen && (
                <div className="mt-3 pl-6 border-t border-zinc-100 pt-3 text-xs text-zinc-500 leading-relaxed text-justify animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
