import React from 'react';
import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Jamia Islamabad',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-emerald-bg)] flex items-center justify-center p-4 select-none">
      <div className="card-standard max-w-md w-full p-8 bg-[var(--color-panel)] rounded-2xl shadow-xl text-center animate-scale-up">
        <div className="w-14 h-14 bg-[var(--color-gold-primary)]/20 text-[var(--color-gold-bright)] border border-[var(--color-gold-muted)]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-[var(--color-gold-primary)] tracking-tight leading-none mb-2">404</h1>
        <h2 className="text-base font-bold text-[var(--color-gold-bright)] mb-4">صفحہ دستیاب نہیں ہے (Page Not Found)</h2>
        
        <p className="text-[var(--color-text-body)] text-xs leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-bright)] text-[var(--color-emerald-deep)] text-xs font-extrabold shadow-md transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Return to Home Page
        </Link>
      </div>
    </div>
  );
}
