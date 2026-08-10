'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  User, 
  Users, 
  CheckCircle, 
  Printer, 
  FileText, 
  Sparkles, 
  AlertCircle,
  Save, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  UploadCloud 
} from 'lucide-react';
import { formSchema, AdmissionFormData, defaultFormValues } from '../schemas/formSchema';
import { useAutosave } from '../../../hooks/useAutosave';
import { SignaturePad } from '../../../components/SignaturePad';
import { PrintLayout } from './PrintLayout';
import { formatCNIC, formatMobile } from '../../../utils/formatter';

import { useLanguage } from '../../../context/LanguageContext';

// Collision-proof bilingual label component
const FieldLabel = ({ en, ur, required = false }: { en: string; ur: string; required?: boolean }) => (
  <div className="flex items-center justify-between gap-2 text-xs font-bold mb-1.5 select-none w-full">
    <span dir="ltr" className="font-latin-force text-left font-semibold text-[var(--color-teal-soft)] text-[11px] sm:text-xs shrink-0 max-w-[48%] truncate">
      {en}
    </span>
    <span dir="rtl" className="text-right font-bold font-urdu text-[var(--color-gold-primary)] text-xs sm:text-sm shrink-0 max-w-[50%]">
      {ur} {required && <span className="font-latin-force text-red-400 font-sans">*</span>}
    </span>
  </div>
);

export function AdmissionFormContainer() {
  const { currentLanguage, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const steps = [
    { 
      label: currentLanguage === 'ur' ? 'طالب علم کی معلومات' : currentLanguage === 'ar' ? 'معلومات الطالب' : 'Student Personal Info', 
      subLabel: currentLanguage === 'ur' ? 'پہلا مرحلہ' : currentLanguage === 'ar' ? 'الخطوة الأولى' : 'Step 1', 
      icon: User 
    },
    { 
      label: currentLanguage === 'ur' ? 'سرپرست کی معلومات' : currentLanguage === 'ar' ? 'معلومات ولي الأمر' : 'Guardian Details', 
      subLabel: currentLanguage === 'ur' ? 'دوسرا مرحلہ' : currentLanguage === 'ar' ? 'الخطوة الثانية' : 'Step 2', 
      icon: Users 
    },
    { 
      label: currentLanguage === 'ur' ? 'بیان حلفی و دستخط' : currentLanguage === 'ar' ? 'الإقرار والتوقيع' : 'Rules & Signatures', 
      subLabel: currentLanguage === 'ur' ? 'تیسرا مرحلہ' : currentLanguage === 'ar' ? 'الخطوة الثالثة' : 'Step 3', 
      icon: FileText 
    },
  ];

  // Initialize react-hook-form
  const methods = useForm<AdmissionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = methods;

  // Watch entire form state for autosave
  const formValues = watch();

  // Load and setup autosave draft
  const { lastSaved, isSaving, getDraft, clearDraft } = useAutosave(
    formValues,
    'jamia_admission_draft',
    1500
  );

  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      reset(draft);
    }
  }, []);

  // Preview data is just the current form values
  const previewData = formValues;

  // Handle Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('photo', reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  // Step Navigations
  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data: AdmissionFormData) => {
    console.log('Form Submitted successfully:', data);
    setIsSubmitSuccess(true);
    clearDraft();
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitSuccess) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-[var(--color-panel)] backdrop-blur-md rounded-[4px] shadow-2xl border border-[var(--color-gold-muted)]/40 text-center animate-fade-in">
        <div className="w-16 h-16 bg-[var(--color-gold-primary)]/20 text-[var(--color-gold-primary)] rounded-[4px] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold font-urdu text-[var(--color-gold-primary)] mb-4">
          {currentLanguage === 'ur' ? 'داخلہ فارم کامیابی سے جمع ہو گیا ہے' : currentLanguage === 'ar' ? 'تم تقديم نموذج الالتحاق بنجاح' : 'Admission Form Submitted Successfully'}
        </h2>
        <p className="text-[var(--color-text-body)] font-urdu text-sm mb-8 leading-relaxed">
          {currentLanguage === 'ur'
            ? 'آپ کا فارم کامیابی سے وصول ہو گیا ہے۔ اب آپ ڈیجیٹل طور پر بھرے ہوئے فارم کا پرنٹ لے سکتے ہیں یا اسے محفوظ کر سکتے ہیں۔ براہ کرم اسے پرنٹ کر کے متعلقہ تعلیمی اسناد کے ساتھ جامعہ کے دفتر میں جمع کروائیں۔'
            : currentLanguage === 'ar'
            ? 'تم استلام نموذجك بنجاح. يمكنك الآن طباعة النموذج المملوء رقمياً أو حفظه. يرجى طباعته وتقديمه مع المستندات المطلوبة إلى مكتب الجامعة.'
            : 'Your form has been received successfully. You can now print or download the digitally filled form. Please print and submit it along with required educational documents to the Jamia office.'}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setViewMode('preview')}
            className="btn-primary-gold flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase"
          >
            <Eye className="w-4 h-4" />
            {currentLanguage === 'ur' ? 'پرنٹ فارم کا معاینہ' : currentLanguage === 'ar' ? 'معاينة النموذج المطبوع' : 'Print Form Preview'}
          </button>
          <button
            onClick={() => {
              reset(defaultFormValues);
              setIsSubmitSuccess(false);
              setActiveStep(0);
              setViewMode('edit');
            }}
            className="btn-secondary-teal flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase"
          >
            {currentLanguage === 'ur' ? 'ایک اور فارم پر کریں' : currentLanguage === 'ar' ? 'تعبئة نموذج آخر' : 'Fill Another Form'}
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full px-3.5 py-2.5 rounded-[4px] border border-[var(--color-emerald-mid)]/70 bg-[var(--color-emerald-deep)]/90 text-[var(--color-ivory)] placeholder-[var(--color-text-muted)] text-xs sm:text-sm focus:outline-none focus:border-[var(--color-gold-primary)] focus:ring-1 focus:ring-[var(--color-gold-primary)]/50 transition-all duration-200";

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Draft Saving Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-[4px] bg-[var(--color-emerald-deep)]/90 backdrop-blur-md border border-[var(--color-emerald-mid)]/60 shadow-lg text-xs font-semibold select-none print:hidden">
        <div className="flex items-center gap-2 text-[var(--color-teal-soft)]">
          <Save className="w-4 h-4 text-[var(--color-gold-primary)]" />
          <span>{currentLanguage === 'ur' ? 'خودکار بچت:' : currentLanguage === 'ar' ? 'الحفظ التلقائي:' : 'Draft Autosave:'}</span>
          {isSaving ? (
            <span className="text-[var(--color-gold-bright)] animate-pulse">
              {currentLanguage === 'ur' ? 'ڈرافٹ محفوظ ہو رہا ہے...' : currentLanguage === 'ar' ? 'جاري حفظ المسودة...' : 'Saving draft...'}
            </span>
          ) : lastSaved ? (
            <span className="text-[var(--color-teal-accent)]">
              {currentLanguage === 'ur' ? `آخری بار ${lastSaved} پر محفوظ ہوا` : currentLanguage === 'ar' ? `تم آخر حفظ في ${lastSaved}` : `Last saved at ${lastSaved}`}
            </span>
          ) : (
            <span className="text-[var(--color-text-muted)]">
              {currentLanguage === 'ur' ? 'کوئی فعال ڈرافٹ نہیں' : currentLanguage === 'ar' ? 'لا توجد مسودة نشطة' : 'No active draft'}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[var(--color-emerald-mid)]/60 hover:bg-[var(--color-emerald-mid)] text-[var(--color-gold-bright)] border border-[var(--color-gold-muted)]/40 transition-all duration-200 text-xs font-bold"
          >
            {viewMode === 'edit' ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                {currentLanguage === 'ur' ? 'پی ڈی ایف پرنٹ پریویو دیکھیں' : currentLanguage === 'ar' ? 'معاينة الطباعة' : 'Show PDF Print Preview'}
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                {currentLanguage === 'ur' ? 'ترمیم کی طرف واپس جائیں' : currentLanguage === 'ar' ? 'العودة للتعديل' : 'Back to Editing'}
              </>
            )}
          </button>
          {viewMode === 'preview' && (
            <button
              onClick={handlePrint}
              className="btn-primary-gold flex items-center gap-1.5 px-3.5 py-1.5 text-xs uppercase font-bold"
            >
              <Printer className="w-3.5 h-3.5" />
              {currentLanguage === 'ur' ? 'پرنٹ / پی ڈی ایف محفوظ کریں' : currentLanguage === 'ar' ? 'طباعة / حفظ كـ PDF' : 'Print / Save as PDF'}
            </button>
          )}
        </div>
      </div>

      {viewMode === 'preview' && previewData ? (
        <div className="w-full">
          <div className="bg-[var(--color-panel)] border border-[var(--color-gold-primary)]/40 text-[var(--color-gold-bright)] rounded-[4px] p-4 mb-6 text-xs text-center select-none print:hidden shadow-lg">
            <p className="font-bold flex items-center justify-center gap-1.5 font-urdu">
              <AlertCircle className="w-4 h-4 text-[var(--color-gold-primary)] flex-shrink-0" />
              {currentLanguage === 'ur'
                ? 'یہ سرکاری پرنٹ شدہ فارم کی معاینہ شکل ہے۔ ڈاؤن لوڈ یا پرنٹ کرنے کے لیے اوپر "پرنٹ / پی ڈی ایف محفوظ کریں" بٹن دبائیں۔'
                : currentLanguage === 'ar'
                ? 'هذه هي معاينة النموذج الرسمي المطبوع. اضغط على "طباعة / حفظ كـ PDF" في الأعلى للتنزيل أو الطباعة.'
                : 'This is the official printed view layout. Press "Print / Save as PDF" at the top to download or print.'}
            </p>
          </div>
          <PrintLayout data={previewData} />
        </div>
      ) : (
        <FormProvider {...methods}>
          <div className="w-full max-w-4xl mx-auto bg-[var(--color-panel)] backdrop-blur-md rounded-[4px] shadow-2xl border border-[var(--color-emerald-mid)]/60 overflow-hidden print:hidden select-none">
            
            {/* Steps Progress Indicator */}
            <div className="bg-[var(--color-emerald-deep)] border-b border-[var(--color-emerald-mid)]/60 p-6 select-none">
              <div className="flex justify-between items-center relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--color-emerald-mid)] -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[var(--color-gold-primary)] to-[var(--color-teal-accent)] -translate-y-1/2 z-0 transition-all duration-300"
                  style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                />
                
                {steps.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isActive = activeStep === idx;
                  const isCompleted = activeStep > idx;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-[var(--color-teal-accent)] text-[var(--color-emerald-deep)] shadow-md'
                            : isActive
                            ? 'bg-[var(--color-gold-primary)] text-[var(--color-emerald-deep)] ring-4 ring-[var(--color-gold-primary)]/20 shadow-xl scale-110'
                            : 'bg-[var(--color-panel)] border-2 border-[var(--color-emerald-mid)] text-[var(--color-teal-soft)]/60'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                      </div>
                      <div className="text-center">
                        <p className={`text-[11px] sm:text-xs font-urdu font-bold ${isActive ? 'text-[var(--color-gold-bright)] font-black' : 'text-[var(--color-text-muted)]'}`}>
                          {step.label}
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-medium text-[var(--color-teal-soft)]/70">
                          {step.subLabel}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Fields Wrapper */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 flex flex-col gap-6">
              
              {/* STEP 0: Student Personal Details */}
              {activeStep === 0 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)]/50 pb-2 mb-2 font-urdu">
                    <Sparkles className="w-5 h-5 text-[var(--color-gold-primary)]" />
                    <h3 className="text-base sm:text-lg font-bold">
                      {currentLanguage === 'ur' ? 'طالب علم کا ذاتی ریکارڈ' : currentLanguage === 'ar' ? 'معلومات الطالب' : 'Student Information'}
                    </h3>
                  </div>

                  {/* Dept, Class, Date */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Department" ur="شعبہ" required />
                      <select
                        {...register('department')}
                        className={inputStyle}
                      >
                        <option value="" className="bg-[var(--color-panel)] text-[var(--color-ivory)]">Select Department</option>
                        <option value="درس نظامی (Dars-e-Nizami)" className="bg-[var(--color-panel)] text-[var(--color-ivory)]">درس نظامی (Dars-e-Nizami)</option>
                        <option value="حفظ القرآن (Hifz-ul-Quran)" className="bg-[var(--color-panel)] text-[var(--color-ivory)]">حفظ القرآن (Hifz-ul-Quran)</option>
                        <option value="تجوید و قراءت (Tajweed-o-Qira'at)" className="bg-[var(--color-panel)] text-[var(--color-ivory)]">تجوید و قراءت (Tajweed-o-Qira'at)</option>
                        <option value="مٹرک / ایف اے (Matric/FA)" className="bg-[var(--color-panel)] text-[var(--color-ivory)]">مٹرک / ایف اے (Matric/FA)</option>
                      </select>
                      {errors.department && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.department.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Class / Grade" ur="درجہ" required />
                      <input
                        type="text"
                        {...register('classGrade')}
                        placeholder="e.g. 1st Year / درجہ اولیٰ"
                        className={inputStyle}
                      />
                      {errors.classGrade && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.classGrade.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Date" ur="تاریخ" required />
                      <input
                        type="date"
                        {...register('date')}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Student Name & Father Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Student's Name" ur="طالب علم/طالبہ کا نام" required />
                      <input
                        type="text"
                        {...register('studentName')}
                        placeholder="Full Name (in Urdu/English)"
                        className={inputStyle}
                      />
                      {errors.studentName && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.studentName.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Father's Name" ur="ولد / ولدیت" required />
                      <input
                        type="text"
                        {...register('fatherName')}
                        placeholder="Father's Full Name"
                        className={inputStyle}
                      />
                      {errors.fatherName && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.fatherName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* DOB, Phone, Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Date of Birth" ur="تاریخ پیدائش" required />
                      <input
                        type="date"
                        {...register('dob')}
                        className={inputStyle}
                      />
                      {errors.dob && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.dob.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Phone (Landline)" ur="فون نمبر" />
                      <input
                        type="text"
                        {...register('phone')}
                        placeholder="e.g. 051-1234567"
                        className={inputStyle}
                      />
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Mobile Number" ur="موبائل نمبر" required />
                      <input
                        type="text"
                        {...register('mobile')}
                        onChange={(e) => setValue('mobile', formatMobile(e.target.value), { shouldValidate: true })}
                        placeholder="e.g. 0300-1234567"
                        className={inputStyle}
                      />
                      {errors.mobile && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.mobile.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Student CNIC / Bform & Father CNIC */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="CNIC / B-Form Number" ur="طالب علم کا شناختی کارڈ نمبر" required />
                      <input
                        type="text"
                        {...register('studentCnic')}
                        onChange={(e) => setValue('studentCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className={inputStyle}
                      />
                      {errors.studentCnic && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.studentCnic.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Father's CNIC Number" ur="والد کا شناختی کارڈ نمبر" required />
                      <input
                        type="text"
                        {...register('fatherCnic')}
                        onChange={(e) => setValue('fatherCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className={inputStyle}
                      />
                      {errors.fatherCnic && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.fatherCnic.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Permanent Address" ur="مستقل پتہ" required />
                      <textarea
                        {...register('permanentAddress')}
                        rows={2}
                        placeholder="Permanent Address as on CNIC"
                        className={`${inputStyle} resize-none`}
                      />
                      {errors.permanentAddress && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.permanentAddress.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Temporary Address" ur="عارضی پتہ" />
                      <textarea
                        {...register('temporaryAddress')}
                        rows={2}
                        placeholder="Temporary/Current Address"
                        className={`${inputStyle} resize-none`}
                      />
                    </div>
                  </div>

                  {/* Photograph Upload */}
                  <div className="flex flex-col gap-1">
                    <FieldLabel en="Passport Photograph (1.5x2 size)" ur="طالب علم کی تصویر" required />
                    <div className="flex flex-col sm:flex-row items-center gap-4 border-2 border-dashed border-[var(--color-gold-muted)]/60 hover:border-[var(--color-gold-primary)] rounded-[4px] p-4 bg-[var(--color-emerald-deep)]/60 transition-all duration-300">
                      <div className="flex flex-col items-center gap-1.5 text-center flex-grow">
                        <UploadCloud className="w-8 h-8 text-[var(--color-gold-primary)] opacity-70" />
                        <span className="text-xs font-bold text-[var(--color-gold-bright)]">Drag or Browse Profile Photo</span>
                        <span className="text-[10px] text-[var(--color-teal-soft)]">Supports PNG, JPG, JPEG. (Max 1MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="student-photo-file"
                        />
                        <label
                          htmlFor="student-photo-file"
                          className="mt-2 px-3.5 py-1.5 rounded-[4px] bg-[var(--color-emerald-mid)] hover:bg-[var(--color-emerald-mid)]/80 border border-[var(--color-gold-muted)]/40 text-[var(--color-gold-bright)] text-xs font-bold cursor-pointer transition-all duration-200"
                        >
                          Select Image
                        </label>
                      </div>
                      
                      {/* Photo preview */}
                      <div className="w-[85px] h-[110px] border-2 border-dashed border-[var(--color-emerald-mid)] bg-[var(--color-panel)] rounded-[4px] flex items-center justify-center p-1 overflow-hidden">
                        {formValues.photo ? (
                          <img src={formValues.photo} alt="Upload preview" className="w-full h-full object-cover rounded" />
                        ) : (
                          <span className="text-[9px] text-[var(--color-teal-soft)] text-center">1.5x2 Size Photo</span>
                        )}
                      </div>
                    </div>
                    {errors.photo && (
                      <p className="text-[10px] text-red-400 font-bold mt-1">{errors.photo.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 1: Guardian Details */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)]/50 pb-2 mb-2 font-urdu">
                    <Users className="w-5 h-5 text-[var(--color-gold-primary)]" />
                    <h3 className="text-base sm:text-lg font-bold">
                      {currentLanguage === 'ur' ? 'سرپرست کی معلومات' : currentLanguage === 'ar' ? 'معلومات ولي الأمر' : 'Guardian Details'}
                    </h3>
                  </div>

                  {/* Guardian Name & Relation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Guardian Name" ur="سرپرست کا نام" />
                      <input
                        type="text"
                        {...register('guardianName')}
                        placeholder="Guardian's Full Name"
                        className={inputStyle}
                      />
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Relation with Guardian" ur="سرپرست سے رشتہ" />
                      <input
                        type="text"
                        {...register('guardianRelation')}
                        placeholder="e.g. Uncle / Brother"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Guardian CNIC & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Guardian CNIC Number" ur="سرپرست کا شناختی کارڈ نمبر" />
                      <input
                        type="text"
                        {...register('guardianCnic')}
                        onChange={(e) => setValue('guardianCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className={inputStyle}
                      />
                      {errors.guardianCnic && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.guardianCnic.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Guardian Contact (Mobile/Office)" ur="سرپرست کا فون نمبر" />
                      <input
                        type="text"
                        {...register('guardianPhone')}
                        placeholder="e.g. 0300-1234567"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Guardian Address details */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <FieldLabel en="Guardian Permanent Address" ur="سرپرست کا مستقل پتہ" />
                      <textarea
                        {...register('guardianPermanentAddress')}
                        rows={2}
                        placeholder="Guardian Permanent Address"
                        className={`${inputStyle} resize-none`}
                      />
                    </div>

                    <div className="flex flex-col">
                      <FieldLabel en="Guardian Temporary Address" ur="سرپرست کا عارضی پتہ" />
                      <textarea
                        {...register('guardianTemporaryAddress')}
                        rows={2}
                        placeholder="Guardian Temporary Address"
                        className={`${inputStyle} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Rules & Digital Signatures */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-[var(--color-gold-primary)] border-b border-[var(--color-emerald-mid)]/50 pb-2 mb-2 font-urdu">
                    <FileText className="w-5 h-5 text-[var(--color-gold-primary)]" />
                    <h3 className="text-base sm:text-lg font-bold">
                      {currentLanguage === 'ur' ? 'قواعد و ضوابط اور بیان حلفی' : currentLanguage === 'ar' ? 'القواعد والتعهد الخطي' : 'Rules & Digital Signatures'}
                    </h3>
                  </div>

                  {/* Rules Scroll Box */}
                  <div className="flex flex-col">
                    <FieldLabel en="Please read the rules and regulations carefully" ur="قواعد و ضوابط" />
                    <div className="h-44 border border-[var(--color-emerald-mid)]/70 rounded-[4px] p-4 bg-[var(--color-emerald-deep)]/90 text-[var(--color-text-body)] text-[11px] leading-relaxed text-right font-urdu overflow-y-auto" style={{ direction: 'rtl' }}>
                      <ol className="list-decimal pr-5 flex flex-col gap-2 font-semibold">
                        <li>امیدوار کو چاہیے کہ پرنسپل کے نام درخواست ارسال کرے جو مجوزہ فارم پر مشتمل ہو۔</li>
                        <li>درخواست فارم کے ساتھ اپنا شناختی کارڈ/بے فارم، سرپرست/والد کا شناختی کارڈ، تعلیمی اسناد کی فوٹو سٹیٹ اور 2 عدد 1.5x2 کی تصاویر منسلک کریں۔</li>
                        <li>طلباء کیلئے یونیفارم لازمی ہوگا جو کہ سفید شلوار قمیض، سفید ٹوپی بمع سیاہ رنگ کی ویسٹ کوٹ (Waistcoat) پر مشتمل ہوگا۔</li>
                        <li>ادارہ میں طلباء کیلئے اردو بولنا لازمی ہوگا۔ تمام اساتذہ کا احترام ضروری ہوگا۔</li>
                        <li>مخرب اخلاق اور خلاف شریعت افعال سے کلیتہً اجتناب اور طفلانہ حرکتوں اور فضول گوئی سے اجتناب کرنا ضروری ہوگا۔</li>
                        <li>ادارہ کی منظور شدہ تعطیلات کے علاوہ چھٹی کرنے کی کوشش نہ کریں۔</li>
                        <li>تین دن کی بغیر اطلاع غیر حاضری سے طالب علم کو جامعہ سے خارج کر دیا جائے گا۔</li>
                        <li>جو قواعد و ضوابط وقتاً فوقتاً نگران ادارہ کی طرف سے نافذ کئے جائیں گے ان کی پابندی ہر طالب علم کیلئے ضروری ہوگی۔</li>
                        <li>کلاس ٹائم میں کسی فرد سے ملاقات اور موبائل فون رکھنے یا فون سننے کی اجازت نہیں ہوگی۔</li>
                        <li>والدین شکایت کی صورت میں جامعہ کے ذمہ داران سے رابطہ کریں اور اساتذہ سے کسی قسم کا ایکشن لینے کے مجاز نہیں ہونگےے۔</li>
                        <li>طالب علم کے بھاگنے کی صورت میں جامعہ ذمہ دار نہیں ہوگا، صرف حتی الوسع ذمہ داران کو مطلع کیا جائے گا۔</li>
                      </ol>
                    </div>
                  </div>

                  {/* Affidavit Checkbox */}
                  <div className="p-4 rounded-[4px] bg-[var(--color-emerald-deep)]/70 border border-[var(--color-gold-muted)]/40 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToRules"
                      {...register('agreeToRules')}
                      className="mt-1 w-4 h-4 accent-[var(--color-gold-primary)] rounded focus:outline-none"
                    />
                    <label htmlFor="agreeToRules" className="text-xs font-bold text-[var(--color-gold-bright)] leading-relaxed text-right font-urdu cursor-pointer" style={{ direction: 'rtl' }}>
                      میں اقرار کرتا ہوں کہ میں نے جامعہ اسلام آباد کے قواعد و ضوابط اور ہدایات اچھی طرح پڑھ لئے ہیں۔ میں ان پر سختی سے عمل پیرا ہونے کا عہد کرتا ہوں۔ اگر میں قواعد و ضوابط کی خلاف ورزی کرتا ہوں، تو میں جامعہ اسلام آباد کے مطابق مناسب سزا کیلئے ذمہ دار ہوں گا۔
                    </label>
                  </div>
                  {errors.agreeToRules && (
                    <p className="text-[10px] text-red-400 font-bold mt-1">{errors.agreeToRules.message}</p>
                  )}

                  {/* Signature Pads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Signature */}
                    <div className="flex flex-col">
                      <FieldLabel en="Student Signature" ur="طالب علم کے دستخط" required />
                      <SignaturePad
                        value={formValues.studentSignature}
                        onChange={(val) => setValue('studentSignature', val, { shouldValidate: true })}
                        placeholder="طالب علم اپنے دستخط یہاں کریں"
                      />
                      {errors.studentSignature && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.studentSignature.message}</p>
                      )}
                    </div>

                    {/* Guardian Signature */}
                    <div className="flex flex-col">
                      <FieldLabel en="Guardian / Father Signature" ur="سرپرست/والد کے دستخط" required />
                      <SignaturePad
                        value={formValues.guardianSignature}
                        onChange={(val) => setValue('guardianSignature', val, { shouldValidate: true })}
                        placeholder="سرپرست اپنے دستخط یہاں کریں"
                      />
                      {errors.guardianSignature && (
                        <p className="text-[10px] text-red-400 font-bold mt-1">{errors.guardianSignature.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error summary alert */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 rounded-[4px] bg-red-950/80 border border-red-700/60 text-red-200 text-xs font-semibold select-none flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold mb-1 font-urdu">
                      {currentLanguage === 'ur'
                        ? 'براہ کرم فارم جمع کرنے سے پہلے غلطیوں کی تصحیح کریں:'
                        : currentLanguage === 'ar'
                        ? 'يرجى تصحيح الأخطاء قبل التقديم:'
                        : 'Please correct the validation errors before submitting:'}
                    </p>
                    <ul className="list-disc pl-4 flex flex-col gap-1">
                      {Object.entries(errors).map(([key, err]) => (
                        <li key={key}>{err?.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Wizard Navigations */}
              <div className="flex justify-between items-center border-t border-[var(--color-emerald-mid)]/50 pt-6 mt-4 select-none">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="btn-secondary-teal text-xs py-2 px-5 font-bold uppercase flex items-center gap-1 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {currentLanguage === 'ur' ? 'پچھلا مرحلہ' : currentLanguage === 'ar' ? 'السابق' : 'Previous'}
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary-gold text-xs py-2.5 px-6 font-bold uppercase flex items-center gap-1 shadow-lg"
                  >
                    {currentLanguage === 'ur' ? 'اگلا مرحلہ' : currentLanguage === 'ar' ? 'التالي' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn-primary-gold text-sm py-3 px-7 font-extrabold uppercase flex items-center gap-2 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentLanguage === 'ur' ? 'داخلہ فارم جمع کریں' : currentLanguage === 'ar' ? 'تقديم نموذج الالتحاق' : 'Submit Admission Form'}
                  </button>
                )}
              </div>

            </form>
          </div>
        </FormProvider>
      )}
    </div>
  );
}
