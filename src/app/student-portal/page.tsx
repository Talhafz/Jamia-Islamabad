import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { PageBanner } from '../../components/PageBanner';
import { 
  UserCheck, 
  Clock, 
  Award, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  User, 
  Calendar, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

export default async function StudentPortalPage() {
  const session = await getServerSession(authOptions);

  // 1. Unauthenticated -> Login
  if (!session?.user) {
    redirect('/login?callbackUrl=/student-portal');
  }

  // 2. RBAC protection: Only STUDENT (and authorized staff) can view
  const ALLOWED_ROLES = ['STUDENT', 'ADMIN', 'DIRECTOR', 'DEAN'];
  if (!ALLOWED_ROLES.includes(session.user.role)) {
    redirect('/login');
  }

  // Fetch linked Student record from Prisma DB if studentId exists or lookup by email/user
  let studentRecord = null;

  if (session.user.studentId) {
    studentRecord = await prisma.student.findUnique({
      where: { id: session.user.studentId },
    });
  } else {
    // If studentId on user is null, try finding student by user id relation or return null
    const userRecord = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { student: true },
    });
    studentRecord = userRecord?.student || null;
  }

  const studentName = studentRecord?.studentName || session.user.name || 'محترم طالب علم';
  const formNo = studentRecord?.formNo || 'نامعلوم';
  const status = studentRecord?.status || 'PENDING';
  const department = studentRecord?.department || 'درس نظامی (Dars-e-Nizami)';
  const classGrade = studentRecord?.classGrade || 'سال اول (1st Year)';
  const fatherName = studentRecord?.fatherName || 'تارق محمود';
  const mobile = studentRecord?.mobile || 'N/A';

  // Status badge styling and labels
  const getStatusBadge = (statusStr: string) => {
    switch (statusStr.toUpperCase()) {
      case 'ENROLLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold font-mono">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>منظور شدہ (ENROLLED)</span>
          </span>
        );
      case 'GRADUATED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-teal-950/60 border border-teal-500/50 text-teal-300 text-xs font-bold font-mono">
            <Award className="w-4 h-4 text-teal-400" />
            <span>فارغ التحصیل (GRADUATED)</span>
          </span>
        );
      case 'WITHDRAWN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-bold font-mono">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>خارج شد (WITHDRAWN)</span>
          </span>
        );
      default: // PENDING
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-bold font-mono">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>زیرِ التواء (PENDING)</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none" dir="rtl">
      {/* Page Banner */}
      <PageBanner
        title="طالب علم پورٹل (Student Portal)"
        description="جامعہ اسلام آباد - آپ کے تعلیمی ریکارڈ اور داخلہ کی معلومات"
      />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
        
        {/* Welcome Card */}
        <div className="p-6 sm:p-8 rounded-[4px] card-standard border border-[var(--color-gold-primary)]/40 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-[var(--color-emerald-deep)] to-[var(--color-panel)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[var(--color-gold-primary)]/20 border-2 border-[var(--color-gold-primary)] flex items-center justify-center text-[var(--color-gold-bright)] shadow-md shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-gold-bright)] font-urdu">
                  خوش آمدید، {studentName}
                </h1>
                <span className="px-2 py-0.5 rounded-[2px] bg-[var(--color-gold-primary)]/20 border border-[var(--color-gold-primary)]/40 text-[var(--color-gold-bright)] text-[10px] font-mono font-bold uppercase">
                  {session.user.role}
                </span>
              </div>
              <p className="text-xs text-[var(--color-teal-soft)] font-urdu">
                والد کا نام: <span className="text-[var(--color-text-body)] font-bold">{fatherName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0 w-full md:w-auto border-t md:border-t-0 border-[var(--color-emerald-mid)]/40 pt-4 md:pt-0">
            <span className="text-[10px] text-[var(--color-teal-accent)] font-bold uppercase font-mono">
              داخلہ کی صورتحال (Status)
            </span>
            {getStatusBadge(status)}
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Form & Academic Info */}
          <div className="p-6 rounded-[4px] card-standard border border-[var(--color-emerald-mid)] shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--color-gold-primary)] border-r-2 border-[var(--color-gold-primary)] pr-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--color-teal-accent)]" />
              <span>داخلہ و تعلیمی تفصیلات</span>
            </h3>

            <div className="flex flex-col gap-3 text-xs text-[var(--color-text-body)]">
              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">فارم نمبر (Form No):</span>
                <span className="font-mono font-bold text-[var(--color-gold-bright)] text-sm">{formNo}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">شعبہ (Department):</span>
                <span className="font-bold text-[var(--color-text-body)]">{department}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">کلاس / سال (Grade):</span>
                <span className="font-bold text-[var(--color-text-body)]">{classGrade}</span>
              </div>
            </div>
          </div>

          {/* Verification & Account Security */}
          <div className="p-6 rounded-[4px] card-standard border border-[var(--color-emerald-mid)] shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-[var(--color-gold-primary)] border-r-2 border-[var(--color-gold-primary)] pr-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--color-teal-accent)]" />
              <span>تصدیق و سیکیورٹی</span>
            </h3>

            <div className="flex flex-col gap-3 text-xs text-[var(--color-text-body)]">
              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">رجسٹرڈ ای میل:</span>
                <span className="font-mono font-bold text-[var(--color-teal-soft)]">{session.user.email}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">رابطہ نمبر:</span>
                <span className="font-mono font-bold text-[var(--color-text-body)]">{mobile}</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-sm bg-[var(--color-emerald-deep)] border border-[var(--color-emerald-mid)]/40">
                <span className="text-[var(--color-text-muted)] font-medium">شناختی تصدیق:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  تصدیق شدہ (Verified)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Placeholder Features Notice */}
        <div className="p-6 rounded-[4px] bg-[var(--color-panel)] border border-[var(--color-gold-muted)]/40 shadow-lg flex items-start gap-4">
          <div className="p-2.5 rounded-full bg-[var(--color-gold-primary)]/15 border border-[var(--color-gold-primary)]/30 text-[var(--color-gold-bright)] shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-sm font-bold text-[var(--color-gold-bright)] font-urdu">
              مزید سہولیات جلد دستیاب ہوں گی (Portal Features Coming Soon)
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed font-urdu">
              آپ کا پورٹل فی الحال ابتدائی مرحلے میں ہے۔ جلد ہی یہاں آپ کے سالانہ امتحانی نتائج، حاضری کی تفصیلات، فیس چالان اور آن لائن تدریسی مواد کی سہولیات شامل کی جائیں گی۔
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
