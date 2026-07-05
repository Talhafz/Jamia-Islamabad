import React from 'react';
import { StudentDirectory } from '../../features/student-directory/components/StudentDirectory';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Students Directory | Jamia Islamabad',
  description: 'Search and inspect academic profiles, roll numbers, and departments of currently enrolled students at Jamia Islamabad.',
};

export default function StudentsDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none">
      
      {/* Intro Header */}
      <div className="text-center flex flex-col items-center gap-3 mb-8 animate-fade-in">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
          <Search className="w-3.5 h-3.5" />
          Academic Database Directory
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-950 tracking-tight leading-none">
          Current Enrolled Students
        </h1>
        <p className="text-zinc-500 text-xs max-w-lg leading-relaxed">
          حالیہ زیرِ تعلیم طلباء کا دفتری ریکارڈ۔ شعبہ جات اور رول نمبر کے حساب سے تلاش کریں۔
        </p>
      </div>

      {/* Directory component mount */}
      <StudentDirectory />
    </div>
  );
}
