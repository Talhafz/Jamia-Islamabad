import React from 'react';
import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | Jamia Islamabad',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-24 p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-205 text-center animate-scale-up select-none">
      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none mb-2">404</h1>
      <h2 className="text-base font-bold text-zinc-800 mb-4">صفحہ دستیاب نہیں ہے (Page Not Found)</h2>
      
      <p className="text-zinc-500 text-xs leading-relaxed mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold shadow-md transition-all duration-200"
      >
        <Home className="w-4 h-4" />
        Return to Home Page
      </Link>
    </div>
  );
}
