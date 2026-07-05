import React from 'react';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Jamia Islamabad',
  description: 'Academic rules, uniform requirements, attendance rules, and portal conditions for Jamia Islamabad.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-xs text-zinc-700 select-none">
      
      {/* Hero Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Terms & Academic Conditions
        </h1>
        <p className="text-zinc-500 text-xs max-w-xl leading-relaxed">
          Detailed academic obligations, campus rules, uniform codes, and registration terms for students at Jamia Islamabad.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-md flex flex-col gap-5 text-justify leading-relaxed">
        
        <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm border-b border-zinc-100 pb-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>Code of Conduct & Admission Agreement</span>
        </div>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-950 text-xs">1. Academic Discipline</h3>
          <p>
            Students admitted to Jamia Islamabad are required to maintain at least 85% attendance in study halaqahs and boards. Any student missing three consecutive days of classes without pre-authorized approval from the Principal's office is subject to immediate suspension or cancellation of their admission.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-950 text-xs">2. Uniform and Dress Code</h3>
          <p>
            It is mandatory for all students to attend study programs in the official uniform: clean white shalwar kameez, a white cap, and a black waistcoat. Violations of the dress code will result in warnings, followed by exclusion from classes upon repeated offenses.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-950 text-xs">3. Mobile Device Policy</h3>
          <p>
            Possession or use of mobile phones, tablets, or other digital multimedia players is strictly prohibited during class hours and inside study rooms. Devices found in violation will be confiscated by administrators and returned only to guardians upon physical consultation.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-950 text-xs">4. Accuracy of Registrations</h3>
          <p>
            By submitting our online admission form, guardians and students warrant that all information provided (CNIC numbers, ages, residential addresses, previous transcripts) is accurate and complete. If any details are later found to be falsified, the administration reserves the absolute right to cancel the enrollment immediately.
          </p>
        </section>

      </div>

    </div>
  );
}
