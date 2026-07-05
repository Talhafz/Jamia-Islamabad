import React from 'react';
import { AdmissionFormContainer } from '../../features/admission-form/components/AdmissionFormContainer';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Admission Form | Jamia Islamabad',
  description: 'Digital admission application form for Jamia Islamabad. Fill online, autosave drafts, sign digitally, and print A4 replica.',
};

export default function AdmissionFormPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Intro Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-8 print:hidden select-none animate-fade-in">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          Online Admission Registration
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-none">
          داخلہ فارم (Admission Form)
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          براہ کرم فارم کو احتیاط سے پر کریں۔ تمام لازمی فیلڈز کو پُر کریں اور ڈیجیٹل دستخط اپلوڈ کریں۔ فارم جمع کرنے کے بعد، آپ پی ڈی ایف ڈاؤن لوڈ یا پرنٹ کر سکتے ہیں۔
        </p>
      </div>

      {/* Main Form container mount */}
      <AdmissionFormContainer />
    </div>
  );
}
