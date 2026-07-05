import React from 'react';
import Link from 'next/link';
import { FileCheck, ClipboardList, Coins, CalendarDays, ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Admissions Info | Jamia Islamabad',
  description: 'Examine admission requirements, fee structures, eligibility criteria, and academic timelines for Jamia Islamabad.',
};

export default function AdmissionsPage() {
  const reqDocs = [
    'Original CNIC or B-Form (plus copy) / شناختی کارڈ یا بے فارم کی کاپی',
    'Father or Guardian\'s CNIC Copy / سرپرست کے شناختی کارڈ کی کاپی',
    'Two (2) passport-size photos (1.5x2 size) / دو عدد پاسپورٹ سائز تصاویر',
    'Attested copies of previous educational certificates / تعلیمی اسناد کی نقول',
    'Character certificate from previous institution (if applicable) / کردار سرٹیفکیٹ',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Admissions Guidelines
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          Welcome to the admissions portal of Jamia Islamabad. Review our criteria, document checklists, and calendars to start your application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        {/* Requirements & Eligibility */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <ClipboardList className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">Eligibility & Criteria</h3>
          </div>
          <div className="text-xs text-zinc-650 flex flex-col gap-3">
            <p className="leading-relaxed">
              <strong>General:</strong> Admissions are open to all students regardless of regional origin, provided they pass the initial interview and entry test.
            </p>
            <p className="leading-relaxed">
              <strong>Dars-e-Nizami:</strong> Candidates must have completed Middle school (Grade 8) or Matriculation for entry into the basic year.
            </p>
            <p className="leading-relaxed">
              <strong>Hifz-ul-Quran:</strong> Open to younger candidates (ages 8-12) who have completed basic Qaida and Quran recitation training.
            </p>
            <p className="leading-relaxed">
              <strong>Conduct:</strong> Applicants must agree to abide by all rules regarding uniforms (white shalwar kameez, cap, black waistcoat) and mobile phone usage limitations.
            </p>
          </div>
        </div>

        {/* Required Documents */}
        <div className="md:col-span-6 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">Required Documents Checklist</h3>
          </div>
          <ul className="list-disc pl-5 flex flex-col gap-2.5 text-xs text-zinc-650 font-medium">
            {reqDocs.map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-5 mb-12">
        <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
          <Coins className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold">Fee Structure / تعلیمی اخراجات</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse text-zinc-800">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-bold">
              <tr>
                <th className="p-3">Program</th>
                <th className="p-3">Admission Fee</th>
                <th className="p-3">Monthly Tuition</th>
                <th className="p-3">Exam Fee</th>
                <th className="p-3">Hostel Fee (Optional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="p-3 font-bold">درس نظامی (Dars-e-Nizami)</td>
                <td className="p-3 font-mono font-semibold">PKR 5,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,500</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">حفظ القرآن (Hifz-ul-Quran)</td>
                <td className="p-3 font-mono font-semibold">PKR 3,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 800</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">تجوید و قراءت (Tajweed-o-Qira'at)</td>
                <td className="p-3 font-bold">PKR 3,000</td>
                <td className="p-3 font-mono font-semibold">PKR 1,000</td>
                <td className="p-3 font-mono font-semibold">PKR 800</td>
                <td className="p-3 font-mono font-semibold">N/A</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">مٹرک / ایف اے (Matric/FA)</td>
                <td className="p-3 font-mono font-semibold">Board Rates</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
                <td className="p-3 font-mono font-semibold">Board Rates</td>
                <td className="p-3 font-mono font-semibold">PKR 2,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-zinc-400 font-bold">
          * Note: Scholarship and financial aid are available for deserving students upon request and evaluation.
        </p>
      </div>

      {/* Admissions Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
        <div className="md:col-span-8 p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-zinc-100 pb-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold">Academic Session Calendar</h3>
          </div>
          
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex items-start gap-4">
              <div className="w-24 font-bold font-mono text-emerald-700">Jan 15 - Feb 28</div>
              <div>
                <strong className="block text-zinc-950">Registration Window</strong>
                <span className="text-zinc-500">Submit digital applications online and print replicas.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 font-bold font-mono text-emerald-700">Mar 01 - Mar 07</div>
              <div>
                <strong className="block text-zinc-950">Interviews & Entry Tests</strong>
                <span className="text-zinc-500">Evaluations for theological knowledge, basic recitation, and academic fit.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 font-bold font-mono text-emerald-700">Mar 10</div>
              <div>
                <strong className="block text-zinc-950">Merit List Display</strong>
                <span className="text-zinc-500">Final list of selected candidates is displayed at admin office and directory.</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-24 font-bold font-mono text-emerald-700">Mar 15</div>
              <div>
                <strong className="block text-zinc-950">Classes Commencement</strong>
                <span className="text-zinc-500">Commencement of the new academic session.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Application Panel */}
        <div className="md:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white flex flex-col gap-4 shadow-xl">
          <h3 className="text-base font-bold text-amber-400">Ready to Enroll?</h3>
          <p className="text-emerald-100/80 text-xs leading-relaxed">
            Initialize your online profile draft now. Keep track of updates and prepare your documents for validation.
          </p>
          <Link
            href="/admission-form"
            className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold text-xs text-center shadow-md transition-all duration-300 flex items-center justify-center gap-1"
          >
            Apply Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
