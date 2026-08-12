import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import { Role } from '@prisma/client';

// Simple in-memory rate limiter for abuse protection on verification endpoint
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ipKey: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  const current = rateLimitMap.get(ipKey);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ipKey, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxAttempts) {
    return false;
  }

  current.count += 1;
  rateLimitMap.set(ipKey, current);
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. Abuse Protection / Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'global';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { formNo, studentCnic, email, password } = body;

    // 2. Validate input presence
    if (!formNo || !studentCnic || !email || !password) {
      return NextResponse.json(
        { error: 'Form Number, CNIC, Email, and Password are all required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const cleanFormNo = formNo.trim().toUpperCase();
    const cleanCnic = studentCnic.trim();
    const cleanEmail = email.trim().toLowerCase();

    // 3. Verify against Student Database
    const existingStudent = await prisma.student.findFirst({
      where: {
        formNo: {
          equals: cleanFormNo,
          mode: 'insensitive',
        },
      },
    });

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Verification failed: Form Number not found in admission records.' },
        { status: 400 }
      );
    }

    // Match CNIC (removing hyphens for robust comparison)
    const dbCnicNormalized = existingStudent.studentCnic.replace(/-/g, '').trim();
    const inputCnicNormalized = cleanCnic.replace(/-/g, '').trim();

    if (dbCnicNormalized !== inputCnicNormalized) {
      return NextResponse.json(
        { error: 'Verification failed: CNIC number does not match student record.' },
        { status: 400 }
      );
    }

    // 4. Ensure Student doesn't already have an active User account
    const existingUserForStudent = await prisma.user.findFirst({
      where: {
        OR: [
          { studentId: existingStudent.id },
          { email: cleanEmail },
        ],
      },
    });

    if (existingUserForStudent) {
      if (existingUserForStudent.email === cleanEmail) {
        return NextResponse.json(
          { error: 'An account with this email address already exists.' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'An account has already been registered for this Form Number.' },
        { status: 400 }
      );
    }

    // 5. Hash Password & Create User Linked to Student Record
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: existingStudent.studentName,
        email: cleanEmail,
        passwordHash: hashedPassword,
        role: Role.STUDENT,
        studentId: existingStudent.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Student account created successfully! You can now log in.',
        userId: newUser.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Student registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
