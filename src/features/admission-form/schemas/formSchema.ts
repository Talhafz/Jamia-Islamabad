import { z } from 'zod';

// Helper regex for validation
const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
const phoneRegex = /^03\d{2}-\d{7}$/; // e.g. 0300-1234567

export const formSchema = z.object({
  // Office / Header Meta
  formNo: z.string().optional(),
  date: z.string().optional(),
  department: z.string().min(1, { message: 'Department/شعبہ is required' }),
  classGrade: z.string().min(1, { message: 'Class/درجہ is required' }),

  // Student Personal Information
  studentName: z.string().min(3, { message: 'Student Name/طالب علم کا نام must be at least 3 characters' }),
  fatherName: z.string().min(3, { message: 'Father Name/ولد must be at least 3 characters' }),
  dob: z.string().min(1, { message: 'Date of Birth/تاریخ پیدائش is required' }),
  phone: z.string().optional(), // Landline
  mobile: z.string().regex(phoneRegex, { message: 'Mobile number must match format 03XX-XXXXXXX' }),
  studentCnic: z.string().regex(cnicRegex, { message: 'CNIC must match format XXXXX-XXXXXXX-X' }),
  fatherCnic: z.string().regex(cnicRegex, { message: 'CNIC must match format XXXXX-XXXXXXX-X' }),
  permanentAddress: z.string().min(10, { message: 'Permanent address must be at least 10 characters' }),
  temporaryAddress: z.string().optional(),

  // Guardian Details (If applicable)
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianCnic: z.string().refine((val) => !val || cnicRegex.test(val), {
    message: 'Guardian CNIC must match format XXXXX-XXXXXXX-X',
  }).optional(),
  guardianPhone: z.string().optional(),
  guardianPermanentAddress: z.string().optional(),
  guardianTemporaryAddress: z.string().optional(),

  // Media / File Uploads
  photo: z.string().min(100, { message: 'Photograph (1.5x2 size) is required / تصویر اپلوڈ کرنا لازمی ہے' }),
  studentSignature: z.string().min(100, { message: 'Student signature is required / طالب علم کے دستخط لازمی ہیں' }),
  guardianSignature: z.string().min(100, { message: 'Guardian signature is required / سرپرست کے دستخط لازمی ہیں' }),

  // Rules and regulations acceptance
  agreeToRules: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the rules and regulations / قواعد و ضوابط کی منظوری لازمی ہے',
  }),
});

export type AdmissionFormData = z.infer<typeof formSchema>;

export const defaultFormValues: Partial<AdmissionFormData> = {
  formNo: '',
  date: new Date().toISOString().split('T')[0],
  department: '',
  classGrade: '',
  studentName: '',
  fatherName: '',
  dob: '',
  phone: '',
  mobile: '',
  studentCnic: '',
  fatherCnic: '',
  permanentAddress: '',
  temporaryAddress: '',
  guardianName: '',
  guardianRelation: '',
  guardianCnic: '',
  guardianPhone: '',
  guardianPermanentAddress: '',
  guardianTemporaryAddress: '',
  photo: '',
  studentSignature: '',
  guardianSignature: '',
};
