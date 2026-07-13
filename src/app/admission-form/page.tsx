import React from 'react';
import { AdmissionFormContainer } from '../../features/admission-form/components/AdmissionFormContainer';
import { Sparkles } from 'lucide-react';

import { PageBanner } from '../../components/PageBanner';

export const metadata = {
  title: 'Admission Form | Jamia Islamabad',
  description: 'Digital admission application form for Jamia Islamabad. Fill online, autosave drafts, sign digitally, and print A4 replica.',
};

export default function AdmissionFormPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full print:hidden">
        <PageBanner 
          title="داخلہ فارم (Admission Form)" 
          description="براہ کرم فارم کو احتیاط سے پر کریں۔ تمام لازمی فیلڈز کو پُر کریں اور ڈیجیٹل دستخط اپلوڈ کریں۔ فارم جمع کرنے کے بعد، آپ پی ڈی ایف ڈاؤن لوڈ یا پرنٹ کر سکتے ہیں۔" 
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Form container mount */}
        <AdmissionFormContainer />
      </div>
    </div>
  );
}
