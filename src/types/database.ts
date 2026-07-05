// TypeScript Database Models mapping directly to SQL schema definitions

export interface Permission {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface RolePermission {
  role_id: number;
  permission_id: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  user_id: number;
  role_id: number;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  head_of_department_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Program {
  id: number;
  department_id: number;
  name: string;
  code: string;
  duration_months: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  program_id: number;
  name: string;
  code: string;
  credits: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: number;
  user_id?: number;
  department_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  qualification: string;
  designation: string;
  joining_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Parent {
  id: number;
  full_name: string;
  cnic: string;
  phone: string;
  occupation?: string;
  address_permanent: string;
  address_temporary?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: number;
  user_id?: number;
  parent_id: number;
  roll_no?: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  cnic_bform: string;
  phone?: string;
  mobile: string;
  address_permanent: string;
  address_temporary?: string;
  current_status: 'enrolled' | 'graduated' | 'suspended' | 'left';
  admission_date: string;
  created_at: string;
  updated_at: string;
}

export interface Admission {
  id: number;
  student_id: number;
  program_id: number;
  form_no: string;
  admission_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  comments?: string;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: number;
  student_id: number;
  course_id: number;
  date: string;
  status: 'present' | 'absent' | 'leave' | 'late';
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface Result {
  id: number;
  student_id: number;
  course_id: number;
  exam_type: string;
  marks_obtained: number;
  marks_total: number;
  grade: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  student_id: number;
  amount: number;
  payment_date: string;
  payment_type: string;
  receipt_no: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  target_audience: 'all' | 'students' | 'teachers' | 'parents';
  published_by?: number;
  published_at: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  associated_type: 'Student' | 'Teacher' | 'Admission';
  associated_id: number;
  document_type: 'ProfilePhoto' | 'CNICCopy' | 'EducationalCert' | 'Signature';
  file_path: string;
  file_name: string;
  file_size_bytes: number;
  mime_type: string;
  uploaded_at: string;
}

export interface AuditLog {
  id: number;
  user_id?: number;
  action: string;
  table_name: string;
  row_id: number;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}
