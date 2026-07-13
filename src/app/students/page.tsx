import React from 'react';
import { StudentDirectory } from '../../features/student-directory/components/StudentDirectory';
import { Search } from 'lucide-react';

import { PageBanner } from '../../components/PageBanner';

export const metadata = {
  title: 'Students Directory | Jamia Islamabad',
  description: 'Search and inspect academic profiles, roll numbers, and departments of currently enrolled students at Jamia Islamabad.',
};

export default function StudentsDirectoryPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <PageBanner 
        title="Current Enrolled Students" 
        description="حالیہ زیرِ تعلیم طلباء کا دفتری ریکارڈ۔ شعبہ جات اور رول نمبر کے حساب سے تلاش کریں۔" 
      />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 select-none">
        {/* Directory component mount */}
        <StudentDirectory />
      </div>
    </div>
  );
}
