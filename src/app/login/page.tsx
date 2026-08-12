'use client';

import React, { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, KeyRound, AlertCircle, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';

function LoginFormContent() {
  const { currentLanguage, direction } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(
          currentLanguage === 'ur'
            ? 'ای میل یا پاس ورڈ غلط ہے۔ براہ کرم دوبارہ کوشش کریں۔'
            : currentLanguage === 'ar'
            ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
            : 'Invalid email or password. Please try again.'
        );
        setLoading(false);
        return;
      }

      // Fetch active session to determine redirect
      const sessionRes = await fetch('/api/auth/session');
      const sessionData = await sessionRes.json();
      const role = sessionData?.user?.role;

      if (callbackUrl) {
        router.push(callbackUrl);
      } else if (role === 'ADMIN' || role === 'DIRECTOR' || role === 'DEAN') {
        router.push('/students');
      } else if (role === 'STUDENT') {
        router.push('/student-portal');
      } else {
        router.push('/');
      }
    } catch {
      setError(
        currentLanguage === 'ur'
          ? 'لاگ ان کے دوران خرابی پیش آئی۔'
          : 'An unexpected error occurred. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div
      className="p-6 sm:p-8 rounded-[4px] bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 shadow-2xl backdrop-blur-md flex flex-col gap-6"
      dir={direction}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2 border-b border-[var(--color-emerald-mid)]/50 pb-5">
        <div className="w-14 h-14 rounded-full bg-[var(--color-gold-primary)]/15 border border-[var(--color-gold-primary)]/30 flex items-center justify-center text-[var(--color-gold-bright)] shadow-inner">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-gold-bright)] font-urdu">
          {currentLanguage === 'ur'
            ? 'اکاؤنٹ میں سائن ان کریں'
            : currentLanguage === 'ar'
            ? 'تسجيل الدخول إلى حسابك'
            : 'Sign In to Your Account'}
        </h2>
        <p className="text-xs text-[var(--color-teal-soft)] font-urdu">
          {currentLanguage === 'ur'
            ? 'سٹاف اور رجسٹرڈ طلباء اپنا سائن ان کریڈنشلز درج کریں'
            : currentLanguage === 'ar'
            ? 'أدخل بيانات الحساب المعتمدة'
            : 'Staff & verified students enter authorized credentials'}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-[4px] bg-red-950/80 border border-red-700/60 text-red-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1.5 font-urdu">
            <Mail className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
            <span>{currentLanguage === 'ur' ? 'ای میل ایڈریس' : currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@jamiaislamabad.edu.pk"
            className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm font-mono focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all"
            dir="ltr"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1.5 font-urdu">
            <KeyRound className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
            <span>{currentLanguage === 'ur' ? 'پاس ورڈ' : currentLanguage === 'ar' ? 'كلمة المرور' : 'Password'}</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm font-mono focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all"
            dir="ltr"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3 rounded-[4px] bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-bright)] text-[var(--color-emerald-deep)] font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <span>{currentLanguage === 'ur' ? 'توثیق ہو رہی ہے...' : 'Authenticating...'}</span>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>{currentLanguage === 'ur' ? 'لاگ ان کریں' : currentLanguage === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
            </>
          )}
        </button>
      </form>

      {/* Student Registration Callout */}
      <div className="mt-2 pt-4 border-t border-[var(--color-emerald-mid)]/40 flex flex-col items-center gap-2 text-center">
        <span className="text-xs text-[var(--color-teal-soft)] font-urdu">
          {currentLanguage === 'ur'
            ? 'کیا آپ جامعہ کے نئے طالب علم ہیں؟'
            : currentLanguage === 'ar'
            ? 'هل أنت طالب جديد في الجامعة؟'
            : 'Are you a newly admitted student?'}
        </span>
        <Link
          href="/student-portal/register"
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--color-gold-bright)] hover:underline font-urdu"
        >
          <UserCheck className="w-4 h-4 text-[var(--color-gold-primary)]" />
          <span>
            {currentLanguage === 'ur'
              ? 'فارم نمبر سے اپنا سٹوڈنٹ اکاؤنٹ رجسٹر کریں'
              : currentLanguage === 'ar'
              ? 'تسجيل حساب طالب برقم النموذج'
              : 'Register Student Login via Form Number'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { currentLanguage } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[var(--color-emerald-bg)]">
      {/* Banner */}
      <div className="w-full">
        <PageBanner
          title={
            currentLanguage === 'ur'
              ? 'پورٹل لاگ ان'
              : currentLanguage === 'ar'
              ? 'تسجيل الدخول للمنظومة'
              : 'Portal Sign In'
          }
          description={
            currentLanguage === 'ur'
              ? 'جامعہ اسلام آباد کے انتظامی و تعلیمی پورٹل میں لاگ ان کریں'
              : currentLanguage === 'ar'
              ? 'الدخول الموحد للطلاب وأعضاء هيئة التدريس والإدارة'
              : 'Unified Portal Login for Staff & Registered Students'
          }
        />
      </div>

      {/* Main Login Card Container with Suspense */}
      <div className="max-w-md w-full mx-auto px-4 py-12">
        <Suspense fallback={
          <div className="p-8 rounded-[4px] bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 text-center text-xs font-bold text-[var(--color-gold-bright)] animate-pulse">
            Loading authentication portal...
          </div>
        }>
          <LoginFormContent />
        </Suspense>
      </div>
    </div>
  );
}
