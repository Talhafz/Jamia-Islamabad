import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Jamia Islamabad',
  description: 'Learn how Jamia Islamabad secures student data, local drafts, uploaded signatures, and personal CNIC records.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 text-xs text-[var(--color-text-body)] select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-[var(--color-gold-primary)] tracking-tight leading-none">
          Privacy Policy
        </h1>
        <p className="text-[var(--color-text-muted)] text-xs max-w-xl leading-relaxed">
          Jamia Islamabad EMS is committed to protecting student profiles, identification cards, and signature uploads.
        </p>
      </div>

      <div className="p-6 rounded-[4px] card-standard flex flex-col gap-5 text-justify leading-relaxed">
        
        <div className="flex items-center gap-2 text-[var(--color-gold-bright)] font-bold text-sm border-b border-[var(--color-emerald-mid)]/40 pb-2">
          <ShieldCheck className="w-5 h-5 text-[var(--color-teal-accent)]" />
          <span>Data Storage & Security</span>
        </div>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-[var(--color-gold-bright)] text-xs">1. Local Draft Persistence</h3>
          <p>
            When filling our online admission form, all entries (names, CNIC numbers, temporary address, mobile contacts) are written in real-time to your browser's local storage database (localStorage). This is done solely to protect your data from sudden tab crashes or power disruptions. This draft cache is completely local to your device and is not uploaded to our servers until you submit the completed form.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-[var(--color-gold-bright)] text-xs">2. Profile Photo and Digital Signatures</h3>
          <p>
            Uploaded photograph files and canvas drawn student/guardian signatures are rendered and processed strictly client-side into base64 image strings. This ensures they scale correctly into the print replica layout. They are stored in the server database only upon final form validation and submission.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-[var(--color-gold-bright)] text-xs">3. External Sharing</h3>
          <p>
            Jamia Islamabad maintains a strictly closed student database. Under no circumstances do we lease, trade, or share student mobile numbers, CNIC data, academic transcripts, or address records with external advertising networks or commercial third parties. All files are reserved for federal boarding audits, academic boards (Wifaq-ul-Madaris), and administrative authentication records.
          </p>
        </section>

      </div>

    </div>
  );
}
