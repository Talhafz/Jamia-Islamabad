'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ArrowUpDown, 
  UserCheck, 
  UserX, 
  GraduationCap, 
  Info,
  Calendar, 
  MapPin, 
  Phone, 
  CreditCard,
  Briefcase,
  X 
} from 'lucide-react';
import { mockStudents, StudentWithParent } from '../../../constants/mockStudents';
import { useLanguage } from '../../../context/LanguageContext';

export function StudentDirectory() {
  const { t, direction } = useLanguage();
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [sortBy, setSortBy] = useState<'name' | 'roll_no' | 'dob'>('roll_no');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Selected student for details modal
  const [selectedStudent, setSelectedStudent] = useState<StudentWithParent | null>(null);

  // Helper for program localization
  const getProgramLabel = (programName: string) => {
    if (programName.includes('Dars-e-Nizami') || programName.includes('درس نظامی')) {
      return t('students:programs.dars');
    }
    if (programName.includes('Hifz') || programName.includes('حفظ')) {
      return t('students:programs.hifz');
    }
    if (programName.includes('Tajweed') || programName.includes('تجوید')) {
      return t('students:programs.tajweed');
    }
    if (programName.includes('Matric') || programName.includes('مٹرک')) {
      return t('students:programs.matric');
    }
    return programName;
  };

  // Helper for status localization
  const getStatusLabel = (status: string) => {
    const key = `students:status.${status.toLowerCase()}`;
    return t(key);
  };

  // Filter & Sort Logic
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...mockStudents];

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          `${s.first_name} ${s.last_name}`.toLowerCase().includes(q) ||
          s.roll_no?.toLowerCase().includes(q) ||
          s.cnic_bform.includes(q) ||
          s.parent.full_name.toLowerCase().includes(q)
      );
    }

    // Filter by program
    if (programFilter) {
      result = result.filter((s) => s.programName === programFilter);
    }

    // Filter by status
    if (statusFilter) {
      result = result.filter((s) => s.current_status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else if (sortBy === 'roll_no') {
        const rollA = a.roll_no || '';
        const rollB = b.roll_no || '';
        comparison = rollA.localeCompare(rollB);
      } else if (sortBy === 'dob') {
        comparison = new Date(a.date_of_birth).getTime() - new Date(b.date_of_birth).getTime();
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [search, programFilter, statusFilter, sortBy, sortOrder]);

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedStudents.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredAndSortedStudents, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);

  const toggleSort = (field: 'name' | 'roll_no' | 'dob') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const programs = [
    "درس نظامی (Dars-e-Nizami)",
    "حفظ القرآن (Hifz-ul-Quran)",
    "تجوید و قراءت (Tajweed-o-Qira'at)",
    "مٹرک / ایف اے (Matric/FA)"
  ];

  return (
    <div className="w-full flex flex-col gap-6" dir={direction}>
      
      {/* Search & Filter Panel */}
      <div className="p-6 rounded-[4px] card-standard shadow-md flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Keyword Search */}
          <div className="md:col-span-5 relative">
            <Search className={`absolute ${direction === 'rtl' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[var(--color-teal-accent)]`} />
            <input
              type="text"
              placeholder={t('students:searchPlaceholder')}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all`}
              dir={direction}
            />
          </div>

          {/* Program Filter */}
          <div className="md:col-span-3">
            <select
              value={programFilter}
              onChange={(e) => {
                setProgramFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
              dir={direction}
            >
              <option value="">{t('students:filters.allPrograms')}</option>
              {programs.map((p) => (
                <option key={p} value={p}>{getProgramLabel(p)}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs border rounded-sm border-[var(--color-emerald-mid)] text-[var(--color-text-body)] bg-[var(--color-emerald-deep)] focus:outline-none focus:border-[var(--color-gold-primary)] transition-all"
              dir={direction}
            >
              <option value="">{t('students:filters.allStatuses')}</option>
              <option value="enrolled">{t('students:status.enrolled')}</option>
              <option value="graduated">{t('students:status.graduated')}</option>
              <option value="suspended">{t('students:status.suspended')}</option>
              <option value="left">{t('students:status.left')}</option>
            </select>
          </div>

          {/* View Modes */}
          <div className={`md:col-span-2 flex ${direction === 'rtl' ? 'justify-start md:justify-end' : 'justify-end'} gap-2`}>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-sm border transition-all ${
                viewMode === 'table' 
                  ? 'bg-[var(--color-gold-primary)] border-[var(--color-gold-bright)] text-[var(--color-emerald-bg)] shadow-sm' 
                  : 'bg-[var(--color-emerald-deep)] border-[var(--color-emerald-mid)] text-[var(--color-text-body)] hover:text-[var(--color-gold-bright)]'
              }`}
              title={t('students:viewMode.table')}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-sm border transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[var(--color-gold-primary)] border-[var(--color-gold-bright)] text-[var(--color-emerald-bg)] shadow-sm' 
                  : 'bg-[var(--color-emerald-deep)] border-[var(--color-emerald-mid)] text-[var(--color-text-body)] hover:text-[var(--color-gold-bright)]'
              }`}
              title={t('students:viewMode.grid')}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Directory Content */}
      {filteredAndSortedStudents.length === 0 ? (
        <div className="text-center p-12 card-standard rounded-[4px] shadow-sm text-[var(--color-text-muted)]">
          <Info className="w-10 h-10 text-[var(--color-teal-accent)] mx-auto mb-3" />
          <p className="text-sm font-bold text-[var(--color-gold-bright)]">{t('students:noMatchTitle')}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{t('students:noMatchDesc')}</p>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="w-full overflow-hidden card-standard rounded-[4px] shadow-xl">
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse text-xs text-[var(--color-text-body)] ${direction === 'rtl' ? 'text-right' : 'text-left'}`} dir={direction}>
              <thead className="bg-[var(--color-emerald-deep)] border-b border-[var(--color-emerald-mid)] text-[var(--color-gold-primary)] font-bold select-none">
                <tr>
                  <th className="p-4 cursor-pointer hover:bg-[var(--color-panel)] transition-colors" onClick={() => toggleSort('roll_no')}>
                    <div className="flex items-center gap-1.5">
                      {t('students:table.rollNo')}
                      <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                    </div>
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-[var(--color-panel)] transition-colors" onClick={() => toggleSort('name')}>
                    <div className="flex items-center gap-1.5">
                      {t('students:table.name')}
                      <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                    </div>
                  </th>
                  <th className="p-4">{t('students:table.fatherName')}</th>
                  <th className="p-4">{t('students:table.department')}</th>
                  <th className="p-4 cursor-pointer hover:bg-[var(--color-panel)] transition-colors" onClick={() => toggleSort('dob')}>
                    <div className="flex items-center gap-1.5">
                      {t('students:table.dob')}
                      <ArrowUpDown className="w-3.5 h-3.5 text-[var(--color-teal-accent)]" />
                    </div>
                  </th>
                  <th className="p-4 text-center">{t('students:table.status')}</th>
                  <th className="p-4 text-center">{t('students:table.profile')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-emerald-mid)]/40">
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-[var(--color-emerald-deep)]/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-[var(--color-gold-bright)]">{student.roll_no}</td>
                    <td className="p-4 font-bold text-[var(--color-text-body)]">{student.first_name} {student.last_name}</td>
                    <td className="p-4 font-medium text-[var(--color-text-muted)]">{student.parent.full_name}</td>
                    <td className="p-4 text-[var(--color-text-body)]">{getProgramLabel(student.programName)}</td>
                    <td className="p-4 text-[var(--color-teal-soft)] font-mono">{student.date_of_birth}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[10px] font-bold border ${
                        student.current_status === 'enrolled'
                          ? 'bg-[var(--color-emerald-deep)] text-[var(--color-teal-soft)] border-[var(--color-teal-accent)]/30'
                          : student.current_status === 'graduated'
                          ? 'bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] border-[var(--color-gold-primary)]/30'
                          : 'bg-[var(--color-emerald-deep)] text-[var(--color-text-muted)] border-[var(--color-emerald-mid)]'
                      }`}>
                        {student.current_status === 'enrolled' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        {getStatusLabel(student.current_status)}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-2.5 py-1 rounded-sm bg-[var(--color-emerald-deep)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-emerald-bg)] text-[var(--color-gold-bright)] border border-[var(--color-gold-primary)]/40 transition-all font-bold"
                      >
                        {t('students:buttons.details')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedStudents.map((student) => (
            <div key={student.id} className="card-standard p-5 rounded-[4px] flex flex-col justify-between gap-4 hover:border-[var(--color-gold-primary)] transition-all duration-300">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-[var(--color-gold-bright)] bg-[var(--color-emerald-deep)] px-2.5 py-1 rounded-sm border border-[var(--color-gold-primary)]/30">
                    {student.roll_no}
                  </span>
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold border ${
                    student.current_status === 'enrolled'
                      ? 'bg-[var(--color-emerald-deep)] text-[var(--color-teal-soft)] border-[var(--color-teal-accent)]/30'
                      : 'bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] border-[var(--color-gold-primary)]/30'
                  }`}>
                    {getStatusLabel(student.current_status)}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-gold-bright)] mt-1">
                    {student.first_name} {student.last_name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] font-medium">{t('students:card.fatherPrefix')}{student.parent.full_name}</p>
                </div>
                
                <div className="text-xs text-[var(--color-text-body)] flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[var(--color-teal-accent)] shrink-0" />
                    <span>{getProgramLabel(student.programName)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--color-teal-accent)] shrink-0" />
                    <span>{t('students:card.dobPrefix')}{student.date_of_birth}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(student)}
                className="w-full py-2 bg-[var(--color-emerald-deep)] hover:bg-[var(--color-gold-primary)] hover:text-[var(--color-emerald-bg)] border border-[var(--color-gold-primary)]/40 text-[var(--color-gold-bright)] rounded-sm text-xs font-bold transition-all duration-300"
              >
                {t('students:buttons.viewProfile')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 select-none print:hidden">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-sm border border-[var(--color-emerald-mid)] bg-[var(--color-emerald-deep)] hover:border-[var(--color-gold-primary)] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-[var(--color-text-body)] transition-all"
          >
            {t('students:pagination.prev')}
          </button>
          <span className="text-xs font-semibold text-[var(--color-text-muted)] font-mono">
            {t('students:pagination.pageOf', { current: String(currentPage), total: String(totalPages) })}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-sm border border-[var(--color-emerald-mid)] bg-[var(--color-emerald-deep)] hover:border-[var(--color-gold-primary)] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-[var(--color-text-body)] transition-all"
          >
            {t('students:pagination.next')}
          </button>
        </div>
      )}

      {/* Profile Detail Overlay Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in select-none" dir={direction}>
          <div className="card-standard rounded-[4px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-up border border-[var(--color-gold-primary)]/40">
            
            {/* Header */}
            <div className="p-6 border-b border-[var(--color-emerald-mid)]/40 bg-[var(--color-emerald-deep)] flex justify-between items-start sticky top-0 z-10">
              <div>
                <h2 className="text-base font-bold text-[var(--color-gold-bright)]">
                  {selectedStudent.first_name} {selectedStudent.last_name}
                </h2>
                <p className="text-xs font-mono font-bold text-[var(--color-teal-accent)]">{selectedStudent.roll_no}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-sm hover:bg-[var(--color-panel)] text-[var(--color-text-muted)] hover:text-[var(--color-gold-bright)] transition-all"
                aria-label={t('students:modal.close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-6 flex flex-col gap-6 text-xs text-[var(--color-text-body)]">
              
              {/* Enrollment Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-[var(--color-emerald-mid)]/40 pb-5">
                <div>
                  <span className="text-[10px] text-[var(--color-teal-accent)] font-bold block mb-0.5 uppercase">{t('students:modal.academicProgram')}</span>
                  <span className="font-bold text-[var(--color-gold-bright)]">{getProgramLabel(selectedStudent.programName)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-teal-accent)] font-bold block mb-0.5 uppercase">{t('students:modal.admissionDate')}</span>
                  <span className="font-bold font-mono text-[var(--color-text-body)]">{selectedStudent.admission_date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[var(--color-teal-accent)] font-bold block mb-0.5 uppercase">{t('students:modal.currentStatus')}</span>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-sm text-[9px] font-bold border ${
                    selectedStudent.current_status === 'enrolled'
                      ? 'bg-[var(--color-emerald-deep)] text-[var(--color-teal-soft)] border-[var(--color-teal-accent)]/30'
                      : 'bg-[var(--color-emerald-deep)] text-[var(--color-gold-bright)] border-[var(--color-gold-primary)]/30'
                  }`}>
                    {getStatusLabel(selectedStudent.current_status)}
                  </span>
                </div>
              </div>

              {/* Student Personal details */}
              <div className="flex flex-col gap-3">
                <h4 className={`font-bold text-[var(--color-gold-primary)] ${direction === 'rtl' ? 'border-r-2 pr-2' : 'border-l-2 pl-2'} border-[var(--color-gold-primary)]`}>
                  {t('students:modal.personalDetails')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-emerald-deep)] p-4 rounded-sm border border-[var(--color-emerald-mid)]/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.dob')}</span>
                      <span className="font-bold font-mono">{selectedStudent.date_of_birth}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.cnic')}</span>
                      <span className="font-bold font-mono">{selectedStudent.cnic_bform}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.mobile')}</span>
                      <span className="font-bold font-mono">{selectedStudent.mobile}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.address')}</span>
                      <span className="font-medium">{selectedStudent.address_permanent}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div className="flex flex-col gap-3">
                <h4 className={`font-bold text-[var(--color-gold-primary)] ${direction === 'rtl' ? 'border-r-2 pr-2' : 'border-l-2 pl-2'} border-[var(--color-gold-primary)]`}>
                  {t('students:modal.parentDetails')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[var(--color-emerald-deep)] p-4 rounded-sm border border-[var(--color-emerald-mid)]/40">
                  <div>
                    <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.fatherName')}</span>
                    <span className="font-bold">{selectedStudent.parent.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.fatherCnic')}</span>
                      <span className="font-bold font-mono">{selectedStudent.parent.cnic}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.fatherOccupation')}</span>
                      <span className="font-bold">{selectedStudent.parent.occupation || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--color-teal-accent)] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[var(--color-text-muted)] block">{t('students:modal.fatherContact')}</span>
                      <span className="font-bold font-mono">{selectedStudent.parent.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
