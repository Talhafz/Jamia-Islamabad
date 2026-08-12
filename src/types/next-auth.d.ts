import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: Role;
    studentId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      studentId?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    studentId?: string | null;
  }
}
