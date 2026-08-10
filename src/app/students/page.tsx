'use client';

import React from 'react';
import { StudentDirectory } from '../../features/student-directory/components/StudentDirectory';
import { PageBanner } from '../../components/PageBanner';
import { useLanguage } from '../../context/LanguageContext';

export default function StudentsDirectoryPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner 
        title={t('students:title')} 
        description={t('students:description')} 
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        {/* Directory component mount */}
        <StudentDirectory />
      </div>
    </div>
  );
}
