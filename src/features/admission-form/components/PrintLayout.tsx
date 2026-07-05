'use client';

import React from 'react';
import { Scissors } from 'lucide-react';
import { AdmissionFormData } from '../schemas/formSchema';

interface PrintLayoutProps {
  data: AdmissionFormData;
}

export function PrintLayout({ data }: PrintLayoutProps) {
  const renderCnicBoxes = (cnicString: string = '') => {
    // Strip hyphens, then build a fixed 13-slot array
    const digits = cnicString.replace(/-/g, '');
    // Always produce exactly 13 slots — empty string padEnd fails in JS when fill is ''
    const slots = Array.from({ length: 13 }, (_, i) => digits[i] ?? '');

    const boxClass =
      'w-6 h-6 flex items-center justify-center border-r last:border-r-0 border-zinc-700 text-[11px] font-extrabold font-mono text-zinc-900 bg-white';
    const groupClass = 'flex border-2 border-zinc-700 rounded overflow-hidden';
    const sepClass =
      'mx-1 font-extrabold text-zinc-600 text-sm leading-none self-center select-none';

    return (
      <div
        className="flex items-center"
        style={{ direction: 'ltr', fontFamily: 'monospace' }}
      >
        {/* Block 1 — 5 digits: slots 0-4 */}
        <div className={groupClass}>
          {slots.slice(0, 5).map((ch, i) => (
            <div key={`c1-${i}`} className={boxClass}>{ch}</div>
          ))}
        </div>

        <span className={sepClass}>-</span>

        {/* Block 2 — 7 digits: slots 5-11 */}
        <div className={groupClass}>
          {slots.slice(5, 12).map((ch, i) => (
            <div key={`c2-${i}`} className={boxClass}>{ch}</div>
          ))}
        </div>

        <span className={sepClass}>-</span>

        {/* Block 3 — 1 digit: slot 12 */}
        <div className="w-6 h-6 flex items-center justify-center border-2 border-zinc-700 rounded text-[11px] font-extrabold font-mono text-zinc-900 bg-white">
          {slots[12]}
        </div>
      </div>
    );
  };


  return (
    <div className="w-full flex flex-col gap-10 items-center justify-center bg-zinc-100 p-8 print:p-0 print:bg-white select-none">
      {/* ------------------------------------------------------------- */}
      {/* PAGE 1 */}
      {/* ------------------------------------------------------------- */}
      <div className="w-[210mm] min-h-[297mm] bg-white border border-zinc-300 shadow-xl p-[12mm] relative flex flex-col print:border-none print:shadow-none print:w-full print:min-h-0 print:p-[5mm] page-break-after-always overflow-hidden select-none">
        
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none z-0">
          <svg width="450" height="450" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="250" cy="250" r="230" stroke="#047857" strokeWidth="8" />
            <circle cx="250" cy="250" r="190" stroke="#d97706" strokeWidth="3" strokeDasharray="10 5" />
            {/* Mosque Dome Shape inside */}
            <path d="M250 100 C290 150, 340 220, 340 330 L160 330 C160 220, 210 150, 250 100 Z" fill="#047857" />
            <rect x="180" y="330" width="140" height="40" fill="#d97706" rx="4" />
            <text x="250" y="420" textAnchor="middle" fill="#047857" fontSize="24" fontWeight="bold">JAMIA ISLAMABAD</text>
            <text x="250" y="450" textAnchor="middle" fill="#d97706" fontSize="16" fontWeight="bold">EST 1992</text>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col flex-grow text-right select-none" style={{ direction: 'rtl' }}>
          
          {/* Header Calligraphy (Arabic) */}
          <div className="flex justify-between items-center text-[10px] md:text-xs font-semibold text-emerald-800/80 mb-2 border-b border-emerald-800/20 pb-1">
            <div className="text-left font-serif leading-relaxed select-none" style={{ direction: 'ltr' }}>
              وَعَلَى آلِكَ وَأَصْحَابِكَ يَا حَبِيبَ الله
            </div>
            <div className="text-right font-serif leading-relaxed select-none">
              الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَسُولَ الله
            </div>
          </div>

          {/* Main Logo & Title Header Grid */}
          <div className="grid grid-cols-12 gap-2 items-center mb-4 select-none">
            {/* Left Photo Box */}
            <div className="col-span-3 flex flex-col items-start select-none">
              <div className="w-[100px] h-[130px] border-2 border-emerald-800/30 rounded-lg flex flex-col items-center justify-center bg-emerald-50/20 p-1 hover:border-emerald-600 transition-all duration-300">
                {data.photo ? (
                  <img src={data.photo} alt="Student Photograph" className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="text-center flex flex-col gap-1 text-[10px] text-emerald-800/50 p-2 font-medium">
                    <span>دو عدد تصاویر</span>
                    <span className="dir-ltr text-[9px] font-mono">1.5 x 2</span>
                    <span>سائز</span>
                  </div>
                )}
              </div>
            </div>

            {/* Center Calligraphy Titles */}
            <div className="col-span-6 text-center flex flex-col justify-center select-none">
              <div className="flex justify-center mb-1">
                <div className="w-[64px] h-[64px] rounded-full overflow-hidden p-1 border border-zinc-200 shadow-sm bg-white">
                  <img src="/assets/Logo.png" alt="Jamia Logo" className="w-full h-full object-contain grayscale opacity-90" />
                </div>
              </div>
              <h1 className="text-3xl font-extrabold text-red-700 tracking-tight leading-none mb-1 font-serif select-none">
                جامعہ اسلام آباد
              </h1>
              <h2 className="text-lg font-bold text-emerald-900 leading-none select-none">
                جامعہ غوثیہ رضویہ I-8/4
              </h2>
              <p className="text-[11px] font-semibold text-emerald-700 mt-1 select-none">
                (الحاق شدہ تنظیم المدارس اہلسنت پاکستان)
              </p>
            </div>

            {/* Right Principal Stamp Area */}
            <div className="col-span-3 select-none">
              <div className="border border-red-500 rounded p-2 text-center text-[9px] leading-tight bg-red-50/20 text-red-800 max-w-[150px] mr-auto">
                <span className="font-bold text-[10px] text-red-700 block mb-1">روح رواں</span>
                آبشار علم و حکمت، مفخر الملت، استاذ الاساتذہ
                <span className="font-bold text-[10px] block my-0.5">پروفیسر ڈاکٹر مفتی</span>
                <span className="font-extrabold text-xs block text-red-600">محمد ظفر اقبال جلالی</span>
                پرنسپل و شیخ الحدیث جامعہ اسلام آباد
              </div>
            </div>
          </div>

          {/* Admission Form Header Badge */}
          <div className="flex justify-center mb-4 select-none">
            <div className="bg-emerald-800 text-white font-bold text-base px-10 py-1.5 rounded-full shadow-inner select-none">
              داخلہ فارم
            </div>
          </div>

          {/* Form Meta Rows */}
          <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-semibold text-zinc-800 select-none">
            <div className="col-span-4 flex items-center gap-2">
              <span>فارم نمبر:</span>
              <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-zinc-950 font-bold font-mono h-5 inline-block">
                {data.formNo || ''}
              </span>
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <span>درجہ:</span>
              <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-zinc-950 font-bold h-5 inline-block">
                {data.classGrade || ''}
              </span>
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <span>شعبہ:</span>
              <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-zinc-950 font-bold h-5 inline-block">
                {data.department || ''}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-5 text-xs font-semibold text-zinc-800 select-none">
            <div className="col-span-4 flex items-center gap-2">
              <span>تاریخ:</span>
              <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-zinc-950 font-bold font-mono h-5 inline-block">
                {data.date || ''}
              </span>
            </div>
            <div className="col-span-8"></div>
          </div>

          {/* Main Form Fields Container (Table Border style) */}
          <div className="border border-zinc-800 rounded-lg p-4 bg-white/40 flex flex-col gap-4 text-xs select-none">
            
            {/* Student Name & Father Name */}
            <div className="grid grid-cols-12 gap-4 select-none">
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[120px]">طالب علم/طالبہ کا نام:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-sm font-bold text-emerald-950 h-5 inline-block">
                  {data.studentName || ''}
                </span>
              </div>
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[60px]">ولد/ولدیت:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 text-sm font-bold text-emerald-950 h-5 inline-block">
                  {data.fatherName || ''}
                </span>
              </div>
            </div>

            {/* DOB & Phone & Mobile */}
            <div className="grid grid-cols-12 gap-4 select-none">
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[70px]">تاریخ پیدائش:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold font-mono text-emerald-950 h-5 inline-block">
                  {data.dob || ''}
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[50px]">فون نمبر:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold font-mono text-emerald-950 h-5 inline-block">
                  {data.phone || ''}
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[60px]">موبائل نمبر:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold font-mono text-emerald-950 h-5 inline-block">
                  {data.mobile || ''}
                </span>
              </div>
            </div>

            {/* CNIC Row 1: Student CNIC */}
            <div className="flex items-center justify-between py-1 select-none border-b border-zinc-100 pb-2">
              <span className="font-bold text-zinc-900 text-xs">شناختی کارڈ نمبر/بے فارم (طالب علم):</span>
              <div style={{ direction: 'ltr' }}>
                {renderCnicBoxes(data.studentCnic)}
              </div>
            </div>

            {/* CNIC Row 2: Father CNIC */}
            <div className="flex items-center justify-between py-1 select-none border-b border-zinc-100 pb-2">
              <span className="font-bold text-zinc-900 text-xs">والد کا شناختی کارڈ نمبر:</span>
              <div style={{ direction: 'ltr' }}>
                {renderCnicBoxes(data.fatherCnic)}
              </div>
            </div>

            {/* Permanent Address */}
            <div className="flex flex-col gap-1 select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[60px]">مستقل پتہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-medium text-zinc-900 h-5 inline-block">
                  {data.permanentAddress || ''}
                </span>
              </div>
              {!data.permanentAddress && (
                <div className="border-b border-dotted border-zinc-800 h-4 w-full"></div>
              )}
            </div>

            {/* Temporary Address */}
            <div className="flex flex-col gap-1 select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[60px]">عارضی پتہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-medium text-zinc-900 h-5 inline-block">
                  {data.temporaryAddress || ''}
                </span>
              </div>
              {!data.temporaryAddress && (
                <div className="border-b border-dotted border-zinc-800 h-4 w-full"></div>
              )}
            </div>

            {/* Guardian Name & Relation */}
            <div className="grid grid-cols-12 gap-4 select-none">
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[70px]">سرپرست کا نام:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold text-zinc-900 h-5 inline-block">
                  {data.guardianName || ''}
                </span>
              </div>
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[100px]">سرپرست سے رشتہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold text-zinc-900 h-5 inline-block">
                  {data.guardianRelation || ''}
                </span>
              </div>
            </div>

            {/* CNIC Row 3: Guardian CNIC */}
            <div className="flex items-center justify-between py-1 select-none border-b border-zinc-100 pb-2">
              <span className="font-bold text-zinc-900 text-xs">سرپرست کا شناختی کارڈ نمبر:</span>
              <div style={{ direction: 'ltr' }}>
                {renderCnicBoxes(data.guardianCnic || '')}
              </div>
            </div>

            {/* Guardian Phone Row */}
            <div className="flex items-center justify-between py-1 select-none border-b border-zinc-100 pb-2">
              <span className="font-bold text-zinc-900 text-xs">سرپرست کا فون نمبر (رہائش/دفتر):</span>
              <span className="w-[312px] border-b-2 border-dotted border-zinc-800 font-bold font-mono text-zinc-950 h-5 inline-block text-left" style={{ direction: 'ltr' }}>
                {data.guardianPhone || ''}
              </span>
            </div>

            {/* Guardian Permanent Address */}
            <div className="flex flex-col gap-1 select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[100px]">سرپرست کا مستقل پتہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-medium text-zinc-900 h-5 inline-block">
                  {data.guardianPermanentAddress || ''}
                </span>
              </div>
              {!data.guardianPermanentAddress && (
                <div className="border-b border-dotted border-zinc-800 h-4 w-full"></div>
              )}
            </div>

            {/* Guardian Temporary Address */}
            <div className="flex flex-col gap-1 select-none">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-900 min-w-[100px]">سرپرست کا عارضی پتہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-medium text-zinc-900 h-5 inline-block">
                  {data.guardianTemporaryAddress || ''}
                </span>
              </div>
              {!data.guardianTemporaryAddress && (
                <div className="border-b border-dotted border-zinc-800 h-4 w-full"></div>
              )}
            </div>

          </div>

          {/* Dotted Slip Separator for Office Slip */}
          <div className="my-6 border-b-2 border-dashed border-zinc-800 relative select-none print:my-4">
            <div className="absolute left-10 -top-2.5 bg-white px-2 text-zinc-800 flex items-center gap-1 text-[10px] font-bold">
              <Scissors className="w-3.5 h-3.5" />
              <span>یہاں سے کاٹیں</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* OFFICE USE SLIP (BOTTOM SECTION OF PAGE 1) */}
          {/* ------------------------------------------------------------- */}
          <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-50/50 relative flex flex-col gap-3 text-xs select-none">
            <div className="absolute top-1.5 left-3 text-[10px] font-bold text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200">
              دفتری استعمال کیلئے
            </div>
            
            <div className="text-center font-bold text-sm text-emerald-950 mb-1 select-none">
              ولد جامعہ اسلام آباد (دفتری رسید)
            </div>

            <div className="grid grid-cols-12 gap-4 select-none">
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900">فارم نمبر:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold font-mono text-zinc-900 h-5 inline-block">
                  {data.formNo || ''}
                </span>
              </div>
              <div className="col-span-6 flex items-center gap-2">
                <span className="font-bold text-zinc-900">نام طالب علم:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold text-zinc-900 h-5 inline-block">
                  {data.studentName || ''}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 select-none">
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900">درجہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold text-zinc-900 h-5 inline-block">
                  {data.classGrade || ''}
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900">شعبہ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold text-zinc-900 h-5 inline-block">
                  {data.department || ''}
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <span className="font-bold text-zinc-900">تاریخ:</span>
                <span className="flex-grow border-b-2 border-dotted border-zinc-800 font-bold font-mono text-zinc-900 h-5 inline-block">
                  {data.date || ''}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2 select-none">
              <div className="col-span-8"></div>
              <div className="col-span-4 flex items-center gap-2 justify-end">
                <span className="font-bold text-zinc-900">دستخط وصول کنندہ:</span>
                <span className="w-24 border-b border-zinc-800 h-5"></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PAGE 2 */}
      {/* ------------------------------------------------------------- */}
      <div className="w-[210mm] min-h-[297mm] bg-white border border-zinc-300 shadow-xl p-[12mm] relative flex flex-col print:border-none print:shadow-none print:w-full print:min-h-0 print:p-[5mm] print:mt-10 overflow-hidden select-none">
        
        <div className="relative z-10 flex flex-col flex-grow text-right select-none" style={{ direction: 'rtl' }}>
          
          {/* Rules and Regulations Header */}
          <div className="flex justify-center mb-4 select-none">
            <div className="bg-emerald-800 text-white font-bold text-base px-10 py-1.5 rounded-full shadow-inner select-none">
              قواعد و ضوابط
            </div>
          </div>

          {/* 11 Rules in Urdu */}
          <div className="border border-zinc-800 rounded-lg p-5 bg-white/40 mb-6 text-zinc-800 select-none">
            <ol className="list-decimal pr-5 flex flex-col gap-2.5 text-xs font-semibold leading-relaxed">
              <li>
                امیدوار کو چاہیے کہ پرنسپل کے نام درخواست ارسال کرے جو مجوزہ فارم پر مشتمل ہو۔
              </li>
              <li>
                درخواست فارم کے ساتھ اپنا شناختی کارڈ/بے فارم، سرپرست/والد کا شناختی کارڈ، تعلیمی اسناد کی فوٹو سٹیٹ اور 2 عدد 1.5x2 کی تصاویر منسلک کریں۔
              </li>
              <li>
                طلباء کیلئے یونیفارم لازمی ہوگا جو کہ سفید شلوار قمیض، سفید ٹوپی بمع سیاہ رنگ کی ویسٹ کوٹ (Waistcoat) پر مشتمل ہوگا۔
              </li>
              <li>
                ادارہ میں طلباء کیلئے اردو بولنا لازمی ہوگا۔ تمام اساتذہ کا احترام ضروری ہوگا۔
              </li>
              <li>
                مخرب اخلاق اور خلاف شریعت افعال سے کلیتہً اجتناب اور طفلانہ حرکتوں اور فضول گوئی سے اجتناب کرنا ضروری ہوگا۔
              </li>
              <li>
                ادارہ کی منظور شدہ تعطیلات کے علاوہ چھٹی کرنے کی کوشش نہ کریں۔
              </li>
              <li>
                تین دن کی بغیر اطلاع غیر حاضری سے طالب علم کو جامعہ سے خارج کر دیا جائے گا۔
              </li>
              <li>
                جو قواعد و ضوابط وقتاً فوقتاً نگران ادارہ کی طرف سے نافذ کئے جائیں گے ان کی پابندی ہر طالب علم کیلئے ضروری ہوگی۔
              </li>
              <li>
                کلاس ٹائم میں کسی فرد سے ملاقات اور موبائل فون رکھنے یا فون سننے کی اجازت نہیں ہوگی۔
              </li>
              <li>
                والدین شکایت کی صورت میں جامعہ کے ذمہ داران سے رابطہ کریں اور اساتذہ سے کسی قسم کا ایکشن لینے کے مجاز نہیں ہونگے۔
              </li>
              <li>
                طالب علم کے بھاگنے کی صورت میں جامعہ ذمہ دار نہیں ہوگا، صرف حتی الوسع ذمہ داران کو مطلع کیا جائے گا۔
              </li>
            </ol>
          </div>

          {/* Affidavit / Declaration Header */}
          <div className="flex justify-center mb-4 select-none">
            <div className="bg-emerald-800 text-white font-bold text-base px-10 py-1.5 rounded-full shadow-inner select-none">
              بیان حلفی
            </div>
          </div>

          {/* Declaration Text */}
          <div className="border border-zinc-800 rounded-lg p-5 bg-white/40 mb-6 text-zinc-900 select-none">
            <p className="text-[13px] font-bold text-zinc-800 mb-2 leading-relaxed">
              مکرمی محترمی جناب پرنسپل صاحب! السلام علیکم ورحمۃ اللہ تعالی و برکاتہ
            </p>
            <p className="text-xs font-semibold leading-loose text-justify">
              میں <span className="border-b-2 border-dotted border-zinc-800 px-4 text-sm font-bold text-emerald-950 inline-block min-w-[150px] text-center">{data.studentName || ''}</span> نے جامعہ اسلام آباد کے قواعد و ضوابط اور ہدایات اچھی طرح پڑھ لئے ہیں۔ میں ان پر سختی سے عمل پیرا ہونے کا عہد کرتا ہوں۔ اگر میں قواعد و ضوابط کی خلاف ورزی کرتا ہوں، تو میں جامعہ اسلام آباد کے مطابق مناسب سزا کیلئے ذمہ دار ہوں گا۔
            </p>

            {/* Signature Placement Rows */}
            <div className="grid grid-cols-2 gap-8 mt-10 select-none">
              {/* Student Signature */}
              <div className="flex flex-col items-center gap-1 select-none">
                <div className="h-20 w-44 flex items-center justify-center border-b border-zinc-800 bg-white/50 rounded p-1 select-none">
                  {data.studentSignature ? (
                    <img src={data.studentSignature} alt="Student Signature" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-[10px] text-zinc-400">طالب علم کے دستخط</span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-zinc-800 mt-1">دستخط طالب علم</span>
              </div>

              {/* Guardian Signature */}
              <div className="flex flex-col items-center gap-1 select-none">
                <div className="h-20 w-44 flex items-center justify-center border-b border-zinc-800 bg-white/50 rounded p-1 select-none">
                  {data.guardianSignature ? (
                    <img src={data.guardianSignature} alt="Guardian Signature" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-[10px] text-zinc-400">سرپرست کے دستخط</span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-zinc-800 mt-1">دستخط سرپرست/والد</span>
              </div>
            </div>
          </div>

          {/* Footer Address details (Original banner mockup) */}
          <div className="mt-auto border-2 border-zinc-950 rounded-lg overflow-hidden select-none">
            <div className="p-4 text-center bg-white select-none">
              <h2 className="text-2xl font-extrabold text-zinc-900 select-none">جامعہ اسلام آباد</h2>
              <p className="text-xs font-bold text-emerald-800 mt-1 select-none">ہیڈ آفس: جامعہ غوثیہ رضویہ</p>
              <p className="text-xs font-semibold text-zinc-700 mt-1 select-none">
                متصل مرکزی جامع مسجد نور مدینہ، گلی نمبر B-85، I-8/4، اسلام آباد
              </p>
              <p className="text-sm font-bold text-zinc-900 mt-2 dir-ltr select-none" style={{ direction: 'ltr' }}>
                +92 51 4864 945
              </p>
            </div>
            
            {/* Social links row */}
            <div className="bg-zinc-950 text-white py-2 px-4 flex justify-between items-center text-[10px] font-bold tracking-wider select-none font-mono dir-ltr" style={{ direction: 'ltr' }}>
              <span>Facebook/Jamiaislamabaad</span>
              <span>www.jamiaislamabad.net</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
