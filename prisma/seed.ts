import { PrismaClient, Role, AdmissionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ═══════════════════════════════════════════════════════════════════════════
// WARNING: DUMMY TEST ACCOUNTS & TEST DATA FOR RBAC & WORKFLOW VERIFICATION ONLY
// Do NOT use these credentials in production. Rotate/delete before real data entry.
// ═══════════════════════════════════════════════════════════════════════════
const TEST_PASSWORD = 'Test1234!';

async function main() {
  console.log('🌱 Starting Jamia Islamabad database seed (Dummy Test Accounts)...');

  const staffAccounts = [
    {
      name: 'Test Admin User 1',
      email: 'admin1.test@jamia.local',
      password: TEST_PASSWORD,
      role: Role.ADMIN,
    },
    {
      name: 'Test Admissions Director',
      email: 'director.test@jamia.local',
      password: TEST_PASSWORD,
      role: Role.DIRECTOR,
    },
    {
      name: 'Test Academic Dean',
      email: 'dean.test@jamia.local',
      password: TEST_PASSWORD,
      role: Role.DEAN,
    },
  ];

  // 1. Seed Staff Accounts
  for (const staff of staffAccounts) {
    const hashedPassword = await bcrypt.hash(staff.password, 12);

    const user = await prisma.user.upsert({
      where: { email: staff.email },
      update: {
        name: staff.name,
        passwordHash: hashedPassword,
        role: staff.role,
      },
      create: {
        name: staff.name,
        email: staff.email,
        passwordHash: hashedPassword,
        role: staff.role,
      },
    });
    console.log(`✅ Seeded staff test account: ${user.email} (Role: ${user.role})`);
  }

  // 2. Seed 1 Dummy Student Record for Registration Verification Flow
  const dummyFormNo = 'JI-2026-00001';
  const dummyCnic = '37405-1234567-1';

  const dummyStudent = await prisma.student.upsert({
    where: { formNo: dummyFormNo },
    update: {
      studentCnic: dummyCnic,
      studentName: 'Muhammad Abdullah (Test)',
      fatherName: 'Tariq Mahmood',
      department: 'درس نظامی (Dars-e-Nizami)',
      classGrade: '1st Year',
      status: AdmissionStatus.ENROLLED,
    },
    create: {
      formNo: dummyFormNo,
      date: '2026-08-12',
      department: 'درس نظامی (Dars-e-Nizami)',
      classGrade: '1st Year',
      studentName: 'Muhammad Abdullah (Test)',
      fatherName: 'Tariq Mahmood',
      dob: '2004-05-15',
      phone: '051-1234567',
      mobile: '0300-1234567',
      studentCnic: dummyCnic,
      fatherCnic: '37405-7654321-9',
      permanentAddress: 'House 123, Street 4, Sector F-8/1, Islamabad',
      temporaryAddress: 'House 123, Street 4, Sector F-8/1, Islamabad',
      photo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      studentSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      guardianSignature: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      agreeToRules: true,
      status: AdmissionStatus.ENROLLED,
    },
  });

  console.log(`✅ Seeded dummy Student record: ${dummyStudent.studentName} (FormNo: ${dummyStudent.formNo}, CNIC: ${dummyStudent.studentCnic})`);
  console.log('✨ Dummy test seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
