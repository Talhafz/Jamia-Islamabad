'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserCheck, FileText, CreditCard, Mail, KeyRound, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { PageBanner } from '../../../components/PageBanner';
import { useLanguage } from '../../../context/LanguageContext';
import { formatCNIC } from '../../../utils/formatter';

export default function StudentRegisterPage() {
  const { currentLanguage, direction } = useLanguage();
  const router = useRouter();

  const [formNo, setFormNo] = useState('');
  const [studentCnic, setStudentCnic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (password !== confirmPassword) {
      setError(
        currentLanguage === 'ur'
          ? 'درج کردہ پاس ورڈز آپس میں مطابقت نہیں رکھتے۔'
          : 'Passwords do not match.'
      );
      return;
    }

    if (password.length < 8) {
      setError(
        currentLanguage === 'ur'
          ? 'پاس ورڈ کم از کم 8 حروف پر مشتمل ہونا چاہیے۔'
          : 'Password must be at least 8 characters long.'
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formNo,
          studentCnic,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed.');
        setLoading(false);
        return;
      }

      setSuccessMsg(
        currentLanguage === 'ur'
          ? 'آپ کا سٹوڈنٹ اکاؤنٹ تصدیق کے بعد کامیابی سے رجسٹر ہو گیا ہے! اب آپ سائن ان کر سکتے ہیں۔'
          : 'Student account verified and created successfully! You may now sign in.'
      );
      setLoading(false);
      
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch {
      setError(
        currentLanguage === 'ur'
          ? 'نیٹ ورک خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔'
          : 'Network error occurred. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[var(--color-emerald-bg)]">
      {/* Banner */}
      <div className="w-full">
        <PageBanner
          title={
            currentLanguage === 'ur'
              ? 'طلباء رجسٹریشن پورٹل'
              : currentLanguage === 'ar'
              ? 'تسجيل حساب الطالب'
              : 'Student Verification & Account Registration'
          }
          description={
            currentLanguage === 'ur'
              ? 'داخلہ فارم نمبر اور شناختی کارڈ سے اپنے سٹوڈنٹ اکاؤنٹ کی تصدیق کریں'
              : currentLanguage === 'ar'
              ? 'تأكيد معلومات الطالب وتفعيل حساب الدخول بالرقم والبيانات'
              : 'Verify your submitted admission form details to set up your student login'
          }
        />
      </div>

      {/* Form Container */}
      <div className="max-w-lg w-full mx-auto px-4 py-12">
        <div
          className="p-6 sm:p-8 rounded-[4px] bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 shadow-2xl backdrop-blur-md flex flex-col gap-6"
          dir={direction}
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2 border-b border-[var(--color-emerald-mid)]/50 pb-5">
            <div className="w-14 h-14 rounded-full bg-[var(--color-gold-primary)]/15 border border-[var(--color-gold-primary)]/30 flex items-center justify-center text-[var(--color-gold-bright)] shadow-inner">
              <UserCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-gold-bright)] font-urdu">
              {currentLanguage === 'ur'
                ? 'ٹو فیکٹر طالب علم تصدیق'
                : currentLanguage === 'ar'
                ? 'التحقق من بيانات الطالب'
                : 'Verified Student Self-Registration'}
            </h2>
            <p className="text-xs text-[var(--color-teal-soft)] font-urdu leading-relaxed">
              {currentLanguage === 'ur'
                ? 'اکاؤنٹ بنانے کے لیے آپ کا باقاعدہ فارم نمبر اور شناختی کارڈ ہمارے ریکارڈ سے مطابقت رکھنا ضروری ہے۔'
                : 'Your Form Number and CNIC must match an existing submitted Student record.'}
            </p>
          </div>

          {/* Alert messages */}
          {error && (
            <div className="p-3.5 rounded-[4px] bg-red-950/80 border border-red-700/60 text-red-200 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-[4px] bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex flex-col items-center gap-2 text-center animate-fade-in">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <span>{successMsg}</span>
              <Link
                href="/login"
                className="mt-2 btn-primary-gold px-4 py-2 text-xs uppercase font-extrabold"
              >
                {currentLanguage === 'ur' ? 'ابھی لاگ ان کریں' : 'Sign In Now'}
              </Link>
            </div>
          )}

          {!successMsg && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Form No Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1.5 font-urdu">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
                  <span>
                    {currentLanguage === 'ur' ? 'فارم نمبر (Form No)' : 'Form Number (e.g. JI-2026-84920)'}
                    <span className="text-red-400 ml-1">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={formNo}
                  onChange={(e) => setFormNo(e.target.value)}
                  placeholder="JI-2026-84920"
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm font-mono font-bold focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all uppercase"
                  dir="ltr"
                />
              </div>

              {/* Student CNIC Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1.5 font-urdu">
                  <CreditCard className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
                  <span>
                    {currentLanguage === 'ur' ? 'طالب علم کا شناختی کارڈ / بے فارم نمبر' : 'Student CNIC / B-Form Number'}
                    <span className="text-red-400 ml-1">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={studentCnic}
                  onChange={(e) => setStudentCnic(formatCNIC(e.target.value))}
                  placeholder="XXXXX-XXXXXXX-X"
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm font-mono focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all"
                  dir="ltr"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1.5 font-urdu">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
                  <span>
                    {currentLanguage === 'ur' ? 'ای میل ایڈریس (سائن ان کے لیے)' : 'Email Address (for login)'}
                    <span className="text-red-400 ml-1">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm font-mono focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all"
                  dir="ltr"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1 font-urdu">
                    <KeyRound className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
                    <span>{currentLanguage === 'ur' ? 'پاس ورڈ' : 'Password'}</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs font-mono focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--color-teal-soft)] flex items-center gap-1 font-urdu">
                    <KeyRound className="w-3.5 h-3.5 text-[var(--color-gold-primary)]" />
                    <span>{currentLanguage === 'ur' ? 'پاس ورڈ کی تصدیق' : 'Confirm Password'}</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)] text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs font-mono focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full py-3.5 rounded-[4px] bg-[var(--color-gold-primary)] hover:bg-[var(--color-gold-bright)] text-[var(--color-emerald-deep)] font-extrabold text-xs uppercase tracking-wider shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>{currentLanguage === 'ur' ? 'تصدیق ہو رہی ہے...' : 'Verifying Record...'}</span>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>
                      {currentLanguage === 'ur'
                        ? 'ریکارڈ کی تصدیق اور اکاؤنٹ بنائیں'
                        : 'Verify Record & Create Account'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back to login */}
          <div className="mt-2 pt-4 border-t border-[var(--color-emerald-mid)]/40 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-teal-soft)] hover:text-[var(--color-gold-bright)] transition-colors font-urdu"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'ur' ? 'لاگ ان صفحہ پر واپس جائیں' : 'Back to Login Page'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
