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

export function AdmissionFormContainer() {
  const [activeStep, setActiveStep] = useState(0);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);


  const steps = [
    { label: 'طالب علم کی معلومات', subLabel: 'Student Personal Info', icon: User },
    { label: 'سرپرست کی معلومات', subLabel: 'Guardian Details', icon: Users },
    { label: 'بیان حلفی و دستخط', subLabel: 'Rules & Signatures', icon: FileText },
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

  // Preview data is just the current form values, no need to sync to state
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
    // Clear autosave draft on successful submission
    clearDraft();
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitSuccess) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-emerald-950 mb-2">داخلہ فارم کامیابی سے جمع ہو گیا ہے</h2>
        <h3 className="text-base text-emerald-800 font-semibold mb-6">Admission Form Submitted Successfully</h3>
        <p className="text-zinc-600 text-sm mb-8 leading-relaxed">
          آپ کا فارم کامیابی سے وصول ہو گیا ہے۔ اب آپ ڈیجیٹل طور پر بھرے ہوئے فارم کا پرنٹ لے سکتے ہیں یا اسے محفوظ کر سکتے ہیں۔ براہ کرم اسے پرنٹ کر کے متعلقہ تعلیمی اسناد کے ساتھ جامعہ کے دفتر میں جمع کروائیں۔
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setViewMode('preview')}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-md transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
            Print Form Preview
          </button>
          <button
            onClick={() => {
              reset(defaultFormValues);
              setIsSubmitSuccess(false);
              setActiveStep(0);
              setViewMode('edit');
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium transition-all duration-300"
          >
            Fill Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Draft Saving Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-md border border-zinc-200 shadow-sm text-xs font-semibold select-none print:hidden">
        <div className="flex items-center gap-2 text-zinc-600">
          <Save className="w-4 h-4 text-emerald-600" />
          <span>Draft Autosave:</span>
          {isSaving ? (
            <span className="text-amber-600 animate-pulse">Saving draft...</span>
          ) : lastSaved ? (
            <span className="text-emerald-700">Last saved at {lastSaved}</span>
          ) : (
            <span className="text-zinc-400">No active draft</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all duration-200"
          >
            {viewMode === 'edit' ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                Show PDF Print Preview (ملا خطہ فرمائیں)
              </>
            ) : (
              <>
                <FileText className="w-3.5 h-3.5" />
                Back to Editing (ترمیم کریں)
              </>
            )}
          </button>
          {viewMode === 'preview' && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium shadow-sm transition-all duration-200"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
          )}
        </div>
      </div>

      {viewMode === 'preview' && previewData ? (
        <div className="w-full">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 mb-6 text-xs text-center select-none print:hidden">
            <p className="font-bold flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              This is the official printed view layout. Press "Print / Save as PDF" at the top to download or print.
            </p>
          </div>
          <PrintLayout data={previewData} />
        </div>
      ) : (
        <FormProvider {...methods}>
          <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-zinc-200/80 overflow-hidden print:hidden select-none">
            
            {/* Steps Progress Indicator */}
            <div className="bg-zinc-50 border-b border-zinc-200 p-6 select-none">
              <div className="flex justify-between items-center relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-300"
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
                            ? 'bg-emerald-600 text-white'
                            : isActive
                            ? 'bg-emerald-800 text-white ring-4 ring-emerald-100 shadow-md scale-110'
                            : 'bg-white border-2 border-zinc-200 text-zinc-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                      </div>
                      <div className="text-center">
                        <p className={`text-[11px] font-bold ${isActive ? 'text-emerald-950 font-extrabold' : 'text-zinc-500'}`}>
                          {step.label}
                        </p>
                        <p className="text-[9px] font-medium text-zinc-400">
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
                  <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-150 pb-2 mb-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold">طالب علم کا ذاتی ریکارڈ (Student Information)</h3>
                  </div>

                  {/* Form Number, Dept, Class */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Department</span>
                        <span>شعبہ *</span>
                      </label>
                      <select
                        {...register('department')}
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      >
                        <option value="">Select Department</option>
                        <option value="درس نظامی (Dars-e-Nizami)">درس نظامی (Dars-e-Nizami)</option>
                        <option value="حفظ القرآن (Hifz-ul-Quran)">حفظ القرآن (Hifz-ul-Quran)</option>
                        <option value="تجوید و قراءت (Tajweed-o-Qira'at)">تجوید و قراءت (Tajweed-o-Qira'at)</option>
                        <option value="مٹرک / ایف اے (Matric/FA)">مٹرک / ایف اے (Matric/FA)</option>
                      </select>
                      {errors.department && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.department.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Class / Grade</span>
                        <span>درجہ *</span>
                      </label>
                      <input
                        type="text"
                        {...register('classGrade')}
                        placeholder="e.g. 1st Year / درجہ اولیٰ"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.classGrade && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.classGrade.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Date</span>
                        <span>تاریخ *</span>
                      </label>
                      <input
                        type="date"
                        {...register('date')}
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  {/* Student Name & Father Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Student's Name</span>
                        <span>طالب علم/طالبہ کا نام *</span>
                      </label>
                      <input
                        type="text"
                        {...register('studentName')}
                        placeholder="Full Name (in Urdu/English)"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.studentName && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.studentName.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Father's Name</span>
                        <span>ولد / ولدیت *</span>
                      </label>
                      <input
                        type="text"
                        {...register('fatherName')}
                        placeholder="Father's Full Name"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.fatherName && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.fatherName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* DOB, Phone, Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Date of Birth</span>
                        <span>تاریخ پیدائش *</span>
                      </label>
                      <input
                        type="date"
                        {...register('dob')}
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.dob && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.dob.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Phone (Landline)</span>
                        <span>فون نمبر</span>
                      </label>
                      <input
                        type="text"
                        {...register('phone')}
                        placeholder="e.g. 051-1234567"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Mobile Number</span>
                        <span>موبائل نمبر *</span>
                      </label>
                      <input
                        type="text"
                        {...register('mobile')}
                        onChange={(e) => setValue('mobile', formatMobile(e.target.value), { shouldValidate: true })}
                        placeholder="e.g. 0300-1234567"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.mobile && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.mobile.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Student CNIC / Bform & Father CNIC */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>CNIC / B-Form Number</span>
                        <span>طالب علم کا شناختی کارڈ نمبر *</span>
                      </label>
                      <input
                        type="text"
                        {...register('studentCnic')}
                        onChange={(e) => setValue('studentCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.studentCnic && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.studentCnic.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Father's CNIC Number</span>
                        <span>والد کا شناختی کارڈ نمبر *</span>
                      </label>
                      <input
                        type="text"
                        {...register('fatherCnic')}
                        onChange={(e) => setValue('fatherCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.fatherCnic && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.fatherCnic.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Permanent Address</span>
                        <span>مستقل پتہ *</span>
                      </label>
                      <textarea
                        {...register('permanentAddress')}
                        rows={2}
                        placeholder="Permanent Address as on CNIC"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all resize-none"
                      />
                      {errors.permanentAddress && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.permanentAddress.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Temporary Address</span>
                        <span>عارضی پتہ</span>
                      </label>
                      <textarea
                        {...register('temporaryAddress')}
                        rows={2}
                        placeholder="Temporary/Current Address"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Photograph Upload */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-zinc-700 flex justify-between">
                      <span>Passport Photograph (1.5x2 size)</span>
                      <span>طالب علم کی تصویر *</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 border-2 border-dashed border-zinc-300 hover:border-emerald-500 rounded-xl p-4 bg-zinc-50/50 transition-all duration-300">
                      <div className="flex flex-col items-center gap-1.5 text-center flex-grow">
                        <UploadCloud className="w-8 h-8 text-zinc-400" />
                        <span className="text-xs font-bold text-zinc-700">Drag or Browse Profile Photo</span>
                        <span className="text-[10px] text-zinc-500">Supports PNG, JPG, JPEG. (Max 1MB)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="student-photo-file"
                        />
                        <label
                          htmlFor="student-photo-file"
                          className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer transition-all duration-200"
                        >
                          Select Image
                        </label>
                      </div>
                      
                      {/* Photo preview */}
                      <div className="w-[85px] h-[110px] border-2 border-dashed border-zinc-200 bg-white rounded-lg flex items-center justify-center p-1 overflow-hidden">
                        {formValues.photo ? (
                          <img src={formValues.photo} alt="Upload preview" className="w-full h-full object-cover rounded" />
                        ) : (
                          <span className="text-[9px] text-zinc-400 text-center">1.5x2 Size Photo</span>
                        )}
                      </div>
                    </div>
                    {errors.photo && (
                      <p className="text-[10px] text-red-600 font-bold">{errors.photo.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 1: Guardian Details */}
              {activeStep === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-150 pb-2 mb-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold">سرپرست کے کوائف (Guardian Information)</h3>
                  </div>

                  {/* Guardian Name & Relation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian Name</span>
                        <span>سرپرست کا نام</span>
                      </label>
                      <input
                        type="text"
                        {...register('guardianName')}
                        placeholder="Guardian's Full Name"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Relation with Guardian</span>
                        <span>سرپرست سے رشتہ</span>
                      </label>
                      <input
                        type="text"
                        {...register('guardianRelation')}
                        placeholder="e.g. Uncle / Brother"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  {/* Guardian CNIC & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian CNIC Number</span>
                        <span>سرپرست کا شناختی کارڈ نمبر</span>
                      </label>
                      <input
                        type="text"
                        {...register('guardianCnic')}
                        onChange={(e) => setValue('guardianCnic', formatCNIC(e.target.value), { shouldValidate: true })}
                        placeholder="XXXXX-XXXXXXX-X"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                      {errors.guardianCnic && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.guardianCnic.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian Contact (Mobile/Office)</span>
                        <span>سرپرست کا فون نمبر</span>
                      </label>
                      <input
                        type="text"
                        {...register('guardianPhone')}
                        placeholder="e.g. 0300-1234567"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </div>

                  {/* Guardian Address details */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian Permanent Address</span>
                        <span>سرپرست کا مستقل پتہ</span>
                      </label>
                      <textarea
                        {...register('guardianPermanentAddress')}
                        rows={2}
                        placeholder="Guardian Permanent Address"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian Temporary Address</span>
                        <span>سرپرست کا عارضی پتہ</span>
                      </label>
                      <textarea
                        {...register('guardianTemporaryAddress')}
                        rows={2}
                        placeholder="Guardian Temporary Address"
                        className="w-full px-3 py-2 border rounded-lg border-zinc-300 text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/35 focus:border-emerald-600 transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Rules & Digital Signatures */}
              {activeStep === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-150 pb-2 mb-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-bold">قواعد و ضوابط اور بیان حلفی (Rules & Digital Signatures)</h3>
                  </div>

                  {/* Rules Scroll Box */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-zinc-700">
                      قواعد و ضوابط (Please read the rules and regulations carefully)
                    </label>
                    <div className="h-44 border border-zinc-300 rounded-lg p-4 bg-zinc-50 overflow-y-auto text-zinc-800 text-[11px] leading-relaxed text-right" style={{ direction: 'rtl' }}>
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
                        <li>والدین شکایت کی صورت میں جامعہ کے ذمہ داران سے رابطہ کریں اور اساتذہ سے کسی قسم کا ایکشن لینے کے مجاز نہیں ہونگے۔</li>
                        <li>طالب علم کے بھاگنے کی صورت میں جامعہ ذمہ دار نہیں ہوگا، صرف حتی الوسع ذمہ داران کو مطلع کیا جائے گا۔</li>
                      </ol>
                    </div>
                  </div>

                  {/* Affidavit Checkbox */}
                  <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToRules"
                      {...register('agreeToRules')}
                      className="mt-1 w-4 h-4 text-emerald-800 border-zinc-300 rounded focus:ring-emerald-600 focus:outline-none accent-emerald-800"
                    />
                    <label htmlFor="agreeToRules" className="text-xs font-bold text-emerald-950 leading-relaxed text-right" style={{ direction: 'rtl' }}>
                      میں اقرار کرتا ہوں کہ میں نے جامعہ اسلام آباد کے قواعد و ضوابط اور ہدایات اچھی طرح پڑھ لئے ہیں۔ میں ان پر سختی سے عمل پیرا ہونے کا عہد کرتا ہوں۔ اگر میں قواعد و ضوابط کی خلاف ورزی کرتا ہوں، تو میں جامعہ اسلام آباد کے مطابق مناسب سزا کیلئے ذمہ دار ہوں گا۔
                    </label>
                  </div>
                  {errors.agreeToRules && (
                    <p className="text-[10px] text-red-600 font-bold">{errors.agreeToRules.message}</p>
                  )}

                  {/* Signature Pads */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Student Signature */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Student Signature</span>
                        <span>طالب علم کے دستخط *</span>
                      </label>
                      <SignaturePad
                        value={formValues.studentSignature}
                        onChange={(val) => setValue('studentSignature', val, { shouldValidate: true })}
                        placeholder="طالب علم اپنے دستخط یہاں کریں"
                      />
                      {errors.studentSignature && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.studentSignature.message}</p>
                      )}
                    </div>

                    {/* Guardian Signature */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex justify-between">
                        <span>Guardian / Father Signature</span>
                        <span>سرپرست/والد کے دستخط *</span>
                      </label>
                      <SignaturePad
                        value={formValues.guardianSignature}
                        onChange={(val) => setValue('guardianSignature', val, { shouldValidate: true })}
                        placeholder="سرپرست اپنے دستخط یہاں کریں"
                      />
                      {errors.guardianSignature && (
                        <p className="text-[10px] text-red-600 font-bold">{errors.guardianSignature.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error summary alert */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-semibold select-none flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold mb-1">Please correct the validation errors before submitting:</p>
                    <ul className="list-disc pl-4 flex flex-col gap-1">
                      {Object.entries(errors).map(([key, err]) => (
                        <li key={key}>{err?.message}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Wizard Navigations */}
              <div className="flex justify-between items-center border-t border-zinc-200 pt-6 mt-4 select-none">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all duration-200"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Submit Admission Form
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
